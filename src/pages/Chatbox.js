/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Particles } from "react-tsparticles";
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

const Chatbox = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState("Connecting...");

    const { id } = useParams();
    const { history } = useHistory();
    console.log(history);

    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        // Init - Join chat
        Connection.joinChat(id).then((res) => {
            setConversation(res.conversations);
        }).catch((e) => {
            window.$alert.present("Could not join the chat", e.message, [
                {
                    title: "OK",
                    type: "normal",
                    handler: () => {
                        Connection.navigate("/")
                    }
                }
            ]);
        })
        // Register for chat destoryed event
        Connection.on('chat-destroyed', (data) => {
            if (data.chatId === id) {
                window.$alert.present('The chat has been closed.', 'Either you or your chatling closed the chat.', [
                    {
                        title: 'OK',
                        type: 'normal',
                        handler: () => {
                            Connection.navigate('/')
                        }
                    }
                ])

            }
        })
    }, []);

    console.log(`The id of this room is ${id}`);

    const handleChange = (ev) => {
        setMessage(ev.target.value);
    };

    const handleSend = () => {
        console.log(message);
    };

    const handleLeave = () => {
        window.$alert.present("Do you want to end the chat?", "You won't be able to come back.", [
            {
                title: "No",
                type: "cancel"
            }, {
                title: "Yes",
                type: "destructive",
                handler: () => {
                    Connection.leaveChat(id).then(() => {
                        setLoading("Leaving...");
                        Connection.navigate("/");
                    }).catch((e) => {
                        window.$alert.present("Could not leave the chat", e.message, [
                            {
                                title: "OK",
                                type: "normal",
                                handler: () => {
                                    Connection.navigate("/")
                                }
                            }
                        ]);
                    })
                }
            }
        ])
    };

    const avatarPath = `${process.env.PUBLIC_URL}/images/avatar.png`;

    const date = new Date();

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
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
                            <Cross handleLeave={handleLeave} />
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
                                        self={
                                            el.sessionId !==
                                            Connection.sessionId
                                        }
                                    >
                                        {el.message}
                                    </Message>
                                );
                            })}
                        </Content>
                        <ActionBar>
                            <input
                                type="text"
                                placeholder="Compose your message..."
                                onChange={handleChange}
                                value={message}
                                onKeyDown={(ev) => {
                                    if (ev.key === "Enter") {
                                        handleSend();
                                    }
                                }}
                            />
                            <button type="button" onClick={handleSend}>
                                Send
                            </button>
                        </ActionBar>
                    </Box>
                </Container>
            )}
        </>
    );
};

export default Chatbox;
