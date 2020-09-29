import { makeStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';

const styles = makeStyles((theme) => ({
  buttonProgress: {
    color: red[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSaveWrapper: {
    position: 'relative',
  },
  revertButton: {
    marginLeft: '5px',
    marginRight: '5px',
    color: red[500],
    borderColor: red[500],
  }
}));

export default styles;
