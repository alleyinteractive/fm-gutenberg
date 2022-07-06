import styled from 'styled-components';

const AudioPreviewContainer = styled.div`
  height: auto;
  width: 100%;
`;

interface AudioPreviewProps {
  src: string;
}

export default function AudioPreview({ src }: AudioPreviewProps) {
  return (
    <AudioPreviewContainer>
      <audio // eslint-disable-line jsx-a11y/media-has-caption
        className="edit-audio-preview"
        controls
        src={src}
      />
    </AudioPreviewContainer>
  );
}
