import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import {
  Container,
  ValorText,
} from "./styles";

export default function FuncionarioList({data, updateItem}) {
  return (

    <TouchableWithoutFeedback onLongPress={() => updateItem(data)}>
      <Container>      

        <ValorText>Nome: {data.nome}</ValorText>
        <ValorText>CPF: {data.cpf}</ValorText>
        <ValorText>Telefone: {data.telefone}</ValorText>    

      </Container>
    </TouchableWithoutFeedback>

  );
}