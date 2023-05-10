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
    static ACTION_MAP = {}

    isOn = true;
    limitKey = "adventure";
    gamesPerDay = 10;

    async config() {
        const config = ConfigurationService.INSTANCE.getConfiguration()?.adventure || {};
        this.isOn = config?.isOn || true;
        this.limitKey = config?.limitKey || this.limitKey;
        this.gamesPerDay = config?.gamesPerDay || this.gamesPerDay;
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
        const levels = await AdventureDataService.DATA_INSTANCE.getPlayerLevels(classId);
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
        const monster = room.monsterId && await AdventureDataService.DATA_INSTANCE.getMonster(room.monsterId);
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

    async makeMove(playerId, signage, action) {
        if (!this.isOn) {
            return RESPONSES.turnedOff(null);
        }

        const playerStats = AdventureService.DATA_INSTANCE.getPlayerStats(playerId, signage);
        if (!playerStats) {
            return AdventureService.RESPONSES.unauthorized(null);
        }

        const actionMapping = AdventureService.ACTION_MAP[action];
        if (!actionMapping) {
            return AdventureService.RESPONSES.notFound(null);
        }

        if (!actionMapping.impl(playerStats)) {
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
    return (playerStatus) => { return response(error = error) };
}