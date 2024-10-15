import React from 'react';
import RenderLandingPage from './RenderLandingPage.jsx';

function LandingContainer({ isAuthenticated }) {  
// changed the props ^ to use auth0 and add it as a property below
  return (
    <>
      <RenderLandingPage isAuthenticated={isAuthenticated}/>
    </>
  );
}

export default LandingContainer;
