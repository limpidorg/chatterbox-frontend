import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;

    background-color: ${({ theme }) => theme.mainColors.lightBlue};
`;

export const Box = styled.div`
    height: 85%;
    width: 40%;

    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    position: relative;
    z-index: 1;
    background: inherit;
    overflow: hidden;

    :before {
        content: "";
        position: absolute;
        background: inherit;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: inset 0 0 1000px rgba(255, 255, 255, 0.25);
        filter: blur(10px);
        margin: -20px;
    }

    @media screen and (min-width: 768px) and (max-width: 1174px) {
        height: 75%;
        width: 70%;
    }

    @media screen and (max-width: 767px) {
        height: 75%;
        width: 90%;
    }
`;

export const Content = styled.div`
    height: 90%;
    width: 100%;

    display: block;
`;

export const ActionBar = styled.div`
    height: 10%;
    background-color: blue;
`;
