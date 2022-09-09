import { StyledIconButton } from './IconButton.styled';

export const IconButton = ({ children, icon, onClick }) => {
  return (
    <StyledIconButton onClick={onClick}>
      {icon}
      {children}
    </StyledIconButton>
  );
};
