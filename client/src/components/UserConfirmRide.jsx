import React from "react";

const UserConfirmRide = (props) => {
  const {
    pickup,
    destination,
    fare,
    vehicleType,
    vehicleLabel,
    onConfirm,
    isCreateRideLoading,
  } = props;

  const formatFare = (value) => {
    if (typeof value === "number") {
      return `₹${value}`;
    }

    return "₹—";
  };

  const vehicleImages = {
    car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
    motorcycle:
      "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
    auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
  };

  const vehicleImageSrc = vehicleImages[vehicleType] || vehicleImages.car;
  return (
    <div>
      {/* Close Handle */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setIsConfirmRidePanelOpen(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img className="h-20" src={vehicleImageSrc} alt="Selected Vehicle" />

        <p className="text-sm font-medium text-gray-600">
          {vehicleLabel || "Selected vehicle"}
        </p>

        <div className="w-full mt-5">
          {/* Pickup Details */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {pickup || "Not set"}
              </p>
            </div>
          </div>

          {/* Destination Details */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {destination || "Not set"}
              </p>
            </div>
          </div>

          {/* Fare Details */}
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">{formatFare(fare)}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => {
            onConfirm();
          }}
          disabled={isCreateRideLoading}
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg active:bg-green-700 disabled:opacity-60"
        >
          {isCreateRideLoading ? "Confirming..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default UserConfirmRide;
