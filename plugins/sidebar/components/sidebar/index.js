/* global React, wp */

import PropTypes from 'prop-types';

import OpenGraph from '../openGraph';

const {
  compose: {
    compose,
  },
  data: {
    withDispatch,
    withSelect,
  },
  editPost: {
    PluginSidebar,
  },
  i18n: {
    __,
  },
} = wp;

/**
 * A component to render a PluginSidebar for the WP Starter Plugin site.
 */
class Sidebar extends React.PureComponent {
  // Define PropTypes for this component.
  static propTypes = {
    meta: PropTypes.shape({}).isRequired,
    onUpdate: PropTypes.func.isRequired,
    post: PropTypes.shape({}).isRequired,
  };

  /**
   * Renders the PluginSidebar.
   * @returns {object} JSX component markup.
   */
  render() {
    const {
      meta,
      onUpdate,
      post: {
        /**
         * Link is permalink, type is post type. Can be used to make decisions
         * about which components to load in the sidebar based on URL of the
         * post (e.g., the home or front page is '/') or the post type.
         */
        link = '', // eslint-disable-line no-unused-vars
        type = '', // eslint-disable-line no-unused-vars
      },
    } = this.props;

    return (
      <PluginSidebar
        name="wp-starter-plugin"
        title={__('WP Starter Plugin Options', 'wp-starter-plugin')}
      >
        <OpenGraph meta={meta} onUpdate={onUpdate} />
      </PluginSidebar>
    );
  }
}

export default compose([
  withSelect((select) => ({
    meta: {
      ...select('core/editor').getCurrentPostAttribute('meta'),
      ...select('core/editor').getEditedPostAttribute('meta'),
    },
    post: select('core/editor').getCurrentPost(),
  })),
  withDispatch((dispatch) => ({
    onUpdate: (metaKey, metaValue) => {
      dispatch('core/editor').editPost({
        meta: {
          ...wp.data.select('core/editor').getCurrentPostAttribute('meta'),
          ...wp.data.select('core/editor').getEditedPostAttribute('meta'),
          [metaKey]: metaValue,
        },
      });
    },
  })),
])(Sidebar);
