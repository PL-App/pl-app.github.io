"use strict";

const LIMIT_COLORS = {
  "3": "rgb(72, 72, 72)",
  "5": "rgb(196, 44, 44)",
  "7": "rgb(80, 96, 248)",
  "11": "rgb(220, 137, 56)",
  "13": "rgb(153, 40, 153)",
  "17": "rgb(47, 156, 47)",
  "19": "rgb(167, 167, 40)",
  "23": "rgb(40, 131, 131)",
};

const TONIC_RATIOS = [
  "64/63", "16/15", "10/9", "8/7", "32/27", "6/5", "5/4", "9/7",
  "4/3", "64/45", "40/27", "3/2", "32/21", "128/81", "8/5", "5/3",
  "12/7", "16/9", "256/135", "160/81", "2/1",
];
const TONIC_RATIO_SET = new Set(TONIC_RATIOS);

const FAMILY_DEFINITIONS = {
  h3: {
    tonics: ["128/81", "32/27", "16/9", "4/3", "2/1", "3/2"],
  },
  h5: {
    tonics: ["160/81", "40/27", "10/9", "5/3", "5/4"],
  },
  sh5: {
    tonics: ["256/135", "64/45", "16/15", "8/5", "6/5"],
  },
  sh7: {
    tonics: ["64/63", "32/21", "8/7", "12/7", "9/7"],
  },
};
const TONIC_FAMILY_ORDER = ["h3", "sh5", "h5", "sh7"];

const LATTICE_BASIS = new Map([
  [3n, [1, 0]],
  [5n, [0, -1]],
  [7n, [13 / 40, -11 / 40]],
  [11n, [-14 / 40, -18 / 40]],
  [13n, [-8 / 40, -4 / 40]],
  [17n, [-5 / 40, -32 / 40]],
  [19n, [7 / 40, -25 / 40]],
  [23n, [20 / 40, -6 / 40]],
]);

const CHROMATIC_NOTE_NAMES = ["A", "B♭", "B", "C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭"];
const NATURAL_NOTE_SEMITONES = { A: 0, B: 2, C: 3, D: 5, E: 7, F: 8, G: 10 };
const HEJI_PRIMES = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n];
const HEJI_TONAL_IDENTITY = [0, 1, 4, -2, -1, 3, 7, -3, 6, -2, 0, 2, 4, -1, 1];
const HEJI_DIATONIC_NOTES = ["F", "C", "G", "D", "A", "E", "B"];
const HEJI_PYTHAGOREAN_SYMBOLS = {
  "-4": ["eJ", "J", "L", "N", "P", "Q", "vQ"],
  "-3": ["eH", "H", "h", "q", "y", "Y", "vY"],
  "-2": ["eG", "G", "g", "p", "x", "X", "vX"],
  "-1": ["eF", "F", "f", "o", "w", "W", "vW"],
  "0": ["eE", "E", "e", "", "v", "V", "vV"],
  "1": ["eD", "D", "d", "m", "u", "U", "vU"],
  "2": ["eC", "C", "c", "l", "t", "T", "vT"],
  "3": ["eB", "B", "b", "k", "s", "S", "vS"],
  "4": ["eI", "I", "K", "M", "O", "R", "vR"],
};
const HEJI_PRIME_SYMBOLS = [
  { exponentIndex: 3, symbols: ["<,", ",", "<", "", ">", ".", ">."], lookup: (exponent) => 3 - exponent },
  { exponentIndex: 4, symbols: ["555", "55", "5", "", "4", "44", "444"], lookup: (exponent) => 3 + exponent },
  { exponentIndex: 5, symbols: ["000", "00", "0", "", "9", "99", "999"], lookup: (exponent) => 3 - exponent },
  { exponentIndex: 6, symbols: [":::", "::", ":", "", ";", ";;", ";;;"], lookup: (exponent) => 3 - exponent },
  { exponentIndex: 7, symbols: ["È", "À", "*", "", "/", "Á", "É"], lookup: (exponent) => 3 + exponent },
  { exponentIndex: 8, symbols: ["666", "66", "6", "", "3", "33", "333"], lookup: (exponent) => 3 + exponent },
  { exponentIndex: 9, symbols: ["777", "77", "7", "", "2", "22", "222"], lookup: (exponent) => 3 + exponent },
  { exponentIndex: 10, symbols: ["111", "11", "1", "", "8", "88", "888"], lookup: (exponent) => 3 - exponent },
  { exponentIndex: 11, symbols: ["ààà", "àà", "à", "", "á", "áá", "ááá"], lookup: (exponent) => 3 + exponent },
  { exponentIndex: 12, symbols: ["---", "--", "-", "", "+", "++", "+++"], lookup: (exponent) => 3 + exponent },
  { exponentIndex: 13, symbols: ["èèè", "èè", "è", "", "é", "éé", "ééé"], lookup: (exponent) => 3 + exponent },
  { exponentIndex: 14, symbols: ["", "", "", "", "", "", ""], lookup: (exponent) => 3 + exponent },
];

const chordData = window.HN_CHORD_DATA;
if (!chordData) throw new Error("Les données d’accords ne sont pas chargées.");

const DEFAULT_TONIC = "4/3";
const CHORD_LIMITS = ["L5", "L7", "L11", "L13"];
const CHORDS_WITHOUT_VISIBLE_LIMIT = new Set(["sus2", "sus4"]);
// Les clés historiques restent compatibles avec les données sauvegardées;
// seuls leurs libellés visibles suivent le catalogue principal du Traité.
const CHORD_DISPLAY_NAMES = new Map([
  ["m(maj7)", "mmaj7"],
  ["m(maj9)", "mmaj9"],
]);
function chordDisplayName(chordName) {
  return CHORD_DISPLAY_NAMES.get(chordName) ?? chordName;
}
const CHORD_MODE_MODELS = {
  sus2: ["Ionien L5"],
  sus4: ["Ionien L5"],
  M: ["Ionien L5"],
  m: ["Éolien L5"],
  sm: ["Éolien L7"],
  mb5: ["Mixolydien L7", "Phrygien L7m"],
  smb5: ["Phrygien L7sm"],
  "#5": ["Ionien #5 L5"],
  6: ["Ionien L5"],
  add9: ["Ionien L5"],
  add11: ["Ionien L5"],
  "add#11": ["Lydien L5", "Lydien L7", "Lydien L11"],
  addb6: ["Majeure harmonique L13"],
  "Fr+6": ["Lydien dom. b6 L5"],
  "Gr+6": ["Mineur harmonique #4 L5"],
  m6: ["Dorien L7m"],
  sm6: ["Dorien L7sm"],
  madd9: ["Éolien L5"],
  madd11: ["Éolien L5"],
  smadd9: ["Éolien L7"],
  smadd11: ["Éolien L7"],
  maddb9: ["Phrygien L7m"],
  smaddb9: ["Phrygien L7sm"],
  maj7: ["Ionien L5"],
  maj9: ["Ionien L5"],
  "6add#11": ["Lydien L7"],
  "maj7#11": ["Lydien L5"],
  "maj9#11": ["Lydien L5"],
  "maj7#5": ["Ionien #5 L5"],
  "m(maj7)": ["Mineur mélodique L5"],
  "m(maj9)": ["Mineur mélodique L5"],
  7: ["Mixolydien L7"],
  9: ["Mixolydien L7"],
  "9#11": ["Lydien b7 L11"],
  "7b13": ["Mixolydien b6 L13"],
  "9b13": ["Mixolydien b6 L13"],
  m7: ["Éolien L5"],
  m9: ["Éolien L5"],
  "7no3": ["Mixolydien L7"],
  "9no3": ["Mixolydien L7"],
  m7b5: ["Mixolydien L7"],
  m7b9: ["Phrygien L7m"],
};
const ALL_CHORD_RATIOS = [...new Set(
  Object.values(chordData.chords).flatMap((chord) => (
    chord.variants.flatMap((variant) => variant.pitchRatios)
  )),
)].sort((first, second) => {
  const firstFraction = parseFraction(first);
  const secondFraction = parseFraction(second);
  if (!firstFraction || !secondFraction) return 0;
  return (
    Number(firstFraction.numerator) / Number(firstFraction.denominator)
    - Number(secondFraction.numerator) / Number(secondFraction.denominator)
  );
});
const MODE_TABLE_GRID_WEIGHTS = [
  339, 385, 293, 339, 680, 339, 343, 680, 340, 340,
  681, 680, 340, 342, 680, 340, 340, 680, 681,
];
const MODE_TABLE_SLOTS = {
  "1": [1, 3],
  "♭2": [3, 5],
  "2": [5, 6],
  "♭3": [6, 8],
  "3": [8, 9],
  "♭4": [8, 9],
  "4": [9, 11],
  "♯4": [11, 12],
  "♭5": [11, 12],
  "5": [12, 13],
  "♯5": [13, 15],
  "♭6": [13, 15],
  "6": [15, 16],
  "♭7": [16, 18],
  "7": [18, 19],
  "8": [19, 20],
};
const MODE_FAMILY_BOUNDARIES = [3, 6, 9, 13, 16, 19];
const CONCORDANT_DEGREE_BANDS = [
  { label: "1", maxCents: 45 },
  { label: "♭2", maxCents: 150 },
  { label: "2", maxCents: 250 },
  { label: "♭3", maxCents: 350 },
  { label: "3", maxCents: 450 },
  { label: "4", maxCents: 540 },
  { label: "♯4/♭5", maxCents: 650 },
  { label: "5", maxCents: 750 },
  { label: "♭6", maxCents: 850 },
  { label: "6", maxCents: 950 },
  { label: "♭7", maxCents: 1050 },
  { label: "7", maxCents: 1170 },
  { label: "8", maxCents: Number.POSITIVE_INFINITY },
];
const DEGREE_SPELLING_OVERRIDES = new Map([
  ["13/10", "♭4"],
  ["25/16", "♯5"],
]);

const state = {
  audioOctave: 0,
  connectionLevel: 1,
  connectionLevelManual: false,
  displayMode: "heji",
  selectedChordName: null,
  selectedTonic: DEFAULT_TONIC,
  selectedVariantIndex: 0,
  showLabels: true,
  textOffset: 2,
  textSize: 2,
};

