import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Image } from 'react-native';
import { UNITS, LANGUAGE, CNT, APPID, BASE_URL, PROTOCOL  } from "@env"

export default function App() {
  const [cidade, setCidade] = useState('')
  const [previsoes, setPrevisoes] = useState({})
  const capturarCidade = (cidadeDigitada) => {
    setCidade(cidadeDigitada)
  }
  const [sunrise, setSunrise] = useState()
  const [sunset, setSunset] = useState()
  const [icon, setIcon] = useState()
  const [sensacao, setSensacao] = useState()

  const obterPrevisoes = async () => {
  const endPoint = `${PROTOCOL}://${BASE_URL}?lang=${LANGUAGE}&units${UNITS}&cnt=${CNT}&appid=${APPID}&q=${cidade}`
  const primeiraResposta = await fetch(endPoint)
  const primeiraRespostaTratada = await primeiraResposta.json()
  setPrevisoes(primeiraRespostaTratada['list'])
  console.log("Primeira tratada: ", primeiraRespostaTratada)
  const lat = parseInt(primeiraRespostaTratada.city.coord.lat)
  const lon = parseInt(primeiraRespostaTratada.city.coord.lon)
  console.log(lat, lon)
  const segundoEndPoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APPID}&units=metric`
  const segundaResposta = await fetch(segundoEndPoint)
  const segundaRespostaTratada = await segundaResposta.json()
  console.log("Segunda tratada:  ", segundaRespostaTratada)
  const sensacao = segundaRespostaTratada.current.feels_like;
  setSensacao("Sensação Térmica: " + sensacao)
  const sunrise = new Date (segundaRespostaTratada.current.sunrise * 1000).toLocaleTimeString()
  setSunrise("Nascer do Sol: " + sunrise)
  const sunset = new Date (segundaRespostaTratada.current.sunset * 1000).toLocaleTimeString()
  setSunset("Pôr do Sol: " + sunset)
  const icon = segundaRespostaTratada.current.weather[0].icon;
  setIcon(icon)  
  }
  return (
    <View style={styles.containerView}>
      <View style={styles.entradaView}>
        <TextInput style={styles.cidadeTextInput}
          value={cidade}
          onChangeText={capturarCidade}
          placeholder="Digite o nome de uma cidade"/>
        <Button title="ok"
          onPress={obterPrevisoes}/>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.cartao}>
        <View style={styles.tela}>
        <Image
          style={styles.imagem}
          source={{ uri: "https://openweathermap.org/img/wn/" + icon + ".png"}}
        />
        <View>
          <View style={styles.primeiraLinha}>
            <Text>{sensacao}</Text>
          </View>
          <View style={styles.segundaLinha}>
            <Text style={styles.valor}> {sunrise}</Text>
          </View>
          <View style={styles.segundaLinha}>
            <Text style={styles.valor}>{sunset}</Text>
          </View>
        </View>
      </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    padding: 40,
  },
  entradaView: {
    marginBottom: 8,
  },
  cidadeTextInput: {
    padding: 12,
    borderBottomColor: '#FF9800',
    borderBottomWidth: 2,
    marginBottom: 4
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
  cartao: {
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8
}
});
