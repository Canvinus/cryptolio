import { useState } from "react";
import { Stage, Layer } from 'react-konva';
import { URLImage } from './URLImage'

export const TokenView = ({data, width, height}) => {
  const [info, setInfo] = useState(null);

  const onDrag = (e) => {
    const x = e.target.x();
    const y = e.target.y();

    if(x <= 0) {
      e.target.x(0);
    }
    else if(x >= width) {
      e.target.x(width - e.target.width());
    }
    if(y <= 0) {
      e.target.y(0);
    }
    else if(y >= height) {
      e.target.y(height - e.target.height())
    }
  }

  const handleClick = ({target}) => {
    console.log(target.imgKey);
  }

  return (
    <Stage  width={width} height={height}>
      <Layer>
        {data &&
          data.map((token) =>
          <URLImage
            key={token.symbol}
            imgKey={token.symbol}
            onDragEnd={onDrag}
            width={32}
            height={32}
            x={Math.random() * width} 
            y={Math.random() * height} 
            src={token.logo}
            onClick={handleClick}
            draggable
            />)
        }
      </Layer>
    </Stage>
  );
}