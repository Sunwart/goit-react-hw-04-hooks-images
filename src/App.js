import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './components/Searchbar/Searchbar';
import imagesApi from './services/imagesAPI';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(fetchImages, [page, query]);

  function fetchImages() {
    if (query !== '') {
      setStatus('pending');
      imagesApi.getImages(query, page).then(imgs => {
        if (imgs.hits.length === 0) {
          Notiflix.Notify.info('Sorry, no images found on your request.');
          setStatus('rejected');
          return;
        }

        const isRejected =
          imgs.hits.length < 12 || page * 12 === imgs.totalHits;
        setStatus(isRejected ? 'rejected' : 'resolved');

        const currentImages = imgs.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return {
              id,
              preview: webformatURL,
              img: largeImageURL,
              alt: tags,
            };
          }
        );
        setImages([...images, ...currentImages]);
      });
    }
  }

  const handleSearchFormSubmit = newQuery => {
    if (newQuery !== query) {
      setImages([]);
      setQuery(newQuery);
      setPage(1);
    } else {
      Notiflix.Notify.info('Please, enter new search request.');
    }
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchFormSubmit} />
      {status !== 'idle' && (
        <>
          <ImageGallery images={images} />
          {status === 'pending' && <Loader />}
          {status === 'resolved' && (
            <Button
              type="button"
              onClick={() => {
                setPage(prev => prev + 1);
              }}
              btnName={'Load more'}
            />
          )}
        </>
      )}
    </>
  );
}
