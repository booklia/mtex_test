import FileInput from "../FileInput/FileInput";
import './styles.css'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileLoader = ({onChange}: Props) => {
  return (
    <div className='load__center__container'>
      <div className='load__container'>
        <h2 className='load__text'>Выберите файл в формате csv</h2>
        <FileInput onChange={onChange} />
      </div>
    </div>

  )
}

export default FileLoader