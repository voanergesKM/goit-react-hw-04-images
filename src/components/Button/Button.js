import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

export const LoadMoreBtn = ({ text, onClick, isLoading }) => {
  return (
    <StyledButton onClick={onClick} disabled={isLoading}>
      {text}
    </StyledButton>
  );
};

LoadMoreBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onclick: PropTypes.func,
  isLoading: PropTypes.bool,
};
