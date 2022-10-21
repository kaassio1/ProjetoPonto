import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import EmpresaModal from "../../components/EmpresaModal";
import AddFuncionarioModal from "../../components/AddFuncionarioModal";
import FuncionarioModal from "../../components/FuncionarioModal";

import {
  Container,
  Tipo,
  IconView,
  TipoText,
  ValorText,
  Area,
} from "./styles";

export default function EmpresaList({ data, deleteItem }) {
  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
      
      <Container>
        <Tipo>
          <IconView localidade={data.localidade}>
            <Icon
              name={data.localidade === "Ceilandia" ? "map-pin" : "map-pin"}
              color="#FFF"
              size={18}
            />
            <TipoText> {data.localidade} </TipoText>
          </IconView>
        </Tipo>
        <ValorText>Razao Social: {data.razaoSocial}</ValorText>
        <ValorText>CNPJ: {data.cnpj}</ValorText>
        <ValorText>Endereço: {data.endereco}</ValorText>

        <Area>
        <EmpresaModal data={data} /> 
        <AddFuncionarioModal data={data} />
        <FuncionarioModal data={data} />
        </Area>

      </Container>
    </TouchableWithoutFeedback>
  );
}
