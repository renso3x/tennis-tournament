import { getScoreInText } from "./utils";
import { Player } from './types'

export class Match {
  players: [Player, Player];
  gameOver: boolean = false;
  error: boolean | string = false;
  deuce: boolean = false;

  constructor(playerA: Player, playerB: Player) {
    this.players = [playerA, playerB]
  }

  public pointWonBy(player: Player) {
    const playerIndex = this.players.map(player => player.name).indexOf(player.name);

    if (playerIndex === -1) {
      return this.error = "Cannot find player"
    }

    this.playerScores(playerIndex)
  }

  public score() {
    if (this.error) return this.error;
  
    let scoreText;
    const serverScore = this.players[0].score
    const opponentScore = this.players[1].score

    const diff = Math.abs(serverScore - opponentScore);
  
    if (serverScore > 3 || opponentScore > 3) {
      const isServerUp = serverScore > opponentScore;
      scoreText = this.getGameOver(diff, isServerUp);
      scoreText = !this.gameOver ? this.getAdvantage(diff, isServerUp) : scoreText;
    }
    if (serverScore >= 3 && opponentScore >= 3 && diff === 0) {
      scoreText = "Deuce";
    }
  
    return scoreText
      ? scoreText
      : `${getScoreInText(serverScore)} - ${getScoreInText(opponentScore)}`;
  }

  private playerScores(playerIndex: number) {
    if (this.gameOver) {
      this.error = "Game is already over. You can't score anymore.";
      return;
    }
    this.players[playerIndex].score++
    this.score();
  }

  private getGameOver(diff: number, isServerUp: boolean) {
    if (diff > 1) {
      this.gameOver = true;
      if (isServerUp) {
        return "Game - Player1";
      } else {
        return "Game - Player2";
      }
    }
  }

  private getAdvantage(diff: number, isServerUp: boolean) {
    if (diff === 1) {
      if (isServerUp) {
        return "Advantage - Player1";
      } else {
        return "Advantage - Player2";
      }
    }
  }
}
