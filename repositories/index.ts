import {Advertisement,AppData,AppNotification,Customer,Rating,RequestDraft,ServiceRequest,SupportTicket,Vehicle,WorkshopOffer} from '@/types';

/** عقود مصدر البيانات؛ التنفيذ المحلي الحالي خلف AppProvider ويمكن استبداله دون تغيير الشاشات. */
export interface AuthenticationRepository { loadSession():Promise<AppData['auth']>; requestOtp(phone:string):Promise<void>; verifyOtp(phone:string,code:string):Promise<boolean>; logout():Promise<void> }
export interface CustomerRepository { get():Promise<Customer|null>; save(profile:Customer):Promise<void> }
export interface VehicleRepository { list():Promise<Vehicle[]>; save(vehicle:Vehicle):Promise<void>; remove(id:string):Promise<void> }
export interface RequestRepository { list():Promise<ServiceRequest[]>; create(draft:RequestDraft):Promise<ServiceRequest>; cancel(id:string):Promise<void> }
export interface OfferRepository { forRequest(requestId:string):Promise<WorkshopOffer[]>; acceptOnce(offerId:string):Promise<void> }
export interface NotificationRepository { list():Promise<AppNotification[]>; markRead(id:string):Promise<void>; markAllRead():Promise<void> }
export interface RatingRepository { forRequest(requestId:string):Promise<Rating|undefined>; create(rating:Rating):Promise<void> }
export interface AdvertisementRepository { active():Promise<Advertisement|undefined> }
export interface SupportRepository { create(ticket:SupportTicket):Promise<void> }
