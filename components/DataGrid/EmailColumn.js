"use client";

const EmailColumn = ({ rowIndex, data, propertyName }) => {
  if (!data[rowIndex]) return null;

  return (
    <a
      href={`mailto:${data[rowIndex][propertyName]}`}
      className="text-base text-blue-700"
    >
      {data[rowIndex][propertyName]}
    </a>
  );
};

export default EmailColumn;
