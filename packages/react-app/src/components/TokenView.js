import { useState, useEffect } from "react";
import { Stage, Layer, Group } from 'react-konva';
import { Token } from './Token'
import { Slider } from './Slider';

export const TokenView = ({className, data, width, height}) => {
  const [minValue, setMinValue] = useState(1);
  const [factor, setFactor] = useState(Math.round(data.maxValue).toString().length - 2);
  const scale = 0.1 ** (factor - 0.5);

  const handleSliderChange = (e) => {
    setMinValue(e.target.value);
  }

  useEffect(() => {

  }, [minValue])

  return (
    <>
      <Slider step='1' min='1' max='10000' value={minValue} onChange={handleSliderChange}/>
      <div className={className}>
        <Stage  width={width} height={height}>
          <Layer>
          {
            data.tokens.map((token) => {
              const tSide = scale * (token.totalValue < minValue ? minValue : token.totalValue);
              if (tSide <= 10) {
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
    </>
  );
}