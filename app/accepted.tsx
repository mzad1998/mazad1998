import {Text} from 'react-native';
import {router} from 'expo-router';
import {Button,Card,Empty,Screen,ui} from '@/components/ui';
import {useApp} from '@/services/AppProvider';
import {workshops} from '@/mocks/workshops';
export default function Accepted(){const{data}=useApp();return <Screen title="العروض المقبولة">{data.acceptedOffers.length===0?<Empty title="لا توجد عروض مقبولة" body="بعد مقارنة العروض وقبول أحدها سيظهر هنا."/>:data.acceptedOffers.map(a=>{const offer=data.offers.find(o=>o.id===a.offerId);const workshop=workshops.find(w=>w.id===offer?.workshopId);return <Card key={a.id}><Text style={ui.h2}>{workshop?.name??'ورشة غير متاحة'}</Text><Text style={ui.muted}>{offer?.priceMin.toLocaleString('ar-IQ')} د.ع • {new Date(a.acceptedAt).toLocaleDateString('ar-IQ')}</Text>{offer&&<Button title="فتح العرض" onPress={()=>router.push(`/offers/${offer.id}`)}/>}</Card>})}</Screen>}
