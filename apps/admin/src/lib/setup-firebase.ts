// Import Firebase SDKs
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import * as config from '../../firebase_config.json'

const FirebaseApp = initializeApp(config)
const FirebaseStorage = getStorage(FirebaseApp)
const FireStore = getFirestore(FirebaseApp)

export { FirebaseApp, FirebaseStorage, FireStore }
