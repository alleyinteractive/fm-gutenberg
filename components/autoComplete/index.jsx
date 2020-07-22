// Dependencies.
import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

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
      searchString: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchSubmit = debounce(
      this.handleSearchSubmit.bind(this), 750,
    );
  }

  /**
   * Handles a change to the search text string.
   * @param {string} searchString - The new search text to apply.
   */
  handleInputChange(searchString) {
    this.setState({
      searchString,
    }, this.handleSearchSubmit);
  }

  /**
   * Handles submitting the input value.
   */
  // eslint-disable-next-line
  handleSearchSubmit() {
    const {
      searchString,
    } = this.state;

    console.log(`submitted: ${searchString}`);
  }

  render() {
    const {
      loading,
      searchString,
    } = this.state;

    const {
      label,
      placeholder,
    } = this.props;

    const tempOptions = [
      {
        label: __('Result Test 1', 'wp-starter-plugin'),
        value: 'label-test-1',
      },
      {
        label: __('Result Test 2', 'wp-starter-plugin'),
        value: 'label-test-2',
      },
    ];

    return (
      <div>
        <TextControl
          aria-autoComplete="list"
          autoComplete="off"
          label={label}
          onChange={this.handleInputChange}
          placeholder={placeholder}
          value={searchString}
        />
        <SearchResults
          loading={loading}
          options={tempOptions}
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
