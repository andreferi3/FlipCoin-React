import React, { Component } from 'react'
import { choice } from './helper'
import Coin from './Coin'

export default class CoinContainer extends Component {

    static defaultProps = {
        coins: [
            {
                side: 'heads',
                url: 'https://tinyurl.com/react-coin-heads-jpg'
            },
            {
                side: 'tails',
                url: 'https://tinyurl.com/react-coin-tails-jpg'
            }
        ]
    }

    constructor(props) {
        super(props)

        this.state = {
            currCoin: null,
            nFlips: 0,
            nHeads: 0,
            nTails: 0
        }

        this.handleClick = this.handleClick.bind(this)
    }

    flipCoin() {
        const newCoin = choice(this.props.coins)
        this.setState(st => {
            return {
                currCoin: newCoin,
                nFlips: st.nFlips + 1,
                nHeads: newCoin.side === 'heads' ? st.nHeads + 1 : st.nHeads,
                nTails: newCoin.side === 'tails' ? st.nTails + 1 : st.nTails
            }
        })
    }

    handleClick(e) {
        if(this.state.nFlips >= 20) {
            this.setState({
                currCoin: null,
                nFlips: 0,
                nHeads: 0,
                nTails: 0
            })

            alert('You have reach limit flip today!')
        } else {
            this.flipCoin()
        }
    }

    render() {
        return (
            <div className='CoinContainer'>
                <h1>Let's Flip Coin!</h1>
                {this.state.currCoin && <Coin info={this.state.currCoin} />}
                <button onClick={this.handleClick}>Flip Me!</button>
                <p>Out of {this.state.nFlips} flips, there have been {this.state.nHeads} heads and {this.state.nTails} tails.</p>
            </div>
        )
    }
}
