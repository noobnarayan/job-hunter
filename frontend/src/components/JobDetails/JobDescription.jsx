import React from "react";
import styles from "./JobDescription.module.css";

function JobDescription({ jobData }) {
  const { description, skills } = jobData;
  return (
    <div className="border p-5 rounded-3xl shadow mb-10">
      <div
        className={styles.descriptionContainer}
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <div className="py-2">
        <h3 className="font-medium ">Key Skills</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills?.map((skill, index) => (
            <span
              className="text-xs bg-gray-100 text-gray-600 px-1.5 py-px rounded border shadow-sm  font-medium hover:scale-105 translate-x-0 transition-transform hover:cursor-pointer"
              key={index}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
