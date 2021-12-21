import React from "react";
import createDOMPurify from "dompurify";
import { Row } from "./styled/Message.styled";

const Message = ({ self, avatar, children }) => {
    const DOMPurify = createDOMPurify(window);

    return (
        <Row self={self}>
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <div
                    className="avatar"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(avatar),
                    }}
                />
            </div>
            <div style={{
                display: "flex",
                flexDirection: self ? "row-reverse" : "row",
                flexGrow: 1,
            }}>
                <div
                    className={`message ${self ? "message-self" : "message-other"}`}
                >
                    {children}
                </div>
            </div>

        </Row>
    );
};

export default Message;
