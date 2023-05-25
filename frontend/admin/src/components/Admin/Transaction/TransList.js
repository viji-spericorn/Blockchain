import { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listtransaction } from './action';

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

function List() {
  const dispatch = useDispatch();
  const [filteredTransaction, setFilteredTransaction] = useState([]);

  useEffect(() => {
    dispatch(listtransaction());
  }, []);

  const { transaction } = useSelector((state) => state.transcationReducer);
  console.log('transaction', transaction);

  const columns = [
    {
      name: 'AppoinmentType',
      selector: (row) => row.appointmentType,
      center: true,
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      center: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      center: true,
    },
    {
      name: 'TransactionHash',
      selector: (row) => row.transactionHash,
      center: true,
    },
  ];

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value === 'all') {
      setFilteredTransaction(transaction);
    } else {
      const filtered = transaction.filter(
        (item) => item.appointmentType.toLowerCase() === value.toLowerCase()
      );
      setFilteredTransaction(filtered);
    }
  };

  return (
    <div>
      <div className="filter-container " style={{ margin: '3rem' }}>
        <label htmlFor="appointmentFilter" className="h4">
          Filter by Appointment Type:
        </label>
        <select
          id="appointmentFilter"
          onChange={handleFilter}
          className="border-black-3"
        >
          <option value="all">All</option>
          <option value="consultation">consultation</option>
          <option value="vaccination">vaccination</option>
          <option value="vaccinationCertificate">vaccinationCertificate</option>
          <option value="consultationCertificate">
            consultationCertificate
          </option>
        </select>
      </div>
      <div className="table-container" style={{ margin: '3rem' }}>
        <DataTable
          columns={columns}
          pagination
          data={
            filteredTransaction.length > 0 ? filteredTransaction : transaction
          }
          theme="solarized"
        />
      </div>
    </div>
  );
}

export default List;
