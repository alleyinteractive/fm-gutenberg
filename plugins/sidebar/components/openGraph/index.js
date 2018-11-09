/* global React, wp */

import PropTypes from 'prop-types';

import ImagePicker from '../imagePicker';

const {
  components: {
    PanelBody,
    TextareaControl,
    TextControl,
  },
  i18n: {
    __,
  },
} = wp;

/**
 * A component representing the Open Graph sidebar configuration panel.
 */
export default class OpenGraph extends React.PureComponent {
  // Define PropTypes for this component.
  static propTypes = {
    meta: PropTypes.shape({
      open_graph_description: PropTypes.string,
      open_graph_image: PropTypes.number,
      open_graph_title: PropTypes.string,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  /**
   * Renders the sidebar section.
   * @returns {object} JSX component markup.
   */
  render() {
    const {
      meta: {
        open_graph_description: openGraphDescription = '',
        open_graph_image: openGraphImage = 0,
        open_graph_title: openGraphTitle = '',
      },
      onUpdate,
    } = this.props;

    return (
      <PanelBody
        initialOpen={false}
        title={__('Open Graph', 'wp-starter-plugin')}
      >
        <ImagePicker
          metaKey="open_graph_image"
          onUpdate={onUpdate}
          value={openGraphImage}
        />
        <TextControl
          label={__('Title', 'wp-starter-plugin')}
          onChange={(value) => onUpdate('open_graph_title', value)}
          value={openGraphTitle}
        />
        <TextareaControl
          label={__('Description', 'wp-starter-plugin')}
          onChange={(value) => onUpdate('open_graph_description', value)}
          value={openGraphDescription}
        />
      </PanelBody>
    );
  }
}
