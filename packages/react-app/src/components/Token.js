import React, { useState, useEffect } from 'react';
import { Layer, Image, Text } from 'react-konva';
import { useInterval } from 'usehooks-ts';

export const Token = (props) => {
  const [image, setImage] = useState(null);
  const [x, setX] = useState(Math.random() * props.stageWidth);
  const [y, setY] = useState(Math.random() * props.stageHeight);
  const [clicked, setClicked] = useState(false);

  const [stepX, setStepX] = useState(-1); 
  const [stepY, setStepY] = useState(-1);

  const click = () => {
    setClicked((prev) => !prev);
  }

  useEffect(() => {
    loadImage();
  }, [props.src]);

  const loadImage = () => {
    let img = new window.Image();
    img.src = props.src;
    setImage(img);
  }
  
  const randomMove = () => {
    if(x <= 0) {
      setStepX(1);
    }
    else if(x >= props.stageWidth) {
      setStepX(-1);
    }
    if(y <= 0) {
      setStepY(1);
    }
    else if(y >= props.stageHeight) {
      setStepY(-1);
    }
  
    setX(prev => prev + stepX);
    setY(prev => prev + stepY);
  }

  useInterval(() => {
    randomMove();
  }, 1);

  const onDrag = (e) => {
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