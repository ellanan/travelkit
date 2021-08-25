import React from 'react';
import { GoMarkGithub } from 'react-icons/go';
import { FaTwitter } from 'react-icons/fa';
import { HStack } from '@chakra-ui/react';

export const ListPageLinks = () => {
  return (
    <ul
      style={{
        padding: '1em',
        listStyleType: 'none',
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <li
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <HStack gridGap={4}>
          <a href='https://github.com' target='_blank' rel='noreferrer'>
            <GoMarkGithub size={18} />
          </a>
          <a href='https://twitter.com/hpme' target='_blank' rel='noreferrer'>
            <FaTwitter size={18} color='#1DA1F2' />
          </a>
        </HStack>
      </li>

      <li>
        <a
          href='https://www.freepik.com/vectors/travel'
          style={{
            color: '#333',
            fontSize: '10px',
            textDecoration: 'none',
            opacity: 0.4,
            fontFamily: 'sans-serif',
          }}
          target='_blank'
          rel='noreferrer'
        >
          Travel vector created by rawpixel.com - www.freepik.com
        </a>
      </li>
    </ul>
  );
};

export const HomePageLinks = () => {
  return (
    <ul
      style={{
        padding: '1em',
        listStyleType: 'none',
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <li
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <HStack gridGap={4}>
          <a href='https://github.com' target='_blank' rel='noreferrer'>
            <GoMarkGithub size={18} />
          </a>
          <a href='https://twitter.com/hpme' target='_blank' rel='noreferrer'>
            <FaTwitter size={18} color='#1DA1F2' />
          </a>
        </HStack>
      </li>

      <li>
        <a
          href='https://www.freepik.com/vectors/people'
          style={{
            color: '#333',
            fontSize: '10px',
            textDecoration: 'none',
            opacity: 0.4,
            fontFamily: 'sans-serif',
          }}
          target='_blank'
          rel='noreferrer'
        >
          People vector created by pch.vector - www.freepik.com
        </a>
      </li>
    </ul>
  );
};

export const LoginPageLinks = () => {
  return (
    <ul
      style={{
        padding: '1em',
        listStyleType: 'none',
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <li
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <HStack gridGap={4}>
          <a href='https://github.com' target='_blank' rel='noreferrer'>
            <GoMarkGithub size={18} />
          </a>
          <a href='https://twitter.com/hpme' target='_blank' rel='noreferrer'>
            <FaTwitter size={18} color='#1DA1F2' />
          </a>
        </HStack>
      </li>
    </ul>
  );
};
