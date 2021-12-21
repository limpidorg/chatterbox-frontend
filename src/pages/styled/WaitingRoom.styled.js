import styled from "styled-components";

export const LoadingContainer = styled.div`
    height: 100vh;

    font-family: "Orbitron";

    padding: 150px 15px 0 15px;

    h1 {
        position: relative;
        z-index: 10;
        margin: 0 0 0 15px;
        font-family: inherit;
        font-weight: normal;
        font-size: 2.25rem;
        text-align: center;
        word-break: break-word;
        color: white;
    }

    .cancel {
        border: 2px solid white;
        border-radius: 10px;
        width: fit-content;
        padding: 10px 20px 10px 20px;
    }

    .cancelContainer {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 768px) {
        h1 {
            font-size: 1.75rem;
        }
    }
`;
