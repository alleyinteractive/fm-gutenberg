import React from 'react';
import { PanelRow, TextControl } from '@wordpress/components';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';
import parse from 'style-to-js';

import './index.scss';

interface TextFieldProps {
  field: Field,
  index?: number,
  label?: string,
  type?: string,
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

export default function TextField({
  field: {
    attributes = {},
    description = '',
    description_after_element: descriptionAfterElement = true,
    name,
  },
  valueHook,
  index = null,
  label = '',
  type = 'text',
}: TextFieldProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  let initialvalue = value && typeof value === 'object' && !Array.isArray(value) ? value[name] : value;
  initialvalue = initialvalue ? String(initialvalue) : '';

  const onChange = (newValue:string) => {
    setValue(newValue);
  };
  // remap style to an object.
  const styleObject = attributes.style ? parse(attributes.style as string) : {};

  return (
    <PanelRow className={`fm-gutenberg-field__${type}`}>
      <div className="fm-gutenberg-flex__column">
        {description && !descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
        <TextControl
          {...attributes} // eslint-disable-line react/jsx-props-no-spreading
          label={label}
          onChange={onChange}
          value={initialvalue}
          key={`text-control-${name}-${index}`}
          style={styleObject}
          type={type}
        />
        {description && descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
      </div>
    </PanelRow>
  );
}
