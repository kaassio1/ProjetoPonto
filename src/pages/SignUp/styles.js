import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Background = styled.View`
flex:1;
background-color: #35374A;
`;

export const Container = styled.KeyboardAvoidingView`
flex:1;
align-items: center;
margin-top: 70px;
justify-content: center;
`;

export const AreaInput = styled.KeyboardAvoidingView`
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

const styles = StyleSheet.create({
  maskedInput: {
    backgroundColor: 'rgba(0,0,0,0.20)',
    flex: 0.9,
    fontSize: 17,
    color: '#FFF',
    marginBottom: 15,
    padding: 10,
    borderRadius: 7,
  },
  containerMask: {
    flexDirection: "row",
  },
});

export default styles