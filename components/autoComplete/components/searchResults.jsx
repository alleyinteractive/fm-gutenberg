// Depenencies.
import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Render search results list.
 */
const SearchResults = ({
  emptyLabel,
  error,
  isOpen,
  loading,
  onSelect,
  options,
  selectedPosts,
  threshold,
  value,
}) => {
  // Don't show anything if we aren't loading and don't have a value.
  if (!loading && (value === '' || threshold > value.length)) {
    return null;
  }

  const style = {
    backgroundColor: 'white',
    left: 0,
    maxHeight: isOpen ? 275 : 0,
    overflowY: isOpen ? 'scroll' : 'hidden',
    position: 'absolute',
    top: 'calc(100% + 1px)',
    visibility: isOpen ? 'visible' : 'hidden',
    width: '100%',
    zIndex: 10,
  };

  // else business as usual.
  return (
    <div
      className="autocomplete-base-control__dropdown"
      style={style}
    >
      {loading && (
        <div className="autocomplete__loading">
          {__('Loading...', 'wp-starter-plugin')}
        </div>
      )}
      {!loading && (
        <>
          {value && options.length === 0 && !error && (
            <div className="autocomplete__no-posts">
              <p>{emptyLabel}</p>
            </div>
          )}
          {error && (
            <div className="autocomplete__error">
              <p>{error}</p>
            </div>
          )}
        </>
      )}
      {// Show error if there is an error.
        !loading && error && (
          <div className="autocomplete__no-posts">
            <p>{emptyLabel}</p>
          </div>
        )
      }
      {// If we have no value, always disable.
        !loading && options.length > 0 && (
          <ul>
            {options.map((item) => (
              <li>
                <button
                  onClick={() => onSelect(item)}
                  tabIndex="0"
                  type="button"
                  disabled={selectedPosts.some((post) => post.id === item.id)}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};

/**
 * Set PropTypes for this component.
 * @type {object}
 */
SearchResults.propTypes = {
  emptyLabel: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedPosts: PropTypes.shape([]).isRequired,
  threshold: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchResults;
