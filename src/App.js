
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router/Router";
import { DateComponentContext } from "./context/DateContext";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./styles/theme";
// import { LayOut } from "./components/LayOut/LayOut";


const App = (props) => {
  return (
    <DateComponentContext>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* <LayOut> */}
            <Router />
          {/* </LayOut> */}
        </ThemeProvider>
      </BrowserRouter>
    </DateComponentContext>
  );
};

export default App;

