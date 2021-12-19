import styled from "styled-components";

export const LoadingContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        z-index: 10;
        color: white;
        font-family: "Aeonik";
        font-size: 3rem;
        font-weight: normal;
        text-align: center;
    }
`;

export const Container = styled.div`
    font-family: "Aeonik";

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 100vh;

    background-color: ${({ theme }) => theme.mainColors.lightBlue};

    overflow-y: scroll;
`;

export const Box = styled.div`
    height: 85%;
    width: 40%;

    @media screen and (min-width: 1175px) and (max-width: 1500px) {
        width: 50%;
        height: 70%;
    }

    @media screen and (min-width: 768px) and (max-width: 1174px) {
        width: 70%;
        height: 80%;
    }

    @media screen and (max-width: 767px) {
        height: 100%;
        width: 100%;
    }

    display: table;

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
`;

export const Content = styled.div`
    height: calc(100vh - 50px - 125px);

    @media screen and (max-width: 768px) {
        height: calc(100vh - 20px - 100px);
    }

    @media screen and (min-width: 768px) and (max-width: 1174px) {
        height: calc(100vh - 50px - 225px);
    }

    @media screen and (min-width: 1175px) and (max-width: 1500px) {
        height: calc(100vh - 50px - 250px);
    }

    width: 100%;

    display: block;
    overflow-y: scroll;
    overflow-x: hidden;

    padding: 25px 0 25px 0;

    /* width */
    ::-webkit-scrollbar {
        width: 0px; // disabled it
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.mainColors.lightBlue};
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.mainColors.grey};
    }

    h2 {
        font-family: inherit;
        font-weight: normal;
        font-size: 1.5rem;
        text-align: center;
    }

    span {
        position: relative;
    }

    span:before {
        content: "";
        z-index: -1;
        left: 0em;
        top: 0em;
        border-width: 2px;
        border-style: solid;
        border-color: darkblue;
        position: absolute;
        border-right-color: transparent;
        width: 100%;
        height: 1em;
        transform: rotate(2deg);
        opacity: 0.5;
        border-radius: 0.25em;
    }

    span:after {
        content: "";
        z-index: -1;
        left: 0em;
        top: 0em;
        border-width: 2px;
        border-style: solid;
        border-color: darkblue;
        border-left-color: transparent;
        border-top-color: transparent;
        position: absolute;
        width: 100%;
        height: 1em;
        transform: rotate(-1deg);
        opacity: 0.5;
        border-radius: 0.25em;
    }
`;

export const ActionBar = styled.div`
    height: 50px;

    @media screen and (max-width: 768px) {
        height: 50px;
    }

    display: table-row;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-top: 3px solid ${({ theme }) => theme.mainColors.grey};

    input {
        color: ${({ theme }) => theme.mainColors.grey};
        width: 80%;
        padding: 0 0 0 25px;
    }

    input:focus {
        outline: none;
    }

    button {
        width: 20%;
        text-align: right;
        padding: 0 25px 0 25px;
        color: ${({ theme }) => theme.mainColors.darkBlue};
        font-weight: medium;
    }

    button,
    input {
        border: none;
        background: none;
        font-family: inherit;
        font-size: 1rem;
    }
`;
