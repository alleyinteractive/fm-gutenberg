import React from 'react';
import PropTypes from 'prop-types';
import { PanelRow, PanelBody } from '@wordpress/components';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { v4 as uuidv4 } from 'uuid';

import TextField from './text-field';

const SortableItem = sortableElement(({ children }) => <li>{children}</li>);

const SortableContainer = sortableContainer(({ children }) => (
  <ul>{children}</ul>
));

const Group = ({
  field: {
    name,
    children = [],
  },
  valueHook,
}) => {
  const [value, setValue] = valueHook(name);

  const useIndexedValue = (index) => {
    const indexValue = value[index];
    const setIndexValue = (newValue) => {
      const newValueArray = [...value];
      newValueArray[index] = newValue;
      setValue(newValueArray);
    };
    return [indexValue, setIndexValue];
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log('oldIndex', oldIndex);
    console.log('newIndex', newIndex);
    console.log('value', value);
    const newValue = arrayMoveImmutable(value, oldIndex, newIndex);
    console.log('newValue', newValue);
    setValue(newValue);
  };

  return (
    value.map((childValue, index) => (
      <PanelBody>
        <PanelRow>
          <SortableContainer onSortEnd={onSortEnd}>
            {Object.keys(children).map((key) => {
              const child = children[key];
              console.log('child', child);
              return (
                <SortableItem key={uuidv4()} index={index}>
                  {child.field_class === 'text' ? (
                    <TextField
                      field={child}
                      valueHook={useIndexedValue}
                      index={index}
                    />
                  ) : null}
                </SortableItem>
              );
            })}
          </SortableContainer>
        </PanelRow>
      </PanelBody>
    ))
  );
};

Group.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  valueHook: PropTypes.func.isRequired,
};

export default Group;
