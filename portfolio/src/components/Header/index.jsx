import React from 'react';

import Tabs from '../Tabs';

export default function Header({ activeTab, setActiveTab, tabs }) {
  return (
    <header className="portfolio-header">
      <h1>THIAGO PAIVA</h1>
      <h2>PORTFOLIO</h2>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs}/>
    </header>
  );
}
