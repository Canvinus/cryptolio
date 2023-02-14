export const Slider = ({id, step, min, max, value, onChange}) => {

    return (
        <div id='slider-wrapper' className='container is-dark is-align-items-center is-flex is-flex-direction-row'>
            <input id={id} className='slider is-square is-info mr-1'
                data-tooltip='Change the scale'
                step={step}
                min={min} 
                max={max}
                value={value}
                type="range"
                onChange={onChange} />
            <span className="slider-value tag is-dark is-small">{value / 10}</span>
        </div>
    );
}