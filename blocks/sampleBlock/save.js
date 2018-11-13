/* global wp, React */

import PropTypes from 'prop-types';

/**
 * A React component to render a sample block.
 */
export default class SampleBlock extends React.PureComponent {
  /**
   * Set initial props.
   * @type {object}
   */
  static defaultProps = {
    sampleAttribute: [],
  };

  /**
   * Set PropTypes for this component.
   * @type {object}
   */
  static propTypes = {
    sampleAttribute: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  };

  /**
   * Renders this component.
   * @returns {object} - JSX for the component.
   */
  render() {
    const {
      editor: {
        RichText,
      },
    } = wp;
    const {
      sampleAttribute,
    } = this.props;

    return (
      <div className="sample__wrapper">
        {Array.isArray(sampleAttribute) && 0 < sampleAttribute.length && (
          <RichText.Content
            className="sample__container"
            tagName="h3"
            value={sampleAttribute}
          />
        )}
      </div>
    );
  }
}
