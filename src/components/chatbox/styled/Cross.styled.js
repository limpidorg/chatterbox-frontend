import styled from "styled-components";

export const Container = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;

    border: none;
    background: none;
    outline: none;

    :focus {
        outline: none;
    }

    z-index: 10;

    @media screen and (max-width: 768px) {
        top: 10px;
        right: 10px;
    }
`;
