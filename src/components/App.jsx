import { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { SearchForm } from './SearchForm/SearchForm';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { getImages } from './services/pixabay_api';
import { LoadMoreBtn } from './Button/Button';
import { Box } from './Box';

export const App = () => {
  const [searchQuerry, setSearchQuerry] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMoreBtnHide, setIsMoreBtnHide] = useState(false);

  useEffect(() => {
    if (!searchQuerry) {
      return;
    } else {
      getImages(searchQuerry, page)
        .then(data => {
          if (data.hits.length < 12) {
            setIsMoreBtnHide(true);
          }

          if (data.total === 0) {
            setIsLoading(false);
            return toast.info('Sorry, nothing was found for your search');
          }

          setImages(images => [...images, ...data.hits]);

          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
          setError(error);
        });
    }
  }, [searchQuerry, page]);

  const handleSubmit = searchQuerry => {
    setSearchQuerry(searchQuerry);
    setPage(1);
    setImages([]);
    setIsLoading(true);
    setIsMoreBtnHide(false);
  };

  const handleMoreSearch = () => {
    setPage(page => page + 1);
    setIsLoading(true);
  };

  return (
    <>
      <SearchBar>
        <SearchForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          searchQuerry={searchQuerry}
        />
      </SearchBar>
      {error && <p>Ups! Something went wrong!</p>}
      {images.length > 0 && (
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </ImageGallery>
      )}
      {isLoading && (
        <Box display="flex" mt="20px" justifyContent="center">
          <RotatingLines
            strokeColor="#303f9f"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </Box>
      )}
      {images.length > 0 && !isLoading && !isMoreBtnHide && (
        <LoadMoreBtn text="Load More" onClick={handleMoreSearch} />
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
};
