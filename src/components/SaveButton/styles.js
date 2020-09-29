import styled from 'styled-components';
import { green } from '@material-ui/core/colors';

import {
  Grid,
  CircularProgress,
} from '@material-ui/core';

export const Container = styled(Grid)`
  position: relative;
`;

export const SaveProgress = styled(CircularProgress)`
  color: ${green[500]};
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
  size: ${props => props.size}
`;
