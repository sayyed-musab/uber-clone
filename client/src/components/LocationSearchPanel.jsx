import React from "react";

const LocationSearchPanel = (props) => {
  const locations = props.suggestions || [];

  return (
    <div>
      {locations.length === 0 ? (
        <p className="text-sm text-gray-500">
          Start typing to see suggestions.
        </p>
      ) : (
        locations.map(function (elem, idx) {
          return (
            <div
              key={`${elem}-${idx}`}
              onClick={() => {
                props.onSuggestionSelect(elem);
              }}
              className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
            >
              <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
                <i className="ri-map-pin-fill"></i>
              </h2>
              <h4 className="font-medium">{elem}</h4>
            </div>
          );
        })
      )}
    </div>
  );
};

export default LocationSearchPanel;
