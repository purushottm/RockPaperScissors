import { Position, Bet } from "../types";
import { SINGLE_BET_MULTIPLIER, DOUBLE_BET_MULTIPLIER } from "../constants";

export const determineWinner = (
  playerChoice: Position,
  computerChoice: Position
): boolean => {
  if (playerChoice === computerChoice) return false;
  if (playerChoice === "ROCK" && computerChoice === "SCISSORS") return true;
  if (playerChoice === "PAPER" && computerChoice === "ROCK") return true;
  if (playerChoice === "SCISSORS" && computerChoice === "PAPER") return true;
  return false;
};

// need to remove this after checks
// export const calculateWinnings = (
//   bets: Bet[],
//   computerChoice: Position
// ): number => {
//   const playerWon = bets.some((bet) =>
//     determineWinner(bet.position, computerChoice)
//   );
//   if (!playerWon) return 0;

//   const totalBet = bets.reduce((acc, bet) => acc + bet.amount, 0);
//   return bets.length === 1
//     ? totalBet * SINGLE_BET_MULTIPLIER
//     : totalBet * DOUBLE_BET_MULTIPLIER;
// };
