import { makeStyles } from '@material-ui/styles';
import styled, { keyframes } from 'styled-components';

import { Avatar } from '@material-ui/core';

const styles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    marginBottom: 16,
    marginTop: 16,
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  },
  opened: {},
  closed: {},
}));

export default styles;

const reduce = keyframes`
  from {
    width: 60px;
    height: 60px;
  };
  to {
    width: 40px;
    height: 40px;
  }
`;

const grow = keyframes`
  from {
    width: 40px;
    height: 40px;
  };
  to {
    width: 60px;
    height: 60px;
  }
`;

export const AvatarAnimated = styled(Avatar)`
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-name: ${props => props.animate ? reduce : grow};
  animation-fill-mode: forwards;
`;
