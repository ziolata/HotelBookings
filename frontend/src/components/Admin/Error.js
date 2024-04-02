import React from "react";

function UnAuthor() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>You do not have sufficient access rights</h2>
        <p>
          <a href="/">Click here to return to the home page</a>
        </p>
      </div>
    </div>
  );
}

export default UnAuthor;
