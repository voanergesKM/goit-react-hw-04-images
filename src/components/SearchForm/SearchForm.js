import { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { StyledForm, StyledInput } from './SearchForm.styled';
import { IconButton } from 'components/IconButton/IconButton';

export class SearchForm extends Component {
  state = {
    searchInput: '',
  };

  handleInputChange = evt => {
    this.setState({
      searchInput: evt.currentTarget.value,
    });
  };

  handleSubmit = evt => {
    const { searchInput } = this.state;
    evt.preventDefault();

    if (searchInput.trim() === '') {
      toast.info('Please, enter your search term', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    this.props.onSubmit(searchInput.trim());

    this.setState({
      searchInput: '',
    });
  };

  render() {
    const { searchInput } = this.state;
    const { isLoading } = this.props;

    return (
      <>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledInput
            onChange={this.handleInputChange}
            value={searchInput}
          ></StyledInput>
          <IconButton
            isLoading={isLoading}
            type="submit"
            aria-label="Search button"
            icon={<FaSearch size={24} />}
          ></IconButton>
        </StyledForm>
      </>
    );
  }
}

SearchForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
