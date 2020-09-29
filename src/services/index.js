import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

import setAuthTransactions from './auth';
import setProductTransactions from './productsTransactions';
import setUserTransactions from './userTransactions';

import { getToken } from '../services/auth';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'none',
  }
}

const cache = new InMemoryCache();
const link = createUploadLink({
  uri: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    application: 'ADMIN',
  }
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
  defaultOptions,
});

setUserTransactions(client);
setAuthTransactions(client);
setProductTransactions(client);

export default client;
