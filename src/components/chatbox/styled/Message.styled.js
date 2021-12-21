import styled from "styled-components";


export const Row = styled.div`
    position: relative;
    display: flex;
    flex-direction: ${props => props.self ? "row-reverse" : "row"};
    padding: 0px 1em 0px 1em;
    margin-top: 1em;

    img {
        width: 40px;
        height: 40px;
        border-radius: 100px;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 100px;
    }

    .message {
        padding: 10px;
        border-radius: 4px;
        width: fit-content;
        word-break: break-word;
        line-break: loose;
        max-width: 80%;
        font-family: inherit;
        text-align: left;
        margin-left: 1em;
        margin-right: 1em;
    }

    .message-self {
        background-color: rgba(148, 148, 148, 0.5);
    }

    .message-other {
        background-color: rgba(159, 197, 208, 0.5);
    }
`;
