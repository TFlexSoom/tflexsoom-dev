import Service from '../index.js';
import ConfigurationService from './configurator.js';
import DatabaseService from './database.js';

export default class AdventureDataService extends Service {
    static INSTANCE = new AdventureService();
    isOn = false;
    rooms = {};
    monsters = {};
    playerLevels = {};
    playerClasses = {};
    playerAbilities = {};

    async start() {
        const dbService = DatabaseService.INSTANCE;
        dbService.addModel(Room);
        dbService.addModel(RoomConnection);
        dbService.addModel(Monster);
        dbService.addModel(PlayerLevel);
        dbService.addModel(PlayerClass);
        dbService.addModel(PlayerClassBenefit);
        dbService.addModel(PlayerAbility);
        dbService.addModel(PlayerStats);
        dbService.addModel(AdventureLog);
    }

    async load() {
        const config = ConfigurationService.INSTANCE.getConfiguration()?.adventure || {};
        this.isOn = config?.isOn || true;
    }

    async cache() {
        const dbRooms = Room.findAll({});
        const dbConnections = RoomConnection.findAll({});
        const dbMonsters = Monster.findAll({});
        const dbPlayerLevel = PlayerLevel.findAll({});
        const dbPlayerClass = PlayerClass.findAll({});
        const dbPlayerClassBenefit = PlayerClassBenefit.findAll({});
        const dbPlayerAbility = PlayerAbility.findAll({});

        // Rooms first
        const rooms = {}
        for (const room in dbRooms) {
            rooms[room.id] = {
                type: room.roomType,
                background: room.background,
                mosnter: room.monster,
                outgoing: [],
            };
        }

        for (const connection in dbConnections) {
            if (!classes[connection.fromRoom]) {
                console.error(`Class: ${connection.fromRoom} does not exist from connection ${connection.id}`);
                continue;
            }

            rooms[connection.fromRoom].outgoing.push(connection.toRoom);
        }
        this.rooms = rooms;

        // Monsters next
        const monsters = {};
        for (const monster in dbMonsters) {
            monsters[monster.id] = {
                name: monster.name,
                health: monster.health,
                attackMin: monster.attackMin,
                attackMax: monster.attackMax,
                gold: monster.gold,
                experience: monster.experience,
            }
        }
        this.monsters = monsters;

        // Next Player Levels
        const levels = [];
        for (const level in dbPlayerLevel) {
            levels.push({ level: level.level, experience: level.experience });
        }
        this.playerLevels = PlayerLevelMap(levels);

        // Next Player Abilities
        const abilities = {};
        for (const playerAbility in dbPlayerAbility) {
            abilities[playerAbility.id] = {
                name: playerAbility.name,
                health: playerAbility.health,
                mana: playerAbility.mana,
                attackMin: playerAbility.attackMin,
                attackMax: playerAbility.attackMax,
                healMin: playerAbility.healMin,
                healMax: playerAbility.healMax,
            }
        }
        this.playerAbilities = abilities;


        // Finally Player Classes
        const classes = {};
        for (const playerClass in dbPlayerClass) {
            classes[playerClass.id] = {
                name: playerClass.name,
                description: playerClass.description,
                benefits: {},
            }
        }


        for (const playerBenefit in dbPlayerClassBenefit) {
            if (!classes[playerBenefit.classId]) {
                console.error(`Class: ${playerBenefit.classId} does not exist from benefit ${playerBenefit.id}`);
                continue;
            }

            classes[playerBenefit.classId].benefits[playerBenefit.level] = {
                health: playerBenefit.health,
                maxMana: playerBenefit.maxMana,
                manaPerTurn: playerBenefit.manaPerTurn,
                attackMin: playerBenefit.attackMin,
                attackMax: playerBenefit.attackMax,
                abilityId: playerBenefit.abilityId,
            }
        }
        this.playerClasses = classes;
    }

    getName() {
        return "ADVENTURE DATA SERVICE";
    }
}

class Room extends Model {
    static classDefine(sequelize) {
        Room.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                roomType: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                background: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                monster: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                }
            },
            {
                sequelize,
                modelName: "adventure_room",
            }
        );
    }
}

class RoomConnection extends Model {
    static classDefine(sequelize) {
        RoomConnection.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                fromRoom: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: "fromToRoom",
                },
                toRoom: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: "fromToRoom",
                }
            },
            {
                sequelize,
                modelName: "adventure_room_connection",
                indexes: [{ fields: ["fromRoom"] }]
            }
        );
    }
}

class Monster extends Model {
    static classDefine(sequelize) {
        Monster.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                health: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                attackMin: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                attackMax: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                gold: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                experience: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "adventure_monster",
            }
        );
    }
}

class PlayerLevel extends Model {
    static classDefine(sequelize) {
        PlayerLevel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                level: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: true,
                },
                experience: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: true,
                }
            },
            {
                sequelize,
                modelName: "adventure_level",
            }
        );
    }
}


// TODO optimize
class PlayerLevelMap {
    experiences = [];
    experienceToLevels = {};
    levelsToExperience = {};

    constructor(levels) {
        for (const level in levels) {
            this.experiences.push(level.experience);
            this.experienceToLevels[level.experience] = level.level;
            this.levelsToExperience[level.level] = level.experience;
        }
    }

    experienceForLevel(level) {
        return this.levelsToExperience[level];
    }

    neededExperienceForNextLevel(level) {
        return this.levelsToExperience[level + 1] || -1;
    }

    // just do sequential search for now
    levelForExperience(experience) {
        const length = this.experiences.length();
        let level = 0;
        for (let i = 0; i < length; i++) {
            nextVal = Number.MAX_SAFE_INTEGER;
            if (i != length - 1) {
                nextVal = this.experiences[i + 1];
            }

            if (experience >= this.experiences[i] && experience < this.experiences) {
                level = experiencesToLevels[this.experiences[i]];
            } else {
                break;
            }
        }

        return level;
    }
}

class PlayerClass extends Model {
    static classDefine(sequelize) {
        PlayerClass.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: "adventure_class",
            }
        );
    }
}

class PlayerClassBenefit extends Model {
    static classDefine(sequelize) {
        PlayerClassBenefit.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                classId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: true,
                },
                level: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: true,
                },
                health: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                maxMana: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                manaPerTurn: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                attackMin: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                attackMax: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                abilityId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                }
            },
            {
                sequelize,
                modelName: "adventure_class_benefit",
            }
        );
    }
}

class PlayerAbility extends Model {
    static classDefine(sequelize) {
        PlayerAbility.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                health: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                mana: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                attackMin: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                attackMax: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                healMin: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                healMax: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "adventure_ability",
            }
        );
    }
}

class PlayerStats extends Model {
    static classDefine(sequelize) {
        PlayerStats.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                privateKey: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                publicKey: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                roomId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                classId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                experience: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                health: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                mana: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                attackMin: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                attackMax: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                gold: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: "adventure_stats",
                indexes: [{ fields: ["health"] }]
            }
        );
    }
}

class AdventureLog extends Model {
    static classDefine(sequelize) {
        AdventureLog.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                event: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: "adventure_log",
            }
        );
    }
}
