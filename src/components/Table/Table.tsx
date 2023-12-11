import React, {useCallback} from "react";
import './styles.css'

type Props = {
  headers: string[];
  data: string[][];
}

const HEADERS = {
  'name': {
    'text': 'Имя',
    'render': '',
  },
  'phone': {
    'text': 'Номер телефона',
    'render': '',
  },
  'email': {
    'text': 'email',
    'render': 'table__cell_email',
  },
  'bday': {
    'text': 'Дата рождения',
    'render': '',
  },
  'address': {
    'text': 'Адрес',
    'render': '',
  }
}

const Table = ({headers, data}: Props) => {
  const headerFunction = useCallback(()=>{
    return (
      <tr className='table__head__row'>
        {headers.map((header, index) =>
          <th key={index} className='table__head__cell'>{(header in HEADERS) ? HEADERS[header as keyof typeof HEADERS].text : header}</th>
        )}
      </tr>
    )

  }, [headers])
  const rowFunction = useCallback((row: string[]) => {
    return (
      <tr  className='table__body__row'>
        {row.map((item, index) => <td key={index} className={`table__body__cell ${(headers[index] in HEADERS) ? HEADERS[headers[index] as keyof typeof HEADERS].render : ''}`}>{item}</td>)}
      </tr>
    )
  }, [headers])

  return (
    <div className='table__container'>
      <table className='table'>
        <thead className='table__head'>
        {headerFunction()}
        </thead>
        <tbody className='table__body'>
        {data.map(row => rowFunction(row))}
        </tbody>
      </table>
    </div>

  )
}

export default Table