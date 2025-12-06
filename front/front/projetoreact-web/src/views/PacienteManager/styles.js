import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Area = styled.div`
    width: 60%;
    margin: 30px 0 80px 0;
`;

export const TopBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;

    input 
    {
        width: 80%;
        padding: 15px;
        font-size: 16px;
        border: none;
        border: 2px solid #22B14C;
        border-radius: 10px 0 0 10px;
        background: transparent;
    }

    button 
    {
        width: 20%;
        background: #22B14C;
        color: #FFF;
        font-size: 16px;
        font-weight: bold;
        border-radius: 0 10px 10px 0;
        border: none;
        cursor: pointer;
        padding: 12px;

        &:hover { opacity: 0.8; }
    }
`;

export const Lista = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    p
    {
        text-align: center;
        color: #707070;
        margin-top: 20px;
    }
`;

export const Item = styled.div`
    max-width: 100%;
    padding: 10px 18px;
    border: 1px solid #22B14C;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong { font-size: 18px; color: #22B14C; }

    span { color: #707070; }

    &:hover { background: #F1FFF3; }

    .excluir
    {
        background: #FF3B3B;
        border: none;
        font-weight: bold;
        color: white;
        padding: 10px 14px;
        border-radius: 8px;
        cursor: pointer;

        &:hover { opacity: 0.8; }
    }
`;