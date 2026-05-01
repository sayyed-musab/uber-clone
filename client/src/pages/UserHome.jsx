import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

function UserHome() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState(false);
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);
  const [isConfirmRidePanelOpen, setIsConfirmRidePanelOpen] = useState(false);
  const [isLookingForDriver, setIsLookingForDriver] = useState(false);
  const [isWaitingForDriver, setIsWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  useEffect(() => {
    if (isLookingForDriver) {
      const timer = setTimeout(() => {
        setIsLookingForDriver(false);
        setIsWaitingForDriver(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isLookingForDriver]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (isPanelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 20,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
    }
  }, [isPanelOpen]);

  useGSAP(() => {
    if (isVehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, { transform: "translateY(0)" });
    } else {
      gsap.to(vehiclePanelRef.current, { transform: "translateY(100%)" });
    }
  }, [isVehiclePanelOpen]);

  useGSAP(() => {
    if (isConfirmRidePanelOpen) {
      gsap.to(confirmRidePanelRef.current, { transform: "translateY(0)" });
    } else {
      gsap.to(confirmRidePanelRef.current, { transform: "translateY(100%)" });
    }
  }, [isConfirmRidePanelOpen]);

  useGSAP(() => {
    if (isLookingForDriver) {
      gsap.to(lookingForDriverRef.current, { transform: "translateY(0)" });
    } else {
      gsap.to(lookingForDriverRef.current, { transform: "translateY(100%)" });
    }
  }, [isLookingForDriver]);

  useGSAP(() => {
    if (isWaitingForDriver) {
      gsap.to(waitingForDriverRef.current, { transform: "translateY(0)" });
    } else {
      gsap.to(waitingForDriverRef.current, { transform: "translateY(100%)" });
    }
  }, [isWaitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute top-5 left-5 z-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber"
      />

      <div className="h-screen w-screen">
        <img
          src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/3:2/w_2560%2Cc_limit/GoogleMapTA.jpg"
          className="h-full w-full object-cover"
          alt="Map"
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            className={`absolute right-3 top-6 text-xl transition-opacity ${
              isPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsPanelOpen(false)}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[33%] left-10 bg-gray-700 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              onClick={() => {
                setIsPanelOpen(true);
                setIsLocationPanelOpen(true);
              }}
              placeholder="Add a pick-up location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              onClick={() => {
                setIsPanelOpen(true);
                setIsLocationPanelOpen(true);
              }}
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white overflow-hidden">
          <LocationSearchPanel
            setIsVehiclePanelOpen={setIsVehiclePanelOpen}
            setIsLocationPanelOpen={setIsLocationPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
      >
        <VehiclePanel
          setIsVehiclePanelOpen={setIsVehiclePanelOpen}
          setIsConfirmRidePanelOpen={setIsConfirmRidePanelOpen}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <ConfirmRide
          setIsConfirmRidePanelOpen={setIsConfirmRidePanelOpen}
          setIsLookingForDriver={setIsLookingForDriver}
        />
      </div>

      <div
        ref={lookingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <LookingForDriver setIsLookingForDriver={setIsLookingForDriver} />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <WaitingForDriver setIsWaitingForDriver={setIsWaitingForDriver} />
      </div>
    </div>
  );
}

export default UserHome;
