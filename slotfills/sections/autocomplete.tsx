import React, { useState } from 'react';
import { PanelRow, TextControl } from '@wordpress/components';
import Field from '@/interfaces/field';
import FMObject from '@/interfaces/fm-object';
import parse from 'style-to-js';
import Downshift from 'downshift';

interface AutocompleteProps {
  field: Field,
  index?: number,
  label?: string,
  valueHook: (key: number | string) => [string | FMObject | string[] | FMObject[], Function];
}

export default function Autocomplete({
  field: {
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

  const onChange = (newValue:string) => {
    setValue(newValue);
  };

  /**
   * Handles a post selection. Calls `onChange` from props with
   * the found post object.
   * @param {object} foundPost - The selected post.
   */
  const handlePostSelect = (foundPost) => {
    // Call the passed onChange function from props with the post object.
    onChange(foundPost);

    // Reset the internal state.
    setState({
      foundPosts: [],
      searchText: '',
    });
  };

  /**
   * Handles a change to the search text string.
   * @param {event} event - The event from typing in the text box.
   */
  const handleSearchTextChange = (event) => {
    const {
      target: {
        value = '',
      } = {},
    } = event;

    if (!value || value.length <= 2) {
      onChange(null);

      setState({
        searchText: '',
        foundPosts: [],
      });

      return;
    }

    setState({ searchText: value });
    loadFoundPosts();
  };

  // remap style to an object.
  const styleObject = attributes.style ? parse(attributes.style as string) : {};

  return (
    <PanelRow>
      <div className="fm-gutenberg-flex__column">
        {description && !descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
        <Downshift
          onChange={handlePostSelect}
          itemToString={(item) => (item ? item.title : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem,
          }) => (
            <div className="nypost-editor-dropdown-wrap">
              {label !== null ? (
                // Downshift handles the label ID for us.
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label {...getLabelProps()}>{label}</label>
              ) : null}
              <input
                type="text"
                value={inputValue}
                {...getInputProps({
                  placeholder: __('Search articles...', 'nypost-editor'),
                  onChange: handleSearchTextChange,
                })}
              />
              {isOpen === true ? (
                <div className="nypost-editor-dropdown">
                  {
                    working && (
                      <div className="nypost-editor-dropdown-item">
                        <span role="alert" aria-busy className="screen-reader-text">
                          {__('Working', 'nypost-editor')}
                        </span>
                        <Spinner />
                      </div>
                    )
                  }
                  {
                    foundPosts.length === 0 && !working ? (
                      <div className="nypost-editor-dropdown-item">
                        {__('No posts found', 'nypost-editor')}
                      </div>
                    ) : (
                      <ul>
                        {foundPosts
                          .map((item, index) => (
                            <li
                              className="nypost-editor-dropdown-item"
                              {...getItemProps({ key: index, index, item })}
                              data-selected={highlightedIndex === index ? 'true' : 'false'}
                              style={{
                                backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                              }}
                            >
                              {item.title}
                            </li>
                          ))}
                      </ul>
                    )
                  }
                </div>
              ) : null}
            </div>
          )}
        </Downshift>
        {description && descriptionAfterElement ? (
          <div className="fm-gutenberg-item__description">{description}</div>
        ) : null}
      </div>
    </PanelRow>
  );
}
