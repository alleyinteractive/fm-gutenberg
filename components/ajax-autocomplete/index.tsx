import React, { useState, useEffect } from 'react';
import { Spinner } from '@wordpress/components';
import Downshift from 'downshift';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useSelect } from '@wordpress/data';

interface AjaxAutocompleteProps {
  ajaxAction: string;
  label?: string;
  initialValue?: string;
  setValue: Function;
  showEditLink?: boolean;
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
  initialValue, // eslint-disable-line @typescript-eslint/no-unused-vars
  label,
  setValue,
  showEditLink = false,
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
    fm: {
      context: {
        context: fmContext = '',
        type: fmSubcontext = '',
      } = {},
    } = {},
  } = (window as any);

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

    // Reset the internal state.
    setFoundPosts([]);
    setSearchText('');
  };

  const post = useSelect((select) => (
    select('core/editor').getCurrentPost()
  ));
  const {
    fm_gutenberg_autocomplete_values: autocompleteValues = [],
  } = post;
  const options = autocompleteValues[ajaxAction as keyof typeof autocompleteValues];

  useEffect(() => {
    if (!options) {
      return;
    }
    if (searchText) {
      return;
    }
    /**
     * Gets the label text from the selected option.
     * @param {int} id - The value of the option.
     */
    const loadByKey = (key: string) => {
      const text = options[key] || '';
      if (text !== '') {
        setSearchText(text);
      }
    };

    loadByKey(String(initialValue));
  }, [initialValue, options, searchText]);

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

    const formdata: FormDataProps = {
      action: ajaxAction,
      fm_context: fmContext,
      fm_subcontext: fmSubcontext,
      fm_autocomplete_search: searchText,
      fm_search_nonce: fmSearchNonce,
      fm_custom_args: null,
    };

    const str = Object.keys(formdata).map((key) => (
      `${key}=${formdata[key]}`
    )).join('&');

    apiFetch({
      url: ajaxurl,
      method: 'POST',
      body: str,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
      },
    })
      .then((response) => {
        if (response === 0) {
          setFoundPosts([]);
        } else if (Array.isArray(response)) {
          setFoundPosts(response);
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
            {showEditLink && initialValue ? (
              <a
                href={ajaxurl.replace('admin-ajax.php', `post.php?post=${initialValue}&action=edit`)}
                target="_blank"
                rel="noreferrer"
              >
                {__('Edit', 'fm-gutenberg')}
              </a>
            ) : null}
            {isOpen === true ? (
              <div className="fm-gutenberg-dropdown">
                {
                  working ? (
                    <div className="fm-gutenberg-dropdown-item">
                      <span role="alert" aria-busy className="screen-reader-text">
                        {__('Working', 'fm-gutenberg')}
                      </span>
                      {/* @ts-ignore */}
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
                            {// eslint-disable-line react/jsx-props-no-spreading
                              ...getItemProps({ key: index, index, item })
                            }
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
        </div>
      )}
    </Downshift>
  );
}
