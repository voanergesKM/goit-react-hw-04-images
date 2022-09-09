import { StyledButton } from './Button.styled';

export const LoadMoreBtn = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};
