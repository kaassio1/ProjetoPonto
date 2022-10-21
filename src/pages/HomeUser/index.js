import React, { useContext, useState, useEffect } from "react";
import { Alert, Platform } from "react-native";

import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import HistoricoList from "../../components/HistoricoList";
import { format, isBefore, getMonth, getYear } from "date-fns";

import Icon from "react-native-vector-icons/MaterialIcons";
import DateMonthPicker from "../../components/DateMonthPicker";

import firebase from "../../services/firebaseConnection";

import {
  Background,
  Container,
  Nome,
  Title,
  List,
  Area,
  Mes,
} from "./styles";

export default function HomeUser() {
  const [registro, setRegistro] = useState([]);

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  const [newDateMonth, setNewDateMonth] = useState(new Date());
  const [showMonth, setShowMonth] = useState(false);

  useEffect(() => {
    async function loadList() {
      await firebase
        .database()
        .ref("registro")
        .child(uid)
        .orderByChild("date")
        .limitToLast(31)
        .on("value", (snapshot) => {
          setRegistro([]);

          let aux = [];

          snapshot.forEach((childItem) => {
            aux.push({
              key: childItem.key,
              entrada: childItem.val().entrada,
              saida: childItem.val().saida,
              date: childItem.val().date,
            });
          });

          aux = aux.filter((item) => {
            const parts = item.date.split("/");
            return (
              getMonth(new Date(`${parts[1]}/${parts[0]}/${parts[2]}`)) ===
              getMonth(newDateMonth) && getYear(newDateMonth) === parseInt(parts[2])
            );
          });

          setRegistro([...aux]);
        });
    }

    loadList();
  }, [newDateMonth]);

  function handleDelete(data) {
    //Pegando data do item:
    const [diaItem, mesItem, anoItem] = data.date.split("/");
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);

    //Pegando data hoje
    const formatDiaHoje = format(new Date(), "dd/MM/yyyy");
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split("/");
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);

    if (isBefore(dateItem, dateHoje)) {
      //Se a data do registro já passou vai entrar aqui
      alert("Voce não pode excluir um registro antigo!");
      return;
    }

    Alert.alert(
      "Cuidado Atenção!",
      `Voce deseja excluir os registros do dia ${data.date}?`,
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
      .ref("registro")
      .child(uid)
      .child(data.key)
      .remove()
      .catch((error) => {
        console.log(error);
      });
  }

  function handleShowMonthPicker() {
    setShowMonth(true);
  }

  function handleCloseMonth() {
    setShowMonth(false);
  }

  const onChangeMonth = (date) => {
    setShowMonth(Platform.OS === "ios");
    setNewDateMonth(date);
  };

  return (
    <Background>
      <Header />

      <Container>
        <Nome>{user && user.nome}</Nome>
      </Container>

      <Area>
        <Mes onPress={handleShowMonthPicker}>
          <Icon name="date-range" color="#FFF" size={30} />
        </Mes>
        <Title>Consulta /Mês</Title>
      </Area>

      <List
        showVerticalScrollIndicator={false}
        data={registro}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <HistoricoList data={item} deleteItem={handleDelete} />
        )}
      />

      {showMonth && (
        <DateMonthPicker
          onClose={handleCloseMonth}
          date={newDateMonth}
          onChange={onChangeMonth}
        />
      )}
    </Background>
  );
}
