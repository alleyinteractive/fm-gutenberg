import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PanelRow, TextareaControl } from '@wordpress/components';

const TextareaField = ({
  field: {
    name,
  },
  valueHook,
  index = null,
  label = '',
}) => {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = typeof value === 'object' ? value[name] : value;
  const [stateValue, setStateValue] = useState(initialvalue);

  const updateValue = () => {
    const newValue = typeof value === 'object' ? { [name]: stateValue } : stateValue;
    setValue(newValue);
  };
  return (
    <PanelRow>
      <TextareaControl
        label={label}
        onChange={setStateValue}
        onBlur={updateValue}
        value={stateValue}
      />
    </PanelRow>
  );
};

TextareaField.defaultProps = {
  index: null,
  label: '',
};

TextareaField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  valueHook: PropTypes.func.isRequired,
  index: PropTypes.number,
  label: PropTypes.string,
};

export default TextareaField;
