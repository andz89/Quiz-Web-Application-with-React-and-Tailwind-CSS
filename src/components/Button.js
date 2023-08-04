import PropTypes from 'prop-types'

const Button = ({ disabled, text, onClick, className}) => {


  return (
    <button disabled={disabled} onClick={onClick}  className= {className}>{text}</button>
  )
}
Button.defaultProps = {
    text: "Start",
    color: "bg-green",
    classN:"btn",
    disabled:false
  }
  Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick:PropTypes.func
  }
export default Button