import styled from "styled-components";

export const Container = styled.div`
    font-family: "Aeonik";
    height: fit-content;
    min-height: 100vh;
    min-width: 100vw;
    max-width: 100vw;
    padding-left: 2em;
    padding-right: 2em;
    

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.mainColors.lightBlue};


    h1 {
        margin: 0px;

        font-family: inherit;
        font-weight: bold;
        font-size: 3.5rem;
        line-height: 60px;

        span {
            color: ${({ theme }) => theme.mainColors.darkBlue};
        }

        // @media screen and (min-width: 768px) and (max-width: 1174px) {
        //     font-size: 3.5rem;
        // }

        // @media screen and (max-width: 767px) {
        //     line-height: 60px;
        //     font-size: 2.25rem;
        // }

        // @media screen and (max-width: 900px) and (orientation: landscape) {
        //     line-height: 50px;
        //     font-size: 2.25rem;
        // }
    }

    p {
        color: ${({ theme }) => theme.mainColors.grey};
        margin: 25px 0 45px 0;

        font-family: inherit;
        font-weight: normal;
        font-size: 1.25rem;

        span {
            font-style: italic;
        }

        // @media screen and (min-width: 768px) and (max-width: 1174px) {
        //     font-size: 1rem;
        // }

        // @media screen and (max-width: 850px) and (orientation: landscape) {
        //     margin: 25px 0 25px 0;
        // }
    }

    .navigation {
        display: block;
        color: ${({ theme }) => theme.mainColors.darkBlue};
        text-decoration: underline;
        cursor: pointer;
    }
`;

// export const Centered = styled.div`
//     width: 100%;
//     display: flex;
//     justify-content: space-evenly;
//     align-items: center;

//     @media screen and (max-width: 1174px) {
//         flex-direction: column;
//     }
// `;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: row;

    .choices {
        margin: 0 25px 0 0;
        padding: 20px 30px 20px 30px;
        width: max-content;
        font-size: 1rem;
        color: white;
    }

    .inputs {
        display: flex;
        flex-direction: column;
    }

    button {
        margin-left: 15px;
        border-radius: 6px;
        border: none;
        width: 12%;

        // @media screen and (max-width: 767px) {
        //     width: 20%;
        // }

        background-color: ${({ theme }) => theme.mainColors.blue};

        i {
            font-size: 1.25rem;
            color: white;
        }
    }

    button:hover {
        background-color: ${({ theme }) => theme.mainColors.darkBlue};
        transition: background-color 0.3s;
    }
`;

export const FormGroup = styled.div`
    display: flex;
    width: 425px;
    // @media screen and (max-width: 767px) {
    //     width: 275px;
    // }

    & > span,
    .form-field {
        width: 25px;
        white-space: nowrap;
        display: block;
        &:not(:first-child):not(:last-child) {
            border-radius: 0;
        }
        &:first-child {
            border-radius: 6px 0 0 6px;
        }
        &:last-child {
            border-radius: 0 6px 6px 0;
        }
        &:not(:first-child) {
            margin-left: -1px;
        }
    }

    .form-field {
        position: relative;
        z-index: 1;
        flex: 1 1 auto;
        width: 1%;
        margin-top: 0;
        margin-bottom: 0;
    }

    & > span {
        text-align: center;
        padding: 12px 12px;
        font-size: 1.25rem;
        line-height: 25px;
        color: #ffff;
        background: ${({ theme }) => theme.mainColors.blue};
        border: 2px solid transparent;
        transition: background-color 0.3s ease, border 0.3s ease,
            color 0.3s ease;
    }

    &:focus-within {
        & > span {
            background: ${({ theme }) => theme.mainColors.darkBlue};
            border-color: ${({ theme }) => theme.mainColors.darkBlue};
        }
    }
`;

export const FormField = styled.input`
    display: block;
    width: 100%;
    padding: 8px 16px;
    line-height: 25px;
    font-size: 1.25rem;

    @media screen and (max-width: 767px) {
        font-size: 1rem;
    }

    font-weight: 500;
    font-family: inherit;
    border-radius: 6px;
    -webkit-appearance: none;
    color: ${({ theme }) => theme.mainColors.grey};
    border: 2px solid ${({ theme }) => theme.mainColors.blue};
    background: #ffff;
    transition: border 0.3s ease;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.mainColors.darkBlue};
    }

    &::placeholder {
        color: ${({ theme }) => theme.mainColors.grey};
    }
`;

export const Illustration = styled.img`
    height: 500px;

    @media screen and (max-width: 1280px) {
        display: none;
    }
`;
