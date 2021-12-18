/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import React from "react";
import { ActionBar, Box, Container, Content } from "./styled/Chatbox.styled";
import Message from "../components/chatbox/Message";

const Chatbox = () => {
    // disable portrait phones

    const avatarPath = `${process.env.PUBLIC_URL}/images/avatar.png`;

    const conversation = [
        { author: "Jack", content: "Hello" },
        { author: "Tom", content: "Hi there" },
        { author: "Tom", content: "How are you doing" },
        { author: "Jack", content: "Bonsaï is the best frontend web dev" },
        { author: "Tom", content: "I agree" },
        { author: "Tom", content: "I agree" },
        { author: "Tom", content: "Hello, how are you doing"},
    ];

    const self = "Jack";

    return (
        <Container>
            <Box>
                <Content>
                    {conversation.map((el) => {
                        return (
                            <Message
                                key={el.content}
                                isUser1={el.author !== "Jack"}
                                avatarPath={avatarPath}
                            >
                                {el.content}
                            </Message>
                        );
                    })}
                </Content>
                <ActionBar>him actionbar</ActionBar>
            </Box>
        </Container>
    );
};

export default Chatbox;
