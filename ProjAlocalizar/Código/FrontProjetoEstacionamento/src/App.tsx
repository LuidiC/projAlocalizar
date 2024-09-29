import { BrowserRouter, Routes } from 'react-router-dom';
import { RouterDomApp } from './routes/RouterDomApp';
import { AppBarTop } from './shared/components/app-bar/AppBarTop';
import { ThemeProvider } from '@mui/material';
import { Theme } from './shared/themes/Theme';

export const App = () => {
  return (
    <ThemeProvider theme={Theme} >
      <BrowserRouter >
        <AppBarTop>
          <RouterDomApp />
        </AppBarTop>
      </BrowserRouter>
    </ThemeProvider>
  );
}
