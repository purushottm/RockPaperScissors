import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store";
import BettingPosition from "./BettingPosition";
import GameHeader from "./GameHeader";
import GameControls from "./GameControls";
import GameStatus from "./GameStatus";
import { POSITIONS } from "../constants";
import { Position } from "../types";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(
    #434343,
    ${({ theme }) => theme.colors.background}
  );
  height: 100vh;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const GameBeginText = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PositionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const GameBoard: React.FC = () => {
  const { balance, currentBets, gameResult, gameState } = useSelector(
    (state: RootState) => state.game
  );

  // get current bet amount for a position
  const getBetAmountForPosition = (position: Position): number => {
    const bet = currentBets.find((bet) => bet.position === position);
    return bet ? bet.amount : 0;
  };

  // check if new bets are allowed
  const isPositionDisabled = (position: Position): boolean => {
    return (
      gameState !== "BETTING" ||
      balance < 500 ||
      (currentBets.length >= 2 && // 2 is for restricting it to 2 active choices
        !currentBets.some((bet) => bet.position === position))
    );
  };

  return (
    <BoardContainer>
      <GameHeader
        balance={balance}
        currentBet={currentBets.reduce((acc, bet) => acc + bet.amount, 0)}
        winAmount={gameResult?.winAmount || 0}
      />

      {gameResult && <GameStatus result={gameResult} />}

      {gameState === "BETTING" && (
        <GameBeginText> Pick Your Positions </GameBeginText>
      )}

      <PositionsGrid>
        {POSITIONS.map((position) => (
          <BettingPosition
            key={position}
            position={position}
            currentBet={getBetAmountForPosition(position)}
            disabled={isPositionDisabled(position)}
          />
        ))}
      </PositionsGrid>

      <GameControls />
    </BoardContainer>
  );
};

export default GameBoard;
