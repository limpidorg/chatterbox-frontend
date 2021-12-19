import React from "react";
import { withRouter } from "react-router";
import { Particles } from "react-tsparticles";
import multiavatar from "@multiavatar/multiavatar";
import {
    ActionBar,
    Box,
    Container,
    Content,
    LoadingContainer,
} from "./styled/Chatbox.styled";
import Message from "../components/chatbox/Message";
import Cross from "../components/chatbox/Cross";
import DrawingArea from "../components/DrawingArea";
import { Connection } from "../lib/apiconnect";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        this.state = {
            message: "",
            loading: "Connecting",
            id: match.params.id,
            conversation: [],
        };

        this.avatar1 = multiavatar(getRandomInt(1000));
        this.avatar2 = multiavatar(getRandomInt(1000));

        const { id } = this.state;

        Connection.resumeSession()
            .then(() => {
                Connection.joinChat(id)
                    .then((res) => {
                        this.setState(
                            {
                                loading: null,
                                conversation: res.conversations,
                            },
                            () => {
                                this.scrollToBottom(false);
                            }
                        );
                    })
                    .catch((e) => {
                        window.$alert.present(
                            "Could not join the chat",
                            e.message,
                            [
                                {
                                    title: "OK",
                                    type: "normal",
                                    handler: () => {
                                        this.setState({
                                            loading: e.message,
                                        });
                                        Connection.navigate("/");
                                    },
                                },
                            ]
                        );
                    });
                // Register for chat destoryed event
                Connection.on("chat-destroyed", (data) => {
                    if (data.chatId === id) {
                        window.$alert.present(
                            "The chat has been closed.",
                            "Either you or your chatling closed the chat.",
                            [
                                {
                                    title: "OK",
                                    type: "normal",
                                    handler: () => {
                                        Connection.navigate("/");
                                    },
                                },
                            ]
                        );
                    }
                });
                Connection.on("new-message", (data) => {
                    if (data.chatId === id) {
                        const messageIndex = this.getMessageIndex(
                            data.messageId
                        );
                        if (messageIndex === null) {
                            this.pushMessage(data.message).then(() => {
                                this.scrollToBottom();
                            });
                        }
                    }
                });
            })
            .catch(() => {
                window.$alert.present(
                    "The session is no longer active",
                    "Please start a new session."
                );
            });
    }

    handleChange(ev) {
        this.setState({
            message: ev.target.value,
        });
    }

    handleSend() {
        const { message, id } = this.state;
        if (message.trim() === "") {
            this.setState({
                message: "",
            });
            return;
        }
        Connection.sendMessage(id, message)
            .then(() => {})
            .catch((e) => {
                window.$alert.present("Could not send message", e.message, [
                    {
                        title: "OK",
                        type: "cancel",
                    },
                ]);
            });
        this.setState({
            message: "",
        });
    }

    handleLeave() {
        const { id } = this.state;
        window.$alert.present(
            "Do you want to end the chat?",
            "You won't be able to come back.",
            [
                {
                    title: "No",
                    type: "cancel",
                },
                {
                    title: "Yes",
                    type: "destructive",
                    handler: () => {
                        Connection.leaveChat(id)
                            .then(() => {
                                this.setState({
                                    loading: "Leaving",
                                });
                                Connection.navigate("/");
                            })
                            .catch((e) => {
                                window.$alert.present(
                                    "Could not leave the chat",
                                    e.message,
                                    [
                                        {
                                            title: "OK",
                                            type: "normal",
                                            handler: () => {
                                                Connection.navigate("/");
                                            },
                                        },
                                    ]
                                );
                            });
                    },
                },
            ]
        );
    }

    getMessageIndex(messageId) {
        const { conversation } = this.state;
        for (let i = 0; i < conversation.length; i++) {
            if (conversation[i].messageId === messageId) {
                return i;
            }
        }
        return null;
    }

    scrollToBottom(isSmooth = true) {
        if (this.messagesEnd) {
            this.messagesEnd.scrollIntoView(
                isSmooth ? { behavior: "smooth" } : {}
            );
        }
    }

    async pushMessage(newMessage) {
        return new Promise((resolve) => {
            const { conversation } = this.state;
            this.setState(
                {
                    conversation: [...conversation, newMessage],
                },
                () => {
                    resolve();
                }
            );
        });
    }

    render() {
        const { message, loading, conversation } = this.state;

        const date = new Date();

        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        return (
            <>
                <DrawingArea />
                {loading && (
                    <>
                        <Particles
                            id="tsparticles"
                            options={{
                                background: {
                                    color: {
                                        value: "#5b9cae",
                                    },
                                    position: "50% 50%",
                                    repeat: "no-repeat",
                                    size: "cover",
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
                                            enable: true,
                                            mode: "bubble",
                                        },
                                    },
                                    modes: {
                                        bubble: {
                                            distance: 400,
                                            duration: 0.3,
                                            opacity: 1,
                                            size: 5,
                                        },
                                        grab: {
                                            distance: 400,
                                            links: {
                                                opacity: 0.5,
                                            },
                                        },
                                    },
                                },
                                particles: {
                                    links: {
                                        color: {
                                            value: "#ffffff",
                                        },
                                        distance: 500,
                                        opacity: 0.4,
                                        width: 2,
                                    },
                                    move: {
                                        attract: {
                                            rotate: {
                                                x: 600,
                                                y: 1200,
                                            },
                                        },
                                        direction: "bottom",
                                        enable: true,
                                        outModes: {
                                            bottom: "out",
                                            left: "out",
                                            right: "out",
                                            top: "out",
                                        },
                                    },
                                    number: {
                                        density: {
                                            enable: true,
                                        },
                                        value: 200,
                                    },
                                    opacity: {
                                        random: {
                                            enable: true,
                                        },
                                        value: {
                                            min: 0.1,
                                            max: 0.5,
                                        },
                                        animation: {
                                            speed: 1,
                                            minimumValue: 0.1,
                                        },
                                    },
                                    size: {
                                        random: {
                                            enable: true,
                                        },
                                        value: {
                                            min: 1,
                                            max: 10,
                                        },
                                        animation: {
                                            speed: 40,
                                            minimumValue: 0.1,
                                        },
                                    },
                                },
                            }}
                        />
                        <LoadingContainer>
                            <h1 className="loading">{loading}</h1>
                        </LoadingContainer>
                    </>
                )}
                {!loading && (
                    <Container>
                        <Box>
                            <Content>
                                <Cross
                                    handleLeave={() => {
                                        this.handleLeave();
                                    }}
                                />
                                <h2>
                                    {days[date.getUTCDay()]},{" "}
                                    <span>
                                        {date.getUTCDate()}{" "}
                                        {months[date.getUTCMonth()]}
                                    </span>{" "}
                                    {date.getFullYear()}
                                </h2>
                                {conversation.map((el) => {
                                    return (
                                        <Message
                                            key={el.messageId}
                                            avatar={
                                                el.sessionId !==
                                                Connection.sessionId
                                                    ? this.avatar1
                                                    : this.avatar2
                                            }
                                            self={
                                                el.sessionId !==
                                                Connection.sessionId
                                            }
                                        >
                                            {el.message}
                                        </Message>
                                    );
                                })}
                                <div
                                    style={{ float: "left", clear: "both" }}
                                    ref={(el) => {
                                        this.messagesEnd = el;
                                    }}
                                />
                            </Content>
                            <ActionBar>
                                <input
                                    type="text"
                                    placeholder="Compose your message..."
                                    onChange={(ev) => {
                                        this.handleChange(ev);
                                    }}
                                    value={message}
                                    maxLength={70}
                                    onKeyDown={(ev) => {
                                        if (ev.key === "Enter") {
                                            this.handleSend();
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        this.handleSend();
                                    }}
                                >
                                    Send
                                </button>
                            </ActionBar>
                        </Box>
                    </Container>
                )}
            </>
        );
    }
}

export default withRouter(Chatbox);
