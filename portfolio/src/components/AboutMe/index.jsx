import React from 'react';
import foto from '../../assets/fotoperfil.png'
export default function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <div className="about-me__block">
        <img src={foto} alt="Thiago Paiva" className="about-me__photo" />
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
  );
}
