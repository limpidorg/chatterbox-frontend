import React from "react";
import { Container, Row } from "./styled/Message.styled";

const Message = ({ isUser1, avatarPath, children }) => {
    return (
        <Container>
            <Row style={{ float: `${isUser1 ? "left" : "right"}` }}>
                {isUser1 && (
                    <>
                        <img src={avatarPath} alt="profile" />
                        <p
                            style={{
                                backgroundColor: "rgba(148, 148, 148, 0.5)",
                                marginLeft: "10px",
                                textAlign: "left",
                            }}
                        >
                            {children}
                        </p>
                    </>
                )}
                {!isUser1 && (
                    <>
                        <p
                            style={{
                                backgroundColor: "rgba(159, 197, 208, 0.5)",
                                marginRight: "10px",
                                textAlign: "right",
                            }}
                        >
                            {children}
                        </p>
                        <img src={avatarPath} alt="profile" />
                    </>
                )}
            </Row>
        </Container>
    );
};

export default Message;
