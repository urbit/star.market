import { useStore } from '../../store'
import './LoadingIndicator.scss'

const LoadingIndicator = () => {
  const { loadingText } = useStore()

  return <div className="loading">
    {!!loadingText && <div className="loading-text">{loadingText}</div>}
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div>
}

export default LoadingIndicator
