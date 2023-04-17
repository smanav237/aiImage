import React from 'react';

const Form = ({labelName,type,name,placeholder,value,handleChange,isSurpriseMe,handleSurpriseMe}) => (
  <div>
    <div className="label">
      <label
        htmlFor={name}
        className="label-name"
      >
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="cust-button1 surprise-btn"
        >
          Surprise me
        </button>
      )}
    </div>
    <input 
      type={type}
      id={name}
      name={name}
      className="form-input-field"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default Form;