import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import Axios from 'axios';

export default function Login () 
{
//    const [isPasswordVisible, setIsPasswordVIsible] = useState(false);
    const [benutzernane, setBenutzername] = useState('');
    const [password, setpassword] = useState('');    

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);


    //alert("start");
      const getData = async () => {
        try {
        
            const {} = await Axios.post('https://192.168.178.29/api/login.php', 
            {
                benutzername: benutzernane,
                passwort: password,
            });

          //const url = 'https://192.168.178.29/api/login.php';
          //const response = await fetch(url);      
          //const json = await response.json();
          //setData(json.movies);

        if (data.status == 'success') {
            alert('User Login Sucessfully');
        } else {
            alert('User Not Found');
        }

            console.log(data);
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
