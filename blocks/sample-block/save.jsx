/* global React */

import PropTypes from 'prop-types';

/**
 * A React component to render a sample block.
 */
export default class SampleBlock extends React.PureComponent {
  /**
   * Renders this component.
   * @returns {object} - JSX for the component.
   */
  render() {
    const {
      blockEditor: {
        RichText,
      },
    } = wp;
    const {
      sampleAttribute,
    } = this.props;

    return (
      <div className="sample__wrapper">
        {Array.isArray(sampleAttribute) && sampleAttribute.length > 0 && (
          <RichText.Content
            className="sample__container"
            tagName="p"
            value={sampleAttribute}
          />
        )}
      </div>
    );
  }
}

// Set up initial props.
SampleBlock.defaultProps = {
  sampleAttribute: [],
};

// Set PropTypes for this component.
SampleBlock.propTypes = {
  sampleAttribute: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};
