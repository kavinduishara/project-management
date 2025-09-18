"use client";
import React from "react";

export default function VerticalTable() {
  const data = {
    Name: "Kavindu",
    Age: 23,
    Country: "Sri Lanka",
    Role: "Developer"
  };

  return (
    <div className="p-4">
      <table className="border border-gray-300">
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <th className="border px-4 py-2 text-left bg-gray-100 w-40">
                {key}
              </th>
              <td className="border px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
