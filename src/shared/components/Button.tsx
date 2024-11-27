import styled from "styled-components";

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  background: ${(props) => props.theme.colors.black};
  color: ${(props) =>
    props.variant === "primary"
      ? props.theme.colors.secondary
      : props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  border: 3px solid ${(props) => props.theme.colors.secondary};
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
