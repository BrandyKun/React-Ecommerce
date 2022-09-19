import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import './navigation.styles.scss'
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import { signOutUSer } from "../../utils/firebase.utils";
const Navigation = () => {

  const {currentUser } = useContext(UserContext);

  
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <CrownLogo className='logo'/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {!currentUser ? (
          <Link className="nav-link" to="/auth">
            Sign In
          </Link>) : (<span className="nav-link" onClick={signOutUSer}> Sign Out </span>)}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
