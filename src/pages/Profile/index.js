import React, { useContext, useState } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import {TextInputMask} from "react-native-masked-text";
import { ActivityIndicator, View, Text, Keyboard, Alert, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from '../../services/firebaseConnection';

import { Container, Nome, Area, Title, Aviso, NomeEmpresa, Botao, 
  ValorText, ContainerModal, AreaInput, Input, SubmitButton, SubmitText,
} from "./styles";

import styles from './styles';

export default function Profile() {
  const { user, loadingAuth } = useContext(AuthContext);
  const uid = user && user.uid;

  const navigation = useNavigation();

  const [modalVisivel, setModalVisivel] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [funcao, setFuncao] = useState("");

  const alternaModal = () => {
    setModalVisivel(!modalVisivel);
  };

  async function handleUpdateSucess() {
    await firebase.database().ref("users").child(uid).update({
      telefone: telefone,
      funcao: funcao,
    });
    alert('Dados atualizados com sucesso!')
    console.log(uid);

    Keyboard.dismiss();
    navigation.navigate("Perfil");
  }

  const validar = () => {
    Keyboard.dismiss();
    if (funcao | telefone === "") {
      alert("Preencha todos os campos")
      return;
      }
      Alert.alert("Tem certeza que deseja atualizar seus dados", `${user && user.nome}`, [
        {
          text: "Fechar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleUpdateSucess(),
        },
      ]);
  }

  return (
    <Container>
      <Header />

      <Title>{user && user.nome}</Title>

      <Area>
        <Nome>{user && user.email}</Nome>
        <Nome>{user && user.cpf}</Nome>
        <Nome>{user && user.telefone}</Nome>
        <Nome>{user && user.funcao}</Nome>

        <Title>Empresa</Title>

        <NomeEmpresa>{user && user.empresa}</NomeEmpresa>
      </Area>

      <Botao onPress={alternaModal}>
        <Icon name="file-edit" color="#FFF" size={50} />
        <ValorText>Alterar Dados</ValorText>
      </Botao>

      <Modal
        isVisible={modalVisivel}
        onBackdropPress={() => setModalVisivel(false)}
        backgroundColor="#35374A"
        style={{ borderRadius: 10, height: 50 }}
        onSwipeComplete={() => setModalVisivel(false)}
        swipeDirection="left"
      >
        <ContainerModal>
          <Text style={{ color: "#FFF", fontSize: 18 }}>
            {user && user.nome}
          </Text>
          <Text style={{ color: "#FFF", fontSize: 18, padding: 30 }}>
            {user && user.cpf}
          </Text>

          <AreaInput>
            <Input
              placeholder="Funcao"
              autoCorrect={false}
              autoCapitalize="none"
              value={funcao}
              onChangeText={(text) => setFuncao(text)}
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
              returnKeyType="next"
            />
          </View>

          <SubmitButton onPress={validar}>
            {loadingAuth ? (
              <ActivityIndicator size={20} color="#FFF" />
            ) : (
              <SubmitText>Alterar</SubmitText>
            )}
          </SubmitButton>
        </ContainerModal>
      </Modal>

      <Aviso>
        Caso você não esteja visualizando sua empresa, entre em contato com seu
        administrador para ser vinculado.
      </Aviso>
    </Container>
  );
}
