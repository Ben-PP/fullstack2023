const Button = ({ id, className, text, onClick }) => {
  return (
    <button
      id={id}
      className={`bg-blue-500 text-white rounded p-2 min-w-button ${className}`}
      onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
