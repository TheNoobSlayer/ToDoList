const signin = (user) => {
    return fetch('http://localhost:5000/auth/user/signin/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'omit',
        body: JSON.stringify(user)
      })
      .then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
  }
  
  const signout = () => {
    return fetch('http://localhost:5000/auth/user/signout/', {
      method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
  }
  
  export {
    signin,
    signout
  }
  