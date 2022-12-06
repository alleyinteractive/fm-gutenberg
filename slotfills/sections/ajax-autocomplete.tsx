import React, { useState } from 'react';
import { Spinner } from '@wordpress/components';
import Downshift from 'downshift';
import { __ } from '@wordpress/i18n';

interface AjaxAutocompleteProps {
  ajaxAction: string;
  label?: string;
  initialValue?: string;
  setValue: Function;
}

interface Post {
  label: string;
  value: string;
}

interface FormDataProps {
  [key: string]: string;
}

export default function AjaxAutocomplete({
  ajaxAction,
  initialValue,
  label,
  setValue,
}: AjaxAutocompleteProps) {
  const [foundPosts, setFoundPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState('');
  const [working, setWorking] = useState(false);
  const threshold = 3;
  const {
    ajaxurl,
    fm_search: {
      nonce: fmSearchNonce = '',
    } = {},
  } = (window as any);

  const onChange = (newValue:Post) => {
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

    // Reset the internal state.
    setFoundPosts([]);
    setSearchText('');
  };

  /**
   * Loads found posts for the given post type and search text from the API.
   * @param {string} searchText - The text string to use when searching.
   */
  const loadFoundPosts = () => {
    // If the search text is not at the threshold, bail.
    if (threshold > searchText.length) {
      return;
    }

    setWorking(true);

    const formdata:FormDataProps = {
      action: ajaxAction,
      fm_context: 'post', // TODO: make this dynamic
      fm_subcontext: 'demo-autocomplete', // TODO: make this dynamic
      fm_autocomplete_search: searchText,
      fm_search_nonce: fmSearchNonce,
      fm_custom_args: null,
    };

    const str = Object.keys(formdata).map((key) => (
      `${key}=${formdata[key]}`
    )).join('&');

    fetch(ajaxurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
      },
      body: str,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 0) {
          setFoundPosts([]);
        } else {
          setFoundPosts(data);
        }
        setWorking(false);
      });
  };

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

      setFoundPosts([]);
      setSearchText('');

      return;
    }

    setSearchText(eventValue);
    loadFoundPosts();
  };

  return (
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
        <div className="fm-gutenberg-dropdown-wrap">
          {label !== null ? (
            // Downshift handles the label ID for us.
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label {...getLabelProps()}>{label}</label>
          ) : null}
          <input
            type="text"
            value={inputValue}
            {...getInputProps({
              placeholder: __('Search...', 'fm-gutenberg'),
              onChange: handleSearchTextChange,
            })}
          />
          {isOpen === true ? (
            <div className="fm-gutenberg-dropdown">
              {
                working ? (
                  <div className="fm-gutenberg-dropdown-item">
                    <span role="alert" aria-busy className="screen-reader-text">
                      {__('Working', 'fm-gutenberg')}
                    </span>
                    <Spinner />
                  </div>
                ) : null
              }
              {
                foundPosts.length === 0 && !working && inputValue ? (
                  <ul>
                    <li>{__('No matches found', 'fm-gutenberg')}</li>
                  </ul>
                ) : (
                  <ul>
                    {foundPosts
                      .map((item, index) => (
                        <li
                          className="fm-gutenberg-dropdown-item"
                          {...getItemProps({ key: index, index, item })}
                          data-selected={highlightedIndex === index ? 'true' : 'false'}
                          style={{
                            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                          }}
                        >
                          {item.label}
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
  );
};
