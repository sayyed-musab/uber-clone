import React, { useState, useRef, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import UserConfirmRide from "../components/UserConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

function UserHome() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState(false);
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);
  const [isConfirmRidePanelOpen, setIsConfirmRidePanelOpen] = useState(false);
  const [isLookingForDriver, setIsLookingForDriver] = useState(false);
  const [isWaitingForDriver, setIsWaitingForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("pickup");
  const [fares, setFares] = useState(null);
  const [isFareLoading, setIsFareLoading] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedVehicleLabel, setSelectedVehicleLabel] = useState("");
  const [isCreateRideLoading, setIsCreateRideLoading] = useState(false);
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setRide(ride);
    setIsLookingForDriver(false);
    setIsWaitingForDriver(true);
  });

  socket.on("ride-started", (ride) => {
    setIsWaitingForDriver(false);
    navigate("/riding", { state: { ride: ride } });
  });

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  useEffect(() => {
    if (!isLocationPanelOpen) return;
    const query = activeField === "pickup" ? pickup : destination;
    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const token = localStorage.getItem("token");
    const timeoutId = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions`,
          {
            params: { input: query },
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          },
        );
        setSuggestions(response.data || []);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [pickup, destination, activeField, isLocationPanelOpen]);

  useEffect(() => {
    if (!isVehiclePanelOpen) {
      return;
    }

    if (!pickup || !destination) {
      setFares(null);
      return;
    }

    let isCancelled = false;
    const token = localStorage.getItem("token");

    const fetchFare = async () => {
      setIsFareLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/rides/get-fare`,
          {
            params: { pickup, destination },
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          },
        );

        if (!isCancelled) {
          setFares(response.data || null);
        }
      } catch (error) {
        console.error(error);
        if (!isCancelled) {
          setFares(null);
        }
      } finally {
        if (!isCancelled) {
          setIsFareLoading(false);
        }
      }
    };

    fetchFare();

    return () => {
      isCancelled = true;
    };
  }, [pickup, destination, isVehiclePanelOpen]);

  const submitHandler = (e) => {
    e.preventDefault();
    // When the user clicks "Find Trip", close search and open vehicle selection
    setIsPanelOpen(false);
    setIsLocationPanelOpen(false);
    setIsVehiclePanelOpen(true);
  };

  const handleVehicleSelect = ({ type, label }) => {
    setSelectedVehicleType(type);
    setSelectedVehicleLabel(label);
    setIsVehiclePanelOpen(false);
    setIsConfirmRidePanelOpen(true);
  };

  const handleCreateRide = async () => {
    if (!pickup || !destination || !selectedVehicleType) {
      return;
    }

    const token = localStorage.getItem("token");
    setIsCreateRideLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/rides/create`,
        {
          pickup,
          destination,
          vehicleType: selectedVehicleType,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      setIsConfirmRidePanelOpen(false);
      setIsLookingForDriver(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreateRideLoading(false);
    }
  };

  const handleSuggestionSelect = (value) => {
    const trimmedValue = value.trim();
    if (activeField === "pickup") {
      setPickup(trimmedValue);
    } else {
      setDestination(trimmedValue);
    }
  };

  // GSAP Animations
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: isPanelOpen ? "70%" : "0%",
      padding: isPanelOpen ? 20 : 0,
    });
  }, [isPanelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: isVehiclePanelOpen ? "translateY(0)" : "translateY(100%)",
    });
  }, [isVehiclePanelOpen]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: isConfirmRidePanelOpen ? "translateY(0)" : "translateY(100%)",
    });
  }, [isConfirmRidePanelOpen]);

  useGSAP(() => {
    gsap.to(lookingForDriverRef.current, {
      transform: isLookingForDriver ? "translateY(0)" : "translateY(100%)",
    });
  }, [isLookingForDriver]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: isWaitingForDriver ? "translateY(0)" : "translateY(100%)",
    });
  }, [isWaitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute top-5 left-5 z-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber"
      />

      <div className="h-screen w-screen">
        <LiveTracking />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            className={`absolute right-3 top-6 text-xl transition-opacity ${isPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={() => {
              setIsPanelOpen(false);
              setIsLocationPanelOpen(false);
            }}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold mt-8">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              onClick={() => {
                setIsPanelOpen(true);
                setIsLocationPanelOpen(true);
                setActiveField("pickup");
              }}
              placeholder="Add a pick-up location"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setActiveField("pickup");
              }}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              onClick={() => {
                setIsPanelOpen(true);
                setIsLocationPanelOpen(true);
                setActiveField("destination");
              }}
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveField("destination");
              }}
            />

            {/* NEW FIND TRIP BUTTON */}
            {pickup && destination && (
              <button
                type="submit"
                className="w-full bg-black text-white mt-5 py-2 rounded-lg font-semibold"
              >
                Find Trip
              </button>
            )}
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white overflow-hidden">
          <LocationSearchPanel
            suggestions={suggestions}
            onSuggestionSelect={handleSuggestionSelect}
            setIsVehiclePanelOpen={setIsVehiclePanelOpen}
            setIsLocationPanelOpen={setIsLocationPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
          />
        </div>
      </div>

      {/* REMAINDER OF PANELS */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
      >
        <VehiclePanel
          fares={fares}
          isFareLoading={isFareLoading}
          onSelectVehicle={handleVehicleSelect}
          setIsVehiclePanelOpen={setIsVehiclePanelOpen}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <UserConfirmRide
          pickup={pickup}
          destination={destination}
          vehicleLabel={selectedVehicleLabel}
          vehicleType={selectedVehicleType}
          fare={fares?.[selectedVehicleType]}
          isCreateRideLoading={isCreateRideLoading}
          onConfirm={handleCreateRide}
          setIsConfirmRidePanelOpen={setIsConfirmRidePanelOpen}
        />
      </div>

      <div
        ref={lookingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fares?.[selectedVehicleType]}
          setIsLookingForDriver={setIsLookingForDriver}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <WaitingForDriver
          ride={ride}
          setIsWaitingForDriver={setIsWaitingForDriver}
        />
      </div>
    </div>
  );
}

export default UserHome;
