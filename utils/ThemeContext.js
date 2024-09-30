import React, {createContext, useState, useContext, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {lightTheme, darkTheme} from './theme';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const deviceTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(deviceTheme === 'dark');

  useEffect(() => {
    setIsDarkMode(deviceTheme === 'dark');
  }, [deviceTheme]);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{theme, isDarkMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
