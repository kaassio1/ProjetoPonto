import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Image,
  Text,
} from "react-native";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import { Background, SubmitButton, SubmitText } from "./styles";
import moment from "moment";

export default function Registro() {
  const navigation = useNavigation();

  const { user: usuario } = useContext(AuthContext);
  const [newDate] = useState(new Date());

  const [registroPonto, setRegistroPonto] = useState(null);

  useEffect(() => {
    var horaAtual = moment().utcOffset("-03:00").format("HH:mm");
    setRegistroPonto(horaAtual);
  });

  function handleSubmitRegistro() {
    Keyboard.dismiss();
    Alert.alert("Confirmando dados", `Entrada ${registroPonto}`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Continuar",
        onPress: () => handleAddRegistro(),
      },
    ]);
  }

  function handleSubmitUpdate() {
    Keyboard.dismiss();
    Alert.alert("Confirmando dados", `Saida ${registroPonto}`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Continuar",
        onPress: () => handleUpdateSaida(),
      },
    ]);
  }

  async function handleAddRegistro() {
    //Pega o UID do usuário que está logado
    let uid = usuario.uid;

    //Gera chave aleatória para armazenamento no Firebase
    let key = await (
      await firebase.database().ref("registro").child(uid).push()
    ).key;
    await firebase
      .database()
      .ref("registro")
      .child(uid)
      .child(key)
      .set({
        entrada: registroPonto,
        saida: "",
        date: format(new Date(), "dd/MM/yyyy"),
      });

    Keyboard.dismiss();
    navigation.navigate("Home");
  }

  async function handleUpdateSaida() {
    let uid = usuario.uid;
    let key = await await firebase
      .database()
      .ref("registro")
      .child(uid)
      .orderByChild("date")
      .equalTo(format(newDate, "dd/MM/yyyy"))
      .on("child_added", async function (snapshot) {
        await firebase
          .database()
          .ref("registro")
          .child(uid)
          .child(snapshot.key)
          .update({
            saida: registroPonto,
          });
      });

    Keyboard.dismiss();
    navigation.navigate("Home");
  }

  return (
    <TouchableWithoutFeedback>
      <Background>
        <Header />

        <SafeAreaView style={{ alignItems: "center" }}>
          <Text style={{ alignItems: "center", color: "#FFF" }}>
            Clique no botão para realizar o seu registro.
          </Text>

          <SubmitButton onPress={handleSubmitRegistro}>
            <Image
              source={require("../../assets/Registro.png")}
              style={{ width: 85, height: 85 }}
              resizeMode="contain"
            />
            <SubmitText>Registrar Entrada</SubmitText>
          </SubmitButton>

          <SubmitButton onPress={handleSubmitUpdate}>
            <Image
              source={require("../../assets/Saida.png")}
              style={{ width: 85, height: 85 }}
              resizeMode="contain"
            />
            <SubmitText>Registrar Saída</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
