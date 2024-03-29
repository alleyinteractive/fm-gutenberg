/* global tinyMCEPreInit */
import React, { useState } from 'react';
import { PanelRow } from '@wordpress/components';
import { Editor } from '@tinymce/tinymce-react';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';
import { v4 as uuidv4 } from 'uuid';

declare global {
  const tinyMCEPreInit: {
    baseURL: string,
  };
}

interface RichtextFieldProps {
  field: Field;
  index?: number;
  label: string;
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

export default function RichtextField({
  field: {
    name,
  },
  valueHook,
  index = null,
  label = '',
}: RichtextFieldProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  let initialvalue = typeof value === 'object' && !Array.isArray(value) ? value[name] : value;
  initialvalue = initialvalue ? String(initialvalue) : '';

  const [stateValue, setStateValue] = useState(initialvalue);

  const updateValue = () => { // eslint-disable-line no-unused-vars
    const newValue = typeof value === 'object' ? { [name]: stateValue } : stateValue;
    setValue(newValue);
  };

  const id = uuidv4();

  return (
    <PanelRow>
      <div className="fm-gutenberg-panel-container">
        <label htmlFor={id}>
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
          id={id}
        />
      </div>
    </PanelRow>
  );
}
