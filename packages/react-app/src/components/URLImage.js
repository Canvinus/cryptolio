import React, { useState, useEffect } from 'react';
import { Image } from 'react-konva';

export const URLImage = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadImage();
  }, [props.src]);

  const loadImage = () => {
    let img = new window.Image();
    img.src = props.src;
    setImage(img);
  }

  return (
    <Image
      imgKey={props.key}
      onDragEnd={props.onDragEnd}
      onClick={props.onClick}
      width={props.width}
      height={props.height}
      x={props.x}
      y={props.y}
      image={image}
      draggable
    />
  );
}