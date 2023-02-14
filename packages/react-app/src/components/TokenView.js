import { useState } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import { Token } from './Token';
import { Slider } from './Slider';

export const TokenView = ({className, data, width, height}) => {
  const [scale, setScale] = useState(10);
  const handleScaleChange = (e) => {
    setScale(e.target.value);
  }

  return (
    <>
      <div className={className}>
        <Stage width={width} height={height}>
          <Layer>
          {
            data.tokens.map((token) => {
              const tSide = token.pct * (scale / 10) * width;
              if (token.pct <= 0.01) {
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
      <div id='navbar-bottom' className='navbar is-fixed-bottom'>
        <Slider id='token-view-slider' step='1' min='1' max='10' value={scale} onChange={handleScaleChange}  />
      </div>
    </>
  );
}