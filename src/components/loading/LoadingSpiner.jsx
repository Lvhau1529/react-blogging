import styled from 'styled-components'

const SpinnerStyles = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.bordersize} solid white;
  border-top: ${(props) => props.bordersize} solid transparent;
  border-bottom: ${(props) => props.bordersize} solid transparent;
  border-radius: 100rem;
  display: inline-block;
  animation: spinner 1s infinite linear;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`
const LoadingSpinner = ({ size = '40px', bordersize = '5px' }) => {
  return <SpinnerStyles size={size} bordersize={bordersize}></SpinnerStyles>
}

export default LoadingSpinner
