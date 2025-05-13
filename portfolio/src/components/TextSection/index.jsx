import React from 'react';
import SubtitleList from '../SubtitleList';

export default function TextSection({
  title,
  subtitles,
  text,
  cardIndex,
  activeTab,
  cardsLength,
  onCardDot
}) {
  const cardIdx = cardIndex[activeTab];
  return (
    <div className="text">
      <h3>{title}</h3>
      <SubtitleList subtitles={subtitles} />
      <p>{text}</p>

      <div className="dots">
        {cardsLength > 1
          ?
          Array.from({ length: cardsLength }).map((_, i) => (
            <span
              key={i}
              className={i === cardIdx ? 'dot active' : 'dot'}
              onClick={() => onCardDot(i)}
            />
          ))
          :
          <div />}
      </div>
    </div>
  );
}
