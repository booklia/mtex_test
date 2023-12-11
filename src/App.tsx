import React, {useEffect, useState} from 'react';
import LoadPage from "./pages/LoadPage/LoadPage";
import TablePage from "./pages/TablePage/TablePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";


const App = () => {
  const [headers, setHeaders] = useState([] as string[])
  const [data, setData] = useState([] as string[][])
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState(false)

  const clear = () => {
    setData([])
    setHeaders([])
    setRedirect(false)
  }

  useEffect(() => {
    const storedHeaders = localStorage.getItem('headers');
    const storedData = localStorage.getItem('data');
    if (storedData && storedHeaders) {

      setData(JSON.parse(storedData))
      setHeaders(JSON.parse(storedHeaders))
      setRedirect(true)
    }
  }, [])

  const detectEncoding = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e?.target?.result;

        if (typeof result === 'string') {
          if (result.startsWith('\uFEFF')) {
            resolve('UTF-8');
          } else {
            if (result.startsWith('\uFFFE')) {
              resolve('UTF-16');
            } else {
              resolve('CP1251');
            }
          }
        }
      }
      reader.readAsText(file.slice(0, 4));
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!(fileExtension === 'csv')) {
        setError(true);
        setTimeout(() => setError(false), 5000)
        return;
      }
      setError(false);
      const encoding = await detectEncoding(inputFile) as string;
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e?.target?.result;

        if (typeof content === 'string') {
          const lines = content.split(/\r\n|\n|\r/g).filter(Boolean);
          const possibleSeparators = ',;\t|'
          let separator = '';
          for (let el of lines[0]) {
            if (possibleSeparators.includes(el)) {
              separator = el;
              break
            }
          }

          const headers = lines[0].split(separator);
          const data = lines.slice(1).map(el => el.split(',').reduce((acc, el) => {
            if (acc.length && acc[acc.length - 1].startsWith('"')) {
              acc[acc.length - 1] += el
              if (el.endsWith('"')) {
                acc[acc.length - 1] = acc[acc.length - 1].replace(/^[\r" \t]+|[\r" \t]+$/g, '')
              }
            } else {
              acc.push(el)
            }
            return acc
          }, [] as string[]));

          localStorage.setItem('headers', JSON.stringify(headers))
          localStorage.setItem('data', JSON.stringify(data))
          setHeaders(headers)
          setData(data)
          setRedirect(true)

        }
      }
      reader.readAsText(inputFile, encoding)
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoadPage onChange={handleFileChange} redirect={redirect} showError={error}/>}/>
        <Route path='/table' element={<TablePage onChange={handleFileChange} onClear={clear} headers={headers} data={data} showError={error}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