const elements = {
  audioOctaveButtons: [...document.querySelectorAll("[data-audio-octave]")],
  appTitle: document.querySelector("#app-title"),
  chordMenuButton: document.querySelector("#chord-menu-button"),
  chordMenuLabel: document.querySelector("#chord-menu-label"),
  chordMenuPopover: document.querySelector("#chord-menu-popover"),
  chordSelect: document.querySelector("#chord-select"),
  chordTableContent: document.querySelector("#chord-table-content"),
  chordTableSection: document.querySelector("#chord-table-section"),
  chordTableTitle: document.querySelector("#chord-table-title"),
  chordVariantSelector: document.querySelector("#chord-variant-selector"),
  connectionButtons: [...document.querySelectorAll("[data-connection-level]")],
  displayButtons: [...document.querySelectorAll("[data-display]")],
  networkLines: document.querySelector("#network-lines"),
  networkNodes: document.querySelector("#network-nodes"),
  networkScroll: document.querySelector("#network-scroll"),
  networkStage: document.querySelector("#network-stage"),
  networkStatus: document.querySelector("#network-status"),
  optionsButton: document.querySelector("#options-button"),
  optionsPopover: document.querySelector("#options-popover"),
  primarySelection: document.querySelector("#primary-selection"),
  selectionSummary: document.querySelector("#selection-summary"),
  showLabels: document.querySelector("#show-labels"),
  soundControls: document.querySelector("#sound-controls"),
  soundHoverHint: document.querySelector("#sound-hover-hint"),
  soundMuteButton: document.querySelector("#sound-mute-button"),
  textOffset: document.querySelector("#text-offset"),
  textSize: document.querySelector("#text-size"),
  tonicMenuPopover: document.querySelector("#tonic-menu-popover"),
  tonicMiniMap: document.querySelector("#tonic-mini-map"),
};

const AUDIO_REFERENCE_A3_HZ = 220;
const AUDIO_VOICE_GAIN = 0.045;
const AUDIO_KEYBOARD_ROWS = [
  ["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"],
  ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon"],
  ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP"],
];
const AUDIO_KEYBOARD_MAP = new Map(
  AUDIO_KEYBOARD_ROWS.flatMap((codes, row) => codes.map((code, index) => [code, { index, row }])),
);
const audioEngine = {
  compressor: null,
  context: null,
  generation: 0,
  keyboardVoices: new Map(),
  latchedPending: new Set(),
  latchedVoices: new Map(),
  master: null,
  pressedKeyboardCodes: new Set(),
  resumePromise: null,
};

function greatestCommonDivisor(a, b) {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) [x, y] = [y, x % y];
  return x;
}

function simplify(fraction) {
  const divisor = greatestCommonDivisor(fraction.numerator, fraction.denominator);
  return { numerator: fraction.numerator / divisor, denominator: fraction.denominator / divisor };
}

function parseFraction(value) {
  const match = String(value).trim().match(/^(\d+)\s*\/\s*(\d+)$/);
  if (!match) return null;
  const numerator = BigInt(match[1]);
  const denominator = BigInt(match[2]);
  if (numerator === 0n || denominator === 0n) return null;
  return simplify({ numerator, denominator });
}

function fractionToString(fraction) {
  const reduced = simplify(fraction);
  return `${reduced.numerator}/${reduced.denominator}`;
}

function reduceToOctave(fraction) {
  let { numerator, denominator } = simplify(fraction);
  while (numerator < denominator) numerator *= 2n;
  while (numerator >= denominator * 2n) {
    denominator *= 2n;
    ({ numerator, denominator } = simplify({ numerator, denominator }));
  }
  return simplify({ numerator, denominator });
}

function multiplyAndReduce(firstValue, secondValue) {
  const first = parseFraction(firstValue);
  const second = parseFraction(secondValue);
  if (!first || !second) return null;
  return fractionToString(reduceToOctave({
    numerator: first.numerator * second.numerator,
    denominator: first.denominator * second.denominator,
  }));
}

function divideAndReduce(firstValue, secondValue) {
  const first = parseFraction(firstValue);
  const second = parseFraction(secondValue);
  if (!first || !second) return null;
  return fractionToString(reduceToOctave({
    numerator: first.numerator * second.denominator,
    denominator: first.denominator * second.numerator,
  }));
}

function greatestPrimeFactor(value) {
  let remaining = value < 0n ? -value : value;
  let greatest = 1n;
  while (remaining % 2n === 0n && remaining > 1n) {
    greatest = 2n;
    remaining /= 2n;
  }
  let divisor = 3n;
  while (divisor * divisor <= remaining) {
    while (remaining % divisor === 0n) {
      greatest = divisor;
      remaining /= divisor;
    }
    divisor += 2n;
  }
  return remaining > 1n ? remaining : greatest;
}

function colorForInteger(value) {
  if (!/^\d+$/.test(value) || value === "0") return "var(--ink)";
  const factor = greatestPrimeFactor(BigInt(value));
  const limit = factor <= 3n ? "3" : factor.toString();
  return LIMIT_COLORS[limit] ?? "var(--ink)";
}

function colorForPrime(prime) {
  const limit = prime <= 3n ? "3" : prime.toString();
  return LIMIT_COLORS[limit] ?? "var(--ink)";
}

function factorOddPrimes(fraction) {
  const exponents = new Map();
  const addFactors = (value, direction) => {
    let remaining = value;
    while (remaining % 2n === 0n && remaining > 1n) remaining /= 2n;
    let divisor = 3n;
    while (divisor * divisor <= remaining) {
      while (remaining % divisor === 0n) {
        exponents.set(divisor, (exponents.get(divisor) ?? 0) + direction);
        remaining /= divisor;
      }
      divisor += 2n;
    }
    if (remaining > 1n) exponents.set(remaining, (exponents.get(remaining) ?? 0) + direction);
  };
  addFactors(fraction.numerator, 1);
  addFactors(fraction.denominator, -1);
  for (const [prime, exponent] of exponents) if (exponent === 0) exponents.delete(prime);
  return exponents;
}

function latticeBasisForPrime(prime) {
  const known = LATTICE_BASIS.get(prime);
  if (known) return known;
  const numericPrime = Number(prime);
  const angle = ((numericPrime % 31) / 31) * Math.PI * 2 + 0.31;
  const radius = 0.9 + Math.min(0.8, Math.log(numericPrime) / 10);
  return [Math.cos(angle) * radius, Math.sin(angle) * radius];
}

function latticeExponentKey(exponents) {
  return [...exponents.entries()]
    .sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))
    .map(([prime, exponent]) => `${prime}:${exponent}`)
    .join("|");
}

function latticeDistance(first, second) {
  const primes = new Set([...first.keys(), ...second.keys()]);
  let distance = 0;
  for (const prime of primes) distance += Math.abs((first.get(prime) ?? 0) - (second.get(prime) ?? 0));
  return distance;
}

function setLatticeExponent(exponents, prime, exponent) {
  if (exponent === 0) exponents.delete(prime);
  else exponents.set(prime, exponent);
}

function latticeIntermediateExponents(first, second) {
  if (latticeDistance(first, second) !== 2) return [];
  const differences = [...new Set([...first.keys(), ...second.keys()])]
    .map((prime) => ({ difference: (first.get(prime) ?? 0) - (second.get(prime) ?? 0), prime }))
    .filter(({ difference }) => difference !== 0);
  if (differences.length === 1 && Math.abs(differences[0].difference) === 2) {
    const intermediate = new Map(second);
    const { difference, prime } = differences[0];
    setLatticeExponent(intermediate, prime, (second.get(prime) ?? 0) + difference / 2);
    return [intermediate];
  }
  if (differences.length === 2 && differences.every(({ difference }) => Math.abs(difference) === 1)) {
    return differences.map(({ difference, prime }) => {
      const intermediate = new Map(second);
      setLatticeExponent(intermediate, prime, (second.get(prime) ?? 0) + difference);
      return intermediate;
    });
  }
  return [];
}

function latticeNeighbourPrime(first, second) {
  const primes = new Set([...first.keys(), ...second.keys()]);
  let changedPrime = null;
  for (const prime of primes) {
    const difference = (first.get(prime) ?? 0) - (second.get(prime) ?? 0);
    if (difference === 0) continue;
    if (Math.abs(difference) !== 1 || changedPrime !== null) return null;
    changedPrime = prime;
  }
  return changedPrime;
}

function buildLatticeLayout(values, connectionLevel = state.connectionLevel, requiredAuxiliaryExponents = []) {
  const uniqueNodes = new Map();
  for (const ratio of values) {
    const fraction = parseFraction(ratio);
    if (!fraction) continue;
    const exponents = factorOddPrimes(fraction);
    const key = latticeExponentKey(exponents);
    const existing = uniqueNodes.get(key);
    if (existing) {
      if (!existing.aliases.includes(ratio)) existing.aliases.push(ratio);
    } else {
      uniqueNodes.set(key, { aliases: [ratio], auxiliary: false, exponents, ratio });
    }
  }
  const primaryNodes = [...uniqueNodes.values()];
  const allNodes = [...primaryNodes];
  if (connectionLevel === 2) {
    const primaryKeys = new Set(primaryNodes.map(({ exponents }) => latticeExponentKey(exponents)));
    const auxiliaryKeys = new Set();
    for (let first = 0; first < primaryNodes.length; first += 1) {
      for (let second = first + 1; second < primaryNodes.length; second += 1) {
        for (const intermediate of latticeIntermediateExponents(primaryNodes[first].exponents, primaryNodes[second].exponents)) {
          const key = latticeExponentKey(intermediate);
          if (primaryKeys.has(key) || auxiliaryKeys.has(key)) continue;
          auxiliaryKeys.add(key);
          allNodes.push({ aliases: [], auxiliary: true, exponents: intermediate, ratio: null });
        }
      }
    }
    for (const exponents of requiredAuxiliaryExponents) {
      const key = latticeExponentKey(exponents);
      if (primaryKeys.has(key) || auxiliaryKeys.has(key)) continue;
      auxiliaryKeys.add(key);
      allNodes.push({ aliases: [], auxiliary: true, exponents, ratio: null });
    }
  }
  const rawNodes = allNodes.map((node) => {
    let rawX = 0;
    let rawY = 0;
    for (const [prime, exponent] of node.exponents) {
      const [basisX, basisY] = latticeBasisForPrime(prime);
      rawX += basisX * exponent;
      rawY += basisY * exponent;
    }
    return { ...node, rawX, rawY };
  });
  const minX = Math.min(...rawNodes.map((node) => node.rawX));
  const maxX = Math.max(...rawNodes.map((node) => node.rawX));
  const minY = Math.min(...rawNodes.map((node) => node.rawY));
  const maxY = Math.max(...rawNodes.map((node) => node.rawY));
  const spanX = maxX - minX;
  const spanY = maxY - minY;
  const scaleX = spanX === 0 ? Number.POSITIVE_INFINITY : 900 / spanX;
  const scaleY = spanY === 0 ? Number.POSITIVE_INFINITY : 500 / spanY;
  const unitScale = spanX === 0 && spanY === 0 ? 1 : Math.min(scaleX, scaleY);
  const offsetX = (1000 - spanX * unitScale) / 2 - minX * unitScale;
  const offsetY = (620 - spanY * unitScale) / 2 - minY * unitScale;
  const nodes = rawNodes.map((node) => ({
    ...node,
    x: spanX === 0 && spanY === 0 ? 500 : offsetX + node.rawX * unitScale,
    y: spanX === 0 && spanY === 0 ? 310 : offsetY + node.rawY * unitScale,
  }));
  const edges = [];
  for (let first = 0; first < nodes.length; first += 1) {
    for (let second = first + 1; second < nodes.length; second += 1) {
      const prime = latticeNeighbourPrime(nodes[first].exponents, nodes[second].exponents);
      if (prime !== null) edges.push({ auxiliary: nodes[first].auxiliary || nodes[second].auxiliary, first, second, prime });
    }
  }
  return { edges, nodes };
}

