import * as React from 'react';
import { useState, useQuery,} from 'react';
import { Button, View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UseGetData } from '../src/getData';

//Beginns here to React fetch myPHP


//Worklines here

function HomeScreen({ navigation }) {
  
  return (
    <View style={styles.layout}>

      <Image
        style={styles.img}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} />
      
      <Text style={styles.title}>Login</Text>
      <Text> Login the Cat-Power </Text>

      <TextInput
        style={styles.textinput}
        placeholder="Username"
        onChangeText={text => null} />
      <TextInput
        style={styles.textinput}
        placeholder='Passwort'
        secureTextEntry />
      <Button
        title="Check in"
        onPress={(UseGetData) => navigation.navigate("Home/LogedIn")} 
        />

    </View>
  );
} 

const LogedInScreen = ({navigation}) =>
 (
  <View style={styles.layout}>
    <Text style={styles.title}>"Your're logged in!"</Text>
    
    <Button
      title = "Go to Login"
      onPress={() => navigation.navigate("Login")}
    />
    
    <Text>"Type your Message"</Text>
    <Button
      title = "Go to Schülerverzeichnis"
      onPress={() => navigation.navigate("Schülerverzeichnis")}
    />
  </View>
);

function StackLoginScreen () {
 return (
  <View style={styles.layout}>
    <Text style={styles.title}>"Willkommen im Schülerverzeichnis"</Text>
    <Image
      style={styles.img}
      source={{
        uri:"https://img.freepik.com/freie-ikonen/loggen-symbol_318-9896.jpg?w=740&t=st=1687766231~exp=1687766831~hmac=9cd386a99873146921b019d70b1bde8ac91743e53fe645aed8ab29e12f692f3d"
       }}
     />
  </View>
  );
}
const RegisterScreen = ({navigation}) => 
( 
<View style={styles.layout}> 
    <Text style={styles.title}>SignUp</Text> 
    <Text>Register now your Cat to keep informed!</Text>
    <Button 
      title ="klick here"
      onPress = {() => navigation.navigate("Message")}
    />
  </View> 
); 

const MessageScreen = ({navigation}) => { 
  const [name, setName] = useState(''); 
  const [typed, setTyped] = useState('');
  return ( 
    <View style={{ 
      flex: 1, 
      alignContent: 'center',  
      justifyContent: 'center',  
      padding: 16, 
    }}> 
      <Text style={{ marginVertical: "8%" }}> 
        {name ? `Hi ${name}!` : 'What is your name?'} 
      </Text> 
      <TextInput 
        style={styles.textinput} 
        placeholder="Your Name"
        onChangeText={text => null} 
      /> 

      <Text style={{ marginVertical: 16 }}> 
    {typed ? `Hi ${typed}! - Miau` : 'What is your Cat-Power Name'} 
   </Text> 
   <TextInput 
   style={styles.textinput} 
   placeholder="Your Name here"
   onChangeText={setTyped} 
   /> 

    </View> 
  ); 
}; 

//HERE BEGINS


//HERE ENDS
const LoginStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 
const RegisterStack = createNativeStackNavigator();


export const AppNavigator = () => {
  return (
 	<NavigationContainer>
	  <Tab.Navigator screenOptions={{ headerShown: false }}> 
	  
		  <Tab.Screen name="Login">
			{() => (
			  <LoginStack.Navigator>
				<LoginStack.Screen 
				  name="Login" 
				  component={HomeScreen} 
				/>												  			
				
        <LoginStack.Screen name="Home/LogedIn" component={LogedInScreen} />
        <LoginStack.Screen name="Schülerverzeichnis" component={StackLoginScreen} />
			  </LoginStack.Navigator>
			)}
		  </Tab.Screen>    
		  <Tab.Screen name="Register">
			{() => (
			  <RegisterStack.Navigator>
				  <RegisterStack.Screen name="Register" component={RegisterScreen} /> 
				  <RegisterStack.Screen name="Message" component={MessageScreen} />
			  </RegisterStack.Navigator>
			)} 
		  </Tab.Screen>
		</Tab.Navigator>
	  </NavigationContainer>
	);
}

 
const App = () => {
  
  return (  
    <AppNavigator /> 
  ); 
}

export default App; 


const styles = StyleSheet.create({ 

  layout: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 

  title: { 
    fontSize: 32, 
    marginBottom: 16, 
  }, 
  textinput: {
    padding: 8,
    borderWidth: 1,
    backgroundColor: 'beige',
    // backgroundColor: '#f5f5f5'
  },
  img: {
    width: 250,
    height: 200,
    justifyContent: 'center',
   
  }

}); 

 