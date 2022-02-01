import { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SerchFormButtonLabel,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleQuerySubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      alert('Oooooooops, wrong query!');
      return;
    }
    onSubmit(query);
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleQuerySubmit}>
        <SearchFormButton type="submit">
          <SerchFormButtonLabel>Search</SerchFormButtonLabel>
          <SearchIcon fill="darkgray" width="24" />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={event => setQuery(event.currentTarget.value.toLowerCase())}
        />
      </SearchForm>
    </SearchbarContainer>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
