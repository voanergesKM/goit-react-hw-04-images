import { StyledButton } from './Button.styled';

export const LoadMoreBtn = ({ text, onClick, isLoading }) => {
  return (
    <StyledButton onClick={onClick} disabled={isLoading}>
      {text}
    </StyledButton>
  );
};
