import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  gridList: {
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 350px)',
    gridGap: '10px',
    backgroundColor: props => props.isDraggingOver ? 'lightgrey' : 'white',
  },
  element: {
    display: 'inline-block',
    listStyle: 'none',
    '.MuiIconButton-root': {
      padding: 0
    },
    border: props => props.isDragging ? '2px solid #ddffff' : '0px transparent',
    borderRadius: '6px',
    boxShadow: props => props.isDragging ? `inset 0 0 1em ${theme.palette.primary.dark}, 0 0 1em ${theme.palette.primary.light}` : 'none',
  },
  title: {
    fontSize: '12px'
  },
  icon: {
    color: 'red',
  },
  deleteIcon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  image: {
    display: 'block',
    margin: 'auto',
    height: '200px',
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%'
  }
}));

export default styles;
