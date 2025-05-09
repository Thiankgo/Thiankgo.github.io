import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import BackgroundShader from './components/BackgroundShader';

// Assets imports
import firmware1 from './assets/slate.mp4';
import firmware2 from './assets/slate.png';
import software1 from './assets/roguelike.png';
import software2 from './assets/roguelike.png';
import gameDev1 from './assets/roguelike.mp4';
import gameDev2 from './assets/jetpack.mp4';
import svg1 from './assets/svg1.svg';
import accessibility from './assets/accessibility.svg';
import microchip from './assets/microchip.svg';
import linkedinIcon from './assets/linkedin.svg';

const TABS = ['FIRMWARE', 'GAME DEV'];

// Array of cards per tab, each with media array
const CONTENT = {
  FIRMWARE: [
    {
      media: [firmware1, firmware2],
      title: 'Firmware da Reglete Digital',
      subtitles: [
        { name: 'Sistemas Embarcados', icon: microchip },
        { name: 'Acessibilidade', icon: accessibility },
        { name: 'ESP-IDF', icon: svg1 },
        { name: 'STMCubeX', icon: svg1 }
      ],
      text: `Editor braille digital com 28 células táteis, displays OLED para acompanhamento visual em tinta e feedback sonoro em tempo real. Integra áudio em português, feedback tátil por vibração e navegação por botões físicos. Comunicação com o app via Wi-Fi, com suporte a sincronização e configurações. Projeto baseado em ESP32 e STM32 com ESP-IDF e STM32Cube. Projeto realizado pelo Instituto Iracema para auxiliar no ensino de braille para crianças cegas.`,
    }
  ],
//   SOFTWARE: [
//     {
//       media: [software1, software2],
//       title: 'Web Dashboard',
//       subtitles: [{ name: 'Front-end Developer', icon: svg1 }],
//       text: `Aplicação React + TypeScript para monitoramento em tempo real 
// de sensores industriais. Gráficos dinâmicos, autenticação JWT 
// e deploy em Docker.`,
//     },
//     {
//       media: [software1, software2],
//       title: 'Admin Panel',
//       subtitles: [{ name: 'Full-stack', icon: svg1 }],
//       text: `Painel CRUD com Node.js, Express e PostgreSQL. 
// Implementa RBAC, filtros avançados e testes e2e.`,
//     }
//   ],
  'GAME DEV': [
    {
      media: [gameDev1],
      title: 'Roguelike Shooter',
      subtitles: [{ name: 'Game Maker', icon: svg1 }],
      text: `Jogo desenvolvido por mim que possui sistema de combate por tiros, com geração de nível procedural com 5+ andares, 20+ armas com habilidades diferentes, 40+ items que mudam gameplay completamente, vários inimigos e NPCs planejados. Possui um shader de luz especializado com sombras projetadas, engine própria para criação de salas, inimigos com IA de movimento e combate em componentes e inúmeras sinergias entre items, armas e aliados. Hoje na fase ALFA, em breve o BETA será lançado.`,
    },
    {
      media: [gameDev2],
      title: 'Jetpack Platformer',
      subtitles: [{ name: 'Game Maker', icon: svg1 }],
      text: `Joguinho curto de plataforma com mecânica de jetpack e coletáveis. Possui alguns efeitos de shader com ripple, parallax, sistema de luz e outros.`,
    }
  ],
};

