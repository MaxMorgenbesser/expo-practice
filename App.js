import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions,Image } from 'react-native';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import { useState,useEffect,  } from 'react';


export default function App() {
const [location,setLocation] = useState(null)
const [userCoordinates,setUserCoordinates] = useState(null)


 const getLocation=() => {
    (async () => {
      // console.log(" --------- /n it has been 10 seconds")
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }
    
  // }, []);
  useEffect(()=>{
    getLocation()
  },[])

      useEffect(()=>{
        setUserCoordinates({
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
       
      },[location]) 

      {setTimeout(getLocation, 10000)}
  return (
    <>
{location && userCoordinates &&
    <View style={mapstyles.container}>
    <MapView
      style={mapstyles.map}
      initialRegion={userCoordinates} //your region data goes here.
    >
      {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
      <Marker coordinate={userCoordinates} ></Marker>
    </MapView>
    {location && console.log(location)}
  </View>
}
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})