import React, { useRef } from 'react';

import LoadingIcon from '../LoadingIcon';

export default function MediaSection({
  media,
  title,
  mediaIndex,
  activeTab,
  onMediaDot,
  mediaContainerRef,
  videoLoaded,
  setVideoLoaded
}) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mediaIdx = mediaIndex[activeTab];
  const current = media[mediaIdx];
  const isVideo = typeof current === 'string' && current.endsWith('.mp4');

  const handleMediaLoaded = () => {
    mediaContainerRef.current?.classList.add('loaded');
    setVideoLoaded(true);
  };

  const handleTouchStart = e => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = e => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const dx = touchEndX.current - touchStartX.current;
    if (Math.abs(dx) > 50) {
      const dir = dx < 0 ? 1 : -1;
      const len = media.length;
      const newIdx = (mediaIdx + dir + len) % len;
      mediaContainerRef.current?.classList.remove('loaded');
      onMediaDot(newIdx);
    }
  };

  return (
    <div
      className="media-container"
      ref={mediaContainerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <LoadingIcon />

      {isVideo ? (
        <video
          key={current}
          src={current}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="card-video"
          onLoadedData={handleMediaLoaded}
          style={{
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      ) : (
        <img
          src={current}
          alt={title}
          className="card-media"
          loading="lazy"
          onLoad={e => {
            handleMediaLoaded();
            e.currentTarget.style.opacity = '1';
          }}
          style={{
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {media.length > 1 ?
        <div className="media-dots">
          {media.map((_, i) => (
            <span
              key={i}
              className={i === mediaIdx ? 'dot active' : 'dot'}
              onClick={() => onMediaDot(i)}
            />
          ))}
        </div>
        : <div />}
    </div>
  );
}
