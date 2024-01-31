import React from "react";
import styles from "./JobDescription.module.css";

function JobDescription({ jobData }) {
  const { description } = jobData;

  return (
    <div className={styles.descriptionContainer}>
      <div
        className="border p-5 rounded-3xl shadow "
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}

export default JobDescription;
