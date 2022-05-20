import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Cartao from './Cartao'

const PrevisaoItem = ({ previsao }) => {
  const dt = previsao.dt;
  const temp_min = previsao.main.temp_min;
  const temp_max = previsao.main.temp_max;
  const humidity = previsao.main.humidity;
  const description = previsao.weather[0].description;
  const icon = previsao.weather[0].icon;
  return (
    <Cartao estilos={styles.cartao}>
      <View style={styles.tela}>
        <Image
          style={styles.imagem}
          source={{ uri: "https://openweathermap.org/img/wn/" + icon + ".png"}}
        />
        <View>
          <View style={styles.primeiraLinha}>
            <Text>{new Date(dt * 1000).toLocaleTimeString('pt-BR')} - {description}</Text>
          </View>
          <View style={styles.segundaLinha}>
            <Text style={styles.valor}>Min: {temp_min + "\u00B0C"}</Text>
            <Text style={styles.valor}>Max: {temp_max + "\u00B0C"}</Text>
            <Text style={styles.valor}>hum: {humidity + "%"}</Text>
          </View>
        </View>
      </View>
    </Cartao>
  );
};

export default PrevisaoItem;

const styles = StyleSheet.create({
  cartao: {
    marginBottom: 8,
  },
  tela: {
    flexDirection: "row",
  },
  imagem: {
    width: 50,
    height: 50,
  },
  primeiraLinha: {
    fexDirection: "row",
    justifyContent: "center",
  },
  segundaLinha: {
    fex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  valor: {
    marginHorizontal: 2,
  },
});

/* 
const dt = segundaRespostaTratada.current.dt;
const temp = segundaRespostaTratada.current.temp;
const humidity = segundaRespostaTratada.current.humidity;
const description = segundaRespostaTratada.current.weather[0].description;
  console.log(icon)
  console.log("dt: ", dt)
  console.log("temperatura: ", temp)
  console.log("sensação: ", sensacao)
  console.log("humidity: ", humidity)
  console.log("description: ", description)
  console.log(sunrise)
  console.log(sunset)
  */