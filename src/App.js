import React from "react";
import { ThemeProvider } from "styled-components";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import WaitingRoom from "./pages/WaitingRoom";
import "./index.css"

function App() {
    const theme = {
        mainColors: {
            darkGrey: "#444444",
            grey: "#737373",
            lightGrey: "#DADADA",
            brokenBlack: "#161616",
            lightBlack: "#393939",
        },
    };

    // GOOGLE ANALYTICS

    return (
        <ThemeProvider theme={theme}>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/waiting-room">
                    <WaitingRoom />
                </Route>

                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
