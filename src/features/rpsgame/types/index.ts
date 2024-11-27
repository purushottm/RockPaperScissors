export type Position = "ROCK" | "PAPER" | "SCISSORS";
export type GameState = "BETTING" | "PLAYING" | "RESULT";

export interface Bet {
  position: Position;
  amount: number;
}

export interface GameResult {
  computerChoice: Position;
  winningPosition: Position | null;
  tiePosition: Position | null;
  winAmount: number;
}
