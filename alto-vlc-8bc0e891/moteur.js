// Fichier construit par scripts/build-repetition.mjs à partir des sources de Modes : ne pas modifier.

"use strict";

// Référence de la notation : 1/1 = la (comme dans Modes).

let configuredReferenceRatio = "1/1";

const REPETITION_TIMBRES = [{"id":"analog","label":"Analogique","group":"Synthèse","brightness":55,"reverb":18,"level":0.46,"banks":[]},{"id":"harmonium","label":"Harmonium","group":"Anches et tuyaux","brightness":50,"reverb":30,"level":0.8,"banks":[]},{"id":"organ","label":"Orgue à tuyaux","group":"Anches et tuyaux","brightness":40,"reverb":60,"level":0.61,"banks":[]},{"id":"organ-sampled","label":"Orgue enregistré","group":"Anches et tuyaux","brightness":35,"reverb":25,"level":2,"banks":["orgue-8","orgue-4"]}];

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
  { exponentIndex: 14, symbols: ["\uEE5B\uEE5B\uEE5B", "\uEE5B\uEE5B", "\uEE5B", "", "\uEE5A", "\uEE5A\uEE5A", "\uEE5A\uEE5A\uEE5A"], lookup: (exponent) => 3 + exponent },
];

function greatestCommonDivisor(a, b) {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    [x, y] = [y, x % y];
  }
  return x;
}

function simplify(fraction) {
  const divisor = greatestCommonDivisor(fraction.numerator, fraction.denominator);
  return {
    numerator: fraction.numerator / divisor,
    denominator: fraction.denominator / divisor,
  };
}

function parseFraction(value) {
  const match = value.trim().match(/^(\d+)\s*\/\s*(\d+)$/);
  if (!match) return null;
  const numerator = BigInt(match[1]);
  const denominator = BigInt(match[2]);
  if (numerator === 0n || denominator === 0n) return null;
  return simplify({ numerator, denominator });
}

