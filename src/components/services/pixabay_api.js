export const getImages = querry => {
  fetch(
    `https://pixabay.com/api/?q=${querry}&page=1&key=29375118-d0e787d59f493d03f13f4e7b5&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => res.json());
};
