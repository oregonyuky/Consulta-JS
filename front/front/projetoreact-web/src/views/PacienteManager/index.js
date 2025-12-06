import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import * as Styl from './styles';
import Footer from '../../components/Footer';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function PacientesManager()
{
    const navigate = useNavigate();
    const [listaPacientes, setListaPacientes] = useState([]);
    const [busca, setBusca] = useState('');
    const [qtdAtrasadas, setQtdAtrasadas] = useState(0);

    async function carregarPacientes()
    {
        await api.get('/paciente')
            .then(resp => setListaPacientes(resp.data))
            .catch(err => console.log("Erro ao carregar pacientes", err));
    }

    async function excluirPaciente(id)
    {
        if (window.confirm("Tem certeza que deseja excluir este paciente?"))
        {
            await api.delete(`/paciente/${id}`)
            .then(() =>
            {
                alert("Paciente excluído!");
                carregarPacientes();
            })
            .catch(err => alert(err.response?.data?.erro || "Erro ao excluir paciente"));
        }
    }

    useEffect(() =>
    {
        carregarPacientes();
    }, []);

    const pacientesFiltrados = listaPacientes.filter(p =>
        p.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <Styl.Container>
            <Header atrasadas={qtdAtrasadas} />

            <Styl.Area>

                <Styl.TopBar>
                    <input 
                        type="text" 
                        placeholder="Pesquisar paciente..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />

                    <button onClick={() => navigate('/pacientes/novo')}> Novo Paciente </button>
                </Styl.TopBar>

                <Styl.Lista>
                    {pacientesFiltrados.map(p => (
                        <Styl.Item 
                            key={p._id} 
                            onClick={() => navigate(`/pacientes/${p._id}`)}
                        >
                            <div className="nomeArea">
                                <strong>{p.nome}</strong>
                            </div>

                            <button 
                                className="excluir"
                                onClick={(e) =>
                                {
                                    e.stopPropagation();
                                    excluirPaciente(p._id);
                                }}
                            >
                                EXCLUIR
                            </button>
                        </Styl.Item>
                    ))}

                    {pacientesFiltrados.length === 0 && (<p>Nenhum paciente encontrado.</p>)}
                </Styl.Lista>
            </Styl.Area>

            <Footer />
        </Styl.Container>
    );
}

export default PacientesManager;