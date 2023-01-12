import React, { useState } from 'react';
import { PanelRow, DatePicker } from '@wordpress/components';
import { dateI18n } from '@wordpress/date';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';

interface DateFieldProps {
  field: Field,
  index?: number,
  label?: string,
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

export default function DateField({
  field,
  field: {
    attributes = {},
    date_format: dateFormat = 'Y-m-d',
    description = '',
    description_after_element: descriptionAfterElement = true,
    name,
  },
  valueHook,
  index = null,
  // label = '',
}: DateFieldProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  let initialvalue = value && typeof value === 'object' && !Array.isArray(value) ? value[name] : value;
  initialvalue = initialvalue ? String(initialvalue) : '';

  const onChange = (newValue:string) => {
    setValue(newValue);
  };
  console.log('field', field);

  return (
    <PanelRow>
      <div className="fm-gutenberg-flex__column">
        {description && !descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
        <input type="text" defaultValue={dateI18n(dateFormat, new Date(parseInt(initialvalue, 10) * 1000), null)} onClick={() => setShowPicker(!showPicker)} />
        {showPicker ? (
          <DatePicker
            {...attributes} // eslint-disable-line react/jsx-props-no-spreading
            onChange={onChange}
            currentDate={parseInt(initialvalue, 10) * 1000}
            key={`text-control-${name}-${index}`}
          />
        ) : null}
        {description && descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
      </div>
    </PanelRow>
  );
}
