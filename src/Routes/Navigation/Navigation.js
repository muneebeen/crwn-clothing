import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import "./Navigation.scss";
import { ReactComponent as Logo } from "../../Assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase";
import CartIcon from "../../Components/CartIcon/CartIcon";
import CartDropDown from "../../Components/CartDropDown/CartDropDown";
import { setCurrentUser } from "../../store/User/UserAction";
import { selectCurrentUser } from "../../store/User/UserSelector";
import { selectIsCartOpen } from "../../store/Cart/CartSelector";

const Navigation = () => {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
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
            {console.log(currentUser)}
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
