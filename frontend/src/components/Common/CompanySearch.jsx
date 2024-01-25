import React, { useEffect, useState } from "react";
import axios from "axios";
import TextInput from "./FormComponents/TextInput";

const CompanySearch = ({ handleDropdown }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyApiData, setCompanyApiData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching) {
      const timeoutId = setTimeout(() => {
        if (searchTerm) {
          axios
            .get(
              `https://autocomplete.clearbit.com/v1/companies/suggest?query=${searchTerm}`
            )
            .then((response) => {
              setCompanyApiData(response.data);
            })
            .catch((error) => {
              console.error("Error fetching data: ", error);
              setCompanyApiData([]);
            });
        } else {
          setCompanyApiData([]);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, isSearching]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setIsSearching(true);
  };

  return (
    <div>
      <TextInput
        label="Company"
        placeholder="Google"
        isRequired={true}
        onChange={handleSearch}
        id="name"
        name="name"
      />
      <ul className="list-none p-0 m-0">
        {searchTerm && companyApiData.length > 0
          ? companyApiData.map((item, index) => (
              <li
                key={index}
                className="flex items-center my-1 p-2 bg-white rounded-md shadow-sm border hover:cursor-pointer"
                onClick={() => handleDropdown(item)}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-sm text-gray-500">
                    {`https://${item.domain}`}
                  </span>
                </div>
              </li>
            ))
          : searchTerm && (
              <li
                className="flex items-center my-2 p-2 bg-white rounded-md shadow-sm border border-black hover:cursor-pointer"
                onClick={() =>
                  handleDropdown({
                    name: searchTerm,
                    logo: null,
                    domain: null,
                  })
                }
              >
                No results found for "{searchTerm}". Create "{searchTerm}".
              </li>
            )}
      </ul>
    </div>
  );
};

export default CompanySearch;