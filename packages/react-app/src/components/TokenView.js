import { Stage, Layer, Group } from 'react-konva';
import { Token } from './Token'

export const TokenView = ({className, data, width, height}) => {
  return (
    <>
      <div className={className}>
        <Stage  width={width} height={height}>
          <Layer>
          {
            data.tokens.map((token) => {
              const tSide = token.pct * 1 * width;
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
    </>
  );
}