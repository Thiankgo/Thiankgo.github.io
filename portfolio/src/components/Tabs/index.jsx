// src/components/Tabs.jsx
import React from 'react';

export default function Tabs({ activeTab, setActiveTab, tabs }) {
  const handleClick = (tab, e) => {
    setActiveTab(tab);
    // trigger bounce
    const letters = Array.from(e.currentTarget.querySelectorAll('.tab-letter'));
    letters.forEach((el, i) => {
      el.classList.remove('animate');
      void el.offsetWidth;
      setTimeout(() => el.classList.add('animate'), i * 20);
    });
  };

  return (
    <nav className="tabs">
      {tabs.map(tab => (
        <button
          key={tab}
          className={tab === activeTab ? 'tab active' : 'tab'}
          onClick={e => handleClick(tab, e)}
        >
          {[...tab].map((char, i) => (
            <span key={i} className="tab-letter">
              {char}
            </span>
          ))}
        </button>
      ))}
    </nav>
  );
}
