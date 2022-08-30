import './App.css';
import { Home, Results } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#12c9de'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/results" element={<Results />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
