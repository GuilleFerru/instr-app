import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router/Router";
import { DateComponentContext } from "./context/DateContext";
import { AuthComponentContext } from './context/AuthContext';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./styles/theme";

const App = () => {

  return (
    <AuthComponentContext>
      <DateComponentContext>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </DateComponentContext>
    </AuthComponentContext>
  );
};

export default App;





