
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
import { UNITS, LANGUAGE, CNT, APPID, BASE_URL, PROTOCOL  } from "@env"
import  PrevisaoItem  from './components/PrevisaoItem'


export default function App() {
  const [cidade, setCidade] = useState('')
  const [previsoes, setPrevisoes] = useState({})
  const capturarCidade = (cidadeDigitada) => {
    setCidade(cidadeDigitada)
  }

  const obterPrevisoes = async () => {
    const endPoint = `${PROTOCOL}://${BASE_URL}?lang=${LANGUAGE}&units${UNITS}&cnt=${CNT}&appid=${APPID}&q=${cidade}`
    const primeiraResposta = await fetch(endPoint)
    const primeiraRespostaTratada = await primeiraResposta.json()
    //setPrevisoes(primeiraRespostaTratada['list'])
    console.log("Primeira tratada: ", primeiraRespostaTratada)
    const lat = parseInt(primeiraRespostaTratada.city.coord.lat)
    const lon = parseInt(primeiraRespostaTratada.city.coord.lon)
    console.log(lat, lon)
    const segundoEndPoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APPID}&units=metric`
    const segundaResposta = await fetch(segundoEndPoint)
    const segundaRespostaTratada = await segundaResposta.json()
    console.log("Segunda tratada:  ", segundaRespostaTratada)
    setPrevisoes(segundaRespostaTratada)
    
    const dt = segundaRespostaTratada.current.dt;
    const temp = segundaRespostaTratada.current.temp;
    const sensacao = segundaRespostaTratada.current.feels_like;
    const humidity = segundaRespostaTratada.current.humidity;
    const description = segundaRespostaTratada.current.weather[0].description;
    console.log("dt: ", dt)
    console.log("temperatura: ", temp)
    console.log("sensação: ", sensacao)
    console.log("humidity: ", humidity)
    console.log("description: ", description)
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
        <Text>ESTA PORRA NÃO FUNCIONA</Text>
      {/* <View style={styles.tela}>
        <Image
          style={styles.imagem}
          source={{ uri: "https://openweathermap.org/img/wn/" + previsoes.current.weather[0].icon + ".png"}}
        />
        <View style={styles.cartao}>
          <View style={styles.primeiraLinha}>
            <Text>{new Date(previsoes.current.dt * 1000).toLocaleTimeString()} - {previsoes.current.weather[0].description}</Text>
          </View>
          <View style={styles.segundaLinha}>
            <Text style={styles.valor}>Temperatura: {previsoes.current.temp + "\u00B0C"}</Text>
            <Text style={styles.valor}>Sensação: {previsoes.current.feels_like + "\u00B0C"}</Text>
            <Text style={styles.valor}>Humidade: {previsoes.current.humidity + "%"}</Text>
          </View>
        </View>
      </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    padding: 40
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

import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
import { UNITS, LANGUAGE, CNT, APPID, BASE_URL, PROTOCOL  } from "@env"
import  PrevisaoItem  from './components/PrevisaoItem'


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
  
  const dt = segundaRespostaTratada.current.dt;
  const temp = segundaRespostaTratada.current.temp;
  const humidity = segundaRespostaTratada.current.humidity;
  const description = segundaRespostaTratada.current.weather[0].description;


  
  const sensacao = segundaRespostaTratada.current.feels_like;
  setSensacao(sensacao)
  const sunrise = new Date (segundaRespostaTratada.current.sunrise * 1000).toLocaleTimeString()
  setSunrise(sunrise)
  const sunset = new Date (segundaRespostaTratada.current.sunset * 1000).toLocaleTimeString()
  setSunset(sunset)
  const icon = segundaRespostaTratada.current.weather[0].icon;
  setIcon(icon)
  console.log("dt: ", dt)
  console.log("temperatura: ", temp)
  console.log("sensação: ", sensacao)
  console.log("humidity: ", humidity)
  console.log("description: ", description)
  console.log(sunrise)
  console.log(sunset)




    
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
        <Text>{previsoes.current}</Text>
        {/* <FlatList
          data={previsoes}
          renderItem={p=> (
            <PrevisaoItem previsao={p.item}/>
          )}/> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    padding: 40
  },
  entradaView: {
    marginBottom: 8,
  },
  cidadeTextInput: {
    padding: 12,
    borderBottomColor: '#FF9800',
    borderBottomWidth: 2,
    marginBottom: 4
  }
});
