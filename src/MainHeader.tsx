import { Button } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSessionContext } from './useSessionContext';

const MainHeader = () => {
  const { isLoggedIn, logout } = useSessionContext();
  return (
    <div>
      <nav style={{ maxWidth: '84%', marginRight: 'auto', marginLeft: 'auto' }}>
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
            <NavLink to='/'>Home</NavLink>
          </li>
          <li style={{ padding: '10px' }}>
            <NavLink to='/demo'>Demo</NavLink>
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
