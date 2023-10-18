import Service from '../index.js';
import ConfigurationService from './configurator.js';
import AdventureDataService from './adventureData.js';
import TrackerService from './visitorTracker.js';

export default class AdventureService extends Service {
    static INSTANCE = new AdventureService();
    static DATA_INSTANCE = AdventureDataService.INSTANCE;
    static RESPONSES = {
        turnedOff: errorResponse(1),
        unauthorized: errorResponse(2),
        notFound: errorResponse(3),
        death: deathResp,
    };

    static ACTION_MAP = {
        attack: { impl: attackImpl },
        move: { impl: moveImpl },
        ability: { impl: abilityImpl },
    };

    isOn = true;
    limitKey = "adventure";
    gamesPerDay = 10;

    async config() {
        const config = ConfigurationService.INSTANCE.getConfiguration()?.adventure || {};
        this.isOn = config?.isOn || true;
        this.limitKey = config?.limitKey || this.limitKey;
        this.gamesPerDay = config?.gamesPerDay || this.gamesPerDay;
        this.fleeChance = config?.fleeChance || 0.5;
    }

    async isAdventureOn() {
        return this.isOn;
    }

    async getFleeChance() {
        return this.fleeChance;
    }

    async createGame(ipAddress, classId, publicKey) {
        const trackerService = TrackerService.INSTANCE;
        if (!trackerService.limit(ipAddress, this.limitKey, this.gamesPerDay)) {
            return null;
        }

        return AdventureService.DATA_INSTANCE.createGame(classId, publicKey);
    }

    async getLatestMessageFromId(playerId, signage) {
        if (!this.isOn) {
            return AdventureService.RESPONSES.turnedOff(null);
        }

        const playerStats = AdventureService.DATA_INSTANCE.getPlayerState(playerId, signage);
        if (!playerStats) {
            return AdventureService.RESPONSES.unauthorized(null);
        }

        return this.__getGameResponse(playerStats);
    }

    async __getGameResponse(playerStats) {
        if (playerStats.health <= 0) {
            return AdventureService.RESPONSES.deathResp(playerStats)
        }

        const classId = playerStats?.classId
        const levels = await AdventureService.DATA_INSTANCE.getPlayerLevels(classId);
        const curLevel = calculateLevel(playerStats?.experience, levels);
        const playerClass = await AdventureService.DATA_INSTANCE.getPlayerClass(classId);
        const abilities = await AdventureService.DATA_INSTANCE.getPlayerClassAbilities();
        const player = {
            experience: playerStats?.experience,
            health: playerStats?.health,
            maxHealth: this.calculateMaxHealth(curLevel, playerClass?.benefits),
            mana: playerStats?.mana,
            attackMin: playerStats?.attackMin,
            attackMax: playerStats?.attackMax,
            gold: playerStats?.gold,
            className: playerClass?.name,
            classDescription: playerClass?.description,
            abilities: this.filterAbilities(curLevel, playerClass?.benefits, abilities),
        }

        const room = await AdventureService.DATA_INSTANCE.getRoom(playerStats?.roomId);
        const monster = room.monsterId && await AdventureService.DATA_INSTANCE.getMonster(room.monsterId);
        const game = {
            player: player,
            room: room,
            monster: monster || null,
        };

        return response(game, "The Game Awaits Your Next Move");
    }

    calculateMaxHealth(currentLevel, benefits) {
        let health = 0;

        for (const benefit of benefits) {
            if (benefit.level <= currentLevel) {
                health += benefit.health;
            }
        }

        return health;
    }

    calculateManaPerTurn(currentLevel, benefits) {
        let mana = 0;

        for (const benefit of benefits) {
            if (benefit.level <= currentLevel) {
                mana += benefit.mana;
            }
        }

        return mana;
    }

    filterCurrentAbilities(currentLevel, benefits, abilities) {
        let filteredAbilities = [];

        for (const benefit of benefits) {
            if (benefit.level <= currentLevel) {
                const ability = abilities[benefit.abilityId];
                if (ability) {
                    filteredAbilities.push(ability);
                }
            }
        }

        return filteredAbilities;
    }

    async makeMove(playerId, randomData, signature, action, params) {
        if (!this.isOn) {
            return RESPONSES.turnedOff(null);
        }

        const playerStats = await AdventureService.DATA_INSTANCE.getPlayerStats(playerId, randomData, signature);
        if (!playerStats) {
            return AdventureService.RESPONSES.unauthorized(null);
        }

        const actionMapping = AdventureService.ACTION_MAP[action];
        if (!actionMapping) {
            return AdventureService.RESPONSES.notFound(null);
        }

        const responses = [];
        const isAllowed = await actionMapping.impl(params, playerStats, responses);
        if (!isAllowed) {
            return AdventureService.RESPONSES.notFound(null);
        }

        return this.__getGameResponse(playerStats);
    }

