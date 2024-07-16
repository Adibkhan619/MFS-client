
import { createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
//   updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import axios from 'axios'
// import toast from 'react-hot-toast'
// import axios from 'axios'

export const AuthContext = createContext(null)
const auth = getAuth(app)


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }


  const logOut = async () => {
    setLoading(true)
    const { data } = await axios(`/logout`, {
      withCredentials: true,
    })
    console.log(data)
    // toast.success('Logged Out')
    return signOut(auth)
  }


  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    //   console.log( currentUser)
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
