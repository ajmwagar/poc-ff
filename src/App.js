import React from 'react';
import { withLDProvider } from 'launchdarkly-react-client-sdk';

// import HelloWorld from './helloWorld';
import UserDisplayController from './UserDisplay/index'
// https://www.robinwieruch.de/react-hooks-fetch-data/

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <UserEntry /> 
        <HelloWorld />*/}
        <UserDisplayController />
      </header>
    </div>
  );
}

export default withLDProvider({ 
  clientSideID: '5d5c65d9f2173d0872698f7e',
  user: {
      "key": "sdk-6203c9da-4d89-474d-9dc0-4c01345eb30b"
  }
})(App);
