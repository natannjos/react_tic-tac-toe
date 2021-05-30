import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Tabuleiro from './components/Tabuleiro.component'

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

    const mapOfBoard = {
      '0': { row: 1, col: 1 },
      '1': { row: 1, col: 2 },
      '2': { row: 1, col: 3 },
      '3': { row: 2, col: 1 },
      '4': { row: 2, col: 2 },
      '5': { row: 2, col: 3 },
      '6': { row: 3, col: 1 },
      '7': { row: 3, col: 2 },
      '8': { row: 3, col: 3 },
    }

    const vencedor = calculaVencedor(atual.quadrados)

    var idxQuadradoModificado = null
    const jogadas = historico.map((passo, jogada) => {

      passo.quadrados.forEach((current, idx) => {
        if (historico[jogada - 1]?.quadrados[idx] !== current) {
          idxQuadradoModificado = idx.toString()
          return
        }
      })

      const desc = jogada ?
        `Ir para a jogada ${jogada}: col:${mapOfBoard[idxQuadradoModificado].col}, row:${mapOfBoard[idxQuadradoModificado].row}` :
        'Ir para início do jogo'

      return (
        <li key={jogada}>
          <button onClick={() => this.irPara(jogada)}>
            {this.state.numeroPasso === jogada ?
              <b>{desc}</b>
              : desc
            }
          </button>
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


