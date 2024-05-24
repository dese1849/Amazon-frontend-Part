import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from "./LowerHeader";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/Firebase";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/* Logo */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt=""
              />
            </Link>
            {/* Delivery */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>

              <div>
                <p>Delivered To</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            {/* search */}
            <select style={{ backgroundColor: "#D4D4D4" }} name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="Search Amazon" />

            <BsSearch size={38} />
          </div>

          {/* right side link */}
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png?20151118161041"
                alt=""
              />
              <select>
                <option value="">EN</option>
              </select>
            </Link>
            {/* three componenet */}
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user.email?.split("@")[0]} </p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: "12px" }}>Hello,Sign In</p>
                    <span>Account & List</span>
                  </>
                )}
              </div>
            </Link>
            {/* orders */}
            <Link to="/orders">
              <p style={{ fontSize: "12px" }}>Returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
