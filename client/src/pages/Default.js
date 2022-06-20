import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Default() {
  const { state } = useLocation();
  console.log(state?.expired);

  const notIdle =
    <div id="home">
      <div className="active">
        <h1>BLAHBLAH INDEX PAGE</h1>
      </div>
    </div>;

  return (
    notIdle
  );
}