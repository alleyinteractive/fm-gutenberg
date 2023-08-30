import React, { useEffect, useState } from 'react';
import Downshift from 'downshift';
import { __ } from '@wordpress/i18n';

interface Option {
  label: string;
  value: string;
}
interface OptionsAutocompleteProps {
  options: Option[],
  label?: string;
  initialValue?: string;
  setValue: Function;
}

interface Post {
  label: string;
  value: string;
}

export default function OptionsAutocomplete({
  options,
  initialValue, // eslint-disable-line @typescript-eslint/no-unused-vars
  label,
  setValue,
}: OptionsAutocompleteProps) {
  const [searchText, setSearchText] = useState<string>('');

  const onChange = (newValue: Post) => {
    const selectedValue = newValue ? newValue.value : null;
    setValue(selectedValue);
  };

  /**
   * Handles a post selection. Calls `onChange` from props with
   * the found post object.
   * @param {object} foundPost - The selected post.
   */
  const handlePostSelect = (foundPost: Post) => {
    // Call the passed onChange function from props with the post object.
    onChange(foundPost);
  };

  useEffect(() => {
    /**
     * Gets the label text from the selected option.
     * @param {int} id - The value of the option.
     */
    const loadById = (id: number) => {
      const matches = options.filter((option) => parseInt(option.value, 10) === id);
      if (matches.length > 0) {
        setSearchText(matches[0].label);
      }
    };
    /**
     * Gets the label text from the selected option.
     * @param {string} Key - The value of the option.
     */
    const loadByKey = (key: string) => {
      const matches = options.filter((option) => option.value === key);
      if (matches.length > 0) {
        setSearchText(matches[0].label);
      }
    };
    if (!Number.isNaN(parseInt(initialValue, 10))) {
      loadById(parseInt(initialValue, 10));
    } else {
      loadByKey(initialValue);
    }
  }, [initialValue, options]);

  /**
   * Handles a change to the search text string.
   * @param {event} event - The event from typing in the text box.
   */
  const handleSearchTextChange = (event: Event) => {
    const {
      target = null,
    } = event;
    const targetElement = target as HTMLTextAreaElement;
    const eventValue = target ? targetElement.value : '';

    if (!eventValue || eventValue.length <= 2) {
      onChange(null);
    }
  };

  return (
    /* @ts-ignore */
    <Downshift
      onChange={handlePostSelect}
      itemToString={(item) => (item ? item.label : '')}
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
        <div>
          {label !== null ? (
            // Downshift handles the label ID for us.
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label
              {// eslint-disable-line react/jsx-props-no-spreading
                ...getLabelProps()
              }
            >
              {label}
            </label>
          ) : null}
          <div className="fm-gutenberg-dropdown-wrap">
            <input
              type="text"
              {...getInputProps({ // eslint-disable-line react/jsx-props-no-spreading
                value: inputValue !== '' ? inputValue : searchText,
                placeholder: __('Search...', 'fm-gutenberg'),
                onChange: handleSearchTextChange,
              })}
            />
            {isOpen === true ? (
              <div className="fm-gutenberg-dropdown">
                <ul>
                  {
                    // filter the options and return items that match the inputValue
                    options
                      .filter((item) => !inputValue || item.label.toLowerCase()
                        .includes(inputValue.toLowerCase()))
                      // map the return value and return a div
                      .map((item, index) => (
                        <li
                          className="dropdown-item"
                          {// eslint-disable-line react/jsx-props-no-spreading
                            ...getItemProps({ key: item.label, index, item })
                          }
                          style={{
                            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                          }}
                        >
                          {item.label}
                        </li>
                      ))
                  }
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </Downshift>
  );
}
