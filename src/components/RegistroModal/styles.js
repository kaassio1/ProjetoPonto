import styled from 'styled-components/native';

export const Container = styled.View`
 flex:1;
 background-color: #35374A;
 border-radius: 10px;
`;

export const Botao = styled.TouchableOpacity`
align-items: center;
padding: 10px;
`;

export const Title = styled.Text`
color: #FFF;
margin-bottom: 5px;
font-weight: bold;
margin-left: 5px;
`;

export const Area = styled.View`
flex-direction: row;
margin-left: 10px;
align-items: baseline;
padding: 15px;
`;

export const List = styled.FlatList.attrs({
  marginHorizontal: 15
})`
  padding-top: 15px;
  background-color: #FFF;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-left: 8px;
  margin-right: 8px;
`;

export const ValorText = styled.Text`
  color: #FFF;
  font-size: 14px;
  padding: 20px;
  align-items: center;
  text-align: center;

`;