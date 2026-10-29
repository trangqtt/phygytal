import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import { ReactElement, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import WebFont from 'webfontloader';
import { GlobalStyles } from './assets/theme/GlobalStyles';
import * as themes from './assets/theme/schema.json';
import { ConfirmModalWrapper } from './components/common/ConfirmModal';
import { useTheme } from './hooks/theme/useTheme';
import './index.css';
import { router } from './routes';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { login } from './state/userSlice';
import { getUserInfo } from './utils/storage';

function App(): ReactElement {
  const { theme, themeLoaded, getFonts } = useTheme(themes);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  // 4: Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        // families: getFonts(),
        families: ['Poppins', 'sans-serif'],
      },
    });
  });

  useEffect(() => {
    const userLS = getUserInfo();
    if (userLS) {
      dispatch(login(userLS));
    }
  }, [user]);

  return (
    <>
      {themeLoaded && (
        // <MuiThemeProvider theme={muiTheme}>
          <ThemeProvider theme={selectedTheme}>
            <ConfirmModalWrapper>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <GlobalStyles />
                <RouterProvider router={router} />
              </LocalizationProvider>
            </ConfirmModalWrapper>
          </ThemeProvider>
        // </MuiThemeProvider>
      )}
    </>
  );
}

export default App;
