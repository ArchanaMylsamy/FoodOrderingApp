import React, { useState ,useRef} from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import classes from './RegistrationForm.module.css'; // Update with your CSS module file

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', formData);
      if (response.data && response.data.token) {
        console.log('Registration successful:', response.data);
        window.alert('Registration sucessfull');
  
        // If your backend returns a token upon registration, you can store it in local storage
        localStorage.setItem('token', response.data.token);
        sendConfirmationEmail(formData); // Call the sendConfirmationEmail function here

        // Redirect or perform any other action after successful registration
      } else {
        console.error('Registration failed: Invalid response from server');
        // Handle the case when response.data or response.data.token is undefined
      }
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        console.log('Backend Error Response:', error.response.data);
      }
    }
  };
  const sendConfirmationEmail = (formData) => {
    emailjs
      .send(
        'service_m1bxzi1', // Replace with your service ID
        'template_skxsr1q', // Replace with your template ID
        {
          name: formData.name,
          email: formData.email,
          // Add any additional template parameters here
        },
        'PIK9JWeA8QTUpjCpz' // Replace with your user ID
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
        },
        (error) => {
          console.error('Email sending error:', error.text);
        }
      );
  };
  

  return (
    <form className={classes.registrationForm} onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className={classes.formControl}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formControl}>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegistrationForm;
