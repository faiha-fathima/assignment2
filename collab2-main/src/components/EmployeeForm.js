import React, { useState } from 'react';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 
    alert("Form submitted! Check console for data.");
    setFormData({ name: '', designation: '', location: '', salary: '' });
  };

  return (
    <div className="container">
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Designation</label>
        <input type="text" name="designation" value={formData.designation} onChange={handleChange} required />

        <label>Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Salary</label>
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
