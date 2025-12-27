import { useState } from "react";
import "./dashboard.css";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.subject || !formData.email || !formData.role) {
      alert("Please fill all fields");
      return;
    }

    setTeachers([...teachers, formData]);
    setFormData({ name: "", subject: "", email: "", role: "" });
  };

  const deleteTeacher = (index) => {
    setTeachers(teachers.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Manage Teachers</h2>

      {/* Add Teacher Form */}
      <form className="teacher-form" onSubmit={handleAddTeacher}>
        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="Teacher">Teacher</option>
          <option value="HOD">HOD</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit">Add Teacher</button>
      </form>

      {/* 👇 Teachers List (submit button ke niche) */}
      <table className="teacher-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No teachers added yet
              </td>
            </tr>
          ) : (
            teachers.map((t, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{t.name}</td>
                <td>{t.subject}</td>
                <td>{t.email}</td>
                <td>{t.role}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTeacher(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTeachers;
