import React from "react";
import styled from "styled-components";

interface GameHeaderProps {
  balance: number;
  currentBet: number;
  winAmount: number;
}

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: space-around;
  padding: ${({ theme }) => theme.spacing.md};
`;

const TitleText = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

const ValueText = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;

const TextValueWrapper = styled.div``;

const GameHeader: React.FC<GameHeaderProps> = ({
  balance,
  currentBet,
  winAmount,
}) => {
  // define structure of header data
  const headerData = [
    { title: "BALANCE:", value: balance },
    { title: "BET:", value: currentBet },
    { title: "WIN:", value: winAmount },
  ];

  return (
    <HeaderContainer>
      {headerData.map(({ title, value }) => (
        <TextValueWrapper key={title}>
          <TitleText>{title}</TitleText>
          <ValueText>{value}</ValueText>
        </TextValueWrapper>
      ))}
    </HeaderContainer>
  );
};

export default GameHeader;
