import { Route, Switch } from 'react-router-dom';
import Links from './Links';
import { TravelBackground } from './Backgrounds';
import Welcome from './pages/Welcome';
import MainHeader from './MainHeader';
import Login from './pages/Login';
import List from './List';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Welcome />
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
              <Links />
            </TravelBackground>
          );
        }}
      />
    </Switch>
  );
}

export default App;
