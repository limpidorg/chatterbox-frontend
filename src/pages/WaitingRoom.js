import React from "react";
import { withRouter } from "react-router";
import Particles from "react-tsparticles";
import { Connection } from "../lib/apiconnect";
import { Container } from "./styled/WaitingRoom.styled";

class WaitingRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: "Searching for your next adventure...",
        };
        const { history } = this.props;

        Connection.updateHistory(history);
        Connection.updateHistory(props.history);
        // Check for the validity of current session

        Connection.resumeSession()
            .then((sessionInfo) => {
                if (sessionInfo.chatId) {
                    this.joinChat(sessionInfo.chatId);
                } else {
                    this.matchChat()
                        .then((chatId) => {
                            this.joinChat(chatId);
                        })
                        .catch((e) => {
                            Connection.destroySession(
                                Connection.sessionId
                            ).then(() => {
                                window.$alert.present(
                                    "We couldn't find a match for you.",
                                    `Try creating a new session. Message: ${e.message}`,
                                    [
                                        {
                                            title: "OK",
                                            type: "normal",
                                            handler: () => {
                                                history.replace("/");
                                            },
                                        },
                                    ]
                                );
                            });
                        });
                }
            })
            .catch(() => {
                history.replace("/");
                window.$alert.present(
                    "Invalid Session",
                    "You session is no longer active. Please create a new session."
                );
            });
    }

    async matchChat() {
        return new Promise((resolve, reject) => {
            this.setState({
                loading:
                    "Asking for permission to enter chatterbox universe...",
            });
            Connection.on("new-chat-found", (res) => {
                resolve(res.chatId);
            });
            Connection.emit("new-chat-request")
                .then(() => {
                    this.setState({
                        loading:
                            "The universe is huge but we're giving our best to find your chatling...",
                    });
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <>
                <Particles
                    id="tsparticles"
                    options={{
                        background: {
                            color: {
                                value: "#043564",
                            },
                            image:
                                "url('http://vincentgarreau.com/particles.js/assets/img/kbLd9vb_new.gif')",
                            position: "0 50%",
                            repeat: "no-repeat",
                            size: "60%",
                        },
                        fullScreen: {
                            zIndex: 1,
                        },
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "repulse",
                                },
                                onHover: {
                                    mode: "grab",
                                },
                            },
                            modes: {
                                bubble: {
                                    distance: 400,
                                    duration: 2,
                                    opacity: 8,
                                    size: 40,
                                },
                                grab: {
                                    distance: 200,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#ffffff",
                            },
                            links: {
                                color: {
                                    value: "#ffffff",
                                },
                                distance: 150,
                                opacity: 0.4,
                            },
                            move: {
                                attract: {
                                    rotate: {
                                        x: 600,
                                        y: 1200,
                                    },
                                },
                                direction: "left",
                                enable: true,
                                outModes: {
                                    bottom: "out",
                                    left: "out",
                                    right: "out",
                                    top: "out",
                                },
                                speed: 6,
                                straight: true,
                            },
                            opacity: {
                                value: 0.5,
                                animation: {
                                    speed: 1,
                                    minimumValue: 0.1,
                                },
                            },
                            shape: {
                                options: {
                                    star: {
                                        sides: 5,
                                    },
                                },
                                type: "star",
                            },
                            size: {
                                random: {
                                    enable: true,
                                },
                                value: {
                                    min: 1,
                                    max: 4,
                                },
                                animation: {
                                    speed: 40,
                                    minimumValue: 0.1,
                                },
                            },
                        },
                    }}
                />
                );
                <Container>
                    <h1>
                        <span>{loading}</span>
                    </h1>
                </Container>
            </>
        );
    }
}

export default withRouter(WaitingRoom);
