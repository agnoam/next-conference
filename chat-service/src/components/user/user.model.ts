import { CollectionsNames } from "../../utils/consts";

export interface InputUserData {
    email: string;
    username: string;
    password: string;
    name: string;
    profileImage: string;
    date?: number;
}

// Firebase way
// export interface User {
//     email: string;
//     username: string;
//     password: string;
//     name: string;
//     profileImage: string;
//     date: number;
// }