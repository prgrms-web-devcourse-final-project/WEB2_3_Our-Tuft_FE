import React from "react";
import User from "./user";

export default function UserList() {
  return (
    <div className="flex justify-between">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i, index) => (
        <User key={index} />
      ))}
    </div>
  );
}
