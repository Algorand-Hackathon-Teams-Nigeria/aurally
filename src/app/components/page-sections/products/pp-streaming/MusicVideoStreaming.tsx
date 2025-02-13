import React from 'react';

interface MusicVideoStreamingProps {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  onClick?: () => void;
}

const MusicVideoStreaming: React.FC<MusicVideoStreamingProps> = ({
  text = "Music/Video Streaming",
  textColor = "#FFFFFF",
  onClick
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    padding: '12px 14px',
    background: 'linear-gradient(90deg, #E22BCC 0%, #FBB03B 100%)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    width: 'fit-content',
    opacity: '40%',
  };

  const textStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '16.85px',
    fontWeight: 700,
    letterSpacing: '0.1016806811094284px',
    lineHeight: '16.27px',
    color: textColor,
    margin: 0,
  };

  return (
    <div 
      style={containerStyle}
      onClick={onClick}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.opacity = '0.8';
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.opacity = '1';
      }}
    >
      <span style={textStyle}>{text}</span>
    </div>
  );
};

export default MusicVideoStreaming;
