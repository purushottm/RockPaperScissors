import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/store";
import { setGameResult, clearGame } from "../store/gameSlice";
import { Button } from "../../../shared/components/Button";
import { POSITIONS } from "../constants";
// import { calculateWinnings } from "../utils/gameLogic";

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const GameControls: React.FC = () => {
  const dispatch = useDispatch();
  const { currentBets, gameState } = useSelector(
    (state: RootState) => state.game
  );

  const handlePlay = () => {
    if (currentBets.length === 0) return;

    // computer's choice
    // random number genrator logic can be exported from shared utils[to do]
    const computerChoice =
      POSITIONS[Math.floor(Math.random() * POSITIONS.length)];

    // tie check
    const isTie = currentBets.some((bet) => bet.position === computerChoice);

    // // winnings calculation
    // const winAmount = calculateWinnings(currentBets, computerChoice);

    // game result dispatcher
    dispatch(
      setGameResult({
        computerChoice,
      })
    );
  };

  const handleClear = () => {
    dispatch(clearGame());
  };

  return (
    <ControlsContainer>
      {gameState === "BETTING" && (
        <Button
          variant="primary"
          onClick={handlePlay}
          disabled={currentBets.length === 0}
        >
          PLAY
        </Button>
      )}

      {gameState === "RESULT" && (
        <Button variant="primary" onClick={handleClear}>
          CLEAR
        </Button>
      )}
    </ControlsContainer>
  );
};

export default GameControls;
