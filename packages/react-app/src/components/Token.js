import React, { useState, useEffect } from 'react';
import {Image, Text, Group } from 'react-konva';
import { useInterval } from 'usehooks-ts';

export const Token = (props) => {
  const [image, setImage] = useState(null);
  const [x, setX] = useState(Math.random() * props.stageWidth);
  const [y, setY] = useState(Math.random() * props.stageHeight);
  const [clicked, setClicked] = useState(false);

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

  const getStep = (direction) => {
    return Math.random() * direction;
  }

  const [stepX, setStepX] = useState(getStep(Math.random() > 0.5 ? -1 : 1)); 
  const [stepY, setStepY] = useState(getStep(Math.random() > 0.5 ? -1 : 1));

  const randomMove = () => {
    if(x <= 0) {
      setStepX(getStep(1));
    }
    else if(x >= props.stageWidth - props.width) {
      setStepX(getStep(-1));
    }
    if(y <= 0) {
      setStepY(getStep(1));
    }
    else if(y >= props.stageHeight - props.height) {
      setStepY(getStep(-1));
    }
  
    setX(prev => prev + stepX);
    setY(prev => prev + stepY);
  }

  useInterval(() => {
    if(clicked)
      return;
    randomMove();
  }, 1);

  // const onDrag = () => {
  //   if(x <= 0) {
  //     setX(0);
  //   }
  //   else if(x >= props.stageWidth) {
  //     setX(props.stageWidth - props.width());
  //   }
  //   if(y <= 0) {
  //     setY(0);
  //   }
  //   else if(y >= props.stageHeight) {
  //     setY(props.stageHeight - props.height())
  //   }
  // }

  return (
    <Group
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
      />}
    </Group>
  );
}