import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import * as Styl from './styles';
import Footer from '../../components/Footer';
import api from '../../services/api';
import tipoIcones from '../../utils/tipoIcones';
import { useParams, useNavigate } from 'react-router-dom';
import {format} from 'date-fns'

function ConsultaDetalhes() {
    const navigate = useNavigate();
    const {idC} = useParams()

    const [atrasadas, atualizaAtrasadas] = useState()
    
    const [tipo , atualizaTipo] = useState('Normal'); 
    const [paciente, atualizaPaciente] = useState(''); 
    const [descricao, atualizaDescricao] = useState();
    const [dia, atualizaDia] = useState();
    const [hora, atualizaHora] = useState();
    const [concluida, atualizaConcluida] = useState(false);
    const [listaPacientes, setListaPacientes] = useState([]);
    const [listaConsultasAnteriores, setListaConsultasAnteriores] = useState([]);
    const [consultaOriginal, atualizaConsultaOriginal] = useState('');

    async function carregarPacientes(){
        await api.get('/paciente')
        .then(resp => {
            setListaPacientes(resp.data);
        })
        .catch(err => console.log("Erro ao carregar pacientes", err));
    }

    async function carregarHistoricoPaciente(idPaciente) {
        if(!idPaciente) return;
        
        await api.get(`/consulta?paciente_id=${idPaciente}`)
        .then(resp => {
            const outras = resp.data.filter(c => c._id !== idC);
            setListaConsultasAnteriores(outras);
        })
        .catch(err => console.log("Erro ao carregar histórico", err));
    }

    async function carregarConsulta(){
        if(idC){
            await api.get(`/consulta/${idC}`)
                .then(resp => {
                    atualizaTipo(resp.data.tipo) 
                    atualizaPaciente(resp.data.paciente_id) 
                    atualizaDescricao(resp.data.observacoes || resp.data.descricao)
                    atualizaDia(format(new Date(resp.data.data), 'yyyy-MM-dd'))
                    atualizaHora(format(new Date(resp.data.data), 'HH:mm'))
                    atualizaConcluida(resp.data.termino || false) 
                    
                    if(resp.data.con_original_id) atualizaConsultaOriginal(resp.data.con_original_id)
                })
        }
    }

    async function verificaAtrasadas() {
        await api.get('/consulta/atrasadas')
        .then(resp => atualizaAtrasadas(resp.data.length))
    }

    async function salvar(){
        if(!paciente || !descricao || !dia || !hora) {
            return alert("Preencha todos os campos obrigatórios!");
        }

        const corpoRequisicao = {
            tipo: tipo,
            paciente_id: paciente,
            descricao: descricao,
            observacoes: descricao,
            data: `${dia}T${hora}:00.000`,
        
            consulta_original_id: tipo === 'Retorno' ? consultaOriginal : null, 
            termino: concluida 
        };

        if(idC) {
            await api.put(`/consulta/${idC}`, corpoRequisicao)
            .then(() => {
                alert("Consulta atualizada com sucesso!");
                navigate('/');
            })
            .catch(err => alert(err.response?.data?.erro || "Erro ao atualizar"));
        } else {
            await api.post('/consulta', corpoRequisicao)
            .then(() => {
                alert("Consulta cadastrada com sucesso!");
                navigate('/');
            })
            .catch(err => alert(err.response?.data?.erro || "Erro ao cadastrar"));
        }
    }

    async function excluir(){
        const confirmar = window.confirm("Deseja realmente excluir esta consulta?");
        if(confirmar && idC){
            await api.delete(`/consulta/${idC}`)
            .then(() => {
                alert("Consulta excluída!");
                navigate('/');
            })
            .catch(err => alert("Erro ao excluir"));
        }
    }

    useEffect(() => {
        if(paciente) {
            carregarHistoricoPaciente(paciente);
        }
    }, [paciente]);

    useEffect(()=>{
        carregarPacientes(); 
        carregarConsulta();
        verificaAtrasadas();
    }, [])

    return  (
        <Styl.Container>
            <Header atrasadas={atrasadas} />
                <Styl.Formulario>
                    <Styl.TipoIcones>
                        {   
                            Object.keys(tipoIcones).map((nomeTipo) => (
                                    <button 
                                        type='button' 
                                        onClick={() => !idC && atualizaTipo(nomeTipo)} 
                                        key={nomeTipo}
                                        style={idC ? {cursor: 'not-allowed', opacity: tipo === nomeTipo ? 1 : 0.3} : {}}
                                    >
                                        <img src={tipoIcones[nomeTipo]} alt={nomeTipo}
                                        className={tipo !== nomeTipo ? 'inativa' : ''}/>
                                        <div style={{textAlign: 'center', color: '#22B14C', fontWeight: 'bold'}}>
                                            {nomeTipo}
                                        </div>
                                    </button>
                            ))
                        }
                    </Styl.TipoIcones>

                    <Styl.Input>
                        <span>Paciente</span>    
                        <select onChange={e => atualizaPaciente(e.target.value)} value={paciente}>
                            <option value="">Selecione um Paciente...</option>
                            {listaPacientes.map(p => (
                                <option key={p._id} value={p._id}>{p.nome}</option>
                            ))}
                        </select>
                    </Styl.Input>

                    {tipo === 'Retorno' && (
                        <Styl.Input>
                            <span>Consulta Original (Para validar data)</span>    
                            <select onChange={e => atualizaConsultaOriginal(e.target.value)} value={consultaOriginal}>
                                <option value="">Selecione a consulta anterior...</option>
                                {listaConsultasAnteriores.map(c => (
                                    <option key={c._id} value={c._id}>
                                        {/* Mostra Data e Descrição para ajudar a escolher */}
                                        {format(new Date(c.data), 'dd/MM/yyyy')} - {c.tipo} - {c.descricao || c.observacoes}
                                    </option>
                                ))}
                            </select>
                        </Styl.Input>
                    )}
                    
                    <Styl.TextArea>
                        <span>Descrição</span>    
                        <textarea rows={5} placeholder='Detalhes da consulta'
                        onChange={e => atualizaDescricao(e.target.value)} value={descricao || ''}/>
                    </Styl.TextArea>

                    <Styl.Input>
                        <span>Data</span>    
                        <input type='date'
                        onChange={e => atualizaDia(e.target.value)} value={dia || ''}/>
                    </Styl.Input>

                    <Styl.Input>
                        <span>Hora</span>    
                        <input type='time'
                        onChange={e => atualizaHora(e.target.value)} value={hora || ''}/>
                    </Styl.Input>

                    <Styl.Opcao>
                        <div>
                            <input type='checkbox'
                            checked={concluida}
                            onChange={() => atualizaConcluida(!concluida)}/>
                            <span>CONCLUÍDA</span>
                        </div>
                        {idC && <button type='button' onClick={excluir}>EXCLUIR</button>}
                    </Styl.Opcao>

                    <Styl.Salvar>
                        <button type='button' onClick={salvar}>SALVAR</button>
                    </Styl.Salvar>

                </Styl.Formulario>
            <Footer/>
        </Styl.Container>
    )
}

export default ConsultaDetalhes;