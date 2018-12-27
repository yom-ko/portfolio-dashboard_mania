import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const MainText = styled.p`
  color: ${props => (props.color ? props.color : '#4a4a4a')};
`;

MainText.propTypes = {
  color: PropTypes.string
};

export default MainText;
