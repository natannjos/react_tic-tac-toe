

const Quadrado = (props) => {

  return (
    <button
      className="quadrado"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

export default Quadrado