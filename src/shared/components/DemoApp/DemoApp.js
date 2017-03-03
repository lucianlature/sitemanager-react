import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
            <Switch>
              <Route
                exact
                path="/"
                render={routerProps =>
                  <CodeSplit chunkName="home" modules={{ Home: require('./Home') }}>
                    { ({ Home }) => Home && <Home {...routerProps} /> }
                  </CodeSplit>
                }
              />

              <Route
                path="/collections"
                render={routerProps =>
                  <CodeSplit chunkName="collections" modules={{ Collections: require('./Collections') }}>
                    { ({ Collections }) => Collections && <Collections {...routerProps} /> }
                  </CodeSplit>
                }
              />

              <Route
                path="/collection/:id/edit"
                render={routerProps =>
                  <CodeSplit chunkName="collection-edit" modules={{ CollectionEditContainer: require('./CollectionEditContainer') }}>
                    { ({ CollectionEditContainer }) => CollectionEditContainer && <CollectionEditContainer {...routerProps} /> }
                  </CodeSplit>
                }
              />

              <Route
                path="/about"
                render={routerProps =>
                  <CodeSplit chunkName="about" modules={{ About: require('./About') }}>
                    { ({ About }) => About && <About {...routerProps} /> }
                  </CodeSplit>
                }
              />

              <Route component={Error404} />
            </Switch>
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
