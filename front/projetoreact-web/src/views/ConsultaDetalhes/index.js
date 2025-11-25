import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import * as Styl from './styles'
import Footer from '../../components/Footer'
import api from '../../services/api'
import TipoIcones from '../../utils/tipoIcone'

function Detalhes() {
    const [atrasadas, atualizaAtrasadas] = useState()
    const [tipo, atualizarTipo] = useState()
    async function verificaAtrasadas() {
        await api.get(`/consulta/atrasadas`)
        .then(resp=>{
        //quantidade de consultas atrasadas
        atualizaAtrasadas(resp.data.length)
        }) 
    }
    //useEffect -- > atualizar a página quando carregar o estado
    useEffect(()=>{
    verificaAtrasadas()
    })
    return  (
        <Styl.Container>
            <Header atrasadas={atrasadas} />
                <Styl.Formulario>
                    <Styl.TipoConsulta>
                        {
                            TipoIcones.map((icone,index)=>(
                                index>0 &&
                                <button type='button' onClick={()=> atualizarTipo(index)}>
                                     <img src={icone} alt='Tipo consulta'
                                     className={tipo && tipo != index && 'inativo'}/>
                                </button>
                            ))
                        }
                    </Styl.TipoConsulta>
                        <Styl.Input>
                            <span>Paciente</span>
                            <input type='text' placeholder='Nome do paciente'/>
                        </Styl.Input>
                        <Styl.TextArea>
                            <span>Descricao</span>
                            <textarea rows={5} placeholder='Descrição da consulta'/>
                        </Styl.TextArea>
                        <Styl.Input>
                            <span>Data</span>
                            <input type='date' />
                        </Styl.Input>
                        <Styl.Input>
                            <span>Hora</span>
                            <input type='time' />
                        </Styl.Input>
                        <Styl.Opcao>
                            <div>
                                <input type='checkbox'/>
                                <span>CONCLUÍDA</span>
                            </div>
                            <button type='button'>EXCLUIR</button>
                        </Styl.Opcao>
                        <Styl.Salvar>
                            <button type='button'>SALVAR</button>
                        </Styl.Salvar>
                </Styl.Formulario>
            <Footer/>
        </Styl.Container>
    )
}
export default Detalhes;
