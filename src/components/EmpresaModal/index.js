import React, { useState, useContext } from "react";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../contexts/auth";
import { Keyboard, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebaseConnection";

import {
  Botao,
  AreaInput,
  Input,
  Title,
  Area,
  Container,
  SubmitButton,
  SubmitText,
} from "./styles";

export default function EmpresaModal({ data }) {
  const [modalVisivel, setModalVisivel] = useState(false);

  const { loadingAuth } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  const navigation = useNavigation();

  const [endereco, setEndereco] = useState("");
  const [localidade, setLocalidade] = useState("");

  const alternaModal = () => {
    setModalVisivel(!modalVisivel);
  };

  function handleUpdate(data) {
    Alert.alert(
      "ATENÇÃO!",
      `Voce deseja Alterar a Empresa ${data.razaoSocial}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => validar(data),
        },
      ]
    );
  }

  const validar = (data) => {
    Keyboard.dismiss();
    if (endereco | localidade === "") {
      alert("Preencha todos os campos")
      return;
      }
      Alert.alert("Tem certeza que deseja atualizar essa empresa?", ``, [
        {
          text: "Fechar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleUpdateSucess(data),
        },
      ]);
  }

  async function handleUpdateSucess(data) {
    await firebase.database().ref("empresa").child(uid).child(data.key).update({
      endereco: endereco,
      localidade: localidade,
    });
    console.log(data);

    Keyboard.dismiss();
    navigation.navigate("HomeAdmin");
  }

  return (
    <Area>
      <Botao onPress={alternaModal}>
        <Icon name="file-edit" color="#2B5C8E" size={30} />
        <Title>Alterar Dados</Title>
      </Botao>        

        <Modal
          isVisible={modalVisivel}
          onBackdropPress={() => setModalVisivel(false)}
          backgroundColor="#35374A"
          style={{ borderRadius: 10, height: 50 }}
          onSwipeComplete={() => setModalVisivel(false)}
          swipeDirection="left"
        >
          <Container>
            <Text style={{ color: "#FFF", fontSize: 18 }}>
              {data.razaoSocial}
            </Text>
            <Text style={{ color: "#FFF", fontSize: 18, padding: 30 }}>
              {data.cnpj}
            </Text>

            <AreaInput>
              <Input
                placeholder="Endereço"
                autoCorrect={false}
                autoCapitalize="none"
                value={endereco}
                onChangeText={(text) => setEndereco(text)}
              />
            </AreaInput>

            <AreaInput>
              <Input
                placeholder="Localidade"
                autoCorrect={false}
                autoCapitalize="none"
                value={localidade}
                onChangeText={(text) => setLocalidade(text)}
              />
            </AreaInput>

            <SubmitButton onPress={() => handleUpdate(data)}>
              {loadingAuth ? (
                <ActivityIndicator size={20} color="#FFF" />
              ) : (
                <SubmitText>Alterar</SubmitText>
              )}
            </SubmitButton>
          </Container>
        </Modal>
      
    </Area>
  );
}
