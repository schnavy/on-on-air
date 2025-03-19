"use client";
import React, { useState, useEffect } from "react";
import { VscAdd, VscClose } from "react-icons/vsc";
import styles from "./SubmissionForm.module.scss";

interface SubmissionData {
  title: string;
  description: string;
  url: string;
}

const SubmissionForm = () => {
  const [data, setData] = useState<SubmissionData>({
    title: "",
    description: "",
    url: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [rightPosition, setRightPosition] = useState("10vw");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate a random value between 0 and 50 for the right position
    const randomRight = Math.floor(Math.random() * 30);
    setRightPosition(`${randomRight}vw`);
    setLoading(false);
  }, []); // Re-run when the form is opened

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/add-submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);

      setData({ title: "", description: "", url: "" });
    } else {
      alert("Failed to add title");
    }
  };
  return (
    <div
      className={
        styles.addButtonContainer + " " + (loading ? "loading" : "loaded")
      }
      style={{ right: rightPosition }}
    >
      {!open ? (
        <button className={styles.addButton} onClick={() => setOpen(true)}>
          <VscAdd />
        </button>
      ) : (
        <div className={styles.open}>
          <button onClick={() => setOpen(false)}>
            <VscClose />
          </button>
          {submitted ? (
            <div>Thanks for your Submission</div>
          ) : (
            // <p>Neues Radio hinzufügen:</p>
            <p>WIP – You will be able to submit Radios soon!</p>
          )}
          {/* <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              URL:
              <input
                type="text"
                name="url"
                value={data.url}
                onChange={(e) => setData({ ...data, url: e.target.value })}
              />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form> */}
        </div>
      )}
    </div>
  );
};

export default SubmissionForm;
