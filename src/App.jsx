import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeTable from './components/EmployeeTable';
import AddEmployeeForm from './components/AddEmployeeForm';
import FilterDropdown from './components/FilterDropdown';
import './App.css'; // Ensure to import App.css for styling

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('');

  useEffect(() => {
    axios.get('https://mock-back-lnig.onrender.com/employees')
      .then((response) => {
        console.log('API Response:', response.data); // Check the response data
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch((err) => {
        console.error("Full error:", err);
      });
  }, []);
  

  const handleAddEmployee = (newEmployee) => {
    setEmployees(prevEmployees => [...prevEmployees, newEmployee]); 
    setFilteredEmployees(prevEmployees => [...prevEmployees, newEmployee]);
  };
  

  const handleDeleteEmployee = (id) => {
    axios.delete(`https://mock-back-lnig.onrender.com/employees/${id}`)
      .then(() => {
        const updatedEmployees = employees.filter(emp => emp.id !== id);
        setEmployees(updatedEmployees);
        setFilteredEmployees(updatedEmployees);
      })
      .catch((error) => console.error('Error deleting employee:', error));
  };

  const handleFilterChange = (department) => {
    setDepartmentFilter(department);
    if (department) {
      setFilteredEmployees(employees.filter(emp => emp.department === department));
    } else {
      setFilteredEmployees(employees);
    }
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Close Add Employee Form' : 'Add Employee'}
      </button>
      {showAddForm && <AddEmployeeForm onAddEmployee={handleAddEmployee} />}
      <FilterDropdown onFilterChange={handleFilterChange} />
      <EmployeeTable employees={filteredEmployees} onDelete={handleDeleteEmployee} />
    </div>
  );
};

export default App;
