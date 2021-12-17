import styled from "styled-components";

export const Container = styled.div`
    font-family: "Aeonik";
    padding: 0 100px 0 100px;
    height: 100vh;

    display: flex;
    align-items: center;

    h1 {
        margin: 0px;

        font-family: inherit;
        font-weight: medium;
        font-size: 3.5rem;
        line-height: 70px;
    }

    p {
        color: #949494;
        margin: 25px 0 25px 0;

        font-family: inherit;
        font-weight: normal;
        font-size: 1rem;
    }
`;

export const Center = styled.div``;

export const FormField = styled.input`
    display: block;
    width: 100%;
    padding: 8px 16px;
    line-height: 25px;
    font-size: 1rem;
    font-weight: 500;
    font-family: inherit;
    border-radius: 6px;
    -webkit-appearance: none;
    color: #949494;
    border: 2px solid #9fc5d0;
    background: #ffff;
    transition: border 0.3s ease;

    &:focus {
        outline: none;
        border-color: #5b9cae;
    }

    &::placeholder {
        color: #949494;
    }
`;

export const FormGroup = styled.div`
    display: flex;
    width: 450px;

    & > span,
    .form-field {
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
        padding: 8px 12px;
        font-size: 1rem;
        line-height: 25px;
        color: #ffff;
        background: #9fc5d0;
        border: 2px solid transparent;
        transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
    }

    &:focus-within {
        & > span {
            background: #5b9cae;
            border-color: #5b9cae;
        }
    }
`;
