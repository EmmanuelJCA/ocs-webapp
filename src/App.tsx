import { SnackbarProvider } from 'notistack';
import { Provider as ReduxProvider } from 'react-redux';

import Router from './router';
import ThemeProvider from './theme';
import { store } from './redux/store';

// ----------------------------------------------------------------------

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <SnackbarProvider>
          <Router />
        </SnackbarProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
