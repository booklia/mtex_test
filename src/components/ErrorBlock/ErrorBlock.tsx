import './styles.css'

type Props = {
  showError: boolean;
}

const ErrorBlock = ({showError}: Props) => {
  return (
    showError ? (<div className='error__container'>
      <h3 className='error__text'>Неправильный формат файла, разрешены только файлы .CSV</h3>
    </div>) : null
  )
}

export default ErrorBlock