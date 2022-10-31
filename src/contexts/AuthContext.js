//We will creat a React Context in this file that will house all authentication info (currentUser, loging, logout). React contexts allow us to store information and transport that info to the components that use it. We could store this info in the App component and just pass props to send the user information to other components but this isn't ideal for larger apps. Instead, we create the context and a component that will communicate this context to its children. Think of this much like Session storage in a .NET application.
import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../base'//gives us access to the auth object which initializes authentication (who are you?)
//Below are firebase functions we need to use in our logic below (in the component portion of the code)
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

//Below we create a context (storage object) for all of our auth info
const AuthContext = React.createContext()

//Below we create a function that will allow us to use the context in components. We will import this function any time
//we want the currentUser, login, or logout functionality.
export function useAuth() {
    return useContext(AuthContext)
}

//This component will provide the AuthContext info to the children components nested inside of it. See App.js where we call to an instance of this component and nest all other components inside of it. We renamed AuthContext below to AuthProvider to differentiate it from the context storage object above (AuthContext)
export default function AuthProvider({children}) {

    //Create hooks for currentUser and another custom hook to determine if the context has info to share with child
    //components before rendering the child components to the screen.
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    //login functionality
    //Instantiate a GithutAuthProvider object
    const gethubAuthProvider = new GithubAuthProvider()

    async function login() {
        return (signInWithPopup(auth, gethubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user)//if we were using a backend we could save the user to a database
            //Here we could add some functionality to save the user to a db or decide a default role for them
        }))
    }

    //Logout functionality
    async function logout() {
        signOut(auth).then(setCurrentUser(null))
    }

    //Below we write an object to hold currentUser info an login/out functions so we can use them in child components.
    //We will pass this as a prop in the return further below.
    const value = {currentUser, login, logout}

    useEffect(() => {
        //authChange will use firebase functionality to get user info, set the currentUser hook to the value retrieved,
        //and allow components to load in using the custom hook (loading).
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange
    }, [])

  return (
    <AuthContext.Provider value={value}>
        {/* Below we are waiting for the AuthContext info to populate before loading the child components in the UI */}
        {!loading && children}
    </AuthContext.Provider>
  )
}
