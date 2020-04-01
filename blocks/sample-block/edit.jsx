/* global React */

import PropTypes from 'prop-types';

/**
 * A React component to render the edit view of a sample block.
 */
export default class SampleBlockEdit extends React.PureComponent {
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
          tagName="p"
          value={sampleAttribute}
        />
      </div>
    );
  }
}

// Set up initial props.
SampleBlockEdit.defaultProps = {
  attributes: {
    sampleAttribute: [],
  },
};

// Set PropTypes for this component.
SampleBlockEdit.propTypes = {
  attributes: PropTypes.shape({
    sampleAttribute: PropTypes.array,
  }),
  setAttributes: PropTypes.func.isRequired,
};
