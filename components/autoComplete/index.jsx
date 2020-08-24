// Dependencies.
import React, { useEffect, useRef, useState } from 'react';
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
  const [error, setError] = useState('');
  const [foundPosts, setFoundPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoadState] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);

  const ref = useRef();

  const debouncedSearchString = useDebounce(searchString, 1250);

  /**
   * Make api requeset for posts by search string.
   *
   * @param {int} page current page number.
   */
  const fetchPosts = async (page = 1) => {
    // Prevent fetch if we haven't met our threshold.
    if (debouncedSearchString.length < threshold) {
      setFoundPosts([]);
      return;
    }

    // Page count.
    let totalPages = 0;

    // Set the loading flag.
    setLoadState(true);

    // Get search results from the API and store them.
    const path = addQueryArgs(
      '/wp/v2/search',
      {
        page,
        search: debouncedSearchString,
        subtype: postTypes ? postTypes.join() : 'any',
        type: 'post',
      },
    );

    await apiFetch({ path, parse: false })
      .then((response) => {
        totalPages = parseInt(response.headers.get('X-WP-TotalPages'), 10)
          || 1;
        return response.json();
      })
      .then((posts) => {
        setFoundPosts((prevState) => [...prevState, ...posts]);
        if (totalPages && totalPages > page) {
          fetchPosts(page + 1);
        } else {
          setLoadState(false);
        }
      })
      .catch((err) => setError(err.message));
  };

  /**
   * Handles submitting the input value on debounce.
   */
  useEffect(() => {
    if (debouncedSearchString && threshold <= debouncedSearchString.length) {
      fetchPosts();
    } else {
      setFoundPosts([]);
    }
  }, [debouncedSearchString, threshold]);

  const handleClick = (event) => {
    setIsOpen(ref && ref.current.contains(event.target));
  };

  const handleKeyboard = (event) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    return () => document.removeEventListener('keydown', handleKeyboard);
  });

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  });

  /**
   * Handle post selection from search results
   * and return value to parent.
   *
   * @param {object} post selected post object.
   */
  const handlePostSelection = (post) => {
    let newSelectedPosts = [];

    // If multiple post selection is available.
    // Add selection to foundPosts array.
    if (selectedPosts.some((item) => item.id === post.id)) {
      const index = selectedPosts.findIndex((item) => item.id === post.id);
      newSelectedPosts = [
        ...selectedPosts.slice(0, index),
        ...selectedPosts.slice(index + 1, selectedPosts.length),
      ];
    } else if (multiple) {
      newSelectedPosts = [
        ...selectedPosts,
        post,
      ];
    } else {
      // Set single post to state.
      newSelectedPosts = [post];
      // Reset state and close dropdown.
      setIsOpen(false);
    }

    setSelectedPosts(newSelectedPosts);
    onSelect(newSelectedPosts);
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="autocomplete-base-control" ref={ref}>
        <div className="autocomplete-base-control__field">
          <label
            className="autocomplete-base-control__label"
            htmlFor="autocomplete"
          >
            <div>{label}</div>
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
          </label>
          <input
            aria-autoComplete="list"
            autoComplete="off"
            className="autocomplete-text-control__input"
            id="autocomplete"
            onChange={(e) => setSearchString(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeHolder}
            type="text"
            value={searchString}
          />
        </div>
        <SearchResults
          emptyLabel={emptyLabel}
          error={error}
          isOpen={isOpen}
          loading={loading && debouncedSearchString}
          onSelect={handlePostSelection}
          options={foundPosts}
          threshold={threshold}
          selectedPosts={selectedPosts}
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
