import React, { Component } from 'react'
import songInfo from '../test-data/blue-boy.json'

export default class Charter extends Component {
    state = {
        songInfo: songInfo,
        songKey: '',
        songMode: '',
        bars: ''
    }

    componentDidMount() {
        const songKeyNum = this.state.songInfo.track.key
        const songModeNum = this.state.songInfo.track.mode
        const songKey = this.keyConverter(songKeyNum)
        const songMode = this.modeConverter(songModeNum)
        const bars = this.state.songInfo.bars.length
        this.setState({ songKey, songMode, bars })
    }

    keyConverter = (keyNum) => {
        let newKey
        const keyMap = {
            'C': 1,
            'C#/Db': 2,
            'D': 3,
            'D#/Eb': 4,
            'E': 5,
            'F': 6,
            'F#/Gb': 7,
            'G': 8,
            'G#/Ab': 9,
            'A': 10,
            'A#/Bb': 11,
            'B': 12,
        }
        const getKey = (object, value) => {
            newKey = Object.keys(object).find(key => object[key] === value)
        }
        getKey(keyMap, keyNum)
        return newKey
    }

    modeConverter = (modeNum) => {
        if (modeNum) {
            return 'Major'
        }
        return 'Minor'

    }

    render() {
        const barDivs = []
        for (let i=0;i<this.state.bars;i++) {
            barDivs.push(<div key={`bar-${i + 1}`} className='bar'>{i + 1}</div>)
        }
        return (
            <div>
                <h2>Song Key:</h2><p>{this.state.songKey} {this.state.songMode}</p>
                <div className='bar-container'>
                    {barDivs}
                </div>
            </div>
        )
    }
}
