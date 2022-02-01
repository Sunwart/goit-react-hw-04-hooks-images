import { useState, useRef, useEffect } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './components/Searchbar/Searchbar';
import imagesApi from './services/imagesAPI';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  const images = useRef([]);

  useEffect(() => {
    if (query !== '') {
      imagesApi.getImages(query, page).then(imgs => {
        if (imgs.hits.length === 0) {
          Notiflix.Notify.info('Sorry, no images found on your request.');
          setStatus('rejected');
          return;
        }

        const isRejected =
          imgs.hits.length < 12 || page * 12 === imgs.totalHits;

        const currentImages = [
          ...imgs.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
            return {
              id,
              preview: webformatURL,
              img: largeImageURL,
              alt: tags,
            };
          }),
        ];

        images.current.push(...currentImages);

        setStatus(isRejected ? 'rejected' : 'resolved');
      });
    }
  }, [query, page]);

  const handleSearchFormSubmit = newQuery => {
    if (newQuery !== query) {
      setStatus('pending');
      images.current = [];
      setQuery(newQuery);
      setPage(1);
    } else {
      Notiflix.Notify.info('Please, enter new search request.');
      return;
    }
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchFormSubmit} />
      {status !== 'idle' && (
        <>
          <ImageGallery images={images.current} />
          {status === 'pending' && <Loader />}
          {status === 'resolved' && (
            <Button
              type="button"
              onClick={() => {
                setStatus('pending');
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
