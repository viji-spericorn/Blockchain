import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBNavbarLink,
} from 'mdb-react-ui-kit';

const Navbar = () => {
  const dispatch = useDispatch();

  // const { role } = useSelector((state) => state.authReducer);

  const role = localStorage.getItem('role');

  return (
    <MDBNavbar light bgColor="light" className="stylenav">
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <a
            href="/patient/dashboard"
            className="text-decoration-none m-lg-2"
            style={{ color: 'black', fontSize: '15px' }}
          >
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/bubbles/100/heart-with-pulse.png"
              alt="heart-with-pulse"
            />
            Medico
          </a>
        </MDBNavbarBrand>
        <MDBNavbarItem>
          <MDBDropdown>
            {role === 'admin' ? (
              <MDBDropdownToggle
                tag="a"
                className="nav-link d-flex align-items-center"
                href="#"
              >
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/administrator-5665446-4781309.png?f=webp"
                  className="rounded-circle"
                  height="35"
                  alt="Avatar"
                  loading="lazy"
                />

                <span>
                  <p className="text-black">{role}</p>
                </span>
              </MDBDropdownToggle>
            ) : (
              <MDBDropdownToggle
                tag="a"
                className="nav-link d-flex align-items-center"
                href="#"
              >
                <img
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1629656187765/TjC4Ldxsy.png?auto=compress,format&format=webp"
                  className="rounded-circle"
                  height="35"
                  alt="Avatar"
                  loading="lazy"
                />

                <span>
                  <p className="text-black">{role}</p>
                </span>
              </MDBDropdownToggle>
            )}
            <MDBDropdownMenu>
              <MDBDropdownItem>
                <MDBNavbarLink href="/profile" className="text-center">
                  Profile
                </MDBNavbarLink>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
