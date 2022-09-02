"use strict";
exports.__esModule = true;
exports.Match = void 0;
var utils_1 = require("./utils");
var Match = /** @class */ (function () {
    function Match(playerA, playerB) {
        this.gameOver = false;
        this.error = false;
        this.deuce = false;
        this.players = [playerA, playerB];
    }
    Match.prototype.pointWonBy = function (player) {
        var playerIndex = this.players.map(function (player) { return player.name; }).indexOf(player.name);
        if (playerIndex === -1) {
            return this.error = "Cannot find player";
        }
        this.playerScores(playerIndex);
    };
    Match.prototype.score = function () {
        if (this.error)
            return this.error;
        var scoreText;
        var serverScore = this.players[0].score;
        var opponentScore = this.players[1].score;
        var diff = Math.abs(serverScore - opponentScore);
        if (serverScore > 3 || opponentScore > 3) {
            var isServerUp = serverScore > opponentScore;
            scoreText = this.getGameOver(diff, isServerUp);
            scoreText = !this.gameOver ? this.getAdvantage(diff, isServerUp) : scoreText;
        }
        if (serverScore >= 3 && opponentScore >= 3 && diff === 0) {
            scoreText = "Deuce";
        }
        return scoreText
            ? scoreText
            : "".concat((0, utils_1.getScoreInText)(serverScore), " - ").concat((0, utils_1.getScoreInText)(opponentScore));
    };
    Match.prototype.playerScores = function (playerIndex) {
        if (this.gameOver) {
            this.error = "Game is already over. You can't score anymore.";
            return;
        }
        this.players[playerIndex].score++;
        this.score();
    };
    Match.prototype.getGameOver = function (diff, isServerUp) {
        if (diff > 1) {
            this.gameOver = true;
            if (isServerUp) {
                return "Game - Player1";
            }
            else {
                return "Game - Player2";
            }
        }
    };
    Match.prototype.getAdvantage = function (diff, isServerUp) {
        if (diff === 1) {
            if (isServerUp) {
                return "Advantage - Player1";
            }
            else {
                return "Advantage - Player2";
            }
        }
    };
    return Match;
}());
exports.Match = Match;
