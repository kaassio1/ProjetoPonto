import React, { useState, useContext, useRef } from "react";
import { Platform, ActivityIndicator, Keyboard, Alert, View } from "react-native";
import Picker from "../../components/Picker";
import { AuthContext } from "../../contexts/auth";
import {TextInputMask} from "react-native-masked-text";
import styles from './styles';

import {
  Background,
  Container,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from "./styles";

export default function SignIn() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [funcao, setFuncao] = useState("");
  const [tipo, setTipo] = useState(null);

  const cpfRef = useRef(null);

  function showCpf() {
     const unMask = cpfRef?.current.getRawValue();
     const cpfIsValid = cpfRef?.current.isValid();
     Keyboard.dismiss();

     if (cpfIsValid === false) {
       alert("Digite um CPF válido");
       return;
     }

     Alert.alert("CPF válido", `Clique em continuar para prosseguir com cadastro`,[
       {
         text: "Cancelar",
         style: "cancel",
       },
       {
         text: "Continuar",
         onPress: () => handleSubmitSignUp(),
       }
     ]);
  }

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmitSignUp() {
    Keyboard.dismiss();
    if (tipo === null) {
      alert("Selecione o tipo de usuário!");
      return;
    }

    Alert.alert("Confirmando tipo de usuário", `Permissão de ${tipo}`, [
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

  function handleSignUp() {
    signUp(email, password, nome, telefone, cpf, funcao, tipo);
  }

  const validar = () => {
    Keyboard.dismiss();
    if (nome |telefone | cpf | funcao === "") {
      alert("Preencha todos os campos")
      return;
      }
      Alert.alert("Confirmando Cadastro", `Clique em continuar para confirmar o seu cadastro.`, [
        {
          text: "Fechar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleSignUp(),
        },
      ]);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>

        <AreaInput>
          <Input
            placeholder="Nome Completo"
            autoCorrect={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={(text) => setNome(text)}
            returnKeyType="done"            
          />          
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
            returnKeyType="done"
          />
        </AreaInput>

        <View style={styles.containerMask}>
          <TextInputMask
            style={styles.maskedInput}
            placeholder="Telefone"
            placeholderTextColor = "rgba(255,255,255,0.20)"
            type={'cel-phone'}
            options={{
               maskType: 'BRL',
               withDDD: true,
               dddMask: '(99) '
            }}
            value={telefone}            
            onChangeText={value => {
              setTelefone(value)
            }}
            keyboardType="phone-pad"
            returnKeyType="done"
          />
        </View>

        <View style={styles.containerMask}>
          <TextInputMask
            style={styles.maskedInput}
            placeholder="CPF"
            placeholderTextColor = "rgba(255,255,255,0.20)"
            type={'cpf'}
            value={cpf}
            onChangeText={value => {
              setCpf(value)
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            ref={cpfRef}
          />
        </View>

        <AreaInput>
          <Input
            placeholder="Função"
            autoCorrect={false}
            autoCapitalize="none"
            value={funcao}
            onChangeText={(text) => setFuncao(text)}
            returnKeyType="done"
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            returnKeyType="done"
          />
        </AreaInput>

        <Picker onChange={setTipo} tipo={tipo} />

        <SubmitButton onPress={showCpf}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}
