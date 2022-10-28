import { React, useEffect, useState } from "react";
import "./Css/clock.css";


function Clock() {
  const [clockState, setClockState] = useState();
  const [dateState, setDateState] = useState();
  
  useEffect (() => {
    setInterval (() => { 
      setDateState(new Date().toLocaleDateString());  //  
    }, 1);
  } , []);

  useEffect(() => {
    setInterval(() => {
      setClockState(new Date().toLocaleTimeString()); // Time
    }, 1);
  }, []);
  

  return <div className="clock">{clockState} <br /> {dateState} </div>;
}
export default Clock;
