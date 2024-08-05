import * as sdk from 'node-appwrite'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' });
export const env= {
    PROJECT_ID: '668cd73f003694ba9bdf',
    API_KEY:  'e6cc7964cebae8fa6afa0bbe5bb6843bcd058908932e9839411b9290772f4b2f1745fd365c767b3506aa8c3a81379cebaffe75a825268f21d8b19f948f334604124810ca67683c1763b91af7fe1b18255a9a1162eeb1de574587bdfb572e1fc7af3671a4338bdb20203a2ac9036c7a9e0fa002c1dfe04d99dc0de3c2f7ea716b',
    DATABASE_ID: '668ece0d000350aa1885',
    PATIENT_COLLECTION_ID : '668ece7a0034531175b9',
    DOCTOR_COLLECTION_ID : '668eced0001df890030d',
    APP_COLLECTION_ID : '668ecf16000250c5fde9',
    NEXT_PUBLIC_BUCKET_ID: '668ecf91002a64e51606',
    NEXT_PUBLIC_ENDPOINT: 'https://cloud.appwrite.io/v1'
    
}
const client= new sdk.Client()
console.log("ENV", process.env);

client.setEndpoint(env.NEXT_PUBLIC_ENDPOINT!)
.setProject(env.PROJECT_ID!)
.setKey(env.API_KEY!)

export const databases = new sdk.Databases(client)
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
