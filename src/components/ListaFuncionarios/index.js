import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import RegistroModal from '../../components/RegistroModal'
import {
  Container,
  ValorText,
} from "./styles";

export default function ListaFuncionarios({data, deleteItem}) {
  return (

    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>  
    
      <Container>      

      <ValorText>Nome: {data.nome}</ValorText>
      <ValorText>CPF: {data.cpf}</ValorText>
      <ValorText>Telefone: {data.telefone}</ValorText>  
      <ValorText>Empresa: {data.empresa}</ValorText>

      <RegistroModal data={data} />        

      </Container>

    </TouchableWithoutFeedback> 
  );
}