function App() {
  const [activeTab, setActiveTab] = useState('FIRMWARE');
  const [cardIndex, setCardIndex] = useState({ FIRMWARE: 0, 'GAME DEV': 0 });
  const [mediaIndex, setMediaIndex] = useState({ FIRMWARE: 0, 'GAME DEV': 0 });
  const mediaContainerRef = useRef(null);

  const cards = CONTENT[activeTab];
  const cardIdx = cardIndex[activeTab];
  const card = cards[cardIdx];
  const { media, title, subtitles, text } = card;
  const [videoLoaded, setVideoLoaded] = useState(false);
  const mIdx = mediaIndex[activeTab];
  const currentMedia = media[mIdx];

  const handleCardDot = (newIdx) => {
    setCardIndex(prev => ({ ...prev, [activeTab]: newIdx }));
    // reset media idx when card changes
    setMediaIndex(prev => ({ ...prev, [activeTab]: 0 }));
  };

  const handleMediaDot = (newIdx) => {
    setMediaIndex(prev => ({ ...prev, [activeTab]: newIdx }));
  };

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

  const { width } = useWindowSize();
  const isMobile = width <= 768;

  useEffect(() => {
    [...document.querySelectorAll('.card-letter')].forEach((el, i) => {
      el.classList.remove('animate'); void el.offsetWidth;
      setTimeout(() => el.classList.add('animate'), i * 4);
    });
  }, [activeTab, cardIdx]);

  useEffect(() => {
    [...document.querySelectorAll('.card-letterh4')].forEach((el, i) => {
      el.classList.remove('animate'); void el.offsetWidth;
      setTimeout(() => el.classList.add('animate'), i * 4);
    });
  }, [activeTab, cardIdx]);

  useEffect(() => {
    [...document.querySelectorAll('.card-letterh3')].forEach((el, i) => {
      el.classList.remove('animate'); void el.offsetWidth;
      setTimeout(() => el.classList.add('animate'), i * 4);
    });
  }, [activeTab, cardIdx]);

  // Clear placeholder on media load
  const handleMediaLoaded = () => {
    if (mediaContainerRef.current) {
      mediaContainerRef.current.classList.add('loaded');
    }
  };

  const isVideo = typeof currentMedia === 'string' && currentMedia.endsWith('.mp4');

  return (
    <div className="App">
      <div id="startup-fade" />
      <BackgroundShader/>

      {/* Header & Tabs */}
      <header className="portfolio-header">
        <h1>THIAGO PAIVA</h1>
        <h2>PORTFOLIO</h2>
        <nav className="tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={tab === activeTab ? 'tab active' : 'tab'}
              onClick={(e) => {
                setActiveTab(tab);

                // Bounce animation on tab click
                const letters = Array.from(e.currentTarget.querySelectorAll('.tab-letter'));
                letters.forEach((el, i) => {
                  el.classList.remove('animate');
                  void el.offsetWidth;
                  setTimeout(() => el.classList.add('animate'), i * 20);
                });
              }}
            >
              {[...tab].map((char, i) => (
                <span key={i} className="tab-letter">{char}</span>
              ))}
            </button>
          ))}
        </nav>
      </header>

      {/* Content Card */}
      <main className="content-card" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
        <div className="media-container" ref={mediaContainerRef}>
          {isVideo ? (
            <video
              key={currentMedia}
              src={currentMedia}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="card-video"
              onLoadedData={() => {
                handleMediaLoaded();
                setVideoLoaded(true);
              }}
              style={{
                opacity: videoLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
            />
          ) : (
            <img
              src={currentMedia}
              alt={title}
              className="card-media"
              loading="lazy"
              style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
              onLoad={(e) => {
                handleMediaLoaded();
                e.currentTarget.style.opacity = '1';
              }}
            />
          )}
          {media.length > 1 ?
            <div className="media-dots">
              {media.map((_, i) => (
                <span
                  key={i}
                  className={i === mIdx ? 'dot active' : 'dot'}
                  onClick={() => handleMediaDot(i)}
                />
              ))}
            </div>
            : <div />}
        </div>


        {/* Text */}
        <div className="text">
          {/* <h3>{renderSpans(title, 'card-letterh3')}</h3> */}
          <h3>{title}</h3>
          <div className="subtitle-container">
            {subtitles.map((sub, i) => (
              <h4 key={i} className="subtitle-with-icon">
                <img src={sub.icon} alt="" style={{ marginRight: '0.5rem', verticalAlign: 'middle', width: 16, height: 16 }} />
                {sub.name}
              </h4>
            ))}
          </div>
          {/* <p>{renderSpans(text, 'card-letter')}</p> */}
          <p>{text}</p>

          {/* Card dots */}
          <div className="dots">
            {cards.map((_, i) => (
              <span
                key={i}
                className={i === cardIdx ? 'dot active' : 'dot'}
                onClick={() => handleCardDot(i)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* LinkedIn */}
      <a href="https://www.linkedin.com/in/thiago-de-sousa-paiva-755388161/" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
        <img src={linkedinIcon} alt="LinkedIn" />
      </a>
    </div>
  );
}

export default App;
