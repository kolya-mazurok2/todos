import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import Header from './components/UI/Header';
import Home from './pages/Home';
import { fetchAll } from './store/slices/todosSlice';
import StyledHome from './styled/pages/StyledHome';

const App = () => {
  const theme = createTheme();

  const dispatch = useDispatch();

  dispatch(fetchAll());

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />

        <StyledHome>
          <Home />
        </StyledHome>
      </div>
    </ThemeProvider>
  );
};

export default App;
