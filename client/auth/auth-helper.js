//to store and retrieve JWT credentials from client-side sessionStorage , 
//and also clear out the sessionStorage on user sign-out.
import { signout } from './api-auth.js'

const auth = {
    //to save the JWT credentials that are received from the server 
    //on successful sign-in, we use the authenticate method
    authenticate(jwt, cb) {
        if(typeof window !== "undefined")
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        cb()
    },

    //to retrieve the stored credentials to check if the current user is signed in
    isAuthenticated() {
        if (typeof window == "undefined")
            return false
        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else
        return false
    },

    //When a user successfully signs out from the application, we want to clear the stored JWT credentials from sessionStorage
    clearJWT(cb) {
        if(typeof window !== "undefined")
            sessionStorage.removeItem('jwt')
        cb()
        signout().then((data) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        })
    }
}

export default auth