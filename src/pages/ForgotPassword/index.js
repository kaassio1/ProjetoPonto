import React, { useState, useContext } from "react";
import { ActivityIndicator, Keyboard, Alert, } from 'react-native';
import { AuthContext } from "../../contexts/auth";
import { Background, Container, AreaInput, Input, SubmitButton, SubmitText, } from "./styles";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword, loadingAuth } = useContext(AuthContext);

  const validar = () => {
    Keyboard.dismiss();
    if (email === "") {
      alert("Preencha seu email")
      return;
      }
      Alert.alert("Confirmando Email", `${email}`, [
        {
          text: "Fechar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleResetPassword(),
        },
      ]);
  }

  function handleResetPassword(){
    resetPassword(email);
  }

  return (
    <Background>
      <Container>
        <AreaInput>
          <Input
            placeholder="Preencha seu email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>

        <SubmitButton onPress={validar}>
            {
              loadingAuth ? (
                <ActivityIndicator size={20} color="#FFF" />
              ) : (
                <SubmitText>Enviar</SubmitText>
              )
            }            
          </SubmitButton>

      </Container>
    </Background>
  );
}
