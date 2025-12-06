import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import * as Styl from './styles'
import Footer from '../../components/Footer';
import FiltrarConsulta from '../../components/ConsultaFiltrar';
import ConsultaCartao from '../../components/ConsultaCartao';
import api from '../../services/api'
import {Link} from 'react-router-dom'

function Home() {
  
  const [atrasadas, atualizaAtrasadas] = useState()
  const [filtroConsulta, atualizarFiltroAtivo] = useState('hoje') 
  const [consulta, atualizaConsulta] = useState([])
  const [listaPacientes, setListaPacientes] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroPaciente, setFiltroPaciente] = useState('');

  async function verificaAtrasadas() {
    await api.get('/consulta/atrasadas')
    .then(resp=> atualizaAtrasadas(resp.data.length))
  }

  async function carregarPacientes(){
      await api.get('/paciente')
      .then(resp => {
          setListaPacientes(resp.data);
      })
      .catch(err => console.log("Erro ao carregar pacientes", err));
  }

  function getNomePaciente(id) {
      const encontrado = listaPacientes.find(p => p._id === id);
      return encontrado ? encontrado.nome : "Paciente não encontrado";
  }

  async function carregarConsulta() {
    
    const rota = filtroConsulta === 'todas' ? '' : `/${filtroConsulta}`;
    let queryParams = [];

    if (filtroTipo) {
      queryParams.push(`tipo=${filtroTipo}`);
    }

    if (filtroPaciente) {
      queryParams.push(`paciente_id=${filtroPaciente}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    await api.get(`/consulta${rota}${queryString}`)
    .then(response=>{
      atualizaConsulta(response.data)
    })
    .catch(err => console.log("Erro ao listar consultas:", err));
  }

  function notificacao(){
    atualizarFiltroAtivo('atrasadas')
  }

  useEffect(()=>{
    carregarPacientes(); 
    verificaAtrasadas();
    carregarConsulta();
  }, [filtroConsulta, filtroTipo, filtroPaciente]) 

  return  (
    <Styl.Container>
      <Header atrasadas = {atrasadas} noticacaoClick={notificacao}/>
        <Styl.AreaFiltro>
          <button type='button' onClick={()=>atualizarFiltroAtivo("todas")}>
              <FiltrarConsulta titulo="Todas" ativo={filtroConsulta==="todas"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("hoje")}>
              <FiltrarConsulta titulo="Hoje" ativo={filtroConsulta==="hoje"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("semana")}>
              <FiltrarConsulta titulo="Semana" ativo={filtroConsulta==="semana"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("mes")}>
              <FiltrarConsulta titulo="Mês" ativo={filtroConsulta==="mes"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("ano")}>
              <FiltrarConsulta titulo="Ano" ativo={filtroConsulta==="ano"}/>
          </button>
        </Styl.AreaFiltro>

        <Styl.Filtros>
          <div>
            <label htmlFor="tipo">Tipo de Consulta:</label>
            <select 
              id="tipo"
              value={filtroTipo} 
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              <option value="Normal">Normal</option>
              <option value="Retorno">Retorno</option>
              <option value="Urgência">Urgência</option>
              <option value="Cirurgia">Cirurgia</option>
            </select>
          </div>

          <div>
            <label htmlFor="paciente">Paciente:</label>
            <select 
              id="paciente"
              value={filtroPaciente} 
              onChange={(e) => setFiltroPaciente(e.target.value)}
            >
              <option value="">Todos os pacientes</option>
              {listaPacientes.map(p => (
                <option key={p._id} value={p._id}>{p.nome}</option>
              ))}
            </select>
          </div>
        </Styl.Filtros>

        <Styl.Titulo>
          <h3>Consultas</h3>
        </Styl.Titulo>
        <Styl.Cartao>
            {consulta.map(c=>(
              <Link to={`/formulario/${c._id}`} key={c._id}>
                  <ConsultaCartao 
                  tipo={c.tipo} 
                  paciente={getNomePaciente(c.paciente_id)} 
                  descrica={c.descricao || c.observacoes} 
                  data={c.data}/>
              </Link>
            ))
            }
        </Styl.Cartao>
      <Footer/>
    </Styl.Container>
  )
}

export default Home;