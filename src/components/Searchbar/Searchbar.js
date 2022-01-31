import { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SerchFormButtonLabel,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = { query: '' };

  handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleQuerySubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Oooooooops, wrong query!');
      return;
    }
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleQuerySubmit}>
          <SearchFormButton type="submit">
            <SerchFormButtonLabel>Search</SerchFormButtonLabel>
            <SearchIcon fill="darkgray" width="24" />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleQueryChange}
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
}
