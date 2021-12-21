import styled from "styled-components";

export const GifContainer = styled.div`
    position: relative;
    z-index: 10;

    img {
        width: 100%;

        @media screen and (max-width: 768px) {
            width: 150%;
        }
        z-index: 10;
        padding: 0;
        margin: 0;
    }
`;
