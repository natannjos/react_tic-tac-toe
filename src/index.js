import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Tabuleiro from './components/Tabuleiro.component'

const initialState = {
  historico: [{
    quadrados: Array(9).fill(null)
  }],
  xIsNext: true,
  numeroPasso: 0,
  inverteJogadas: false,
  quadradosVencedor: [],
  fimDeJogo: false
}

class Jogo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
  }

  handleClick = (i) => {
    const historico = this.state.historico.slice(0, this.state.numeroPasso + 1)
    const atual = historico[historico.length - 1]
    const quadrados = [...atual.quadrados]

    if (calculaVencedor(quadrados)?.quadrados.length > 0 || quadrados[i]) {
      return
    }

    quadrados[i] = this.state.xIsNext ? 'X' : 'O'

    this.setState({
      historico: historico.concat([{
        quadrados
      }]),
      xIsNext: !this.state.xIsNext,
      numeroPasso: historico.length,
    })
    const temVencedor = calculaVencedor(quadrados)?.quadrados.length > 0
    console.log(this.state.numeroPasso)
    if (temVencedor) {
      this.setState({ fimDeJogo: true, quadradosVencedor: calculaVencedor(quadrados).quadradosVencedor })
      return
    } else if (!temVencedor && this.state.numeroPasso >= 8) {
      this.setState({ fimDeJogo: true })
    }

  }

  irPara = passo => {
    this.setState({
      numeroPasso: passo,
      xIsNext: (passo % 2) === 0,
      quadradosVencedor: []
    })
  }

  zerarPartida = () => {
    this.setState(initialState)
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

    const vencedor = calculaVencedor(atual.quadrados)?.quadrados

    var idxQuadradoModificado = null
    let jogadas = historico.map((passo, jogada) => {

      passo.quadrados.forEach((current, idx) => {
        if (historico[jogada - 1]?.quadrados[idx] !== current) {
          idxQuadradoModificado = idx.toString()
          return
        }
      })

      const desc = jogada ?
        `Ir para a jogada ${jogada}: col:${mapOfBoard[idxQuadradoModificado].col}, row:${mapOfBoard[idxQuadradoModificado].row}` :
        'Ir para in??cio do jogo'

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
    else if (!vencedor && this.state.numeroPasso >= 9) status = `Empate`
    else status = `Pr??ximo jogador: ${this.state.xIsNext ? 'X' : 'O'}`

    return (
      <div className="jogo">
        <div className="jogo-tabuleiro">
          <Tabuleiro
            quadrados={atual.quadrados}
            quadradosVencedor={this.state.quadradosVencedor}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="jogo-info">
          <div>
            <button
              onClick={() => { this.setState({ inverteJogadas: !this.state.inverteJogadas }) }
              }>Inverte Hist??rico</button>
          </div>
          <div>
            <h2>{status}</h2>
          </div>
          <ol>{this.state.inverteJogadas ? jogadas.reverse() : jogadas}</ol>
          {this.state.fimDeJogo ? <button onClick={this.zerarPartida}> Come??ar de Novo </button> : ''}


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

      return {
        quadrados: quadrados[a],
        quadradosVencedor: linhas[i]
      }
    }
  }
  return null
}

// ========================================

ReactDOM.render(
  <Jogo />,
  document.getElementById('root')
);


