import React, { Component } from 'react'
import songInfo from '../test-data/blue-boy.json'

export default class Charter extends Component {
    state = {
        songInfo: songInfo,
        songKey: '',
        songMode: '',
        bars: '',
        beats: '',
        segments: ''
    }

    componentDidMount() {
        const songKeyNum = this.state.songInfo.track.key
        const songModeNum = this.state.songInfo.track.mode
        const bars = this.state.songInfo.bars
        const beats = this.state.songInfo.beats
        const segments = this.state.songInfo.segments
        const songKey = this.keyConverter(songKeyNum)
        const songMode = this.modeConverter(songModeNum)
        this.setState({ songKey, songMode, bars, beats, segments })
    }

    keyConverter = (keyNum) => {
        const keyMap = {
            'C': 0,
            'C#/Db': 1,
            'D': 2,
            'D#/Eb': 3,
            'E': 4,
            'F': 5,
            'F#/Gb': 6,
            'G': 7,
            'G#/Ab': 8,
            'A': 9,
            'A#/Bb': 10,
            'B': 11,
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
        const beats = this.state.beats
        const segments = this.state.segments
        const renderedBars = []
        for (let i = 0; i < bars.length; i++) {
            bars[i].segments = []
            bars[i].beats = []
            for (let j = 0; j < segments.length; j++) {
                if (this.roundDecimal(segments[j].start) >= this.roundDecimal(bars[i].start) && this.roundDecimal(segments[j].start) < this.roundDecimal(bars[i].duration + bars[i].start)) {
                    bars[i].segments.push(segments[j])
                }
            }
            for (let k = 0; k < beats.length; k++) {
                if (this.roundDecimal(beats[k].start) >= this.roundDecimal(bars[i].start) && this.roundDecimal(beats[k].start) < this.roundDecimal(bars[i].duration + bars[i].start)) {
                    bars[i].beats.push(beats[k])
                }
            }
            renderedBars.push(
                <div key={`bar-${i + 1}`} className='bar'>
                    <h3>Bar {i + 1}</h3>
                    <p>Timestamp: {this.roundDecimal(bars[i].start)} - {this.roundDecimal(bars[i].duration + bars[i].start)}</p>
                    <div>
                        {bars[i].beats.map((beat, beatIndex) => {
                            return (
                                <span key={`bar-${i + 1}-beat-${beatIndex + 1}`}> Beat-{beatIndex + 1} </span>
                        )
                        })}
                    </div>
                    <div className='segments'>
                        <h4>Segments</h4>
                        <ul>
                            {bars[i].segments.map((segment, ind) => {
                                let filteredPitches = []
                                segment.pitches.forEach((pitch, index) => {
                                    if (pitch > 0.7) {
                                        filteredPitches.push(index)
                                    }
                                })
                                let noteLetter = filteredPitches.map((note) => {
                                    return this.keyConverter(Number(note))
                                })
                                return (
                                    <li key={`bar-${i + 1}-segment-${ind + 1}`}>
                                        {this.roundDecimal(segment.start)} - {this.roundDecimal(segment.start + segment.duration)} | Notes: {noteLetter.toString()}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
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
