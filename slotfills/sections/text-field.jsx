import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const TextField = ({
  field: {
    name,
  },
  valueHook,
  index = null,
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
      <TextControl
        label={__('Title', 'fm-gutenberg')}
        onChange={setStateValue}
        onBlur={updateValue}
        value={stateValue}
      />
    </PanelRow>
  );
};

TextField.defaultProps = {
  index: null,
};

TextField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  valueHook: PropTypes.func.isRequired,
  index: PropTypes.number,
};

export default TextField;