function fractionToString(fraction) {
  const simplified = simplify(fraction);
  return `${simplified.numerator}/${simplified.denominator}`;
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

function positiveModulo(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function getPrimeExponents(fraction) {
  let numerator = fraction.numerator;
  let denominator = fraction.denominator;
  const exponents = [];
  for (const prime of HEJI_PRIMES) {
    let exponent = 0;
    while (numerator % prime === 0n) {
      exponent += 1;
      numerator /= prime;
    }
    while (denominator % prime === 0n) {
      exponent -= 1;
      denominator /= prime;
    }
    exponents.push(exponent);
  }
  return numerator === 1n && denominator === 1n ? exponents : null;
}

function ratioToHeji(value, { applyReference = true } = {}) {
  const sourceFraction = parseFraction(value);
  const referenceFraction = applyReference ? parseFraction(configuredReferenceRatio) : null;
  const fraction = sourceFraction && referenceFraction
    ? simplify({
      numerator: sourceFraction.numerator * referenceFraction.numerator,
      denominator: sourceFraction.denominator * referenceFraction.denominator,
    })
    : sourceFraction;
  if (!fraction) return null;
  const exponents = getPrimeExponents(fraction);
  if (!exponents || Math.abs(exponents[2]) > 4) return null;
  for (const { exponentIndex } of HEJI_PRIME_SYMBOLS) {
    if (Math.abs(exponents[exponentIndex]) > 3) return null;
  }
  const tonalPosition = exponents.reduce(
    (sum, exponent, index) => sum + exponent * HEJI_TONAL_IDENTITY[index],
    0,
  );
  const chromaticPosition = tonalPosition + 25;
  if (chromaticPosition < 0 || chromaticPosition > 48) return null;
  const note = HEJI_DIATONIC_NOTES[positiveModulo(tonalPosition + 4, 7)];
  const pythagoreanGroup = Math.floor(chromaticPosition / 7);
  const pythagorean = HEJI_PYTHAGOREAN_SYMBOLS[exponents[2]]?.[pythagoreanGroup];
  if (pythagorean === undefined) return null;
  const primeSymbols = HEJI_PRIME_SYMBOLS.map(
    ({ exponentIndex, lookup, symbols }) => symbols[lookup(exponents[exponentIndex])],
  );
  if (primeSymbols.some((symbol) => symbol === undefined)) return null;
  const isPythagoreanNatural =
    exponents[1] >= -4 &&
    exponents[1] <= 2 &&
    exponents.slice(2).every((exponent) => exponent === 0);
  const conventionalAccidental = pythagoreanGroup - 3;
  const referenceSemitone = positiveModulo(
    NATURAL_NOTE_SEMITONES[note] + conventionalAccidental,
    12,
  );
  return {
    accidental: `${primeSymbols.reverse().join("")}${pythagorean}${isPythagoreanNatural ? "n" : ""}`,
    conventionalAccidental,
    note,
    referenceSemitone,
  };
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
  if (!fraction) return null;
  const ratio = Number(fraction.numerator) / Number(fraction.denominator);
  if (!Number.isFinite(ratio) || ratio <= 0) return null;
  const cents = 1200 * Math.log2(ratio);
  const referenceCandidates = [
    notation.referenceSemitone * 100 - 1200,
    notation.referenceSemitone * 100,
    notation.referenceSemitone * 100 + 1200,
  ];
  const referenceCents = referenceCandidates.reduce((closest, candidate) =>
    Math.abs(cents - candidate) < Math.abs(cents - closest) ? candidate : closest,
  );
  const deviationFromHejiReference = cents - referenceCents;
  const nearestSemitone = Math.round(cents / 100);
  const nearestPitchClass = positiveModulo(nearestSemitone, 12);
  const tunerNote = CHROMATIC_NOTE_NAMES[nearestPitchClass];
  const deviation = Math.round(cents - nearestSemitone * 100);
  if (
    nearestPitchClass === notation.referenceSemitone &&
    isTunerChromaticSpelling(notation) &&
    Math.abs(deviationFromHejiReference) <= 50
  ) {
    return signedCents(deviationFromHejiReference);
  }
  return `${tunerNote}${signedCents(deviation)}`;
}

function plainHejiNote(notation) {
  if (!notation) return "Non défini";
  if (notation.conventionalAccidental > 0) {
    return `${notation.note}${"♯".repeat(notation.conventionalAccidental)}`;
  }
  if (notation.conventionalAccidental < 0) {
    return `${notation.note}${"♭".repeat(Math.abs(notation.conventionalAccidental))}`;
  }
  return notation.note;
}

const AUDIO_VOICE_GAIN = 0.045;

const STRING_LOOP_CROSSFADE_SECONDS = 0.4;

function createRoomImpulse(context, seconds = 2.8) {
  const sampleRate = context.sampleRate;
  const length = Math.floor(sampleRate * seconds);
  const impulse = context.createBuffer(2, length, sampleRate);
  const preDelay = Math.floor(sampleRate * 0.016);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = impulse.getChannelData(channel);
    let seed = 0x9e3779b9 ^ (channel * 0x51ed27);
    let lowpassed = 0;
    let energy = 0;
    for (let index = preDelay; index < length; index += 1) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const noise = (seed / 2 ** 32) * 2 - 1;
      const time = (index - preDelay) / sampleRate;
      const cutoff = 8500 * Math.exp(-time * 1.6) + 900;
      lowpassed += (1 - Math.exp(-2 * Math.PI * cutoff / sampleRate)) * (noise - lowpassed);
      data[index] = lowpassed * Math.exp(-time * 6.9 / (seconds * 0.85)) * Math.min(1, time / 0.012);
      energy += data[index] * data[index];
    }
    for (const [milliseconds, gain] of [[9, 0.5], [14, -0.38], [21, 0.3], [29, -0.24], [37, 0.18]]) {
      data[preDelay + Math.floor(sampleRate * (milliseconds + channel * 1.7) / 1000)] += gain * 6;
    }
    const normalization = (1 / Math.sqrt(energy || 1)) * 1.8;
    for (let index = 0; index < length; index += 1) data[index] *= normalization;
  }
  return impulse;
}

function createSaturationCurve(amount = 2.4) {
  const size = 1024;
  const curve = new Float32Array(size);
  const normalization = Math.tanh(amount);
  for (let index = 0; index < size; index += 1) {
    const input = (index / (size - 1)) * 2 - 1;
    curve[index] = Math.tanh(input * amount) / normalization;
  }
  return curve;
}

