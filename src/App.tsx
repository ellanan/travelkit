import { Route, Switch } from 'react-router-dom';
import { ListPage } from './Links';
import { TravelBackground } from './Backgrounds';
import Home from './pages/Home';
import MainHeader from './MainHeader';
import Login from './pages/Login';
import List from './List';
import { SessionContextProvider } from './useSessionContext';

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
                <List id={match.params.listId} />
                <ListPage />
              </TravelBackground>
            );
          }}
        />
      </Switch>
    </SessionContextProvider>
  );
}

export default App;
