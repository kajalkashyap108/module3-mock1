import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddEmployeeForm.css';

const AddEmployeeForm = ({ onAddEmployee }) => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { name, designation, department };
    axios.post('https://mock-back-lnig.onrender.com/employees', newEmployee)
      .then((response) => {
        onAddEmployee(response.data);  // Use the data from backend for new employee
        setName('');  // Clear input fields
        setDesignation('');
        setDepartment('');
      })
      .catch((error) => console.error('Error adding employee:', error));
  };
  

  return (
    <form onSubmit={handleSubmit} className="add-employee-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        required
      />
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        required
      >
        <option value="">Select Department</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
      </select>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
