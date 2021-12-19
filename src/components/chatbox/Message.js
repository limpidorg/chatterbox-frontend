import React from "react";
import createDOMPurify from "dompurify";
import { Container, Row } from "./styled/Message.styled";

const Message = ({ self, avatar, children }) => {
    const DOMPurify = createDOMPurify(window);

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
                        <div
                            className="avatar"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(avatar),
                            }}
                        />
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
                        <div
                            className="avatar"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(avatar),
                            }}
                        />
                    </>
                )}
            </Row>
        </Container>
    );
};

export default Message;
