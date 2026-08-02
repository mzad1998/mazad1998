import {useState} from 'react';
import {Alert,Image,Pressable,Text} from 'react-native';
import {router} from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import {Button,Field,Screen,ui} from '@/components/ui';
import {useApp} from '@/services/AppProvider';

export default function Setup(){
  const app=useApp();
  const old=app.data.customer;
  const[name,setName]=useState(old?.name??'');
  const[area,setArea]=useState(old?.area??'');
  const[profileImage,setProfileImage]=useState(old?.profileImage);
  const[e,setE]=useState('');
  const pick=async()=>{const permission=await ImagePicker.requestMediaLibraryPermissionsAsync();if(!permission.granted)return Alert.alert('تعذر الوصول للصور','يمكنك متابعة إنشاء الحساب بدون صورة، أو منح الإذن من إعدادات الجهاز.');const result=await ImagePicker.launchImageLibraryAsync({allowsEditing:true,aspect:[1,1],quality:.55});if(!result.canceled)setProfileImage(result.assets[0]?.uri)};
  const go=()=>{if(!name.trim()||!area.trim())return setE('الاسم والمنطقة مطلوبان');app.setup(name.trim(),area.trim(),profileImage);router.replace('/home')};
  return <Screen title={old?'تعديل بياناتي':'أنشئ حسابك'}><Pressable accessibilityRole="button" onPress={pick}>{profileImage?<Image source={{uri:profileImage}} style={{width:100,height:100,borderRadius:50,alignSelf:'center'}}/>:<Text style={{fontSize:52,textAlign:'center'}}>👤</Text>}<Text style={ui.muted}>اضغط لاختيار صورة شخصية اختيارية</Text></Pressable><Field label="الاسم الكامل *" value={name} onChangeText={setName}/><Field label="منطقة السكن *" value={area} onChangeText={setArea} placeholder="اكتب المنطقة يدوياً" error={e}/><Button title="حفظ ومتابعة" onPress={go}/></Screen>
}