function positiveModulo(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function getPrimeExponents(fraction) {
  let numerator = fraction.numerator;
  let denominator = fraction.denominator;
  const exponents = [];
  for (const prime of HEJI_PRIMES) {
    let exponent = 0;
    while (numerator % prime === 0n) { exponent += 1; numerator /= prime; }
    while (denominator % prime === 0n) { exponent -= 1; denominator /= prime; }
    exponents.push(exponent);
  }
  return numerator === 1n && denominator === 1n ? exponents : null;
}

function ratioToHeji(value) {
  const fraction = parseFraction(value);
  if (!fraction) return null;
  const exponents = getPrimeExponents(fraction);
  if (!exponents || Math.abs(exponents[2]) > 4) return null;
  for (const { exponentIndex } of HEJI_PRIME_SYMBOLS) if (Math.abs(exponents[exponentIndex]) > 3) return null;
  const tonalPosition = exponents.reduce((sum, exponent, index) => sum + exponent * HEJI_TONAL_IDENTITY[index], 0);
  const chromaticPosition = tonalPosition + 25;
  if (chromaticPosition < 0 || chromaticPosition > 48) return null;
  const note = HEJI_DIATONIC_NOTES[positiveModulo(tonalPosition + 4, 7)];
  const pythagoreanGroup = Math.floor(chromaticPosition / 7);
  const pythagorean = HEJI_PYTHAGOREAN_SYMBOLS[exponents[2]]?.[pythagoreanGroup];
  if (pythagorean === undefined) return null;
  const primeSymbols = HEJI_PRIME_SYMBOLS.map(({ exponentIndex, lookup, symbols }) => symbols[lookup(exponents[exponentIndex])]);
  if (primeSymbols.some((symbol) => symbol === undefined)) return null;
  const isPythagoreanNatural = exponents[1] >= -4 && exponents[1] <= 2 && exponents.slice(2).every((exponent) => exponent === 0);
  const conventionalAccidental = pythagoreanGroup - 3;
  const referenceSemitone = positiveModulo(NATURAL_NOTE_SEMITONES[note] + conventionalAccidental, 12);
  return {
    accidental: `${primeSymbols.reverse().join("")}${pythagorean}${isPythagoreanNatural ? "n" : ""}`,
    conventionalAccidental,
    note,
    referenceSemitone,
  };
}

function plainHejiNote(notation) {
  if (!notation) return "Non défini";
  if (notation.conventionalAccidental > 0) return `${notation.note}${"♯".repeat(notation.conventionalAccidental)}`;
  if (notation.conventionalAccidental < 0) return `${notation.note}${"♭".repeat(Math.abs(notation.conventionalAccidental))}`;
  return notation.note;
}

function signedCents(value) {
  const rounded = Math.round(value);
  return rounded >= 0 ? `+${rounded}` : `−${Math.abs(rounded)}`;
}

function isTunerChromaticSpelling(notation) {
  if (notation.conventionalAccidental === 0) return true;
  if (Math.abs(notation.conventionalAccidental) !== 1) return false;
  return new Set([1, 4, 6, 9, 11]).has(notation.referenceSemitone);
}

function ratioToTunerLabel(value, notation) {
  const fraction = parseFraction(value);
  if (!fraction || !notation) return null;
  const ratio = Number(fraction.numerator) / Number(fraction.denominator);
  const cents = 1200 * Math.log2(ratio);
  const referenceCandidates = [notation.referenceSemitone * 100 - 1200, notation.referenceSemitone * 100, notation.referenceSemitone * 100 + 1200];
  const referenceCents = referenceCandidates.reduce((closest, candidate) => Math.abs(cents - candidate) < Math.abs(cents - closest) ? candidate : closest);
  const deviationFromHejiReference = cents - referenceCents;
  const nearestSemitone = Math.round(cents / 100);
  const nearestPitchClass = positiveModulo(nearestSemitone, 12);
  const tunerNote = CHROMATIC_NOTE_NAMES[nearestPitchClass];
  const deviation = Math.round(cents - nearestSemitone * 100);
  if (nearestPitchClass === notation.referenceSemitone && isTunerChromaticSpelling(notation) && Math.abs(deviationFromHejiReference) <= 50) {
    return signedCents(deviationFromHejiReference);
  }
  return `${tunerNote}${signedCents(deviation)}`;
}

function ratioToTableCents(value, notation) {
  return ratioToTunerLabel(value, notation);
}

function createColorizedRatio(value) {
  const wrapper = document.createElement("span");
  wrapper.className = "colorized-ratio";
  wrapper.setAttribute("aria-label", value);
  const [numerator, denominator] = value.split("/");
  const numeratorSpan = document.createElement("span");
  numeratorSpan.textContent = numerator;
  numeratorSpan.style.color = colorForInteger(numerator);
  wrapper.append(numeratorSpan);
  if (denominator !== undefined) {
    const slash = document.createElement("span");
    slash.className = "ratio-slash";
    slash.textContent = "/";
    const denominatorSpan = document.createElement("span");
    denominatorSpan.textContent = denominator;
    denominatorSpan.style.color = colorForInteger(denominator);
    wrapper.append(slash, denominatorSpan);
  }
  return wrapper;
}

function createHejiPitch(ratio, includeCents = false) {
  const notation = ratioToHeji(ratio);
  if (!notation) {
    const label = document.createElement("span");
    label.className = "undefined-heji";
    label.textContent = "Non défini";
    return label;
  }
  const pitch = document.createElement("span");
  pitch.className = "heji-pitch";
  pitch.setAttribute("aria-label", `${plainHejiNote(notation)}, notation HEJI du rapport ${ratio}`);
  const accidental = document.createElement("span");
  accidental.className = "heji-accidental";
  accidental.setAttribute("aria-hidden", "true");
  accidental.textContent = notation.accidental;
  const note = document.createElement("span");
  note.className = "heji-note";
  note.setAttribute("aria-hidden", "true");
  note.textContent = notation.note;
  pitch.append(accidental, note);
  if (!includeCents) return pitch;
  const wrapper = document.createElement("span");
  wrapper.className = "heji-with-cents";
  const cents = document.createElement("span");
  cents.className = "cents-label";
  cents.textContent = ratioToTunerLabel(ratio, notation);
  wrapper.append(pitch, cents);
  return wrapper;
}

function createDisplayLabel(relativeRatio, absoluteRatio = relativeRatio) {
  if (state.displayMode === "ratio") return createColorizedRatio(relativeRatio);
  return createHejiPitch(absoluteRatio, state.displayMode === "heji-cents");
}

function absoluteRatio(relativeRatio) {
  if (!state.selectedTonic) return relativeRatio;
  return multiplyAndReduce(state.selectedTonic, relativeRatio) ?? relativeRatio;
}

function starPolygonPoints(centerX, centerY, outerRadius, innerRadius) {
  const points = [];
  for (let index = 0; index < 10; index += 1) {
    const radius = index % 2 === 0 ? outerRadius : innerRadius;
    const angle = -Math.PI / 2 + index * Math.PI / 5;
    points.push(`${centerX + Math.cos(angle) * radius},${centerY + Math.sin(angle) * radius}`);
  }
  return points.join(" ");
}

function ratioCents(value) {
  const fraction = parseFraction(value);
  if (!fraction) return 0;
  return 1200 * Math.log2(Number(fraction.numerator) / Number(fraction.denominator));
}

function concordantDegreeLabel(ratio) {
  const override = DEGREE_SPELLING_OVERRIDES.get(ratio);
  if (override) return override;
  const cents = ratioCents(ratio);
  return CONCORDANT_DEGREE_BANDS.find(({ maxCents }) => cents <= maxCents)?.label ?? "8";
}

function activeRatios() {
  const variant = currentVariant();
  if (!variant) return ALL_CHORD_RATIOS;
  return currentChord()?.hiddenFundamental
    ? ["1/1", ...variant.pitchRatios]
    : variant.pitchRatios;
}

function requiresSecondConnectionLevel(values) {
  const levelOneLayout = buildLatticeLayout(values, 1);
  const primaryIndices = levelOneLayout.nodes
    .map((node, index) => (!node.auxiliary ? index : -1))
    .filter((index) => index >= 0);
  if (primaryIndices.length <= 1) return false;
  const neighbours = new Map(primaryIndices.map((index) => [index, []]));
  levelOneLayout.edges.forEach((edge) => {
    neighbours.get(edge.first)?.push(edge.second);
    neighbours.get(edge.second)?.push(edge.first);
  });
  const visited = new Set([primaryIndices[0]]);
  const pending = [primaryIndices[0]];
  while (pending.length) {
    const index = pending.shift();
    (neighbours.get(index) ?? []).forEach((neighbour) => {
      if (visited.has(neighbour)) return;
      visited.add(neighbour);
      pending.push(neighbour);
    });
  }
  return primaryIndices.some((index) => !visited.has(index));
}

function applyAutomaticConnectionLevel(values) {
  if (state.connectionLevelManual) return;
  state.connectionLevel = requiresSecondConnectionLevel(values) ? 2 : 1;
}

function audioPitchKey(relativeRatio) {
  const absolute = absoluteRatio(relativeRatio);
  const fraction = parseFraction(absolute);
  return fraction ? fractionToString(reduceToOctave(fraction)) : absolute;
}

function audioRegisterOffset(relativeRatio) {
  const fraction = parseFraction(relativeRatio);
  if (!fraction) return 0;
  let numerator = fraction.numerator;
  let denominator = fraction.denominator;
  let octave = 0;
  while (numerator >= denominator * 2n) {
    denominator *= 2n;
    octave += 1;
  }
  while (numerator < denominator) {
    numerator *= 2n;
    octave -= 1;
  }
  return octave;
}

function audioVoiceKey(value, octaveShift) {
  return `${value}@${octaveShift}`;
}

function audioPitchClass(value) {
  const notation = ratioToHeji(value);
  if (notation) return notation.referenceSemitone;
  return positiveModulo(Math.round(ratioCents(value) / 100), 12);
}

function normalizedAudioRatio(value) {
  const fraction = parseFraction(value);
  if (!fraction) return null;
  let ratio = Number(fraction.numerator) / Number(fraction.denominator);
  if (!Number.isFinite(ratio) || ratio <= 0) return null;
  while (ratio < 1) ratio *= 2;
  while (ratio >= 2) ratio /= 2;
  return ratio;
}

function audioTonicFrequency() {
  let ratio = normalizedAudioRatio(state.selectedTonic);
  if (!ratio) return null;
  if (audioPitchClass(state.selectedTonic) >= 10) ratio /= 2;
  return AUDIO_REFERENCE_A3_HZ * ratio;
}

function audioFrequency(relativeRatio, octaveShift = state.audioOctave) {
  const tonicFrequency = audioTonicFrequency();
  const ratio = normalizedAudioRatio(relativeRatio);
  if (!tonicFrequency || !ratio) return null;
  return tonicFrequency * ratio * (2 ** octaveShift);
}

function audioNoteLabel(value, frequency) {
  const notation = ratioToHeji(value);
  const midiNote = Number.isFinite(frequency)
    ? Math.round(69 + 12 * Math.log2(frequency / 440))
    : 57;
  const octave = Math.floor(midiNote / 12) - 1;
  return `${plainHejiNote(notation)}${octave}`;
}

async function ensureAudioContext() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return null;
  if (!audioEngine.context) {
    const context = new AudioContextConstructor();
    const master = context.createGain();
    const compressor = context.createDynamicsCompressor();
    master.gain.value = 0.55;
    compressor.threshold.value = -18;
    compressor.knee.value = 12;
    compressor.ratio.value = 8;
    compressor.attack.value = 0.006;
    compressor.release.value = 0.18;
    master.connect(compressor);
    compressor.connect(context.destination);
    audioEngine.context = context;
    audioEngine.master = master;
    audioEngine.compressor = compressor;
  }
  if (audioEngine.context.state === "suspended") {
    if (!audioEngine.resumePromise) {
      audioEngine.resumePromise = audioEngine.context.resume().finally(() => {
        audioEngine.resumePromise = null;
      });
    }
    await audioEngine.resumePromise;
  }
  return audioEngine.context;
}

