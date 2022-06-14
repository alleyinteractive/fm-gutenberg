import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

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
  const fieldKey = uuidv4();
  return (
    <>
      {fieldClass === 'text' && rows === null ? (
        <TextField
          key={fieldKey}
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      ) : null}
      {fieldClass === 'text' && rows !== null ? (
        <TextareaField
          key={fieldKey}
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      ) : null}
      {fieldClass === 'richtext' ? (
        <RichtextField
          key={fieldKey}
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      ) : null}
    </>
  );
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
