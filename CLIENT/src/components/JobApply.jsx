import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../style/applypage.css'

const JobApply = () => {
  const { jobId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('jobId', jobId);
    data.append('resume', formData.resume);

    try {
      const response = await axios.post('http://localhost:3001/jobs/apply', data);
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application');
    }
  };

  return (
    <div className='container'>
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="file" name="resume" onChange={handleFileChange} required />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default JobApply;