async function startAudioVoice(value, relativeRatio, octaveShift) {
  const frequency = audioFrequency(relativeRatio, octaveShift);
  if (!frequency) return null;
  const context = await ensureAudioContext();
  if (!context) return null;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(AUDIO_VOICE_GAIN, context.currentTime + 0.025);
  oscillator.connect(gain);
  gain.connect(audioEngine.master);
  oscillator.start();
  return { frequency, gain, octaveShift, oscillator, relativeRatio, value };
}

function stopAudioVoice(voice) {
  if (!voice || !audioEngine.context) return;
  const now = audioEngine.context.currentTime;
  try {
    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setTargetAtTime(0.0001, now, 0.014);
    voice.oscillator.stop(now + 0.08);
  } catch {
    // La voix a déjà terminé.
  }
}

function refreshSoundTrigger(element) {
  const value = element.dataset.audioRatio;
  const relativeRatio = element.dataset.audioRelativeRatio;
  if (!value || !relativeRatio) return;
  const registerOffset = Number(element.dataset.audioRegister ?? 0);
  const triggerOctave = state.audioOctave + registerOffset;
  const key = audioVoiceKey(value, triggerOctave);
  const keyboardCandidates = [...audioEngine.keyboardVoices.values()].filter(
    (candidate) => candidate.value === value,
  );
  const exactKeyboardVoice = keyboardCandidates.find(
    (candidate) => candidate.octaveShift === triggerOctave,
  );
  const fallbackKeyboardVoice = keyboardCandidates[0];
  const hasExactTableTrigger = fallbackKeyboardVoice && [...document.querySelectorAll("[data-audio-ratio]")].some(
    (candidate) => (
      !candidate.classList.contains("network-node")
      && candidate.dataset.audioRatio === value
      && state.audioOctave + Number(candidate.dataset.audioRegister ?? 0) === fallbackKeyboardVoice.octaveShift
    ),
  );
  const octaveIndependentKeyboardVoice = element.classList.contains("network-node")
    || (!hasExactTableTrigger && registerOffset === 0)
    ? fallbackKeyboardVoice
    : null;
  const voice = audioEngine.latchedVoices.get(key)
    ?? exactKeyboardVoice
    ?? octaveIndependentKeyboardVoice;
  const octaveShift = voice?.octaveShift ?? triggerOctave;
  const frequency = voice?.frequency ?? audioFrequency(relativeRatio, octaveShift);
  const noteLabel = audioNoteLabel(value, frequency);
  const active = Boolean(voice);
  element.classList.toggle("is-sounding", active);
  element.setAttribute("aria-pressed", String(active));
  element.setAttribute("aria-label", `${active ? "Arrêter" : "Faire sonner"} ${noteLabel}`);
  element.title = frequency
    ? `${active ? "Arrêter" : "Faire sonner"} ${noteLabel} — ${frequency.toFixed(3)} Hz`
    : `${active ? "Arrêter" : "Faire sonner"} ${noteLabel}`;
  if (active && frequency) element.dataset.audioFrequency = frequency.toFixed(3);
  else delete element.dataset.audioFrequency;
}

function refreshSoundingIndicators() {
  document.querySelectorAll("[data-audio-ratio]").forEach(refreshSoundTrigger);
  const tonicValue = audioPitchKey("1/1");
  const tonicIsSounding = [
    ...audioEngine.latchedVoices.values(),
    ...audioEngine.keyboardVoices.values(),
  ].some((voice) => voice.value === tonicValue);
  elements.tonicMiniMap.querySelectorAll(".tonic-mini-star").forEach((star) => {
    star.classList.toggle("is-sounding", tonicIsSounding);
  });
  elements.audioOctaveButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.audioOctave) === state.audioOctave));
  });
  elements.soundMuteButton.classList.toggle(
    "has-sounding-voices",
    audioEngine.latchedVoices.size + audioEngine.keyboardVoices.size > 0,
  );
}

function configureSoundTrigger(element, relativeRatio, { preserveRegister = false } = {}) {
  element.classList.add("sound-trigger");
  element.dataset.audioRatio = audioPitchKey(relativeRatio);
  element.dataset.audioRelativeRatio = relativeRatio;
  element.dataset.audioRegister = String(preserveRegister ? audioRegisterOffset(relativeRatio) : 0);
  element.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleLatchedSound(relativeRatio, { preserveRegister });
  });
  refreshSoundTrigger(element);
}

async function toggleLatchedSound(relativeRatio, { preserveRegister = false } = {}) {
  const value = audioPitchKey(relativeRatio);
  const octaveShift = state.audioOctave + (preserveRegister ? audioRegisterOffset(relativeRatio) : 0);
  const key = audioVoiceKey(value, octaveShift);
  if (audioEngine.latchedPending.has(key)) return;
  const current = audioEngine.latchedVoices.get(key);
  if (current) {
    audioEngine.latchedVoices.delete(key);
    stopAudioVoice(current);
    refreshSoundingIndicators();
    return;
  }
  audioEngine.latchedPending.add(key);
  const generation = audioEngine.generation;
  try {
    const voice = await startAudioVoice(value, relativeRatio, octaveShift);
    if (!voice) return;
    if (generation !== audioEngine.generation) {
      stopAudioVoice(voice);
      return;
    }
    audioEngine.latchedVoices.set(key, voice);
    refreshSoundingIndicators();
  } finally {
    audioEngine.latchedPending.delete(key);
  }
}

function stopKeyboardSounds() {
  audioEngine.keyboardVoices.forEach(stopAudioVoice);
  audioEngine.keyboardVoices.clear();
  audioEngine.pressedKeyboardCodes.clear();
  refreshSoundingIndicators();
}

function stopAllSounds() {
  audioEngine.generation += 1;
  audioEngine.latchedPending.clear();
  audioEngine.latchedVoices.forEach(stopAudioVoice);
  audioEngine.latchedVoices.clear();
  stopKeyboardSounds();
}

function keyboardScaleRatios() {
  const unique = [];
  const seen = new Set();
  activeRatios()
    .slice()
    .sort((first, second) => ratioCents(first) - ratioCents(second))
    .forEach((relativeRatio) => {
      const value = audioPitchKey(relativeRatio);
      if (seen.has(value)) return;
      seen.add(value);
      unique.push({ relativeRatio, value });
    });
  return unique;
}

