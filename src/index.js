import React from 'react';
import ReactDOM from 'react-dom';
import App  from './components/App';
import './css/index.css';
import './css/custom.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from "@material-ui/core/colors/blueGrey";
import lightGreen from "@material-ui/core/colors/lightGreen";


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: lightGreen[300],
      main: lightGreen[500],
      dark: lightGreen[700]
    },
    secondary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700]
    },
  },
  typography: {
    useNextVariants: true,
  }
});

const alertDefaultOptions = {
  position: 'top right',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
};

function Site() {
  return (
    <MuiThemeProvider theme={theme}>
          <App />
    </MuiThemeProvider>
  );
}
  // ========================================
 
  ReactDOM.render(
    <Site />,
    document.getElementById('root')
  );
  
