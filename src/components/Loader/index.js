import { TailSpin } from 'react-loader-spinner'

const LoaderView = () => (
  <div className="loader-container" data-testid="loader">
    <TailSpin height={50} width={50} color="#0b69ff" />
  </div>
)

export default LoaderView
