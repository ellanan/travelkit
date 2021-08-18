import { Route, Switch } from 'react-router-dom';
import { ListPageLinks } from './Links';
import { TravelBackground } from './Backgrounds';
import Home from './pages/Home';
import MainHeader from './MainHeader';
import Login from './pages/Login';
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

        <Route
          exact
          path='/lists/:listId'
          render={({ match }) => {
            return (
              <TravelBackground>
                <MainHeader />
                <ListWithServerData id={match.params.listId} />
                <ListPageLinks />
              </TravelBackground>
            );
          }}
        />
      </Switch>
    </SessionContextProvider>
  );
}

export default App;
