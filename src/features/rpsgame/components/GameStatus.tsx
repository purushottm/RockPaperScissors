import React from "react";
import styled from "styled-components";
import { GameResult, GameState } from "../types";

interface GameStatusProps {
  result: GameResult;
  //   state: GameState;
}

const StatusContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

const StatusMessage = styled.div<{ type: "win" | "lose" | "tie" }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme, type }) =>
    type === "win"
      ? theme.colors.success
      : type === "lose"
      ? theme.colors.error
      : theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ComputerChoice = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const WinAmount = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

//   const getStatusType = (): "win" | "lose" | "tie" => {
//     if (result.isTie) return "tie";
//     return result.playerWon ? "win" : "lose";
//   };

const GameStatus: React.FC<GameStatusProps> = ({ result }) => {
  const getStatusMessage = (): string => {
    if (result.tiePosition && !result.winningPosition) {
      return "TIE - BET RETURNED!";
    }
    return result.winningPosition
      ? `YOU WON ${result.winAmount}!`
      : "YOU LOST!";
  };

  return (
    <StatusContainer>
      <StatusMessage
        type={
          result.winningPosition ? "win" : result.tiePosition ? "tie" : "lose"
        }
      >
        {getStatusMessage()}
      </StatusMessage>

      <ComputerChoice>Computer chose: {result.computerChoice}</ComputerChoice>

      {/* {result.playerWon && <WinAmount>You won: {result.winAmount}</WinAmount>} */}
    </StatusContainer>
  );
};

export default GameStatus;
