/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useHistory } from "react-router";
import { Route, Switch } from "react-router-dom";
import { Alert } from "./components/alert";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import WaitingRoom from "./pages/WaitingRoom";
import Chatbox from "./pages/Chatbox";
import "./index.css";
import { Connection } from "./lib/apiconnect";

function App() {
    const history = useHistory();
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
        Connection.on("session-destroyed", () => {
            history.replace("/");
            window.$alert.present(
                "Your session has been destroyed",
                "Please create a new session."
            );
        });
        Connection.on("show-alert", (res) => {
            const { title, message, actions } = res;
            const actionCopy = [...(actions || [])];
            for (let i = 0; i < actionCopy.length; i++) {
                if (actionCopy[i].link) {
                    actionCopy[i].handler = () => {
                        window.open(actionCopy[i].link, "_blank");
                    };
                }
            }
            window.$alert.present(title, message, actionCopy);
        });
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

                <Route exact path="/chat/:id">
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
