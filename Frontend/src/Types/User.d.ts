export interface User {
    money : number;
    name: string;
    picture: string;
    email : string;
    _id : string;
    role : string;
  };

export const EmptyUser:User = {
  name: 'Visarut Tachatanachai',
  picture: 'https://picsum.photos/200/200',
  money: 50000,
  email : '61011358@kmitl.ac.th',
  _id : '60a819acd312d800becfaa63',
  role : 'customer',

};

export default User;
  