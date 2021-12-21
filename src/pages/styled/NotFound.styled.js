import styled from "styled-components";

export const Container = styled.div`
    font-family: "Aeonik";
    padding: 0 50px 0 50px;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background-color: ${({ theme }) => theme.mainColors.lightBlue};

    h1 {
        margin: 0px;

        font-family: inherit;
        font-weight: medium;
        font-size: 4.25rem;
    }

    p {
        color: ${({ theme }) => theme.mainColors.grey};
        margin: 25px 0 45px 0;

        font-family: inherit;
        font-weight: normal;
        font-size: 1.5rem;
        text-align: center;
    }

    a {
        color: ${({ theme }) => theme.mainColors.darkBlue};
        text-decoration: none;
        font-size: 1.25rem;
        text-align: center;
    }
`;
