import React, { useState, useEffect } from "react";
import MainForm from "./components/Main";
import { ClimbingBoxLoader } from "react-spinners";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      {loading ? (
        <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "#F3F4F6",
          }}
        >
          <ClimbingBoxLoader
          speedMultiplier={2}
          color="#6366F1" size={60} />
 
        </div>
            
     
            
           </div>
      ) : (
        <MainForm />
      )}
    </>
  );
};

export default App;
