import { useParams } from "react-router-dom";
import React from "react";

export default function EventDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Event Details</h2>
      <p>Event ID: {id}</p>
      <p>Company: TCS</p>
      <p>Date: Tomorrow</p>
    </div>
  );
}