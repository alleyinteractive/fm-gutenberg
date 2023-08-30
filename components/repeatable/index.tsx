import React, { forwardRef, useState } from 'react';
import { Button, PanelRow } from '@wordpress/components';
import SortableList, { SortableItem, SortableKnob } from 'react-easy-sort'; // TODO: replace with https://github.com/clauderic/dnd-kit
import { arrayMoveImmutable } from 'array-move';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

import FMObject from '@/interfaces/fm-object';
import Field from '@/interfaces/field';
import FieldRouter from '../fieldRouter';
import AddMoreButton from '../add-more-button';

import './index.scss';

interface CustomKnobProps {
  children?: React.ReactNode;
}

const CustomKnob = forwardRef<HTMLDivElement, CustomKnobProps>((props, ref) => (
  <span ref={ref} className="fm-gutenberg-move-handle" aria-label={__('Move', 'fm-gutenberg')}>
    {props.children}
  </span>
));

interface MaybeSortableListProps {
  children?: React.ReactNode;
  onSortEnd: (oldIndex: number, newIndex: number) => void;
  sortable: boolean;
}

function MaybeSortableList({ children, onSortEnd, sortable }: MaybeSortableListProps) {
  return (
    sortable ? (
      /* @ts-ignore */
      <SortableList
        onSortEnd={onSortEnd}
        className="fm-gutenberg-sortable-list"
      >
        {children}
      </SortableList>
    ) : (
      <ul
        className="fm-gutenberg-list"
      >
        {children}
      </ul>
    )
  );
}

interface MaybeSortableItemProps {
  children?: React.ReactNode | React.ReactNode[];
  keyValue: string;
  sortable: boolean;
}

function MaybeSortableItem({ children, keyValue, sortable }: MaybeSortableItemProps) {
  return (
    sortable ? (
      /* @ts-ignore */
      <SortableItem key={keyValue}>
        {children as any}
      </SortableItem>
    ) : (
      <li key={keyValue}>
        {children}
      </li>
    )
  );
}

interface RemoveButtonProps {
  childindex: number;
  removeElement: Function;
}

function RemoveButton({ childindex, removeElement }: RemoveButtonProps) {
  return (
    /* @ts-ignore */
    <Button
      onClick={() => removeElement(childindex)}
      className="fm-gutenberg-remove"
    >
      <span className="screen-reader-text">{__('Remove', 'fm-gutenberg')}</span>
    </Button>
  );
}

interface RepeatableLabelProps {
  label?: string;
  collapsible?: boolean;
  childindex: number;
  collapsedHook: (key: number) => [boolean, Function];
}

function RepeatableLabel({
  label,
  collapsible,
  childindex,
  collapsedHook,
}: RepeatableLabelProps) {
  const [itemCollapsed, setItemCollapsed] = collapsedHook(childindex);
  return (
    <>
      {label && !collapsible ? (
        <h4>{label}</h4>
      ) : null}
      {label && collapsible ? (
        /* @ts-ignore */
        <Button isLink onClick={() => setItemCollapsed(!itemCollapsed)}>
          <h4>
            {label}
            <span className={classNames(
              'fm-gutenberg-repeatable',
              { 'fm-gutenberg-repeatable__down': itemCollapsed },
              { 'fm-gutenberg-repeatable__up': !itemCollapsed },
            )}
            />
          </h4>
        </Button>
      ) : null}
    </>
  );
}

interface RepeatableContentProps {
  children?: React.ReactNode;
  childindex: number;
  collapsedHook: (key: number) => [boolean, Function];
}

function RepeatableContent({
  children,
  childindex,
  collapsedHook,
}: RepeatableContentProps) {
  const [itemCollapsed] = collapsedHook(childindex);
  return (
    <div
      className={classNames(
        'fm-gutenberg__group-content',
        {
          collapsed: itemCollapsed,
        },
      )}
    >
      {children}
    </div>
  );
}

