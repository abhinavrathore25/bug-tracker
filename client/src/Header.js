import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from "react-router-dom";
import { bindActionCreators } from 'redux';
import styled from "styled-components";
import { actionCreators } from './redux-store';


const StyledLink = styled(Link)`
text-decoration: none;
margin: 0 5px;
font-size: 20px;
color: ${props => props.linkcolor};
`

const Header = () => {
  const dispatch = useDispatch();
  let { theme } = useSelector(state => state);
  const { setTheme } = bindActionCreators(actionCreators, dispatch);

  const [STYLES, setSTYLES] = useState({
    linkColor: "#282A3A"
  });

  const handleTheme = () => {
    const body = document.getElementsByTagName("body")[0];

    if (theme === "light") {
      setTheme("dark");
      setSTYLES({ linkColor: "#FFF" });
      body.style.backgroundColor = "#3B3B3B";
    }

    else {
      setTheme("light");
      setSTYLES({ linkColor: "#282A3A" });
      body.style.backgroundColor = "#F9F9F9";
    }
  }

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme} p-0`}>
        <h1>
          <i className="fa fa-bug bug" aria-hidden="true"></i>
          Tracker
        </h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-link-div collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <StyledLink linkcolor={STYLES.linkColor} onClick={handleTheme}>
                {theme === "light" ?
                  <i className="fa-solid fa-moon fa-lg"></i> :
                  <i className="fa-solid fa-sun"></i>
                }
              </StyledLink>
            </li>
            <li className="nav-item">
              <StyledLink linkcolor={STYLES.linkColor} to="/form">
                <i className="fa-regular fa-square-plus fa-lg"></i>
              </StyledLink>
            </li>
            <li className="nav-item">
              <StyledLink linkcolor={STYLES.linkColor} to="/table">
                <i className="fa-solid fa-table-list fa-lg"></i>
              </StyledLink>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
      <Outlet />
    </>
  )
}

export default Header;