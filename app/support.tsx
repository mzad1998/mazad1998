import {useState} from 'react';
import {Alert,Image,Pressable,Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Button,Card,Field,Screen,ui} from '@/components/ui';
import {useApp} from '@/services/AppProvider';
import {id} from '@/services/domain';

export default function Support(){
  const app=useApp();
  const[category,setCategory]=useState('');
  const[subject,setSubject]=useState('');
  const[message,setMessage]=useState('');
  const[image,setImage]=useState<string>();
  const[submitting,setSubmitting]=useState(false);
  const pick=async()=>{const permission=await ImagePicker.requestMediaLibraryPermissionsAsync();if(!permission.granted)return Alert.alert('تعذر الوصول','يمكن إرسال التذكرة بدون صورة، أو منح الإذن من إعدادات الجهاز.');const result=await ImagePicker.launchImageLibraryAsync({quality:.5});if(!result.canceled)setImage(result.assets[0]?.uri)};
  const submit=()=>{if(submitting)return;if(!category.trim()||!subject.trim()||!message.trim())return Alert.alert('بيانات ناقصة','أكمل التصنيف والموضوع والرسالة.');setSubmitting(true);const number=`SUP-${Date.now().toString().slice(-6)}`;app.mutate(d=>({...d,tickets:[{id:id('ticket'),number,category:category.trim(),subject:subject.trim(),message:message.trim(),image,status:'open',createdAt:new Date().toISOString()},...d.tickets]}));setCategory('');setSubject('');setMessage('');setImage(undefined);setSubmitting(false);Alert.alert('تم استلام رسالتك',`رقم التذكرة التجريبية: ${number}`)};
  return <Screen title="الدعم"><Field label="تصنيف الدعم *" value={category} onChangeText={setCategory}/><Field label="الموضوع *" value={subject} onChangeText={setSubject}/><Field label="الرسالة *" multiline value={message} onChangeText={setMessage}/>{image?<Pressable onPress={()=>setImage(undefined)}><Image source={{uri:image}} style={{width:110,height:110,borderRadius:14,alignSelf:'flex-end'}}/><Text style={ui.muted}>اضغط على الصورة لإزالتها</Text></Pressable>:<Button title="إرفاق صورة اختيارية" variant="secondary" onPress={pick}/>}<Button title={submitting?'جاري الإرسال...':'إرسال التذكرة'} disabled={submitting} onPress={submit}/><Text style={ui.h2}>التذاكر السابقة</Text>{app.data.tickets.map(t=><Card key={t.id}><Text style={ui.h2}>{t.number} • {t.subject}</Text><Text style={ui.muted}>{t.category} • قيد المتابعة (محاكاة){t.image?' • مرفق صورة':''}</Text></Card>)}</Screen>
}
