/* global React, wp */

import PropTypes from 'prop-types';

/**
 * A React component that allows users to select posts by fuzzy search.
 *
 * This component takes three props:
 *
 * onChange: Required. A function that accepts a post object when selected.
 * postTypes: Required. An array of post type slugs available for search.
 * threshold: Optional. Minimum number of characters entered to initialize search. Defaults to 3.
 *
 * This component *does not* keep track of the selected post. It is up to the
 * parent component to keep track of the selected post and show the selected
 * status. This component is intended to be used when selecting a post for the
 * first time, or selecting a new post.
 */
export default class PostSelector extends React.PureComponent {
  /**
   * Default props for this component.
   * @type {object}
   */
  static defaultProps = {
    threshold: 3,
  };

  /**
   * PropTypes for this component.
   * @type {object}
   */
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    postTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    threshold: PropTypes.number,
  };

  /**
   * Constructor. Binds function scope.
   * @param {object} props - Props for this component.
   */
  constructor(props) {
    super(props);
    this.handlePostSelect = this.handlePostSelect.bind(this);
    this.handlePostTypeChange = this.handlePostTypeChange.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  /**
   * Define initial state for this component.
   */
  state = {
    foundPosts: [],
    loading: false,
    postType: '',
    searchText: '',
  };

  /**
   * Handles a post selection. Matches the post ID to the list of found posts,
   * extracts the relevant post object, and calls `onChange` from props with
   * the found post object.
   * @param {string} postId - The selected post ID.
   */
  handlePostSelect(postId) {
    const {
      onChange,
    } = this.props;
    const {
      foundPosts,
    } = this.state;

    // Attempt to find post by ID.
    const postIdNumber = parseInt(postId, 10);
    const foundPost = foundPosts.find((post) => postIdNumber === post.id);
    if (! foundPost) {
      return;
    }

    // Call the passed onChange function from props with the post object.
    onChange(foundPost);
  }

  /**
   * Handles a change to the post type dropdown.
   * @param {string} postType - The new post type to apply.
   */
  handlePostTypeChange(postType) {
    this.setState((state) => {
      this.loadFoundPosts(postType, state.searchText);
      return { postType };
    });
  }

  /**
   * Handles a change to the search text string.
   * @param {string} searchText - The new search text to apply.
   */
  handleSearchTextChange(searchText) {
    this.setState((state) => {
      this.loadFoundPosts(state.postType, searchText);
      return { searchText };
    });
  }

  /**
   * Loads found posts for the given post type and search text from the API.
   * @param {string} postType - The post type to search in.
   * @param {string} searchText - The text string to use when searching.
   */
  loadFoundPosts(postType, searchText) {
    const {
      threshold,
    } = this.props;
    const {
      apiFetch,
      data: {
        select,
      },
      url: {
        addQueryArgs,
      },
    } = wp;

    // If there is no post type specified, bail.
    if (! postType) {
      return;
    }

    // If the search text is not at the threshold, bail.
    if (threshold > searchText.length) {
      return;
    }

    // Set the loading flag.
    this.setState({ loading: true });

    // Get search results from the API and store them.
    const postTypeDetails = select('core').getEntity('postType', postType);
    const path = addQueryArgs(postTypeDetails.baseURL, {
      search: searchText,
    });
    apiFetch({ path })
      .then((foundPosts) => this.setState({
        foundPosts,
        loading: false,
      }));
  }

  /**
   * Renders component markup.
   * @returns {object} - JSX for this component.
   */
  render() {
    const {
      components: {
        SelectControl,
        TextControl,
      },
      i18n: {
        __,
      },
    } = wp;
    const {
      postTypes,
    } = this.props;
    const {
      foundPosts = [],
      loading = false,
      postType = '',
      searchText = '',
    } = this.state;

    return (
      <form>
        <SelectControl
          label={__('Post Type', 'wp-starter-plugin')}
          onChange={this.handlePostTypeChange}
          options={[
            {
              label: __('Select post type', 'wp-starter-plugin'),
              value: '',
            },
            ...postTypes.map((type) => ({ label: type, value: type })),
          ]}
          value={postType}
        />
        <TextControl
          label={__('Search Text', 'wp-starter-plugin')}
          onChange={this.handleSearchTextChange}
          value={searchText}
        />
        {true === loading && (
          <div>{__('Loading...', 'wp-starter-plugin')}</div>
        )}
        {false === loading && '' !== postType && 0 === foundPosts.length && (
          <div>{__('No matching posts found.', 'wp-starter-plugin')}</div>
        )}
        {false === loading && 0 < foundPosts.length && (
          <SelectControl
            label={__('Selected Post', 'wp-starter-plugin')}
            onChange={this.handlePostSelect}
            options={[
              {
                label: __('Select post', 'wp-starter-plugin'),
                value: '',
              },
              ...foundPosts.map((post) => ({
                label: `${post.title.rendered} (ID: ${post.id})`,
                value: post.id,
              })),
            ]}
          />
        )}
      </form>
    );
  }
}
