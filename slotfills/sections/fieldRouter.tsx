import React, { useState } from 'react';

import FMObject from '@/interfaces/fm-object';
import Field from '@/interfaces/field';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import { Button } from '@wordpress/components';

import SafeHTML from '@/components/safe-html';
import classNames from 'classnames';

import Checkbox from './checkbox';
import Checkboxes from './checkboxes';
import ColorPickerField from './color-picker-field';
import DateField from './date-field';
import MediaField from './media-field';
import Radio from './radio';
import Select from './select';
import TextField from './text-field';
import TextareaField from './textarea-field';
import RichtextField from './richtext-field';
import Autocomplete from './autocomplete';

import './fieldRouter.scss';

interface FieldRouterProps {
  field: Field;
  index?: number;
  valueHook: (key: number | string) => [null | string | FMObject | string[] | FMObject[], Function];
}

export default function FieldRouter({
  field,
  field: {
    children,
    collapsed,
    collapsible,
    description,
    display_if: {
      src: displayIfSrc = '',
      value: displayIfValue = '',
    } = {},
    field_class: fieldClass,
    fm_class: fmClass,
    label = '',
    name = '',
    tabbed = '',
  },
  index = null,
  valueHook,
}: FieldRouterProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  if (displayIfSrc !== '') {
    const [triggerValue] = valueHook(displayIfSrc);
    let simpleValue = triggerValue && typeof triggerValue === 'object' && !Array.isArray(triggerValue) ? triggerValue[displayIfSrc] : triggerValue;
    simpleValue = simpleValue ? String(simpleValue) : '';

    if (displayIfValue !== String(simpleValue)) {
      return null;
    }
  }
  if (children && fieldClass === 'group') {
    const [value, setValue] = valueHook(index ?? name);
    const useChildValue = (key: string): [any, Function] => {
      const valueObject = value !== null && typeof value === 'object' && !Array.isArray(value) ? value : { [key]: value };
      const childValue = valueObject ? valueObject[key] : null;
      const setChildValue = (newValue: string) => {
        const newValueObject = {
          ...valueObject,
          [key]: newValue,
        };
        setValue(newValueObject);
      };
      return [childValue, setChildValue];
    };

    return (
      tabbed ? (
        <>
          <h4>{label}</h4>
          <Tabs className={tabbed === 'vertical' ? 'react-tabs react-tabs__vertical' : 'react-tabs'}>
            <TabList>
              {Object.values(children).map((child: Field) => (
                <Tab>{child.label}</Tab>
              ))}
            </TabList>
            {Object.keys(children).map((key) => (
              <TabPanel>
                <FieldRouter
                  field={children[key]}
                  index={index}
                  valueHook={useChildValue}
                  key={key}
                />
              </TabPanel>
            ))}
            {description ? (
              <SafeHTML
                tag="p"
                className="fm-group-description"
                html={description}
              />
            ) : null}
          </Tabs>
        </>
      ) : (
        <div className="fm-gutenberg__group" key={`${name}-group`}>
          {label && !collapsible ? (
            <h4>{label}</h4>
          ) : null}
          {label && collapsible ? (
            <Button isLink onClick={() => setIsCollapsed(!isCollapsed)}>
              <h4>
                {label}
              </h4>
            </Button>
          ) : null}
          <div
            className={classNames(
              'fm-gutenberg__group-content',
              {
                collapsed: isCollapsed,
              },
            )}
          >
            {Object.keys(children).map((key) => (
              <FieldRouter
                field={children[key]}
                valueHook={useChildValue}
                key={key}
              />
            ))}
            {description ? (
              <SafeHTML
                tag="p"
                className="fm-group-description"
                html={description}
              />
            ) : null}
          </div>
        </div>
      )
    );
  }
  switch (fmClass) {
    case 'Fieldmanager_Autocomplete':
      return (
        <Autocomplete
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_Checkbox':
      return (
        <Checkbox
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_Checkboxes':
      return (
        <Checkboxes
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_Colorpicker':
      return (
        <ColorPickerField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_Datepicker':
      return (
        <DateField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_DraggablePost':
      return (
        <p>
          Fieldmanager_DraggablePost
        </p>
      );
      break;
    case 'Fieldmanager_Grid':
      return (
        <p>
          Fieldmanager_Grid
        </p>
      );
      break;
    case 'Fieldmanager_Hidden':
      return (
        <TextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
          type="hidden"
        />
      );
      break;
    case 'Fieldmanager_Link':
      return (
        <TextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
          type="url"
        />
      );
      break;
    case 'Fieldmanager_Media':
      if (fieldClass === 'media') {
        return (
          <MediaField
            field={field}
            valueHook={valueHook}
            index={index}
            label={label}
          />
        );
      }
      break;
    case 'Fieldmanager_Password':
      return (
        <TextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
          type="password"
        />
      );
      break;
    case 'Fieldmanager_Radios':
      return (
        <Radio
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_RichTextArea':
      return (
        <RichtextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_Select':
      return (
        <Select
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_TextArea':
      return (
        <TextareaField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    case 'Fieldmanager_TextField':
      return (
        <TextField
          field={field}
          valueHook={valueHook}
          index={index}
          label={label}
        />
      );
      break;
    default:
      return null;
  }
}
