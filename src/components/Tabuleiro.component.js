import React from 'react'
import Quadrado from './Quadrado.component'
export default class Tabuleiro extends React.Component {

  renderQuadrado = i => {
    return (
      <Quadrado
        value={this.props.quadrados[i]}
        idx={i}
        onClick={() => this.props.onClick(i)}
        quadradosVencedor={this.props.quadradosVencedor}
      />
    );
  }


  render() {
    let rows = Array(3).fill(null)
    let columns = Array(3).fill(null)
    let counter = 0
    return (
      <div>
        {
          rows.map((row, idx) => (
            <div className="tabuleiro-row" key={idx}>
              {
                columns.map((column, idx) => (
                  <span key={idx}>
                    {this.renderQuadrado(counter++)}
                  </span>
                ))
              }
            </div>
          ))

        }
      </div>
    );
  }
}