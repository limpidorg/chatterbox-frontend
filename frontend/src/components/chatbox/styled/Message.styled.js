import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: max-content;
    clear: both;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin: 0 15px 0 15px;

    img {
        width: 40px;
        height: 40px;
        border-radius: 100px;
    }

    p {
        margin: 15px;
        padding: 10px;
        border-radius: 4px;
        max-width: 60%;
    }
`;
