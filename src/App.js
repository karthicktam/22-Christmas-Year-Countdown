import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const year = new Date().getFullYear();
const endTime = new Date(`December 24 ${year} 23:59:59`);
const snowFlakeArr = [];

export default function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [snowArr, setSnow] = useState(snowFlakeArr);

  useEffect(() => {
    const updateCountdown = () => {
      const startTime = new Date();
      const diff = endTime - startTime;
      const days = Math.floor(diff / 1000 / 60 / 60 / 24);
      const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
      const minutes = Math.floor(diff / 1000 / 60) % 60;
      const seconds = Math.floor(diff / 1000) % 60;

      setDays(days);
      setHours(hours < 10 ? `0${hours}` : hours);
      setMinutes(minutes < 10 ? `0${minutes}` : minutes);
      setSeconds(seconds < 10 ? `0${seconds}` : seconds);
    };

    let interval = setInterval(updateCountdown, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const createSnowFlake = () => {
      const snowFlake = (
        <FontAwesomeIcon
          style={{
            left: Math.random() * window.innerWidth + "px",
            opacity: Math.random(),
            fontSize: Math.random() * 10 + 10 + "px",
            animationDuration: Math.random() * 3 + 2 + "s"
          }}
          className="icon"
          icon={faSnowflake}
          key={parseInt(Date.now() * Math.random(), 10)}
        />
      );

      if (snowArr.length >= 100) {
        const newSnowArr = snowArr.slice(1);
        setSnow([...newSnowArr, snowFlake]);
      } else {
        setSnow([...snowArr, snowFlake]);
      }
    };

    let timeout = setTimeout(createSnowFlake, 50);
    return () => {
      clearTimeout(timeout);
    };
  }, [snowArr]);

  return (
    <div className="app">
      <h1>
        <span role="img" aria-label="">
          ❄️
        </span>{" "}
        Christmas is Coming!{" "}
        <span role="img" aria-label="">
          ❄️
        </span>
      </h1>

      <div className="countdown-container">
        <div className="time">
          <h1>{days}</h1>
          <small>days</small>
        </div>

        <div className="time">
          <h1>{hours}</h1>
          <small>hours</small>
        </div>

        <div className="time">
          <h1>{minutes}</h1>
          <small>minutes</small>
        </div>

        <div className="time">
          <h1>{seconds}</h1>
          <small>seconds</small>
        </div>
      </div>

      {snowArr}
    </div>
  );
}
