import { Route, Switch } from 'react-router-dom';

import Lists from './Lists';
import Links from './Links';
import { TravelBackground } from './Backgrounds';
import Welcome from './pages/Welcome';
import MainHeader from './MainHeader';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Welcome />
      </Route>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route path='/demo'>
        <TravelBackground>
          <MainHeader />
          <Lists />
          <Links />
        </TravelBackground>
      </Route>
    </Switch>
  );
}

export default App;
