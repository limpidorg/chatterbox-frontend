import React from "react";
import { Container, Row } from "./styled/Message.styled";

const Message = ({ self, avatarPath, avatar, children }) => {
    return (
        <Container>
            <Row
                style={{
                    float: `${self ? "left" : "right"}`,
                    justifyContent: `${self ? "left" : "right"}`,
                }}
            >
                {self && (
                    <>
                        <div className="avatar">{avatar}</div>
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
                {!self && (
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
