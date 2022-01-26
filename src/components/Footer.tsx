import { GoMarkGithub } from 'react-icons/go';
import { FaTwitter } from 'react-icons/fa';
import { GrLinkedin } from 'react-icons/gr';
import { HStack } from '@chakra-ui/react';

export const Links = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <HStack gridGap={4}>
        <a
          href='https://github.com/ellanan/travelkit'
          target='_blank'
          rel='noreferrer'
        >
          <GoMarkGithub size={18} />
        </a>
        <a href='https://twitter.com/ellanan_' target='_blank' rel='noreferrer'>
          <FaTwitter size={18} color='#1DA1F2' />
        </a>
        <a
          href='https://www.linkedin.com/in/ella-nan-a8b39027/'
          target='_blank'
          rel='noreferrer'
        >
          <GrLinkedin size={18} color='#3B67BE' />
        </a>
      </HStack>
    </div>
  );
};

export const AttributionListPage = () => {
  return (
    <div
      style={{
        paddingBottom: '1em',
        paddingTop: '0.5em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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
    </div>
  );
};

export const AttributionHomePage = () => {
  return (
    <div
      style={{
        paddingBottom: '1em',
        paddingTop: '0.5em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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
    </div>
  );
};
