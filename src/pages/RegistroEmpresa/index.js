import React, {useState, useContext, useRef} from 'react';
import { Platform, ActivityIndicator, Keyboard, Alert, View, } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebaseConnection";
import Header from "../../components/Header";
import {TextInputMask} from "react-native-masked-text";
import styles from '../SignUp/styles';

import { Background, Container, AreaInput, Input, SubmitButton,
  SubmitText } from '../SignUp/styles';

export default function RegistroEmpresa() {
  const navigation = useNavigation();

  const { loadingAuth } = useContext(AuthContext);
  const { user: usuario } = useContext(AuthContext);

  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [localidade, setLocalidade] = useState("");

  const cnpjRef = useRef(null);

  function showCnpj() {
    const unMask = cnpjRef?.current.getRawValue();
    const cnpjIsValid = cnpjRef?.current.isValid();
    Keyboard.dismiss();

    if (cnpjIsValid === false) {
      alert("Digite um CNPJ válido");
      return;
    }

    Alert.alert("CNPJ válido", `Clique em continuar para prosseguir com cadastro`,[
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Continuar",
        onPress: () => handleSubmitEmpresa(),
      }
    ]);
 }

  function handleSubmitEmpresa() {
    Keyboard.dismiss();
    Alert.alert("Confirmando dados", `${razaoSocial}`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Continuar",
        onPress: () => validar(),
      },
    ]);
  }

  const validar = () => {
    Keyboard.dismiss();
    if (razaoSocial |cnpj | endereco | localidade === "") {
      alert("Preencha todos os campos")
      return;
      }
      Alert.alert("Confirmando Cadastro", `Clique em continuar para cadastrar emrpesa.`, [
        {
          text: "Fechar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleSignUpEmpresa(),
        },
      ]);
  }
  
  async function handleSignUpEmpresa(){
    let uid = usuario.uid;
    let key = await (await firebase.database().ref("empresa").child(uid).push()).key;
    await firebase
      .database()
      .ref("empresa")
      .child(uid)
      .child(key)
      .set({
        razaoSocial: razaoSocial,
        cnpj: cnpj,
        endereco: endereco,
        localidade: localidade,
      });

      Keyboard.dismiss();
      navigation.navigate("HomeAdmin");
    }
  

  return (
    <Background>
      <Header />
        <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        >
          <AreaInput>
            <Input 
            placeholder="Razão Social"
            autoCorrect={false}
            autoCapitalize="none"
            value={razaoSocial}
            onChangeText={ (text) => setRazaoSocial(text)}
            />
          </AreaInput>

          <View style={styles.containerMask}>
            <TextInputMask 
            style={styles.maskedInput}
            placeholder="CNPJ"
            placeholderTextColor = "rgba(255,255,255,0.20)"
            type="cnpj"
            value={cnpj}
            onChangeText={value => {
              setCnpj(value)
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            ref={cnpjRef}
            />
          </View>

          <AreaInput>
            <Input 
            placeholder="Endereço"
            autoCorrect={false}
            autoCapitalize="none"
            value={endereco}
            onChangeText={ (text) => setEndereco(text)}
            />
          </AreaInput>

          <AreaInput>
            <Input
            placeholder="Cidade"
            autoCorrect={false}
            autoCapitalize="none"
            value={localidade}
            onChangeText={ (text) => setLocalidade(text)}
            />
          </AreaInput>

          <SubmitButton onPress={showCnpj}>
          {
              loadingAuth ? (
                <ActivityIndicator size={20} color="#FFF" />
              ) : (
                <SubmitText>Cadastrar</SubmitText>
              )
            }
            
          </SubmitButton>

        </Container>
    </Background>    
  );
}