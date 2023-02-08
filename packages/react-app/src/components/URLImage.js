import React, { useState, useEffect } from 'react';
import { Layer, Image, Text } from 'react-konva';

export const URLImage = (props) => {
  const [image, setImage] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [clicked, setClicked] = useState(false);

  const click = () => {
    setClicked((prev) => !prev);
  }

  useEffect(() => {
    loadImage();
  }, [props.src]);

  useEffect(() => {
    setX(Math.random() * props.stageWidth);
    setY(Math.random() * props.stageHeight);
  }, []);

  const loadImage = () => {
    let img = new window.Image();
    img.src = props.src;
    setImage(img);
  }

  const onDrag = (e) => {
    console.log(e.target.children)
    const x = e.target.x();
    const y = e.target.y();

    if(x <= 0) {
      e.target.x(0);
    }
    else if(x >= props.stageWidth) {
      e.target.x(props.stageWidth - e.target.width());
    }
    if(y <= 0) {
      e.target.y(0);
    }
    else if(y >= props.stageHeight) {
      e.target.y(props.stageHeight - e.target.height())
    }
  }

  return (
    <Layer 
      draggable 
      onDragEnd={onDrag}
      onClick={click}
      x={x} 
      y={y}>
      <Image
        width={props.width}
        height={props.height}
        image={image}
      />
      {clicked && <Text 
        text={props.text}
        fontSize={32}/>}
    </Layer>
  );
}