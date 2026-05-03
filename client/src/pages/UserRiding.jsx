import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

function UserRiding() {
  const location = useLocation();
  const ride = location.state.ride || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  const vehicleImages = {
    car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
    motorcycle:
      "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
    auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
  };
  const vehicleImageSrc =
    vehicleImages[ride.captain?.vehicle.vehicleType] || vehicleImages.car;

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-5-line" />
      </Link>
      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img className="h-12" src={vehicleImageSrc} alt="" />
          <div className="text-right">
            <h2 className="text-lg font-medium">
              {ride.captain?.fullName.firstName}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride.captain?.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">
              {ride.captain?.vehicle.vehicleType}
            </p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride.fare} </h3>
                <p className="text-sm -mt-1 text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg active:bg-green-700">
          Make a Payment
        </button>
      </div>
    </div>
  );
}

export default UserRiding;
