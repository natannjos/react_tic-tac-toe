

const Quadrado = (props) => {

  return (
    <button
      className={`quadrado ${props.quadradosVencedor.includes(props.idx) ? 'highlight' : ''}`
      }
      onClick={props.onClick}
    >
      { props.value}
    </button>
  )
}

export default Quadrado