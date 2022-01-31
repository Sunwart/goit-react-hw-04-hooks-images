import { ImSpinner } from 'react-icons/im';
import { Spinner } from './Loader.styled';

export default function Loader() {
  return (
    <Spinner>
      <ImSpinner />
    </Spinner>
  );
}
