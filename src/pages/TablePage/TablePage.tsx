import React from "react";
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock";
import Table from "../../components/Table/Table";
import {useNavigate} from "react-router-dom";
import './styles.css'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  showError: boolean;
  headers: string[];
  data: string[][];
}

const TablePage = ({onClear, showError, headers, data}: Props) => {
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.clear();
    onClear()
    navigate('/')
  }
 return (
    <div className='table__page'>
      <div className='table__load'>
        <button onClick={onClick} className='load__label'>Загрузить новый файл</button>
      </div>
      <Table headers={headers} data={data} />
      <ErrorBlock showError={showError} />
    </div>
  )
}

export default TablePage