interface RepeatableProps {
  field: Field;
  valueHook: (key: number | string) =>
  [number[] | string[] | FMObject[], Function];
}

export default function Repeatable({
  field,
  field: {
    add_more_label: addMoreLabel = '',
    add_more_position: addMorePosition = 'bottom',
    collapsible,
    collapsed,
    label,
    limit = null,
    minimumCount = null,
    name,
    sortable,
  },
  valueHook,
}: RepeatableProps) {
  const [value, setValue] = valueHook(name);
  const [isCollapsed, setIsCollapsed] = useState(
    value ? Array(value?.length).fill(collapsed, 0, value.length) : [],
  );

  const useIndexedValue = (key: number): [any, Function] => {
    const indexValue = value[key];
    const setIndexValue = (newValue: string) => {
      const newValueArray = [...value];
      newValueArray[key] = newValue;
      setValue(newValueArray);
    };
    return [indexValue, setIndexValue];
  };

  const useIndexCollapsed = (key: number): [boolean, Function] => {
    const indexCollapsed = isCollapsed[key];
    const setIndexCollapsed = (newValue: boolean) => {
      const newValueArray = [...isCollapsed];
      newValueArray[key] = newValue;
      setIsCollapsed(newValueArray);
    };
    return [indexCollapsed, setIndexCollapsed];
  };

  const addNew = () => {
    if (value === null) {
      setValue([{}]);
    } else {
      const newValue = value !== null && Array.isArray(value) && value.length && typeof value[0] === 'object' ? {} : '';
      const newValueArray = addMorePosition === 'bottom' ? [...value, newValue] : [newValue, ...value];
      setValue(newValueArray);
    }
  };

  const removeElement = (index: number) => {
    const newValueArray = [...value];
    newValueArray.splice(index, 1);
    setValue(newValueArray);
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const newValue = arrayMoveImmutable([...value], oldIndex, newIndex);
    setValue(newValue);
  };

  return (
    <>
      {addMorePosition === 'top' ? (
        <AddMoreButton
          addMoreLabel={addMoreLabel}
          addNew={addNew}
          limit={limit}
          minimumCount={minimumCount}
        />
      ) : null}
      {/* @ts-ignore */}
      <PanelRow>
        <MaybeSortableList onSortEnd={onSortEnd} sortable={sortable}>
          {value && Array.isArray(value)
            ? value.map((childValue: number | string | FMObject, childindex: number) => {
              const key = `repeatable-${childindex}`;
              return (
                <MaybeSortableItem
                  keyValue={key}
                  sortable={sortable}
                >
                  {/* @ts-ignore */}
                  <PanelRow>
                    <div className="fm-gutenberg-panel-container">
                      <div className="fm-gutenberg-controls">
                        {sortable ? (
                          /* @ts-ignore */
                          <SortableKnob>
                            {/* @ts-ignore */}
                            <CustomKnob>
                              <RepeatableLabel
                                label={label}
                                collapsible={collapsible}
                                childindex={childindex}
                                collapsedHook={useIndexCollapsed}
                              />
                              <RemoveButton
                                childindex={childindex}
                                removeElement={removeElement}
                              />
                            </CustomKnob>
                          </SortableKnob>
                        ) : (
                          <RemoveButton
                            childindex={childindex}
                            removeElement={removeElement}
                          />
                        )}
                      </div>
                      <RepeatableContent
                        childindex={childindex}
                        collapsedHook={useIndexCollapsed}
                      >
                        <FieldRouter
                          field={field}
                          index={childindex}
                          valueHook={useIndexedValue}
                        />
                      </RepeatableContent>
                    </div>
                  </PanelRow>
                </MaybeSortableItem>
              );
            }) : null}
        </MaybeSortableList>
      </PanelRow>
      {addMorePosition === 'bottom' ? (
        <AddMoreButton
          addMoreLabel={addMoreLabel}
          addNew={addNew}
          limit={limit}
          minimumCount={minimumCount}
        />
      ) : null}
    </>
  );
}
