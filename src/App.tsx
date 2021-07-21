import Lists from './Lists';

function App() {
  return (
    <div>
      <Lists />
      <Attribution />
    </div>
  );
}

const Attribution = () => (
  <a
    href='https://www.freepik.com/vectors/travel'
    style={{
      color: '#333',
      position: 'absolute',
      bottom: '1em',
      left: '1em',
      fontSize: '10px',
      textDecoration: 'none',
      opacity: 0.4,
      fontFamily: 'sans-serif',
    }}
  >
    Travel vector created by rawpixel.com - www.freepik.com
  </a>
);

export default App;
