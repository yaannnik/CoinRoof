import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/index";
import Home from "./pages/Home/index";
import CreateNFT from "./pages/CreateNFT/index";
import Item from "./pages/Item/index";

import {createTheme } from '@material-ui/core/styles';   // global theme
import {ThemeProvider} from '@material-ui/core';

import "./App.css";
// global theme for color
const theme = createTheme({
  palette: {
    primary: {
      main: "#4615b2",
    },
    secondary: {
      main: "#651fff",
    },
  },
});

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>

      <ThemeProvider theme={theme}>
          <Route path="/" exact component={Home} />
          <Route path="/create-nft" component={CreateNFT} />
          <Route path="/nft/:nftId" component={Item} />
      </ThemeProvider>
          <Route>404 Not Found!</Route>
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
