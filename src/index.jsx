import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  // useHistory,
  Switch,
  Redirect,
} from 'react-router-dom';

//  imports for Auth0
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/common/loginButton';
import LogoutButton from './components/common/logoutButton';

import 'antd/dist/antd.less';
import { NotFoundPage } from './components/pages/NotFound';
import { LandingPage } from './components/pages/Landing';

import { FooterContent, SubFooter } from './components/Layout/Footer';

// import { HeaderContent } from './components/Layout/Header';
// removed above header and added auth0 as the header to ensure login was visible 
// and important buttons would only appear after authorized

// import { TablePage } from './components/pages/Table';

import { Layout } from 'antd';
import GraphsContainer from './components/pages/DataVisualizations/GraphsContainer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './state/reducers';
import { colors } from './styles/data_vis_colors';

const { primary_accent_color } = colors;
const store = configureStore({ reducer: reducer });
// declared 2 constants to use below, just for clean and readable code
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// changed structure below to use auth0
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

export function App() {
  const { Footer, Header } = Layout;
  const { isAuthenticated } = useAuth0();

  return (
    <Layout>
      <Header
        style={{
          height: '10vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: primary_accent_color,
          justifyContent: 'center',
        }}
      >
        <h1 style={{ color: '#FFFFFF' }}>Welcome to Asylum</h1>
      </Header>
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <h2>Welcome to Asylum Office Grant Rate Tracker</h2>
        <p>Log in to explore the data and visualizations.</p>
        {!isAuthenticated && <LoginButton />} {/* Show the login button if not authenticated */}
        {isAuthenticated && <LogoutButton />} {/* Show the logout button if authenticated */}
      </div>
      <Switch>
        <Route path="/" exact>
          <LandingPage isAuthenticated={isAuthenticated} />
        </Route>
        <Route path="/graphs">
          {/* logic for the ability to go to graphs page */}
          {isAuthenticated ? <GraphsContainer isAuthenticated={isAuthenticated} /> : <Redirect to="/" />} 
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          color: '#E2F0F7',
        }}
      >
        <FooterContent />
      </Footer>
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          padding: 0,
        }}
      >
        <SubFooter />
      </Footer>
    </Layout>
  );
}