function crossfadedLoopBuffer(context, buffer, loopStart, loopEnd) {
  const sampleRate = buffer.sampleRate;
  const end = Math.min(buffer.length, Math.round(loopEnd * sampleRate));
  const length = end - Math.round(loopStart * sampleRate);
  const fade = Math.min(Math.round(STRING_LOOP_CROSSFADE_SECONDS * sampleRate), Math.floor(length / 2));
  const result = context.createBuffer(buffer.numberOfChannels, end, sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const source = buffer.getChannelData(channel);
    const data = result.getChannelData(channel);
    data.set(source.subarray(0, end));
    for (let index = end - fade; index < end; index += 1) {
      const position = (index - (end - fade)) / fade;
      data[index] = source[index] * Math.cos(position * Math.PI / 2)
        + source[index - length] * Math.sin(position * Math.PI / 2);
    }
  }
  return { buffer: result, loopStart: (end - length) / sampleRate, loopEnd: end / sampleRate };
}

function nearestZone(bank, frequency) {
  return bank.reduce((closest, candidate) => (
    Math.abs(Math.log2(candidate.hz / frequency)) < Math.abs(Math.log2(closest.hz / frequency))
      ? candidate
      : closest
  ));
}

function liveLowpass(context, frequencyFor, q = 0.5) {
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.Q.value = q;
  filter.frequency.value = frequencyFor(audioBrightness());
  const setBrightness = (brightness) => {
    filter.frequency.setTargetAtTime(frequencyFor(brightness), context.currentTime, 0.05);
  };
  return { filter, setBrightness };
}

let audioNoiseBuffer = null;

function noiseBuffer(context) {
  if (audioNoiseBuffer?.sampleRate === context.sampleRate) return audioNoiseBuffer;
  const length = context.sampleRate * 2;
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  let seed = 99;
  for (let index = 0; index < length; index += 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    data[index] = (seed / 2 ** 32) * 2 - 1;
  }
  audioNoiseBuffer = buffer;
  return buffer;
}

