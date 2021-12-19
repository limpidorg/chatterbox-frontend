import React from "react";
import { Container } from "./styled/Cross.styled";

const Cross = ({ handleLeave }) => {
    return (
        <Container onClick={handleLeave}>
            <svg
                width="20"
                height="25"
                viewBox="0 0 33 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M23.8459 2.35223C20.7025 15.9258 12.4809 22.2089 3.71143 32.0745"
                    stroke="darkBlue"
                    strokeWidth="3"
                    strokeLinecap="square"
                />
                <path
                    d="M2.75269 10.9813C11.4194 17.3872 20.497 25.174 30.5574 29.1982"
                    stroke="darkBlue"
                    strokeWidth="3"
                    strokeLinecap="square"
                />
            </svg>
        </Container>
    );
};

export default Cross;
