import { Position } from "../types";
// these constants are more like config, please edit it to check
export const INITIAL_BALANCE = 5000;
export const BET_AMOUNT = 500;
export const SINGLE_BET_MULTIPLIER = 14;
export const DOUBLE_BET_MULTIPLIER = 3;
export const MAX_POSITIONS = 2;

export const POSITIONS: Position[] = ["ROCK", "PAPER", "SCISSORS"];

export const POSITION_COLORS = {
  ROCK: "#1a237e",
  PAPER_BACKGROUND: "#16C359",
  PAPER: "#1b5e20",
  ROCK_BACKGROUND: "#2680EA",
  SCISSORS: "#50091E",
  SCISSORS_BACKGROUND: "#E31542",
} as const;
