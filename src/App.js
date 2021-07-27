
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router/Router";

import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./styles/theme";
import { LayOut } from "./components/LayOut/LayOut";


const App = (props) => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <LayOut>
            <Router />
            {/* <Footer/> */}
          </LayOut>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

