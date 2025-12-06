import React from 'react';
import * as Styl from './styles'
import filtro from '../../assets/filtro.png'

function FiltrarConsulta({titulo, ativo}) {
  const ativoString = ativo ? "true" : "false";

  return (
    <Styl.Container $ativo={ativoString}>
        <img src={filtro} alt="Filtro"/>
        <span>{titulo}</span>
    </Styl.Container>
  );
}

export default FiltrarConsulta;