import React from 'react';
import Landing from './Landing';

import { HashRouter as Router, Route } from 'react-router-dom';
import WordCloud from './WordCloud';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Route path="/search" component={WordCloud} />
    </Router>
  );
};
export default App;
