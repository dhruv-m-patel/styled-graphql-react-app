import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import graphqlClient from '../graphql/client';
import Router from '../common/router';

export default function renderApp() {
  const supportsHistory = 'pushState' in window.history;

  ReactDOM.hydrate(
    <BrowserRouter forceRefresh={!supportsHistory}>
      <ApolloProvider client={graphqlClient}>
        <Router />
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root'),
  );
}
