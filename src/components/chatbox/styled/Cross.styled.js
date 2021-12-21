import styled from "styled-components";

export const Container = styled.button`
    // position: absolute;
    // top: 40px;
    // right: 40px;

    border: none;
    background: none;
    outline: none;

    :focus {
        outline: none;
    }

    z-index: 10;

    @media screen and (max-width: 768px) {
        top: 40px;
        right: 20px;
    }
`;
