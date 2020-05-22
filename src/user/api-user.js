const formData= new FormData();

const create = (user) => {
    console.log('hello');
   
    console.log(user.body)
    return fetch('http://localhost:5000/api/users/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
  }
  
  const list = () => {
    return fetch('http://localhost:5000/api/users', {
      method: 'GET',
    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
  const read = (params, credentials) => {
    return fetch('http://localhost:5000/api/users' + params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
  const update = (params, credentials, user) => {
    return fetch('http://localhost:5000/api/users' + params.userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: user
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const remove = (params, credentials) => {
    return fetch('http://localhost:5000/api/users' + params.userId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
  
  
  export {
    create,
    list,
    read,
    update,
    remove
    
  }
  