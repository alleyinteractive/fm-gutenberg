// Dependencies.
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// autocomplete.
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';
import SearchResults from './components/searchResults';

// Custom hooks.
import useDebounce from './hooks/useDebounce';

/**
 * Render autocomplete component.
 */
const AutoComplete = ({
  emptyLabel,
  label,
  multiple,
  // On selection made.
  onSelect,
  placeHolder,
  postTypes,
  threshold,
}) => {
  const [foundPosts, setFoundPosts] = useState([]);
  const [loading, setLoadState] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);

  const debouncedSearchString = useDebounce(searchString, 1250);

  /**
   * Make api requeset for posts by search string.
   */
  const fetchPosts = async (string) => {
    // Prevent fetch if we haven't met our threshold.
    if (string.length < threshold) {
      setFoundPosts([]);
      return;
    }

    // Set the loading flag.
    setLoadState(true);

    // Get search results from the API and store them.
    const path = addQueryArgs(
      '/wp/v2/search',
      {
        search: searchString,
        subtype: postTypes ? postTypes.join() : 'any',
        type: 'post',
      },
    );

    await apiFetch({ path })
      .then((posts) => {
        setFoundPosts(posts);
        setLoadState(false);
      })
      // TODO: Display error message or add handle for this.
      .catch((error) => console.log(error)); // eslint-disable-line no-console
  };

  /**
   * Handles submitting the input value on debounce.
   */
  useEffect(() => {
    if (debouncedSearchString && threshold <= debouncedSearchString.length) {
      fetchPosts(debouncedSearchString);
    } else {
      setFoundPosts([]);
    }
  }, [debouncedSearchString, threshold]);

  /**
   * Handle post selection from search results
   * and return value to parent.
   *
   * @param {object} post selected post object.
   */
  const handlePostSelection = (post) => {
    let newSelectedPosts = [];

    // If multiple post selection is available.
    if (multiple) {
      // Add selection to foundPosts array.
      if (selectedPosts.some((item) => item.id === post.id)) {
        const index = selectedPosts.findIndex((item) => item.id === post.id);
        newSelectedPosts = [
          ...selectedPosts.slice(0, index),
          ...selectedPosts.slice(index + 1, selectedPosts.length),
        ];
      } else {
        newSelectedPosts = [
          ...selectedPosts,
          post,
        ];
      }
    } else {
      // Set single post as object to state.
      newSelectedPosts = post;
      // Reset state and close dropdown.
      setFoundPosts([]);
    }

    setSelectedPosts(newSelectedPosts);
    onSelect(newSelectedPosts);
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="autocomplete-base-control">
        <div className="autocomplete-base-control__field">
          <label
            className="autocomplete-base-control__label"
            htmlFor="autocomplete"
          >
            <span>{label}</span>
            {selectedPosts.length > 0 && (
              selectedPosts.map((item) => (
                <button
                  type="button"
                  onClick={() => handlePostSelection(item)}
                >
                  {item.title}
                </button>
              ))
            )}
            <input
              aria-autoComplete="list"
              autoComplete="off"
              className="autocomplete-text-control__input"
              id="autocomplete"
              onChange={(e) => setSearchString(e.target.value)}
              placeholder={placeHolder}
              type="text"
              value={searchString}
            />
          </label>
        </div>
        <SearchResults
          emptyLabel={emptyLabel}
          loading={loading && debouncedSearchString}
          onSelect={handlePostSelection}
          options={foundPosts}
          threshold={threshold}
          value={debouncedSearchString}
        />
      </div>
    </form>
  );
};

/**
 * Set initial props.
 * @type {object}
 */
AutoComplete.defaultProps = {
  emptyLabel: __('No posts found', 'wp-starter-plugin'),
  label: __('Search for posts', 'wp-starter-plugin'),
  multiple: false,
  placeHolder: __('Search for posts', 'wp-starter-pluing'),
  postTypes: [],
  threshold: 3,
};

/**
 * Set PropTypes for this component.
 * @type {object}
 */
AutoComplete.propTypes = {
  emptyLabel: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  // On selection made.
  onSelect: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  postTypes: PropTypes.arrayOf(PropTypes.string),
  threshold: PropTypes.number,
};

export default AutoComplete;
