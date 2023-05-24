import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  DIV,
} from 'cdbreact';
import { Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const role = localStorage.getItem('role');

  return (
    <div
      className={`app`}
      style={{
        display: 'flex',
        height: '100%',
        overflow: 'scroll initial',
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#093C4F">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href={role === 'admin' ? '/dashboard' : '/patient/dashboard'}
            className="text-decoration-none m-lg-2"
            style={{ color: '#CCE2E6', fontSize: '15px' }}
          >
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/bubbles/100/heart-with-pulse.png"
              alt="heart-with-pulse"
            />
            Medico
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/consultations" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa fa-user-doctor">
                Consultation
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/vaccination" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa fa-syringe">
                Vaccination
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/alltransactions"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="fa fa-credit-card">
                Transaction Details
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/patientdetails" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa fa-bed-pulse">
                Patient Management
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/enquiry" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa fa-comment">
                Contactus Management
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/profiledata" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa fa-user">
                Profile Managment
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink as={Button} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa fa-arrow-circle-left">
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 5px',
            }}
          ></div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
