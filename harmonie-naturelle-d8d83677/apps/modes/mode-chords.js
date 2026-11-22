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

  // Niveaux d'accords du Tableau (lot v85, Simon, 8 novembre 2026, 16 h 40) : 1 = triades; 2 = triades et accords avec
  // ajout (6, add…), les accords de sixte d'abord; 3 = accords de 7e et plus (accords conséquents, comme avant).
  // Un degré sans accord du niveau choisi garde celui du niveau inférieur (les triades restent candidates).
  const SUSPENDED_CHORDS = new Set(["sus2", "sus4", "7no3", "9no3"]);
  const SEVENTH_LIKE_ADDED = new Set(["Fr+6", "Gr+6"]);

  function levelAllows(level, name, columnIndex) {
    if (level >= 3) return !IGNORED_CONSEQUENT_CHORDS.has(name);
    if (SUSPENDED_CHORDS.has(name)) return false;
    if (columnIndex === 0) return true;
    return level === 2 && (columnIndex === 1 || columnIndex === 2) && !SEVENTH_LIKE_ADDED.has(name);
  }

  // Niveau 3 (Simon, 9 novembre 2026, 12 h 29) : un degré sans accord de 7e prend celui du niveau 2 (ex. Ionien V = 6);
  // s'il n'en a pas non plus, celui du niveau 1. Niveau 2 : un degré sans ajout garde sa triade (niveau 1).
  function analyzeModeChords(mode, chordData, level = 3) {
    if (level < 3) return analyzeModeChordsAtLevel(mode, chordData, level);
    const columnOf = new Map((chordData?.columns ?? []).flatMap((column, index) => column.names.map((name) => [name, index])));
    const isSeventh = (name) => (columnOf.get(name) ?? 0) >= 3 || SEVENTH_LIKE_ADDED.has(name) || name === "Fr/Ger+6";
    const byDegree = new Map(analyzeModeChordsAtLevel(mode, chordData, 3)
      .filter((occurrence) => occurrence.chordNames.some(isSeventh))
      .map((occurrence) => [occurrence.degreeIndex, occurrence]));
    analyzeModeChordsAtLevel(mode, chordData, 2).forEach((occurrence) => {
      if (!byDegree.has(occurrence.degreeIndex)) byDegree.set(occurrence.degreeIndex, occurrence);
    });
    return [...byDegree.values()].sort((first, second) => first.degreeIndex - second.degreeIndex);
  }

  function analyzeModeChordsAtLevel(mode, chordData, level) {
    if (!mode?.ratios?.length || !chordData?.chords || !chordData?.columns) return [];
    const modeRatios = new Set(mode.ratios.slice(0, 7));
    const menuOrder = chordData.columns.flatMap((column) => column.names);
    const columnOf = new Map(chordData.columns.flatMap((column, index) => column.names.map((name) => [name, index])));
    return mode.ratios.slice(0, 7).map((degreeRatio, degreeIndex) => {
      const rawCandidates = [];
      menuOrder.forEach((name, menuIndex) => {
        if (!levelAllows(level, name, columnOf.get(name))) return;
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
      let candidates = selectConsequentCandidates(rawCandidates);
      // Niveau 2 : quand un accord de sixte est possible, il l'emporte sur les ajouts (M → 6, comme maj9 au niveau 3).
      if (level === 2 && candidates.some((candidate) => /^(?:s?m)?6/.test(candidate.name))) {
        candidates = candidates.filter((candidate) => /^(?:s?m)?6/.test(candidate.name));
      }
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
