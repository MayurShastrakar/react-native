
import {View,Text, Image} from 'react-native';
import Background from './Background';
import BTN from './btn';
import { darkgreen, yellow } from './constants';

export default function Home(props) {
    return (
      <Background>
       <View style={{marginHorizontal:40,marginVertical:200}}>
       <Text style={{color:'black',fontSize:64}}>Welcome</Text>
        <Text style={{color:'red',fontSize:34}}>Have a Great Day</Text>
    <BTN bgColor={darkgreen} textColor='white' btnLabel='LogIn' Press={()=> props.navigation.navigate("login")} ></BTN>
    <BTN bgColor='white' textColor={darkgreen} btnLabel='SignUp' Press={()=>props.navigation.navigate('SignUp')}></BTN>
    
       </View>
      </Background>
    );
  }