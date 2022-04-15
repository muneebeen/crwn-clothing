import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
//import { UserProvider } from "./Context/UserContext";
import { CategoryContextProvider } from "./Context/CategoriesContext";
import { CartContextProvider } from "./Context/CartContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <UserProvider>
//           <CategoryContextProvider>
//             <CartContextProvider>
//               <App />
//             </CartContextProvider>
//           </CategoryContextProvider>
//         </UserProvider>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
