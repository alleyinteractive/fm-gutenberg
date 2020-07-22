// Depenencies.
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Render search results list.
 */
const SearchResults = ({
  options,
  loading,
}) => {
  // Only display if the input is selected.
  if (options.length === 0) {
    return null;
  }

  return (
    <ul>
      {loading ? (
        <li>
          Loading...
        </li>
      ) : (
        options.map((item) => (
          <li>
            <button
              onClick={() => console.log(item.value)}
              tabIndex="0"
              type="button"
            >
              {item.label}
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

/**
 * Set PropTypes for this component.
 * @type {object}
 */
SearchResults.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchResults;
