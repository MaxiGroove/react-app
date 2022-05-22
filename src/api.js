const url = 'http://93.95.97.34/api'

const request = async (url, method = 'GET', body) => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-type': 'application/json',
      })
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message)
    }
    
    return data
  } catch (e) {
    throw e
  }
}

// Comments //

export const getComment = (id) => {
  return request(`${url}/comments/${id}`);
}

export const addComment = (data) => {
  return request(`${url}/comments/createOrEdit`, 'PUT', data)
}

export const deleteComment = (id) => {
  return request(`${url}/comments/${id}`, 'DELETE')
}

// Tasks //
export const getTasks = (filterTask, pagination) => {
  return request(`${url}/tasks`, 'POST', { "filter": {...filterTask}, "page": pagination.page, "limit": pagination.limit });
}

export const getTask = (id) => {
  return request(`${url}/tasks/${id}`);
}

export const deleteTask = (id) => {
  return request(`${url}/tasks/${id}`, 'DELETE');
}

export const changeStatus = (id, status) => {
  return request(`${url}/tasks/${id}/status/${status}`, 'PATCH');
}

export const addWorkTime = (id, data) => {
  return request(`${url}/tasks/${id}/worktime`, 'PATCH', data);
}

export const addOrEditTask = (data) => {
  return request(`${url}/tasks/createOrEdit`, 'PUT', data);
}

// Users //
export const getUsersFilter = (usersFilter, pagination) => {
  return request(`${url}/users`, 'POST', { "filter": {...usersFilter}, "page": pagination.page, "limit": pagination.limit })
}

export const getUsers = () => {
  return request(`${url}/users/all`);
}

export const getUser = (id) => {
  return request(`${url}/users/${id}`)
}

export const editUser = (data) => {
  const userData = {
    ...data,
    password: localStorage.getItem('password'),
  }
  return request(`${url}/users/edit`, 'PUT', userData);
}

export const loginUser = (login, password) => {
  return request(`${url}/users/login`, 'POST', {login, password});
}

export const deleteUser = (id) => {
  return request(`${url}/users/${id}`, 'DELETE');
}
