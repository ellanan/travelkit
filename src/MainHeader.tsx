import React from 'react';
import { NavLink } from 'react-router-dom';

const MainHeader = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Welcome</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Login</NavLink>
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
