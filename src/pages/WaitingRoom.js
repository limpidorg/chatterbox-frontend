import React from "react";
import { withRouter } from "react-router";
import ParticleBackground from "../components/ParticleBackground";
import NyanCat from "../components/waiting-room/NyanCat";
import { Connection } from "../lib/apiconnect";
import { LoadingContainer } from "./styled/WaitingRoom.styled";

class WaitingRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: "Searching for your next adventure...",
            gifX: -85,
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
                    Connection.on("chat-request-cancelled", () => {
                        window.$alert.present(
                            "Request Cancelled",
                            "You cancelled the request to join a chat",
                            [
                                {
                                    title: "OK",
                                    type: "normal",
                                    handler: () => {
                                        // history.replace("/");
                                        window.location.href = "/";
                                    },
                                },
                            ]
                        );
                    });
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

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState((prevState) => {
                if (prevState.gifX >= -5) {
                    return {
                        gifX: -120,
                    };
                } else {
                    return {
                        gifX: prevState.gifX + 0.05,
                    };
                }
            });
        }, 1);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        Connection.off("chat-request-cancelled");
    }

    joinChat(chatId) {
        this.setState({
            loading: `We found it! It could be the beginning of a great adventure. Teleporting...`,
        });
        if (window.location.pathname !== "/waiting-room") {
            window.$alert.present(
                "We found a chat!",
                "You're not in the waiting room - do you want to teleport to the chat?",
                [
                    {
                        title: "No",
                        type: "cancel",
                    },
                    {
                        title: "Yes",
                        type: "normal",
                        handler: () => {
                            const { history } = this.props;
                            history.replace(`/chat/${chatId}`);
                        },
                    },
                ],
                {
                    defaultAction: 1,
                }
            );
            return;
        }
        const { history } = this.props;
        history.replace(`/chat/${chatId}`);
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
                            "The universe is huge but we're trying our best to find your CHATLING...",
                    });
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    render() {
        const { loading, gifX } = this.state;
        return (
            <>
                <ParticleBackground />

                <LoadingContainer>
                    <h1 className="title">{loading}</h1>
                    <NyanCat gifX={gifX} key={this.gifX} />
                    <div className="cancelContainer">
                        <h1
                            className="cancel"
                            role="none"
                            onClick={() => {
                                Connection.emit("cancel-chat-request");
                            }}
                        >
                            Cancel
                        </h1>
                    </div>
                </LoadingContainer>
            </>
        );
    }
}

export default withRouter(WaitingRoom);
