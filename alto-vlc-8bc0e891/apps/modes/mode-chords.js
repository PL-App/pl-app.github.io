"use strict";

(function registerModeChordAnalysis(globalScope) {
  const IGNORED_CONSEQUENT_CHORDS = new Set([
    // Restored catalogue choices remain selectable without replacing the
    // previously validated consequential chords in the modal tables.
    "6", "add11",
    "sus2", "sus4", "7no3", "9no3", "add9", "madd9", "madd11", "smadd11",
  ]);
  const MINOR_MAJOR_FUNCTION_DEGREES = new Set([0, 3, 4]);
  const AUGMENTED_CHORDS = new Set(["#5", "maj7#5"]);
  const DIMINISHED_CHORDS = new Set(["mb5", "smb5", "m7b5"]);

  function gcd(first, second) {
    let a = first < 0n ? -first : first;
    let b = second < 0n ? -second : second;
    while (b !== 0n) [a, b] = [b, a % b];
    return a;
  }

  function parseRatio(value) {
    const match = String(value ?? "").trim().match(/^(\d+)\s*\/\s*(\d+)$/);
    if (!match) return null;
    const numerator = BigInt(match[1]);
    const denominator = BigInt(match[2]);
    return numerator && denominator ? { numerator, denominator } : null;
  }

  function reduceRatio({ numerator, denominator }) {
    const divisor = gcd(numerator, denominator);
    return { numerator: numerator / divisor, denominator: denominator / divisor };
  }

  function normalizeOctave(ratio) {
    let { numerator, denominator } = reduceRatio(ratio);
    while (numerator < denominator) numerator *= 2n;
    while (numerator >= denominator * 2n) denominator *= 2n;
    return reduceRatio({ numerator, denominator });
  }

  function ratioString(ratio) {
    return `${ratio.numerator}/${ratio.denominator}`;
  }

  function multiplyRatios(first, second) {
    const a = parseRatio(first);
    const b = parseRatio(second);
    if (!a || !b) return null;
    return ratioString(normalizeOctave({
      numerator: a.numerator * b.numerator,
      denominator: a.denominator * b.denominator,
    }));
  }

  function divideRatios(first, second) {
    const a = parseRatio(first);
    const b = parseRatio(second);
    if (!a || !b) return null;
    return ratioString(normalizeOctave({
      numerator: a.numerator * b.denominator,
      denominator: a.denominator * b.numerator,
    }));
  }

  function normalizedVariantRatios(chord, variant) {
    const isRootless = Boolean(chord?.hiddenFundamental || chord?.functionDegrees);
    const anchor = isRootless
      ? variant?.tonicAnchorRatio ?? variant?.pitchRatios?.[0] ?? "1/1"
      : "1/1";
    return (variant?.pitchRatios ?? [])
      .map((ratio) => divideRatios(ratio, anchor))
      .filter(Boolean);
  }

  function chordPitchSet(degreeRatio, chord, variant) {
    return new Set(normalizedVariantRatios(chord, variant)
      .map((ratio) => multiplyRatios(degreeRatio, ratio))
      .filter(Boolean));
  }

  function isStrictSubset(first, second) {
    return first.size < second.size && [...first].every((value) => second.has(value));
  }

  function chordQuality(chordNames) {
    if (chordNames.some((name) => AUGMENTED_CHORDS.has(name))) return "augmented";
    if (chordNames.some((name) => DIMINISHED_CHORDS.has(name))) return "diminished";
    if (chordNames.some((name) => /^(?:m|sm)/.test(name) && !/^maj/.test(name))) return "minor";
    return "major";
  }

  function combineAugmentedSixths(candidates) {
    const french = candidates.find((candidate) => candidate.name === "Fr+6");
    const german = candidates.find((candidate) => candidate.name === "Gr+6");
    if (!french || !german) return candidates;
    const combined = {
      ...french,
      menuIndex: Math.min(french.menuIndex, german.menuIndex),
      name: "Fr/Ger+6",
      pitchCount: Math.max(french.pitchCount, german.pitchCount),
      sourceNames: ["Fr+6", "Gr+6"],
    };
    return candidates.filter((candidate) => candidate !== french && candidate !== german).concat(combined);
  }

  function selectConsequentCandidates(candidates) {
    const unique = [];
    const seen = new Set();
    candidates.forEach((candidate) => {
      const key = `${candidate.name}|${[...candidate.pitchSet].sort().join("|")}`;
      if (seen.has(key)) return;
      seen.add(key);
      unique.push(candidate);
    });
    const maximal = unique.filter((candidate) => !unique.some((other) => (
      candidate !== other && isStrictSubset(candidate.pitchSet, other.pitchSet)
    )));
    return combineAugmentedSixths(maximal).sort((first, second) => (
      second.pitchCount - first.pitchCount
      || first.menuIndex - second.menuIndex
      || first.variantIndex - second.variantIndex
    ));
  }

  function analyzeModeChords(mode, chordData) {
    if (!mode?.ratios?.length || !chordData?.chords || !chordData?.columns) return [];
    const modeRatios = new Set(mode.ratios.slice(0, 7));
    const menuOrder = chordData.columns.flatMap((column) => column.names);
    return mode.ratios.slice(0, 7).map((degreeRatio, degreeIndex) => {
      const rawCandidates = [];
      menuOrder.forEach((name, menuIndex) => {
        if (IGNORED_CONSEQUENT_CHORDS.has(name)) return;
        if (/^m\(maj(?:7|9)\)$/.test(name) && !MINOR_MAJOR_FUNCTION_DEGREES.has(degreeIndex)) return;
        const chord = chordData.chords[name];
        chord?.variants?.forEach((variant, variantIndex) => {
          const pitchSet = chordPitchSet(degreeRatio, chord, variant);
          if (!pitchSet.size || ![...pitchSet].every((ratio) => modeRatios.has(ratio))) return;
          rawCandidates.push({
            menuIndex,
            name,
            pitchCount: pitchSet.size,
            pitchSet,
            sourceNames: [name],
            variantIndex,
          });
        });
      });
      const candidates = selectConsequentCandidates(rawCandidates);
      if (!candidates.length) return null;
      const chordNames = candidates.map((candidate) => candidate.name);
      return {
        candidates,
        chordNames,
        degreeIndex,
        degreeRatio,
        quality: chordQuality(chordNames),
      };
    }).filter(Boolean);
  }

  function romanDegreeLabel(degreeLabel, quality) {
    const match = String(degreeLabel ?? "").match(/^([♭♯]*)(\d+)$/);
    if (!match) return String(degreeLabel ?? "");
    const roman = new Map([
      [1, "I"], [2, "II"], [3, "III"], [4, "IV"],
      [5, "V"], [6, "VI"], [7, "VII"], [8, "I"],
    ]).get(Number(match[2])) ?? match[2];
    const numeral = quality === "minor" || quality === "diminished"
      ? roman.toLowerCase()
      : roman;
    const suffix = quality === "augmented" ? "+" : quality === "diminished" ? "°" : "";
    return `${match[1]}${numeral}${suffix}`;
  }

  globalScope.HN_MODE_CHORDS = Object.freeze({
    analyzeModeChords,
    normalizedVariantRatios,
    romanDegreeLabel,
  });
}(typeof window === "undefined" ? globalThis : window));
