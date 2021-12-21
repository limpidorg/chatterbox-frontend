import styled from "styled-components";

export const LoadingContainer = styled.div`
    height: 80vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-family: "Orbitron";

    padding: 100px 15px 0 15px;

    .title {
        position: relative;
        z-index: 10;
        margin: 0 0 20px 0;
        font-family: inherit;
        font-weight: normal;
        font-size: 2.25rem;
        text-align: center;
        word-break: break-word;
        color: white;
    }

    .cancel {
        z-index: 15;
        border: 2px solid white;
        border-radius: 10px;
        width: fit-content;
        padding: 10px 20px 10px 20px;
        color: white;
        cursor: pointer;
    }

    .cancelContainer {
        position: relative;
        width: 100%;
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
