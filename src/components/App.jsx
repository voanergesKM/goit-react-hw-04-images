import { Component } from 'react';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { SearchForm } from './SearchForm/SearchForm';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { getImages } from './services/pixabay_api';

import { LoadMoreBtn } from './Button/Button';

export class App extends Component {
  state = {
    searchQuerry: null,
    page: 1,
    images: [],
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuerry !== this.state.searchQuerry ||
      prevState.page !== this.state.page
    ) {
      getImages(this.state.searchQuerry, this.state.page)
        .then(data =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }))
        )
        .catch(error => this.setState({ error }));
    }
  }

  handleSubmit = searchQuerry => {
    this.setState({
      searchQuerry,
      page: 1,
      images: [],
    });
  };

  handleMoreSearch = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        <SearchBar>
          <SearchForm onSubmit={this.handleSubmit} />
        </SearchBar>
        {this.state.images.length > 0 && (
          <ImageGallery>
            {this.state.images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ImageGallery>
        )}
        {this.state.images.length > 0 && (
          <LoadMoreBtn text="Load More" onClick={this.handleMoreSearch} />
        )}
      </>
    );
  }
}
