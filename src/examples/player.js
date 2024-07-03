import { MetaPattern } from "../metaPattern.js";

export class P16Player {
  constructor(pattern) {
    this.pattern = pattern;
  }
  lastPlayedP16 = null;
  
  
  playAtP16(p16) {
    if (p16 !== this.lastPlayedP16) {
      const idx = p16 % this.pattern.length;
      const value = this.pattern.values[idx];
      this.lastPlayedP16 = p16;
      return value;
    }
    return null;
  }  
}

export class ExternalMidiClockPlayer extends P16Player {
  midiClockToP16(midiClock) {
    const p16 = Math.floor(midiClock / 96 * 16);
    return p16;
  }
  
  playAtMidiClock(midiClock) {
    const p16 = this.midiClockToP16(midiClock);
    return this.playAt(p16);
  }  
}

export class FakeMidiClockPlayer extends ExternalMidiClockPlayer {  
  constructor (pattern, bpm) {
    super(pattern);
    this.bpm = bpm;
  }
  startFakeClock() {
    let fakeMidiClock = 0;
    setInterval(() => {
      const playResult = this.playAtMidiClock(fakeMidiClock);
      if (playResult) {
        console.log('PLAYED! ', playResult);
      }
      fakeMidiClock++;
    }, 1000 * 60 / bpm / 96);
  }
}
