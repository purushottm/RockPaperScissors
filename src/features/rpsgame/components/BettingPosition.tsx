import React, { useCallback, memo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Position } from "../types";
import { POSITION_COLORS } from "../constants";
import { placeBet } from "../store/gameSlice";

interface BettingPositionProps {
  position: Position;
  currentBet: number;
  disabled: boolean;
}

interface StyledCardProps {
  color: string;
  borderColor: string;
  disabled: boolean;
}

const PositionCard = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.color};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  border: 3px solid ${(props) => props.borderColor};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease-in-out;
  color: ${(props) => props.borderColor};

  &:hover:not(:disabled) {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

const PositionTitle = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.spacing.lg};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PositionAmount = styled.div<{ isSelected: boolean }>`
  display: ${(props) => (props.isSelected ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.spacing.md};
  font-weight: bold;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  margin: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.white};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const BettingPosition: React.FC<BettingPositionProps> = memo(
  ({ position, currentBet, disabled }) => {
    const dispatch = useDispatch();

    const handleClick = useCallback(() => {
      if (!disabled) {
        dispatch(placeBet({ position }));
      }
    }, [dispatch, disabled, position]);

    return (
      <PositionCard
        color={POSITION_COLORS[position]}
        borderColor={
          POSITION_COLORS[
            `${position}_BACKGROUND` as keyof typeof POSITION_COLORS
          ]
        }
        disabled={disabled}
        onClick={handleClick}
      >
        <PositionAmount isSelected={currentBet > 0}>
          {currentBet}
        </PositionAmount>
        <PositionTitle>{position}</PositionTitle>
      </PositionCard>
    );
  }
);

BettingPosition.displayName = "BettingPosition";

export default BettingPosition;
