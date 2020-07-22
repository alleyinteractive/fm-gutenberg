// Depenencies.
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Render search results list.
 */
const SearchResults = ({
  emptyLabel,
  loading,
  onSelect,
  options,
  value,
}) => {
  // Don't show anything if we aren't loading and don't have a value.
  if (!loading && !value) {
    return null;
  }

  // else business as usual.
  return (
    <div>
      {// Show loader if loading
        loading && (
          <p>Loading...</p>
        )
      }
      {// If we don't have results, but have searched.
        !loading && value && options.length === 0 && (
          <p>{emptyLabel}</p>
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
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchResults;
