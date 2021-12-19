/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router";
import { ActionBar, Box, Container, Content } from "./styled/Chatbox.styled";
import Message from "../components/chatbox/Message";
import Cross from "../components/chatbox/Cross";
import DrawingArea from "../components/DrawingArea";

const Chatbox = () => {
    const [message, setMessage] = useState("");

    const { id } = useParams();

    console.log(`The id of this room is ${id}`);

    const handleChange = (ev) => {
        setMessage(ev.target.value);
    };

    const handleSend = () => {
        console.log(message);
    };

    const handleLeave = () => {
        console.log("leaving");
    };

    const avatarPath = `${process.env.PUBLIC_URL}/images/avatar.png`;

    const conversation = [
        { author: "Jack", content: "Hello" },
        { author: "Tom", content: "Hi there" },
        { author: "Tom", content: "How are you doing" },
        { author: "Jack", content: "Bonsaï is the best frontend web dev" },
        { author: "Tom", content: "I agree" },
        { author: "Jack", content: "I agree" },
        { author: "Tom", content: "Hello, how are you doing" },
        { author: "Tom", content: "I agree" },
        { author: "Jack", content: "I agree" },
        { author: "Jack", content: "Hello, how are you doing" },
        { author: "Tom", content: "I agree" },
        { author: "Jack", content: "I agree" },
        { author: "Tom", content: "Hello, how are you doing" },
        { author: "Tom", content: "I agree" },
        { author: "Jack", content: "I agree" },
        { author: "Tom", content: "Hello, how are you doing" },
    ];

    const self = "Jack";

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
                                    key={el.content}
                                    self={el.author !== self}
                                    avatarPath={avatarPath}
                                >
                                    {el.content}
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
