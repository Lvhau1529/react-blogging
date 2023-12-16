import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCqBp481PhDnbtdlovMBOGMprmfQs7OEZ4',
  authDomain: 'monkey-blogging-b36aa.firebaseapp.com',
  projectId: 'monkey-blogging-b36aa',
  storageBucket: 'monkey-blogging-b36aa.appspot.com',
  messagingSenderId: '411708734219',
  appId: '1:411708734219:web:266d029977397ad26f400e'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {app, db, auth}
