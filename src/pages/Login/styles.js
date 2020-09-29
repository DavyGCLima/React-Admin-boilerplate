import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const styles = makeStyles((theme) => {
  return {
    container: {
      height: '-webkit-fill-available',
      alignItems: 'center',
      justifyContent: 'center',
    },

    cardForm: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    field: {
      marginBottom: theme.spacing(2),
    },

    logoContainer: {
      margin: '0',
      alignItems: 'center',
      justifyContent: 'center',
    },

    logo: {
      height: '50%',
      width: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
    },

    background: {
      background: theme.palette.background.gradient,
    },

    actionsWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    resetPasswordLink: {
      cursor: 'pointer',
      color: theme.palette.secondary.main,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },

    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },

    feedbackWrapper: {
      width: '100%',
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
  }
});

export default styles;
