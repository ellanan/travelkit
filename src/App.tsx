import { Route, Switch } from 'react-router-dom';

import MainHeader from './MainHeader';
import Home from './pages/Home';
import Login from './pages/Login';
import Demo from './pages/Demo';
import { ListPageLinks } from './Links';
import { TravelBackground } from './Backgrounds';
import { SessionContextProvider } from './useSessionContext';
import { ListWithServerData } from './ListWithServerData';

function App() {
  return (
    <SessionContextProvider>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/lists/demo'>
          <Demo />
        </Route>

        <Route
          exact
          path='/lists/:listId'
          render={({ match }) => (
            <TravelBackground>
              <MainHeader />
              <ListWithServerData
                key={match.params.listId}
                id={match.params.listId}
              />
              <ListPageLinks />
            </TravelBackground>
          )}
        />
      </Switch>
    </SessionContextProvider>
  );
}

export default App;