function keyboardPitch(code) {
  const mapping = AUDIO_KEYBOARD_MAP.get(code);
  if (!mapping) return null;

  if (state.selectedChordName) {
    if (mapping.index > 7) return null;
    const chord = currentChord();
    const variant = currentVariant();
    if (!chord || !variant) return null;
    const tone = chordTones(chord, variant).find(({ degree }) => {
      const match = normalizedDegreeLabel(degree).match(/(\d+)/);
      if (!match) return false;
      const degreeNumber = Number(match[1]);
      const keyboardIndex = degreeNumber === 8 ? 7 : (degreeNumber - 1) % 7;
      return keyboardIndex === mapping.index;
    });
    if (!tone) return null;
    const octaveOffset = mapping.row - 1;
    const relativeRatio = chordAudioRatio(tone.ratio);
    return {
      octaveShift: state.audioOctave + octaveOffset,
      relativeRatio,
      value: audioPitchKey(relativeRatio),
    };
  }

  const scale = keyboardScaleRatios();
  if (!scale.length) return null;
  const degree = mapping.index + mapping.row * AUDIO_KEYBOARD_ROWS[0].length;
  const octaveOffset = Math.floor(degree / scale.length);
  const index = positiveModulo(degree, scale.length);
  return {
    octaveShift: state.audioOctave + octaveOffset,
    relativeRatio: scale[index].relativeRatio,
    value: scale[index].value,
  };
}

function isTypingTarget(target) {
  return target instanceof HTMLElement && (
    target.isContentEditable || ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)
  );
}

function chordSpecificAuxiliaryExponents() {
  if (state.selectedChordName !== "Gr+6" || currentVariant()?.label !== "L5") return [];
  const missingLimitFiveStep = parseFraction("9/8");
  return missingLimitFiveStep ? [factorOddPrimes(missingLimitFiveStep)] : [];
}

function renderNetwork() {
  const ratios = activeRatios();
  applyAutomaticConnectionLevel(ratios);
  const layout = buildLatticeLayout(ratios, state.connectionLevel, chordSpecificAuxiliaryExponents());
  elements.networkLines.replaceChildren();
  elements.networkNodes.replaceChildren();
  layout.edges.forEach((edge) => {
    const first = layout.nodes[edge.first];
    const second = layout.nodes[edge.second];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    if (edge.auxiliary) line.classList.add("network-line-auxiliary");
    line.setAttribute("x1", String(first.x));
    line.setAttribute("y1", String(first.y));
    line.setAttribute("x2", String(second.x));
    line.setAttribute("y2", String(second.y));
    line.style.stroke = colorForPrime(edge.prime);
    elements.networkLines.append(line);
  });
  layout.nodes.forEach((node) => {
    if (node.auxiliary) {
      const dot = document.createElement("span");
      dot.className = "network-auxiliary-dot";
      dot.style.left = `${node.x / 10}%`;
      dot.style.top = `${(node.y / 620) * 100}%`;
      elements.networkNodes.append(dot);
      return;
    }
    const ratio = node.aliases[0] ?? node.ratio;
    const implicitRoot = Boolean(currentChord()?.hiddenFundamental && node.aliases.includes("1/1"));
    const tonicNode = node.aliases.includes(currentChordAnchorRatio());
    const button = document.createElement(implicitRoot ? "span" : "button");
    if (!implicitRoot) button.type = "button";
    button.className = `network-node is-chord-tone${implicitRoot ? " is-implicit-root" : ""}`;
    button.style.left = `${node.x / 10}%`;
    button.style.top = `${(node.y / 620) * 100}%`;
    if (state.showLabels) {
      const label = document.createElement("span");
      label.className = "node-label";
      label.append(createDisplayLabel(ratio, chordAbsoluteRatio(ratio)));
      button.append(label);
    }
    if (tonicNode && !implicitRoot) {
      const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      star.classList.add("node-root-star");
      star.setAttribute("viewBox", "0 0 44 44");
      const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      polygon.setAttribute("points", starPolygonPoints(22, 22, 18, 8));
      star.append(polygon);
      button.append(star);
    } else {
      const dot = document.createElement("span");
      dot.className = "node-dot";
      button.append(dot);
    }
    if (!implicitRoot) configureSoundTrigger(button, chordAudioRatio(ratio));
    elements.networkNodes.append(button);
  });
  const chordName = state.selectedChordName ? `, accord ${chordDisplayName(state.selectedChordName)}` : "";
  const soundingCount = layout.nodes.filter((node) => (
    !node.auxiliary
    && !(currentChord()?.hiddenFundamental && node.aliases.includes("1/1"))
  )).length;
  elements.networkStatus.textContent = `${soundingCount} hauteurs distinctes${chordName}, tonique ${state.selectedTonic}.`;
}

function renderTonicMiniMap() {
  elements.tonicMiniMap.replaceChildren();
  if (!state.selectedTonic) return;
  const layout = buildLatticeLayout(TONIC_RATIOS, 1);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 1000 620");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `Réseau de sélection directe; tonique courante ${state.selectedTonic}`);
  layout.edges.forEach((edge) => {
    const first = layout.nodes[edge.first];
    const second = layout.nodes[edge.second];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.classList.add("tonic-mini-line");
    line.setAttribute("x1", String(first.x));
    line.setAttribute("y1", String(first.y));
    line.setAttribute("x2", String(second.x));
    line.setAttribute("y2", String(second.y));
    line.style.stroke = colorForPrime(edge.prime);
    svg.append(line);
  });
  layout.nodes.filter((node) => !node.auxiliary).forEach((node) => {
    const ratio = node.aliases.find((alias) => TONIC_RATIO_SET.has(alias)) ?? node.ratio;
    const current = node.aliases.includes(state.selectedTonic);
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("tonic-mini-target");
    group.setAttribute("role", "button");
    group.setAttribute("tabindex", "0");
    group.setAttribute("aria-label", current ? "Afficher toutes les hauteurs d’accords" : `Choisir la tonique ${ratio}`);
    const choose = () => current ? showAllAvailableNotes() : selectTonic(ratio);
    group.addEventListener("click", choose);
    group.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      choose();
    });
    const hit = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    hit.classList.add("tonic-mini-hit");
    hit.setAttribute("cx", String(node.x));
    hit.setAttribute("cy", String(node.y));
    hit.setAttribute("r", "38");
    group.append(hit);
    if (current) {
      const star = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      star.classList.add("tonic-mini-star", "tonic-mini-marker");
      star.setAttribute("points", starPolygonPoints(node.x, node.y, 34, 15));
      group.append(star);
    } else {
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.classList.add("tonic-mini-dot", "tonic-mini-marker");
      dot.setAttribute("cx", String(node.x));
      dot.setAttribute("cy", String(node.y));
      dot.setAttribute("r", "10");
      group.append(dot);
    }
    svg.append(group);
  });
  elements.tonicMiniMap.append(svg);
}

function appendFamilyLabel(container, familyKey) {
  const match = familyKey.match(/^(s?h)(3|5|7)$/);
  if (!match) { container.textContent = familyKey; return; }
  container.append(document.createTextNode(match[1]));
  const limit = document.createElement("span");
  limit.textContent = match[2];
  limit.style.color = colorForInteger(match[2]);
  container.append(limit);
}

function renderTonicMenu() {
  elements.tonicMenuPopover.replaceChildren();
  TONIC_FAMILY_ORDER.forEach((familyKey) => {
    const section = document.createElement("section");
    section.className = "tonic-menu-group";
    const heading = document.createElement("strong");
    heading.className = "tonic-menu-family";
    appendFamilyLabel(heading, familyKey);
    section.append(heading);
    FAMILY_DEFINITIONS[familyKey].tonics.forEach((ratio) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tonic-menu-option";
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", String(ratio === state.selectedTonic));
      button.append(createHejiPitch(ratio));
      const ratioLabel = document.createElement("span");
      ratioLabel.className = "tonic-menu-option-ratio";
      ratioLabel.append(createColorizedRatio(ratio));
      button.append(ratioLabel);
      button.addEventListener("click", () => {
        selectTonic(ratio);
      });
      section.append(button);
    });
    elements.tonicMenuPopover.append(section);
  });
}

function renderTonicSummary() {
  elements.selectionSummary.replaceChildren();
  if (!state.selectedTonic) return;
  const tonic = document.createElement("span");
  tonic.className = "summary-tonic";
  tonic.append(createDisplayLabel(state.selectedTonic));
  elements.selectionSummary.append(tonic);
  elements.selectionSummary.setAttribute("aria-label", `Tonique ${plainHejiNote(ratioToHeji(state.selectedTonic))}. Ouvrir la liste des toniques.`);
}

function renderChordSelectionTable() {
  elements.chordSelect.replaceChildren();
  elements.chordMenuPopover.replaceChildren();

  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "Accords";
  elements.chordSelect.append(allOption);

  const allChordsButton = document.createElement("button");
  allChordsButton.type = "button";
  allChordsButton.className = "mode-menu-concordances";
  allChordsButton.dataset.chordName = "";
  allChordsButton.setAttribute("role", "option");
  allChordsButton.textContent = "Accords";
  elements.chordMenuPopover.append(allChordsButton);

  chordData.columns.forEach((column) => {
    const nativeGroup = document.createElement("optgroup");
    nativeGroup.label = column.group;
    const menuGroup = document.createElement("section");
    menuGroup.className = "mode-menu-group";
    const groupTitle = document.createElement("strong");
    groupTitle.className = "mode-menu-level-1";
    groupTitle.textContent = column.group;
    menuGroup.append(groupTitle);

    column.names.forEach((chordName) => {
      const chord = chordData.chords[chordName];
      const availableIndices = availableVariantIndices(chord);
      if (!availableIndices.length) return;
      const contextualIndices = availableIndices.filter((index) => chord.variants[index].contextLabel);

      const appendOption = (variantIndex = null) => {
        const variant = variantIndex === null ? null : chord.variants[variantIndex];
        const contextLabel = variant?.contextLabel ?? "";
        const value = variantIndex === null ? chordName : `${chordName}::${variantIndex}`;
        const displayName = chordDisplayName(chordName);
        const visibleLabel = contextLabel ? `${displayName} (${contextLabel})` : displayName;

        const option = document.createElement("option");
        option.value = value;
        option.textContent = visibleLabel;
        nativeGroup.append(option);

        const familyOption = document.createElement("button");
        familyOption.type = "button";
        familyOption.className = "mode-menu-family-option chord-menu-family-option";
        familyOption.dataset.chordName = chordName;
        if (variantIndex !== null) familyOption.dataset.variantIndex = String(variantIndex);
        familyOption.setAttribute("role", "option");
        const familyName = document.createElement("span");
        familyName.className = "mode-menu-level-2";
        familyName.textContent = displayName;
        familyOption.append(familyName);

        const labels = contextLabel
          ? [contextLabel]
          : [...new Set(availableIndices.map((index) => (
            variantLimitLabel(chordName, index, chord.variants[index])
          )).filter(Boolean))];
        if (labels.length) {
          const limits = document.createElement("span");
          limits.className = "mode-menu-family-limits";
          limits.append(document.createTextNode("("));
          labels.forEach((label, index) => {
            if (index) limits.append(document.createTextNode(" "));
            appendColorizedContext(limits, label);
          });
          limits.append(document.createTextNode(")"));
          familyOption.append(limits);
        }
        menuGroup.append(familyOption);
      };

      if (contextualIndices.length) contextualIndices.forEach(appendOption);
      else appendOption();
    });

    elements.chordSelect.append(nativeGroup);
    elements.chordMenuPopover.append(menuGroup);
  });

  const selectedContext = currentVariant()?.contextLabel
    ? `${state.selectedChordName}::${state.selectedVariantIndex}`
    : state.selectedChordName ?? "";
  elements.chordSelect.value = selectedContext;
  updateChordMenuLabel();
}