    getName() {
        return "ADVENTURE SERVICE";
    }
}

function response(game = {}, message = "", error = 0) {
    return { game: game, message: message, error: error };
}

function messageWithNoError(message) {
    return response(message = message);
}

function deathResp(playerStats) {
    return messageWithNoError(`${playerStats.name} is dead with ${playerStats.gold} gold`);
}

function errorResponse(error) {
    return (playerStats) => { return response(error = error) };
}

async function attackImpl(params, playerStats, responses) {
    const { } = params;
    const { attackMax, attackMin } = playerStats;

    const difference = attackMax - attackMin;
    const amount = Math.random() * difference + attackMin;
    const canDamage = await damageMonster(amount, playerStats, responses);
    if (!canDamage) {
        return false;
    }

    await tickRoom(playerStats, responses);
    return true;
}

async function moveImpl(params, playerStats, responses) {
    const { dest } = params;
    const { roomId, enemyHealth } = playerStats;

    const room = await AdventureService.DATA_INSTANCE.getRoom(roomId);

    if (!room.outgoing.includes(dest)) {
        return false;
    }

    if (enemyHealth > 0 && Math.random() > (await AdventureService.INSTANCE.getFleeChance())) {
        responses.push(`The monster blocked the player!`);
        return true;
    }

    playerStats.set({
        roomId: dest,
    });

    await playerStats.save();

    responses.push(`Player entered a new room: ${dest}`);

    return true;
}

async function abilityImpl(params, playerStats, responses) {
    const { abilityId } = params;
    const { health, mana } = playerStats;

    const curLevel = calculateLevel(playerStats.experience, levels);
    const playerClass = await AdventureService.DATA_INSTANCE.getPlayerClass(classId);
    const ability = await AdventureService.DATA_INSTANCE.getPlayerClassAbilities()[abilityId];
    const abilitiesMaybe = await AdventureService.INSTANCE.filterCurrentAbilities(curLevel, playerClass.benefits, { [abilityId]: ability });

    if (abilitiesMaybe.length <= 0) {
        return false;
    }

    const { health: healthCost, mana: manaCost, attackMin, attackMax, healMin, healMax } = ability;

    /// MANA
    if (manaCost > mana) {
        return false;
    } else if (manaCost > 0) {
        playerStats.set({
            mana: mana - manaCost,
        });

        responses.push(`Player lost ${manaCost} mana!`);
    }

    /// HEALING
    let healthWithHealing = health;
    if (healMax > 0) {
        const healDifference = healMax - healMin;
        const heal = Math.random() * healDifference + healMin;
        healthWithHealing += heal;
        responses.push(`Player healed for ${heal} health`);
    }

    if (healthCost > 0) {
        healthWithHealing -= healthCost;
        responses.push(`Player sacrificed ${healthCost} health!`)
    }

    playerStats.set({
        health: healthWithHealing,
    });
    await playerStats.save();

    // DAMAGE
    if (attackMax > 0) {
        const attackDifference = attackMax - attackMin;
        const attack = Math.random() * attackDifference + attackMin;
        await damageMonster(attack, playerStats);
    }


    await tickRoom(playerStats, responses);
    return true;
}

async function damageMonster(amount, playerStats, responses) {
    const { enemyHealth } = playerStats;
    if (enemyHealth <= 0) {
        return false;
    }

    playerStats.set({
        enemyHealth: enemyHealth - amount,
    });

    await playerStats.save();

    responses.push(`Player dealt ${amount} to the monster!`);

    return true;
}

async function tickRoom(playerStats, responses) {
    await monsterDamagePlayer(playerStats, responses);
    await manaRegen(playerStats, responses);
}

async function monsterDamagePlayer(playerStats, responses) {
    const { enemyHealth } = playerStats;
    if (enemyHealth <= 0) {
        return;
    }

    const room = await AdventureService.DATA_INSTANCE.getRoom(playerStats.roomId);
    const { name, attackMax, attackMin } = await AdventureService.DATA_INSTANCE.getMonster(room.monsterId);
    const difference = attackMax - attackMin;
    const damage = Math.random() * difference + attackMin;

    playerStats.set({
        health: playerStats.health - damage,
    });

    // TODO make playerStats.save transactional (lock at load)
    await playerStats.save();

    responses.push(`${name} dealt ${damage} to Player!`);
}

async function manaRegen(playerStats, responses) {
    const { mana } = playerStats;

    const curLevel = calculateLevel(playerStats.experience, levels);
    const playerClass = await AdventureService.DATA_INSTANCE.getPlayerClass(classId);
    const manaPerTurn = await AdventureService.INSTANCE.calculateManaPerTurn(curLevel, playerClass.benefits);

    if (manaPerTurn <= 0) {
        return;
    }

    playerStats.set({
        mana: mana + manaPerTurn,
    });

    await playerStats.save();

    responses.push(`Player regened ${manaPerTurn} mana`);
}