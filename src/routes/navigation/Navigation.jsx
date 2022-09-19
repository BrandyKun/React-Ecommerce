import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { CartContext } from "../../context/cartContext";
import { useContext } from "react";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";
import "./navigation.styles.scss";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { signOutUSer } from "../../utils/firebase.utils";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {!currentUser ? (
            <Link className="nav-link" to="/auth">
              Sign In
            </Link>
          ) : (
            <span className="nav-link" onClick={signOutUSer}>
              {" "}
              Sign Out{" "}
            </span>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
