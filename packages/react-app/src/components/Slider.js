export const Slider = ({step, min, max, value, onChange}) => {

    return (
        <div className='slider-wrapper container is-dark is-align-items-center is-flex is-flex-direction-column'
            data-tooltip='Change the scale'>
            <span className="slider-value tag is-dark is-large">{value / 10}</span>
            <input className="slider is-square is-info"
                step={step}
                min={min} 
                max={max}
                value={value}
                type="range"
                onChange={onChange} />
        </div>
    );
}