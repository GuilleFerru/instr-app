
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router/Router";
import { DateComponentContext } from "./context/DateContext";
import { AuthComponentContext } from './context/AuthContext';
import { SocketComponentContext } from "./context/SocketContext";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./styles/theme";
// import { LayOut } from "./components/LayOut/LayOut";


const App = () => {
  return (
    <AuthComponentContext>
      <SocketComponentContext>
        <DateComponentContext>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </DateComponentContext>
      </SocketComponentContext>
    </AuthComponentContext>
  );
};

export default App;

