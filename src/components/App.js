import React from 'react';
import Landing from './Landing';

import { HashRouter as Router, Route } from 'react-router-dom';
import WordCloud from './WordCloud';
import Login from './Login';

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline /> {/* normalize browser css default setups */}
        <Route exact path="/" component={Landing} />
        <Route path="/search" component={WordCloud} />
        <Route path='/login' exact component={Login} />
      </Router>
    </ThemeProvider>
  );
};
export default App;
