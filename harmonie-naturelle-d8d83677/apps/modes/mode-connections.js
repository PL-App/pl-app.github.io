const DEGREE_TO_PITCH_CLASS = new Map([
  ["1", 0],
  ["♭2", 1],
  ["2", 2],
  ["♭3", 3],
  ["3", 4],
  ["♭4", 4],
  ["4", 5],
  ["♯4", 6],
  ["♭5", 6],
  ["5", 7],
  ["♯5", 8],
  ["♭6", 8],
  ["6", 9],
  ["♭7", 10],
  ["7", 11],
  ["8", 0],
]);

const DEGREE_SPELLING_OVERRIDES = new Map([
  ["13/10", "♭4"],
  ["25/16", "♯5"],
  ["11/9", "3"],
]);

function modulo12(value) {
  return ((value % 12) + 12) % 12;
}

function setKey(values) {
  return [...values].sort((a, b) => a - b).join(",");
}

function ratioCents(value) {
  const match = /^(\d+)\/(\d+)$/.exec(value);
  if (!match || Number(match[2]) === 0) {
    throw new Error(`Rapport invalide dans le catalogue modal : ${value}`);
  }
  return 1200 * Math.log2(Number(match[1]) / Number(match[2]));
}

export function modeDegreeLabel(ratio, index) {
  if (index === 0) return "1";
  if (index === 7) return "8";

  const override = DEGREE_SPELLING_OVERRIDES.get(ratio);
  if (override) return override;

  const cents = ratioCents(ratio);
  const degree = index + 1;
  if (degree === 2) return cents < 150 ? "♭2" : "2";
  if (degree === 3) return cents < 350 ? "♭3" : "3";
  if (degree === 4) {
    if (cents < 450) return "♭4";
    return cents > 550 ? "♯4" : "4";
  }
  if (degree === 5) return cents > 750 ? "♯5" : "5";
  if (degree === 6) return cents < 850 ? "♭6" : "6";
  if (degree === 7) return cents < 1050 ? "♭7" : "7";
  return String(degree);
}

function structuralPreset(preset) {
  if (!Array.isArray(preset.ratios) || preset.ratios.length !== 8) {
    throw new Error(`Le mode ${preset.label} doit contenir sept degrés et l'octave.`);
  }

  const degrees = preset.ratios.slice(0, 7).map(modeDegreeLabel);
  const pitchClasses = degrees.map((degree) => {
    const pitchClass = DEGREE_TO_PITCH_CLASS.get(degree);
    if (pitchClass === undefined) {
      throw new Error(`Degré modal non pris en charge : ${degree}`);
    }
    return pitchClass;
  });

  if (new Set(pitchClasses).size !== 7) {
    throw new Error(`Le mode ${preset.label} ne possède pas sept classes de hauteur distinctes.`);
  }

  return { degrees, pitchClasses };
}

/**
 * Regroupe les réalisations L5/L7/L11/L13 sous leur forme modale générique.
 * Les connexions sont structurelles : une variante de limite n'est jamais un
 * nouveau mode dans le graphe de modulation.
 */
export function buildGenericModeCatalog(modeGroups) {
  const modes = [];

  modeGroups.forEach((group, groupIndex) => {
    group.families.forEach((family, familyIndex) => {
      if (!family.presets.length) {
        throw new Error(`La famille ${family.label} ne contient aucune réalisation.`);
      }

      const variants = family.presets.map((preset) => ({
        label: preset.label,
        ratios: [...preset.ratios],
        ...structuralPreset(preset),
      }));
      const structuralKey = variants[0].pitchClasses.join(",");

      for (const variant of variants.slice(1)) {
        if (variant.pitchClasses.join(",") !== structuralKey) {
          throw new Error(
            `Les variantes de ${family.label} ne décrivent pas la même structure modale.`,
          );
        }
      }

      modes.push({
        id: `${groupIndex}-${familyIndex}`,
        group: group.label,
        name: family.label,
        degrees: [...variants[0].degrees],
        pitchClasses: [...variants[0].pitchClasses],
        variants: variants.map(({ label, ratios }) => ({ label, ratios })),
      });
    });
  });

  return modes;
}

