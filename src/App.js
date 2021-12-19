import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useHistory, useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import { Alert } from "./components/alert";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import WaitingRoom from "./pages/WaitingRoom";
import Chatbox from "./pages/Chatbox";
import "./index.css";
import { Connection } from "./lib/apiconnect";

function App() {
    const location = useLocation()
    const history = useHistory()
    const theme = {
        mainColors: {
            darkBlue: "#5b9cae",
            blue: "#9fc5d0",
            lightBlue: "#edfafd",
            grey: "#949494",
        },
    };
    // GOOGLE ANALYTICS

    useEffect(() => {
        if (location.pathname.startsWith("/chatbox/")) {
            Connection.attemptToResumeChat();
        } else if (location.pathname.startsWith("/waiting-room")) {
            // Do nothing
        } else {
            Connection.attemptToResumeSession();
        }

        Connection.on("session-destroyed", () => {
            history.replace('/')
            window.$alert.present(
                "Your session has been destroyed",
                "Please create a new session."
            )
        })
    }, []);



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

                <Route exact path="/chatbox/:id">
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
