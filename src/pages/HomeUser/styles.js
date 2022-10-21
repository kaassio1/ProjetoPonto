import styled from 'styled-components/native';

export const Background = styled.View`
 flex:1;
 background-color: #35374A;
`;

export const Container = styled.View`
    margin-left: 15px;
    margin-bottom: 25px;
`;

export const Nome = styled.Text`
    font-size: 19px;
    color: #FFF;
    font-style: italic;
`;

export const Title = styled.Text`
margin-left: 5px;
color: #FFF;
margin-bottom: 10px;

`;

export const Area = styled.View`
flex-direction: row;
margin-left: 10px;
align-items: baseline;
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

export const Dia = styled.TouchableOpacity`
`;

export const Mes = styled.TouchableOpacity`
padding-left: 10px;
`;


