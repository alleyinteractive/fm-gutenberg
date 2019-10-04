/* global wp, React */

import PropTypes from 'prop-types';

/**
 * A React component to render the edit view of a sample block.
 */
export default class SampleBlockEdit extends React.PureComponent {
  /**
   * Set PropTypes for this component.
   * @type {object}
   */
  static propTypes = {
    attributes: PropTypes.shape({
      sampleAttribute: PropTypes.array,
    }),
    setAttributes: PropTypes.func.isRequired,
  };

  /**
   * Set initial props.
   * @type {object}
   */
  static defaultProps = {
    attributes: {
      sampleAttribute: [],
    },
  };

  render() {
    const {
      editor: {
        RichText,
      },
      i18n: {
        __,
      },
    } = wp;
    const {
      attributes: {
        sampleAttribute = [],
      } = {},
      setAttributes,
    } = this.props;

    return (
      <div className="sample__wrapper">
        <RichText
          className="sample__container"
          formattingControls={[]}
          keepPlaceholderOnFocus
          multiline={false}
          onChange={(newValue) => {
            setAttributes({
              sampleAttribute: newValue,
            });
          }}
          placeholder={__('Lorem Ipsum', 'wp-starter-plugin')}
          tagName="h3"
          value={sampleAttribute}
        />
      </div>
    );
  }
}
