import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Index, NavBar, Lyrics } from './components'
import { GlobalProvider } from './context/Global'

function App() {
  return (
    <GlobalProvider>
      <Router>
        <React.Fragment>
          <NavBar />
          <div className="container mx-auto mb-16">
            <Switch>
              <Route exact path="/" component={Index}/>
              <Route exact path="/lyrics/track/:id" component={Lyrics}/>
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </GlobalProvider>

  );
}

export default App;
