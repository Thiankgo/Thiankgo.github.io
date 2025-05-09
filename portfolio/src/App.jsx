// src/App.js
import React, { useState } from 'react';
import './App.css';
import BackgroundShader from './components/BackgroundShader';
import firmware1 from './assets/roguelike.png';
import firmware2 from './assets/roguelike.png';
import software1 from './assets/roguelike.png';
import software2 from './assets/roguelike.png';
import gameDev1 from './assets/roguelike.png';
import gameDev2 from './assets/roguelike.png';
import svg1 from './assets/svg1.svg'
import linkedinIcon from './assets/linkedin.svg'

const TABS = ['FIRMWARE', 'SOFTWARE', 'GAME DEV'];

const CONTENT = {
  FIRMWARE: [
    {
      img: firmware1,
      title: 'Custom Board FW',
      subtitles: [
        { name: 'Embedded Engineer', icon: svg1 }
      ],
      text: `Projeto de firmware para placa customizada ARM Cortex-M4. 
             Implementa drivers I²C, SPI e USB, RTOS com scheduler preemptivo 
             e bootloader OTA.`,
    },
    {
      img: firmware2,
      title: 'Sensor Manager',
      subtitles: [
        { name: 'Embedded Engineer', icon: svg1 }
      ],
      text: `Módulo de coleta de dados de sensores ambientais, 
             com protocolo MQTT e modo low-power. Testado em campo.`,
    }
  ],
  SOFTWARE: [
    {
      img: software1,
      title: 'Web Dashboard',
      subtitles: [
        { name: 'Front-end Developer', icon: svg1 }
      ],
      text: `Aplicação React + TypeScript para monitoramento em tempo real 
             de sensores industriais. Gráficos dinâmicos, autenticação JWT 
             e deploy em Docker.`,
    },
    {
      img: software2,
      title: 'Admin Panel',
      subtitles: [
        { name: 'Full-stack', icon: svg1 }
      ],
      text: `Painel CRUD com Node.js, Express e PostgreSQL. 
             Implementa RBAC, filtros avançados e testes e2e.`,
    }
  ],
  'GAME DEV': [
    {
      img: gameDev1,
      title: 'Roguelike Shooter',
      subtitles: [
        { name: 'Game Maker', icon: svg1 }
      ],
      text: `Jogo com geração procedural de níveis, 20+ armas únicas, 
             40+ itens especiais e IA variada. Fase ALFA.`,
    },
    {
      img: gameDev2,
      title: 'Boss Fight Demo',
      subtitles: [
        { name: 'Game Maker', icon: svg1 }
      ],
      text: `Demonstração do enfrentamento de chefes. 
             Vários padrões de ataque e sistema de dodge.`,
    }
  ],
};

function App() {
  const [activeTab, setActiveTab] = useState('GAME DEV');
  const [cardIndex, setCardIndex] = useState({
    FIRMWARE: 0,
    SOFTWARE: 0,
    'GAME DEV': 0,
  });

  const cards = CONTENT[activeTab];
  const idx = cardIndex[activeTab];
  const { img, title, subtitles, text } = cards[idx];

  const handleDotClick = newIdx => {
    setCardIndex(prev => ({
      ...prev,
      [activeTab]: newIdx
    }));
  };

  const myPalette = ['#011627', '#7B00FF', '#011627', '#00D9FF'];

  return (
    <div className="App">
      <BackgroundShader palette={myPalette} />
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

      <main className="content-card">
        <img src={img} alt={title} />
        <div className="text">
          <h3>{title}</h3>
          <div>
            {subtitles.map((sub, i) => (
              <h4 key={i} className="subtitle-with-icon">
                <img
                  src={sub.icon}
                  alt=""
                  style={{ marginRight: '0.5rem', verticalAlign: 'middle', width: '16px', height: '16px' }}
                />
                {sub.name}
              </h4>
            ))}

          </div>
          <p>{text}</p>

          <div className="dots">
            {cards.map((_, i) => (
              <span
                key={i}
                className={i === idx ? 'dot active' : 'dot'}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </div>
        </div>
      </main>
      <a
        href="https://www.linkedin.com/in/thiago-de-sousa-paiva-755388161/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-icon"
      >
        <img src={linkedinIcon} alt="LinkedIn" />
      </a>
    </div>
  );
}

export default App;
