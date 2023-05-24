import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cancelvaccination, listvaccination } from './action';

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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listvaccination());
  }, []);

  const { vaccinedata } = useSelector((state) => state.vaccineReducers);

  console.log('vaccinedata', vaccinedata);
  const handleClick = (id) => {
    const datas = vaccinedata;
    console.log('datas', datas);
    dispatch(cancelvaccination(id, datas));
  };

  const columns = [
    {
      name: 'HospitalName',
      selector: (row) => row.hospital?.name,
      center: true,
    },
    {
      name: 'VaccinationName',
      selector: (row) => row.vaccine?.name,
      center: true,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      center: true,
    },
    {
      name: 'Time',
      selector: (row) => row.time,
      center: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      center: true,
    },
    {
      name: 'Action',
      style: {
        fontSize: '18px',
        text: 'center', // Sets font size to 18px
      },
      selector: (row) => (
        <div className="d-flex">
          {row.status === 'cancel' ? (
            ''
          ) : (
            <>
              {row.status === 'taken' ? (
                ''
              ) : (
                <Button
                  type="button"
                  variant="danger"
                  className="m-1"
                  onClick={() => handleClick(row.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <i class="fa-solid fa-ban"></i>
                </Button>
              )}
            </>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="table-container">
      <DataTable
        columns={columns}
        data={vaccinedata ? vaccinedata : []}
        pagination
        theme="solarized"
      />
    </div>
  );
}

export default List;
