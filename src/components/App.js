import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Landing from './Landing';
import { loginSession } from '../reducers/userReducer';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import WordCloud from './WordCloud';
import Navbar from './Navbar';

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = ({ loginSession }) => {
  useEffect(() => {
    loginSession();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline /> {/* normalize browser css default setups */}
        <Route component={Navbar} />
        <Route exact path="/" component={Landing} />
        <Route path="/search/:searchedText" component={WordCloud} />
      </Router>
    </ThemeProvider>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loginSession: () => dispatch(loginSession()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
