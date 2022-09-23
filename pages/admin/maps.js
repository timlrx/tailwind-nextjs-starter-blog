import React from "react";

// components

import MapExample from "components/Maps/MapExample.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Maps() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <MapExample />
          </div>
        </div>
      </div>
      
    </>
  );
}

Maps.layout = Admin;
