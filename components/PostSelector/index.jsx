// Dependencies.
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import apiFetch from '@wordpress/api-fetch';
import classNames from 'classnames';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';

// Components.
import SearchResults from './components/searchResults';

// Custom hooks.
import useDebounce from './hooks/useDebounce';

// Styles.
import './styles.scss';

/**
 * Render autocomplete component.
 */
const PostSelector = ({
  className,
  emptyLabel,
  label,
  multiple,
  onSelect,
  placeHolder,
  postTypes,
  threshold,
}) => {
  // Setup state.
  const [error, setError] = useState('');
  const [foundPosts, setFoundPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoadState] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);

  // Create ref.
  const ref = useRef();

  // Debounce search string from input.
  const debouncedSearchString = useDebounce(searchString, 750);

  /**
   * Make API request for posts by search string.
   *
   * @param {int} page current page number.
   */
  const fetchPosts = async (page = 1) => {
    // Prevent fetch if we haven't
    // met our search string threshold.
    if (debouncedSearchString.length < threshold) {
      setFoundPosts([]);
      return;
    }

    // Page count.
    let totalPages = 0;

    // Set the loading flag.
    setLoadState(true);
    // Reset state before we start the fetch.
    if (page === 1) { setFoundPosts([]); }

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

    // Fetch posts by page.
    await apiFetch({ path, parse: false })
      .then((response) => {
        totalPages = parseInt(
          response.headers.get('X-WP-TotalPages'),
          10,
        ) || 1;
        return response.json();
      })
      .then((posts) => {
        setFoundPosts((prevState) => [...prevState, ...posts]);
        setLoadState(false);

        // Continue to fetch additional page results.
        if (totalPages && totalPages > page) { fetchPosts(page + 1); }
      })
      .catch((err) => setError(err.message));
  };

  /**
   * Handles submitting the input value on debounce.
   */
  useEffect(() => {
    if (debouncedSearchString && threshold <= debouncedSearchString.length) {
      fetchPosts();
    } else { setFoundPosts([]); }
  }, [debouncedSearchString, threshold]);

  /**
   * Moustdown event callback.
   *
   * @param {MouseEvent} event mouse event.
   */
  const handleClick = (event) => {
    setIsOpen(ref && ref.current.contains(event.target));
  };

  /**
   * Keydown event callback.
   *
   * @param {KeyboardEvent} event keyboard event.
   */
  const handleKeyboard = (event) => {
    if (event.keyCode === 27) { setIsOpen(false); }
  };

  /**
   * Handle keydown.
   */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  });

  /**
   * Handles mouse down.
   */
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
    <form
      className="autocomplete__component"
      onSubmit={(event) => event.preventDefault()}
    >
      <div
        className={
          classNames(
            'components-base-control',
            'autocomplete-base-control',
            className,
          )
        }
        ref={ref}
      >
        <div
          role="combobox"
          aria-owns={/* unique ID that you will pass to SearchResults and will be the ID for the ul*/}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={
            classNames(
              'components-base-control__field',
              'autocomplete-base-control__field',
            )
          }
        >
          <label
            className={
              classNames(
                'components-base-control__label',
                'autocomplete-base-control__label',
              )
            }
            htmlFor="autocomplete"
          >
            <div>{label}</div>
            {selectedPosts.length > 0 && (
              selectedPosts.map((item) => (
                <Button
                  className="autocomplete__selection"
                  isSecondary
                  isSmall
                  onClick={() => handlePostSelection(item)}
                  type="button"
                >
                  {item.title}
                </Button>
              ))
            )}
          </label>
          <input
            aria-autoComplete="list"
            autoComplete="off"
            className={
              classNames(
                'components-text-control__input',
                'autocomplete-text-control__input',
                {
                  'autocomplete-text-control__input--working': isOpen,
                },
              )
            }
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
          selectedPosts={selectedPosts}
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
PostSelector.defaultProps = {
  className: '',
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
PostSelector.propTypes = {
  className: PropTypes.string,
  emptyLabel: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  postTypes: PropTypes.arrayOf(PropTypes.string),
  threshold: PropTypes.number,
};

export default PostSelector;
