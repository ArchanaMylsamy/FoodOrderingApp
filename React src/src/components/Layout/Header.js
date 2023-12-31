import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import mainheaderImage from "../../assests/headerBanner.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import RegistrationForm from "./RegistrationForm";

const Header = (props) => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const toggleRegistrationForm = () => {
    setShowRegistrationForm((prev) => !prev);
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food Ordering App</h1>
        <button className={classes.ovalButton} onClick={toggleRegistrationForm}>
          Register
        </button>
        {showRegistrationForm && (
          <div className={classes.fullPagePopup}>
            <div className={classes.popupContent}>
              <RegistrationForm />
              <button onClick={toggleRegistrationForm}>Close</button>
            </div>
          </div>
        )}
        <div className={classes.buttons}>
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={mainheaderImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
