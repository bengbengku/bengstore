import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
