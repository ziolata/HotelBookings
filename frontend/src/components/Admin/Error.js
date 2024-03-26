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
        <h2>Bạn không đủ quyền truy cập</h2>
        <p>
          <a href="/">Ấn vào đây để quay lại trang chủ</a>
        </p>
      </div>
    </div>
  );
}

export default UnAuthor;
