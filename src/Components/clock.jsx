import { React, useEffect, useState } from "react";
import "./Css/clock.css";
function Clock() {
  const [clockState, setClockState] = useState();

  useEffect(() => {
    setInterval(() => {
      setClockState(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return <div className="clock">{clockState}</div>;
}
export default Clock;
