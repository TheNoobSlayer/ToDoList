import queryString from 'query-string'
const create = (params, credentials, task) => {
  console.log("Inside api-task create")
  return fetch('http://localhost:5000/api/tasks/by/'+ params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(task)
    })
    .then((response) => {
      console.log(response);
      return response.json()
    }).catch((err) => console.log(err))
}

const read = (params,credentials) => {
  return fetch('/api/tasks/' + params.userId + '/' +params.taskId, {
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

const update = (params, credentials, task) => {
  return fetch('http://localhost:5000/api/tasks/' + params.userId +'/'+params.taskId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(task)
  }).then((response) => {
    console.log(response);
    return response.json()
  }).catch((err) => {
    console.log(err);
  })
}

const remove = (params, credentials) => {
  console.log(params);
  console.log(credentials);
  return fetch('http://localhost:5000/api/tasks/' + params.userId +'/'+params.taskId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    console.log(response);
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const taskByUser = (params,credentials) => {
  
  return fetch('http://localhost:5000/api/tasks/by/'+params.userId, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const taskByLabel = (params,credentials,task) => {
    return fetch('http://localhost:5000/api/tasks/by/labels/'+params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(task)
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }

  const taskByPriority = (params,credentials,task) => {
    console.log("Bochya inside taskByPriority")
    return fetch('http://localhost:5000/api/tasks/by/priority/'+params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(task)
    }).then((response) => {
      console.log(response);
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }

  const taskByDueDate = (params,credentials) => {
    return fetch('http://localhost:5000/api/tasks/by/dueDate/'+params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }

  const taskByStatus = (params,credentials,task) => {
    return fetch('http://localhost:5000/api/tasks/by/status/'+params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(task)
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }



const list = (params) => {
  const query = queryString.stringify(params)
  return fetch('/api/products?'+query, {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

export {
  create,
  read,
  update,
  remove,
  taskByUser,
  taskByLabel,
  taskByPriority,
  taskByStatus,
  taskByDueDate,
  list
}
