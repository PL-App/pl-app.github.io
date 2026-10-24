"use strict";

// Données musicales canoniques tirées de
// « 260903_Traité » (catalogue retenu et constructions modales).
// L'ordre du Traité reste le dernier départage des constructions équivalentes.
// Les pointillés peuvent privilégier les départs h3 selon la transposition.
const TETRACHORD_RATIOS = Object.freeze({
  "Maj-24L5": ["1/1", "9/8", "5/4", "4/3"],
  "Maj-36L5": ["1/1", "10/9", "5/4", "4/3"],
  "Maj-21L7": ["1/1", "8/7", "9/7", "4/3"],
  "Maj-9L11": ["1/1", "10/9", "11/9", "4/3"],
  "Min-120L5": ["1/1", "9/8", "6/5", "4/3"],
  "Min-18L7": ["1/1", "10/9", "7/6", "4/3"],
  "Min-24L7": ["1/1", "9/8", "7/6", "4/3"],
  "Min-105L7": ["1/1", "8/7", "6/5", "4/3"],
  "Min-30L11": ["1/1", "11/10", "6/5", "4/3"],
  "Phryg-15L5": ["1/1", "16/15", "6/5", "4/3"],
  "Phryg-54L7": ["1/1", "28/27", "7/6", "4/3"],
  "Phryg-60L7sm": ["1/1", "21/20", "7/6", "4/3"],
  "Phryg-60L7m": ["1/1", "21/20", "6/5", "4/3"],
  "Phryg-12L13": ["1/1", "13/12", "7/6", "4/3"],
  "Phryg3-60L5": ["1/1", "16/15", "5/4", "4/3"],
  "Phryg3-60L7": ["1/1", "21/20", "5/4", "4/3"],
  "Phryg3-108L7": ["1/1", "28/27", "5/4", "4/3"],
  "Phryg3-27L11": ["1/1", "28/27", "11/9", "4/3"],
  "Phryg3-12L13": ["1/1", "13/12", "5/4", "4/3"],
});

// Catalogue retenu du Traité, révision du 3 septembre 2026.
// Les tétracordes non retenus ne participent ni au menu ni aux pointillés.
const RETAINED_TETRACHORD_GROUPS = Object.freeze([
  { label: "Majeur", codes: ["Maj-24L5", "Maj-36L5", "Maj-21L7", "Maj-9L11"] },
  { label: "Mineur", codes: ["Min-120L5", "Min-18L7", "Min-24L7", "Min-105L7", "Min-30L11"] },
  { label: "Phrygien", codes: ["Phryg-15L5", "Phryg-54L7", "Phryg-60L7sm", "Phryg-60L7m", "Phryg-12L13"] },
  { label: "Phrygien 3", codes: ["Phryg3-60L5", "Phryg3-60L7", "Phryg3-108L7", "Phryg3-27L11", "Phryg3-12L13"] },
]);

