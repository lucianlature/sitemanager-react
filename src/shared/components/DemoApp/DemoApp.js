import React from 'react';
import { Match, Miss } from 'react-router';
import Helmet from 'react-helmet';
import { CodeSplit } from 'code-split-component';

// Import CSS styles
import 'normalize.css/normalize.css';
import 'antd/dist/antd.css';
import './globals.css';

import Error404 from './Error404';
// import Header from './Header';
import Sider from './Sider';
import { safeConfigGet } from '../../utils/config';

const siderProps = {
  /*
  siderFold,
  darkTheme,
  location,
  navOpenKeys,
  changeTheme () {
    dispatch({type: 'app/changeTheme'})
  },
  changeOpenKeys(openKeys) {
    localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
    dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
  }
  */
}

function DemoApp() {
  return (
    <div style={{ padding: '10px' }} className="ant-layout-aside">
      {/*
        All of the following will be injected into our page header.
        @see https://github.com/nfl/react-helmet
      */}
      <Helmet
        htmlAttributes={safeConfigGet(['htmlPage', 'htmlAttributes'])}
        titleTemplate={safeConfigGet(['htmlPage', 'titleTemplate'])}
        defaultTitle={safeConfigGet(['htmlPage', 'defaultTitle'])}
        meta={safeConfigGet(['htmlPage', 'meta'])}
        link={safeConfigGet(['htmlPage', 'links'])}
        script={safeConfigGet(['htmlPage', 'scripts'])}
      />

      <aside className="ant-layout-sider">
        <Sider {...siderProps} />
      </aside>

      <div className="ant-layout-main">
        {/*
          <div className="ant-layout-header">
            <Header />
          </div>
        */}
        <div className="ant-layout-container">
          <div className="ant-layout-content">
            <Match
              exactly
              pattern="/"
              render={routerProps =>
                <CodeSplit chunkName="home" modules={{ Home: require('./Home') }}>
                  { ({ Home }) => Home && <Home {...routerProps} /> }
                </CodeSplit>
              }
            />

            <Match
              pattern="/collections"
              render={routerProps =>
                <CodeSplit chunkName="about" modules={{ Collections: require('./Collections') }}>
                  { ({ Collections }) => Collections && <Collections {...routerProps} /> }
                </CodeSplit>
              }
            />

            <Match
              pattern="/about"
              render={routerProps =>
                <CodeSplit chunkName="about" modules={{ About: require('./About') }}>
                  { ({ About }) => About && <About {...routerProps} /> }
                </CodeSplit>
              }
            />

            <Miss component={Error404} />
          </div>
        </div>
        <div className="ant-layout-footer">
           Produced with ❤️ &nbsp;by Constant Commerce
        </div>
      </div>
    </div>
  );
}

export default DemoApp;
