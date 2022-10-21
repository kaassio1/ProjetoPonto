import React, { useState } from 'react';
import { Text, Platform, TouchableOpacity} from 'react-native';
import MonthPicker from 'react-native-month-year-picker';

import { Container, Header } from './styles';

export default function DateMonthPicker({ date, onChange, onClose }) {
    const [dateNow, setDateNow] = useState(new Date(date));
    
 return (
   <Container>
       {Platform.OS === 'ios' &&  (
          <Header>
            <TouchableOpacity onPress={ onClose }>
              <Text>Fechar</Text>
            </TouchableOpacity>  
          </Header> 
       )}
       <MonthPicker
       value={dateNow}
       mode="number"
       display="full"
       okButton="OK"
       cancelButton="CANCELAR"
       minimumDate={new Date(2021)}
       onChange={ (e, d) => {
        onClose();
        const currentDate = d || dateNow;
        setDateNow(currentDate);
        onChange(currentDate);
      }}     
       />

   </Container>
   
  );

}
