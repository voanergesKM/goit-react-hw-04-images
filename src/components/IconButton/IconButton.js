import { StyledIconButton } from './IconButton.styled';

export const IconButton = ({ children, icon, onClick, isLoading }) => {
  return (
    <StyledIconButton disabled={isLoading} onClick={onClick}>
      {icon}
      {children}
    </StyledIconButton>
  );
};
