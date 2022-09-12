import PropTypes from 'prop-types';
import { StyledBar } from './Searchbar.styled';

export const SearchBar = ({ children }) => {
  return <StyledBar>{children}</StyledBar>;
};

SearchBar.propType = {
  children: PropTypes.node.isRequired,
};
