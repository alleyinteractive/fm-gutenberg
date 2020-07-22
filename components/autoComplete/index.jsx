// Dependencies.
import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

// Components.
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
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
      foundPosts: [],
      loading: false,
      searchString: '',
      selectedPosts: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchSubmit = debounce(
      this.handleSearchSubmit.bind(this), 750,
    );
    this.handlePostSelection = this.handlePostSelection.bind(this);
  }

  /**
   * Make api requeset for posts by search string.
   */
  async fetchPosts(searchString) {
    const { postTypes, threshold } = this.props;

    // Prevent fetch if we haven't met our threshold.
    if (searchString.length < threshold) {
      this.setState({
        foundPosts: [],
      });
      return;
    }

    // Set the loading flag.
    this.setState({ loading: true });

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
      .then((foundPosts) => this.setState({
        foundPosts,
        loading: false,
      }))
      // TODO: Display error message or add handle for this.
      .catch((error) => console.log(error)); // eslint-disable-line no-console

    console.log(searchString, postTypes);
  }

  /**
   * Handles a change to the search text string.
   *
   * @param {string} searchString - The new search text to apply.
   */
  handleInputChange(searchString) {
    this.setState({
      searchString,
    }, this.handleSearchSubmit);
  }

  /**
   * Handle post selection from search results
   * and return value to parent.
   *
   * @param {object} post selected post object.
   */
  handlePostSelection(post) {
    const { selectedPosts } = this.state;
    const { multiple, onSelect } = this.props;

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
      this.setState({
        foundPosts: [],
      });
    }

    this.setState({
      selectedPosts: newSelectedPosts,
    }, () => onSelect(newSelectedPosts));
  }

  /**
   * Handles submitting the input value on debounce.
   */
  // eslint-disable-next-line
  handleSearchSubmit() {
    const { searchString } = this.state;

    this.fetchPosts(searchString);
  }

  render() {
    const {
      foundPosts,
      loading,
      searchString,
    } = this.state;

    const {
      emptyLabel,
      label,
      placeholder,
    } = this.props;

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
          emptyLabel={emptyLabel}
          loading={loading && searchString}
          options={foundPosts}
          onSelect={this.handlePostSelection}
          value={searchString}
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
  emptyLabel: __('No posts found', 'wp-starter-plugin'),
  label: __('Search for posts', 'wp-starter-plugin'),
  multiple: false,
  placeholder: __('Search for posts', 'wp-starter-pluing'),
  postTypes: [],
  threshold: 2,
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
  placeholder: PropTypes.string,
  postTypes: PropTypes.arrayOf(PropTypes.string),
  threshold: PropTypes.number,
};

export default AutoComplete;
