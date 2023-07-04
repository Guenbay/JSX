import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, TextInput, ActivityIndicator, FlatList, SafeAreaView, View, Alert, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';



//Startseiten Komponente


const Startseite = () => {
 


  return(
    
    <View>
     
    <Separator />

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

  </View>

  
  );
};


//Login Komponente
const Login = (navigation) => {

  const [Benutzername, setBenutzername] = useState('');
  const [Passwort, setPasswort] = useState('');
  const [isLogin, Loggedin] = useState(true);

  function toggleComponent() {
    Loggedin(!isLogin);
  }

  const getData = async () => {

    try {
            
      let url = 'http://localhost/api/login.php?Benutzername='+Benutzername+'&Passwort='+Passwort;
      console.log (url)
      
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      
      if (json == 'Benutzer gefunden - PHP echo') {
        //redirect to Startseite
          alert('Eingabe korrekt');
          //isLoading ? <Login /> : <Loggedin />
          //() => navigation.navigate('Loggedin');
          toggleComponent
  
  
        
        } else {
          alert('Eingabe überprüfen');
        }

    } catch (error) {
      console.log(error);
    } finally {
      Loggedin(false);
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
  
      <Button title="Anmelden" onPress={getData}/>
      
      <Text>Forgot Password?</Text>

      <Button title="Toggle here" onPress={(toggleComponent)}/>
      <Text> {isLogin ? <Text>Login</Text> : <Text>Loggedin</Text> }</Text>
       
      
    </View>
    
  );
};



//Angemldet Komponente

const Loggedin = (navigation) => {
 
  return(
    <View>
        <Text style={styles.text}>Logged In</Text>
    </View>
  );
};


//Registriert Komponente


const Register = () => {
 
  const [Benutzername, setBenutzername] = useState('');
  const [Passwort, setPasswort] = useState('');
  const [Name, setName] = useState('');
  const [Geburtsdatum, setGeburtsdatum] = useState('');

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
 
  const getData = async () => {
    try {
      
      
      let url = 'http://localhost/api/register.php?Benutzername='+Benutzername+'&Passwort='+Passwort+'&Name='+Name+'&Geburtsdatum'+Geburtsdatum;
      console.log (url)
      

      const response = await fetch(url);
      
      const json = await response.json();
      console.log(json);
      
      
    } catch (error) {
      console.error(error);
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
        onChangeText={text => setPasswort(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={text => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Geburtsdatum"
        onChangeText={text => setGeburtsdatum(text)}
      />

      <Button title="Registrieren" onPress={getData} />
    </View>
    
  );
};
  

const Separator = () => <View style={styles.separator} />;





const Stack = createStackNavigator();

export default function App() {

  const [isLoading, setLoading] = useState(true);

  const [isStartseite, setStartseite] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const [isRegister, setRegister] = useState(false);
  

  const toggleComponent = () => {
    setStartseite(!isStartseite);
    
  };

  const toggleComponent2 = () => {
    setLogin(!isLogin);
    setRegister(false);
  };

  const toggleComponent3 = () => {
    setRegister(!isRegister);
    setRegister(false);
  };

  return (
  <SafeAreaView style={styles.container}>
  <View>

  {isStartseite ? (<Startseite/>) : ("") }
  {isLogin ? (<Login/>) : ("") }
  {isRegister ? (<Register/>) : ("") }

  <Button
    title = "Wechsel Login"
    onPress={toggleComponent}
  />

<Button
    title = "Wechsel Login"
    onPress={toggleComponent2}
  />

<Button
    title = "Wechsel Register"
    onPress={toggleComponent3}
  />


  <Text>Startseite</Text>
  
  </View>  
    
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
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle:'italic'
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
  input: {
    borderRadius: 3,
    
  },
});
