import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PanelRow, PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Group = ({
  field,
  field: {
    name,
  },
  valueHook,
}) => {
  const [value, setValue] = valueHook(name);
  console.log('field', field);
  console.log('value', value);
  return (
    <PanelBody>
      <PanelRow>

      </PanelRow>
    </PanelBody>
  );
};

Group.propTypes = {
  field: PropTypes.shape({}).isRequired,
  valueHook: PropTypes.func.isRequired,
};

export default Group;
