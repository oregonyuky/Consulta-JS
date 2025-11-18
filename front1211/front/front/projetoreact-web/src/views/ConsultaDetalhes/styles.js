import styled from 'styled-components'

//exportar uma constante container que vai receber 
//o styled como uma div

export const Container = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`



export const Formulario = styled.div `
    width: 50%;
    /*rolagem rodape*/
    margin-bottom: 70px;
`

export const TipoConsulta = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;

    .inativo{
        opacity: 0.5;
    }

    button{
        border: none;
        background: none;
    }

    img{
        width: 50px;
        height:50px;
        margin: 10px;
        cursor: pointer;

        &:hover{
            opacity: 0.5;
        }
    }
`



export const Input = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    margin:v20px 0;
     span{
        color: #707070;
        margin-bottom: 5px;
     }
    input{
        font-size: 16px;
        padding: 15px;
        border: none;
        boder-bottom: 1px solid #22B14C;
    }
`


export const TextArea = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    span{
        color: #707070;
        margin: 5px 0;
     }
    textarea{
        font-size: 16px;
        boder: 1px solid #22B14C;
    }
`


export const Opcao = styled.div `
    width: 100%;
    diplay: flex;
    justify-content: space-between;
    button{
        font-weight: bold;
        color: #22B14C;
        border: none;
        background: none;
        font-size: 18px;
        cursor: pointer;
        &:hover{
            opacity: 0.7;
        }
    }
    div{
        diplay:flex;
        align-items: center;
        color: #22B14C;
        font-weight: bold;
        font-size: 18px;
    }

`


export const Salvar = styled.div `
    width: 100%;
    margin-top: 20px;
    button{
        width: 100%;
        font-weight: bold;
        background: #22B14C;
        border-radius: 30px;
        font-size: 20px;
        padding: 20px;
        cursor: pointer;
        &:hover{
            opacity: 0.7;
        }
    }
    
`