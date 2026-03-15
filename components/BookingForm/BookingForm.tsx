"use client";

import css from "./BookingForm.module.css";
import { useState } from "react";

export default function BookingForm() {
  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // simulate booking confirmation
    alert("Car successfully booked!");

    // reset form fields
    setName("");
    setEmail("");
    setDate("");
    setComment("");
  };

  return (
    <form className={css.modalForm} onSubmit={handleSubmit}>
      <div className={css.modalTextSection}>
        <h3 className={css.modalTitle}>Book your car now</h3>
        <p className={css.modalText}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      {/* user name input */}
      <input
        className={css.formInput}
        placeholder="Name*"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* user email input */}
      <input
        className={css.formInput}
        placeholder="Email*"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* booking date selection */}
      <input
        className={css.formInput}
        type="date"
        value={date}
        placeholder="Booking Date"
        onChange={(e) => setDate(e.target.value)}
        required
      />

      {/* optional comment */}
      <textarea
        className={css.formTextarea}
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className={css.submitButton} type="submit">
        Send
      </button>
    </form>
  );
}