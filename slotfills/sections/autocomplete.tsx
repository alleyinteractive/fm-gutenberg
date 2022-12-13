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

  const optionsArray:Array<Option> = Object.keys(options).map((key) => (
    {
      label: options[key],
      value: key,
    } as Option
  ));

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
        {optionsArray.length > 0 ? (
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