export function absolutePitchClasses(mode, tonicPitchClass = 0) {
  return new Set(mode.pitchClasses.map((pitchClass) => modulo12(pitchClass + tonicPitchClass)));
}

function buildInterpretationIndex(catalog) {
  const index = new Map();
  for (const mode of catalog) {
    for (let tonicPitchClass = 0; tonicPitchClass < 12; tonicPitchClass += 1) {
      const key = setKey(absolutePitchClasses(mode, tonicPitchClass));
      const interpretations = index.get(key) ?? [];
      interpretations.push({
        modeId: mode.id,
        modeName: mode.name,
        group: mode.group,
        tonicPitchClass,
        variants: mode.variants.map(({ label }) => label),
      });
      index.set(key, interpretations);
    }
  }
  return index;
}

function resolveSourceMode(catalog, sourceMode) {
  if (typeof sourceMode === "object" && sourceMode?.pitchClasses) return sourceMode;
  const matches = catalog.filter((mode) => mode.id === sourceMode || mode.name === sourceMode);
  if (matches.length !== 1) {
    throw new Error(`Mode source introuvable ou ambigu : ${sourceMode}`);
  }
  return matches[0];
}

/**
 * Une connexion élémentaire conserve six classes de hauteur absolues et
 * déplace la septième d'un demi-ton. Les interprétations obtenues sont ensuite
 * séparées selon que leur tonique reste identique ou change.
 */
export function calculateModeConnections({
  catalog,
  sourceMode,
  sourceTonicPitchClass = 0,
  includeTonicAlterations = true,
}) {
  const resolvedSource = resolveSourceMode(catalog, sourceMode);
  const tonicPitchClass = modulo12(sourceTonicPitchClass);
  const sourceSet = absolutePitchClasses(resolvedSource, tonicPitchClass);
  const interpretationIndex = buildInterpretationIndex(catalog);
  const equivalent = (interpretationIndex.get(setKey(sourceSet)) ?? []).map((target) => ({
    ...target,
    connectionType: target.tonicPitchClass === tonicPitchClass ? "identical" : "relative",
  }));
  const mutations = [];

  resolvedSource.pitchClasses.forEach((relativePitchClass, degreeIndex) => {
    if (!includeTonicAlterations && degreeIndex === 0) return;

    const fromPitchClass = modulo12(relativePitchClass + tonicPitchClass);
    for (const direction of [-1, 1]) {
      const toPitchClass = modulo12(fromPitchClass + direction);
      if (sourceSet.has(toPitchClass)) continue;

      const resultSet = new Set(sourceSet);
      resultSet.delete(fromPitchClass);
      resultSet.add(toPitchClass);
      const targets = interpretationIndex.get(setKey(resultSet));
      if (!targets?.length) continue;

      mutations.push({
        sourceDegreeIndex: degreeIndex + 1,
        sourceDegreeLabel: resolvedSource.degrees[degreeIndex],
        fromPitchClass,
        toPitchClass,
        direction,
        altersSourceTonic: degreeIndex === 0,
        retainedPitchClassCount: 6,
        targets: targets.map((target) => ({
          ...target,
          connectionType: target.tonicPitchClass === tonicPitchClass ? "parallel" : "modulating",
        })),
      });
    }
  });

  const parallel = mutations.flatMap((mutation) => mutation.targets
    .filter((target) => target.connectionType === "parallel")
    .map((target) => ({ ...mutation, targets: undefined, target })));
  const modulating = mutations.flatMap((mutation) => mutation.targets
    .filter((target) => target.connectionType === "modulating")
    .map((target) => ({ ...mutation, targets: undefined, target })));

  return {
    source: {
      modeId: resolvedSource.id,
      modeName: resolvedSource.name,
      group: resolvedSource.group,
      tonicPitchClass,
      degrees: [...resolvedSource.degrees],
      variants: resolvedSource.variants.map(({ label }) => label),
    },
    equivalent,
    mutations,
    parallel,
    modulating,
  };
}
