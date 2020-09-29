import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const styles = makeStyles((theme) => ({
  row: {
    height: '42px',
    display: 'flex',
    marginTop: theme.spacing(2),
    width: '100%'
  },
  imageContainer: {
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing(1),
  },
  item: {
    marginBottom: 0,
    paddingBottom: 0,

    '& > *': {
      paddingBottom: theme.spacing(2),
    }
  },
  itemOutlined: {
    paddingBottom: 0,
    marginBottom: '12px',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  wrapper: {
    border: 0,
  },
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
  qrContainer: {
    textAlign: 'center'
  },

  textEditorContainer: {
    marginBottom: '20px',
    border: '1px solid #c4c4c4',
    borderRadius: '6px',
    padding: '15px',
    position: 'relative',

    '& span': {
      fontWeight: '400',
      fontSize: '11px',
      display: 'block',
      position: 'absolute',
      top: '-10px',
      left: '12px',
      padding: '0',
      pointerEvents: 'none',
      backgroundColor: 'white',
      paddingRight: '5px',
      paddingLeft: '5px',
    }
  },
  manageMagazinesButton: {
    marginTop: '10px',
    marginLeft: '20px',
  },
}));

export default styles;
