import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Nav = ({logged_in, getCurrentUser, logOut, location: { pathname } }) => {

  let logout = () => {
    localStorage.clear()
    getCurrentUser(null)
  };

  return (
    <Menu pointing secondary>
      {logged_in ? (
        <Fragment>
          <Menu.Item
            as={NavLink}
            to="/mycourses"
            name="My Courses"
            active={pathname === "/mycourses"}
          />
          <Menu.Item
            as={NavLink}
            to="/availableCourses"
            name="Shared Courses"
            active={pathname === "/availableCourses"}
          />
          <Menu.Menu position="right">
            <Menu.Item to="/logout" name="Logout" onClick={() => {
              logOut()
              logout()}
              } />
          </Menu.Menu>
        </Fragment>
      ) : (
        <Menu.Item
          as={NavLink}
          to="/login"
          name="Login"
          active={pathname === "/login"}
        />
      )}
    </Menu>
  );
};

export default withRouter(Nav)