const MODE_TETRACHORD_CONSTRUCTIONS = Object.freeze({
  "Lydien L5": [["Maj-36L5", "Maj-36L5"], ["Min-120L5", "Phryg-15L5"]],
  "Lydien L7": [["Min-105L7", "Phryg-15L5"]],
  "Lydien L11": [["Maj-36L5", "Maj-9L11"], ["Min-30L11", "Phryg-15L5"]],
  "Ionien L5": [["Maj-24L5", "Maj-36L5"], ["Phryg-15L5", "Phryg-15L5"]],
  "Mixolydien L7": [["Maj-24L5", "Min-18L7"]],
  "Dorien L7sm": [["Min-24L7", "Min-18L7"]],
  "Dorien L7m": [["Min-120L5", "Min-105L7"]],
  "Éolien L5": [["Maj-36L5", "Maj-36L5"], ["Min-120L5", "Phryg-15L5"]],
  "Éolien L7": [["Min-24L7", "Phryg-54L7"], ["Maj-21L7", "Maj-21L7"]],
  "Éolien L11": [["Maj-36L5", "Maj-9L11"], ["Min-30L11", "Phryg-15L5"]],
  "Éolien L13": [["Min-24L7", "Phryg-12L13"]],
  "Phrygien L7m": [["Maj-36L5", "Min-18L7"], ["Phryg-60L7m", "Phryg-15L5"]],
  // La réintégration de Maj-21L7 rend aussi cette seconde paire exacte
  // sur ♭III et ♭VII, bien qu'elle ne soit pas encore explicitée dans l'annexe.
  "Phrygien L7sm": [["Phryg-60L7sm", "Phryg-54L7"], ["Maj-21L7", "Min-105L7"]],
  "Phrygien L13": [["Phryg-60L7sm", "Phryg-12L13"]],
  "Lydien #5 L5": [["Maj-24L5", "Phryg-15L5"]],
  "Lydien b7 L7": [["Min-18L7", "Maj-36L5"]],
  "Lydien b7 L11": [["Min-18L7", "Maj-9L11"]],
  "Mineur mélodique L5": [["Min-120L5", "Maj-36L5"]],
  "Mineur mélodique L7": [["Min-24L7", "Maj-36L5"]],
  "Mixolydien b6 L5": [["Maj-24L5", "Phryg-15L5"]],
  "Mixolydien b6 L7": [["Maj-24L5", "Phryg-54L7"]],
  "Mixolydien b6 L13": [["Maj-24L5", "Phryg-12L13"]],
  "Dorien b2 L7": [["Phryg-60L7sm", "Min-18L7"]],
  "Ionien #5 L5": [["Phryg3-60L5", "Phryg-15L5"]],
  "Dorien #4 L11": [["Min-18L7", "Phryg3-27L11"]],
  "Mineur harmonique L5": [["Min-120L5", "Phryg3-60L5"]],
  "Mineur harmonique L7": [["Min-24L7", "Phryg3-108L7"]],
  "Mineur harmonique L13": [["Min-24L7", "Phryg3-12L13"]],
  "Phrygien 3 L7": [["Phryg3-60L7", "Phryg-54L7"]],
  "Lydien b3 L5": [["Maj-36L5", "Phryg3-60L5"]],
  "Majeure harmonique L5": [["Maj-24L5", "Phryg3-60L5"]],
  "Majeure harmonique L7": [["Maj-24L5", "Phryg3-108L7"]],
  "Majeure harmonique L13": [["Maj-24L5", "Phryg3-12L13"]],
  "Mixolydien b2 L7": [["Phryg3-60L7", "Min-18L7"]],
  "Phrygien b4 L13": [["Phryg3-12L13", "Min-18L7"]],
  "Mineur harmonique #4 L5": [["Phryg3-60L5", "Phryg3-60L5"]],
  "Mineur harmonique #4 L13": [["Phryg3-12L13", "Phryg3-27L11"]],
  "Double harmonique majeur L7": [["Phryg3-60L7", "Phryg3-108L7"]],
  "Double harmonique majeur L13": [["Phryg3-60L7", "Phryg3-12L13"]],
  "Éolien #4 L5": [["Phryg-15L5", "Phryg3-60L5"]],
  "Éolien #4 L11": [["Phryg-54L7", "Phryg3-27L11"]],
  // Le tableau récapitulatif v18 indique ici Phryg-60L7sm, mais cette suite
  // ne correspond pas aux ratios du mode. Le tableau musical validé et le
  // calcul exact donnent Phryg3-27L11 (degré 2) + Phryg-12L13 (degré 5).
  "Éolien #4 L13": [["Phryg3-27L11", "Phryg-12L13"]],
  "Napolitain mineur L7m": [["Phryg-60L7m", "Phryg3-60L5"]],
  "Napolitain mineur L7sm": [["Phryg-60L7sm", "Phryg3-108L7"]],
  "Lydien dom. b6 L5": [["Phryg-15L5", "Maj-36L5"]],
  "Lydien dom. b6 L11": [["Phryg-54L7", "Maj-9L11"]],
  "Lydien dom. b6 L13": [["Phryg-12L13", "Maj-9L11"]],
  "Napolitain majeur L7sm": [["Phryg-60L7sm", "Maj-36L5"]],
  "Napolitain majeur L7m": [["Phryg-60L7m", "Maj-36L5"]],
});

function tetrachordGreatestCommonDivisor(a, b) {
  let x = a;
  let y = b;
  while (y !== 0n) [x, y] = [y, x % y];
  return x;
}

function tetrachordFraction(value) {
  const match = value.match(/^(\d+)\/(\d+)$/);
  if (!match) return null;
  const numerator = BigInt(match[1]);
  const denominator = BigInt(match[2]);
  const divisor = tetrachordGreatestCommonDivisor(numerator, denominator);
  return { numerator: numerator / divisor, denominator: denominator / divisor };
}

