import midi from "./midi-note-name.js";

function transposedNoteToConcertMIDI(note) {
  for (const [midi_note, note_names] of midi) {
    if (note_names.indexOf(note) != -1) {
      return midi_note - 2;
    }
  }
}

function transposedNoteToFrequency(note) {
  // A = 442
  // 69 is the MIDI number for concert A4
  return 442 * 2 ** ((transposedNoteToConcertMIDI(note) - 69) / 12);
}

let playing_now = [];
function playTransposed(note) {
  let ctx = new window.AudioContext();
  let osc = ctx.createOscillator();
  let gain = ctx.createGain();
  gain.connect(ctx.destination);
  osc.connect(gain);
  osc.frequency.value = transposedNoteToFrequency(note);
  osc.type = "sine";
  if (playing_now.length > 0) {
    for (const o of playing_now) {
      o.stop(0);
    }
    playing_now = [];
  }
  playing_now.push(osc);
  gain.gain.value = 0.2;
  osc.start(0);
  osc.stop(1);
}

function noteToImg(note) {
  for (const [cands, key] of [
    [["C4", "G4", "C5", "E5", "G5", "C6"], 0],
    [["B3", "F#4", "Gb4", "B4", "D#5", "Eb5", "F#5", "Gb5", "B5"], 1],
    [["A#3", "Bb3", "F4", "A#4", "Bb4", "D5", "F5", "A#5", "Bb5"], 2],
    [["A3", "E4", "A4", "C#5", "Db5", "A5"], 3],
    [["G#3", "Ab3", "D#4", "Eb4", "G#4", "Ab4", "G#5", "Ab5"], 4],
    [["G3", "D4"], 5],
    [["F#3", "Gb3", "C#4", "Db4"], 6],
  ]) {
    if (cands.indexOf(note) != -1) {
      return key;
    }
  }
}

class MyNote extends HTMLElement {
  constructor() {
    super();
    const note = this.getAttribute("data-note");
    const img = document.createElement("img");
    const src = this.getAttribute("data-img") ?? `${noteToImg(note)}.png`;
    img.src = src;
    img.className = "w-full h-full mt-2";
    const btn = document.createElement("button");
    btn.addEventListener("click", (event) => {
      playTransposed(note);
    });
    btn.appendChild(img);
    this.appendChild(btn);
  }
}

class NoteGroup extends HTMLElement {
  constructor() {
    super();
    const row = this.getAttribute("data-row");
    const column = this.getAttribute("data-col");
    const length = this.children.length;
    this.style.display = "grid";
    this.style.gridTemplateColumns = `repeat(${length}, 1fr)`;
    this.style.gridRow = row;
    this.style.gridColumn = column;
  }
}

window.customElements.define("my-note", MyNote);
window.customElements.define("note-group", NoteGroup);