const AUDIO_VOICE_BUILDERS = {

  analog(context, frequency) {
    const gain = context.createGain();
    const mix = context.createGain();
    const sources = [];
    [["sawtooth", 1, 0.5], ["sawtooth", 2, 0.16], ["square", 0.5, 0.3]].forEach(([type, multiple, level]) => {
      const oscillator = context.createOscillator();
      const oscillatorGain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency * multiple;
      oscillatorGain.gain.value = level;
      oscillator.connect(oscillatorGain);
      oscillatorGain.connect(mix);
      sources.push(oscillator);
    });
    const now = context.currentTime;
    const cutoff = (b) => Math.min(14000, frequency * (1.4 + b * 14));
    const filters = [0, 1].map(() => {
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.value = 3.2;
      return filter;
    });
    const sweep = (b) => filters.forEach((filter) => {
      filter.frequency.cancelScheduledValues(context.currentTime);
      filter.frequency.setValueAtTime(Math.min(16000, cutoff(b) * 3.2), now);
      filter.frequency.setTargetAtTime(cutoff(b), now + 0.01, 0.22);
    });
    sweep(audioBrightness());
    const drive = context.createWaveShaper();
    drive.curve = createSaturationCurve(1.8);
    drive.oversample = "4x";
    mix.connect(filters[0]);
    filters[0].connect(filters[1]);
    filters[1].connect(drive);
    drive.connect(gain);
    const setBrightness = (b) => filters.forEach((filter) => filter.frequency.setTargetAtTime(cutoff(b), context.currentTime, 0.08));
    return { gain, sources, attack: 0.006, peak: 0.11, release: 0.25, setBrightness };
  },

  harmonium(context, frequency, index) {
    const gain = context.createGain();
    const partials = Math.max(1, Math.min(40, Math.floor(15000 / frequency)));
    const real = new Float32Array(partials + 1);
    const imaginary = new Float32Array(partials + 1);
    for (let k = 1; k <= partials; k += 1) {
      const f = frequency * k;
      const formant = 1 + 1.4 * Math.exp(-((Math.log2(f / 900)) ** 2) * 3) + 0.8 * Math.exp(-((Math.log2(f / 2400)) ** 2) * 4);
      imaginary[k] = (1 / k ** 0.85) * formant * (k % 2 ? 1 : 0.7);
    }
    const oscillator = context.createOscillator();
    oscillator.setPeriodicWave(context.createPeriodicWave(real, imaginary));
    oscillator.frequency.value = frequency;
    const { filter, setBrightness } = liveLowpass(context, (b) => Math.min(16000, frequency * (3 + b * 26)), 0.6);
    oscillator.connect(filter);
    const body = context.createGain();
    filter.connect(body);
    const noise = context.createBufferSource();
    noise.buffer = noiseBuffer(context);
    noise.loop = true;
    const band = context.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = Math.min(7000, Math.max(1500, frequency * 6));
    band.Q.value = 0.7;
    const noiseGain = context.createGain();
    noiseGain.gain.value = 0.012 + audioBrightness() * 0.02;
    noise.connect(band);
    band.connect(noiseGain);
    noiseGain.connect(body);
    const bellows = context.createOscillator();
    bellows.frequency.value = 0.17 + 0.03 * (index % 5);
    const depth = context.createGain();
    depth.gain.value = 0.06;
    const motion = context.createGain();
    bellows.connect(depth);
    depth.connect(motion.gain);
    body.connect(motion);
    motion.connect(gain);
    return { gain, sources: [oscillator, noise, bellows], attack: 0.14, peak: 0.075, release: 0.45, setBrightness };
  },

  organ(context, frequency) {
    const gain = context.createGain();
    const sources = [];
    const now = context.currentTime;
    const ranks = [[1, 1], [2, 0.42], [3, 0.16], [4, 0.24], [6, 0.07], [8, 0.09]];
    const levels = [];
    ranks.forEach(([harmonic, amplitude], k) => {
      if (frequency * harmonic > 15000) return;
      const oscillator = context.createOscillator();
      const rankGain = context.createGain();
      oscillator.frequency.value = frequency * harmonic;
      rankGain.gain.value = amplitude * (k === 0 ? 1 : 0.25 + audioBrightness() * 1.5);
      levels.push([rankGain, amplitude, k]);
      oscillator.connect(rankGain);
      rankGain.connect(gain);
      sources.push(oscillator);
    });
    const chiff = context.createBufferSource();
    chiff.buffer = noiseBuffer(context);
    const band = context.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = Math.min(8000, frequency * 4);
    band.Q.value = 3;
    const chiffGain = context.createGain();
    chiffGain.gain.setValueAtTime(0.0001, now);
    chiffGain.gain.exponentialRampToValueAtTime(0.12, now + 0.012);
    chiffGain.gain.setTargetAtTime(0.0001, now + 0.02, 0.025);
    chiff.connect(band);
    band.connect(chiffGain);
    chiffGain.connect(gain);
    chiff.start(now);
    chiff.stop(now + 0.3);
    const setBrightness = (b) => levels.forEach(([rankGain, amplitude, k]) => {
      if (k) rankGain.gain.setTargetAtTime(amplitude * (0.25 + b * 1.5), context.currentTime, 0.08);
    });
    return { gain, sources, attack: 0.09, peak: 0.06, release: 0.6, setBrightness };
  },

  "organ-sampled"(context, frequency) {
    const gain = context.createGain();
    const sources = [];
    const stops = [];
    for (const [bankId, multiple, level] of [["orgue-8", 1, 0.9], ["orgue-4", 2, 0.7]]) {
      const bank = audioEngine.banks.get(bankId);
      if (!bank?.length) continue;
      const target = frequency * multiple;
      const zone = nearestZone(bank, target);
      const source = context.createBufferSource();
      const stopGain = context.createGain();
      source.buffer = zone.buffer;
      source.loop = true;
      source.loopStart = zone.loopStart;
      source.loopEnd = zone.loopEnd;
      source.playbackRate.value = target / zone.hz;
      // Égalisation note à note (catalogue : « gain »), les enregistrements n'ayant pas tous le même niveau.
      const zoneLevel = level * (zone.gain ?? 1);
      stopGain.gain.value = multiple === 1 ? zoneLevel : zoneLevel * audioBrightness();
      source.connect(stopGain);
      stopGain.connect(gain);
      sources.push(source);
      stops.push([stopGain, multiple, zoneLevel]);
    }
    if (!sources.length) return null;
    const setBrightness = (b) => stops.forEach(([stopGain, multiple, level]) => {
      if (multiple !== 1) stopGain.gain.setTargetAtTime(level * b, context.currentTime, 0.08);
    });
    return { gain, sources, attack: 0.02, peak: 0.55, release: 0.5, setBrightness };
  },

};

