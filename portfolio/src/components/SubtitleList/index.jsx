import React from 'react';

export default function SubtitleList({ subtitles }) {
  return (
    <div className="subtitle-container">
      {subtitles.map((sub, i) => (
        <h4 key={i} className="subtitle-with-icon">
          <img
            src={sub.icon}
            alt=""
            style={{ marginRight: '0.5rem', verticalAlign: 'middle', width: 16, height: 16 }}
          />
          {sub.name}
        </h4>
      ))}
    </div>
  );
}
