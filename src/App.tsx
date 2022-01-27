import { Route, Switch } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import Home from './pages/Home';
import Login from './pages/Login';
import Demo from './pages/Demo';
import { AttributionListPage, Links } from './components/Footer';
import { SessionContextProvider } from './hooks/useSessionContext';
import { ListWithServerData } from './components/ListWithServerData';

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
            <div>
              <img
                src={require('./images/travel-stickers.jpg').default}
                alt=''
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(2px)',
                  opacity: 0.4,
                  zIndex: -1,
                }}
              />
              <MainHeader />
              <ListWithServerData
                key={match.params.listId}
                id={match.params.listId}
              />
              <div style={{ marginTop: 'auto' }}>
                <Links />
                <AttributionListPage />
              </div>
            </div>
          )}
        />
      </Switch>
    </SessionContextProvider>
  );
}

export default App;
