import { useForm } from 'react-hook-form';

export const SubmitStudentPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await fetch(`${import.meta.env.VITE_API_URL}/students`, {
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        major: data.major,
        school: data.school,
      }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    });
  };

  // 1. add onChange handlers to each input to update the state
  // 2. add onSubmit handler to the form to submit the data

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="First Name" {...register('firstName')} />
      <input type="text" placeholder="Last Name" {...register('lastName')} />
      <input type="text" placeholder="Major" {...register('major')} />
      <input type="text" placeholder="School" {...register('school')} />
      <button type="submit">Submit</button>
    </form>
  );
};
