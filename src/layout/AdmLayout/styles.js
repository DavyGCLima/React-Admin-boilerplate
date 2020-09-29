import { makeStyles } from '@material-ui/styles';

const style = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    // TODO switch the 68px for a variable
    marginTop:'64px',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default style;
