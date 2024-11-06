export function StudentInfo({ lastName, firstName, sId, school, major }) {
  return (
    <div>
      <div>
        {lastName}, {firstName}
      </div>
      <ul>
        <li>
          <strong>ID:</strong> {sId}
        </li>
        <li>
          <strong>School:</strong> {school}
        </li>
        <li>
          <strong>Major:</strong> {major}
        </li>
      </ul>
    </div>
  );
}
