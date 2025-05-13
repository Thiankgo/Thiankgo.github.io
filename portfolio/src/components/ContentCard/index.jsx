// src/components/ContentCard.jsx
import React, { useRef, useState, useEffect } from 'react';

import MediaSection from '../MediaSection';
import TextSection from '../TextSection';

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export default function ContentCard({
  cards,
  activeTab
}) {
  const mediaContainerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [cardIndex, setCardIndex] = useState({ FIRMWARE: 0, 'GAME DEV': 0 });
  const [mediaIndex, setMediaIndex] = useState({ FIRMWARE: 0, 'GAME DEV': 0 });

  const cardIdx = cardIndex[activeTab];
  
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  // Extrai o card ativo
  const card = cards[cardIdx];
  const { media, title, subtitles, text } = card;

  // Reset placeholder ao mudar de card
  useEffect(() => {
    mediaContainerRef.current?.classList.remove('loaded');
  }, [cardIdx]);

  useEffect(() => {
    [...document.querySelectorAll('.card-letter')].forEach((el, i) => {
      el.classList.remove('animate'); void el.offsetWidth;
      setTimeout(() => el.classList.add('animate'), i * 1);
    });
  }, [activeTab, cardIdx]);

  useEffect(() => {
    [...document.querySelectorAll('.card-letterh4')].forEach((el, i) => {
      el.classList.remove('animate'); void el.offsetWidth;
      setTimeout(() => el.classList.add('animate'), i * 1);
    });
  }, [activeTab, cardIdx]);

  useEffect(() => {
    [...document.querySelectorAll('.card-letterh3')].forEach((el, i) => {
      el.classList.remove('animate'); void el.offsetWidth;
      setTimeout(() => el.classList.add('animate'), i * 1);
    });
  }, [activeTab, cardIdx]);

  return (
    <main className="content-card" style={{ flexDirection: isMobile ? 'column' : 'row' }}>

      <MediaSection
        media={media}
        title={title}
        mediaIndex={mediaIndex}
        activeTab={activeTab}
        onMediaDot={newIdx => {
          mediaContainerRef.current?.classList.remove('loaded');
          setMediaIndex(prev => ({ ...prev, [activeTab]: newIdx }));
        }}
        mediaContainerRef={mediaContainerRef}
        videoLoaded={videoLoaded}
        setVideoLoaded={setVideoLoaded}
      />
      <TextSection
        title={title}
        subtitles={subtitles}
        text={text}
        cardIndex={cardIdx}
        cardsLength={cards.length}
        onCardDot={newIdx => {
          setCardIndex(prev => ({ ...prev, [activeTab]: newIdx }));
          setMediaIndex(prev => ({ ...prev, [activeTab]: 0 }));
        }}
      />
    </main>
  );
}
