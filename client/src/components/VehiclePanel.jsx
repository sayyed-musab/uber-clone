import React from "react";

const VehiclePanel = (props) => {
  const { fares, isFareLoading, onSelectVehicle } = props;

  const formatFare = (value) => {
    if (typeof value === "number") {
      return `₹${value}`;
    }

    return isFareLoading ? "₹..." : "₹—";
  };
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setIsVehiclePanelOpen(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={() => {
          onSelectVehicle({ type: "car", label: "UberGo" });
        }}
        className="flex border-2 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between"
      >
        <img
          className="h-10"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">{formatFare(fares?.car)}</h2>
      </div>
      <div
        onClick={() => {
          onSelectVehicle({ type: "motorcycle", label: "Motorcycle" });
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between"
      >
        <img
          className="h-10"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
          alt=""
        />
        <div className="-ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Motorcycle{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">
          {formatFare(fares?.motorcycle)}
        </h2>
      </div>
      <div
        onClick={() => {
          onSelectVehicle({ type: "auto", label: "UberAuto" });
        }}
        className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between"
      >
        <img
          className="h-10"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">{formatFare(fares?.auto)}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
