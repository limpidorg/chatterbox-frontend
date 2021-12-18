import React from "react";
import { ThemeProvider } from "styled-components";
import { Route, Switch } from "react-router-dom";
import { Alert } from "./components/alert"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import WaitingRoom from "./pages/WaitingRoom";
import Chatbox from "./pages/Chatbox"
import "./index.css"

function App() {
    const theme = {
        mainColors: {
            darkBlue: "#5b9cae",
            blue: "#9fc5d0",
            lightBlue: "#edfafd",
            grey: "#949494",
        },
    };
    // GOOGLE ANALYTICS

    return (
        <ThemeProvider theme={theme}>
            <Alert />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/waiting-room">
                    <WaitingRoom />
                </Route>

                <Route exact path="/chatbox">
                    <Chatbox />
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
