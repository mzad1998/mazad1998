import {Stack} from 'expo-router'; import {I18nManager} from 'react-native'; import {SafeAreaProvider} from 'react-native-safe-area-context'; import {AppProvider} from '@/services/AppProvider'; I18nManager.allowRTL(true);
export default function Layout(){return <SafeAreaProvider><AppProvider><Stack screenOptions={{headerShown:false,animation:'slide_from_left'}}/></AppProvider></SafeAreaProvider>}
