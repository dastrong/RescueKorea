import React, { useState } from "react";
import { connect } from "react-redux";
import { Menu, Sidebar, Transition } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { handleLogout } from "../store/actions/user";
import "./NavBar.css";

function NavBar({ isAuthenticated, handleLogout }) {
  const [isLeftVisible, toggleLeft] = useState(false);
  const [isRightVisible, toggleRight] = useState(false);

  // opens a menu after closing an open one first if needed
  const toggleMenus = async (left, right) => {
    // if user clicks the nav header closes any open
    if (!left && !right) {
      return isLeftVisible ? toggleLeft(false) : toggleRight(false);
    }

    // closes the left menu and opens the right menu
    if (isLeftVisible && right) {
      (await toggleLeft(!isLeftVisible)) && toggleRight(!isRightVisible);
    }

    // closes the right menu and opens the left menu
    if (isRightVisible && left) {
      (await toggleRight(!isRightVisible)) && toggleLeft(!isLeftVisible);
    }

    // just opens a menu
    left ? toggleLeft(!isLeftVisible) : toggleRight(!isRightVisible);
  };

  function logout() {
    localStorage.clear();
    handleLogout();
    toggleMenus(false, true);
  }

  return (
    <>
      <Menu borderless fixed="top">
        <Menu.Item
          onClick={() => toggleMenus(true, false)}
          icon={isLeftVisible ? "close" : "sidebar"}
        />
        <Link to="/" onClick={() => toggleMenus()} className="nav-header">
          <img
            src="https://res.cloudinary.com/dastrong/image/upload/f_auto,q_100/v1554289935/petChingus/UX/NavHeaderRK.png"
            alt="header"
          />
        </Link>
        <Menu.Item
          onClick={() => toggleMenus(false, true)}
          icon={isRightVisible ? "close" : "user"}
        />
      </Menu>
      <Sidebar
        as=""
        animation="overlay"
        direction="top"
        visible={isLeftVisible || isRightVisible}
      >
        <Transition.Group className="nav-sidebar">
          {isLeftVisible && (
            <NavMenu items={navi} closeMenu={() => toggleMenus(true, false)} />
          )}
          {isRightVisible && (
            <NavMenu
              // determines which menu items to show
              items={isAuthenticated ? authed : noAuth}
              closeMenu={isAuthenticated ? logout : () => toggleMenus(false, true)}
            />
          )}
        </Transition.Group>
      </Sidebar>
    </>
  );
}

const mapStateToProps = state => ({ isAuthenticated: state.user.isAuthenticated });

const mapDispatchToProps = { handleLogout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

// ========================================
const NavMenu = ({ items, closeMenu }) => (
  <div className="nav-sidebar-menu">
    {items.map(item => (
      <NavMenuItem closeMenu={closeMenu} {...item} />
    ))}
  </div>
);

const NavMenuItem = ({ imgURL, closeMenu, ...props }) => (
  <Link {...props} onClick={closeMenu} className="nav-sidebar-menu-link">
    <img src={imgURL} alt={props.key} />
  </Link>
);

// Used to create menu items
const imgURL = "https://res.cloudinary.com/dastrong/image/upload/c_scale,f_auto,w_150/";
const navi = [
  {
    to: "/listings",
    key: "listings",
    imgURL: `${imgURL}v1554374548/petChingus/UX/View_Listings.png`,
  },
  {
    to: "/create",
    key: "createListing",
    imgURL: `${imgURL}v1554373425/petChingus/UX/Create_Listing.png`,
  },
  {
    to: "/policy",
    key: "listingPolicy",
    imgURL: `${imgURL}v1554373424/petChingus/UX/Listing_Policy.png`,
  },
  {
    to: "/contact",
    key: "contact",
    imgURL: `${imgURL}v1554373424/petChingus/UX/Contact_Us.png`,
  },
];
const noAuth = [
  {
    to: "/login",
    key: "login",
    imgURL: `${imgURL}v1554373425/petChingus/UX/Log_In.png`,
  },
  {
    to: "/signup",
    key: "signup",
    imgURL: `${imgURL}v1554373425/petChingus/UX/Sign_Up.png`,
  },
];
const authed = [
  {
    to: "/",
    key: "logout",
    imgURL: `${imgURL}v1554373425/petChingus/UX/Log_Out.png`,
  },
];