function fractionAtTetrachordScaleIndex(ratios, index) {
  const scaleLength = ratios.length - 1;
  const fraction = tetrachordFraction(ratios[index % scaleLength]);
  if (!fraction) return null;
  const numerator = fraction.numerator * (2n ** BigInt(Math.floor(index / scaleLength)));
  const divisor = tetrachordGreatestCommonDivisor(numerator, fraction.denominator);
  return { numerator: numerator / divisor, denominator: fraction.denominator / divisor };
}

function relativeTetrachordScaleRatio(ratios, startIndex, offset) {
  const start = fractionAtTetrachordScaleIndex(ratios, startIndex);
  const pitch = fractionAtTetrachordScaleIndex(ratios, startIndex + offset);
  if (!start || !pitch) return null;
  const numerator = pitch.numerator * start.denominator;
  const denominator = pitch.denominator * start.numerator;
  const divisor = tetrachordGreatestCommonDivisor(numerator, denominator);
  return `${numerator / divisor}/${denominator / divisor}`;
}

function matchingTetrachordStarts(ratios, tetrachordName) {
  const template = TETRACHORD_RATIOS[tetrachordName];
  if (!template) return [];
  const matches = [];
  for (let startIndex = 0; startIndex < ratios.length - 1; startIndex += 1) {
    if (template.every(
      (ratio, offset) => relativeTetrachordScaleRatio(ratios, startIndex, offset) === ratio,
    )) matches.push(startIndex);
  }
  return matches;
}

function documentedTetrachordPairs(mode) {
  const constructions = MODE_TETRACHORD_CONSTRUCTIONS[mode.label] ?? [];
  const retained = new Set(RETAINED_TETRACHORD_GROUPS.flatMap((group) => group.codes));
  return constructions.flatMap((codes, sourceIndex) => {
    if (codes.length !== 2 || codes.some((code) => !retained.has(code))) return [];
    const matches = codes.map((code) => matchingTetrachordStarts(mode.ratios, code));
    const seen = new Set();
    const pairs = [];
    for (const first of matches[0]) {
      for (const second of matches[1]) {
        if (first === second) continue;
        const starts = [first, second].sort((a, b) => a - b);
        const key = starts.join(",");
        if (seen.has(key)) continue;
        const coveredDegrees = new Set(starts.flatMap((start) => (
          [0, 1, 2, 3].map((offset) => (start + offset) % (mode.ratios.length - 1))
        )));
        if (coveredDegrees.size !== mode.ratios.length - 1) continue;
        seen.add(key);
        pairs.push({
          sourceIndex,
          starts,
          members: [{ code: codes[0], startIndex: first }, { code: codes[1], startIndex: second }],
        });
      }
    }
    return pairs;
  });
}

function primaryTetrachordStarts(mode) {
  return documentedTetrachordPairs(mode)[0]?.starts ?? [];
}

function preferredTetrachordStarts(mode, { preferredStartIndices = [], selectedTetrachord = null } = {}) {
  const preferred = new Set(preferredStartIndices);
  const candidates = documentedTetrachordPairs(mode).map((pair) => ({
    ...pair,
    preferredCount: pair.starts.filter((index) => preferred.has(index)).length,
    containsSelection: Number(Boolean(selectedTetrachord && pair.members.some((member) => (
      member.code === selectedTetrachord.code && member.startIndex === selectedTetrachord.startIndex
    )))),
  }));
  candidates.sort((first, second) => (
    second.preferredCount - first.preferredCount
    || second.containsSelection - first.containsSelection
    || first.sourceIndex - second.sourceIndex
    || first.starts[0] - second.starts[0]
    || first.starts[1] - second.starts[1]
  ));
  return candidates[0]?.starts ?? [];
}

function buildTetrachordCatalog(modes) {
  return RETAINED_TETRACHORD_GROUPS.flatMap((group) => group.codes.map((code) => ({
    code,
    family: group.label,
    ratios: TETRACHORD_RATIOS[code],
    occurrences: modes.flatMap((mode, modeIndex) => matchingTetrachordStarts(mode.ratios, code)
      .map((lowerIndex) => ({ mode, modeIndex, lowerIndex, lowerRatio: mode.ratios[lowerIndex] }))),
  })));
}

globalThis.HN_MODE_TETRACHORDS = Object.freeze({
  primaryTetrachordStarts,
  documentedTetrachordPairs,
  preferredTetrachordStarts,
  buildTetrachordCatalog,
  groups: RETAINED_TETRACHORD_GROUPS,
});
