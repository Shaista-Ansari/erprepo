import { useState } from "react";
import "./dashboard.css";

const ResultTable = () => {
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("All");
  const [category, setCategory] = useState("All");

  const results = [
    {
      rollNo: "101",
      studentName: "Ayesha Khan",
      subject: "Database Management",
      semester: "Sem 5",
      category: "Regular",
      marks: 78,
      total: 100,
    },
    {
      rollNo: "102",
      studentName: "Shaista Ansari",
      subject: "Web Technologies",
      semester: "Sem 5",
      category: "ATKT",
      marks: 45,
      total: 100,
    },
    {
      rollNo: "103",
      studentName: "Zara Sheikh",
      subject: "Operating System",
      semester: "Sem 6",
      category: "Regular",
      marks: 62,
      total: 100,
    },
  ];

  const percentage = (m, t) => ((m / t) * 100).toFixed(1);

  const grade = (p) => {
    if (p >= 75) return "A";
    if (p >= 60) return "B";
    if (p >= 40) return "C";
    return "F";
  };

  // 🔍 Search + Semester + Category Filter
  const filteredResults = results.filter((r) => {
    const matchSearch =
      r.rollNo.includes(search) ||
      r.studentName.toLowerCase().includes(search.toLowerCase());

    const matchSemester =
      semester === "All" || r.semester === semester;

    const matchCategory =
      category === "All" || r.category === category;

    return matchSearch && matchSemester && matchCategory;
  });

  return (
    <div className="result-page">
      <h2 className="result-title">Student Results</h2>

      {/* 🔍 Filters */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by Roll No or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="All">All Semesters</option>
          <option value="Sem 5">Semester 5</option>
          <option value="Sem 6">Semester 6</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Regular">Regular</option>
          <option value="ATKT">ATKT</option>
          <option value="Internal">Internal</option>
          <option value="External">External</option>
        </select>
      </div>

      {/* 📊 Result Table */}
      <div className="table-wrapper">
        <table className="result-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Semester</th>
              <th>Category</th>
              <th>Marks</th>
              <th>Total</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredResults.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No results found
                </td>
              </tr>
            ) : (
              filteredResults.map((r, i) => {
                const p = percentage(r.marks, r.total);
                const g = grade(p);

                return (
                  <tr key={i}>
                    <td>{r.rollNo}</td>
                    <td>{r.studentName}</td>
                    <td>{r.subject}</td>
                    <td>{r.semester}</td>
                    <td>{r.category}</td>
                    <td>{r.marks}</td>
                    <td>{r.total}</td>
                    <td>{p}%</td>
                    <td className={`grade ${g}`}>{g}</td>
                    <td className={g === "F" ? "fail" : "pass"}>
                      {g === "F" ? "Fail" : "Pass"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
