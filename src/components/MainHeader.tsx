import { NavLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useSessionContext } from '../hooks/useSessionContext';

const logoImage = require('../images/logo/logo.png');

const MainHeader = () => {
  const { isLoggedIn, logout, uid } = useSessionContext();
  return (
    <div>
      <nav style={{ maxWidth: '88%', marginRight: 'auto', marginLeft: 'auto' }}>
        <ul
          style={{
            display: 'flex',
            flexDirection: 'row',
            textDecoration: 'none',
            listStyle: 'none',
            padding: '16px',
          }}
        >
          <li style={{ padding: '10px' }}>
            <NavLink to='/' style={{ display: 'flex', flexDirection: 'row' }}>
              <img
                src={logoImage}
                alt='travel kit logo'
                style={{ width: '25px', height: '25px', marginRight: '10px' }}
              />
              <span>Home</span>
            </NavLink>
          </li>
          <li style={{ padding: '10px' }}>
            {uid ? (
              <NavLink to={`/lists/${uid}`}>My TravelKit</NavLink>
            ) : (
              <NavLink to='/lists/demo'>My TravelKit</NavLink>
            )}
          </li>
          <li style={{ marginLeft: 'auto' }}>
            {isLoggedIn ? (
              <Button onClick={() => logout()}>Logout</Button>
            ) : (
              <NavLink to='/login'>
                <Button>Login</Button>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainHeader;
