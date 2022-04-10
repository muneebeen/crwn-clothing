import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import "./Navigation.scss";
import { ReactComponent as Logo } from "../../Assets/crown.svg";
import { UserContext } from "../../Context/UserContext";
import { signOutUser } from "../../utils/firebase/firebase";
import { CartContext } from "../../Context/CartContext";
import CartIcon from "../../Components/CartIcon/CartIcon";
import CartDropDown from "../../Components/CartDropDown/CartDropDown";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const signOutUserHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">
            SHOP
          </Link>
          <Link to="/auth" className="nav-link">
            {currentUser ? (
              <span className="nav-link" onClick={signOutUserHandler}>
                SIGN OUT
              </span>
            ) : (
              <span className="nav-link">SIGN IN</span>
            )}
          </Link>
          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet></Outlet>
    </Fragment>
  );
};
export default Navigation;