function appendColorizedContext(container, value) {
  const match = String(value).match(/^(.*?)(L(?:5|7|11|13))$/);
  if (!match) {
    appendColorizedLimit(container, value);
    return;
  }
  container.append(document.createTextNode(match[1]));
  appendColorizedLimit(container, match[2]);
}

function appendColorizedLimit(container, value) {
  const match = String(value).match(/^(L)(5|7|11|13)(.*)$/);
  if (!match) {
    container.append(document.createTextNode(value));
    return;
  }
  container.append(document.createTextNode(match[1]));
  const limit = document.createElement("span");
  limit.textContent = match[2];
  limit.style.color = colorForInteger(match[2]);
  container.append(limit, document.createTextNode(match[3]));
}

function updateChordMenuLabel() {
  const contextLabel = currentVariant()?.contextLabel ?? "";
  const displayName = state.selectedChordName ? chordDisplayName(state.selectedChordName) : "Accords";
  elements.chordMenuLabel.replaceChildren(document.createTextNode(displayName));
  if (state.selectedChordName && contextLabel) {
    elements.chordMenuLabel.append(document.createTextNode(" ("));
    appendColorizedContext(elements.chordMenuLabel, contextLabel);
    elements.chordMenuLabel.append(document.createTextNode(")"));
  }
  const selectedLabel = state.selectedChordName
    ? `${displayName}${contextLabel ? ` (${contextLabel})` : ""}`
    : "Accords";
  elements.chordMenuButton.setAttribute(
    "aria-label",
    state.selectedChordName
      ? `Accord sélectionné : ${selectedLabel}`
      : "Accords — toutes les hauteurs affichées",
  );
  elements.chordMenuPopover.querySelectorAll("[data-chord-name]").forEach((button) => {
    const variantMatches = button.dataset.variantIndex === undefined
      || Number(button.dataset.variantIndex) === state.selectedVariantIndex;
    button.setAttribute("aria-selected", String(
      button.dataset.chordName === (state.selectedChordName ?? "") && variantMatches,
    ));
  });
  renderVariantSelector(currentChord());
}

function currentChord() {
  return state.selectedChordName ? chordData.chords[state.selectedChordName] : null;
}

function currentVariant() {
  return currentChord()?.variants[state.selectedVariantIndex] ?? null;
}

function contextualModeTonic(variant) {
  return variant?.modeTonicDegreeRatio
    ? divideAndReduce(state.selectedTonic, variant.modeTonicDegreeRatio)
    : state.selectedTonic;
}

function variantAvailableForTonic(variant) {
  const tonic = contextualModeTonic(variant);
  return Boolean(tonic && TONIC_RATIO_SET.has(tonic));
}

function availableVariantIndices(chord) {
  if (!chord) return [];
  return chord.variants
    .map((variant, index) => (variantAvailableForTonic(variant) ? index : -1))
    .filter((index) => index >= 0);
}

function currentChordAnchorRatio() {
  return currentChord()?.hiddenFundamental
    ? currentVariant()?.tonicAnchorRatio ?? "1/1"
    : "1/1";
}

function chordAudioRatio(functionalRatio) {
  return divideAndReduce(functionalRatio, currentChordAnchorRatio()) ?? functionalRatio;
}

function chordAbsoluteRatio(functionalRatio) {
  const relative = chordAudioRatio(functionalRatio);
  return multiplyAndReduce(state.selectedTonic, relative) ?? functionalRatio;
}

function currentModeModel() {
  return state.selectedChordName
    ? CHORD_MODE_MODELS[state.selectedChordName]?.[state.selectedVariantIndex] ?? ""
    : "";
}

function variantLimitLabel(chordName, variantIndex, variant) {
  if (CHORDS_WITHOUT_VISIBLE_LIMIT.has(chordName)) return "";
  if (variant?.label && /^L(?:5|7|11|13)$/.test(variant.label)) return variant.label;
  const model = CHORD_MODE_MODELS[chordName]?.[variantIndex] ?? "";
  const match = model.match(/\bL(5|7|11|13)(?=sm\b|m\b|\b)/);
  return match ? `L${match[1]}` : "";
}

function renderVariantSelector(chord) {
  elements.chordVariantSelector.replaceChildren();
  elements.chordVariantSelector.hidden = false;
  const availableIndices = availableVariantIndices(chord);
  CHORD_LIMITS.forEach((limitLabel) => {
    const indices = availableIndices.filter((variantIndex) => (
      variantLimitLabel(state.selectedChordName, variantIndex, chord.variants[variantIndex]) === limitLabel
    ));
    const currentLimit = currentVariant()
      ? variantLimitLabel(state.selectedChordName, state.selectedVariantIndex, currentVariant())
      : "";
    const index = currentLimit === limitLabel && indices.includes(state.selectedVariantIndex)
      ? state.selectedVariantIndex
      : indices[0] ?? -1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mode-variant-button";
    appendColorizedLimit(button, limitLabel);
    if (index < 0) {
      button.disabled = true;
      button.setAttribute("aria-label", `${limitLabel} non disponible`);
    } else {
      button.dataset.variantIndex = String(index);
      button.setAttribute("aria-pressed", String(currentLimit === limitLabel));
      button.setAttribute("aria-label", `Choisir ${chordDisplayName(state.selectedChordName)} ${limitLabel}`);
    }
    elements.chordVariantSelector.append(button);
  });
}

const DISCORDANT_PROPORTIONS = new Set([
  "13:16", "21:25", "21:26", "25:28", "27:32", "28:33",
  "22:27", "32:29", "32:39", "33:40", "63:80", "64:75", "99:112",
  "112:135", "225:256",
]);

