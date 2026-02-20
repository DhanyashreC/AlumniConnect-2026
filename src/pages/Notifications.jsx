import React from "react";
export default function Notifications() {
  const data = [
    "New Drive: Infosys",
    "Interview Scheduled",
    "Result Declared"
  ];

  return (
    <div>
      <h2>Notifications</h2>

      {data.map((n, i) => (
        <p key={i}>{n}</p>
      ))}
    </div>
  );
}