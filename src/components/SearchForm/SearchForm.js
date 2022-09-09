import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
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
    evt.preventDefault();

    this.props.onSubmit(this.state.searchInput.trim());

    this.setState({
      searchInput: '',
    });
  };

  render() {
    const { searchInput } = this.state;
    const { onSubmit } = this.props;

    return (
      <>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledInput
            onChange={this.handleInputChange}
            value={searchInput}
          ></StyledInput>
          <IconButton
            type="submit"
            aria-label="Search button"
            icon={<FaSearch size={24} />}
          ></IconButton>
        </StyledForm>
      </>
    );
  }
}
