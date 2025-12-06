import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Form = styled.div`
    width: 50%;
    margin: 40px 0;
    display: flex;
    flex-direction: column;

    h2 {
        color: #22B14C;
        margin-bottom: 25px;
    }
`;

export const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    span {
        color: #707070;
        margin-bottom: 5px;
    }

    input, select {
        font-size: 16px;
        padding: 15px;
        border: none;
        border-bottom: 1px solid #22B14C;
        background: transparent;
    }
`;

export const BotaoSalvar = styled.div`
    margin-top: 25px;

    button {
        width: 100%;
        background: #22B14C;
        color: white;
        font-size: 20px;
        padding: 18px;
        border-radius: 25px;
        border: none;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
    }
`;