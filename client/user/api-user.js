//create-->take user data from the view component
//fetch-->to make a POST call at the create API route, '/api/users', to create a new user in the backend with the privided data
//we return the response from the server as apromise.
const create = async (user) => {
  try {
      let response = await fetch('/api/users/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
      })
      return await response.json()
  } catch(err) {
  console.log(err)
  }
}
// make a GET call to retrieve all the users in the database, 
// and then return the response from the server as a promise to the component.
const list = async (signal) => {
  try {
      let response = await fetch('/api/users/', {
          method: 'GET',
          signal: signal,
      })
      return await response.json()
  } catch(err) {
      console.log(err)
  }
}

//to make a GET call to retrieve a specific user by ID
const read = async (params, credentials, signal) => {
  try {
  let response = await fetch('/api/users/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
      }
  })
  return await response.json()
  } catch(err) {
      console.log(err)
  }
}

// The update method will take changed user data from the view component for a
// specific user, then use fetch to make a PUT call to update the existing user in the
// backend. This is also a protected route that will require a valid JWT as the credential.
const update = async (params, credentials, user) => {
  try {
      let response = await fetch('/api/users/' + params.userId, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              //'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + credentials.t
          },
          body: JSON.stringify(user)
      })
  return await response.json()
  } catch(err) {
      console.log(err)
  }
}

//to delete a specific user from the database and use fetch to make a DELETE call.
const remove = async (params, credentials) => {
  try {
      let response = await fetch('/api/users/' + params.userId, {
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + credentials.t
          }
      })
      return await response.json()
  } catch(err) {
      console.log(err)
  }
}

export { create, list, read, update, remove }