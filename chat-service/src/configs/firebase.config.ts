import { app } from 'firebase-admin';
import * as admin from "firebase-admin";
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from './firebase-adminsdk.json';

export const initialize = () => {
  console.log('initializing app');

  const firebaseApp: app.App = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: "https://next-chat-a310c-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
  
  try {
    const db =  admin.database(firebaseApp);
    return db;
  } catch (ex) {
    console.error('firebase initialization failed ex:', ex);
    return null;
  }

}
