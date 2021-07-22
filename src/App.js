import { Navbar } from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router/Router";
import { Footer } from "./components/Footer/Footer";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./styles/theme";


const App = (props) => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Navbar>
            <Router />
            <Footer />
          </Navbar>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

