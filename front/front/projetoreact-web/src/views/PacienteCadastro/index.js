import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as Styl from './styles';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function PacienteCadastro()
{
    const navigate = useNavigate();

    const [prontuario, setProntuario] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [vinculo, setVinculo] = useState('');

    async function salvar()
    {
        if(!prontuario || !nome || !cpf || !nascimento || !vinculo){
            return alert("Preencha todos os campos obrigatórios!");
        }

        const corpo = {
            prontuario,
            nome,
            cpf,
            nascimento,
            telefone,
            endereco,
            vinculo
        };

        await api.post('/paciente', corpo)
            .then(() => {
                alert("Paciente cadastrado!");
                navigate('/pacientes');
            })
            .catch(err => alert(err.response?.data?.erro || "Erro ao cadastrar"));
    }

    return (
        <Styl.Container>
            <Header />

            <Styl.Form>
                <h2>Novo Paciente</h2>

                <Styl.InputBox>
                    <span>Prontuário *</span>
                    <input value={prontuario} onChange={e => setProntuario(e.target.value)} />
                </Styl.InputBox>

                <Styl.InputBox>
                    <span>Nome *</span>
                    <input value={nome} onChange={e => setNome(e.target.value)} />
                </Styl.InputBox>

                <Styl.InputBox>
                    <span>CPF *</span>
                    <input value={cpf} onChange={e => setCpf(e.target.value)} />
                </Styl.InputBox>

                <Styl.InputBox>
                    <span>Data de Nascimento *</span>
                    <input type="date" value={nascimento} onChange={e => setNascimento(e.target.value)} />
                </Styl.InputBox>

                <Styl.InputBox>
                    <span>Telefone</span>
                    <input value={telefone} onChange={e => setTelefone(e.target.value)} />
                </Styl.InputBox>

                <Styl.InputBox>
                    <span>Endereço</span>
                    <input value={endereco} onChange={e => setEndereco(e.target.value)} />
                </Styl.InputBox>

                <Styl.InputBox>
                    <span>Vínculo *</span>
                    <select value={vinculo} onChange={e => setVinculo(e.target.value)}>
                        <option value="">Selecione...</option>
                        <option>Plano de Saúde</option>
                        <option>Particular</option>
                    </select>
                </Styl.InputBox>

                <Styl.BotaoSalvar>
                    <button onClick={salvar}>SALVAR</button>
                </Styl.BotaoSalvar>
            </Styl.Form>

            <Footer />
        </Styl.Container>
    );
}

export default PacienteCadastro;