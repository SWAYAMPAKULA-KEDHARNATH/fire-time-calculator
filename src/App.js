import React, { useState } from "react";
import "./App.css";

const FireTimeCalculator = () => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [tanks, setTanks] = useState("");
  const [distance, setDistance] = useState("");
  const [results, setResults] = useState(null);

  const calculateTimes = () => {
    let h = parseInt(hour);
    let m = parseInt(minute);
    let t = parseInt(tanks);
    let d = parseInt(distance);

    if (isNaN(h) || isNaN(m) || isNaN(t) || isNaN(d)) {
      alert("Please enter valid numbers!");
      return;
    }

    // Fire breakout time
    let breakoutHour = m < 10 ? (h - 1 + 24) % 24 : h % 24;
    let breakoutMinute = m < 10 ? (m + 50) % 60 : (m - 10) % 60;

    // Fire call time
    let callHour = h % 24;
    let callMinute = m % 60;

    // Fire turnout time
    let turnoutHour = (h + Math.floor((m + 1) / 60)) % 24;
    let turnoutMinute = (m + 1) % 60;

    // Fire reached time
    let reachedTotalMinutes = m + 1 + d * 2;
    let reachedHour = (h + Math.floor(reachedTotalMinutes / 60)) % 24;
    let reachedMinute = reachedTotalMinutes % 60;

    // Fire left time
    let leftTotalMinutes = reachedTotalMinutes + t * 30 + (t - 1) * 18 + 5;
    let leftHour = (h + Math.floor(leftTotalMinutes / 60)) % 24;
    let leftMinute = leftTotalMinutes % 60;

    // Station reached time
    let stationTotalMinutes = leftMinute + 17 + (d - 2) * 3;
    let stationHour = (leftHour + Math.floor(stationTotalMinutes / 60)) % 24;
    let stationMinute = stationTotalMinutes % 60;

    //fuel consumption
    let TripMilage=2*d;
    let TankfuelConsumption=(2*d)/4;
    let pumpingHours=Math.floor((t*30)/60);
    let pumpingMins=(t*30)%60;
    let PumpfuelConsumption=t*2;
    let TotalFuelConsumption=TankfuelConsumption+PumpfuelConsumption;

    setResults({
      breakout: `${breakoutHour.toString().padStart(2, "0")}:${breakoutMinute.toString().padStart(2, "0")}`,
      call: `${callHour.toString().padStart(2, "0")}:${callMinute.toString().padStart(2, "0")}`,
      turnout: `${turnoutHour.toString().padStart(2, "0")}:${turnoutMinute.toString().padStart(2, "0")}`,
      reached: `${reachedHour.toString().padStart(2, "0")}:${reachedMinute.toString().padStart(2, "0")}`,
      left: `${leftHour.toString().padStart(2, "0")}:${leftMinute.toString().padStart(2, "0")}`,
      station: `${stationHour.toString().padStart(2, "0")}:${stationMinute.toString().padStart(2, "0")}`,
      TripMilage: `${TripMilage.toString().padStart(2, "0")}`,
      TankFuel : `${TankfuelConsumption.toString().padStart(2, "0")}`,
      PumpingDuration: `${pumpingHours.toString().padStart(2, "0")}:${pumpingMins.toString().padStart(2, "0")}`,
      PumpFuel : `${PumpfuelConsumption.toString().padStart(2, "0")}`,
      TotalFuel : `${TotalFuelConsumption.toString().padStart(2, "0")}`,

    });
  };

  return (
    <div className="container">
      <h1>Fire Response Time Calculator</h1>
      <div className="input-group">
        <label>Fire Call Hour (0-23):</label>
        <input type="number" value={hour} onChange={(e) => setHour(e.target.value)} min="0" max="23" />
      </div>
      <div className="input-group">
        <label>Fire Call Minutes (0-59):</label>
        <input type="number" value={minute} onChange={(e) => setMinute(e.target.value)} min="0" max="59" />
      </div>
      <div className="input-group">
        <label>Number of Tanks:</label>
        <input type="number" value={tanks} onChange={(e) => setTanks(e.target.value)} min="1" />
      </div>
      <div className="input-group">
        <label>Distance (KM):</label>
        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} min="1" />
      </div>
      <button onClick={calculateTimes}>Calculate</button>

      {results && (
        <div className="results">
          <h2>Results:</h2>
          <p><strong>Fire Breakout Time:</strong> {results.breakout}</p>
          <p><strong>Fire Call Time:</strong> {results.call}</p>
          <p><strong>Fire Turnout Time:</strong> {results.turnout}</p>
          <p><strong>Fire Reached Time:</strong> {results.reached}</p>
          <p><strong>Fire Left Time:</strong> {results.left}</p>
          <p><strong>Station Reached Time:</strong> {results.station}</p>
          <p><strong>Trip Milage:</strong> {results.TripMilage}</p>
          <p><strong>Tank Fuel Consumption:</strong> {results.TankFuel}</p>
          <p><strong>Pumping Duration:</strong> {results.PumpingDuration}</p>
          <p><strong>Pump Fuel Consumption:</strong> {results.PumpFuel}</p>
          <p><strong>Total Fuel Consumption:</strong> {results.TotalFuel}</p>
        </div>
      )}
    </div>
  );
};

export default FireTimeCalculator;

