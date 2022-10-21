import styled from 'styled-components/native';

export const Container = styled.View`
flex:1;
justify-content: center;
`;

export const Botao = styled.TouchableOpacity`
align-items: center;
`;

export const Title = styled.Text`
color: #2B5C8E;
margin-bottom: 10px;
font-weight: bold;
`;

export const Area = styled.View`
padding: 12px;
`;

export const List = styled.FlatList.attrs({
  
})`
  padding-top: 15px;
  background-color: #35374A;
  border-radius: 10px; 
`;

export const ValorText = styled.Text`
  color: #FFF;
  font-size: 13px;
  padding: 20px;
  margin-left: 30px;
  align-items: center;

`;