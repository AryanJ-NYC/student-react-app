import { useEffect, useState } from 'react';
import { StudentInfo } from './StudentInfo'; // named import
// import StudentInfo from './StudentInfo'; // default import
import { Link } from 'react-router-dom';
import './App.css';

function StudentListPage() {
  // the point of state is that it is dynamic and can be changed
  const [students, setStudents] = useState([]); // initialize state as studentList

  useEffect(() => {
    const getStudents = async () => {
      const response = await fetch('http://localhost:3000/students');
      const data = await response.json();
      setStudents(data);
    };
    getStudents();
  }, []);

  return (
    <div>
      <h1>Welcome to CTP</h1>
      {/* {me ? <p>You are logged in as {me.email}</p> : <Link to="/login">Login</Link>} */}
      <p>List of Students</p>
      {students.map((student) => (
        <Link to={`/student/${student.sId}`} key={student.sId}>
          <StudentInfo key={student.sId} {...student} />
        </Link>
      ))}
      <Link to="/student/submit">Submit a new student</Link>
      <button
        onClick={async () => {
          // use setter function when you want to use the previous state
          await fetch('http://localhost:3000/students', {
            body: JSON.stringify({
              sId: '12345466756w',
              firstName: 'AJ',
              lastName: 'JA',
              major: 'Philosophy',
              school: 'Lehman',
            }),
            headers: {
              'content-type': 'application/json',
            },
            method: 'POST',
          });
        }}
      >
        Add a new student
      </button>

      <button
        onClick={() => {
          setStudents(students.slice(0, students.length - 1));
        }}
      >
        Remove last student
      </button>
    </div>
  );
}

export default StudentListPage;
