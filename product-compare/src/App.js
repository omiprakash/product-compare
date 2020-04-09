import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Gallery from './components/compare';

import './App.css';

class App extends React.Component {

    render(props){
      return(
      <Router>
          <Switch>
              <Route path="/compare" component={Gallery} />
            </Switch>
        </Router>
      );
    } 
}

export default App;