import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Sidebar from '../Sidebar';
import Navbar from '../../Dashboard/Navbar';

import { listuser } from './action';

createTheme(
  'solarized',
  {
    text: {
      primary: '#dfe4e8',
      secondary: '#f5fafa',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#dfe4e8',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'dark'
);

function Lists() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(listuser());
  }, []);

  const { userdata } = useSelector((state) => state.userReducers);
  console.log('userdata', userdata);

  useEffect(() => {
    setFilteredData(
      userdata?.filter((user) => {
        const nameMatch = user.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const registrationIdMatch = user.id
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return nameMatch || registrationIdMatch;
      })
    );
  }, [userdata, searchTerm]);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    if (name === 'searchTerm' || name === 'registrationId') {
      setSearchTerm(value);
    }
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    {
      name: 'Registeration Id',
      selector: (row) => row.id,
      center: true,
    },
    {
      name: 'Patient Name',
      selector: (row) => row.name,
      center: true,
    },
    {
      name: 'Email',
      selector: (row) => row.login?.email,
      center: true,
    },
    {
      name: 'DOB',
      selector: (row) => row.dob.slice(0, 10),
      center: true,
    },
    {
      name: 'Phonenumber',
      selector: (row) => row.phoneNumber,
      center: true,
    },
    {
      name: 'AadharNumber',
      selector: (row) => row.aadharNumber,
      center: true,
    },
  ];

  return (
    <div className="dashboard d-flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexFlow: 'column',
          height: '100vh',
          overflowY: 'scroll',
        }}
      >
        <Navbar />
        <div>
          <div className="intro text-center m-5 headd">
            <h2>Patient List</h2>
          </div>

          <div style={{ margin: '3rem' }}>
            <div className="table-container">
              <Form.Group controlId="searchTerm" className="w-25 border-black">
                <Form.Control
                  type="text"
                  placeholder="Search by name or registration ID"
                  name="searchTerm"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Form.Group>

              <div style={{ margin: '3rem' }}>
                <DataTable
                  columns={columns}
                  data={currentItems ? currentItems : []}
                  pagination
                  paginationServer
                  paginationTotalRows={filteredData?.length || 0}
                  onChangeRowsPerPage={handleItemsPerPageChange}
                  paginationRowsPerPageOptions={[10, 25, 50, 100]}
                  paginationPerPage={itemsPerPage}
                  paginationComponentOptions={{
                    rowsPerPageText: 'Items per page:',
                  }}
                  paginationButtonRenderer={({
                    page,
                    active,
                    disabled,
                    onClick,
                  }) => {
                    const handleClick = (e) => {
                      e.preventDefault();
                      onClick(page);
                    };

                    return (
                      <button
                        key={page}
                        onClick={handleClick}
                        disabled={disabled}
                        className={`pagination-button ${
                          active ? 'active' : ''
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }}
                  onChangePage={handlePaginationChange}
                  theme="solarized"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lists;
