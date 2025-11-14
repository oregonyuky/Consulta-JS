//importar o react que traz todos os recursos dele
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import * as Styl from './styles'
import Footer from '../../components/Footer';
import FiltrarConsulta from '../../components/ConsultaFiltrar';
import ConsultaCartao from '../../components/ConsultaCartao';
import api from '../../services/api'


function Home() {
  
  





//constante (vetor) que irá armazenar o estado da prop ativo
//vetor - 2 parâmetros
//1º nome do estado
//2º função que atualiza o estado
//vamos utilizar o useState para que todas as vezes que o usuário cliar 
//na caixa de filtro, a função (atualizarFiltroAtivo) irá armazenar 
//o estado atual do filtro

const [filtroConsulta, atualizarFiltroAtivo] = useState('hoje')
  

//o useState irá guardar uma coleção de informações [] --> dados do banco
const [consulta, atualizaConsulta] = useState([])

async function carregarConsulta() {
  await api.get(`/consulta/${filtroConsulta}`)
  .then(response=>{
    atualizaConsulta(response.data)
    console.log(response.data)
  })
}

//useEffect -- > atualizar a página quando carregar o estado
useEffect(()=>{
  carregarConsulta()
}, [filtroConsulta])


  return  (
    <Styl.Container>
      <Header/>
        <Styl.AreaFiltro>
          <button type='button' onClick={()=>atualizarFiltroAtivo("todas")}>
              <FiltrarConsulta titulo="Todas" ativo={filtroConsulta=="todas"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("hoje")}>
              <FiltrarConsulta titulo="Hoje" ativo={filtroConsulta=="hoje"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("semana")}>
              <FiltrarConsulta titulo="Semana" ativo={filtroConsulta=="semana"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("mes")}>
              <FiltrarConsulta titulo="Mês" ativo={filtroConsulta=="mes"}/>
          </button>
          <button type='button' onClick={()=>atualizarFiltroAtivo("ano")}>
              <FiltrarConsulta titulo="Ano" ativo={filtroConsulta=="ano"}/>
          </button>
        </Styl.AreaFiltro>

        <Styl.Titulo>
          <h3>Consultas</h3>
        </Styl.Titulo>
        <Styl.Cartao>
            <ConsultaCartao/>
            <ConsultaCartao/>
            <ConsultaCartao/>
            <ConsultaCartao/>
        </Styl.Cartao>


      <Footer/>
    </Styl.Container>
)
}
//exportar a função para quando o arquivo for 
// convocado em algum lugar
//eu export tudo que foi definido na função
export default Home;
