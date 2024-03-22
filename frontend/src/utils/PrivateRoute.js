// import React from "react";
// import { Redirect, Route } from "react-router-dom";
// import { useAuth } from "../../context/useAuth"; // Thay thế bằng component Dashboard của bạn

// function PrivateRoute({ children, ...rest }) {
//   const { userinfo } = useAuth();
//   const role_name = userinfo.role_name;

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         role_name !== "user" ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/unauthorized",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }
// export default PrivateRoute;
