import React, { useState } from 'react';
import { PanelRow, ColorPicker, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Field from '@/interfaces/field';

import './index.scss';

interface ColorPickerFieldProps {
  field: Field,
  index?: number,
  label?: string,
  valueHook: (key: number | string) => [any | any[], Function];
}

export default function ColorPickerField({
  field: {
    name,
  },
  valueHook,
  index = null,
  label = '',
}: ColorPickerFieldProps) {
  const [showPicker, setShowPicker] = useState(false);

  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  const initialvalue = typeof value === 'object' ? value[name] : value;

  const updateValue = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <PanelRow>
      <div className="fm-gutenberg-flex__column fm-gutenberg-popup-wrap">
        <label htmlFor={`${name}_${index}`}>{label}</label>
        <div id={`${name}_${index}`}>
          <Button
            id={`${name}_${index}`}
            className="fm-gutenberg-color-preview"
            onClick={() => setShowPicker(!showPicker)}
            // @ts-expect-error
            variant="secondary"
          >
            <span
              style={{ backgroundColor: value }}
            />
            {__('Select Color', 'fm-gutenberg')}
          </Button>
          {showPicker ? (
            <div className="fm-gutenberg-popup">
              <Button
                aria-label={__('Close', 'fm-gutenberg')}
                onClick={() => setShowPicker(false)}
                className="fm-gutenberg-popup__close"
              >
                x
              </Button>
              <ColorPicker
                color={initialvalue}
                // @ts-expect-error see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/64541
                onChange={updateValue}
              />
            </div>
          ) : null}
        </div>
      </div>
    </PanelRow>
  );
}
