import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './styles';
import ListItem from './Listitem';

const ListImages = ({ thumb, images, onChangeThumb, onDeleteImage, onDeleteThumb, setImages }) => {

  const [showSelectThumb, setShowSelectThumb] = useState(false);

  function handleDelete(image, thumb) {
    if (thumb.alt === image.alt) {
      onDeleteThumb();
    }
    onDeleteImage(image);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const reorded = reorder(
      images,
      result.source.index,
      result.destination.index
    );

    setImages(reorded)
  }

  function RenderListRoot(props) {
    const { provided, children } = props;
    const classes = styles(props);
    return (
      <div
      ref={provided.innerRef}
      className={classes.gridList}
      {...provided.droppableProps}
    >
      {children}
    </div>
    );
  }

  const classes = styles({ isDraggingOver: false, isDragging: false });

  return (
    <DragDropContext onDragEnd={onDragEnd} className={classes.root}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <RenderListRoot isDraggingOver={snapshot.isDraggingOver} provided={provided}>
            {images.map((image, index) => (
              <Draggable
                key={image.id ? image.id : image.url}
                draggableId={image.id ? image.id : image.url}
                index={index}>
                {(draggProvided, draggSnapshot) => (
                  <ListItem
                    provided={draggProvided}
                    isDragging={draggSnapshot.isDragging}
                    classes={classes}
                    handleDelete={handleDelete}
                    onChangeThumb={onChangeThumb}
                    thumb={thumb}
                    image={image}
                    showSelectThumb={showSelectThumb}
                    setShowSelectThumb={setShowSelectThumb}
                    />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </RenderListRoot>
        )}
      </Droppable>
    </DragDropContext >
  );
}

ListImages.propTypes = {
  images: PropTypes.array.isRequired,
  thumb: PropTypes.object.isRequired,
  onChangeThumb: PropTypes.func.isRequired,
  onDeleteThumb: PropTypes.func.isRequired,
  setImages: PropTypes.func.isRequired,
};

export default ListImages;
