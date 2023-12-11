import './styles.css'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({onChange}: Props) => {
  return (
    <label className='load__label' htmlFor='file_input'>
      Выберите файл
      <input onChange={onChange} className='load__input' id='file_input' type='File' />
    </label>
  )
}

export default FileInput