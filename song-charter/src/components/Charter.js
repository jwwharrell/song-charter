import React, { Component } from 'react'
import songInfo from '../test-data/blue-boy.json'

export default class Charter extends Component {
    state = {
        songInfo: {songInfo},
        songKey: ''
    }

    componentDidMount() {
        const songKeyNum = this.state.songInfo.songInfo.track.key
        const songKey = this.keyConverter(songKeyNum)
        this.setState({songKey})
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

    render() {
        return (
            <div>
                {this.state.songKey}
            </div>
        )
    }
}
