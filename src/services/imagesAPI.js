import axios from 'axios';

async function getImages(query, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=24356494-65e5de300274261a131c8d68e&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return response.data;
}

const api = { getImages };

export default api;
