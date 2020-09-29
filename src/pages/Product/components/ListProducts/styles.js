import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(() => ({
   image: {
    maxWidth: 100,
    maxHeight: 100,
    height: 'auto',
    width: 'auto',
    marginRight: 10,
    borderRadius: 6,
  },
  cursor: {
    cursor: 'pointer',
  }
}));

export default styles;
