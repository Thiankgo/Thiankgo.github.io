import React, { useState, useEffect } from 'react';
import './App.css';
import BackgroundShader from './components/BackgroundShader';
import Header from './components/Header';
import ContentCard from './components/ContentCard';
import AboutMe from './components/AboutMe';
import LinkedInIcon from './components/LinkedInIcon';

// Assets imports

import firmware1 from './assets/slate.mp4';
import firmware2 from './assets/slate.png';
import gameDev1 from './assets/roguelike.mp4';
import gameDev2 from './assets/jetpack.mp4';
import gameDev3 from './assets/roguelike2.mp4';
import gameDev4 from './assets/roguelike2.png';
import gameDev5 from './assets/roguelike3.png';
import svg1 from './assets/svg1.svg';
import accessibility from './assets/accessibility.svg';
import microchip from './assets/microchip.svg';

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

  return (
    <div className="App">
      <div id="startup-fade" />
      <BackgroundShader />

      {/* Header & Tabs */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />

      {/* Content Card */}
      <ContentCard
        cards={CONTENT[activeTab]}
        activeTab={activeTab}
      />
      <AboutMe />
      <LinkedInIcon />
    </div>
  );
}

export default App;
