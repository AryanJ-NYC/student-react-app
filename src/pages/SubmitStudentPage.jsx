import { useState } from 'react';

export const SubmitStudentPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [major, setMajor] = useState('');
  const [school, setSchool] = useState('');

  // 1. add onChange handlers to each input to update the state
  // 2. add onSubmit handler to the form to submit the data

  return (
    <form>
      <input
        type="text"
        placeholder="First Name"
        onChange={(event) => setFirstName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(event) => setLastName(event.target.value)}
      />
      <input type="text" placeholder="Major" onChange={(event) => setMajor(event.target.value)} />
      <input type="text" placeholder="School" onChange={(event) => setSchool(event.target.value)} />
      <button
        onClick={async () => {
          await fetch(`${import.meta.env.VITE_API_URL}/students`, {
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              major: major,
              school: school,
            }),
            headers: { 'content-type': 'application/json' },
            method: 'POST',
          });
        }}
        type="button"
      >
        Submit
      </button>
    </form>
  );
};
