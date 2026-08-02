import {useState} from 'react';
import {Alert,Image,Pressable,Text,View} from 'react-native';
import {router,useLocalSearchParams} from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import {Button,Card,Field,Screen,ui} from '@/components/ui';
import {categoryLabels} from '@/constants/theme';
import {ServiceCategory} from '@/types';
import {useApp} from '@/services/AppProvider';
import {id} from '@/services/domain';

type Definition=readonly [string,string,boolean?];
const config:Record<ServiceCategory,readonly Definition[]>={
 maintenance:[['system','النظام الرئيسي *'],['description','وصف المشكلة *',true],['area','منطقة بغداد *'],['location','وصف الموقع — اختياري'],['time','الوقت المفضل *'],['notes','ملاحظات — اختياري',true]],
 parts:[['partName','اسم القطعة *'],['description','وصف القطعة *',true],['condition','جديدة أو مستعملة *'],['origin','أصلية أو بديلة *'],['quantity','الكمية *'],['area','منطقة بغداد *'],['notes','ملاحظات — اختياري',true]],
 mobile:[['system','فئة المشكلة *'],['description','وصف المشكلة *',true],['area','الموقع أو منطقة بغداد *'],['time','الوقت المفضل *'],['notes','ملاحظات — اختياري',true]],
 crane:[['pickup','موقع سحب السيارة *'],['destination','الوجهة *'],['condition','حالة السيارة *'],['locationNotes','ملاحظات الموقع — اختياري'],['phone','رقم هاتف العميل *'],['description','ملاحظات إضافية *',true]],
 wash:[['washType','نوع الغسل *'],['area','منطقة الخدمة *'],['time','الوقت المفضل *'],['description','تفاصيل الطلب *',true]],
 accessories:[['name','اسم الكمالية أو الإضافة *'],['description','وصف المطلوب *',true],['condition','جديد أو مستعمل *'],['area','منطقة بغداد *'],['notes','ملاحظات — اختياري',true]],
};
const systems=['المحرك','ناقل الحركة','الكهرباء','الفرامل','نظام التعليق','التبريد والتكييف','الإطارات','الصيانة الدورية','أخرى'];
export default function RequestForm(){
 const{category}=useLocalSearchParams<{category:string}>();const cat=(category&&category in config?category:'maintenance') as ServiceCategory;const app=useApp();
 const[vehicleId,setVehicleId]=useState(app.draft?.category===cat?app.draft.vehicleId:app.data.vehicles[0]?.id??'');const[fields,setFields]=useState<Record<string,string>>(app.draft?.category===cat?app.draft.details:{});const[images,setImages]=useState<string[]>([]);const[error,setError]=useState('');const defs=config[cat];
 const pick=async()=>{if(images.length>=3)return Alert.alert('الحد الأقصى','يمكن إرفاق ثلاث صور فقط.');const perm=await ImagePicker.requestMediaLibraryPermissionsAsync();if(!perm.granted)return Alert.alert('تعذر الوصول','يمكنك المتابعة دون صور أو منح الإذن من إعدادات الجهاز.');const r=await ImagePicker.launchImageLibraryAsync({quality:.55});if(!r.canceled)setImages(x=>[...x,r.assets[0]!.uri])};
 const review=()=>{if(!vehicleId)return setError('اختر سيارة أو أضف سيارة أولاً');if(defs.filter(x=>x[1].includes('*')).some(([k])=>!fields[k]?.trim()))return setError('أكمل جميع الحقول المطلوبة');const details=Object.fromEntries(Object.entries(fields).map(([k,v])=>[k,v.trim()]));app.setDraft({category:cat,vehicleId,description:(details.description||details.name||details.partName||'طلب خدمة').trim(),details,images:images.map(uri=>({id:id('image'),uri}))});router.push('/request/review')};
 return <Screen title={`طلب ${categoryLabels[cat]}`}><Text style={ui.h2}>١. اختر السيارة</Text>{app.data.vehicles.map(v=><Pressable key={v.id} onPress={()=>setVehicleId(v.id)}><Card style={vehicleId===v.id?{borderWidth:2,borderColor:'#087E8B'}:{}}><Text style={ui.h2}>{v.nickname||`${v.make} ${v.model}`} {vehicleId===v.id?'✓':''}</Text><Text style={ui.muted}>{v.year} • {v.transmission}</Text></Card></Pressable>)}<Button title="إضافة سيارة جديدة" variant="secondary" onPress={()=>router.push('/vehicles/edit')}/><Text style={ui.h2}>٢. تفاصيل الطلب</Text>{cat==='maintenance'?<><Text style={ui.muted}>اختر نظاماً رئيسياً ثم اشرح المشكلة:</Text><View style={{flexDirection:'row-reverse',flexWrap:'wrap',gap:7}}>{systems.map(x=><Pressable key={x} onPress={()=>setFields({...fields,system:x})} style={{padding:10,borderRadius:12,backgroundColor:fields.system===x?'#087E8B':'#DFF4F3'}}><Text style={{color:fields.system===x?'white':'#102A43'}}>{x}</Text></Pressable>)}</View></>:null}{defs.filter(([k])=>!(cat==='maintenance'&&k==='system')).map(([key,label,multi])=><Field key={key} label={label} multiline={multi} value={fields[key]??''} onChangeText={x=>setFields({...fields,[key]:x})}/>)}<Text style={ui.h2}>٣. صور اختيارية ({images.length}/٣)</Text><View style={{flexDirection:'row-reverse',gap:8,flexWrap:'wrap'}}>{images.map(uri=><Pressable key={uri} onPress={()=>setImages(x=>x.filter(y=>y!==uri))}><Image source={{uri}} style={{width:80,height:80,borderRadius:12}}/><Text style={ui.muted}>اضغط للحذف</Text></Pressable>)}</View><Button title="اختيار صورة" variant="secondary" onPress={pick}/>{error?<Text style={{color:'#D64545',textAlign:'right'}}>{error}</Text>:null}<Button title="مراجعة الطلب" onPress={review}/></Screen>
}
