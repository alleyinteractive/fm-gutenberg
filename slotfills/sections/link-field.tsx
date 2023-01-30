import React, { useState } from 'react';
import { PanelRow, TextControl } from '@wordpress/components';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';
import parse from 'style-to-js';
import { isURL } from '@wordpress/url';
import { redo } from '@wordpress/editor/store/actions';

interface LinkFieldProps {
  field: Field,
  index?: number,
  label?: string,
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

export default function LinkField({
  field: {
    attributes = {},
    description = '',
    description_after_element: descriptionAfterElement = true,
    name,
  },
  valueHook,
  index = null,
  label = '',
}: LinkFieldProps) {
  const [invalid, setInvalid] = useState(false);
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  let initialvalue = value && typeof value === 'object' && !Array.isArray(value) ? value[name] : value;
  initialvalue = initialvalue ? String(initialvalue) : '';

  const onChange = (newValue:string) => {
    setValue(newValue);
  };

  const onBlur = () => {
    console.log('initialvalue', initialvalue);
    if (!isURL(initialvalue as string)) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  };
  console.log('invald', invalid);

  // remap style to an object.
  let styleObject = attributes.style ? parse(attributes.style as string) : {};
  if (invalid) {
    styleObject = {
      ...styleObject,
      borderColor: 'red',
    };
  }

  return (
    <PanelRow>
      <div className="fm-gutenberg-flex__column">
        {description && !descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
        <TextControl
          {...attributes} // eslint-disable-line react/jsx-props-no-spreading
          label={label}
          onBlur={onBlur}
          onChange={onChange}
          value={initialvalue}
          key={`text-control-${name}-${index}`}
          style={styleObject}
        />
        {description && descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
      </div>
    </PanelRow>
  );
}
