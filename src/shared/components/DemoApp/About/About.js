import React from 'react';
import Helmet from 'react-helmet';
import Card from 'antd/lib/card';
import Contributor from './Contributor';

function About() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Helmet title="About" />

      <Card title="About" style={{ width: 300 }}>
        <p>The most performant piece of software since Windows 98.</p>
      </Card>
    </div>
  );
}

export default About;
