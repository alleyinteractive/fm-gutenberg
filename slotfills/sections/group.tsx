import React from 'react';
import { Button, PanelRow } from '@wordpress/components';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { v4 as uuidv4 } from 'uuid';
import { __ } from '@wordpress/i18n';

import FMObject from '@/interfaces/fm-object';
import FieldRouter from './fieldRouter';

import './group.scss';

interface ChildProps {
  children?: React.ReactNode;
}

const SortableItem = SortableElement(({ children }: ChildProps) => (
  <li>
    {children}
  </li>
));

const SortableList = SortableContainer(({ children }: ChildProps) => (
  <ul className="fm-gutenberg-sortable-list">{children}</ul>
));

interface GroupProps {
  field: {
    add_more_label: string;
    add_more_position: 'bottom' | 'top';
    children: Object;
    name: string;
  };
  valueHook: (key: number | string) =>
  [number[] | string[] | FMObject[], Function];
}

export default function Group({
  field: {
    add_more_label: addMoreLabel = '',
    add_more_position: addMorePosition = 'bottom',
    name,
    children = [],
  },
  valueHook,
}: GroupProps) {
  const [value, setValue] = valueHook(name);

  const useIndexedValue = (key: number): [any, Function] => {
    const indexValue = value[key];
    const setIndexValue = (newValue: string) => {
      const newValueArray = [...value];
      newValueArray[key] = newValue;
      setValue(newValueArray);
    };
    return [indexValue, setIndexValue];
  };

  const addNew = () => {
    const newValueArray = [...value, {}];
    setValue(newValueArray);
  };

  const removeElement = (index: number) => {
    const newValueArray = [...value];
    newValueArray.splice(index, 1);
    setValue(newValueArray);
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    const newValue = arrayMoveImmutable([...value], oldIndex, newIndex);
    setValue(newValue);
  };

  const DragHandle = SortableHandle(() => <span className="fm-gutenberg-move-handle" aria-label={__('Move', 'fm-gutenberg')}>::</span>);

  return (
    <>
      {addMorePosition === 'top' ? (
        <PanelRow>
          <Button
            isSecondary
            onClick={addNew}
          >
            {addMoreLabel}
          </Button>
        </PanelRow>
      ) : null}
      <PanelRow>
        <SortableList
          onSortEnd={onSortEnd}
          useDragHandle
        >
          {value.map((childValue: number | string | FMObject, index: number) => {
            const key = uuidv4();
            return (
              <SortableItem
                key={key}
                index={index}
              >
                <PanelRow>
                  <div className="fm-gutenberg-panel-container">
                    <div className="fm-gutenberg-controls">
                      <DragHandle />
                      <Button
                        onClick={() => removeElement(index)}
                        className="fm-gutenberg-remove"
                      >
                        <span className="screen-reader-text">{__('Remove', 'fm-gutenberg')}</span>
                      </Button>
                    </div>
                    <div>
                      {Object.keys(children).map((itemKey: keyof typeof children) => {
                        const child = children[itemKey];
                        return (
                          <FieldRouter
                            field={child}
                            index={index}
                            valueHook={useIndexedValue}
                            key={itemKey}
                          />
                        );
                      })}
                    </div>
                  </div>
                </PanelRow>
              </SortableItem>
            );
          })}
        </SortableList>
      </PanelRow>
      {addMorePosition === 'bottom' ? (
        <PanelRow>
          <Button
            isSecondary
            onClick={addNew}
          >
            {addMoreLabel}
          </Button>
        </PanelRow>
      ) : null}
    </>
  );
}