function normalizedDegreeLabel(value) {
  return String(value)
    .replace(/#(?=\d)/g, "♯")
    .replace(/b(?=\d)/g, "♭");
}

function degreeSlotLabel(value) {
  const label = normalizedDegreeLabel(value);
  const extensionMap = {
    "♭9": "♭2",
    "9": "2",
    "♭11": "♭4",
    "11": "4",
    "♯11": "♯4",
    "♭13": "♭6",
    "13": "6",
    "♯13": "♯6",
  };
  return extensionMap[label] ?? label;
}

function modeSlot(label) {
  return MODE_TABLE_SLOTS[degreeSlotLabel(label)] ?? MODE_TABLE_SLOTS["4"];
}

function modeSlotCenter(label) {
  const [start, end] = modeSlot(label);
  const total = MODE_TABLE_GRID_WEIGHTS.reduce((sum, value) => sum + value, 0);
  const before = MODE_TABLE_GRID_WEIGHTS.slice(0, start - 1).reduce((sum, value) => sum + value, 0);
  const width = MODE_TABLE_GRID_WEIGHTS.slice(start - 1, end - 1).reduce((sum, value) => sum + value, 0);
  return ((before + width / 2) / total) * 100;
}

function modeGridLinePercent(gridLine) {
  const total = MODE_TABLE_GRID_WEIGHTS.reduce((sum, value) => sum + value, 0);
  const before = MODE_TABLE_GRID_WEIGHTS.slice(0, gridLine - 1).reduce((sum, value) => sum + value, 0);
  return (before / total) * 100;
}

function placeOnModeGrid(element, label) {
  const [start, end] = modeSlot(label);
  element.style.gridColumn = `${start} / ${end}`;
}

function appendGridBoundary(row, gridLine, className) {
  const boundary = document.createElement("span");
  boundary.className = className;
  boundary.setAttribute("aria-hidden", "true");
  boundary.style.left = `${modeGridLinePercent(gridLine)}%`;
  row.append(boundary);
}

function appendDegreeLabel(container, value) {
  const label = normalizedDegreeLabel(value);
  let plain = "";
  const flushPlain = () => {
    if (!plain) return;
    const text = document.createElement("span");
    text.className = "degree-text";
    text.textContent = plain;
    container.append(text);
    plain = "";
  };
  for (const character of label) {
    if (character === "♭" || character === "♯") {
      flushPlain();
      const accidental = document.createElement("span");
      accidental.className = "degree-accidental";
      accidental.textContent = character;
      container.append(accidental);
    } else {
      plain += character;
    }
  }
  flushPlain();
}

function displayChordDegree(value) {
  const label = normalizedDegreeLabel(value);
  if (label === "9") return "2";
  if (label === "♭9") return "♭2";
  return label;
}

function chordTones(chord, variant) {
  const degreeLabels = variant.functionDegrees ?? chord.functionDegrees ?? chord.degrees;
  return degreeLabels.map((degree, index) => ({
    degree,
    ratio: variant.pitchRatios[index],
    slot: degreeSlotLabel(degree),
  })).sort((first, second) => (
    modeSlotCenter(first.slot) - modeSlotCenter(second.slot)
    || ratioCents(first.ratio) - ratioCents(second.ratio)
  ));
}

function diatonicDegreeNumber(value) {
  const match = degreeSlotLabel(value).match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function intervalProportion(lowerValue, upperValue) {
  const lower = parseFraction(lowerValue);
  const upper = parseFraction(upperValue);
  if (!lower || !upper) return "";
  let interval = simplify({
    numerator: upper.numerator * lower.denominator,
    denominator: upper.denominator * lower.numerator,
  });
  while (interval.numerator < interval.denominator) {
    interval.numerator *= 2n;
    interval = simplify(interval);
  }
  while (interval.numerator >= interval.denominator * 2n) {
    interval.denominator *= 2n;
    interval = simplify(interval);
  }
  return `${interval.denominator}:${interval.numerator}`;
}

function createColorizedProportion(value) {
  const wrapper = document.createElement("span");
  wrapper.className = "colorized-ratio";
  if (DISCORDANT_PROPORTIONS.has(value)) {
    wrapper.classList.add("discordant-proportion");
    wrapper.textContent = value;
    return wrapper;
  }
  const [first, second] = value.split(":");
  const firstSpan = document.createElement("span");
  firstSpan.textContent = first;
  firstSpan.style.color = colorForInteger(first);
  const separator = document.createElement("span");
  separator.className = "ratio-slash";
  separator.textContent = ":";
  const secondSpan = document.createElement("span");
  secondSpan.textContent = second;
  secondSpan.style.color = colorForInteger(second);
  wrapper.append(firstSpan, separator, secondSpan);
  return wrapper;
}

function createChordProportionRow(tones, distance, caption) {
  const row = document.createElement("div");
  row.className = "proportion-row";
  const captionElement = document.createElement("span");
  captionElement.className = "proportion-caption visually-hidden";
  captionElement.textContent = caption;
  row.append(captionElement);
  let count = 0;
  for (let firstIndex = 0; firstIndex < tones.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < tones.length; secondIndex += 1) {
      const firstDegree = diatonicDegreeNumber(tones[firstIndex].slot);
      const secondDegree = diatonicDegreeNumber(tones[secondIndex].slot);
      if (firstDegree === null || secondDegree === null || secondDegree - firstDegree !== distance) continue;
      const label = document.createElement("span");
      label.className = "proportion-label";
      label.style.left = `${(modeSlotCenter(tones[firstIndex].slot) + modeSlotCenter(tones[secondIndex].slot)) / 2}%`;
      label.append(createColorizedProportion(intervalProportion(tones[firstIndex].ratio, tones[secondIndex].ratio)));
      row.append(label);
      count += 1;
    }
  }
  if (!count) row.classList.add("is-empty");
  return row;
}

function renderAnalysis(chord, variant) {
  const tones = chordTones(chord, variant);
  const displayedTones = chord.hiddenFundamental
    ? [{ degree: "1", ghost: true, ratio: "1/1", slot: "1" }, ...tones]
    : tones;
  const model = document.createElement("div");
  model.className = "mode-model chord-model";
  model.dataset.modeModel = currentModeModel();
  model.style.setProperty(
    "--mode-table-grid",
    MODE_TABLE_GRID_WEIGHTS.map((value) => `${value}fr`).join(" "),
  );

  const degreeRow = document.createElement("div");
  degreeRow.className = "mode-degree-row";
  MODE_FAMILY_BOUNDARIES.forEach((gridLine) => {
    appendGridBoundary(degreeRow, gridLine, "mode-family-boundary");
  });

  const pitchBody = document.createElement("div");
  pitchBody.className = "mode-pitch-body";
  const ratioRow = document.createElement("div");
  ratioRow.className = "mode-ratio-row";
  const hejiRow = document.createElement("div");
  hejiRow.className = "mode-heji-row";

  displayedTones.forEach((tone) => {
    const degree = document.createElement("div");
    degree.className = `mode-degree${tone.ghost ? " is-implicit-root" : ""}`;
    appendDegreeLabel(degree, displayChordDegree(tone.degree));
    placeOnModeGrid(degree, tone.slot);
    degreeRow.append(degree);

    const ratioCell = document.createElement("div");
    ratioCell.className = `mode-ratio-cell${tone.ghost ? " is-implicit-root" : ""}`;
    placeOnModeGrid(ratioCell, tone.slot);
    ratioCell.append(createColorizedRatio(tone.ratio));
    ratioRow.append(ratioCell);

    const hejiCell = document.createElement(tone.ghost ? "div" : "button");
    if (!tone.ghost) hejiCell.type = "button";
    hejiCell.className = `mode-heji-cell${tone.ghost ? " is-implicit-root" : ""}`;
    placeOnModeGrid(hejiCell, tone.slot);
    hejiCell.append(createHejiPitch(chordAbsoluteRatio(tone.ratio), state.displayMode !== "heji"));
    if (!tone.ghost) {
      configureSoundTrigger(hejiCell, chordAudioRatio(tone.ratio), { preserveRegister: true });
    }
    hejiRow.append(hejiCell);
  });

  const proportions = document.createElement("div");
  proportions.className = "mode-proportions";
  proportions.append(
    createChordProportionRow(tones, 1, "Secondes"),
    createChordProportionRow(tones, 2, "Tierces"),
  );
  pitchBody.append(ratioRow, hejiRow);
  model.append(degreeRow, pitchBody, proportions);

  const contents = [model];
  if (chord.enharmonicSeventhRootRatio) {
    const equivalence = document.createElement("p");
    equivalence.className = "chord-equivalence-note";
    equivalence.append(document.createTextNode("Quasi équivalent enharmonique de "));
    equivalence.append(createHejiPitch(chordAbsoluteRatio(chord.enharmonicSeventhRootRatio)));
    equivalence.append(document.createTextNode("7"));
    contents.push(equivalence);
  }
  if (chord.interpretation) {
    const interpretation = document.createElement("p");
    interpretation.className = "chord-interpretation";
    interpretation.textContent = chord.interpretation;
    contents.push(interpretation);
  }
  elements.chordTableContent.replaceChildren(...contents);
}

function renderChordInventoryTable() {
  const model = document.createElement("div");
  model.className = "concordant-linear";
  const ratios = ALL_CHORD_RATIOS.slice().sort((first, second) => ratioCents(first) - ratioCents(second));
  const rawDegreeLabels = ratios.map(concordantDegreeLabel);
  const mergeSharpFiveAndFlatSix = rawDegreeLabels.includes("♯5") && rawDegreeLabels.includes("♭6");
  const degreeLabels = rawDegreeLabels.map((label) => (
    mergeSharpFiveAndFlatSix && (label === "♯5" || label === "♭6") ? "♯5/♭6" : label
  ));
  const groupBoundaries = degreeLabels
    .map((label, index) => (index > 0 && label !== degreeLabels[index - 1] ? index : null))
    .filter((index) => index !== null);
  model.style.setProperty("--concordant-count", String(ratios.length));
  const preferredWidth = Math.max(760, ratios.length * 58);
  model.style.width = `${preferredWidth}px`;
  model.style.minWidth = `${preferredWidth}px`;
  elements.chordTableSection.style.setProperty("--table-preferred-width", `${preferredWidth}px`);

  const degreeRow = document.createElement("div");
  degreeRow.className = "concordant-degree-row";
  let groupStart = 0;
  for (let index = 1; index <= degreeLabels.length; index += 1) {
    if (index < degreeLabels.length && degreeLabels[index] === degreeLabels[groupStart]) continue;
    const heading = document.createElement("div");
    heading.className = "concordant-degree-group";
    heading.style.gridColumn = `${groupStart + 1} / ${index + 1}`;
    appendDegreeLabel(heading, degreeLabels[groupStart]);
    degreeRow.append(heading);
    groupStart = index;
  }

  const ratioRow = document.createElement("div");
  ratioRow.className = "concordant-ratio-row";
  const pitchRow = document.createElement("div");
  pitchRow.className = "concordant-pitch-row";
  const centsRow = document.createElement("div");
  centsRow.className = "concordant-cents-row";
  ratios.forEach((ratio) => {
    const ratioCell = document.createElement("div");
    ratioCell.className = "concordant-cell concordant-ratio-cell";
    ratioCell.append(createColorizedRatio(ratio));
    ratioRow.append(ratioCell);

    const absolute = absoluteRatio(ratio);
    const pitchCell = document.createElement("button");
    pitchCell.type = "button";
    pitchCell.className = "concordant-cell concordant-pitch-cell";
    pitchCell.append(createHejiPitch(absolute, false));
    configureSoundTrigger(pitchCell, ratio, { preserveRegister: true });
    pitchRow.append(pitchCell);

    const centsCell = document.createElement("div");
    centsCell.className = "concordant-cell concordant-cents-cell";
    const notation = ratioToHeji(absolute);
    if (notation) {
      const cents = document.createElement("span");
      cents.className = "cents-label";
      cents.textContent = ratioToTableCents(absolute, notation);
      centsCell.append(cents);
    }
    centsRow.append(centsCell);
  });

  model.append(degreeRow, ratioRow, pitchRow, centsRow);
  groupBoundaries.forEach((index) => {
    const boundary = document.createElement("span");
    boundary.className = "concordant-group-line";
    boundary.setAttribute("aria-hidden", "true");
    boundary.style.left = `${(index / ratios.length) * 100}%`;
    model.append(boundary);
  });
  elements.chordTableContent.replaceChildren(model);
  requestAnimationFrame(alignChordInventoryTableToViewport);
}

function alignChordInventoryTableToViewport() {
  const model = elements.chordTableContent.querySelector(".concordant-linear");
  if (!model || !elements.chordTableSection.classList.contains("is-concordant")) return;
  elements.chordTableSection.style.setProperty("--concordant-table-shift", "0px");
  const rect = model.getBoundingClientRect();
  const pageMargin = 30;
  const rightOverflow = Math.max(0, rect.right - (document.documentElement.clientWidth - pageMargin));
  const availableLeft = Math.max(0, rect.left - pageMargin);
  const safetyShift = rect.width > elements.chordTableSection.parentElement.clientWidth ? 34 : 18;
  elements.chordTableSection.style.setProperty(
    "--concordant-table-shift",
    `${Math.min(rightOverflow + safetyShift, availableLeft)}px`,
  );
}

function renderChordDetails() {
  const chord = currentChord();
  const variant = currentVariant();
  elements.chordTableSection.dataset.displayMode = state.displayMode;
  if (!chord || !variant) {
    elements.chordTableSection.hidden = false;
    elements.chordTableSection.classList.add("is-concordant");
    elements.chordTableTitle.textContent = "Hauteurs disponibles pour les accords";
    renderChordInventoryTable();
    return;
  }
  elements.chordTableSection.hidden = false;
  elements.chordTableSection.classList.remove("is-concordant");
  elements.chordTableSection.style.removeProperty("--table-preferred-width");
  elements.chordTableSection.style.removeProperty("--concordant-table-shift");
  const modeModel = currentModeModel();
  elements.chordTableTitle.textContent = modeModel
    ? `${chordDisplayName(state.selectedChordName)} — modèle ${modeModel}`
    : chordDisplayName(state.selectedChordName);
  renderVariantSelector(chord);
  renderAnalysis(chord, variant);
}

function selectChord(chordName, requestedVariantIndex = null) {
  if (!chordData.chords[chordName]) return;
  stopAllSounds();
  state.selectedChordName = chordName;
  const availableIndices = availableVariantIndices(chordData.chords[chordName]);
  state.selectedVariantIndex = availableIndices.includes(requestedVariantIndex)
    ? requestedVariantIndex
    : availableIndices[0] ?? 0;
  state.connectionLevelManual = false;
  renderChordSelectionTable();
  closeMenu(elements.chordMenuButton, elements.chordMenuPopover);
  render();
}

function selectTonic(ratio) {
  if (!TONIC_RATIO_SET.has(ratio)) return;
  stopAllSounds();
  state.selectedTonic = ratio;
  state.selectedChordName = null;
  state.selectedVariantIndex = 0;
  state.connectionLevelManual = false;
  closeAllMenus();
  render();
}

function showAllAvailableNotes() {
  stopAllSounds();
  state.selectedChordName = null;
  state.selectedVariantIndex = 0;
  state.connectionLevelManual = false;
  closeAllMenus();
  render();
}

function resetToHome() {
  stopAllSounds();
  state.selectedTonic = DEFAULT_TONIC;
  state.selectedChordName = null;
  state.selectedVariantIndex = 0;
  state.connectionLevelManual = false;
  closeAllMenus();
  render();
}

function restoreStateFromUrl() {
  const parameters = new URL(window.location.href).searchParams;
  const display = parameters.get("affichage");
  if (["heji", "ratio", "heji-cents"].includes(display)) state.displayMode = display;
  const octave = Number(parameters.get("octave"));
  if ([-1, 0, 1].includes(octave)) state.audioOctave = octave;

  const tonic = parameters.get("tonic");
  if (tonic && TONIC_RATIO_SET.has(tonic)) state.selectedTonic = tonic;

  const chordName = parameters.get("accord");
  if (!chordName || !chordData.chords[chordName]) return;
  state.selectedChordName = chordName;
  const chord = chordData.chords[chordName];
  const requestedLimit = parameters.get("limite");
  const requestedIndex = chord.variants.findIndex((variant, variantIndex) => (
    variantAvailableForTonic(variant)
    && variantLimitLabel(chordName, variantIndex, variant) === requestedLimit
  ));
  state.selectedVariantIndex = requestedIndex >= 0
    ? requestedIndex
    : availableVariantIndices(chord)[0] ?? 0;
}

function closeMenu(button, popover) {
  popover.hidden = true;
  button.setAttribute("aria-expanded", "false");
}

function closeAllMenus(exceptPopover = null) {
  [
    [elements.selectionSummary, elements.tonicMenuPopover],
    [elements.chordMenuButton, elements.chordMenuPopover],
    [elements.optionsButton, elements.optionsPopover],
  ].forEach(([button, popover]) => {
    if (popover !== exceptPopover) closeMenu(button, popover);
  });
}

function toggleMenu(button, popover) {
  const opening = popover.hidden;
  closeAllMenus(opening ? popover : null);
  popover.hidden = !opening;
  button.setAttribute("aria-expanded", String(opening));
}

function render() {
  document.body.dataset.displayMode = state.displayMode;
  document.body.classList.add("has-selection");
  document.body.classList.toggle("has-chord-selection", Boolean(state.selectedChordName));
  renderTonicMiniMap();
  renderTonicSummary();
  renderTonicMenu();
  renderChordSelectionTable();
  renderNetwork();
  renderChordDetails();
  const scale = (state.textSize / 2) * 0.96;
  elements.networkStage.style.setProperty("--network-node-scale", String(scale));
  elements.networkStage.style.setProperty("--network-text-scale", String(scale));
  elements.networkStage.style.setProperty("--network-label-offset", `${state.textOffset * 5}px`);
  elements.displayButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.display === state.displayMode)));
  elements.connectionButtons.forEach((button) => button.setAttribute("aria-pressed", String(Number(button.dataset.connectionLevel) === state.connectionLevel)));
  refreshSoundingIndicators();
  requestAnimationFrame(() => {
    elements.networkScroll.scrollLeft = Math.max(0, (elements.networkScroll.scrollWidth - elements.networkScroll.clientWidth) / 2);
  });
}

