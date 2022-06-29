/* global tinyMCEPreInit */
import React, { useState } from 'react';
import { PanelRow } from '@wordpress/components';
import { Editor } from '@tinymce/tinymce-react';
import Field from '@/interfaces/field';

declare global {
  const tinyMCEPreInit: {
    baseURL: string,
  };
}

type Props = {
  field: Field,
  valueHook: Function,
  index: Number,
  label: string,
};

export default function RichtextField({
  field: {
    name,
  },
  valueHook,
  index = null,
  label = '',
}: Props) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = typeof value === 'object' ? value[name] : value;
  const [stateValue, setStateValue] = useState(initialvalue);

  const updateValue = () => { // eslint-disable-line no-unused-vars
    const newValue = typeof value === 'object' ? { [name]: stateValue } : stateValue;
    setValue(newValue);
  };

  return (
    <PanelRow>
      <div className="fm-gutenberg-panel-container">
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
}
