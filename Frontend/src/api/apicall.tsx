import axiosInstance from './axiosinstance';
import { AxiosResponse } from 'axios';

export interface IPlaceOrderRequest {
  shopId: string;
  userId: string;
  shop : string;
  area : string;
  orderList: any[];
  recieveTime : any;
}

export interface IGetQueueRequest {
  id: string;
}

export interface IGetHistoryRequest {
  id: string;
}

//FIXME : Add interface
export interface IplaceOrderResponse {
  Data: string;
}

export interface ICreateStoreRequest {
  shop: string;
  ownerId: string;
  area: string;
  status: string;
  menuImage: any[];
  file: any;
  menu: {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    img: string;
  }[];
}

export interface ItopUpRequest {
  amount: string;
}

export interface IdeleteStore {
  id: string;
}

export interface IgetMyStoreRequest {
  id: string;
}

export interface ICreateStoreResponse {
  Data: string;
}

export interface IGetQueueResponse {
  data: any;
}

export interface IGetQueueSellerResponse {
  Data: string;
}

export interface ItopUpResponse {
  Data: string;
}

export interface IsetOpenAndClose {
  Data: string;
}

export interface IGetUserInfoResponse {
  money: number;
  name: string;
  picture: string;
  email: string;
  user_id: string;
  roles: string;
}

export interface IgetMyStoreResponse {
  data: Imystore[];
}

export interface IUpdateMyStoreResponse {
  data: string;
}

export interface IGetHistoryResponse {
  data: {
    data : string;
  };
}

export interface Imystore {
  _id: string;
  area: string;
  menu: any;
  ownerId: string;
  shop: string;
  status: string;
  name: string;
  data : string;
}

export interface IchangeStatusResponse {
  data : string;
}

export interface IdeleteOrder {
  data : string;
}

export const placeOrder = async (
  json: IPlaceOrderRequest
): Promise<AxiosResponse<IplaceOrderResponse>> => {
  console.log(json);
  const res = await axiosInstance.post('/api/orders/customer', json);
  return res;
};

export const fetchKiosks = async (): Promise<any> => {
  const res = await axiosInstance.get('/api/shops/customer');
  // console.log(res);
  return res;
};

export const createStore = async (
  store: ICreateStoreRequest
): Promise<AxiosResponse<ICreateStoreResponse>> => {
  console.log('Store : ', store);
  const response = await axiosInstance.post('/api/shops/frontstore', store);

  return response;
};

export const getQueueCustomer = async (
  id : string
): Promise<AxiosResponse<IGetQueueResponse>> => {
  const path = '/api/orders/queue/customer/' + id
  const res = await axiosInstance.get(path);
  return res.data;
};

export const getQueueSeller = async (
  id: string
): Promise<AxiosResponse<IGetQueueSellerResponse>> => {
  const path = '/api/orders/queue/frontstore/' + id
  // const path = '/api/queue/frontstore/' + id
  // console.log('path : ', path);
  const res = await axiosInstance.get(path);
  return res.data;
};
// FIXME : tmr will do
export const getHistory = async (
  id: string,
  role: string
): Promise<AxiosResponse<IGetHistoryResponse>> => {
  // const path = '/api/orders/record/' + role + '/' + id;
  const path = '/api/orders/record/' + role + '/' + id
  console.log(path)
  const res = await axiosInstance.get(path);
  return res;
};

export const getUserInfo = async (): Promise<
  AxiosResponse<IGetUserInfoResponse>
> => {
  const res = await axiosInstance.get('/oauth/user/info');
  return res;
};

export const getMyStore = async (
  id: string
): Promise<AxiosResponse<IgetMyStoreResponse>> => {
  const path = '/api/shops/frontstore/' + id;
  const res = await axiosInstance.get(path);

  return res;
};

export const updateMyStore = async (
  newkiosk: Imystore
): Promise<AxiosResponse<IUpdateMyStoreResponse>> => {
  const path = '/api/shops/frontstore';
  const res = await axiosInstance.put(path, newkiosk);
  return res;
};

export const deleteStore = async (
  id: string
): Promise<AxiosResponse<IdeleteStore>> => {
  const path = '/api/shops/frontstore/' + id;
  const res = await axiosInstance.delete(path);
  return res;
};

export const payMoney = async (
  amount: string
): Promise<AxiosResponse<ItopUpResponse>> => {
  const path = '/oauth/pay/' + amount;
  const res = await axiosInstance.put(path);
  return res;
};

export const topUp = async (
  amount: string
): Promise<AxiosResponse<ItopUpResponse>> => {
  const path = '/oauth/topup/' + amount;
  // console.log(path);
  const res = await axiosInstance.put(path);
  return res;
};

export const setOpenCloseStore = async (
  status: string,
  shopId: string,
  ownerId: string
): Promise<AxiosResponse<IsetOpenAndClose>> => {
  const path = '/api/shops/frontstore/' + status;
  const data = {
    _id: shopId,
    ownerId: ownerId,
  };
  // console.log('path : ', path);
  // console.log('data : ', data);
  const res = await axiosInstance.put(path, data);
  return res;
};

export const changeStatus = async (orderId : string, status : string ) : Promise<AxiosResponse<IchangeStatusResponse>> => {
  const path = '/api/orders/frontstore/' + orderId + '/' + status
  const res = await axiosInstance.put(path)
  return res;
}

export const deleteOrder = async (cmd : string, id : string ) : Promise<AxiosResponse<IdeleteOrder>> => {
  const path = '/api/orders/' + cmd + '/' + id
  const res = await axiosInstance.delete(path)
  return res;
}