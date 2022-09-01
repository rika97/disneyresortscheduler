import './App.css';
import { Home, Results, HomeEN, ResultsEN, About, AboutEN } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0097a7'
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
            <Route exact path="/en" element={<HomeEN />} />
            <Route exact path="/results" element={<Results />} />
            <Route exact path="/results-en" element={<ResultsEN />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/about-en" element={<AboutEN />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
