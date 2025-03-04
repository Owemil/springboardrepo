import React from 'react';
import useToggle from "./helpers/useToggle"
import {
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  CloseButton,
} from 'reactstrap';
import "./NavBar.css"
import { NavLink } from 'react-router-dom';

// NavBar component takes in a function to logout, user data and an array of other animal data
// it renders a navbar based on if a user is logged in or not

function NavBar({ logout, user, other }) {
  const [isOCOpen, toggleOC] = useToggle()
  return (
    <div>
      {user ?
        <Navbar >
          <NavbarBrand href="/">Petly</NavbarBrand>

          <NavLink to="/user">My Account</NavLink>

          <NavLink onClick={logout} to="/">Log out</NavLink>

          <div>
            <Button
              className="user-btn"
              color="primary"
              onClick={toggleOC}
            >
              Search
            </Button>
            <Offcanvas
              direction="end"
              isOpen={isOCOpen}
            >
              <OffcanvasHeader onClick={toggleOC}>

                <NavLink to='/' className='oc-header'>Petly</NavLink>

                <CloseButton className='oc-header'></CloseButton>
              </OffcanvasHeader>
              <OffcanvasBody>
                <div>

                  <h3>Welcome Back, {user.firstName}</h3>
                </div>
                <br />
                <h3>searchs</h3>

                <NavLink to="/search/Dogs">Dogs</NavLink>
                <br />
                <NavLink to="/search/Cats">Cats</NavLink>
                <br />
                <NavLink to="/search/Birds">Birds</NavLink>
                <br />
                <NavLink to="/search/Rabbits">Rabbits</NavLink>

                <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    Barnyard
                  </DropdownToggle>
                  <DropdownMenu end>
                    {other.barnyard.map((item, idx) => {
                      return (
                        <>
                          <NavLink to={`/search/${item}`} key={idx}>{item}</NavLink>
                          <br />
                        </>
                      )
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    Reptile
                  </DropdownToggle>
                  <DropdownMenu end>
                    {other.reptile.map((item, idx) => {
                      return (
                        <>
                          <NavLink to={`/search/${item}`} key={idx}>{item}</NavLink>
                          <br />
                        </>
                      )
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    Small & Furry
                  </DropdownToggle>
                  <DropdownMenu end>
                    {other.smallfurry.map((item, idx) => {
                      return (
                        <>
                          <NavLink to={`/search/${item}`} key={idx}>{item}</NavLink>
                          <br />
                        </>
                      )
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    Scales, Shells & Other
                  </DropdownToggle>
                  <DropdownMenu end>
                    {other.scalesshellsother.map((item, idx) => {
                      return (
                        <>
                          <NavLink to={`/search/${item}`} key={idx}>{item}</NavLink>
                          <br />
                        </>
                      )
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavLink to="/orgs">Organizations</NavLink>
              </OffcanvasBody>
            </Offcanvas>
          </div>


        </Navbar>
        :
        <Navbar >
          <NavbarBrand href="/">Petly</NavbarBrand>

          <NavLink to="/signup">Signup</NavLink>

          <NavLink to="/login">Login</NavLink>

          <div>
            <Button
              className="user-btn"
              color="primary"
              onClick={toggleOC}
            >
              Search
            </Button>
            <Offcanvas
              scrollable
              direction="end"
              isOpen={isOCOpen}
            >
              <OffcanvasHeader onClick={toggleOC}>

                <NavLink to='/' className='oc-header'>Petly</NavLink>

                <CloseButton className='oc-header'></CloseButton>
              </OffcanvasHeader>
              <OffcanvasBody>
                <div>

                  <h3>Welcome, Guest</h3>
                </div>
                <br />
                <h3>searchs</h3>

                <NavLink to="/search/Dogs">Dogs</NavLink>
                <br />
                <NavLink to="/search/Cats">Cats</NavLink>
                <br />
                <NavLink to="/search/Birds">Birds</NavLink>
                <br />
                <NavLink to="/search/Rabbits">Rabbits</NavLink>

                <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    Barnyard
                  </DropdownToggle>
                  <DropdownMenu end>
                    {other.barnyard.map((item, idx) => {
                      return (
                        <>
                          <NavLink to={`/search/${item}`} key={idx}>{item}</NavLink>
                          <br />
                        </>
                      )
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    Reptile
                  </DropdownToggle>
                  <DropdownMenu end>
                    {other.reptile.map((item, idx) => {
                      return (
                        <>
                          <NavLink to={`/search/${item}`} key={idx}>{item}</NavLink>
                          <br />
                        </>
                      )
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    Small & Furry
                  </DropdownToggle>
                  <DropdownMenu end>
                    {other.smallfurry.map((item, idx) => {
                      return (
                        <>
                          <NavLink to={`/search/${item}`} key={idx}>{item}</NavLink>
                          <br />
                        </>
                      )
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    Scales, Shells & Other
                  </DropdownToggle>
                  <DropdownMenu end>
                    {other.scalesshellsother.map((item, idx) => {
                      return (
                        <>
                          <NavLink to={`/search/${item}`} key={idx}>{item}</NavLink>
                          <br />
                        </>
                      )
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavLink to="/orgs">Organizations</NavLink>

              </OffcanvasBody>
            </Offcanvas>
          </div>
        </Navbar>}

    </div>
  );
}

export default NavBar;