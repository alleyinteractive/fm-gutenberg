/* global React */

import PropTypes from 'prop-types';

import ImagePicker from 'components/imagePicker/index.jsx';

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
  /**
   * Renders the sidebar section.
   * @returns {object} JSX component markup.
   */
  render() {
    const {
      description,
      image,
      onUpdate,
      title,
    } = this.props;

    return (
      <PanelBody
        initialOpen={false}
        title={__('Open Graph', 'wp-starter-plugin')}
      >
        <ImagePicker
          metaKey="wp_starter_plugin_open_graph_image"
          onUpdate={onUpdate}
          value={image}
        />
        <TextControl
          label={__('Title', 'wp-starter-plugin')}
          onChange={(value) => onUpdate(
            'wp_starter_plugin_open_graph_title',
            value,
          )}
          value={title}
        />
        <TextareaControl
          label={__('Description', 'wp-starter-plugin')}
          onChange={(value) => onUpdate(
            'wp_starter_plugin_open_graph_description',
            value,
          )}
          value={description}
        />
      </PanelBody>
    );
  }
}

// Define PropTypes for this component.
OpenGraph.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
