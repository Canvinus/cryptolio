import { useState } from "react";
import { Stage, Layer, Text, Group } from 'react-konva';
import { Token } from './Token'

export const TokenView = ({className, data, width, height}) => {
  const minValue = 1;
  const scale = 0.1 ** (4 - 0.5);
  const [minScale, setMinScale] = useState(10);

  return (
    <div className={className}>
      <Stage  width={width} height={height}>
        <Layer>
        {data &&
            data.map((token) => {
              const tSide = scale * (token.totalValue < minValue ? minValue : token.totalValue);
              if (tSide <= minScale) {
                return <Group key={token.symbol}></Group>
              }
              return (<Token
                key={token.symbol}
                width={tSide}
                height={tSide}
                stageWidth={width}
                stageHeight={height}
                src={token.logo}
                text={token.symbol}
              />)
            })
          }
        </Layer>
      </Stage>
    </div>
  );
}