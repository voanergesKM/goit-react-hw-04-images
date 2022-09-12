import { Component } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { SearchForm } from './SearchForm/SearchForm';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { getImages } from './services/pixabay_api';
import { LoadMoreBtn } from './Button/Button';
import { LoaderWrapper } from './Loader/Loader.styled';

export class App extends Component {
  state = {
    searchQuerry: null,
    page: 1,
    images: [],
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuerry, page } = this.state;

    if (prevState.searchQuerry !== searchQuerry || prevState.page !== page) {
      getImages(searchQuerry, page)
        .then(data => {
          if (data.total === 0) {
            this.setState({ isLoading: false });
            return toast.info('Sorry, nothing was found for your search');
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            isLoading: false,
          }));
        })
        .catch(error => {
          console.log(error);
          this.setState({ error });
        });
    }
  }

  handleSubmit = searchQuerry => {
    this.setState({
      searchQuerry,
      page: 1,
      images: [],
      isLoading: true,
    });
  };

  handleMoreSearch = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  render() {
    const { isLoading, images } = this.state;

    return (
      <>
        <SearchBar>
          <SearchForm onSubmit={this.handleSubmit} isLoading={isLoading} />
        </SearchBar>
        {images.length > 0 && (
          <ImageGallery>
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ImageGallery>
        )}
        {isLoading && (
          <LoaderWrapper>
            <RotatingLines
              strokeColor="#303f9f"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </LoaderWrapper>
        )}
        {images.length > 0 && !isLoading && (
          <LoadMoreBtn text="Load More" onClick={this.handleMoreSearch} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}
