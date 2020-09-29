import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white,
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  menu: {
    padding: '10px',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    width: '100px',
  },

  logoContainer: {
    justifyContent: 'center',
  },

  logo: {
    height: '50%',
    width: '50%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default styles;
