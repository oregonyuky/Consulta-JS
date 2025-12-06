import styled from 'styled-components'


export const Container = styled.div `
    width: 100%;
`

export const AreaFiltro = styled.div `
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
    margin-top: 30px;

    button{
    
        background: none;
        border: none;
    }
`

export const Filtros = styled.div `
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 5px;

    div {
        display: flex;
        flex-direction: column;
        min-width: 200px;

        label {
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
            font-size: 14px;
        }

        select {
            padding: 10px;
            border: 2px solid #22B14C;
            border-radius: 5px;
            font-size: 14px;
            background-color: white;
            cursor: pointer;
            transition: border-color 0.3s;

            &:hover {
                border-color: #1a8a38;
            }

            &:focus {
                outline: none;
                border-color: #1a8a38;
                box-shadow: 0 0 5px rgba(34, 177, 76, 0.3);
            }
        }
    }
`

export const Cartao = styled.div `
    width: 100%;
    display:flex;
    flex-wrap:wrap;
    justify-content:center;

`
export const Titulo = styled.div `

    width: 100%;
    border-bottom: 1px solid #22B14C;
    display:flex;
    justify-content:center;
    margin:20px;

    h3{
        color: #22B14C;
        position:relative;
        top: 30px;
        background: #FFF;
        padding: 0 20px;
    }

`