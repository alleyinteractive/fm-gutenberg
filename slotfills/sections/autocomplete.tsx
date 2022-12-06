import React from 'react';
import { PanelRow } from '@wordpress/components';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';
import AjaxAutocomplete from './ajax-autocomplete';
import OptionsAutocomplete from './options-autocomplete';

interface AutocompleteProps {
  field: Field;
  index?: number;
  label?: string;
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

interface Option {
  label: string;
  value: string;
}

export default function Autocomplete({
  field: {
    datasource: {
      ajax_action: ajaxAction = '',
      options = null,
    } = {},
    attributes = {},
    description = '',
    description_after_element: descriptionAfterElement = true,
    name,
  },
  valueHook,
  index = null,
  label = '',
}: AutocompleteProps) {
  const [value, setValue] = index !== null ? valueHook(index) : valueHook(name);
  let initialvalue = value && typeof value === 'object' && !Array.isArray(value) ? value[name] : value;
  initialvalue = initialvalue ? String(initialvalue) : '';

  console.log('Object.keys(options)', Object.keys(options));
  const optionsArray = Object.keys(options).forEach((key) => (
    {
      label: options[key],
      value: key,
    } as Option
  ));
  console.log('optionsArray', optionsArray);

  return (
    <PanelRow>
      <div className="fm-gutenberg-flex__column">
        {description && !descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
        {ajaxAction ? (
          <AjaxAutocomplete
            ajaxAction={ajaxAction}
            label={label}
            initialValue={initialvalue}
            setValue={setValue}
          />
        ) : null}
        {optionsArray ? (
          <OptionsAutocomplete
            options={optionsArray}
            label={label}
            initialValue={initialvalue}
            setValue={setValue}
          />
        ) : null}
        {description && descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
      </div>
    </PanelRow>
  );
}
