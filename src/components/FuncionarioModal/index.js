import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Alert } from "react-native";
import firebase from "../../services/firebaseConnection";
import ListaFuncionarios from "../../components/ListaFuncionarios";

import {
  Area,
  Botao,
  Title,
  Container, 
  List, 
  ValorText,
} from "./styles";

export default function FuncionarioModal({data}) {

  const [funcionario, setFuncionario] = useState([]);

  const [modalVisivel, setModalVisivel] = useState(false);

  const alternaModal = () => {
    setModalVisivel(!modalVisivel);
  };

  useEffect(() => {
    async function loadList() {
      await firebase
      .database()
      .ref("users")
      .orderByChild("empresa").equalTo(data.razaoSocial)
      .on("value", (snapshot) => {
        setFuncionario([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            cpf: childItem.val().cpf,
            empresa: childItem.val().empresa,
            nome: childItem.val().nome,
            telefone: childItem.val().telefone,
          };

          setFuncionario((oldArray) => [...oldArray, list]);
        });
      });
    }

    loadList();
  }, []);

  function handleDelete(data) {
      Alert.alert(
      "Cuidado Atenção!",
      `Voce deseja desvincular este funcionário ${data.nome}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleDeleteSucess(data),
        },
      ]
    );
  }

  async function handleDeleteSucess(data) {
    await firebase
      .database()
      .ref("users")
      .child(data.key)
      .update({
        empresa: "",
      })
      .catch((error) => {
        console.log(error);
      });

      Alert.alert(
        "SUCESSO!",
        `Usuário ${data.nome} removido com sucesso!`,
        [
          {
            text: "Continuar",
            onPress: () => {},
          },          
        ]        
      );
    }

  return (

    <Area>
      <Botao onPress={alternaModal}>
        <Icon name="users" color="#2B5C8E" size={30} />
        <Title>Funcionários</Title>
      </Botao>

        <Modal
          isVisible={modalVisivel}
          onBackdropPress={() => setModalVisivel(false)}
          backgroundColor="#35374A"
          style={{ borderRadius: 10 }}
          onSwipeComplete={() => setModalVisivel(false)}
          swipeDirection="left"
        >

        <Container>

        <ValorText>Para remover um funcionário, pressione e segure.</ValorText>

        <List
        showsVerticalScrollIndicator={true}
        data={funcionario}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (        
        <ListaFuncionarios data={item} deleteItem={handleDelete}/>
        )}

        />

        </Container>

        </Modal>
      
    </Area>

  );
}