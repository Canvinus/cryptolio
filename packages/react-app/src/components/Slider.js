import { useState } from 'react';

export const Slider = ({step, min, max}) => {
    const [value, setValue] = useState(min);
    const handleChange = (e) => {
        setValue(e.target.value);   
    }

    return (
        <div className='slider-wrapper container is-dark is-align-items-center is-flex is-flex-direction-column'>
            <span className="slider-value tag is-dark is-large">{value}</span>
            <input className="slider is-circle" 
                step={step}
                min={min} 
                max={max}
                value={value}
                type="range"
                onChange={handleChange} />
        </div>
    );
}