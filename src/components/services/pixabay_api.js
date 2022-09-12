import PropTypes from 'prop-types';

export const getImages = (searchQuerry, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuerry}&page=${page}&key=29375118-d0e787d59f493d03f13f4e7b5&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Can't find ${searchQuerry}`));
  });
};

getImages.propTypes = {
  searchQuerry: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
