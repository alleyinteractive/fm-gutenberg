// Dependencies.
import React from 'react';
import PropTypes from 'prop-types';

// Components.
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SearchResults from './components/searchResults';

/**
 * Render autocomplete component.
 */
class AutoComplete extends React.PureComponent {
  /**
   * Constructor. Binds function scope.
   * @param {object} props - Props for this component.
   */
  constructor(props) {
    super(props);

    /**
     * Set Initial State
     * @type {object}
     */
    this.state = {
      // foundPosts: [],
      loading: false,
      // searhText: '',
      selected: true,
    };
  }

  render() {
    const {
      loading,
      selected,
    } = this.state;

    const {
      label,
      placeholder,
    } = this.props;

    return (
      <div>
        <TextControl
          aria-autoComplete="list"
          autoComplete="off"
          label={label}
          onChange={(value) => console.log(value)}
          placeholder={placeholder}
          value=""
        />
        <SearchResults
          loading={loading}
          selected={selected}
        />
      </div>
    );
  }
}

/**
 * Set initial props.
 * @type {object}
 */
AutoComplete.defaultProps = {
  // emptyLabel: __('No posts found', 'wp-starter-plugin'),
  label: __('Search for posts', 'wp-starter-plugin'),
  // multiple: false,
  placeholder: __('Search for posts', 'wp-starter-pluing'),
  // postTypes: [],
  // threshold: 3,
};

/**
 * Set PropTypes for this component.
 * @type {object}
 */
AutoComplete.propTypes = {
  // emptyLabel: PropTypes.string,
  label: PropTypes.string,
  // multiple: PropTypes.bool,
  // On input change.
  // onChange: PropTypes.func.isRequired,
  // On selection made.
  // onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  // postTypes: PropTypes.arrayOf(PropTypes.string),
  // threshold: PropTypes.number,
};

export default AutoComplete;
