/* eslint-disable no-unused-vars */
import React from "react";
import { withRouter } from "react-router";
import multiavatar from "@multiavatar/multiavatar";
import { ActionBar, Box, Content } from "./styled/Chatbox.styled";
import { LoadingContainer } from "./styled/WaitingRoom.styled";
import Message from "../components/chatbox/Message";
import Cross from "../components/chatbox/Cross";
import DrawingArea from "../components/DrawingArea";
import { Connection } from "../lib/apiconnect";
import ParticleBackground from "../components/ParticleBackground";
import "./styled/chatbox.css"

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
            username: "Bonsai",
        };

        this.avatar1 = multiavatar(getRandomInt(1000));
        this.avatar2 = multiavatar(getRandomInt(1000));

        const { id } = this.state;

        Connection.resumeSession()
            .then(() => {
                Connection.getUsername().then((res) => {
                    this.setState({
                        username: res,
                    });
                });
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
            .then(() => { })
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
        const { message, loading, conversation, username } = this.state;

        return (
            <>
                {loading && (
                    <>
                        <ParticleBackground chatbox />
                        <LoadingContainer>
                            <h1>{loading}</h1>
                        </LoadingContainer>
                    </>
                )}
                {!loading && (
                    // Parent container - should be full screen
                    <div style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "100vh",
                        minWidth: "100vw",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        position: "relative",
                    }}>
                        <div style={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            textAlign: "center"
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                            }} className="chatbox-style">
                                <Box>
                                    <Content>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "100%",
                                            justifyContent: "center",
                                        }}>
                                            <h2>
                                                Chatting to: <span>{username}</span>
                                            </h2>

                                            <Cross
                                                handleLeave={() => {
                                                    this.handleLeave();
                                                }}
                                            />
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "100%",
                                            height: "100%",
                                            flexGrow: 1,
                                            overflowY: "auto",
                                            paddingTop: "1em",
                                            paddingBottom: "1em",
                                        }}>
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
                                                            el.sessionId ===
                                                            Connection.sessionId
                                                        }
                                                    // showAvatar
                                                    >
                                                        {el.message}
                                                    </Message>
                                                );
                                            })}
                                            <div
                                                ref={(el) => {
                                                    this.messagesEnd = el;
                                                }}
                                            />
                                        </div>


                                    </Content>
                                    <ActionBar>
                                        <input
                                            type="text"
                                            placeholder="Compose your message..."
                                            onChange={(ev) => {
                                                this.handleChange(ev);
                                            }}
                                            value={message}
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
                            </div>
                        </div>
                        <DrawingArea style={{
                            top: 0,
                            left: 0,
                            position: 'fixed'
                        }} />
                    </div>

                )}
            </>
        );
    }
}

export default withRouter(Chatbox);
