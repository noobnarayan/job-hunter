import React, { useEffect, useState } from "react";
import SubmissionButton from "../Common/Buttons/SubmissionButton";
import InputField from "../Common/FormComponents/InputField";
import { externalApiServices } from "../../services/externalApiServices";
import { userService } from "../../services/userService";
import { useSelector } from "react-redux";
import useUpdateUserData from "../../hooks/useUpdateUserData";

function EducationForm({
  setShowAddEducation,
  educationFormData,
  setEducationFormData,
}) {
  const { userData } = useSelector((store) => store.auth);
  const updateUser = useUpdateUserData();

  const initialFormData = {
    institution: "",
    start: "",
    end: "",
    degree: "",
    major: "",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [showDropdown, setShowDropdown] = useState(true);
  const [saving, setSaving] = useState(null);

  useEffect(() => {
    if (educationFormData) {
      updateFormData(educationFormData);
    }
  }, [educationFormData]);

  const updateFormData = (data) => {
    const { institution, degree, fieldOfStudy, startYear, endYear } = data;

    setFormData({
      institution: institution,
      start: startYear,
      end: endYear,
      degree: degree,
      major: fieldOfStudy,
    });
  };

  const handleDropdown = (item) => {
    handleInstituteInput(item);
    setShowDropdown(!showDropdown);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInstituteInput = (institution) => {
    const { name } = institution;
    setFormData({
      ...formData,
      institution: name,
    });
  };
  useEffect(() => {
    if (isSearching) {
      const timeoutId = setTimeout(async () => {
        if (searchTerm) {
          const data = await externalApiServices.searchUniversities(searchTerm);
          setData(data);
        } else {
          setData([]);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, isSearching]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setFormData({
      ...formData,
      institution: event.target.value,
    });
    setIsSearching(true);
  };

  const handleCancel = () => {
    setShowAddEducation(false);
    setEducationFormData(initialFormData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { userProfile } = userData;
    let update = null;

    if (educationFormData) {
      update = updateExistingEducation(userProfile);
    } else {
      update = addNewEducation(userProfile);
    }

    try {
      const res = await userService.updateUserProfile(update);
      setSaving(false);
      if (res.status === 200) {
        updateUser();
        setShowAddEducation(false);
        setEducationFormData(initialFormData);
      }
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };

  const updateExistingEducation = (userProfile) => {
    const educationCopy = [...userProfile.education];
    const indexToUpdate = educationCopy.findIndex(
      (education) =>
        education.degree === educationFormData.degree &&
        education.institution === educationFormData.institution
    );

    if (indexToUpdate !== -1) {
      educationCopy[indexToUpdate] = {
        institution: formData.institution,
        degree: formData.degree,
        fieldOfStudy: formData.major,
        startYear: formData.start,
        endYear: formData.end,
      };
    }

    return { education: educationCopy };
  };

  const addNewEducation = (userProfile) => {
    const updatedEducation = [
      ...userProfile.education,
      {
        institution: formData.institution,
        degree: formData.degree,
        fieldOfStudy: formData.major,
        startYear: formData.start,
        endYear: formData.end,
      },
    ];

    return { education: updatedEducation };
  };
  return (
    <div className="bg-gray-100 p-5">
      <form className="flex flex-col gap-2.5">
        <div>
          <div className={showDropdown ? "" : "hidden"}>
            <InputField
              label="Education"
              id="name"
              name="institution"
              value={formData.institution}
              onChange={handleSearch}
              isRequired={true}
              placeholder="College/University"
            />
            <ul className="list-none p-0 m-0 scrollable-list">
              {searchTerm && data.length > 0
                ? data.slice(0, 5).map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center my-1 p-2 bg-white rounded-md shadow-sm border hover:cursor-pointer"
                      onClick={() => handleDropdown(item)}
                    >
                      <div className="flex flex-col ">
                        <span className="font-semibold">{`${item?.name}, ${
                          item["state-province"]
                            ? `${item["state-province"]},  ${item?.alpha_two_code}`
                            : item?.alpha_two_code
                        }`}</span>
                        <span className="text-sm text-gray-500">
                          {`https://${item.domains ? item.domains[0] : ""}`}
                        </span>
                      </div>
                    </li>
                  ))
                : searchTerm && (
                    <li
                      className="flex items-center my-2 p-2 bg-white rounded-md shadow-sm border border-black hover:cursor-pointer"
                      onClick={() => handleDropdown({ name: searchTerm })}
                    >
                      No results found for "{searchTerm}". Create "{searchTerm}
                      ".
                    </li>
                  )}
            </ul>
          </div>
          <div className={!showDropdown ? "" : "hidden"}>
            <label className="font-medium flex gap-2">
              Education
              <span className="text-gray-500">*</span>
            </label>
            <div className="my-2 px-2.5 py-2.5 bg-white border rounded-md flex justify-between items-center">
              <span>{formData.institution}</span>
              <i
                className="fa-solid fa-x text-gray-400 hover:cursor-pointer mr-3 text-xs"
                onClick={() => handleDropdown({ name: "" })}
              ></i>
            </div>
          </div>
        </div>
        <div>
          <InputField
            label="Start Date (Month/Year)"
            id="start"
            name="start"
            type="month"
            value={formData.start}
            onChange={handleInputChange}
            isRequired={true}
          />
        </div>
        <div>
          <InputField
            label="End Date (Month/Year)"
            id="end"
            name="end"
            type="month"
            value={formData.end}
            onChange={handleInputChange}
            isRequired={true}
          />
        </div>
        <div>
          <InputField
            label="Degree"
            id="degree"
            value={formData.degree}
            onChange={handleInputChange}
            isRequired={false}
            placeholder="Enter degree"
          />
          <InputField
            label="Major"
            id="major"
            value={formData.major}
            onChange={handleInputChange}
            isRequired={false}
            placeholder="Enter major"
          />
        </div>

        <div className="flex gap-6 my-4 justify-end">
          <SubmissionButton
            type="button"
            onClick={handleCancel}
            color="white"
            label="Cancel"
          />
          <SubmissionButton
            type="submit"
            onClick={handleFormSubmit}
            color="black"
            label={saving ? "Saving.." : "Save"}
          />
        </div>
      </form>
    </div>
  );
}

export default EducationForm;
