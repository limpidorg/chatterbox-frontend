import styled from "styled-components";

export const Container = styled.div`
    font-family: "Aeonik";

    position: relative;
    width: 100%;
    height: 100%;


    background-color: ${({ theme }) => theme.mainColors.lightBlue};

    overflow-y: scroll;


`;

export const Box = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100vw;
    display: flex;
    flex-direction: column;

    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    position: relative;
    z-index: 1;
    flex-grow: 1
    background: inherit;
    overflow: hidden;
`;

export const Content = styled.div`
    height: 100%;
    width: 100%;
    max-width: 100%;
    position: relative;
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
        display: inline-block;
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
    position: relative;
    width: 100%;
    height: 50px;

    @media screen and (max-width: 768px) {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 50px;
    }

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-top: 3px solid ${({ theme }) => theme.mainColors.grey};

    input {
        text-align: 
        width: 100%;
        z-index: 100;
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
        margin: 0;
        border: none;
        background: none;
        font-family: inherit;
        font-size: 1rem;
    }
`;
