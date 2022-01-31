import { LoadButton } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ btnName, onClick }) => {
  return <LoadButton onClick={onClick}>{btnName}</LoadButton>;
};

export default Button;

Button.propTypes = {
  btnName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
