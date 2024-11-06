import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const StudentDetailPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState();

  useEffect(() => {
    const getStudent = async () => {
      const response = await fetch(`http://localhost:3000/students/${id}`);
      const data = await response.json();
      setStudent(data);
    };
    getStudent();
  });

  return (
    <div>
      {student ? (
        <div>
          <h1>
            {student.firstName} {student.lastName}
          </h1>
          <p>{student.major}</p>
          <p>{student.school}</p>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};
