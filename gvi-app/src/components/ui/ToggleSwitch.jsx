import React from 'react';
import '../../assets/styles/toggleSwitch.css';

const ToggleSwitch = ({onChange, isChecked, isFor}) => {
  return (
      <label className="switch" key={isFor}>
        <input className="toggle" type="checkbox" onChange={onChange} checked={isChecked} />
        <span className="slider" />
        <span className="card-side" />
      </label>
  );
}

export default ToggleSwitch;
