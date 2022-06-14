/* global tinyMCEPreInit */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PanelRow } from '@wordpress/components';
import { Editor } from '@tinymce/tinymce-react';

const RichtextField = ({
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

  const updateValue = () => { // eslint-disable-line no-unused-vars
    const newValue = typeof value === 'object' ? { [name]: stateValue } : stateValue;
    setValue(newValue);
  };

  return (
    <PanelRow>
      <div style={{ flexDirection: 'column' }}>
        <label htmlFor={`${name}_${index}`}>
          {label}
        </label>
        <Editor
          value={stateValue}
          tinymceScriptSrc={`${tinyMCEPreInit.baseURL}/tinymce.min.js`}
          init={{
            height: 200,
            menubar: false,
            plugins: [
              'lists link image fullscreen media paste',
            ],
            toolbar: 'formatselect bold italic bullist numlist blockquote alignleft aligncenter alignright link fullscreen',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
          onEditorChange={setStateValue}
          onBlur={updateValue}
          id={`${name}_${index}`}
        />
      </div>
    </PanelRow>
  );
};

RichtextField.defaultProps = {
  index: null,
  label: '',
};

RichtextField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  valueHook: PropTypes.func.isRequired,
  index: PropTypes.number,
  label: PropTypes.string,
};

export default RichtextField;
