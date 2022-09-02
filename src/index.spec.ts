import { Match } from "./index";
import { Player } from "./types";

describe("DiUS Tennis Tournament", () => {
  let match: Match;
  let player1 = {
    name: 'John',
    score: 0
  };
  let player2 = {
    name: 'George',
    score: 0,
  };
  const pointWonByMock = jest.fn()
  const scoreMock = jest.fn()

  beforeEach(() => {
    match = new Match(
      player1 as Player,
      player2 as Player
    )
    match.pointWonBy = pointWonByMock
    match.score = scoreMock
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("Player1 scores", () => {
    scoreMock.mockReturnValueOnce("15 - Love")
    match.pointWonBy(player1)
    expect(match.score()).toBe("15 - Love");
  });

  it("Player1 scores 2 times", () => {
    scoreMock.mockReturnValueOnce("30 - Love")
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    expect(match.score()).toBe("30 - Love");
  });

  test("Player2 scores 3 times", () => {
    scoreMock.mockReturnValueOnce("Love - 40")
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    expect(match.score()).toBe("Love - 40");
  });

  test("Player1 scores 3 times and Player2 scores 2 times.", () => {
    scoreMock.mockReturnValueOnce("40 - 30")
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    expect(match.score()).toBe("40 - 30");
  });

  test("Player1 scores 3 times and Player2 scores 3 times.", () => {
    scoreMock.mockReturnValueOnce("Deuce")
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    match.pointWonBy(player1)

    match.pointWonBy(player2)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    expect(match.score()).toBe("Deuce");
  });

  test("Player1 scores 3 times and Player2 scores 4 times.", () => {
    scoreMock.mockReturnValueOnce("Advantage - Player2")
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    match.pointWonBy(player1)

    match.pointWonBy(player2)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    expect(match.score()).toBe("Advantage - Player2");
  });

  test("Player1 scores 3 times and Player2 scores 5 times.", () => {
    scoreMock.mockReturnValueOnce("Game - Player2")

    match.pointWonBy(player1)
    match.pointWonBy(player1)
    match.pointWonBy(player1)

    match.pointWonBy(player2)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    expect(match.score()).toBe("Game - Player2");
  });

  test("Player1 scores 3 times and Player2 scores 6 times.", () => {
    scoreMock.mockReturnValueOnce("Game is already over. You can't score anymore.")
    
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    match.pointWonBy(player1)


    match.pointWonBy(player2)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    match.pointWonBy(player2)
    expect(match.score()).toBe("Game is already over. You can't score anymore.");
  });

  test("Player1 scores 4 times", () => {
    scoreMock.mockReturnValueOnce("Game - Player1")
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    expect(match.score()).toBe("Game - Player1");
  });

  test("Player1 scores 5 times", () => {
    scoreMock.mockReturnValueOnce("Game is already over. You can't score anymore.")

    match.pointWonBy(player1)
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    match.pointWonBy(player1)
    expect(match.score()).toBe("Game is already over. You can't score anymore.");
  });
});