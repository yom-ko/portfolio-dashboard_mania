import styled from 'react-emotion';
import PropTypes from 'prop-types';

const MainText = styled.p`
  color: ${props => (props.color ? props.color : 'black')};
`;

MainText.propTypes = {
  color: PropTypes.string
};

export default MainText;
