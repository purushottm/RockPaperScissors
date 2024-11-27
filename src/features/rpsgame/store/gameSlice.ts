import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState, Bet, GameResult } from "../types";
import {
  INITIAL_BALANCE,
  BET_AMOUNT,
  MAX_POSITIONS,
  SINGLE_BET_MULTIPLIER,
  DOUBLE_BET_MULTIPLIER,
} from "../constants";
import { Position } from "../types/gameTypes";
import { determineWinner } from "../utils/gameLogic";

interface GameSliceState {
  balance: number;
  currentBets: Bet[];
  gameResult: GameResult | null;
  gameState: GameState;
}

const initialState: GameSliceState = {
  balance: INITIAL_BALANCE,
  currentBets: [],
  gameResult: null,
  gameState: "BETTING",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    placeBet: (state, action: PayloadAction<{ position: Position }>) => {
      const { position } = action.payload;

      // Check if player has enough balance to proceed
      if (state.balance < BET_AMOUNT) return;

      // Find existing bet for this position to append
      const existingBetIndex = state.currentBets.findIndex(
        (bet) => bet.position === position
      );

      if (existingBetIndex !== -1) {
        // Increase existing bet of that position
        state.currentBets[existingBetIndex].amount += BET_AMOUNT;
        state.balance -= BET_AMOUNT;
      } else {
        // Check if we're not exceeding max positions[2]
        if (state.currentBets.length >= MAX_POSITIONS) return;

        // Add new bet
        state.currentBets.push({ position, amount: BET_AMOUNT });
        state.balance -= BET_AMOUNT;
      }
    },

    setGameResult: (
      state,
      action: PayloadAction<{ computerChoice: Position }>
    ) => {
      const { computerChoice } = action.payload;
      let winningPosition: Position | null = null;
      let tiePosition: Position | null = null;
      let winAmount = 0;

      // Find winning and tie positions
      state.currentBets.forEach((bet) => {
        if (bet.position === computerChoice) {
          tiePosition = bet.position;
        } else if (determineWinner(bet.position, computerChoice)) {
          winningPosition = bet.position;
        }
      });

      // Calculate winnings from currentBets
      if (winningPosition) {
        const winningBet = state.currentBets.find(
          (bet) => bet.position === winningPosition
        );
        if (winningBet) {
          // If betting is for 1 position
          if (state.currentBets.length === 1) {
            winAmount = winningBet.amount * SINGLE_BET_MULTIPLIER;
          }
          // If betting is for 2 positions
          else if (state.currentBets.length === 2) {
            winAmount = winningBet.amount * DOUBLE_BET_MULTIPLIER;
          }
        }
      }

      // Return tie bets to balance
      if (tiePosition) {
        const tieBet = state.currentBets.find(
          (bet) => bet.position === tiePosition
        );
        if (tieBet) {
          state.balance += tieBet.amount;
        }
      }

      // Add winnings to balance
      state.balance += winAmount;

      // Set game result to state
      state.gameResult = {
        computerChoice,
        winningPosition,
        tiePosition,
        winAmount,
      };
      state.gameState = "RESULT";
    },

    clearGame: (state) => {
      state.currentBets = [];
      state.gameResult = null;
      state.gameState = "BETTING";
    },
  },
});

export const { placeBet, setGameResult, clearGame } = gameSlice.actions;
export default gameSlice.reducer;
