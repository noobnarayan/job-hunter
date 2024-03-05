import React, { useState } from "react";
import { userService } from "../../services/userService";
import Dialogbox from "../Dialogbox";
import { useSelector } from "react-redux";
function JobDetailsCard({ jobData }) {
  const { status, userData } = useSelector((store) => store.auth);

  const {
    title,
    salaryRange,
    location,
    employer,
    experience,
    numberOfOpenings,
    numberOfApplicants,
  } = jobData;

  const datePosted = new Date(jobData?.datePosted);

  const now = new Date();

  const diffTime = Math.abs(now - datePosted);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));

  let timeAgo;

  if (diffMinutes < 60) {
    timeAgo = diffMinutes + " minutes ago";
  } else if (diffHours < 24) {
    timeAgo = diffHours + " hours ago";
  } else if (diffDays < 30) {
    timeAgo = diffDays + " days ago";
  } else {
    timeAgo = diffMonths + " months ago";
  }

  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttonText: "",
  });
  const [saving, setSaving] = useState(false);
  const saveJob = async () => {
    setSaving(true);
    try {
      const res = await userService.saveJob(jobData._id);
      setDialog({
        isOpen: true,
        title: "Job Saved Successfully",
        message:
          "The job has been saved successfully. You can view it in your saved jobs.",
        buttonText: "Got it!",
      });
    } catch (error) {
      if (error.response.data.message === "Job is already saved") {
        setDialog({
          isOpen: true,
          title: "Job Already Saved",
          message:
            "You have already saved this job. Please check your saved jobs.",
          buttonText: "Okay",
        });
      } else {
        setDialog({
          isOpen: true,
          title: "Error Saving Job",
          message: error.response.data.message,
          buttonText: "Okay",
        });
      }
    }
    setSaving(false);
  };

  const [applying, setApplying] = useState(false);
  const applyForJob = async () => {
    setApplying(true);
    try {
      const res = await userService.applyForJob(jobData._id);
      console.log(res);
      setDialog({
        isOpen: true,
        title: "Job Application Successful",
        message:
          "Your application has been submitted successfully. Your profile has been shared with the recruiter.",
        buttonText: "Got it!",
      });
    } catch (error) {
      if (error.response.data.message === "Job has already been applied for") {
        setDialog({
          isOpen: true,
          title: "Job Already Applied",
          message:
            "You have already applied for this job.  Your profile has been shared with the recruiter.",
          buttonText: "Okay",
        });
      } else {
        setDialog({
          isOpen: true,
          title: "Error Saving Job",
          message: error.response.data.message,
          buttonText: "Okay",
        });
      }
    }
    setApplying(false);
  };

  return (
    <div className="flex flex-col gap-6 border p-4 rounded-3xl shadow">
      <div className="flex justify-between border-b pb-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <p className="text-xl font-medium">{title} </p>
            <p className="text-sm text-gray-600 font-medium">
              {employer?.userProfile?.companyName}
            </p>
          </div>
          <div className="text-gray-500 text-sm flex flex-col gap-2">
            <div className="flex gap-5 ">
              <div className="flex gap-3">
                <span>
                  <i className="fa-solid fa-briefcase"></i>
                </span>
                <span>{`${experience} Years`}</span>
              </div>
              <div className="flex gap-3">
                <span>
                  <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                </span>
                <span>
                  {salaryRange
                    ? `${salaryRange.from} to ${salaryRange.to}`
                    : "Not Disclosed"}
                </span>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <span>
                  <i className="fa-solid fa-location-dot"></i>{" "}
                </span>
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-20 w-20 rounded-3xl border overflow-hidden flex justify-center items-center">
            <img src={employer?.userProfile?.companyLogo} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex gap-3 ">
          <div className="font-light">
            Posted: <span className="font-medium"> {timeAgo}</span>
          </div>
          <div className="font-light">
            Openings: <span className="font-medium">{numberOfOpenings}</span>
          </div>
          <div className="font-light">
            Applicants:{" "}
            <span className="font-medium">{numberOfApplicants}</span>
          </div>
        </div>
        <div className="flex gap-5">
          <button
            className={`border h-10 w-20 rounded-3xl font-medium ${
              userData?.role === "jobSeeker"
                ? "border-green-600 text-green-600"
                : "border-gray-600 text-gray-600 cursor-not-allowed"
            }`}
            onClick={saveJob}
            disabled={userData?.role !== "jobSeeker"}
            title={
              !userData
                ? "Please login to save job"
                : userData.userProfile.role === "employer"
                ? ""
                : "Employers are not allowed to save jobs"
            }
          >
            {saving ? "Saving.." : "Save"}
          </button>
          <button
            className={`h-10 w-20 rounded-3xl font-medium ${
              userData?.role === "jobSeeker"
                ? "bg-green-600 text-white"
                : "bg-gray-600 text-white cursor-not-allowed"
            }`}
            onClick={applyForJob}
            disabled={userData?.role !== "jobSeeker"}
            title={
              !userData
                ? "Please login to apply job"
                : userData.userProfile.role === "employer"
                ? ""
                : "Employers are not allowed to apply"
            }
          >
            {applying ? "Applying.." : "Apply"}
          </button>
        </div>
        <Dialogbox
          isOpen={dialog.isOpen}
          setIsOpen={(isOpen) => setDialog({ ...dialog, isOpen })}
          title={dialog.title}
          message={dialog.message}
          buttonText={dialog.buttonText}
        />
      </div>
    </div>
  );
}

export default JobDetailsCard;
