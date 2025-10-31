import React, { useState } from 'react'
import axios from 'axios'

function Register() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      phoneNumber,
      email,
    };

    axios.post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    setPhoneNumber('');
    setEmail('');
  };

  return (
    <div>
      <h3>Register New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            id="phoneNumber"
            type="text"
            required
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            required
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Register" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default Register
