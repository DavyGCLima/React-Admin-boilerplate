import React from 'react';
import PropTypes from 'prop-types';

import {
  GridListTile,
  GridListTileBar,
  IconButton,
  StylesProvider,
} from '@material-ui/core';
import defaultProductIcon from '../../../../assets/icons/icon-product-3.jpg';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Star from '@material-ui/icons/Star';

import styles from './styles';

function ListItem({
  provided,
  onChangeThumb,
  handleDelete,
  thumb,
  image,
  showSelectThumb,
  setShowSelectThumb,
  isDragging,
}) {

  const classes = styles({ isDragging });

  return (
    <StylesProvider injectFirst>
      <GridListTile
        ref={provided.innerRef}
        onMouseEnter={() => setShowSelectThumb(true)}
        onMouseLeave={() => setShowSelectThumb(false)}
        key={image.id ? image.id : image.url}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`${classes.element} ${provided.draggableProps.style}`}
      >
        <img
          src={image.url ? image.url : defaultProductIcon}
          alt={image.alt}
          className={classes.image}
        />
        <GridListTileBar
          title={image.alt}
          classes={{
            root: classes.titleBar,
            title: classes.title,
          }}
          actionIcon={
            <>
              <IconButton onClick={() => onChangeThumb(image)} style={{ padding: 5 }}>
                {thumb.alt === image.alt &&
                  <Star className={classes.icon} />
                }
                {(showSelectThumb && thumb.alt !== image.alt) &&
                  <StarBorderIcon className={classes.icon} />
                }
              </IconButton>
              <IconButton onClick={() => handleDelete(image, thumb)} style={{ padding: 5 }}>
                <DeleteIcon className={classes.deleteIcon} />
              </IconButton>
            </>
          }
        />
      </GridListTile>
    </StylesProvider>
  );
}

ListItem.propTypes = {
  provided: PropTypes.object.isRequired,
  onChangeThumb: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  thumb: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  showSelectThumb: PropTypes.bool.isRequired,
  setShowSelectThumb: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
}

export default React.memo(ListItem);
