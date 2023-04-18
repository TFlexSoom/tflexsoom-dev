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
        death: deathResp,
    };

    isOn = true;
    limitKey = "adventure";
    gamesPerDay = 10;

    async config() {
        const config = ConfigurationService.INSTANCE.getConfiguration()?.adventure || {};
        this.isOn = config?.isOn || true;
        this.limitKey = config?.limitKey || this.limitKey;
        this.gamesPerDay = config?.gamesPerDay || this.gamesPerDay;
    }

    async createGame(ipAddress) {
        const trackerService = TrackerService.INSTANCE;
        if (!trackerService.limit(ipAddress, this.limitKey, this.gamesPerDay)) {
            return DATA_INSTANCE.emptyPlayerStats();
        }

        return DATA_INSTANCE.createGame();
    }

    async getLatestMessageFromId(playerId, token) {
        if (!this.isOn) {
            return RESPONSES.turnedOff(null);
        }

        const playerStats = DATA_INSTANCE.getPlayerState(playerId, token);
        if (!playerStats) {
            return RESPONSES.unauthorized(null);
        }

        return this.__getLatestMessage(playerStats);
    }

    async __getLatestMessage(playerState) {
        return "";
    }

    async makeMove(playerId, token) {
        if (!this.isOn) {
            return RESPONSES.turnedOff;
        }

        const playerStats = DATA_INSTANCE.getPlayerState(playerId, token);
        if (!playerStats) {
            return RESPONSES.unauthorized(null);
        }

        if (playerStats.health <= 0) {
            return RESPONSES.deathResp(playerStats)
        }

        return this.__getLatestMessage(playerStats);
    }

    getName() {
        return "ADVENTURE SERVICE";
    }
}

function errorResponse(errorNo) {
    return (playerStatus) => { return { response: "", error: errorNo } };
}

function messageWithNoError(msg) {
    return { response: msg, error: 0 }
}

function deathResp(playerStats) {
    return messageWithNoError(`${playerStats.name} is dead with ${playerStats.gold} gold`);
}