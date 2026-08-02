import {useState} from 'react';
import {Image,Text,View} from 'react-native';
import {router} from 'expo-router';
import {Button,Card,Empty,Screen,ui} from '@/components/ui';
import {categoryLabels} from '@/constants/theme';
import {useApp} from '@/services/AppProvider';

export default function RequestReview(){
  const app=useApp();
  const [submitting,setSubmitting]=useState(false);
  const draft=app.draft;
  if(!draft)return <Screen title="مراجعة الطلب"><Empty title="لا يوجد طلب للمراجعة" body="ارجع واختر نوع الخدمة ثم اكتب التفاصيل."/><Button title="العودة للرئيسية" onPress={()=>router.replace('/home')}/></Screen>;
  const vehicle=app.data.vehicles.find(v=>v.id===draft.vehicleId);
  const submit=()=>{if(submitting)return;setSubmitting(true);const request=app.submitRequest(draft);router.replace(`/requests/${request.id}`)};
  return <Screen title="راجع طلبك قبل الإرسال"><Card><Text style={ui.h2}>{categoryLabels[draft.category]}</Text><Text style={ui.muted}>السيارة: {vehicle?`${vehicle.make} ${vehicle.model} • ${vehicle.year}`:'غير متاحة'}{`\n`}الزبون: {app.data.customer?.name}{`\n`}المنطقة: {app.data.customer?.area}{`\n\n`}{Object.values(draft.details).filter(Boolean).join('\n')}</Text></Card>{draft.images.length>0&&<View style={{flexDirection:'row-reverse',gap:8,flexWrap:'wrap'}}>{draft.images.map(image=><Image key={image.id} source={{uri:image.uri}} style={{width:92,height:92,borderRadius:14}}/>)}</View>}<Button title="تعديل الطلب" variant="secondary" onPress={()=>router.back()}/><Button title={submitting?'جاري إرسال الطلب...':'إرسال الطلب'} disabled={submitting} onPress={submit}/></Screen>
}
