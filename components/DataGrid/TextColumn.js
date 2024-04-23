"use client";

const TextColumn = ({ rowIndex, data, propertyName }) => {
  if (!data[rowIndex]) return null;

  return <span className="text-base">{data[rowIndex][propertyName]}</span>;
};

export default TextColumn;
