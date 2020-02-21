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
        let newKey = this.getKey(keyMap, keyNum)
        return newKey
    }

    getKey = (object, value) => {
        return Object.keys(object).find(key => object[key] === value)
    }


    modeConverter = (modeNum) => {
        if (modeNum) {
            return 'Major'
        }
        return 'Minor'

    }

    roundDecimal = num => Math.floor(num * 100) / 100


    render() {
        const bars = this.state.bars
        const segments = this.state.segments
        const renderedBars = []
        for (let i = 0; i < bars.length; i++) {
            bars[i].segments = []
            for (let j = 0; j < segments.length; j++) {
                if (this.roundDecimal(segments[j].start) >= this.roundDecimal(bars[i].start) && this.roundDecimal(segments[j].start) < this.roundDecimal(bars[i].duration + bars[i].start)) {
                    bars[i].segments.push(segments[j])
                }
            }
            renderedBars.push(
                <div key={`bar-${i+1}`} className='bar'>
                    <h3>Bar {i + 1}</h3>
                    <p>Timestamp: {this.roundDecimal(bars[i].start)} - {this.roundDecimal(bars[i].duration + bars[i].start)}</p>
                    <div className='segments'>
                        <h4>Segments</h4>
                        <ul>
                            {bars[i].segments.map((segment) => {
                                return (
                                    <li>{this.roundDecimal(segment.start)} - {this.roundDecimal(segment.start + segment.duration)} | Note: {this.getKey(segment.pitches, 1)}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )
        }
        console.log(renderedBars)

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
