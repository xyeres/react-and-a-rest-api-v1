import config from './config';

export default class Data {
  /**
    * API interface method that allows any component to make a request to the API
    * Handles authentication and sets basic-auth credentials if necessary
    * @returns fetch(url, options) 
  */
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    // Check if auth is required
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;

    }
    return fetch(url, options);
  }

  // Creates a course by posting data to the request body
  async createCourse(emailAddress, password, course) {
    const response = await this.api(`/courses`, 'POST', course, true, { emailAddress, password });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      let err = new Error();
      err.status = response.status;
      throw err;
    }
  }

  // Update a course
  async updateCourse(emailAddress, password, course, id) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      let err = new Error();
      err.status = response.status;
      throw err;
    }
  }

  // Deletes a course using a DELETE request to the API
  async deleteCourse(emailAddress, password, id) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    }
    else {
      let err = new Error();
      err.status = response.status;
      throw err;
    }
  }

  // Get a course and return it as json
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      let err = new Error();
      err.status = response.status;
      throw err;
    }
  }

  // Get all courses and return it as json
  async getCourses() {
    const response = await this.api(`/courses`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      let err = new Error();
      err.status = response.status;
      throw err;
    }
  }

  // Get a user, for signin 
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  
  // Create a user on the DB
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      let err = new Error();
      err.status = response.status;
      throw err;
    }
  }
}