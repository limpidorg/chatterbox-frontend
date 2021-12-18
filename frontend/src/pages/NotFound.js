/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./styled/NotFound.styled";

const NotFound = () => {
    return (
        <Container>
            <h1>Oops!</h1>
            <p>We can't seem to find the page you're looking for...</p>

            <Link to="/">Come back to a safer place</Link>
        </Container>
    );
};

export default NotFound;
