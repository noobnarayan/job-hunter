import React, { useState, useEffect } from "react";
import InputField from "./FormComponents/InputField";
import { externalApiServices } from "../../services/externalApiServices";
import { userService } from "../../services/userService";

function SkillsSearch({ selectedSkills, setSelectedSkills, profile }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillsApiData, setSkillsApiData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSearching) {
      setIsLoading(true);
      const timeoutId = setTimeout(async () => {
        if (searchTerm) {
          const data = await externalApiServices.searchSkills(searchTerm);
          setSkillsApiData(
            data.filter((skill) => !selectedSkills.has(skill.name))
          );
        } else {
          setSkillsApiData([]);
        }
        setIsSearching(false);
        setIsLoading(false);
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, isSearching, selectedSkills]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
  };
  const handleSkillSelect = (skill) => {
    if (profile) {
      makeAddSkillRequest(skill);
    }
    if (selectedSkills.has(skill)) {
      selectedSkills.delete(skill);
    } else {
      selectedSkills.set(skill, true);
    }
    setSelectedSkills(new Map(selectedSkills));
    setSearchTerm("");
    setIsSearching(false);
    setSkillsApiData([]);
  };
  const handleRemoveSkill = (skill) => {
    if (profile) {
      makeRemoveSkillRequest(skill);
    }
    selectedSkills.delete(skill);
    setSelectedSkills(new Map(selectedSkills));
  };

  const makeAddSkillRequest = async (skill) => {
    try {
      const res = await userService.addSkill(skill);
    } catch (error) {
      console.log(error);
    }
  };

  const makeRemoveSkillRequest = async (skill) => {
    try {
      const res = await userService.removeSkill(skill);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 my-3">
        {Array.from(selectedSkills.keys()).map((skill, index) => (
          <div
            key={index}
            className="bg-gray-200 broder py-1.5 px-3 rounded flex justify-between items-center gap-2.5"
          >
            <span>{skill}</span>
            <i
              className="fa-solid fa-x text-xs hover:cursor-pointer text-gray-500"
              onClick={() => handleRemoveSkill(skill)}
            ></i>
          </div>
        ))}
      </div>

      <div>
        <InputField
          id={"skills"}
          placeholder={"e.g. Python, React, Data Analysis"}
          onChange={handleSearch}
          value={searchTerm}
        />
        {isLoading ? (
          <div className="px-2 font-medium ">Loading...</div>
        ) : (
          <ul className={`${searchTerm ? "border" : ""} my-1`}>
            {searchTerm && skillsApiData.length > 0
              ? skillsApiData.map((skill) => (
                  <li
                    key={skill.id}
                    className="text-gray-800 border-b py-1.5 px-4 hover:cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSkillSelect(skill.name)}
                  >
                    {skill.name}
                  </li>
                ))
              : searchTerm && (
                  <li
                    className="text-gray-800 border-b py-1.5 px-4 hover:cursor-pointer hover:bg-gray-100 font-medium"
                    onClick={() => handleSkillSelect(searchTerm)}
                  >
                    Add "{searchTerm}" as a new skill
                  </li>
                )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SkillsSearch;
