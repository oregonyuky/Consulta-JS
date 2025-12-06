import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as Styl from './styles';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function PacienteEditar()
{
    const navigate = useNavigate();
    const { id } = useParams();

    const [prontuario, setProntuario] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [vinculo, setVinculo] = useState('');
    const [qtdAtrasadas, setQtdAtrasadas] = useState(0);

    async function carregar()
    {
        await api.get(`/paciente/${id}`)
            .then(resp =>
            {
                const p = resp.data
                setProntuario(p.prontuario);
                setNome(p.nome);
                setCpf(p.cpf);
                setNascimento(p.nascimento.substring(0, 10));
                setTelefone(p.telefone);
                setEndereco(p.endereco);
                setVinculo(p.vinculo);
            })
            .catch(err => alert("Erro ao carregar paciente"));
    }

    async function salvar()
    {
        const corpo = 
        {
            prontuario, nome, cpf,
            nascimento, telefone,
            endereco, vinculo
        };

        await api.put(`/paciente/${id}`, corpo)
            .then(() =>
            {
                alert("Paciente atualizado!");
                navigate('/pacientes');
            })
            .catch(err =>
                alert(err.response?.data?.erro || "Erro ao atualizar")
            );
    }

    useEffect(() => 
    {
        carregar();
    }, []);

    return (
        <Styl.Container>
            <Header atrasadas={qtdAtrasadas} />

            <Styl.Form>
                <h2>Editar Paciente</h2>

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
                        <option>Plano de Saúde</option>
                        <option>Particular</option>
                    </select>
                </Styl.InputBox>

                <Styl.Acoes>
                    <button className="salvar" onClick={salvar}>SALVAR</button>
                </Styl.Acoes>
            </Styl.Form>

            <Footer />
        </Styl.Container>
    );
}

export default PacienteEditar;