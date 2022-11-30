import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import { MantineProvider } from '@mantine/core';
import RegisterLanding from './components/registerLanding';
import Profile from './pages/profile';

function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/landing' element={<RegisterLanding />} exact />
        <Route path='/profile' element={<Profile />} exact />
      </Routes>
    </MantineProvider>
  );
}

export default App;
