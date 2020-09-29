import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const styles = makeStyles((theme) => ({
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSaveWrapper: {
    position: 'relative',
  },
}));

export default styles;
