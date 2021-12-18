import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: max-content;
    clear: both;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 100%;

    margin: 0 25px 0 25px;

    img {
        width: 40px;
        height: 40px;
        border-radius: 100px;
    }

    p {
        margin: 15px;
        padding: 10px;
        border-radius: 4px;
        width: max-content;
        word-break: break-word;
        line-break: loose;
        max-width: 50%;
        font-family: inherit;
        margin-left: auto;
        margin-right: auto;
    }
`;
