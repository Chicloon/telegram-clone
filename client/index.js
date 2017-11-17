import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';

import client from './apollo';
import App from './App';

const Root = () => (
  <AppContainer>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </AppContainer>
);

ReactDOM.render(<Root />, document.getElementById('root'));
