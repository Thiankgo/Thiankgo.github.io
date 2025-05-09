import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import BackgroundShader from './components/BackgroundShader';

// Assets imports
import firmware1 from './assets/roguelike.png';
import firmware2 from './assets/roguelike.png';
import software1 from './assets/roguelike.png';
import software2 from './assets/roguelike.png';
import gameDev1 from './assets/roguelike.mp4';
import gameDev2 from './assets/roguelike.png';
import svg1 from './assets/svg1.svg';
import linkedinIcon from './assets/linkedin.svg';

const TABS = ['FIRMWARE', 'SOFTWARE', 'GAME DEV'];

// Array of cards per tab, each with media array
const CONTENT = {
  FIRMWARE: [
    {
      media: [firmware1, firmware2],
      title: 'Firmware Showcase',
      subtitles: [{ name: 'Embedded Engineer', icon: svg1 }],
      text: `Projetos de firmware: placa ARM, comunicações I2C/SPI, 
RTOS preemptivo, bootloader OTA e gestão de sensores.`,
    },
    {
      media: [firmware1, firmware2],
      title: 'Sensor Manager',
      subtitles: [{ name: 'IoT Firmware', icon: svg1 }],
      text: `Módulo de coleta de dados de sensores ambientais, 
com protocolo MQTT e modo low-power. Testado em campo.`,
    }
  ],
  SOFTWARE: [
    {
      media: [software1, software2],
      title: 'Web Dashboard',
      subtitles: [{ name: 'Front-end Developer', icon: svg1 }],
      text: `Aplicação React + TypeScript para monitoramento em tempo real 
de sensores industriais. Gráficos dinâmicos, autenticação JWT 
e deploy em Docker.`,
    },
    {
      media: [software1, software2],
      title: 'Admin Panel',
      subtitles: [{ name: 'Full-stack', icon: svg1 }],
      text: `Painel CRUD com Node.js, Express e PostgreSQL. 
Implementa RBAC, filtros avançados e testes e2e.`,
    }
  ],
  'GAME DEV': [
    {
      media: [gameDev1, gameDev2, gameDev2],
      title: 'Roguelike Shooter',
      subtitles: [{ name: 'Game Maker', icon: svg1 }],
      text: `Jogo desenvolvido por mim que possui sistema de combate por tiros, com geração de nível procedural com 5+ andares, 20+ armas com habilidades diferentes, 40+ items que mudam gameplay completamente, vários inimigos e NPCs planejados. Hoje na fase ALFA, em breve o BETA será lançado.`,
    },
    {
      media: [gameDev1, gameDev2],
      title: 'Boss Fight Demo',
      subtitles: [{ name: 'Game Maker', icon: svg1 }],
      text: `Demonstração do enfrentamento de chefes. 
Vários padrões de ataque e sistema de dodge.`,
    }
  ],
};

function App() {
  const [activeTab, setActiveTab] = useState('GAME DEV');
  const [cardIndex, setCardIndex] = useState({ FIRMWARE: 0, SOFTWARE: 0, 'GAME DEV': 0 });
  const [mediaIndex, setMediaIndex] = useState({ FIRMWARE: 0, SOFTWARE: 0, 'GAME DEV': 0 });
  const mediaContainerRef = useRef(null);
  const [videoRef, isVideoVisible] = useInView({ threshold: 0.25 });

  const cards = CONTENT[activeTab];
  const cardIdx = cardIndex[activeTab];
  const card = cards[cardIdx];
  const { media, title, subtitles, text } = card;
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

  const myPalette = ['#011627', '#7B00FF', '#011627', '#00D9FF'];

  function useInView(options) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // carrega apenas uma vez
          }
        },
        options
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [options]);

    return [ref, isInView];
  }

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

  const renderSpans = (str, className) =>
    str.split('').map((char, i) => <span key={i} className={className}>{char}</span>);

  const isVideo = typeof currentMedia === 'string' && currentMedia.endsWith('.mp4');

  return (
    <div className="App">
      <div id="startup-fade" />
      <BackgroundShader palette={myPalette} />

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
                  setTimeout(() => el.classList.add('animate'), i * 50);
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
            <div ref={videoRef} style={{ width: '100%' }}>
              {isVideoVisible && (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="card-video"
                  onLoadedData={handleMediaLoaded}
                >
                  <source src={currentMedia} type="video/mp4" />
                </video>
              )}
            </div>
          ) : (
            <img
              src={currentMedia}
              alt={title}
              className="card-media"
              loading="lazy"
              onLoad={handleMediaLoaded}
            />
          )}

          <div className="media-dots">
            {media.map((_, i) => (
              <span
                key={i}
                className={i === mIdx ? 'dot active' : 'dot'}
                onClick={() => handleMediaDot(i)}
              />
            ))}
          </div>
        </div>


        {/* Text */}
        <div className="text">
          <h3>{renderSpans(title, 'card-letterh3')}</h3>
          {subtitles.map((sub, i) => (
            <h4 key={i} className="subtitle-with-icon">
              <img src={sub.icon} alt="" style={{ marginRight: '0.5rem', verticalAlign: 'middle', width: 16, height: 16 }} />
              {renderSpans(sub.name, 'card-letterh4')}
            </h4>
          ))}
          <p>{renderSpans(text, 'card-letter')}</p>

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
