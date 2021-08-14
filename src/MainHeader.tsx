import { Button } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSessionContext } from './useSessionContext';

const MainHeader = () => {
  const { isLoggedIn, logout } = useSessionContext();
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Welcome</NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <Button onClick={() => logout()}>Logout</Button>
            ) : (
              <NavLink to='/login'>Login</NavLink>
            )}
          </li>
          <li>
            <NavLink to='/demo'>Demo</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainHeader;
