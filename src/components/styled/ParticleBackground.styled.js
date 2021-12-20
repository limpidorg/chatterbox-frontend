import styled from "styled-components";

export const GifContainer = styled.div`
    position: absolute;
    top: 25%;
    width: 100%;
    z-index: 10;

    @media screen and (max-width: 768px) {
        top: 50%;
        width: 135%;
    }

    img {
        width: 100%;
        z-index: 10;
        padding: 0;
        margin: 0;
    }
`;
