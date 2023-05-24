import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cancelconsultation, listconsult } from './actions';

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
    dispatch(listconsult());
  }, []);

  const { consultdata } = useSelector((state) => state.consultReducers);

  const handleClick = (id) => {
    const datas = consultdata;
    dispatch(cancelconsultation(id, datas));
  };

  const columns = [
    {
      name: 'Appointed Doctor',
      selector: (row) => row.doctor?.name,
      center: true,
    },
    {
      name: 'Hospital',
      selector: (row) => row.hospital?.name,
      center: true,
    },
    {
      name: 'Department',
      selector: (row) => row.department?.name,
      center: true,
    },
    {
      name: 'Time',
      selector: (row) => row.time,
      center: true,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
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
              {row.status === 'consulted' ? (
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

              <Button className="m-1">
                <i class="fa-solid fa-file-arrow-down"></i>
              </Button>
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
        data={consultdata ? consultdata : []}
        pagination
        theme="solarized"
      />
    </div>
  );
}

export default List;
