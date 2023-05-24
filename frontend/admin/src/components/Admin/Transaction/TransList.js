import { useEffect } from 'react';
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
      selector: (row) => row.status.toString(),
      center: true,
    },
    {
      name: 'TransactionHash',
      selector: (row) => row.transactionHash,
      center: true,
    },
    // {
    //   name: 'Action',
    //   style: {
    //     fontSize: '18px', // Sets font size to 18px
    //   },
    //   selector: (row) => (
    //     <Link to={`/enquiry/${row.id}`} type="button" className="btn btn-info">
    //       View
    //     </Link>
    //   ),
    // },
  ];

  return (
    <div className="table-container headd">
      <DataTable
        columns={columns}
        pagination
        data={transaction}
        theme="solarized"
      />
    </div>
  );
}

export default List;
