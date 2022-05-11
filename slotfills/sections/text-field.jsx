import React from 'react';
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

  const updateValue = (next) => {
    const newValue = typeof value === 'object' ? { [name]: next } : next;
    setValue(newValue);
  };
  return (
    <PanelRow>
      <TextControl
        label={__('Title', 'fm-gutenberg')}
        onChange={updateValue}
        value={initialvalue}
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
