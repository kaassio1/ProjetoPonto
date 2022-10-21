import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
flex:1;
align-items: center;
justify-content: center;
`;

export const Botao = styled.TouchableOpacity`
align-items: center;
`; 

export const List = styled.FlatList.attrs({
    marginHorizontal: 15
})`
    padding-top: 15px;
    background-color: rgba(0,0,0, 0.02);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-left: 8px;
    margin-right: 8px;
`;

export const Title = styled.Text`
color: #2B5C8E;
margin-bottom: 10px;
font-weight: bold;

`;

export const Area = styled.View`
padding: 12px;
`;

export const AreaInput = styled.View`
flex-direction: row;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(255,255,255,0.20)'
})`
background: rgba(0,0,0,0.20);
width: 90%;
font-size: 17px;
color: #FFF;
margin-bottom: 15px;
padding: 10px;
border-radius: 7px;
`;

export const SubmitButton = styled.TouchableOpacity`
align-items:center;
justify-content: center;
background-color: #2B5C8E;
width: 80%;
height: 45px;
border-radius: 7px;
margin-top: 20px;
`;

export const SubmitText = styled.Text`
font-size: 18px;
color: #FFF;
`;
 