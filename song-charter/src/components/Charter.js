import React, { Component } from 'react'
import songInfo from '../test-data/blue-boy.json'

export default class Charter extends Component {
    state = {
        songInfo: songInfo,
        songKey: '',
        songMode: '',
        bars: '',
        segments: ''
    }

    componentDidMount() {
        const songKeyNum = this.state.songInfo.track.key
        const songModeNum = this.state.songInfo.track.mode
        const bars = this.state.songInfo.bars
        const segments = this.state.songInfo.segments
        const songKey = this.keyConverter(songKeyNum)
        const songMode = this.modeConverter(songModeNum)
        this.setState({ songKey, songMode, bars, segments })
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

    roundDecimal = (num) => {
        return Math.floor(num * 100) / 100
    }

    render() {
        const bars = this.state.bars
        const renderedBars = []
        for (let i = 0; i < bars.length; i++) {
            renderedBars.push(
                <div className='bar'>
                    {this.roundDecimal(bars[i].start)} - {this.roundDecimal(bars[i].duration + bars[i].start)}
                </div>
            )
        }

        return (
            <div>
                <h2>Song Key:</h2><p>{this.state.songKey} {this.state.songMode}</p>
                <div className='bar-container'>
                    {renderedBars}
                </div>
            </div>
        )
    }
}