function validNumber(input, minimum, maximum, fallback) {
  const value = Number(input.value);
  return Number.isFinite(value) && value >= minimum && value <= maximum ? value : fallback;
}

elements.displayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.displayMode = button.dataset.display;
    render();
  });
});

elements.connectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.connectionLevel = Number(button.dataset.connectionLevel);
    state.connectionLevelManual = true;
    render();
  });
});

elements.textSize.addEventListener("input", () => {
  state.textSize = validNumber(elements.textSize, 0.5, 4, state.textSize);
  render();
});

elements.textOffset.addEventListener("input", () => {
  state.textOffset = validNumber(elements.textOffset, 0, 6, state.textOffset);
  render();
});

elements.showLabels.addEventListener("change", () => {
  state.showLabels = elements.showLabels.checked;
  render();
});

elements.soundMuteButton.addEventListener("click", stopAllSounds);
[elements.soundMuteButton, ...elements.audioOctaveButtons].forEach((button) => {
  const showHint = () => {
    elements.soundHoverHint.textContent = button.dataset.keyboardHint ?? "";
  };
  const clearHint = () => {
    if (document.activeElement === button) return;
    elements.soundHoverHint.textContent = "";
  };
  button.addEventListener("mouseenter", showHint);
  button.addEventListener("mouseleave", clearHint);
  button.addEventListener("focus", showHint);
  button.addEventListener("blur", () => {
    elements.soundHoverHint.textContent = "";
  });
});
elements.audioOctaveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.audioOctave = Number(button.dataset.audioOctave);
    refreshSoundingIndicators();
  });
});

elements.appTitle.addEventListener("click", resetToHome);
elements.selectionSummary.addEventListener("click", () => {
  toggleMenu(elements.selectionSummary, elements.tonicMenuPopover);
});
elements.chordMenuButton.addEventListener("click", () => {
  toggleMenu(elements.chordMenuButton, elements.chordMenuPopover);
});
elements.optionsButton.addEventListener("click", () => {
  toggleMenu(elements.optionsButton, elements.optionsPopover);
});

elements.chordSelect.addEventListener("change", (event) => {
  if (!event.target.value) {
    showAllAvailableNotes();
    return;
  }
  const [chordName, variantIndex] = event.target.value.split("::");
  selectChord(chordName, variantIndex === undefined ? null : Number(variantIndex));
});

elements.chordMenuPopover.addEventListener("click", (event) => {
  const button = event.target.closest("[data-chord-name]");
  if (!button) return;
  if (button.dataset.chordName) {
    selectChord(
      button.dataset.chordName,
      button.dataset.variantIndex === undefined ? null : Number(button.dataset.variantIndex),
    );
  }
  else showAllAvailableNotes();
});

elements.chordVariantSelector.addEventListener("click", (event) => {
  const button = event.target.closest("[data-variant-index]");
  if (!button) return;
  stopAllSounds();
  state.selectedVariantIndex = Number(button.dataset.variantIndex);
  state.connectionLevelManual = false;
  closeAllMenus();
  render();
});

document.addEventListener("keydown", async (event) => {
  if (
    event.code === "Space"
    && !event.repeat
    && !event.ctrlKey
    && !event.metaKey
    && !event.altKey
    && !isTypingTarget(event.target)
  ) {
    event.preventDefault();
    stopAllSounds();
    return;
  }
  if (
    event.repeat
    || event.ctrlKey
    || event.metaKey
    || event.altKey
    || isTypingTarget(event.target)
    || !AUDIO_KEYBOARD_MAP.has(event.code)
  ) return;
  const pitch = keyboardPitch(event.code);
  if (!pitch || audioEngine.pressedKeyboardCodes.has(event.code)) return;
  event.preventDefault();
  audioEngine.pressedKeyboardCodes.add(event.code);
  const voice = await startAudioVoice(pitch.value, pitch.relativeRatio, pitch.octaveShift);
  if (!voice) {
    audioEngine.pressedKeyboardCodes.delete(event.code);
    return;
  }
  if (!audioEngine.pressedKeyboardCodes.has(event.code)) {
    stopAudioVoice(voice);
    return;
  }
  audioEngine.keyboardVoices.set(event.code, voice);
  refreshSoundingIndicators();
});

document.addEventListener("keyup", (event) => {
  if (!AUDIO_KEYBOARD_MAP.has(event.code)) return;
  audioEngine.pressedKeyboardCodes.delete(event.code);
  const voice = audioEngine.keyboardVoices.get(event.code);
  if (!voice) return;
  event.preventDefault();
  audioEngine.keyboardVoices.delete(event.code);
  stopAudioVoice(voice);
  refreshSoundingIndicators();
});

window.addEventListener("blur", stopKeyboardSounds);
window.addEventListener("resize", alignChordInventoryTableToViewport);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopKeyboardSounds();
});

document.addEventListener("click", (event) => {
  if (!elements.chordMenuButton.parentElement.contains(event.target)) {
    closeMenu(elements.chordMenuButton, elements.chordMenuPopover);
  }
  if (!elements.selectionSummary.parentElement.contains(event.target)) {
    closeMenu(elements.selectionSummary, elements.tonicMenuPopover);
  }
  if (!elements.optionsButton.parentElement.contains(event.target)) {
    closeMenu(elements.optionsButton, elements.optionsPopover);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeAllMenus();
});

document.querySelectorAll("[data-harmonic-view]").forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.harmonicView;
    if (view === "accords") return;
    stopAllSounds();
    window.parent.postMessage({ type: "hn:set-view", view }, window.location.origin);
  });
});

restoreStateFromUrl();
render();
