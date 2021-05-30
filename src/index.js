import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


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

class Tabuleiro extends React.Component {

  renderQuadrado(i) {
    return (
      <Quadrado
        value={this.props.quadrados[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="tabuleiro-row">
          {this.renderQuadrado(0)}
          {this.renderQuadrado(1)}
          {this.renderQuadrado(2)}
        </div>
        <div className="tabuleiro-row">
          {this.renderQuadrado(3)}
          {this.renderQuadrado(4)}
          {this.renderQuadrado(5)}
        </div>
        <div className="tabuleiro-row">
          {this.renderQuadrado(6)}
          {this.renderQuadrado(7)}
          {this.renderQuadrado(8)}
        </div>
      </div>
    );
  }
}

class Jogo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      historico: [{
        quadrados: Array(9).fill(null)
      }],
      xIsNext: true,
      numeroPasso: 0
    }
  }

  handleClick = (i) => {
    const historico = this.state.historico.slice(0, this.state.numeroPasso + 1)
    const atual = historico[historico.length - 1]
    const quadrados = [...atual.quadrados]

    if (calculaVencedor(quadrados) || quadrados[i]) return

    quadrados[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      historico: historico.concat([{
        quadrados
      }]),
      xIsNext: !this.state.xIsNext,
      numeroPasso: historico.length
    })
  }

  irPara = passo => {
    this.setState({
      numeroPasso: passo,
      xIsNext: (passo % 2) === 0,
    })
  }

  render() {
    const historico = this.state.historico
    const atual = historico[this.state.numeroPasso]
    const vencedor = calculaVencedor(atual.quadrados)

    const jogadas = historico.map((passo, jogada) => {
      const desc = jogada ?
        `Ir para a jogada #${jogada}` :
        'Ir para início do jogo'

      return (
        <li key={jogada}>
          <button onClick={() => this.irPara(jogada)}>{desc}</button>
        </li>
      )
    })

    let status

    if (vencedor) status = `Vencedor: ${vencedor}`
    else status = `Próximo jogador: ${this.state.xIsNext ? 'X' : 'O'}`

    return (
      <div className="jogo">
        <div className="jogo-tabuleiro">
          <Tabuleiro
            quadrados={atual.quadrados}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="jogo-info">
          <div>{status}</div>
          <ol>{jogadas}</ol>
        </div>
      </div>
    );
  }
}

const calculaVencedor = quadrados => {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < linhas.length; i++) {
    const [a, b, c] = linhas[i]

    if (
      quadrados[a]
      && quadrados[a] === quadrados[b]
      && quadrados[a] === quadrados[c]) {
      return quadrados[a]
    }
  }
  return null
}

// ========================================

ReactDOM.render(
  <Jogo />,
  document.getElementById('root')
);


