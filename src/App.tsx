import React from "react";
import { GameBoard } from "../src/features/rpsgame/components";
import { Container } from "./shared/components/Layout";

const App: React.FC = () => {
  return (
    <Container>
      <GameBoard />
    </Container>
  );
};

export default App;
