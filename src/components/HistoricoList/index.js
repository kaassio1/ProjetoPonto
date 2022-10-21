import React from 'react';
import { TouchableWithoutFeedback} from 'react-native';

import { Container, Tipo, IconView, TipoText, ValorText } from './styles';

export default function HistoricoList({ data , deleteItem}) {
 return (
     <TouchableWithoutFeedback onLongPress={() => deleteItem(data) }>
    <Container>
        <Tipo>
            <IconView registro={data.registro}>
                <TipoText>{data.date}</TipoText>
            </IconView>
        </Tipo>
        <ValorText>
            Entrada: {data.entrada}  -
            Saida: {data.saida}
        </ValorText>
    </Container>
    </TouchableWithoutFeedback>
  );
}