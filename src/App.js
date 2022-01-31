import { Component } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './components/Searchbar/Searchbar';
import imagesApi from './services/imagesAPI';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    const newQuery = this.state.query;
    const newPage = this.state.page;

    if ((prevQuery === newQuery && prevPage !== newPage) || prevQuery !== newQuery) {
      this.setState({ status: 'pending' });

      imagesApi.getImages(newQuery, newPage).then(images => {
        if (images.hits.length === 0) {
          Notiflix.Notify.info('Sorry, no images found on your request.');
          this.setState({ status: 'rejected', images: [] });
          return;
        }
        const isRejected = images.hits.length < 12 || newPage * 12 === images.totalHits;

        const currentImages = images.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, preview: webformatURL, img: largeImageURL, alt: tags };
        });

        this.setState({
          status: isRejected ? 'rejected' : 'resolved',
          images: [...this.state.images, ...currentImages],
        });
      });
    }
  }

  handleSearchFormSubmit = query => {
    if (query !== this.state.query) {
      this.setState({ query, page: 1, images: [] });
    } else {
      Notiflix.Notify.info('Please, enter new search request.');
    }
  };

  handleLoadMore() {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  render() {
    const { images, status } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {status !== 'idle' && (
          <>
            <ImageGallery images={images} />
            {status === 'pending' && <Loader />}
            {status === 'resolved' && (
              <Button type="button" onClick={() => this.handleLoadMore()} btnName={'Load more'} />
            )}
          </>
        )}
      </>
    );
  }
}
