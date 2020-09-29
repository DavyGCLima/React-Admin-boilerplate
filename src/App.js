import React from 'react';
import MomentUtils from '@date-io/moment';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ApolloProvider } from '@apollo/react-hooks';

import './config/ReactotronConfig';
import client from './services';

import store from './store';
import Routes from './routes';
import theme from './layout/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Routes />
          </MuiPickersUtilsProvider>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
