import React from 'react';
import PropTypes from 'prop-types';

import TextField from './text-field';
import TextareaField from './textarea-field';
import RichtextField from './richtext-field';

const FieldRouter = ({
  field,
  field: {
    field_class: fieldClass,
    attributes: {
      rows = null,
    } = {},
    label = '',
  },
  index,
  valueHook,
}) => {
  if (fieldClass === 'text') {
    if (rows) {
      return (
        <TextareaField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
    }
    return (
      <TextField
        field={field}
        valueHook={valueHook}
        index={index}
        label={label}
      />
    );
  }
  if (fieldClass === 'richtext') {
    return (
      <RichtextField
        field={field}
        valueHook={valueHook}
        index={index}
        label={label}
      />
    );
  }
  return null;
};

FieldRouter.defaultProps = {
  index: null,
};

FieldRouter.propTypes = {
  field: PropTypes.shape({
    field_class: PropTypes.string.isRequired,
    attributes: PropTypes.shape({
      rows: PropTypes.number,
    }),
    label: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
  valueHook: PropTypes.func.isRequired,
};

export default FieldRouter;
