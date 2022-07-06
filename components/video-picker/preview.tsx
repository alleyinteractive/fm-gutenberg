import styled from 'styled-components';

const VideoPreviewContainer = styled.div`
  height: auto;
  width: 100%;
`;

interface VideoPreviewProps {
  src: string;
}

export default function VideoPreview({ src }: VideoPreviewProps) {
  return (
    <VideoPreviewContainer>
      <video // eslint-disable-line jsx-a11y/media-has-caption
        className="edit-video-preview"
        controls
        src={src}
      />
    </VideoPreviewContainer>
  );
}
