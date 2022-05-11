import React from 'react';
import PropTypes from 'prop-types';
import { PanelRow, PanelBody } from '@wordpress/components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// import { arrayMoveImmutable } from 'array-move';

import TextField from './text-field';

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

  // const onSortEnd = ({oldIndex, newIndex}) => {
  //   console.log('oldIndex', oldIndex);
  //   console.log('newIndex', newIndex);
  //   console.log('value', value);
  //   const newValue = arrayMoveImmutable(value, oldIndex, newIndex);
  //   console.log('newValue', newValue);
  //   setValue(newvalue);
  // };

  return (
    value.map((childValue, index) => (
      <PanelBody>
        <PanelRow>
          <DndProvider backend={HTML5Backend}>
            {Object.keys(children).map((key) => {
              const child = children[key];
              return (
                child.field_class === 'text' ? (
                  <TextField
                    field={child}
                    valueHook={useIndexedValue}
                    index={index}
                  />
                ) : null
              );
            })}
          </DndProvider>
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
