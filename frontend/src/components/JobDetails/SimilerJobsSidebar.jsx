import React from "react";
import SimilerJobCard from "./SimilerJobCard";

function SimilerJobsSidebar() {
  return (
    <div className="border rounded-3xl p-5 flex flex-col gap-5">
      <div>
        <h3 className="font-medium">Jobs you might be interested in</h3>
      </div>
      <div className="flex flex-col gap-5">
        <SimilerJobCard />
        <SimilerJobCard />
        <SimilerJobCard />
      </div>
    </div>
  );
}

export default SimilerJobsSidebar;
