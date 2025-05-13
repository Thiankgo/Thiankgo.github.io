import React from 'react';

export default function LoadingIcon() {
  return (
    <svg className="media-loading" viewBox="0 0 50 50" aria-hidden="true">
        <circle cx="25" cy="25" r="20" stroke="white" strokeWidth="5" fill="none"
          strokeDasharray="31.4 31.4" strokeDashoffset="0">
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="60"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
  );
}
