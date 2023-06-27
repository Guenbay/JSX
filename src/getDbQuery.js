import axios from axios;


const {data, isLoading} = UseGetDbQuery();

return (
  <View style={styles.layout}>
   {isLoading ? (
      <Text>Loading...</Text>
    ) : data ? (
      data.data.map((Name, Key) => {
        return (
          <View>
           <Text>{Name.Benutzername}</Text>  
          </View>
        )    
     })     
    ) : (
      <Text>Whoops No Data Available</Text>
    )}
    </View>
)
    