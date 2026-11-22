"use strict";

(() => {
  function greatestCommonDivisor(first, second) {
    let x = first < 0n ? -first : first;
    let y = second < 0n ? -second : second;
    while (y !== 0n) [x, y] = [y, x % y];
    return x;
  }

  function normalize(numerator, denominator) {
    if (numerator <= 0n || denominator <= 0n) return null;
    const divisor = greatestCommonDivisor(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;
    while (numerator < denominator) numerator *= 2n;
    while (numerator >= denominator * 2n) denominator *= 2n;
    const octaveDivisor = greatestCommonDivisor(numerator, denominator);
    return `${numerator / octaveDivisor}/${denominator / octaveDivisor}`;
  }

  function parse(value) {
    const match = String(value).trim().match(/^(\d+)\s*\/\s*(\d+)$/);
    return match ? [BigInt(match[1]), BigInt(match[2])] : null;
  }

  function removeFactor(value, factor) {
    while (value % factor === 0n) value /= factor;
    return value;
  }

  function harmonicPrimePowers(value) {
    const powers = [];
    let remaining = value;
    for (let prime = 5n; prime * prime <= remaining; prime += 2n) {
      if (remaining % prime !== 0n) continue;
      let power = 1n;
      while (remaining % prime === 0n) {
        remaining /= prime;
        power *= prime;
      }
      powers.push(power);
    }
    if (remaining > 1n) powers.push(remaining);
    return powers;
  }

  // The tonic family determines which pitches may act as tonics; it does not
  // grant a matching subharmonic direction. Powers of 3 are structural and may
  // occur in either direction. Every other prime-power component must match an
  // explicitly configured harmonic order in the numerator. Thus 5 does not
  // silently permit 25, while a product such as 35 requires both 5 and 7.
  function ratioUsesPermittedHarmonics(value, harmonics = []) {
    const parsed = parse(value);
    if (!parsed || parsed[0] <= 0n || parsed[1] <= 0n) return false;
    const divisor = greatestCommonDivisor(parsed[0], parsed[1]);
    let numerator = parsed[0] / divisor;
    let denominator = parsed[1] / divisor;
    numerator = removeFactor(removeFactor(numerator, 2n), 3n);
    denominator = removeFactor(removeFactor(denominator, 2n), 3n);
    if (denominator !== 1n) return false;
    const permitted = new Set([...new Set(harmonics)]
      .map(Number)
      .filter((harmonic) => Number.isSafeInteger(harmonic) && harmonic > 3)
      .map((harmonic) => String(harmonic)));
    return harmonicPrimePowers(numerator)
      .every((power) => permitted.has(String(power)));
  }

  // Line-separated exact ratios, ending in 2/1; no Scala file header.
  function parseNetworkRatios(text) {
    if (typeof text !== "string" || text.length > 32768) {
      throw new Error("La saisie est trop longue (32 768 caractères maximum).");
    }
    const lines = text.replace(/^\uFEFF/, "").split(/\r\n?|\n/)
      .map((value, index) => ({ value: value.trim(), number: index + 1 }))
      .filter(({ value }) => value);
    if (!lines.length) throw new Error("Collez les ratios du réseau, un par ligne, en terminant par 2/1.");
    if (lines.length > 128) throw new Error("Le réseau accepte au maximum 128 lignes de hauteurs.");
    const ratios = new Set(["1/1"]);
    for (const { value, number } of lines) {
      if (/^[+-]?\d*\./.test(value)) throw new Error(`Ligne ${number} : les cents ne sont pas pris en charge par le réseau HEJI. Utilisez un ratio exact, par exemple 5/4.`);
      const match = value.match(/^(\d+)\s*\/\s*(\d+)$/);
      if (!match) throw new Error(`Ligne ${number} : ratio invalide. Exemple attendu : 9/8.`);
      const numerator = BigInt(match[1]);
      const denominator = BigInt(match[2]);
      if (numerator < 1n || denominator < 1n || numerator > 2147483647n || denominator > 2147483647n) {
        throw new Error(`Ligne ${number} : les deux termes du ratio doivent être compris entre 1 et 2 147 483 647.`);
      }
      const ratio = normalize(numerator, denominator);
      for (let term of parse(ratio)) {
        for (const prime of [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n]) {
          while (term % prime === 0n) term /= prime;
        }
        if (term !== 1n) throw new Error(`Ligne ${number} : ce ratio contient une dimension au-delà de 23, non représentée par le réseau HEJI.`);
      }
      ratios.add(ratio);
    }
    if (!/^2\s*\/\s*1$/.test(lines.at(-1).value)) throw new Error("Terminez la liste par 2/1, sur la dernière ligne.");
    return { ratios: [...ratios], count: ratios.size };
  }

  globalThis.HN_NETWORK_MODEL = Object.freeze({ ratioUsesPermittedHarmonics, parseNetworkRatios });
})();
