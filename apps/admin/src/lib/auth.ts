import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { GoogleAuthResponse } from '../types/response'
import { transformGoogleUser } from '../utils/user'
import { FirebaseApp } from './setup-firebase'

const GoogleProvider = new GoogleAuthProvider()

export const signInGoogle = async () => {
  const auth = getAuth(FirebaseApp)
  let response: GoogleAuthResponse = {
    errorCode: '',
    data: null,
  }

  try {
    const signInResponse = await signInWithPopup(auth, GoogleProvider)
    const { user } = signInResponse
    const data = transformGoogleUser(user)

    response = {
      errorCode: '',
      data,
    }

    return response
  } catch (err: any) {
    const errorCode = err.code
    response = {
      errorCode,
      data: null,
    }
  }
}
