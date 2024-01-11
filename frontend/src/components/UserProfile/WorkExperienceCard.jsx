import React, { useState } from "react";

function WorkExperienceCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border p-3.5 border-b-4 bg-gray-50 flex flex-col gap-3 rounded">
      <div className="flex justify-between">
        <div className="flex gap-6 text-sm">
          <div className="h-12 w-12 overflow-hidden border rounded-md p-px">
            <img src="https://photos.wellfound.com/startups/i/267839-22e9550a168c9834c67a3e55e2577688-medium_jpg.jpg?buster=1677467708" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium">Wordpress Developer</p>
            <p className="text-green-600">Freelancer, Self- Employed</p>
            <p className="text-gray-500">Mar 2018 to May 2022</p>
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-500">Edit</span>
        </div>
      </div>
      <div className="text-[.8rem] ml-10">
        <p
          className={`leading-5 text-left ${isExpanded ? "" : "line-clamp-3 "}`}
        >
          - Led client acquisition initiatives, identifying potential clients
          and initiating business development outreach. - Designed, created, and
          managed WordPress websites, optimizing website speeds and user
          experience according to Google Core Web Vitals standards. This ensured
          seamless user experience and high-quality design aesthetics. -
          Successfully migrated WordPress sites between hosting platforms,
          demonstrating technical proficiency. - Optimized site SEO to enhance
          visibility and reach, leading to increased web traffic and user
          engagement. - Utilized AWS EC2 and Digital Ocean for hosting and
          migrating sites on select projects, demonstrating versatility in
          handling various hosting platforms. - Gained experience with
          WooCommerce, integrating payment gateways to facilitate smooth online
          transactions.
        </p>
        <span
          onClick={() => setIsExpanded(!isExpanded)}
          className="font-medium text-green-700"
        >
          {isExpanded ? "Read less" : "Read more"}
        </span>
      </div>
    </div>
  );
}

export default WorkExperienceCard;
