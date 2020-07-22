// Depenencies.
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Render search results list.
 */
const SearchResults = ({
  selected,
  loading,
}) => {
  // Only display if the input is selected.
  if (!selected) {
    return null;
  }

  return (
    <ul>
      {loading ? (
        <li>
          Loading...
        </li>
      ) : (
        <li>
          <button
            tabIndex="0"
            type="button"
          >
            Result Item
          </button>
        </li>
      )}
    </ul>
  );
};

/**
 * Set PropTypes for this component.
 * @type {object}
 */
SearchResults.propTypes = {
  selected: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchResults;
