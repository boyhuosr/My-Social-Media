//to integrate the auth API endpoints from the server with the frontend React components

//The signin method will take user sign-in data from the view component, then use
//fetch to make a POST call to verify the user with the backend.

const signin = async (user) => {
    try {
        let response = await fetch('/auth/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

//to make a GET call to the signout API endpoint on the server.
const signout = async () => {
    try {
        let response = await fetch('/auth/signout/', { method: 'GET' })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

export { signin, signout }