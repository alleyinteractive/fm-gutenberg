import React, { useState } from 'react';
import {
  PanelRow,
  DatePicker,
  DateTimePicker,
  TextControl,
  Button,
} from '@wordpress/components';
import { gmdateI18n, getDate, __experimentalGetSettings } from '@wordpress/date';
import { __ } from '@wordpress/i18n';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';

import './index.scss';

interface DateFieldProps {
  field: Field;
  index?: number;
  label?: string;
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

interface DateSettings {
  timezone: {
    offset: number;
  }
}

export default function DateField({
  field: {
    attributes = {},
    date_format: dateFormat = 'Y-m-d',
    description = '',
    description_after_element: descriptionAfterElement = true,
    name,
    use_time: useTime = false,
  },
  valueHook,
  index = null,
  label = '',
}: DateFieldProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  let initialvalue = value && typeof value === 'object' && !Array.isArray(value) ? value[name] : value;
  initialvalue = initialvalue ? String(initialvalue) : '';

  // TODO: Figure out replacement for __experimentalGetSettings.
  /* @ts-ignore */
  const datesettings = __experimentalGetSettings() as DateSettings;
  const {
    timezone: {
      offset = 0,
    } = {},
  } = datesettings;

  const onChange = (newValue:string) => {
    setValue((getDate(newValue).getTime() / 1000) + (offset * 60 * 60));
    setShowPicker(false);
  };

  const onFieldChange = (newValue:string) => {
    setValue((getDate(newValue).getTime() / 1000));
    setShowPicker(false);
  };

  const dateFormatWithTime = useTime ? `${dateFormat} g:i a` : dateFormat;
  const formattedDate = initialvalue ? gmdateI18n(
    dateFormatWithTime,
    new Date(parseInt(initialvalue, 10) * 1000),
  ) : null;

  return (
    /* @ts-ignore */
    <PanelRow>
      <div className="fm-gutenberg-flex__column fm-gutenberg-popup-wrap">
        {description && !descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
        <label htmlFor={`${name}_${index}`}>
          {label}
        </label>
        {/* @ts-ignore */}
        <TextControl
          id={`${name}_${index}`}
          value={formattedDate}
          onClick={() => setShowPicker(!showPicker)}
          onChange={onFieldChange}
        />
        {showPicker && !useTime ? (
          <div className="fm-gutenberg-popup">
            {/* @ts-ignore */}
            <Button
              aria-label={__('Close', 'fm-gutenberg')}
              onClick={() => setShowPicker(false)}
              className="fm-gutenberg-popup__close"
            >
              x
            </Button>
            {/* @ts-ignore */}
            <DatePicker
              {...attributes} // eslint-disable-line react/jsx-props-no-spreading
              onChange={onChange}
              currentDate={formattedDate}
              key={`text-control-${name}-${index}`}
            />
          </div>
        ) : null}
        {showPicker && useTime ? (
          <div className="fm-gutenberg-popup">
            {/* @ts-ignore */}
            <Button
              aria-label={__('Close', 'fm-gutenberg')}
              className="fm-gutenberg-popup__close"
              onClick={() => setShowPicker(false)}
            >
              x
            </Button>
            {/* @ts-ignore */}
            <DateTimePicker
              {...attributes} // eslint-disable-line react/jsx-props-no-spreading
              onChange={onChange}
              currentDate={formattedDate}
              key={`text-control-${name}-${index}`}
              is12Hour
            />
          </div>
        ) : null}
        {description && descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
      </div>
    </PanelRow>
  );
}
