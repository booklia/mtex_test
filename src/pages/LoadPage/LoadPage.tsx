import React from "react";
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock";
import FileLoader from "../../components/FileLoader/FileLoader";
import './styles.css'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showError: boolean;
  redirect: boolean;

}

const LoadPage = ({onChange, showError, redirect}: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (redirect) {
      navigate('/table')
    }
  }, [redirect, navigate])

  return (
    <div className='load__page'>
      <FileLoader onChange={onChange} />
      <ErrorBlock showError={showError} />
    </div>
  )
}

export default LoadPage