import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import BackgroundShader from './components/BackgroundShader';

// Assets imports
import foto from './assets/fotoperfil.png';

import firmware1 from './assets/slate.mp4';
import firmware2 from './assets/slate.png';
import software1 from './assets/roguelike.png';
import software2 from './assets/roguelike.png';
import gameDev1 from './assets/roguelike.mp4';
import gameDev2 from './assets/jetpack.mp4';
import gameDev3 from './assets/roguelike2.mp4';
import gameDev4 from './assets/roguelike2.png';
import gameDev5 from './assets/roguelike3.png';
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
      text: `Editor braille digital com 28 celas braille, displays OLED para acompanhamento visual em tinta e feedback sonoro em tempo real. Integra áudio em português, feedback tátil por vibração e navegação por botões físicos. Comunicação com o app via Wi-Fi, com suporte a sincronização e configurações. Projeto baseado em ESP32 e STM32 com ESP-IDF e STM32Cube. Projeto realizado pelo Instituto Iracema para auxiliar no ensino de braille para crianças cegas.`,
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
      media: [gameDev1, gameDev3, gameDev4, gameDev5],
      title: 'Roguelike Shooter',
      subtitles: [{ name: 'Game Maker', icon: svg1 }],
      text: `Jogo com código desenvolvido por mim que possui sistema de combate por tiros, com geração de nível procedural com 5+ andares, 20+ armas com habilidades diferentes, 40+ items que mudam gameplay completamente, vários inimigos e NPCs planejados. Possui um shader de luz especializado com sombras projetadas, engine própria para criação de salas, inimigos com IA de movimento e combate em componentes e inúmeras sinergias entre items, armas e aliados. Hoje na fase ALFA, em breve o BETA será lançado.`,
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

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleCardDot = (newIdx) => {
    setCardIndex(prev => ({ ...prev, [activeTab]: newIdx }));
    // reset media idx when card changes
    setMediaIndex(prev => ({ ...prev, [activeTab]: 0 }));
  };

  const handleMediaDot = (newIdx) => {
    mediaContainerRef.current?.classList.remove('loaded');
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

  // Swipe handlers
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const onTouchEnd = () => {
    const dx = touchEndX.current - touchStartX.current;
    if (Math.abs(dx) > 50) {
      const dir = dx < 0 ? 1 : -1;
      const len = media.length;
      const newIdx = (mIdx + dir + len) % len;
      handleMediaDot(newIdx);
    }
  };

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

  useEffect(() => {
    const icon = document.querySelector('.linkedin-icon');
    const section = document.getElementById('about-me');
    if (!icon || !section) return;
  
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          icon.classList.add('black');
        } else {
          icon.classList.remove('black');
        }
      },
      { threshold: 0.5 }
    );
  
    obs.observe(section);
    return () => obs.disconnect();
  }, []);
  

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
      <BackgroundShader />

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
        <div
          className="media-container"
          ref={mediaContainerRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <svg
            className="media-loading"
            viewBox="0 0 50 50"
            aria-hidden="true"
          >
            <circle
              cx="25" cy="25" r="20"
              stroke="white" strokeWidth="5"
              fill="none"
              strokeDasharray="31.4 31.4"
              strokeDashoffset="0"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0" to="60"
                dur="1s" repeatCount="indefinite"
              />
            </circle>
          </svg>
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
          <h3>{title}</h3>
          {/* <h3>{title}</h3> */}
          <div className="subtitle-container">
            {subtitles.map((sub, i) => (
              <h4 key={i} className="subtitle-with-icon">
                <img src={sub.icon} alt="" style={{ marginRight: '0.5rem', verticalAlign: 'middle', width: 16, height: 16 }} />
                {sub.name}
              </h4>
            ))}
          </div>
          <p>{text}</p>
          {/* <p>{text}</p> */}

          {/* Card dots */}
          <div className="dots">
            {cards.length > 1 ?

              cards.map((_, i) => (
                <span
                  key={i}
                  className={i === cardIdx ? 'dot active' : 'dot'}
                  onClick={() => handleCardDot(i)}
                />
              ))

              : <div />}
          </div>
        </div>
      </main>
      <section id="about-me" className="about-me">
        <div className="about-me__block">
          <img
            src={foto}               // importe no topo: import suaFoto from './assets/sua-foto.png';
            alt="Foto de Thiago Paiva"
            className="about-me__photo"
          />
          <div className="about-me__info">
            <h2>Sobre mim</h2>
            <p>
              Olá, sou Thiago Paiva, desenvolvedor com paixão por transformar ideias em soluções inteligentes — seja no hardware, software ou nos dois ao mesmo tempo. Atualmente cursando Engenharia de Telecomunicações no IFCE Campus Fortaleza, fui estagiário no Instituto Iracema, onde me especializei no desenvolvimento de firmware para sistemas embarcados, voltado à acessibilidade e inovação social.
            </p>
            <p>
              Minha experiência abrange tanto o universo embarcado (ESP32, STM32, MicroPython, C/C++) quanto o desenvolvimento web moderno, utilizando tecnologias como Node.js, PostgreSQL e React(Por onde este site foi feito), sempre com foco em desempenho, escalabilidade e design responsivo. Sempre aplicando boas práticas de componentização, gerenciamento de estado, testes e otimizações.
            </p>
            <p>
              Além disso, trabalho nos tempos livres no desenvolvimento de jogos 2.5D, com projetos autorais construídos em Unity e GameMaker. Desenvolvi sistemas completos de gameplay: geração procedural, IA para inimigos, inventário, combate e sinergia entre itens — tudo com base em arquitetura de componentes e design patterns voltados para games.
            </p>
            <p>
              Obrigado por visitar meu portfólio! Se possui interesse em colaborar ou possuir alguma dúvida entre em contato pelo <a href="https://www.linkedin.com/in/thiago-de-sousa-paiva-755388161/">
                LinkedIn
              </a>.
            </p>
          </div>
        </div>
      </section>
      <a href="https://www.linkedin.com/in/thiago-de-sousa-paiva-755388161/" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  className="bi bi-linkedin" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
        </svg>
      </a>
    </div>
  );
}

export default App;
