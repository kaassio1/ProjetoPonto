import React from 'react';
import { Picker as RNPickerSelect} from '@react-native-community/picker'
import { PickerView } from './styles';

export default function Picker({ onChange, tipo }){
    return (
        <PickerView>
            <RNPickerSelect
            style={{
                width: '100%'
            }}
            selectedValue={tipo}
            onValueChange={ (valor)  => onChange(valor) }
            >
                <RNPickerSelect.Item label="Usuário" value="usuario" />
                <RNPickerSelect.Item label="Empresa" value="admin" />
            </RNPickerSelect>
        </PickerView>
    )
}