import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, TextInput, ActivityIndicator, FlatList, SafeAreaView, View, Alert, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-web';
//Startseiten Komponente
const Startseite = () => {
  
  return(
    <View>
    <Text style={styles.title}>Willkommen in der Schullapp</Text>
      <StatusBar style="auto" />
  <Separator />
  <Image
      style={styles.logo}
      source={{
        uri: 'https://blog.dgq.de/wp-content/uploads/2016/04/Kopf_Illustration-1.jpg',
      }}
    />
  <Separator />
    <Text style={styles.title}>
      Hier kannst du dich anmelden oder registrieren.
    </Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Registrieren"
        onPress={() => Alert.alert('Right button pressed')}
      />
  </View>
  );
};
//Login Komponente
const Login = (navigate) => {
  const [Benutzername, setBenutzername] = useState('');
  const [Passwort, setPasswort] = useState('');
  const [isLoading, setLoading] = useState("");
  const [isLoggedin, setLoggedin] = useState(false);
  


  const getData = async () => {
    try {
      let url = 'http://localhost/api/login.php?Benutzername='+Benutzername+'&Passwort='+Passwort;
      console.log (url)
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
    //--redirection to Startseite--
   
    if (json == 'OK') {
      
        
       // setLoggedin(true);
       // return (
       //   isLoggedin ? <Loggedin /> : <Login />
       // );
       // //navigation.navigate(Loggedin);

        alert('Wird weitergleitet');
      } else {
        alert('Eingabe überprüfen');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Benutzername"
        onChangeText={text => setBenutzername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Passwort"
        secureTextEntry
        onChangeText={text => setPasswort(text)}
      />
      <Button title="Anmelden" onPress={(getData)}/>
      
      <TouchableOpacity>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>


    </View>
  );
};
//Angemldet Komponente
const Loggedin = (navigate) => {
  return(
    <View>
        <Text>!!Super - Du bist eingeloggt!!</Text>
    </View>
  );
};
//Registriert Komponente
const Register = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
 //alert("start");
 const getData = async () => {
  try {
    let url = 'http://localhost/api/register.php';
    const response = await fetch(url);
    const json = await response.json();
    alert (json);
    //setData(json.movies);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
getData();
return (
  <View>
    {isLoading ? (
      <ActivityIndicator />
    ) : (
      <View>
           <FlatList
        data={data}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <Text>
            {item.title}, {item.releaseYear}
          </Text>
        )}
      />
      </View>
    )}
  </View>
);
};
const Separator = () => <View style={styles.separator} />;

//const Stack = createStackNavigator();
export default function App() {
  
  const Stack = createStackNavigator();
  const [isLoading, setLoading] = useState(true);
  
  return (
  <SafeAreaView style={styles.container}>
    <Login />
  </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logo: {
    width: 200,
    height: 86,
  },
});
