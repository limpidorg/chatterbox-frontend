import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;

    font-family: "Orbitron";

    padding-top: 150px;

    h1 {
        position: relative;
        z-index: 10;
        margin: 0;
        font-family: inherit;
        font-weight: normal;
        font-size: 2.25rem;
        text-align: center;
        word-break: break-word;
        color: white;
    }

    @media screen and (max-width: 768px) {
        h1 {
            font-size: 1.75rem;
        }
    }
`;
