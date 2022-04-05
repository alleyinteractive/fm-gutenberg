import React from 'react';
import PropTypes from 'prop-types';
import { PanelRow, PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const TextField = ({
  field,
  field: {
    name,
  },
  valueHook,
}) => {
  const [value, setValue] = valueHook(name);
  return (
    <PanelBody>
      <PanelRow>
        <TextControl
          label={__('Title', 'fm-gutenberg')}
          onChange={(next) => setValue(next)}
          value={value}
        />
      </PanelRow>
    </PanelBody>
  );
};

TextField.propTypes = {
  field: PropTypes.shape({}).isRequired,
  valueHook: PropTypes.func.isRequired,
};

export default TextField;
