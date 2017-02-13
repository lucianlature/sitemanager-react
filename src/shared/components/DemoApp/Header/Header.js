import React from 'react';
import Logo from './Logo';

function Header() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <Logo />
      <h1>React, Universally</h1>
      <strong>
        A starter kit giving you the minimum requirements for a modern universal react application.
      </strong>
    </div>
  );
}

export default Header;
