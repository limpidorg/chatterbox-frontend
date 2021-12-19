/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom"
import { ActionBar, Box, Container, Content } from "./styled/Chatbox.styled";
import Message from "../components/chatbox/Message";
import Cross from "../components/chatbox/Cross";
import DrawingArea from "../components/DrawingArea";
import { Connection } from "../lib/apiconnect";

const Chatbox = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState("Connecting...");

    const { id } = useParams();
    const { history } = useHistory();
    console.log(history)

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
            <Container>
                <Box>
                    <Content>
                        <Cross handleLeave={handleLeave} />
                        <h2>
                            {days[date.getUTCDay()]},{" "}
                            <span>
                                {date.getUTCDate()} {months[date.getUTCMonth()]}
                            </span>{" "}
                            {date.getFullYear()}
                        </h2>
                        {conversation.map((el) => {
                            return (
                                <Message
                                    key={el.messageId}
                                    self={el.sessionId !== Connection.sessionId}
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
        </>
    );
};

export default Chatbox;
