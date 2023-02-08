import { useState } from "react";
import { Stage, Layer, Text } from 'react-konva';
import { URLImage } from './URLImage'

export const TokenView = ({data, width, height}) => {
  return (
    <Stage  width={width} height={height}>
      {data &&
          data.map((token) =>
          <URLImage
            key={token.symbol}
            width={32}
            height={32}
            stageWidth={width}
            stageHeight={height}
            src={token.logo}
            text={token.symbol}
            />)
        }
    </Stage>
  );
}