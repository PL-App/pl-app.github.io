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
  "64/63",
  "16/15",
  "10/9",
  "8/7",
  "32/27",
  "6/5",
  "5/4",
  "9/7",
  "4/3",
  "64/45",
  "40/27",
  "3/2",
  "32/21",
  "128/81",
  "8/5",
  "5/3",
  "12/7",
  "16/9",
  "256/135",
  "160/81",
  "2/1",
  "2/1",
];

const TONIC_RATIO_SET = new Set(TONIC_RATIOS);

const FAMILY_DEFINITIONS = {
  h3: {
    key: "h3",
    shortLabel: "1/1*",
    label: "1/1* — niveau neutre",
    tonics: ["128/81", "32/27", "16/9", "4/3", "2/1", "3/2", "2/1"],
    concordant: [],
    harmonics: [5, 25, 7, 11, 13],
  },
  h5: {
    key: "h5",
    shortLabel: "5/4*",
    label: "5/4* — harmonique 5",
    tonics: ["160/81", "40/27", "10/9", "5/3", "5/4"],
    concordant: [],
    harmonics: [5],
  },
  h25: {
    key: "h25",
    shortLabel: "25/16*",
    label: "25/16* — harmonique 25",
    tonics: [],
    concordant: [],
    harmonics: [],
  },
  sh5: {
    key: "sh5",
    shortLabel: "8/5*",
    label: "8/5* — sous-harmonique 5",
    tonics: ["256/135", "64/45", "16/15", "8/5", "6/5"],
    concordant: [],
    harmonics: [5, 25, 7, 11, 13],
  },
  sh7: {
    key: "sh7",
    shortLabel: "8/7*",
    label: "8/7* — sous-harmonique 7",
    tonics: ["64/63", "32/21", "8/7", "12/7", "9/7"],
    concordant: [],
    harmonics: [7],
  },
  "h10/7": {
    key: "h10/7",
    shortLabel: "10/7*",
    label: "10/7* — harmonique 10/7",
    tonics: [],
    concordant: [],
    harmonics: [],
  },
  "sh7/5": {
    key: "sh7/5",
    shortLabel: "7/5*",
    label: "7/5* — sous-harmonique 7/5",
    tonics: [],
    concordant: [],
    harmonics: [],
  },
};

// Même ordre vertical que le Réseau : dimensions harmoniques au-dessus du
// niveau neutre, dimensions sous-harmoniques en dessous.
const NETWORK_FAMILY_ORDER = ["h25", "h5", "h10/7", "h3", "sh7", "sh7/5", "sh5"];
const NETWORK_FAMILY_BLUEPRINTS = {
  h3: { displayRatio: "1/1", seedMultiplier: "1/1", locked: true },
  h25: { displayRatio: "25/16", seedMultiplier: "25/16" },
  h5: { displayRatio: "5/4", seedMultiplier: "5/4" },
  sh5: { displayRatio: "8/5", seedMultiplier: "4/5" },
  sh7: { displayRatio: "8/7", seedMultiplier: "8/7" },
  "h10/7": { displayRatio: "10/7", seedMultiplier: "10/7" },
  "sh7/5": { displayRatio: "7/5", seedMultiplier: "7/5" },
};
const NETWORK_FAMILY_ACCIDENTAL_OVERRIDES = {
  // « f » est le bémol haussé dans HEJI2Text, symétrique du dièse abaissé
  // calculé pour la dimension 5/4*.
  sh5: "f",
};
const NETWORK_HARMONICS = [5, 25, 7, 11, 13];
const NETWORK_CONCORDANCE_GROUPS = [
  {
    label: "Secondes",
    ratios: ["28/27", "21/20", "16/15", "14/13", "13/12", "12/11", "11/10", "10/9", "9/8", "8/7"],
  },
  {
    label: "Tierces",
    ratios: ["7/6", "13/11", "6/5", "11/9", "5/4", "9/7"],
  },
  {
    label: "Quartes/Quintes",
    ratios: ["14/11", "13/10", "4/3", "11/8", "7/5", "45/32", "10/7", "13/9", "3/2", "25/16"],
  },
  {
    label: "Sixtes",
    ratios: ["14/9", "8/5", "13/8", "5/3", "12/7"],
  },
  {
    label: "Septièmes",
    ratios: ["7/4", "16/9", "9/5", "20/11", "15/8", "40/21"],
  },
];
const NETWORK_CONCORDANCE_RATIOS = NETWORK_CONCORDANCE_GROUPS.flatMap(({ ratios }) => ratios);
const NETWORK_CONCORDANCE_RATIO_SET = new Set(NETWORK_CONCORDANCE_RATIOS);
const NETWORK_REFERENCE_PITCHES = [
  { ratio: "128/81", label: "F" },
  { ratio: "32/27", label: "C" },
  { ratio: "16/9", label: "G" },
  { ratio: "4/3", label: "D" },
  { ratio: "1/1", label: "A" },
  { ratio: "3/2", label: "E" },
  { ratio: "9/8", label: "B" },
  { ratio: "27/16", label: "F♯" },
  { ratio: "81/64", label: "C♯" },
];
const NETWORK_REFERENCE_RATIO_SET = new Set(NETWORK_REFERENCE_PITCHES.map(({ ratio }) => ratio));
const NETWORK_DEFAULT_TONIC_FAMILY_ORDER = ["h5", "h3", "sh7", "sh5"];
const NETWORK_DEFAULT_TONIC_CHOICES = {
  h5: [...FAMILY_DEFINITIONS.h5.tonics],
  h3: [...new Set([
    ...FAMILY_DEFINITIONS.h3.tonics.filter((ratio) => ratio !== "2/1"),
    ...NETWORK_REFERENCE_PITCHES.map(({ ratio }) => ratio),
  ])],
  sh7: [...FAMILY_DEFINITIONS.sh7.tonics],
  sh5: [...FAMILY_DEFINITIONS.sh5.tonics],
};
const NETWORK_STORE_KEY = "harmonie-naturelle-network-store-v1";
const NETWORK_STORE_SCHEMA_VERSION = 17;
// Modèles intégrés retirés (19 octobre 2026) : L13d, L13e et leur variante 45/32 lus à tort depuis la.
// E2 (20 octobre 2026) : anciens modèles « proposé » retirés des menus; les touches enregistrées gardent leurs frettes.
const REMOVED_BUILTIN_NETWORK_IDS = new Set(["tfp-l13-a", "tfp-l13-39-32-a", "tfp-l13-45-32-propose-a",
  "tfe-l11-12f-11-10-propose", "tfe-l13-12f-11-10-13-10-propose", "tfe-l13-14f-11-10-13-10-propose",
  "tfp-l7-45-32-propose-a", "tfp-l13-45-32-propose-e"]);
const PERSONAL_TFE_NETWORKS_URL = "/api/personal-tfe-networks";
const DEFAULT_NETWORK_CONFIGURATION = {
  id: "reseau-actuel",
  name: "Réseau défaut 1",
  scope: "global",
  diapasonHz: 440,
  referenceRatio: "1/1",
  generatorRatio: "1/1",
  sourceMethod: "configure",
  scalaText: "",
  concordances: [...NETWORK_CONCORDANCE_RATIOS],
  families: {
    h3: { enabled: true, negative: 4, positive: 1, harmonics: [5, 25, 7, 11, 13] },
    h25: { enabled: false, negative: 3, positive: 3, selectedTonics: [], harmonics: [] },
    h5: { enabled: true, negative: 4, positive: 0, harmonics: [5] },
    sh5: { enabled: true, negative: 3, positive: 1, harmonics: [5, 25, 7, 11, 13] },
    sh7: { enabled: true, negative: 2, positive: 2, harmonics: [7] },
    "h10/7": { enabled: false, negative: 0, positive: 0, selectedTonics: [], harmonics: [] },
    "sh7/5": { enabled: false, negative: 0, positive: 0, selectedTonics: [], harmonics: [] },
  },
};

// Remarques d'infobulle des modèles (TFE et TFP) : source et rôle seulement (E5, 20 octobre 2026).
const TFP_MODEL_NOTES = new Map();
const DEFAULT_TOUCH_NETWORK_CONFIGURATIONS = [
  {
    id: "touche-l5-defaut",
    name: "TFE-L5-12F",
    ratios: ["16/15", "9/8", "6/5", "5/4", "4/3", "45/32", "3/2", "8/5", "5/3", "9/5", "15/8", "2/1"],
  },
  {
    id: "touche-l7-defaut",
    name: "TFE-L7-12F",
    // Modèle de référence L7 commun TFE/TFP : 7/6 et 14/9 (Simon, 19 octobre 2026).
    ratios: ["21/20", "9/8", "7/6", "5/4", "4/3", "7/5", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "touche-l11-defaut",
    name: "TFE-L11-12F",
    ratios: ["21/20", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "touche-l13-defaut",
    name: "TFE-L13-12F",
    // Demande D1 (19 octobre 2026) : L13 = L11 où 13/8 remplace 14/9 (5/3 conservé).
    ratios: ["21/20", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    // Ancien modèle de référence L13 (D1), conservé comme variante.
    id: "tfe-l13-12f-14-9",
    name: "TFE-L13-12F-(14/9)",
    ratios: ["21/20", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "14/9", "13/8", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l13-15f-defaut",
    name: "TFE-L13-15F",
    abstractFretPlanId: "tfe-15",
    ratios: ["21/20", "16/15", "9/8", "7/6", "6/5", "5/4", "4/3", "11/8", "3/2", "14/9", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l13-15f-16-15-defaut",
    name: "TFE-L13-15F-(33/20)",
    abstractFretPlanId: "tfe-15-33-20",
    ratios: ["16/15", "11/10", "9/8", "7/6", "6/5", "5/4", "13/10", "4/3", "11/8", "3/2", "14/9", "33/20", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l13-18f-defaut",
    name: "TFE-L13-18F",
    abstractFretPlanId: "tfe-18",
    ratios: ["21/20", "16/15", "13/12", "11/10", "9/8", "7/6", "6/5", "11/9", "5/4", "4/3", "11/8", "3/2", "14/9", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l13-19f-21-20-defaut",
    name: "TFE-L13-19F-(21/20)",
    abstractFretPlanId: "tfe-19-21-20",
    ratios: ["21/20", "16/15", "9/8", "8/7", "7/6", "6/5", "5/4", "9/7", "4/3", "11/8", "10/7", "3/2", "14/9", "13/8", "5/3", "7/4", "9/5", "15/8", "2/1"],
  },
  {
    id: "tfe-l13-19f-25-24-defaut",
    name: "TFE-L13-19F-(25/24)",
    abstractFretPlanId: "tfe-19-25-24",
    ratios: ["25/24", "16/15", "11/10", "9/8", "8/7", "7/6", "6/5", "5/4", "4/3", "11/8", "7/5", "3/2", "25/16", "13/8", "5/3", "7/4", "9/5", "15/8", "2/1"],
  },
  {
    id: "tfe-l13-21f-defaut",
    name: "TFE-L13-21F",
    abstractFretPlanId: "tfe-21",
    ratios: ["21/20", "16/15", "13/12", "11/10", "9/8", "7/6", "6/5", "11/9", "5/4", "13/10", "4/3", "11/8", "45/32", "13/9", "3/2", "14/9", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l13-20f-defaut",
    name: "TFE-L13-20F-(33/20)",
    abstractFretPlanId: "tfe-20-33-20",
    ratios: ["21/20", "16/15", "13/12", "11/10", "9/8", "7/6", "6/5", "11/9", "5/4", "13/10", "4/3", "11/8", "45/32", "13/9", "3/2", "14/9", "33/20", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l5-diesis-14f-defaut",
    name: "TFE-L5-14F-(25/24–25/16)",
    abstractFretPlanId: "tfe-l5-diesis-14",
    ratios: ["25/24", "16/15", "9/8", "6/5", "5/4", "4/3", "45/32", "3/2", "25/16", "8/5", "5/3", "9/5", "15/8", "2/1"],
  },
  {
    id: "tfe-3-star-5-11-14f-defaut",
    name: "TFE-L11-14F-(3–5–11)",
    abstractFretPlanId: "tfe-3-star-5-11-14",
    ratios: ["16/15", "11/10", "9/8", "6/5", "5/4", "4/3", "11/8", "45/32", "3/2", "8/5", "5/3", "9/5", "15/8", "2/1"],
  },
  {
    id: "tfe-3-5-7-13-12f-defaut",
    name: "TFE-L13-12F-(3–5–7–13)",
    abstractFretPlanId: "tfe-3-5-7-13-12",
    ratios: ["21/20", "13/12", "9/8", "7/6", "6/5", "5/4", "13/10", "4/3", "3/2", "14/9", "7/4", "2/1"],
  },
  // E1 (Simon, 20 octobre 2026) : ancien plan « proposé » retenu; identifiant historique conservé (sauvegardes).
  {
    id: "tfe-l7-12f-21-20-7-5-propose",
    name: "TFE-L7-12F-(6/5–9/5)",
    note: "Modèle L7 à tierces h5 : 6/5, 8/5 et 9/5 remplacent 7/6, 14/9 et 7/4 ; plus d'accords et d'enchaînements, moins de tétracordes.",
    ratios: ["21/20", "9/8", "6/5", "5/4", "4/3", "7/5", "3/2", "8/5", "5/3", "9/5", "15/8", "2/1"],
  },
  // E2 (Simon, 20 octobre 2026) : TFE-L11-12F-(11/10), TFE-L13-12F-(11/10–13/10) et TFE-L13-14F-(11/10–13/10),
  // anciens plans « proposé », sont retirés des menus (REMOVED_BUILTIN_NETWORK_IDS).
  // Demande F (20 octobre 2026) : deux touches à l'essai, sans mention dans le nom.
  {
    id: "tfe-l13-13f-11-10",
    name: "TFE-L13-13F-(11/10)",
    abstractFretPlanId: "tfe-13-11-10",
    note: "Ajoutée à l'essai le 20 octobre 2026, pour les intervalles neutres (bağlama) ; à confirmer à l'audit des modèles.",
    ratios: ["21/20", "11/10", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l13-14f-16-15-11-10",
    name: "TFE-L13-14F-(16/15–11/10)",
    abstractFretPlanId: "tfe-14-16-15-11-10",
    note: "Ajoutée à l'essai le 20 octobre 2026, pour les intervalles neutres (bağlama) ; à confirmer à l'audit des modèles.",
    ratios: ["21/20", "16/15", "11/10", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  // Demande G (21 octobre 2026) : quatre touches à l'essai, sans mention dans le nom.
  {
    id: "tfe-l13-13f-13-12",
    name: "TFE-L13-13F-(13/12)",
    abstractFretPlanId: "tfe-13-13-12",
    note: "Ajoutée à l'essai le 21 octobre 2026 (intervalles neutres et positions) ; à confirmer à l'audit des modèles.",
    ratios: ["21/20", "13/12", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l13-15f-13-12-11-10-6-5",
    name: "TFE-L13-15F-(13/12–11/10–6/5)",
    abstractFretPlanId: "tfe-15-13-12-11-10-6-5",
    note: "Ajoutée à l'essai le 21 octobre 2026 (intervalles neutres et positions) ; à confirmer à l'audit des modèles.",
    ratios: ["21/20", "13/12", "11/10", "9/8", "7/6", "6/5", "5/4", "4/3", "11/8", "3/2", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l13-15f-16-15-11-10-6-5",
    name: "TFE-L13-15F-(16/15–11/10–6/5)",
    abstractFretPlanId: "tfe-15-16-15-11-10-6-5",
    note: "Ajoutée à l'essai le 21 octobre 2026 (intervalles neutres et positions) ; à confirmer à l'audit des modèles.",
    ratios: ["21/20", "16/15", "11/10", "9/8", "7/6", "6/5", "5/4", "4/3", "11/8", "3/2", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l13-15f-11-10-6-5-13-10",
    name: "TFE-L13-15F-(11/10–6/5–13/10)",
    abstractFretPlanId: "tfe-15-11-10-6-5-13-10",
    note: "Ajoutée à l'essai le 21 octobre 2026 (intervalles neutres et positions) ; à confirmer à l'audit des modèles.",
    ratios: ["21/20", "11/10", "9/8", "7/6", "6/5", "5/4", "13/10", "4/3", "11/8", "3/2", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  // Demande H (21 octobre 2026) : cinq touches L5 et L7 à l'essai, sans mention dans le nom.
  {
    id: "tfe-l5-14f-75-64-32-25",
    name: "TFE-L5-14F-(75/64–32/25)",
    abstractFretPlanId: "tfe-l5-14-75-64-32-25",
    note: "Ajoutée à l'essai le 21 octobre 2026 ; à confirmer à l'audit des modèles.",
    ratios: ["16/15", "9/8", "75/64", "6/5", "5/4", "32/25", "4/3", "45/32", "3/2", "8/5", "5/3", "9/5", "15/8", "2/1"],
  },
  {
    id: "tfe-l5-15f-75-64-32-25-36-25",
    name: "TFE-L5-15F-(75/64–32/25–36/25)",
    abstractFretPlanId: "tfe-l5-15-75-64-32-25-36-25",
    note: "Ajoutée à l'essai le 21 octobre 2026 ; à confirmer à l'audit des modèles.",
    ratios: ["16/15", "9/8", "75/64", "6/5", "5/4", "32/25", "4/3", "45/32", "36/25", "3/2", "8/5", "5/3", "9/5", "15/8", "2/1"],
  },
  {
    id: "tfe-l7-14f-35-32-6-5",
    name: "TFE-L7-14F-(35/32–6/5)",
    abstractFretPlanId: "tfe-l7-14-35-32-6-5",
    note: "Ajoutée à l'essai le 21 octobre 2026 ; à confirmer à l'audit des modèles.",
    ratios: ["21/20", "35/32", "9/8", "7/6", "6/5", "5/4", "4/3", "7/5", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l7-15f-16-15-35-32-6-5",
    name: "TFE-L7-15F-(16/15–35/32–6/5)",
    abstractFretPlanId: "tfe-l7-15-16-15-35-32-6-5",
    note: "Ajoutée à l'essai le 21 octobre 2026 ; à confirmer à l'audit des modèles.",
    ratios: ["21/20", "16/15", "35/32", "9/8", "7/6", "6/5", "5/4", "4/3", "7/5", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l7-15f-49-48-35-32-6-5",
    name: "TFE-L7-15F-(49/48–35/32–6/5)",
    abstractFretPlanId: "tfe-l7-15-49-48-35-32-6-5",
    note: "Ajoutée à l'essai le 21 octobre 2026 ; à confirmer à l'audit des modèles.",
    ratios: ["49/48", "21/20", "35/32", "9/8", "7/6", "6/5", "5/4", "4/3", "7/5", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
  // 21 octobre 2026, après-midi : accords 4:5:6 sur la famille 8/7*, 10:12:15 sur la famille 10/7*.
  {
    id: "tfe-l7-15f-8-7-6-5-10-7",
    name: "TFE-L7-15F-(8/7–6/5–10/7)",
    abstractFretPlanId: "tfe-l7-15-8-7-6-5-10-7",
    note: "Ajoutée à l'essai le 21 octobre 2026 ; à confirmer à l'audit des modèles.",
    ratios: ["21/20", "9/8", "8/7", "7/6", "6/5", "5/4", "4/3", "7/5", "10/7", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfe-l7-15f-15-14-6-5-9-7",
    name: "TFE-L7-15F-(15/14–6/5–9/7)",
    abstractFretPlanId: "tfe-l7-15-15-14-6-5-9-7",
    note: "Ajoutée à l'essai le 21 octobre 2026 ; à confirmer à l'audit des modèles.",
    ratios: ["21/20", "15/14", "9/8", "7/6", "6/5", "5/4", "9/7", "4/3", "7/5", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
].map(({ id, name, ratios, abstractFretPlanId = null, note = "" }) => {
  if (note) TFP_MODEL_NOTES.set(id, { note });
  return {
  ...DEFAULT_NETWORK_CONFIGURATION,
  id,
  name,
  referenceRatio: "1/1",
  generatorRatio: "1/1",
  sourceMethod: "scala",
  scope: "tfe",
  scalaText: ratios.join("\n"),
  abstractFretPlanId,
  };
});

// The physical-plan IDs remain stable for Frettier and older selections. Their
// default network counterparts above project frets from 1/1 only; a saved TFE
// with scordatura instead projects all six strings into its pitch network.
const TFE_FRET_PLAN_PRESETS = [
  { id: "tfe-15", name: "TFE-L13-15F" },
  { id: "tfe-15-33-20", name: "TFE-L13-15F-(33/20)" },
  { id: "tfe-18", name: "TFE-L13-18F" },
  { id: "tfe-19-21-20", name: "TFE-L13-19F-(21/20)" },
  { id: "tfe-19-25-24", name: "TFE-L13-19F-(25/24)" },
  { id: "tfe-21", name: "TFE-L13-21F" },
  { id: "tfe-20-33-20", name: "TFE-L13-20F-(33/20)" },
  { id: "tfe-l5-diesis-14", name: "TFE-L5-14F-(25/24–25/16)" },
  { id: "tfe-3-star-5-11-14", name: "TFE-L11-14F-(3–5–11)" },
  { id: "tfe-3-5-7-13-12", name: "TFE-L13-12F-(3–5–7–13)" },
  { id: "tfe-13-11-10", name: "TFE-L13-13F-(11/10)" },
  { id: "tfe-14-16-15-11-10", name: "TFE-L13-14F-(16/15–11/10)" },
  { id: "tfe-13-13-12", name: "TFE-L13-13F-(13/12)" },
  { id: "tfe-15-13-12-11-10-6-5", name: "TFE-L13-15F-(13/12–11/10–6/5)" },
  { id: "tfe-15-16-15-11-10-6-5", name: "TFE-L13-15F-(16/15–11/10–6/5)" },
  { id: "tfe-15-11-10-6-5-13-10", name: "TFE-L13-15F-(11/10–6/5–13/10)" },
  { id: "tfe-l5-14-75-64-32-25", name: "TFE-L5-14F-(75/64–32/25)" },
  { id: "tfe-l5-15-75-64-32-25-36-25", name: "TFE-L5-15F-(75/64–32/25–36/25)" },
  { id: "tfe-l7-14-35-32-6-5", name: "TFE-L7-14F-(35/32–6/5)" },
  { id: "tfe-l7-15-16-15-35-32-6-5", name: "TFE-L7-15F-(16/15–35/32–6/5)" },
  { id: "tfe-l7-15-49-48-35-32-6-5", name: "TFE-L7-15F-(49/48–35/32–6/5)" },
  { id: "tfe-l7-15-8-7-6-5-10-7", name: "TFE-L7-15F-(8/7–6/5–10/7)" },
  { id: "tfe-l7-15-15-14-6-5-9-7", name: "TFE-L7-15F-(15/14–6/5–9/7)" },
];

function tfeFretPlanPreset(id) {
  return TFE_FRET_PLAN_PRESETS.find((preset) => preset.id === id) ?? null;
}

// Modèles TFP (demande C5 de Simon, 18 octobre 2026) : les 17 échelles du Système d'accord jusqu'à la
// limite 13, plus TFP-L11-G7, TFP-L13-G7 et TFP-L13-(14/9)-G7 (E6, 20 octobre 2026 : 21 entrées, 20 échelles).
// Plus aucune ancienne lettre (L5c, L13d…) ni ancien nom dans les infobulles (E5) : seulement la source et le rôle.
// Chaque modèle est lu depuis son 1/1 d'origine (A); la scordatura est celle que le Frettier reconnaît
// (cordes à vide contenues dans l'échelle) et figure dans le nom, avec la tonique entre parenthèses.
// Règle de la tonique : un modèle ne peut être lu depuis une autre note que si cette note est une corde
// à vide, ce qui ne déplace aucune hauteur (L13d lue depuis mi ci-dessous); sinon c'est une transposition.
const DEFAULT_TFP_NETWORK_CONFIGURATIONS = [
  // Identifiants historiques conservés (sauvegardes) : seuls les noms suivent la nouvelle nomenclature.
  {
    id: "tfp-l5c-g5-a",
    name: "TFP-L5-G5 (A)",
    generatorRatio: "1/1",
    ratios: ["16/15", "9/8", "6/5", "5/4", "4/3", "45/32", "3/2", "8/5", "5/3", "9/5", "15/8", "2/1"],
  },
  {
    // Modèle L7 actualisé sur mi : son 1/1 est E (précision de Simon, 18 octobre 2026). Dans le Système,
    // une « transposition » est l'actualisation de la série de rapports sur une fondamentale.
    id: "tfp-l7c-d7g7-e",
    name: "TFP-L7-D7G7 (E)",
    note: "Centaur de Kraig Grady.",
    generatorRatio: "3/2",
    ratios: ["21/20", "9/8", "7/6", "5/4", "4/3", "7/5", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    // L13d (touche d'Esquisse no 3) : 1/1 sur mi, 3/2 de l'ancien 1/1, une corde à vide (Simon, 19 octobre 2026).
    // Avec D7G7, cordes à vide : mi 1/1, la 4/3, ré 7/4, sol 7/6, si 3/2, mi 1/1. Touche de contrôle.
    id: "tfp-l13d-d7g7-e",
    name: "TFP-L13-(14/9–11/6)-D7G7 (E)",
    generatorRatio: "3/2",
    ratios: ["13/12", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "14/9", "5/3", "7/4", "11/6", "2/1"],
  },
  {
    id: "tfp-l3-a",
    name: "TFP-L3 (A)",
    generatorRatio: "1/1",
    ratios: ["256/243", "9/8", "32/27", "81/64", "4/3", "729/512", "3/2", "128/81", "27/16", "16/9", "243/128", "2/1"],
  },
  {
    id: "tfp-l5-27-16-a",
    name: "TFP-L5-(27/16)-G5 (A)",
    generatorRatio: "1/1",
    ratios: ["16/15", "9/8", "6/5", "5/4", "4/3", "45/32", "3/2", "8/5", "27/16", "9/5", "15/8", "2/1"],
  },
  {
    id: "tfp-l5-27-16-16-9-a",
    name: "TFP-L5-(27/16–16/9) (A)",
    generatorRatio: "1/1",
    ratios: ["16/15", "9/8", "6/5", "5/4", "4/3", "45/32", "3/2", "8/5", "27/16", "16/9", "15/8", "2/1"],
  },
  {
    id: "tfp-l5-diesis-a",
    name: "TFP-L5-(25/24–25/16)-G5 (A)",
    generatorRatio: "1/1",
    ratios: ["25/24", "9/8", "6/5", "5/4", "4/3", "45/32", "3/2", "25/16", "5/3", "9/5", "15/8", "2/1"],
  },
  {
    id: "tfp-l7-a",
    name: "TFP-L7-G7 (A)",
    note: "Centaur de Kraig Grady.",
    generatorRatio: "1/1",
    ratios: ["21/20", "9/8", "7/6", "5/4", "4/3", "7/5", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfp-l7-6-5-8-5-a",
    name: "TFP-L7-(6/5–8/5)-G7 (A)",
    generatorRatio: "1/1",
    ratios: ["21/20", "9/8", "6/5", "5/4", "4/3", "7/5", "3/2", "8/5", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfp-l7-16-15-6-5-8-5-a",
    // Nomenclature des variantes (Simon, 19 octobre 2026) : au plus deux rapports qui entrent par rapport au
    // modèle de la limite et qui la distinguent de tous les autres; les noms d'auteurs vont au survol.
    name: "TFP-L7-(16/15–8/5)-G7 (A)",
    note: "Septimal JI de Marc Sabat.",
    generatorRatio: "1/1",
    ratios: ["16/15", "9/8", "6/5", "5/4", "4/3", "7/5", "3/2", "8/5", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfp-l7-15-14-10-7-8-5-a",
    // 14/9 à la frette 8 (Système d'accord, section détaillée de L7d et ses transpositions; le récapitulatif
    // « Liste des échelles », qui donnait 8/5, est fautif — Simon, 19 octobre 2026).
    name: "TFP-L7-(15/14–10/7)-G7 (A)",
    note: "Enharmonique d’Erv Wilson.",
    generatorRatio: "1/1",
    ratios: ["15/14", "9/8", "7/6", "5/4", "4/3", "10/7", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfp-l7-septimal-a",
    // Les deux rapports propres à cette échelle, issus de la deuxième chaîne de quintes décalée de 35:36.
    name: "TFP-L7-(35/24–35/18)-G7 (A)",
    note: "Enharmonique d’Erv Wilson.",
    generatorRatio: "1/1",
    ratios: ["28/27", "9/8", "7/6", "6/5", "4/3", "35/24", "3/2", "14/9", "8/5", "7/4", "35/18", "2/1"],
  },
  {
    id: "tfp-l11-a",
    name: "TFP-L11-(33/32)-G7 (A)",
    note: "Centaura de Kraig Grady.",
    generatorRatio: "1/1",
    ratios: ["33/32", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfp-l11-33-20-a",
    name: "TFP-L11-(33/20)-G5B11 (A)",
    note: "Exception à la règle de la tonique : conçue pour l’éolien L11, 11/10 tient lieu de 9/8.",
    generatorRatio: "1/1",
    ratios: ["16/15", "11/10", "6/5", "5/4", "4/3", "11/8", "3/2", "8/5", "33/20", "9/5", "15/8", "2/1"],
  },
  {
    // Modèle de référence L13 commun TFE/TFP (Simon, 19 octobre 2026) : la suite de TFE-L13-12F.
    id: "tfp-l13-g7-a",
    name: "TFP-L13-G7 (A)",
    generatorRatio: "1/1",
    // Demande D1 : même suite que TFE-L13-12F.
    ratios: ["21/20", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    // Ancienne référence L13 (D1), conservée comme variante.
    id: "tfp-l13-14-9-g7-a",
    name: "TFP-L13-(14/9)-G7 (A)",
    generatorRatio: "1/1",
    ratios: ["21/20", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "14/9", "13/8", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfp-l13-13-12-4-3-a",
    name: "TFP-L13-(13/12–27/16)-G7 (A)",
    generatorRatio: "1/1",
    ratios: ["13/12", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "13/8", "27/16", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfp-l13-13-12-4-3-13-9-a",
    name: "TFP-L13-(13/9–27/16)-G7 (A)",
    generatorRatio: "1/1",
    ratios: ["13/12", "9/8", "7/6", "5/4", "4/3", "13/9", "3/2", "13/8", "27/16", "7/4", "15/8", "2/1"],
  },
  {
    id: "tfp-l13-13-12-4-3-13-9-5-3-a",
    name: "TFP-L13-(13/12–13/9)-G7 (A)",
    generatorRatio: "1/1",
    ratios: ["13/12", "9/8", "7/6", "5/4", "4/3", "13/9", "3/2", "13/8", "5/3", "7/4", "15/8", "2/1"],
  },
  {
    // L13e : même traitement que L13d (Simon, 19 octobre 2026) : 1/1 sur mi (3/2 de l'ancien 1/1, corde à vide).
    // Ne diffère de L13d que par 13/8 à la place de 14/9.
    id: "tfp-l13e-d7g7-e",
    name: "TFP-L13-(13/12–11/6)-D7G7 (E)",
    generatorRatio: "3/2",
    ratios: ["13/12", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "13/8", "5/3", "7/4", "11/6", "2/1"],
  },
  {
    id: "tfp-l11-21-20-propose-a",
    // Devient le modèle de référence L11 commun TFE/TFP (Simon, 19 octobre 2026); identifiant conservé.
    name: "TFP-L11-G7 (A)",
    generatorRatio: "1/1",
    ratios: ["21/20", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"],
  },
].map(({ id, name, note = "", generatorRatio, ratios }) => {
  TFP_MODEL_NOTES.set(id, { note });
  return {
    ...DEFAULT_NETWORK_CONFIGURATION,
    id,
    name,
    referenceRatio: "1/1",
    generatorRatio,
    sourceMethod: "scala",
    scope: "tfp",
    scalaText: ratios.join("\n"),
  };
});

// Projet évolutif : bassin explicite, indépendant des toniques et modes cochés.
// Les données sont relatives à Sol (16/9 de La), tonique d'accueil conservée.
const ALTO_CELLO_MODE_LABELS = ["Ionien L5", "Éolien L5", "Éolien L7"];
const ALTO_CELLO_NETWORK_CONFIGURATION = {
  ...DEFAULT_NETWORK_CONFIGURATION,
  id: "alto-violoncelle",
  name: "Alto-vcelle - projet",
  referenceRatio: "1/1",
  generatorRatio: "16/9",
  sourceMethod: "scala",
  scope: "global",
  scalaText: "28/27\n16/15\n10/9\n9/8\n7/6\n32/27\n6/5\n5/4\n21/16\n4/3\n27/20\n112/81\n45/32\n64/45\n40/27\n3/2\n14/9\n8/5\n5/3\n27/16\n7/4\n16/9\n9/5\n15/8\n2/1",
  selectedTonicRatios: ["16/9", "4/3", "1/1", "3/2"],
};

const TFP_BASE_STRINGS_TO_A = ["3/2", "9/8", "16/9", "4/3", "1/1", "3/2"];
const TFP_SCORDATURA_CONFIGURATIONS = [
  ["tfp-standard", "—", TFP_BASE_STRINGS_TO_A],
  ["tfp-g5", "G5", ["3/2", "9/8", "9/5", "4/3", "1/1", "3/2"]],
  ["tfp-d5-g5", "D5G5", ["3/2", "9/8", "9/5", "27/20", "1/1", "3/2"]],
  ["tfp-a5-d5-g5", "A5D5G5", ["3/2", "9/8", "9/5", "27/20", "81/80", "3/2"]],
  ["tfp-b5", "B5", ["3/2", "10/9", "16/9", "4/3", "1/1", "3/2"]],
  ["tfp-e5-b5", "E5B5", ["40/27", "10/9", "16/9", "4/3", "1/1", "40/27"]],
  ["tfp-g7", "G7", ["3/2", "9/8", "7/4", "4/3", "1/1", "3/2"]],
  ["tfp-d7-g5", "D7G5", ["3/2", "9/8", "9/5", "21/16", "1/1", "3/2"]],
  ["tfp-a7-d5-g5", "A7D5G5", ["3/2", "9/8", "9/5", "27/20", "63/32", "3/2"]],
  ["tfp-d7-g7", "D7G7", ["3/2", "9/8", "7/4", "21/16", "1/1", "3/2"]],
  ["tfp-a7-d7-g7", "A7D7G7", ["3/2", "9/8", "7/4", "21/16", "63/32", "3/2"]],
  ["tfp-e7-b7", "E7B7", ["32/21", "8/7", "16/9", "4/3", "1/1", "32/21"]],
  ["tfp-g5-b7", "G5B7", ["3/2", "8/7", "9/5", "4/3", "1/1", "3/2"]],
  ["tfp-e11-b11", "E11B11", ["22/15", "11/10", "16/9", "4/3", "1/1", "22/15"]],
  ["tfp-g5-b11", "G5B11", ["3/2", "11/10", "9/5", "4/3", "1/1", "3/2"]],
  ["tfp-a7-d7-g13", "A7D7G13", ["3/2", "9/8", "117/64", "21/16", "63/32", "3/2"]],
  ["tfp-e7-g13-b7", "E7G13B7", ["32/21", "8/7", "13/7", "4/3", "1/1", "32/21"]],
  ["tfp-e7-a7-d13-g13", "E7A7D13G13", ["189/128", "9/8", "117/64", "351/256", "63/32", "189/128"]],
  ["tfp-d13-g13-b7", "D13G13B7", ["3/2", "8/7", "13/7", "39/28", "1/1", "3/2"]],
  ["tfp-e7-a7-d7-g13", "E7A7D7G13", ["189/128", "9/8", "117/64", "21/16", "63/32", "189/128"]],
  ["tfp-e11-g5-b11", "E11G5B11", ["22/15", "11/10", "9/5", "4/3", "1/1", "22/15"]],
  ["tfp-d5-g5-b11", "D5G5B11", ["3/2", "11/10", "9/5", "27/20", "1/1", "3/2"]],
  ["tfp-g13-b7", "G13B7", ["3/2", "8/7", "13/7", "4/3", "1/1", "3/2"]],
].map(([id, label, stringsToA]) => ({ id, label, stringsToA }));

const networkManager = {
  activeId: DEFAULT_NETWORK_CONFIGURATION.id,
  defaultId: DEFAULT_NETWORK_CONFIGURATION.id,
  lastActiveIdsByScope: {},
  draft: null,
  isNewDraft: false,
  presets: [],
};
const networkConfiguratorContext = {
  expectedPitchCount: null,
  ratiosOnly: false,
  seedRatios: [],
  source: "modes",
};
let networkConfiguratorMethod = "scala";
let appliedNetworkConfiguration = DEFAULT_NETWORK_CONFIGURATION;
let configuredReferenceRatio = DEFAULT_NETWORK_CONFIGURATION.referenceRatio;

const MODE_GROUPS = [
  {
    label: "Majeure",
    families: [
      {
        label: "Lydien",
        presets: [
          { label: "Lydien L5", ratios: ["1/1", "9/8", "5/4", "45/32", "3/2", "5/3", "15/8", "2/1"] },
          { label: "Lydien L7", ratios: ["1/1", "9/8", "5/4", "10/7", "3/2", "5/3", "15/8", "2/1"] },
          { label: "Lydien L11", ratios: ["1/1", "9/8", "5/4", "11/8", "3/2", "5/3", "15/8", "2/1"] },
        ],
      },
      {
        label: "Ionien",
        presets: [
          { label: "Ionien L5", ratios: ["1/1", "9/8", "5/4", "4/3", "3/2", "5/3", "15/8", "2/1"] },
        ],
      },
      {
        label: "Mixolydien",
        presets: [
          { label: "Mixolydien L7", ratios: ["1/1", "9/8", "5/4", "4/3", "3/2", "5/3", "7/4", "2/1"] },
        ],
      },
      {
        label: "Dorien",
        presets: [
          { label: "Dorien L7sm", ratios: ["1/1", "9/8", "7/6", "4/3", "3/2", "5/3", "7/4", "2/1"] },
          { label: "Dorien L7m", ratios: ["1/1", "9/8", "6/5", "4/3", "3/2", "12/7", "9/5", "2/1"] },
        ],
      },
      {
        label: "Éolien",
        presets: [
          { label: "Éolien L5", ratios: ["1/1", "9/8", "6/5", "4/3", "3/2", "8/5", "9/5", "2/1"] },
          { label: "Éolien L7", ratios: ["1/1", "9/8", "7/6", "4/3", "3/2", "14/9", "7/4", "2/1"] },
          { label: "Éolien L11", ratios: ["1/1", "11/10", "6/5", "4/3", "3/2", "8/5", "9/5", "2/1"] },
          { label: "Éolien L13", ratios: ["1/1", "9/8", "7/6", "4/3", "3/2", "13/8", "7/4", "2/1"] },
        ],
      },
      {
        label: "Phrygien",
        presets: [
          { label: "Phrygien L7m", ratios: ["1/1", "21/20", "6/5", "4/3", "3/2", "8/5", "9/5", "2/1"] },
          { label: "Phrygien L7sm", ratios: ["1/1", "21/20", "7/6", "4/3", "3/2", "14/9", "7/4", "2/1"] },
          { label: "Phrygien L13", ratios: ["1/1", "21/20", "7/6", "4/3", "3/2", "13/8", "7/4", "2/1"] },
        ],
      },
    ],
  },
  {
    label: "Mineure mélodique",
    families: [
      {
        label: "Lydien #5",
        presets: [
          { label: "Lydien #5 L5", ratios: ["1/1", "9/8", "5/4", "45/32", "25/16", "5/3", "15/8", "2/1"] },
        ],
      },
      {
        label: "Lydien b7",
        presets: [
          { label: "Lydien b7 L7", ratios: ["1/1", "9/8", "5/4", "45/32", "3/2", "5/3", "7/4", "2/1"] },
          { label: "Lydien b7 L11", ratios: ["1/1", "9/8", "5/4", "11/8", "3/2", "5/3", "7/4", "2/1"] },
        ],
      },
      {
        label: "Mineur mélodique",
        presets: [
          { label: "Mineur mélodique L5", ratios: ["1/1", "9/8", "6/5", "4/3", "3/2", "5/3", "15/8", "2/1"] },
          { label: "Mineur mélodique L7", ratios: ["1/1", "9/8", "7/6", "4/3", "3/2", "5/3", "15/8", "2/1"] },
        ],
      },
      {
        label: "Mixolydien b6",
        presets: [
          { label: "Mixolydien b6 L5", ratios: ["1/1", "9/8", "5/4", "4/3", "3/2", "8/5", "9/5", "2/1"] },
          { label: "Mixolydien b6 L7", ratios: ["1/1", "9/8", "5/4", "4/3", "3/2", "14/9", "7/4", "2/1"] },
          { label: "Mixolydien b6 L13", ratios: ["1/1", "9/8", "5/4", "4/3", "3/2", "13/8", "7/4", "2/1"] },
        ],
      },
      {
        label: "Dorien b2",
        presets: [
          { label: "Dorien b2 L7", ratios: ["1/1", "21/20", "7/6", "4/3", "3/2", "5/3", "7/4", "2/1"] },
        ],
      },
    ],
  },
  {
    label: "Mineure harmonique",
    families: [
      {
        label: "Ionien #5",
        presets: [
          { label: "Ionien #5 L5", ratios: ["1/1", "9/8", "5/4", "4/3", "25/16", "5/3", "15/8", "2/1"] },
        ],
      },
      {
        label: "Dorien #4",
        presets: [
          { label: "Dorien #4 L11", ratios: ["1/1", "9/8", "7/6", "11/8", "3/2", "5/3", "7/4", "2/1"] },
        ],
      },
      {
        label: "Mineur harmonique",
        presets: [
          { label: "Mineur harmonique L5", ratios: ["1/1", "9/8", "6/5", "4/3", "3/2", "8/5", "15/8", "2/1"] },
          { label: "Mineur harmonique L7", ratios: ["1/1", "9/8", "7/6", "4/3", "3/2", "14/9", "15/8", "2/1"] },
          { label: "Mineur harmonique L13", ratios: ["1/1", "9/8", "7/6", "4/3", "3/2", "13/8", "15/8", "2/1"] },
        ],
      },
      {
        label: "Phrygien 3",
        presets: [
          { label: "Phrygien 3 L7", ratios: ["1/1", "21/20", "5/4", "4/3", "3/2", "14/9", "7/4", "2/1"] },
        ],
      },
    ],
  },
  {
    label: "Majeure harmonique",
    families: [
      {
        label: "Lydien b3",
        presets: [
          { label: "Lydien b3 L5", ratios: ["1/1", "9/8", "6/5", "45/32", "3/2", "5/3", "15/8", "2/1"] },
        ],
      },
      {
        label: "Majeure harmonique",
        presets: [
          { label: "Majeure harmonique L5", ratios: ["1/1", "9/8", "5/4", "4/3", "3/2", "8/5", "15/8", "2/1"] },
          { label: "Majeure harmonique L7", ratios: ["1/1", "9/8", "5/4", "4/3", "3/2", "14/9", "15/8", "2/1"] },
          { label: "Majeure harmonique L13", ratios: ["1/1", "9/8", "5/4", "4/3", "3/2", "13/8", "15/8", "2/1"] },
        ],
      },
      {
        label: "Mixolydien b2",
        presets: [
          { label: "Mixolydien b2 L7", ratios: ["1/1", "21/20", "5/4", "4/3", "3/2", "5/3", "7/4", "2/1"] },
        ],
      },
      {
        label: "Phrygien b4",
        presets: [
          { label: "Phrygien b4 L13", ratios: ["1/1", "21/20", "6/5", "13/10", "3/2", "8/5", "9/5", "2/1"] },
        ],
      },
    ],
  },
  {
    label: "Double harmonique majeure",
    families: [
      {
        label: "Mineur harmonique #4",
        presets: [
          { label: "Mineur harmonique #4 L5", ratios: ["1/1", "9/8", "6/5", "45/32", "3/2", "8/5", "15/8", "2/1"] },
          { label: "Mineur harmonique #4 L13", ratios: ["1/1", "9/8", "7/6", "11/8", "3/2", "13/8", "15/8", "2/1"] },
        ],
      },
      {
        label: "Double harmonique majeur",
        presets: [
          { label: "Double harmonique majeur L7", ratios: ["1/1", "21/20", "5/4", "4/3", "3/2", "14/9", "15/8", "2/1"] },
          { label: "Double harmonique majeur L13", ratios: ["1/1", "21/20", "5/4", "4/3", "3/2", "13/8", "15/8", "2/1"] },
        ],
      },
    ],
  },
  {
    label: "Napolitaine mineure",
    families: [
      {
        label: "Éolien #4",
        presets: [
          { label: "Éolien #4 L5", ratios: ["1/1", "9/8", "6/5", "45/32", "3/2", "8/5", "9/5", "2/1"] },
          { label: "Éolien #4 L11", ratios: ["1/1", "9/8", "7/6", "11/8", "3/2", "14/9", "7/4", "2/1"] },
          { label: "Éolien #4 L13", ratios: ["1/1", "9/8", "7/6", "11/8", "3/2", "13/8", "7/4", "2/1"] },
        ],
      },
      {
        label: "Napolitain mineur",
        presets: [
          { label: "Napolitain mineur L7m", ratios: ["1/1", "21/20", "6/5", "4/3", "3/2", "8/5", "15/8", "2/1"] },
          { label: "Napolitain mineur L7sm", ratios: ["1/1", "21/20", "7/6", "4/3", "3/2", "14/9", "15/8", "2/1"] },
        ],
      },
    ],
  },
  {
    label: "Napolitaine majeure",
    families: [
      {
        label: "Lydien dom. b6",
        presets: [
          { label: "Lydien dom. b6 L5", ratios: ["1/1", "9/8", "5/4", "45/32", "3/2", "8/5", "9/5", "2/1"] },
          { label: "Lydien dom. b6 L11", ratios: ["1/1", "9/8", "5/4", "11/8", "3/2", "14/9", "7/4", "2/1"] },
          { label: "Lydien dom. b6 L13", ratios: ["1/1", "9/8", "5/4", "11/8", "3/2", "13/8", "7/4", "2/1"] },
        ],
      },
      {
        label: "Napolitain majeur",
        presets: [
          { label: "Napolitain majeur L7sm", ratios: ["1/1", "21/20", "7/6", "4/3", "3/2", "5/3", "15/8", "2/1"] },
          { label: "Napolitain majeur L7m", ratios: ["1/1", "21/20", "6/5", "4/3", "3/2", "5/3", "15/8", "2/1"] },
        ],
      },
    ],
  },
];
const MODE_GROUP_DEFAULT_FAMILIES = new Map([
  ["Majeure", "Ionien"],
  ["Mineure mélodique", "Mineur mélodique"],
  ["Mineure harmonique", "Mineur harmonique"],
  ["Majeure harmonique", "Majeure harmonique"],
  ["Double harmonique majeure", "Double harmonique majeur"],
  ["Napolitaine mineure", "Napolitain mineur"],
  ["Napolitaine majeure", "Napolitain majeur"],
]);
const DEFAULT_MODE_VARIANT_LABELS = new Set(["Napolitain mineur L7m"]);

const MODE_PRESETS = MODE_GROUPS.flatMap((group, groupIndex) =>
  group.families.flatMap((family, familyIndex) =>
    family.presets.map((preset, presetIndex) => ({
      ...preset,
      id: `${groupIndex}-${familyIndex}-${presetIndex}`,
      group: group.label,
      family: family.label,
    })),
  ),
);

// Seules les hauteurs relatives réellement utilisées par les modes créent le bassin.
// Les intervalles propres aux tétracordes restent dans le catalogue théorique,
// mais ne sont pas des fonctions configurables.
const MODAL_FUNCTION_RATIOS = [...new Set(MODE_PRESETS.flatMap((mode) => mode.ratios.slice(1, 7)))].sort(
  (first, second) => ratioCents(first) - ratioCents(second),
);
const FIXED_MODAL_FUNCTION_RATIOS = ["9/8", "4/3", "3/2"];
const OPTIONAL_MODAL_FUNCTION_RATIOS = MODAL_FUNCTION_RATIOS.filter(
  (ratio) => !FIXED_MODAL_FUNCTION_RATIOS.includes(ratio),
);

const altoCelloModes = MODE_PRESETS.filter((mode) => ALTO_CELLO_MODE_LABELS.includes(mode.label));
if (altoCelloModes.length !== ALTO_CELLO_MODE_LABELS.length) {
  throw new Error("Le catalogue Alto-vcelle ne retrouve pas ses trois modes.");
}
ALTO_CELLO_NETWORK_CONFIGURATION.excludedModeIds = MODE_PRESETS
  .filter((mode) => !ALTO_CELLO_MODE_LABELS.includes(mode.label))
  .map((mode) => mode.id);

let modeConnectionApi = null;
let genericModeCatalog = [];
let modeConnectionError = null;

// Le calculateur reste un module indépendant afin que ses règles théoriques
// puissent aussi servir aux vérifications et aux futurs documents de travail.
import("./mode-connections.js")
  .then((api) => {
    modeConnectionApi = api;
    genericModeCatalog = api.buildGenericModeCatalog(MODE_GROUPS);
    render();
    // Les modulations de « Polyvalence du réseau » (Analyse) dépendent de ce calculateur.
    if (typeof syncNetworkAnalysis === "function") syncNetworkAnalysis();
  })
  .catch((error) => {
    modeConnectionError = error;
    console.error("Le calculateur de modulations n’a pas pu être chargé.", error);
    render();
  });

const TONIC_FAMILY_BY_RATIO = new Map();
for (const family of Object.values(FAMILY_DEFINITIONS)) {
  for (const ratio of family.tonics) {
    TONIC_FAMILY_BY_RATIO.set(ratio, family.key);
  }
}
const TONIC_MENU_FAMILY_ORDER = NETWORK_FAMILY_ORDER;

const GRAPH_SYSTEM_STORAGE_KEY = "hn-graph-system";
const SIMON_AXIS_5_LENGTH_STORAGE_KEY = "hn-simon-axis-5-length";
const SIMON_1_AXIS_5_LENGTH_STORAGE_KEY = "hn-simon-1-axis-5-length";
const TARGETED_LABEL_MASK_STORAGE_KEY = "hn-targeted-label-mask";
const OPTIONS_DEFAULT_STORAGE_KEY = "hn-options-default-v1";
const OPTIONS_LATEST_STORAGE_KEY = "hn-options-latest-v1";
let optionsPersistenceReady = false;
let lastPersistedOptions = "";
const SIMON_AXIS_5_NORMAL_LENGTH = 13;
const SIMON_1_AXIS_5_NORMAL_LENGTH = 16;
const SIMON_AXIS_5_MIN_LENGTH = 1;
const SIMON_AXIS_5_MAX_LENGTH = 40;
const MAX_TABLE_FIFTHS = 12;
const FACTORY_OPTIONS = Object.freeze({
  modesSidebarCollapsed: false,
  graphSystem: "simon",
  simonAxis5Length: SIMON_AXIS_5_NORMAL_LENGTH,
  simon1Axis5Length: SIMON_1_AXIS_5_NORMAL_LENGTH,
  graphView: "mode",
  displayMode: "heji",
  showGraphPanel: true,
  showTablePanel: true,
  showTableCents: false,
  tableShowModeName: false,
  tableFifthsAbove: 0,
  tableFifthsBelow: 0,
  tableShowChords: true,
  tableShowRatios: true,
  tableShowTetrachords: true,
  tableShowIntervals: true,
  connectionLevel: 1,
  connectionLevelManual: false,
  textSize: 2,
  textOffset: 2,
  targetedLabelMask: false,
  audioInstrument: "sawtooth",
  audioMouseMode: "poly",
  audioOctave: 0,
  audioVolume: 100,
  audioMuted: false,
  // Brillance et réverbération propres à chaque timbre, réglages du piano lo-fi;
  // null = réglages d'origine (voir factoryAudioSettings dans 03-audio.js).
  audioSettings: null,
});
const GRADY_LATTICE_BASIS = new Map([
  [3n, [1, 0]],
  [5n, [0, -1]],
  [7n, [13 / 40, -11 / 40]],
  [11n, [-14 / 40, -18 / 40]],
  [13n, [-8 / 40, -4 / 40]],
  [17n, [-5 / 40, -32 / 40]],
  [19n, [7 / 40, -25 / 40]],
  [23n, [20 / 40, -6 / 40]],
]);
const SIMON_LATTICE_BASIS = new Map([
  [3n, [1, 0]],
  [5n, [0, -1]],
  [7n, [5 / 13, -5 / 13]],
  [11n, [4 / 13, -1 / 13]],
  [13n, [1 / 13, -4 / 13]],
  [17n, [-5 / 40, -32 / 40]],
  [19n, [7 / 40, -25 / 40]],
  [23n, [20 / 40, -6 / 40]],
]);
const SIMON_1_LATTICE_BASIS = new Map([
  [3n, [1, 0]],
  [5n, [0, -1]],
  [7n, [6 / 16, -5 / 16]],
  [11n, [4 / 16, -1 / 16]],
  [13n, [2 / 16, -3 / 16]],
  [17n, [-5 / 40, -32 / 40]],
  [19n, [7 / 40, -25 / 40]],
  [23n, [20 / 40, -6 / 40]],
]);

function storedGraphSystem() {
  try {
    const stored = window.localStorage.getItem(GRAPH_SYSTEM_STORAGE_KEY);
    return stored === "grady" || stored === "simon1" ? stored : "simon";
  } catch {
    return "simon";
  }
}

function storedSimonAxis5Length() {
  try {
    return parseSimonAxis5Length(window.localStorage.getItem(SIMON_AXIS_5_LENGTH_STORAGE_KEY))
      ?? SIMON_AXIS_5_NORMAL_LENGTH;
  } catch {
    return SIMON_AXIS_5_NORMAL_LENGTH;
  }
}

function storedSimon1Axis5Length() {
  try {
    return parseSimonAxis5Length(window.localStorage.getItem(SIMON_1_AXIS_5_LENGTH_STORAGE_KEY))
      ?? SIMON_1_AXIS_5_NORMAL_LENGTH;
  } catch {
    return SIMON_1_AXIS_5_NORMAL_LENGTH;
  }
}

function activeAxis5Length() {
  return state.graphSystem === "simon1" ? state.simon1Axis5Length : state.simonAxis5Length;
}

function activeAxis5NormalLength() {
  return state.graphSystem === "simon1" ? SIMON_1_AXIS_5_NORMAL_LENGTH : SIMON_AXIS_5_NORMAL_LENGTH;
}

function parseSimonAxis5Length(value) {
  if (value === null || value === "") return null;
  const length = Number(value);
  return Number.isInteger(length)
    && length >= SIMON_AXIS_5_MIN_LENGTH
    && length <= SIMON_AXIS_5_MAX_LENGTH ? length : null;
}

function storedTargetedLabelMask() {
  try {
    return window.localStorage.getItem(TARGETED_LABEL_MASK_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function storedOptionsDefault(storageKey = OPTIONS_DEFAULT_STORAGE_KEY) {
  try {
    const value = window.localStorage.getItem(storageKey);
    const parsed = value ? JSON.parse(value) : null;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

// Same directions as the graph; octave aliases share one lattice position.
const TONIC_NAVIGATION_STEPS = {
  left: { prime: 3n, step: -1, label: "Gauche — dimension 3" },
  right: { prime: 3n, step: 1, label: "Droite — dimension 3" },
  up: { prime: 5n, step: 1, label: "Haut — dimension 5" },
  down: { prime: 5n, step: -1, label: "Bas — dimension 5" },
  "up-right": { prime: 7n, step: 1, label: "Diagonale haut-droite — dimension 7" },
  "down-left": { prime: 7n, step: -1, label: "Diagonale bas-gauche — dimension 7" },
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

const chordData = window.HN_CHORD_DATA;
if (!chordData) throw new Error("Les données d’accords ne sont pas chargées.");
const modeChordApi = window.HN_MODE_CHORDS;
if (!modeChordApi) throw new Error("Le calculateur des accords modaux n’est pas chargé.");
const networkModel = window.HN_NETWORK_MODEL;
if (!networkModel) throw new Error("Le modèle du bassin harmonique n’est pas chargé.");
const modeTetrachordApi = window.HN_MODE_TETRACHORDS;
if (!modeTetrachordApi) throw new Error("Le modèle des tétracordes n’est pas chargé.");
const TETRACHORD_CATALOG = modeTetrachordApi.buildTetrachordCatalog(MODE_PRESETS);
const CHORD_LIMITS = ["L5", "L7", "L11", "L13"];
const CHORDS_WITHOUT_VISIBLE_LIMIT = new Set(["sus2", "sus4"]);
const CHORDS_WITH_LOCKED_TONIC_FUNCTION = new Set(["sus2", "sus4"]);
// Les identifiants historiques demeurent stables dans les données, mais
// l'interface reprend les noms du catalogue principal du Traité.
const CHORD_DISPLAY_NAMES = new Map([
  ["m(maj7)", "mmaj7"],
  ["m(maj9)", "mmaj9"],
]);
function chordDisplayName(chordName) {
  return CHORD_DISPLAY_NAMES.get(chordName) ?? chordName;
}
const CHORD_MODE_MODELS = {
  sus2: ["Ionien L5"], sus4: ["Ionien L5"], M: ["Ionien L5"], m: ["Éolien L5"],
  sm: ["Éolien L7"], mb5: ["Mixolydien L7", "Phrygien L7m"], smb5: ["Phrygien L7sm"],
  "#5": ["Ionien #5 L5"], 6: ["Ionien L5"], add9: ["Ionien L5"], add11: ["Ionien L5"],
  "add#11": ["Lydien L5", "Lydien L7", "Lydien L11"],
  "6add#11": ["Lydien L7"], addb6: ["Majeure harmonique L13"],
  "Fr+6": ["Lydien dom. b6 L5"], "Gr+6": ["Mineur harmonique #4 L5"],
  m6: ["Dorien L7m"], sm6: ["Dorien L7sm"], madd9: ["Éolien L5"], madd11: ["Éolien L5"],
  smadd9: ["Éolien L7"], smadd11: ["Éolien L7"], maddb9: ["Phrygien L7m"],
  smaddb9: ["Phrygien L7sm"], maj7: ["Ionien L5"], maj9: ["Ionien L5"],
  "maj7#11": ["Lydien L5"], "maj9#11": ["Lydien L5"], "maj7#5": ["Ionien #5 L5"],
  "m(maj7)": ["Mineur mélodique L5"], "m(maj9)": ["Mineur mélodique L5"],
  7: ["Mixolydien L7"], 9: ["Mixolydien L7"], "9#11": ["Lydien b7 L11"],
  "7b13": ["Mixolydien b6 L13"], "9b13": ["Mixolydien b6 L13"], m7: ["Éolien L5"],
  m9: ["Éolien L5"], "7no3": ["Mixolydien L7"], "9no3": ["Mixolydien L7"],
  m7b5: ["Mixolydien L7"], m7b9: ["Phrygien L7m"],
};
const MODE_CHARACTERISTIC_CHORDS = {
  "Ionien L5": ["M"],
  "Ionien ♯5 L5": ["maj7#5"],
  "Mixolydien L7": ["9"],
  "Dorien ♭2 L7": ["smaddb9", "sm6"],
};
const INITIAL_PARAMETERS = new URLSearchParams(window.location.search);
const REQUESTED_CATALOG = INITIAL_PARAMETERS.get("vue");
const INITIAL_CATALOG = ["intervalles", "tetracordes", "accords", "modes"].includes(REQUESTED_CATALOG)
  ? REQUESTED_CATALOG
  : "modes";
const REQUESTED_PAGE_TAB = INITIAL_PARAMETERS.get("onglet");
const PAGE_TABS = ["modes", "analysis", "summary", "frettier"];
const INITIAL_PAGE_TAB = PAGE_TABS.includes(REQUESTED_PAGE_TAB) ? REQUESTED_PAGE_TAB : "modes";
const DEFAULT_MODE_ID = "0-1-0";
const ALL_SELECTION_ID = "all";

const state = {
  modesSidebarCollapsed: false,
  audioInstrument: "sawtooth",
  audioMouseMode: "poly",
  audioMuted: false,
  audioOctave: 0,
  audioSettings: null,
  audioVolume: 100,
  audioVolumeBeforeMute: 100,
  catalog: INITIAL_CATALOG,
  connectionLevel: 1,
  connectionLevelManual: false,
  displayMode: "heji",
  showTableCents: false,
  showGraphPanel: true,
  showTablePanel: true,
  tableShowModeName: false,
  tableFifthsAbove: 0,
  tableFifthsBelow: 0,
  tableShowChords: true,
  tableShowRatios: true,
  tableShowTetrachords: true,
  tableShowIntervals: true,
  functionPreview: null,
  functionPreviewAnchor: null,
  graphSystem: storedGraphSystem(),
  simonAxis5Length: storedSimonAxis5Length(),
  simon1Axis5Length: storedSimon1Axis5Length(),
  graphView: "mode",
  functionSelectionKey: "",
  functionSelectionSource: "",
  intervalAnchorTonic: "4/3",
  intervalChordContext: null,
  intervalFunctionPreview: null,
  intervalFunctionPreviewAnchor: null,
  intervalFunctionScrollTop: 0,
  intervalFunctionSelectionKey: "",
  intervalFunctionSelectionSource: "",
  intervalModeContext: null,
  intervalSelection: "",
  tetrachordSelection: "Maj-24L5",
  tetrachordModeContext: null,
  tetrachordFunctionPreview: null,
  modeOriginContext: null,
  modulationAnchor: null,
  modulationPreview: null,
  selectedTonic: "4/3",
  selectedFamily: TONIC_FAMILY_BY_RATIO.get("4/3"),
  selectedChordName: "",
  selectedModeId: INITIAL_CATALOG === "modes" ? DEFAULT_MODE_ID : "",
  selectedVariantIndex: 0,
  targetedLabelMask: storedTargetedLabelMask(),
  textOffset: 2,
  textSize: 2,
};

const frettierUiState = {
  fretboardType: "tfe",
  fretPlanId: null,
  displayMode: "heji",
  discordanceDisplay: "red",
  showFlexibleOnly: false,
  minimumFretWidthDraft: "12",
  canUndo: false,
  canRedo: false,
  frets: [],
  savedSnapshot: null,
  snapshotContextId: null,
};
let pendingPersonalTfeActiveId = "";

function initialNetworkAnalysisUiState(networkId = appliedNetworkConfiguration.id, networkIdentity = "") {
  return {
    networkId,
    networkIdentity,
    tonic: "all",
    catalog: "modes",
    selection: ALL_SELECTION_ID,
    matrixView: "steps",
    matrixStepsAvailable: null,
    discordanceDisplay: "red",
    active: "ratios",
    ratioFilterMode: "all",
    custom: Array.from({ length: 3 }, () => ({ value: "", mark: "neutral" })),
  };
}

const networkAnalysisUiState = initialNetworkAnalysisUiState();
let pendingNetworkAnalysisStateNetworkId = "";
let pendingNetworkAnalysisStateIdentity = "";
let networkAnalysisStateCanRestoreModes = true;

function resetNetworkAnalysisUiState(
  networkId,
  { awaitInitialState = true, networkIdentity = networkAnalysisIdentity(networkAnalysisData()) } = {},
) {
  Object.assign(networkAnalysisUiState, initialNetworkAnalysisUiState(networkId, networkIdentity));
  pendingNetworkAnalysisStateNetworkId = awaitInitialState ? networkId : "";
  pendingNetworkAnalysisStateIdentity = awaitInitialState ? networkIdentity : "";
  networkAnalysisStateCanRestoreModes = false;
  renderAnalysisControls();
}

function isInitialNetworkAnalysisStateMessage(data) {
  return data?.tonic === "all"
    && data.catalog === "modes"
    && data.selection === ALL_SELECTION_ID
    && data.matrixView === "steps"
    && data.active === "ratios"
    && data.ratioFilterMode === "all"
    && Array.isArray(data.custom)
    && data.custom.every((entry) => !entry?.value && (!entry?.mark || entry.mark === "neutral"));
}

const summaryUiState = {
  excludedTonicKeysByNetwork: new Map(),
  disabledOutlineIds: new Set(),
  outlineExpansion: new Map(),
  contentTree: [],
  tonicRatios: [],
};

const FRETTIER_SCALE_LENGTH_MM = 650;
const FRETTIER_MINIMUM_WIDTH_PRESETS = new Map([
  // Show the exact positions that produce the indicated physical width,
  // rather than another pair with merely the same interval proportion.
  ["20:21", ["40/21", "2/1"]],
  ["27:28", ["27/14", "2/1"]],
  ["32:33", ["64/33", "2/1"]],
  ["64:65", ["16/15", "13/12"]],
  ["39:40", ["39/20", "2/1"]],
  ["44:45", ["88/45", "2/1"]],
  ["54:55", ["108/55", "2/1"]],
]);

function frettierMinimumWidthPreset(proportion) {
  const [lower, upper] = String(proportion).split(":").map(Number);
  if (!Number.isInteger(lower) || upper !== lower + 1) return null;
  const fretRatios = FRETTIER_MINIMUM_WIDTH_PRESETS.get(proportion);
  if (!fretRatios) return null;
  const [first, second] = fretRatios.map((ratio) => parseFraction(ratio));
  if (!first || !second) return null;
  const firstStringLength = Number(first.denominator) / Number(first.numerator);
  const secondStringLength = Number(second.denominator) / Number(second.numerator);
  const physicalWidth = FRETTIER_SCALE_LENGTH_MM * (firstStringLength - secondStringLength);
  if (!(physicalWidth > 0)) return null;
  return {
    fretRatios,
    value: Math.floor(physicalWidth * 4 + Number.EPSILON) / 4,
  };
}

const navigationHistory = {
  entries: [],
  index: -1,
  restoring: false,
};

const elements = {
  audioInstrument: document.querySelector("#audio-instrument"),
  audioMouseModeButtons: [...document.querySelectorAll("[data-audio-mouse-mode]")],
  audioBrightness: document.querySelector("#audio-brightness"),
  audioBrightnessValue: document.querySelector("#audio-brightness-value"),
  audioHiss: document.querySelector("#audio-hiss"),
  audioHissValue: document.querySelector("#audio-hiss-value"),
  audioLofiSettings: document.querySelector("#audio-lofi-settings"),
  audioReverb: document.querySelector("#audio-reverb"),
  audioReverbValue: document.querySelector("#audio-reverb-value"),
  audioSettingsMenu: document.querySelector(".audio-settings-menu"),
  audioSettingsReset: document.querySelector("#audio-settings-reset"),
  audioSettingsTimbre: document.querySelector("#audio-settings-timbre"),
  audioWear: document.querySelector("#audio-wear"),
  audioWearValue: document.querySelector("#audio-wear-value"),
  audioWow: document.querySelector("#audio-wow"),
  audioSweep: document.querySelector("#audio-sweep"),
  audioSweepValue: document.querySelector("#audio-sweep-value"),
  audioTanpuraSettings: document.querySelector("#audio-tanpura-settings"),
  audioWowValue: document.querySelector("#audio-wow-value"),
  audioStop: document.querySelector("#audio-stop"),
  tableTonicMarker: document.querySelector("#table-tonic-marker"),
  audioOctaveButtons: [...document.querySelectorAll("[data-audio-octave-step]")],
  audioOctaveValue: document.querySelector("#sound-octave-value"),
  audioVolume: document.querySelector("#sound-volume"),
  confirmModulation: document.querySelector("#confirm-modulation"),
  cancelModulation: document.querySelector("#cancel-modulation"),
  connectionButtons: [...document.querySelectorAll("[data-connection-level]")],
  displaySelect: document.querySelector("#display-select"),
  activeNetworkButton: document.querySelector("#active-network-button"),
  activeNetworkLabel: document.querySelector("#active-network-label"),
  activeNetworkMenu: document.querySelector("#active-network-menu"),
  activeNetworkSelect: document.querySelector("#active-network-select"),
  graphViewButtons: [...document.querySelectorAll("[data-graph-view]")],
  graphViewSwitch: document.querySelector(".graph-view-switch"),
  graphViewSelect: document.querySelector("#graph-view-select"),
  graphDisplaySelect: document.querySelector("#graph-display-select"),
  graphWorkspace: document.querySelector(".graph-workspace"),
  showGraphPanel: document.querySelector("#show-graph-panel"),
  showTablePanel: document.querySelector("#show-table-panel"),
  modesWindowEmpty: document.querySelector("#modes-window-empty"),
  tableShowCents: document.querySelector("#table-show-cents"),
  tableShowModeName: document.querySelector("#table-show-mode-name"),
  tableFifthsControls: document.querySelector("#table-fifths-controls"),
  tableFifthsAboveMinus: document.querySelector("#table-fifths-above-minus"),
  tableFifthsAbovePlus: document.querySelector("#table-fifths-above-plus"),
  tableFifthsAboveCount: document.querySelector("#table-fifths-above-count"),
  tableFifthsBelowMinus: document.querySelector("#table-fifths-below-minus"),
  tableFifthsBelowPlus: document.querySelector("#table-fifths-below-plus"),
  tableFifthsBelowCount: document.querySelector("#table-fifths-below-count"),
  tableShowChords: document.querySelector("#table-show-chords"),
  tableShowRatios: document.querySelector("#table-show-ratios"),
  tableShowTetrachords: document.querySelector("#table-show-tetrachords"),
  tableShowIntervals: document.querySelector("#table-show-intervals"),
  historyBack: document.querySelector("#history-back"),
  historyForward: document.querySelector("#history-forward"),
  lines: document.querySelector("#network-lines"),
  modeControl: document.querySelector("#mode-control"),
  modeRotationControl: document.querySelector("#mode-rotation-control"),
  modeRotationDetails: document.querySelector("#mode-rotation-details"),
  modeMenuButton: document.querySelector("#mode-menu-button"),
  modeMenuLabel: document.querySelector("#mode-menu-label"),
  modeMenuPopover: document.querySelector("#mode-menu-popover"),
  modeSelect: document.querySelector("#mode-select"),
  modeVariantSelector: document.querySelector("#mode-variant-selector"),
  modulationControl: document.querySelector("#modulation-control"),
  modulationColumnNavigation: document.querySelector("#modulation-column-navigation"),
  modulationColumnPrevious: document.querySelector("#modulation-column-previous"),
  modulationColumnNext: document.querySelector("#modulation-column-next"),
  modulationColumnPosition: document.querySelector("#modulation-column-position"),
  modulationExpandButton: document.querySelector("#modulation-expand-button"),
  modulationList: document.querySelector("#modulation-list"),
  modulationPanel: document.querySelector("#modulation-panel"),
  networkConfigClose: document.querySelector("#network-config-close"),
  networkConfigDrawer: document.querySelector("#network-config-drawer"),
  networkConfigStatus: document.querySelector("#network-config-status"),
  networkConfigureButton: document.querySelector("#network-configure-button"),
  analysisToolbarSteps: document.querySelector("#analysis-toolbar-steps"),
  analysisToolbarIntervals: document.querySelector("#analysis-toolbar-intervals"),
  analysisToolbarDiscordances: document.querySelector("#analysis-toolbar-discordances"),
  frettierTfeButton: document.querySelector("#frettier-tfe-button"),
  frettierTfpButton: document.querySelector("#frettier-tfp-button"),
  frettierDiscordanceButton: document.querySelector("#frettier-discordance-button"),
  frettierMinimumWidth: document.querySelector("#frettier-minimum-width"),
  frettierMinimumWidthPresets: document.querySelector("#frettier-minimum-width-presets"),
  frettierFlexibilityButton: document.querySelector("#frettier-flexibility-button"),
  frettierOptionsButton: document.querySelector("#frettier-options-button"),
  frettierOptionsPopover: document.querySelector("#frettier-options-popover"),
  frettierSaveButton: document.querySelector("#frettier-save-button"),
  frettierSaveStatus: document.querySelector("#frettier-save-status"),
  frettierResetButton: document.querySelector("#frettier-reset"),
  frettierUndoButton: document.querySelector("#frettier-undo"),
  frettierRedoButton: document.querySelector("#frettier-redo"),
  networkMethodConfigure: document.querySelector("#network-method-configure"),
  networkMethodScala: document.querySelector("#network-method-scala"),
  networkMethodSwitch: document.querySelector(".network-method-switch"),
  networkLockedMethodLabel: document.querySelector("#network-locked-method-label"),
  networkPreviewGraph: document.querySelector("#network-preview-graph"),
  networkPreviewStatus: document.querySelector("#network-preview-status"),
  networkConfigUndo: document.querySelector("#network-config-undo"),
  networkConfigRedo: document.querySelector("#network-config-redo"),
  networkConfigReset: document.querySelector("#network-config-reset"),
  networkConfigurePanel: document.querySelector("#network-configure-panel"),
  networkScalaPanel: document.querySelector("#network-scala-panel"),
  networkScalaInput: document.querySelector("#network-scala-input"),
  networkScalaApply: document.querySelector("#network-scala-apply"),
  networkScalaStatus: document.querySelector("#network-scala-status"),
  networkDirtyIndicator: document.querySelector("#network-dirty-indicator"),
  networkDeleteButton: document.querySelector("#network-delete-button"),
  networkDuplicateButton: document.querySelector("#network-duplicate-button"),
  networkRenameButton: document.querySelector("#network-rename-button"),
  networkUnsavedDialog: document.querySelector("#network-unsaved-dialog"),
  networkUnsavedContinue: document.querySelector("#network-unsaved-continue"),
  networkUnsavedDiscard: document.querySelector("#network-unsaved-discard"),
  networkUnsavedSave: document.querySelector("#network-unsaved-save"),
  networkUpdateDialog: document.querySelector("#network-update-dialog"),
  networkUpdateTitle: document.querySelector("#network-update-title"),
  networkUpdateCancel: document.querySelector("#network-update-cancel"),
  networkUpdateRename: document.querySelector("#network-update-rename"),
  networkUpdateConfirm: document.querySelector("#network-update-confirm"),
  networkDiapasonInput: document.querySelector("#network-diapason-input"),
  networkFamilyBulk: document.querySelector("#network-family-bulk"),
  networkFamilyConfig: document.querySelector("#network-family-config"),
  networkFunctionBulk: document.querySelector("#network-function-bulk"),
  networkFunctionConfig: document.querySelector("#network-function-config"),
  networkModeBulk: document.querySelector("#network-mode-bulk"),
  networkModeConfig: document.querySelector("#network-mode-config"),
  networkCopyDataButton: document.querySelector("#network-copy-data-button"),
  networkCopyDataStatus: document.querySelector("#network-copy-data-status"),
  networkGeneratorNote: document.querySelector("#network-generator-note"),
  networkGeneratorNoteMenu: document.querySelector("#network-generator-note-menu"),
  networkNameInput: document.querySelector("#network-name-input"),
  networkNewButton: document.querySelector("#network-new-button"),
  networkPresetSelect: document.querySelector("#network-preset-select"),
  networkPresetPicker: document.querySelector("#network-preset-picker"),
  networkPresetButton: document.querySelector("#network-preset-button"),
  networkPresetMenu: document.querySelector("#network-preset-menu"),
  networkPresetButtonLabel: document.querySelector(".network-preset-button-label"),
  networkSaveButton: document.querySelector("#network-save-button"),
  nodes: document.querySelector("#network-nodes"),
  pageRefresh: document.querySelector("#page-refresh"),
  primarySelection: document.querySelector("#primary-selection"),
  modesSidebarToggle: document.querySelector("#modes-sidebar-toggle"),
  modesLayout: document.querySelector("#modes-page-panel .network-layout"),
  scroll: document.querySelector("#network-scroll"),
  selectionGraphPanel: document.querySelector("#selection-graph-panel"),
  selectionSummary: document.querySelector("#selection-summary"),
  selectionNavigationButtons: [...document.querySelectorAll("[data-selection-step]")],
  soundHoverHint: document.querySelector("#sound-hover-hint"),
  soundLoadStatus: document.querySelector("#sound-load-status"),
  soundControls: document.querySelector("#sound-controls"),
  soundMuteButton: document.querySelector("#sound-mute-button"),
  summaryDocument: document.querySelector("#summary-document"),
  summaryDownloadButton: document.querySelector("#summary-download-button"),
  summaryDownloadPopover: document.querySelector("#summary-download-popover"),
  summaryDownloadStatus: document.querySelector("#summary-download-status"),
  summaryDownloadWord: document.querySelector("#summary-download-word"),
  summaryOptionsButton: document.querySelector("#summary-options-button"),
  summaryOptionsPopover: document.querySelector("#summary-options-popover"),
  summaryOptionsReset: document.querySelector("#summary-options-reset"),
  summaryOptionsTree: document.querySelector("#summary-options-tree"),
  summaryOpeningOptions: document.querySelector("#summary-opening-options"),
  summaryPanel: document.querySelector("#network-summary-panel"),
  summaryTocLinks: document.querySelector("#summary-toc-links"),
  summaryTonicsAll: document.querySelector("#summary-tonics-all"),
  summaryTonicsList: document.querySelector("#summary-tonics-list"),
  summaryTonicsNone: document.querySelector("#summary-tonics-none"),
  tonicMiniMap: document.querySelector("#tonic-mini-map"),
  tonicNetworkGraphPanel: document.querySelector("#tonic-network-graph-panel"),
  appTitle: document.querySelector("#app-title"),
  graphSystem: document.querySelector("#graph-system"),
  simonAxis5LengthOption: document.querySelector(".axis-length-option"),
  simonAxis5LengthButtons: [...document.querySelectorAll("[data-simon-axis-5-length]")],
  graphCoordinateOutputs: new Map([3, 5, 7, 11, 13].map((prime) => [
    prime, document.querySelector(`#graph-coordinate-${prime}`),
  ])),
  optionsButton: document.querySelector("#options-button"),
  optionsPopover: document.querySelector("#options-popover"),
  optionsSaveDefault: document.querySelector("#options-save-default"),
  optionsRestoreFactory: document.querySelector("#options-restore-factory"),
  optionsDefaultStatus: document.querySelector("#options-default-status"),
  targetedLabelMask: document.querySelector("#targeted-label-mask"),
  stage: document.querySelector("#network-stage"),
  status: document.querySelector("#network-status"),
  tableContent: document.querySelector("#mode-table-content"),
  tableScroll: document.querySelector("#mode-table-scroll"),
  tableSection: document.querySelector("#mode-table-section"),
  tableTitle: document.querySelector("#mode-table-title"),
  tableHeading: document.querySelector(".mode-table-heading"),
  textOffset: document.querySelector("#text-offset"),
  textSize: document.querySelector("#text-size"),
  title: document.querySelector("#network-title"),
  tonicInstruction: document.querySelector("#tonic-instruction"),
  tonicMenuPopover: document.querySelector("#tonic-menu-popover"),
  tonicNavigationButtons: [...document.querySelectorAll("[data-tonic-step]")],
};

const AUDIO_REFERENCE_A3_HZ = 220;
let configuredAudioReferenceA3Hz = AUDIO_REFERENCE_A3_HZ;
const AUDIO_VOICE_GAIN = 0.045;
// Timbres offerts, dans l'ordre du menu. Chacun garde ses propres réglages de
// brillance et de réverbération (0 à 100); les valeurs ci-dessous sont les réglages d'origine.
// « level » égalise le volume perçu d'une note seule (mesuré le 21 octobre 2026 : niveau pondéré du corps
// de la note, attaque ou tenue); l'orgue enregistré est mis un peu au-dessus, à la demande de Simon.
const AUDIO_TIMBRES = [
  { id: "piano", label: "Piano", group: "Claviers", brightness: 70, reverb: 28, level: 0.7, banks: ["piano"] },
  { id: "lofi", label: "Piano lo-fi", group: "Claviers", brightness: 11, reverb: 50, level: 0.44, banks: ["feutre"] },
  { id: "strings", label: "Cordes", group: "Cordes", brightness: 65, reverb: 34, level: 0.3, banks: ["violoncelles", "altos"] },
  // Ondes (21 octobre 2026, Simon) : la scie d'origine et la sinusoïde pure.
  { id: "sawtooth", label: "Scie", group: "Ondes", brightness: 75, reverb: 0, level: 1.24 },
  { id: "sine", label: "Sinus", group: "Ondes", brightness: 50, reverb: 0, level: 0.47 },
  { id: "synth-strings", label: "Cordes synthétiques", group: "Synthèse", brightness: 55, reverb: 40, level: 0.27 },
  { id: "pad", label: "Tenue filtrée", group: "Synthèse", brightness: 45, reverb: 45, level: 0.4 },
  // Analogique (20 octobre 2026) : à la manière d'un Minimoog, sans désaccord (aucune banque libre de qualité).
  { id: "analog", label: "Analogique", group: "Synthèse", brightness: 55, reverb: 18, level: 0.46 },
  { id: "glass", label: "Cloche harmonique", group: "Synthèse", brightness: 55, reverb: 42, level: 0.5 },
  // Sons ajoutés le 20 octobre 2026 (demande de Simon du 16 octobre) : anche tenue, à la manière de la
  // Shrutibox, et orgue à tuyaux purs dans l'esprit d'Ellen Arkbro. Calculés en direct, partiels harmoniques
  // exacts : aucun désaccord, aucun vibrato de hauteur.
  { id: "harmonium", label: "Harmonium", group: "Anches et tuyaux", brightness: 50, reverb: 30, level: 0.8 },
  { id: "organ", label: "Orgue à tuyaux", group: "Anches et tuyaux", brightness: 40, reverb: 60, level: 0.61 },
  // Orgue Renaissance enregistré (VCSL, Simon Dalzell, CC0) : jeux de 8' et de 4'; la brillance dose le 4'.
  { id: "organ-sampled", label: "Orgue enregistré", group: "Anches et tuyaux", brightness: 35, reverb: 25, level: 2, banks: ["orgue-8", "orgue-4"] },
  // Tanpura (21 octobre 2026, demande de Simon) : corde à chevalet jawari tenue en continu, à la manière de
  // Tanpura Droid; calculée en direct, partiels harmoniques exacts. Groupe « Bourdon ».
  { id: "tanpura", label: "Tanpura", group: "Bourdon", brightness: 60, reverb: 32, level: 1.03 },
];
const AUDIO_TIMBRE_BY_ID = new Map(AUDIO_TIMBRES.map((timbre) => [timbre.id, timbre]));
const AUDIO_INSTRUMENT_IDS = new Set(AUDIO_TIMBRES.map((timbre) => timbre.id));
// Timbres retirés le 15 octobre 2026 : un réglage ou un lien ancien ouvre le plus proche.
const AUDIO_LEGACY_INSTRUMENTS = {
  "lofi-keys": "lofi",
  "crystal-keys": "piano",
  "velvet-keys": "piano",
  "bowed-strings": "strings",
  // Retirés le 21 octobre 2026 (Simon : trop pauvres) : guitare, corde pincée, cordes métalliques.
  oud: "piano",
  baglama: "piano",
  guitar: "piano",
  harp: "piano",
  strumstick: "piano",
};
const AUDIO_LOFI_DEFAULTS = { wear: 60, hiss: 0, wow: 8 };
// Balayage du jawari de la tanpura (0 à 100) : amplitude du mouvement du bourdonnement dans le spectre.
const AUDIO_TANPURA_DEFAULTS = { sweep: 40 };
const AUDIO_WOW_MAX_CENTS = 25;
const STRING_LOOP_CROSSFADE_SECONDS = 0.4;
const AUDIO_KEYBOARD_ROWS = [
  ["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"],
  ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon"],
  ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP"],
];
const AUDIO_KEYBOARD_MAP = new Map(
  AUDIO_KEYBOARD_ROWS.flatMap((codes, row) =>
    codes.map((code, index) => [code, { index, row }]),
  ),
);
const audioEngine = {
  bankPromises: new Map(),
  banks: new Map(),
  compressor: null,
  context: null,
  dry: null,
  generation: 0,
  hiss: null,
  keyboardVoices: new Map(),
  frettierScale: [],
  latchedPending: new Map(),
  mouseRequestSequence: 0,
  latchedVoices: new Map(),
  master: null,
  output: null,
  voiceSequence: 0,
  pressedKeyboardCodes: new Set(),
  resumePromise: null,
  reverb: null,
  wet: null,
};

function normalizedAudioInstrument(value) {
  const id = AUDIO_LEGACY_INSTRUMENTS[value] ?? value;
  return AUDIO_INSTRUMENT_IDS.has(id) ? id : null;
}

function factoryAudioSettings() {
  return {
    timbres: Object.fromEntries(AUDIO_TIMBRES.map((timbre) => [
      timbre.id,
      { brightness: timbre.brightness, reverb: timbre.reverb },
    ])),
    ...AUDIO_LOFI_DEFAULTS,
    ...AUDIO_TANPURA_DEFAULTS,
  };
}

function normalizedAudioSettings(source) {
  const factory = factoryAudioSettings();
  const value = source && typeof source === "object" ? source : {};
  const percent = (candidate, fallback, max = 100) => (
    Number.isFinite(candidate) ? Math.round(Math.min(max, Math.max(0, candidate))) : fallback
  );
  const timbres = {};
  for (const timbre of AUDIO_TIMBRES) {
    const saved = value.timbres?.[timbre.id] ?? {};
    timbres[timbre.id] = {
      brightness: percent(saved.brightness, factory.timbres[timbre.id].brightness),
      reverb: percent(saved.reverb, factory.timbres[timbre.id].reverb),
    };
  }
  return {
    timbres,
    wear: percent(value.wear, factory.wear),
    hiss: percent(value.hiss, factory.hiss),
    wow: percent(value.wow, factory.wow, AUDIO_WOW_MAX_CENTS),
    sweep: percent(value.sweep, factory.sweep),
  };
}

function currentTimbreSettings() {
  return state.audioSettings?.timbres?.[state.audioInstrument]
    ?? factoryAudioSettings().timbres[state.audioInstrument]
    ?? { brightness: 60, reverb: 30 };
}

function tanpuraSweep() {
  return (state.audioSettings?.sweep ?? AUDIO_TANPURA_DEFAULTS.sweep) / 100;
}

function audioBrightness() {
  return currentTimbreSettings().brightness / 100;
}

const modulationColumnWindow = {
  expanded: false,
  returnFocus: null,
  signature: "",
  start: 0,
  visible: 1,
};

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
  const tonic = state.selectedTonic ?? "1/1";
  let ratio = normalizedAudioRatio(tonic);
  if (!ratio) return null;
  // Le registre G3–F♯4 choisit seulement la hauteur de départ de la tonique.
  // Les degrés suivants restent ensuite ascendants à l'intérieur de leur octave modale.
  if (audioPitchClass(tonic) >= 10) ratio /= 2;
  return configuredAudioReferenceA3Hz * ratio;
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


// ---------- Chaîne de sortie ----------
// voix → master → (direct + réverbération de pièce) → compresseur → volume → haut-parleurs.

// Réverbération de pièce : bruit stéréo décorrélé, de plus en plus sombre, précédé de réflexions.
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

function audioOutputLevel() {
  if (state.audioMuted) return 0;
  const normalized = Math.min(1, Math.max(0, Number(state.audioVolume) / 100));
  return normalized ** 2;
}

function updateAudioOutputGain({ immediate = false } = {}) {
  if (!audioEngine.context || !audioEngine.output) return;
  const now = audioEngine.context.currentTime;
  const level = audioOutputLevel();
  audioEngine.output.gain.cancelScheduledValues(now);
  if (immediate) audioEngine.output.gain.setValueAtTime(level, now);
  else audioEngine.output.gain.setTargetAtTime(level, now, 0.012);
}

function soundingVoices() {
  return [...audioEngine.latchedVoices.values(), ...audioEngine.keyboardVoices.values()];
}

// Réverbération, souffle du lo-fi et brillance des notes tenues suivent les réglages en direct.
function applyAudioSettings({ immediate = false } = {}) {
  if (!audioEngine.context) return;
  const now = audioEngine.context.currentTime;
  const wet = currentTimbreSettings().reverb / 100;
  const set = (param, value) => {
    if (immediate) param.setValueAtTime(value, now);
    else param.setTargetAtTime(value, now, 0.05);
  };
  set(audioEngine.wet.gain, wet * 0.9);
  set(audioEngine.dry.gain, 1 - wet * 0.45);
  updateAudioHiss();
  const brightness = audioBrightness();
  soundingVoices().forEach((voice) => voice.setBrightness?.(brightness));
}

async function ensureAudioContext({ resume = true } = {}) {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return null;
  if (!audioEngine.context) {
    const context = new AudioContextConstructor({ latencyHint: "interactive" });
    const master = context.createGain();
    const dry = context.createGain();
    const wet = context.createGain();
    const reverb = context.createConvolver();
    const compressor = context.createDynamicsCompressor();
    const output = context.createGain();
    const limiter = context.createDynamicsCompressor();
    const makeup = context.createGain();
    // 21 octobre 2026 : niveau général relevé de 11 dB après le compresseur (Simon devait pousser son
    // volume au maximum); un limiteur final empêche la saturation quand plusieurs notes sonnent ensemble.
    master.gain.value = 0.56;
    makeup.gain.value = 3.55;
    output.gain.value = audioOutputLevel();
    limiter.threshold.value = -3;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.002;
    limiter.release.value = 0.12;
    compressor.threshold.value = -12;
    compressor.knee.value = 16;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.012;
    compressor.release.value = 0.22;
    reverb.buffer = createRoomImpulse(context);
    master.connect(dry);
    master.connect(reverb);
    reverb.connect(wet);
    dry.connect(compressor);
    wet.connect(compressor);
    compressor.connect(makeup);
    makeup.connect(output);
    output.connect(limiter);
    limiter.connect(context.destination);
    Object.assign(audioEngine, { compressor, context, dry, limiter, makeup, master, output, reverb, wet });
    applyAudioSettings({ immediate: true });
  }
  if (resume && audioEngine.context.state === "suspended") {
    if (!audioEngine.resumePromise) {
      audioEngine.resumePromise = audioEngine.context.resume().finally(() => {
        audioEngine.resumePromise = null;
      });
    }
    await audioEngine.resumePromise;
  }
  return audioEngine.context;
}

function setSoundLoadStatus(message = "", status = "") {
  if (!elements.soundLoadStatus) return;
  elements.soundLoadStatus.textContent = message;
  if (status) elements.soundLoadStatus.dataset.state = status;
  else delete elements.soundLoadStatus.dataset.state;
  elements.soundControls.setAttribute("aria-busy", String(status === "loading"));
}

// Souffle et craquements de cassette : seulement pour le piano lo-fi, et seulement
// pendant qu'une note sonne.
function updateAudioHiss() {
  const context = audioEngine.context;
  if (!context) return;
  const level = state.audioInstrument === "lofi" && soundingVoices().length
    ? ((state.audioSettings?.hiss ?? 0) / 100) ** 2 * 0.06
    : 0;
  if (!audioEngine.hiss && level <= 0) return;
  if (!audioEngine.hiss) {
    const sampleRate = context.sampleRate;
    const length = sampleRate * 4;
    const buffer = context.createBuffer(2, length, sampleRate);
    for (let channel = 0; channel < 2; channel += 1) {
      const data = buffer.getChannelData(channel);
      let seed = 12345 + channel * 777;
      let b0 = 0;
      let b1 = 0;
      let b2 = 0;
      for (let index = 0; index < length; index += 1) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const white = (seed / 2 ** 32) * 2 - 1;
        b0 = 0.997 * b0 + white * 0.029;
        b1 = 0.985 * b1 + white * 0.032;
        b2 = 0.95 * b2 + white * 0.048;
        data[index] = (b0 + b1 + b2) * 0.5;
        if ((seed & 0xffff) < 3) data[index] += (white > 0 ? 1 : -1) * (0.3 + (seed >>> 28) / 20);
      }
    }
    const source = context.createBufferSource();
    const band = context.createBiquadFilter();
    const gain = context.createGain();
    source.buffer = buffer;
    source.loop = true;
    band.type = "bandpass";
    band.frequency.value = 2400;
    band.Q.value = 0.4;
    gain.gain.value = 0;
    source.connect(band);
    band.connect(gain);
    gain.connect(audioEngine.dry);
    source.start();
    audioEngine.hiss = { gain };
  }
  audioEngine.hiss.gain.gain.setTargetAtTime(level, context.currentTime, 0.12);
}

// ---------- Échantillons ----------

// Boucle de tenue sans couture : les 0,4 s qui précèdent la fin de boucle sont fondues
// avec les 0,4 s qui précèdent son début. Au point de retour, le son enchaîne donc
// exactement sur ce qu'il jouait déjà, et la boucle native du navigateur suffit.
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

// Catalogue des échantillons : pour chaque enregistrement, sa hauteur réelle mesurée
// (un piano est accordé « étiré », jusqu'à 24 cents de l'idéal) et, pour les cordes,
// sa boucle de tenue. Le moteur se règle sur la hauteur mesurée, jamais sur le nom de la note.
let audioSampleCatalogPromise = null;
// Version du catalogue : un navigateur qui garde l'ancien en cache recharge le nouveau (orgue, 20 octobre 2026).
const AUDIO_CATALOG_VERSION = 5;

async function audioBankZones(bankId) {
  audioSampleCatalogPromise ??= fetch(new URL(`audio/catalogue.json?v=${AUDIO_CATALOG_VERSION}`, document.baseURI), { cache: "force-cache" })
    .then((response) => {
      if (!response.ok) throw new Error("Catalogue des échantillons absent");
      return response.json();
    })
    .catch((error) => {
      audioSampleCatalogPromise = null;
      throw error;
    });
  return (await audioSampleCatalogPromise)[bankId] ?? [];
}

async function ensureAudioBank(bankId, onProgress) {
  if (audioEngine.banks.has(bankId)) return audioEngine.banks.get(bankId);
  if (!audioEngine.bankPromises.has(bankId)) {
    const loading = (async () => {
      const context = await ensureAudioContext({ resume: false });
      if (!context) throw new Error("Web Audio n’est pas disponible dans ce navigateur.");
      const zones = await audioBankZones(bankId);
      const bank = await Promise.all(zones.map(async (zone) => {
        const response = await fetch(new URL(`audio/${bankId}/${zone.file}`, document.baseURI), { cache: "force-cache" });
        if (!response.ok) throw new Error(`Échantillon absent : ${bankId}/${zone.file}`);
        const decoded = await context.decodeAudioData(await response.arrayBuffer());
        onProgress?.();
        return zone.loopEnd
          ? { ...zone, ...crossfadedLoopBuffer(context, decoded, zone.loopStart, zone.loopEnd) }
          : { ...zone, buffer: decoded };
      }));
      audioEngine.banks.set(bankId, bank);
      return bank;
    })();
    audioEngine.bankPromises.set(bankId, loading);
    loading.catch(() => audioEngine.bankPromises.delete(bankId));
  }
  return audioEngine.bankPromises.get(bankId);
}

// Charge les échantillons d'un timbre (aucun pour les timbres calculés).
async function ensureTimbreSamples(instrumentId) {
  const banks = AUDIO_TIMBRE_BY_ID.get(instrumentId)?.banks ?? [];
  const missing = banks.filter((bankId) => !audioEngine.banks.has(bankId));
  if (!missing.length) return true;
  const zoneCounts = await Promise.all(missing.map(async (bankId) => (await audioBankZones(bankId)).length))
    .catch(() => null);
  const total = zoneCounts ? zoneCounts.reduce((sum, count) => sum + count, 0) : 0;
  let loaded = 0;
  const progress = () => {
    loaded += 1;
    if (state.audioInstrument === instrumentId) setSoundLoadStatus(`Chargement ${loaded}/${total}…`, "loading");
  };
  if (state.audioInstrument === instrumentId) setSoundLoadStatus(`Chargement 0/${total}…`, "loading");
  try {
    await Promise.all(missing.map((bankId) => ensureAudioBank(bankId, progress)));
    if (state.audioInstrument === instrumentId) setSoundLoadStatus("Timbre prêt", "ready");
    return true;
  } catch (error) {
    if (state.audioInstrument === instrumentId) setSoundLoadStatus("Échantillons indisponibles — réessayer", "error");
    console.error(`Impossible de charger le timbre ${instrumentId}.`, error);
    return false;
  }
}

async function preloadStudioInstrument(instrumentId) {
  if (!AUDIO_TIMBRE_BY_ID.get(instrumentId)?.banks) {
    setSoundLoadStatus();
    return;
  }
  await ensureTimbreSamples(instrumentId);
}

function nearestZone(bank, frequency) {
  return bank.reduce((closest, candidate) => (
    Math.abs(Math.log2(candidate.hz / frequency)) < Math.abs(Math.log2(closest.hz / frequency))
      ? candidate
      : closest
  ));
}

// ---------- Construction des voix ----------
// Chaque constructeur renvoie { gain, sources, release, setBrightness? } : « gain » est la
// sortie de la voix, déjà montée à son niveau; les sources démarrent toutes ensemble.

function createPanner(context, value) {
  const panner = context.createStereoPanner();
  panner.pan.value = Math.max(-1, Math.min(1, value));
  return panner;
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
  // La scie d'origine du site, inchangée : brillance 75 = filtre à 7 200 Hz.
  // Sinusoïde pure : la fondamentale seule (la brillance n'a rien à filtrer).
  sine(context, frequency) {
    const gain = context.createGain();
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    return { gain, sources: [oscillator], attack: 0.03, peak: AUDIO_VOICE_GAIN * 2.4, release: 0.1, setBrightness: () => {} };
  },

  sawtooth(context, frequency) {
    const gain = context.createGain();
    const { filter, setBrightness } = liveLowpass(context, (b) => Math.min(18000, 7200 * 2 ** ((b - 0.75) * 6)), 0.7071);
    filter.connect(gain);
    const oscillator = context.createOscillator();
    oscillator.type = "sawtooth";
    oscillator.frequency.value = frequency;
    oscillator.connect(filter);
    return { gain, sources: [oscillator], attack: 0.025, peak: AUDIO_VOICE_GAIN, release: 0.08, setBrightness };
  },

  piano(context, frequency) { return sampledPianoVoice(context, frequency, "piano"); },
  lofi(context, frequency) { return sampledPianoVoice(context, frequency, "feutre"); },

  // Pupitre unique : violoncelles sous Sol 3, altos au-dessus de Sol 4, mêlés entre les deux.
  strings(context, frequency) {
    const gain = context.createGain();
    const sources = [];
    const { filter, setBrightness } = liveLowpass(context, (b) => 2200 + b * 14000);
    filter.connect(gain);
    const blend = Math.min(1, Math.max(0, Math.log2(frequency / 196)));
    for (const [bankId, share, level] of [
      ["violoncelles", Math.cos(blend * Math.PI / 2), 0.38],
      ["altos", Math.sin(blend * Math.PI / 2), 0.46],
    ]) {
      const bank = audioEngine.banks.get(bankId);
      if (share < 0.02 || !bank) continue;
      const zone = nearestZone(bank, frequency);
      const source = context.createBufferSource();
      const sectionGain = context.createGain();
      source.buffer = zone.buffer;
      source.loop = true;
      source.loopStart = zone.loopStart;
      source.loopEnd = zone.loopEnd;
      source.playbackRate.value = frequency / zone.hz; // hauteur exacte d'après la hauteur mesurée
      sectionGain.gain.value = share * level;
      source.connect(sectionGain);
      sectionGain.connect(filter);
      sources.push(source);
    }
    if (!sources.length) return null;
    return { gain, sources, attack: 0.012, peak: 1, release: 0.5, setBrightness };
  },

  "synth-strings"(context, frequency, index) {
    const gain = context.createGain();
    const partials = 28;
    const real = new Float32Array(partials + 1);
    const imaginary = new Float32Array(partials + 1);
    for (let k = 1; k <= partials; k += 1) imaginary[k] = (1 / k) * (k % 2 ? 1 : 0.82) * (1 + 0.3 * Math.sin(k * 1.7));
    const oscillator = context.createOscillator();
    oscillator.setPeriodicWave(context.createPeriodicWave(real, imaginary));
    oscillator.frequency.value = frequency;
    let node = oscillator;
    for (const [center, boost, q] of [[285, 5, 2.2], [530, 3.5, 2], [1150, -3, 1.4], [2600, 3, 1.1]]) {
      const peaking = context.createBiquadFilter();
      peaking.type = "peaking";
      peaking.frequency.value = center;
      peaking.gain.value = boost;
      peaking.Q.value = q;
      node.connect(peaking);
      node = peaking;
    }
    const { filter, setBrightness } = liveLowpass(context, (b) => 2600 + b * 7500);
    node.connect(filter);
    const body = context.createGain();
    filter.connect(body);
    // Souffle de l'archet, puis mouvement d'intensité lent : jamais de mouvement de hauteur.
    const noise = context.createBufferSource();
    noise.buffer = noiseBuffer(context);
    noise.loop = true;
    const band = context.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = Math.min(6500, Math.max(2200, frequency * 9));
    band.Q.value = 0.9;
    const noiseGain = context.createGain();
    noiseGain.gain.value = 0.035 + audioBrightness() * 0.03;
    noise.connect(band);
    band.connect(noiseGain);
    noiseGain.connect(body);
    const lfo = context.createOscillator();
    lfo.frequency.value = 0.21 + 0.037 * (index % 7);
    const lfoDepth = context.createGain();
    lfoDepth.gain.value = 0.07;
    const motion = context.createGain();
    lfo.connect(lfoDepth);
    lfoDepth.connect(motion.gain);
    body.connect(motion);
    motion.connect(gain);
    return { gain, sources: [oscillator, noise, lfo], attack: 0.38, peak: 0.12, release: 0.7, setBrightness };
  },

  // Analogique : deux scies et un carré à l'octave inférieure (multiples exacts), filtre en cascade 24 dB
  // résonant avec enveloppe (attaque, chute, tenue), puis légère saturation : la couleur d'un monophonique.
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

  pad(context, frequency, index) {
    const gain = context.createGain();
    const mix = context.createGain();
    const sources = [];
    const wave = (type, ratio, level) => {
      const oscillator = context.createOscillator();
      const oscillatorGain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency * ratio;
      oscillatorGain.gain.value = level;
      oscillator.connect(oscillatorGain);
      oscillatorGain.connect(mix);
      sources.push(oscillator);
    };
    wave("sawtooth", 1, 0.55);
    wave("square", 1, 0.28);
    wave("sine", 0.5, frequency > 200 ? 0.18 : 0.06);
    const now = context.currentTime;
    const cutoff = (b) => Math.min(12000, frequency * (1.6 + b * 9));
    const filters = [-0.7, 0.7].map((side, k) => {
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.value = 1.4;
      filter.frequency.setValueAtTime(frequency * 1.1, now);
      filter.frequency.exponentialRampToValueAtTime(cutoff(audioBrightness()), now + 1.8);
      // Deux filtres qui respirent en sens contraire : mouvement stéréo sans désaccord.
      const lfo = context.createOscillator();
      const depth = context.createGain();
      lfo.frequency.value = 0.09 + 0.02 * (index % 5);
      depth.gain.value = k ? -520 : 520;
      lfo.connect(depth);
      depth.connect(filter.detune);
      const panner = createPanner(context, side);
      mix.connect(filter);
      filter.connect(panner);
      panner.connect(gain);
      sources.push(lfo);
      return filter;
    });
    const setBrightness = (b) => filters.forEach((filter) => {
      filter.frequency.cancelScheduledValues(context.currentTime);
      filter.frequency.setTargetAtTime(cutoff(b), context.currentTime, 0.08);
    });
    return { gain, sources, attack: 1.1, peak: 0.14, release: 2.2, setBrightness };
  },

  glass(context, frequency) {
    const gain = context.createGain();
    const sources = [];
    const now = context.currentTime;
    const brightness = audioBrightness();
    [[1, 1, 5.5], [2, 0.5, 3.6], [3, 0.3, 2.5], [4, 0.2, 1.8], [6, 0.12, 1.2], [8, 0.08, 0.8]]
      .forEach(([harmonic, amplitude, decay], k) => {
        if (frequency * harmonic > 16000) return;
        const oscillator = context.createOscillator();
        const partialGain = context.createGain();
        const level = amplitude * (k === 0 ? 1 : 0.35 + brightness * 1.1);
        oscillator.frequency.value = frequency * harmonic;
        partialGain.gain.setValueAtTime(0.0001, now);
        partialGain.gain.exponentialRampToValueAtTime(level, now + 0.004);
        partialGain.gain.setTargetAtTime(0.0001, now + 0.004, decay / 4.5);
        const panner = createPanner(context, k ? (k % 2 ? 0.35 : -0.35) : 0);
        oscillator.connect(partialGain);
        partialGain.connect(panner);
        panner.connect(gain);
        sources.push(oscillator);
      });
    return { gain, sources, attack: 0.002, peak: 0.14, release: 0.25 };
  },

  // Anche libre (harmonium, shruti) : spectre riche en harmoniques pairs et impairs, deux zones de résonance,
  // souffle de l'air et respiration lente du soufflet (intensité seulement).
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

  // Tanpura : spectre très riche (le jawari fait ressortir les partiels aigus), deux zones de bourdonnement qui
  // montent et descendent lentement dans le spectre, comme la corde qui frise sur le chevalet plat, et une
  // résonance de caisse. Tenu tant que la note sonne; aucun désaccord : seuls des partiels exacts.
  tanpura(context, frequency, index) {
    const gain = context.createGain();
    const partials = Math.max(1, Math.min(90, Math.floor(16000 / frequency)));
    const real = new Float32Array(partials + 1);
    const imaginary = new Float32Array(partials + 1);
    for (let k = 1; k <= partials; k += 1) imaginary[k] = 1 / k ** 0.55;
    const oscillator = context.createOscillator();
    oscillator.setPeriodicWave(context.createPeriodicWave(real, imaginary));
    oscillator.frequency.value = frequency;
    const { filter, setBrightness } = liveLowpass(context, (b) => Math.min(17000, frequency * (6 + b * 40)), 0.5);
    oscillator.connect(filter);
    // Caisse (courge) : renforce le grave et le médium.
    const body = context.createBiquadFilter();
    body.type = "peaking";
    body.frequency.value = 260;
    body.gain.value = 4;
    body.Q.value = 0.9;
    filter.connect(body);
    const base = context.createGain();
    base.gain.value = 0.4;
    body.connect(base);
    base.connect(gain);
    const sources = [oscillator];
    const depths = [];
    // Jawari : deux bandes étroites balayent lentement les partiels aigus, à des vitesses différentes.
    [[0.09 + 0.01 * (index % 4), 9], [0.057 + 0.008 * (index % 3), 17]].forEach(([rate, harmonic]) => {
      const center = Math.min(6500, Math.max(900, frequency * harmonic));
      const band = context.createBiquadFilter();
      band.type = "bandpass";
      band.Q.value = 5;
      band.frequency.value = center;
      const sweep = context.createOscillator();
      sweep.frequency.value = rate;
      const depth = context.createGain();
      depth.gain.value = center * 0.85 * tanpuraSweep();
      depths.push([depth, center]);
      sweep.connect(depth);
      depth.connect(band.frequency);
      const buzz = context.createGain();
      buzz.gain.value = 3;
      filter.connect(band);
      band.connect(buzz);
      buzz.connect(gain);
      sources.push(sweep);
    });
    const setSweep = (amount) => depths.forEach(([depth, center]) => (
      depth.gain.setTargetAtTime(center * 0.85 * amount, context.currentTime, 0.1)));
    return { gain, sources, attack: 0.06, peak: 0.07, release: 0.6, setBrightness, setSweep };
  },

  // Orgue enregistré : chaque note est rejouée depuis sa hauteur mesurée (rapport exact); le 4' sonne à
  // l'octave, comme sur l'orgue, et la brillance règle sa part. Son tenu par boucle, comme les cordes.
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

  // Orgue à tuyaux à bouche : jeux de fond purs (8', 4', 2 2/3', 2'), tous harmoniques exacts, et le bref
  // « chuintement » d'attaque du tuyau. La brillance ouvre les jeux aigus. Ni vibrato, ni trémolo.
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
};

function sampledPianoVoice(context, frequency, bankId) {
  const bank = audioEngine.banks.get(bankId);
  if (!bank) return null;
  const zone = nearestZone(bank, frequency);
  const source = context.createBufferSource();
  const gain = context.createGain();
  const sources = [source];
  source.buffer = zone.buffer;
  source.playbackRate.value = frequency / zone.hz; // hauteur exacte, sans arrondi au demi-ton
  const midi = 69 + 12 * Math.log2(frequency / 440);
  const panner = createPanner(context, (midi - 60) / 48);
  panner.connect(gain);
  if (bankId === "feutre") {
    const settings = state.audioSettings ?? AUDIO_LOFI_DEFAULTS;
    const wear = settings.wear / 100;
    const highpass = context.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 110;
    highpass.Q.value = 0.6;
    const { filter, setBrightness } = liveLowpass(context, (b) => 900 + b * 4200 * (1 - wear * 0.5), 0.8);
    const drive = context.createWaveShaper();
    drive.curve = createSaturationCurve(1 + wear * 3.2);
    drive.oversample = "4x";
    const pre = context.createGain();
    const post = context.createGain();
    pre.gain.value = 1 + wear * 1.5;
    post.gain.value = 1 / (1 + wear * 0.9);
    source.connect(highpass);
    highpass.connect(filter);
    filter.connect(pre);
    pre.connect(drive);
    drive.connect(post);
    post.connect(panner);
    if (settings.wow > 0) {
      // Pleurage de cassette : légère oscillation de hauteur (désactivée à 0).
      const lfo = context.createOscillator();
      const depth = context.createGain();
      lfo.frequency.value = 0.55;
      depth.gain.value = settings.wow;
      lfo.connect(depth);
      depth.connect(source.detune);
      sources.push(lfo);
    }
    return { gain, sources, attack: 0.002, peak: 0.5, release: 0.14, setBrightness };
  }
  const { filter, setBrightness } = liveLowpass(context, (b) => 2400 + b * 15000);
  source.connect(filter);
  filter.connect(panner);
  return { gain, sources, attack: 0.002, peak: 0.8, release: 0.14, setBrightness };
}

async function startAudioVoice(value, relativeRatio, octaveShift, { isCurrent = () => true, frequency: fixedFrequency = null } = {}) {
  if (state.audioMuted || state.audioVolume <= 0 || !isCurrent()) return null;
  const instrumentId = state.audioInstrument;
  const generation = audioEngine.generation;
  const stillCurrent = () => isCurrent() && generation === audioEngine.generation
    && instrumentId === state.audioInstrument && !state.audioMuted && state.audioVolume > 0;
  // Le Frettier fournit une fréquence fixe : la hauteur réelle de la case sur la touche.
  const frequency = fixedFrequency ?? audioFrequency(relativeRatio, octaveShift);
  if (!frequency) return null;
  const context = await ensureAudioContext();
  if (!context || !stillCurrent()) return null;
  if (!(await ensureTimbreSamples(instrumentId)) || !stillCurrent()) return null;
  const build = AUDIO_VOICE_BUILDERS[instrumentId] ?? AUDIO_VOICE_BUILDERS.sawtooth;
  const graph = build(context, frequency, audioEngine.voiceSequence = (audioEngine.voiceSequence ?? 0) + 1);
  if (!graph) return null;
  const now = context.currentTime;
  const peak = graph.peak * (AUDIO_TIMBRE_BY_ID.get(instrumentId)?.level ?? 1);
  graph.gain.gain.setValueAtTime(0.0001, now);
  graph.gain.gain.exponentialRampToValueAtTime(peak, now + graph.attack);
  graph.gain.connect(audioEngine.master);
  graph.sources.forEach((source) => source.start(now));
  return { frequency, octaveShift, relativeRatio, value, ...graph };
}

function stopAudioVoice(voice) {
  if (!voice || !audioEngine.context) return;
  const now = audioEngine.context.currentTime;
  try {
    const release = voice.release ?? 0.08;
    const gain = voice.gain.gain;
    if (gain.cancelAndHoldAtTime) gain.cancelAndHoldAtTime(now);
    else gain.cancelScheduledValues(now);
    gain.setTargetAtTime(0.0001, now, Math.max(0.014, release / 4));
    voice.sources.forEach((source) => source.stop(now + release + 0.08));
  } catch {
    // La voix a déjà terminé.
  }
}

/** Identité stable d'une case du tableau (elle survit au redessin du tableau) : sert à distinguer la case
 *  cliquée des autres cases de la même hauteur (décision de Simon, 17 octobre 2026). */
function soundTriggerIdentity(element) {
  if (!element || element.classList.contains("network-node") || !element.parentElement) return null;
  const row = element.closest("[data-tonic-ratio]")?.dataset.tonicRatio ?? "";
  const section = element.closest(".mode-table-section, .concordant-linear, .mode-model")?.className.split(" ")[0] ?? "";
  return `${section}|${row}|${[...element.parentElement.children].indexOf(element)}|${element.className.split(" ")[0]}`;
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
  // Le clavier est organisé autour de la tonique active, alors qu'un mode
  // contextuel peut commencer dans le registre inférieur. S'il n'existe
  // aucune cellule au registre exact de la voix, la cellule homonyme demeure
  // le meilleur (et seul) témoin visuel dans le tableau.
  const octaveIndependentKeyboardVoice = element.classList.contains("network-node")
    || !hasExactTableTrigger
    ? fallbackKeyboardVoice
    : null;
  const voice = audioEngine.latchedVoices.get(key)
    ?? exactKeyboardVoice
    ?? octaveIndependentKeyboardVoice;
  const octaveShift = voice?.octaveShift ?? triggerOctave;
  const frequency = voice?.frequency ?? audioFrequency(relativeRatio, octaveShift);
  const noteLabel = audioNoteLabel(value, frequency);
  const active = Boolean(voice);
  // Une note cliquée dans le tableau : la case cliquée en noir, les autres cases de la même hauteur encadrées.
  const identity = soundTriggerIdentity(element);
  const echo = active && identity !== null && Boolean(voice.sourceIdentity) && voice.sourceIdentity !== identity
    && audioEngine.latchedVoices.get(key) === voice;
  element.classList.toggle("is-sounding", active && !echo);
  element.classList.toggle("is-sounding-echo", echo);
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
  const soundingVoices = [
    ...audioEngine.latchedVoices.values(),
    ...audioEngine.keyboardVoices.values(),
  ];
  const soundingPitchValues = new Set(soundingVoices.map((voice) => voice.value));
  const tonicValue = state.selectedTonic ? audioPitchKey("1/1") : null;
  const tonicIsSounding = tonicValue && soundingPitchValues.has(tonicValue);
  elements.tonicMiniMap
    .querySelectorAll(".tonic-mini-star")
    .forEach((star) => star.classList.toggle("is-sounding", Boolean(tonicIsSounding)));
  elements.tonicMiniMap
    .querySelectorAll("[data-tonic-audio-ratio]")
    .forEach((target) => target.classList.toggle(
      "is-sounding",
      soundingPitchValues.has(target.dataset.tonicAudioRatio),
    ));
  elements.nodes
    .querySelectorAll(".network-node")
    .forEach((node) => {
      if (node.querySelector(".node-root-star")) {
        node.classList.toggle("is-sounding", Boolean(tonicIsSounding));
      }
    });
  document.querySelectorAll(".sound-octave-value").forEach((output) => {
    output.textContent = state.audioOctave > 0 ? `+${state.audioOctave}` : String(state.audioOctave);
  });
  elements.audioOctaveButtons.forEach((button) => {
    const step = Number(button.dataset.audioOctaveStep);
    button.disabled = state.audioOctave + step < -1 || state.audioOctave + step > 1;
  });
  if (elements.audioVolume && Number(elements.audioVolume.value) !== state.audioVolume) {
    elements.audioVolume.value = String(state.audioVolume);
  }
  if (elements.audioVolume) elements.audioVolume.title = `Volume ${state.audioVolume} %`;
  const soundMuted = state.audioMuted || state.audioVolume <= 0;
  elements.audioMouseModeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.audioMouseMode === state.audioMouseMode));
  });
  refreshAudioSettingsPanel();
  updateAudioHiss();
  elements.soundMuteButton.dataset.muted = String(soundMuted);
  elements.soundMuteButton.setAttribute("aria-pressed", String(soundMuted));
  elements.soundMuteButton.setAttribute("aria-label", soundMuted ? "Rétablir le son" : "Couper le son");
  elements.soundMuteButton.title = soundMuted ? "Rétablir le son" : "Couper le son";
  elements.soundMuteButton.classList.toggle(
    "has-sounding-voices",
    audioEngine.latchedVoices.size + audioEngine.keyboardVoices.size > 0,
  );
  if (typeof syncFrettierSounding === "function") syncFrettierSounding();
}

function configureSoundTrigger(element, relativeRatio, { preserveRegister = false } = {}) {
  element.classList.add("sound-trigger");
  element.dataset.audioRatio = audioPitchKey(relativeRatio);
  element.dataset.audioRelativeRatio = relativeRatio;
  element.dataset.audioRegister = String(preserveRegister ? audioRegisterOffset(relativeRatio) : 0);
  element.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleLatchedSound(relativeRatio, { preserveRegister, sourceIdentity: soundTriggerIdentity(element) });
    if (event.detail > 0) element.blur();
  });
  refreshSoundTrigger(element);
}

async function toggleLatchedSound(relativeRatio, { preserveRegister = false, sourceIdentity = null } = {}) {
  const value = audioPitchKey(relativeRatio);
  const octaveShift = state.audioOctave + (preserveRegister ? audioRegisterOffset(relativeRatio) : 0);
  const key = audioVoiceKey(value, octaveShift);
  if (audioEngine.latchedPending.has(key)) {
    audioEngine.latchedPending.delete(key);
    refreshSoundingIndicators();
    return;
  }
  const current = audioEngine.latchedVoices.get(key);
  if (current) {
    audioEngine.latchedVoices.delete(key);
    stopAudioVoice(current);
    refreshSoundingIndicators();
    return;
  }
  if (state.audioMouseMode === "mono") stopLatchedSounds();
  const request = { requestSequence: ++audioEngine.mouseRequestSequence };
  audioEngine.latchedPending.set(key, request);
  const generation = audioEngine.generation;
  const isCurrent = () => generation === audioEngine.generation
    && audioEngine.latchedPending.get(key) === request;
  try {
    const voice = await startAudioVoice(value, relativeRatio, octaveShift, { isCurrent });
    if (!voice) return;
    if (!isCurrent()) {
      stopAudioVoice(voice);
      return;
    }
    voice.requestSequence = request.requestSequence;
    voice.sourceIdentity = sourceIdentity;
    audioEngine.latchedVoices.set(key, voice);
    refreshSoundingIndicators();
  } catch {
    if (isCurrent()) setSoundLoadStatus("Ce son n’a pas pu être chargé. Réessayez.", "error");
  } finally {
    if (audioEngine.latchedPending.get(key) === request) audioEngine.latchedPending.delete(key);
  }
}

// ---------- Son du Frettier (lot 8, 16 octobre 2026) ----------
// Le Frettier envoie la hauteur réelle de chaque case (corde à vide placée dans son registre,
// multipliée par le rapport de la frette). Les réglages, le timbre, Poly/Mono et Oct. sont
// ceux de Modes; Oct. déplace la touche entière d'une octave.

function frettierCellFrequency(multiplier) {
  const value = Number(multiplier);
  if (!Number.isFinite(value) || value <= 0) return null;
  return configuredAudioReferenceA3Hz * value * (2 ** state.audioOctave);
}

async function toggleFrettierCellSound({ key, value, multiplier }) {
  const frequency = frettierCellFrequency(multiplier);
  if (!frequency || typeof key !== "string" || typeof value !== "string") return;
  const voiceKey = `frettier:${key}@${state.audioOctave}`;
  if (audioEngine.latchedPending.has(voiceKey)) {
    audioEngine.latchedPending.delete(voiceKey);
    refreshSoundingIndicators();
    return;
  }
  const current = audioEngine.latchedVoices.get(voiceKey);
  if (current) {
    audioEngine.latchedVoices.delete(voiceKey);
    stopAudioVoice(current);
    refreshSoundingIndicators();
    return;
  }
  if (state.audioMouseMode === "mono") stopLatchedSounds();
  const request = { requestSequence: ++audioEngine.mouseRequestSequence };
  audioEngine.latchedPending.set(voiceKey, request);
  const generation = audioEngine.generation;
  const isCurrent = () => generation === audioEngine.generation
    && audioEngine.latchedPending.get(voiceKey) === request;
  try {
    const voice = await startAudioVoice(value, value, state.audioOctave, { isCurrent, frequency });
    if (!voice) return;
    if (!isCurrent()) {
      stopAudioVoice(voice);
      return;
    }
    voice.requestSequence = request.requestSequence;
    voice.frettierCell = key;
    audioEngine.latchedVoices.set(voiceKey, voice);
    refreshSoundingIndicators();
  } catch {
    if (isCurrent()) setSoundLoadStatus("Ce son n’a pas pu être chargé. Réessayez.", "error");
  } finally {
    if (audioEngine.latchedPending.get(voiceKey) === request) audioEngine.latchedPending.delete(voiceKey);
  }
}

/** Clavier d'ordinateur dans le Frettier : les hauteurs réelles de la touche, de la plus grave à la
 *  plus aiguë. La touche A joue le 1/1 du réseau (décision de Simon, 16 octobre 2026), la rangée
 *  A S D F… monte, Q W E… continue au-dessus, Z X C… joue les dix hauteurs sous le 1/1.
 *  Révisé le 17 octobre 2026 : chaque lettre joue une case qui existe sur la touche, dans son registre. */
function frettierKeyboardPitch(code) {
  const mapping = AUDIO_KEYBOARD_MAP.get(code);
  const scale = audioEngine.frettierScale ?? [];
  if (!mapping || !scale.length) return null;
  const index = (audioEngine.frettierScaleStart ?? 0) + mapping.index + (mapping.row - 1) * AUDIO_KEYBOARD_ROWS[1].length;
  // Au-delà des bords de la touche, on reprend la touche une octave plus bas ou plus haut.
  const wrap = Math.floor(index / scale.length);
  const entry = scale[positiveModulo(index, scale.length)];
  const octaveShift = state.audioOctave;
  return {
    value: entry.value,
    relativeRatio: entry.value,
    octaveShift,
    frequency: configuredAudioReferenceA3Hz * entry.multiplier * (2 ** (octaveShift + wrap)),
  };
}

/** Note tenue tant que la touche du clavier d'ordinateur reste enfoncée. */
async function startPressedKeyVoice(code, pitch) {
  audioEngine.pressedKeyboardCodes.add(code);
  const voice = await startAudioVoice(pitch.value, pitch.relativeRatio, pitch.octaveShift, { frequency: pitch.frequency ?? null });
  if (!voice) {
    audioEngine.pressedKeyboardCodes.delete(code);
    return;
  }
  if (!audioEngine.pressedKeyboardCodes.has(code)) {
    stopAudioVoice(voice);
    return;
  }
  audioEngine.keyboardVoices.set(code, voice);
  refreshSoundingIndicators();
}

function releasePressedKeyVoice(code) {
  audioEngine.pressedKeyboardCodes.delete(code);
  const voice = audioEngine.keyboardVoices.get(code);
  if (!voice) return false;
  audioEngine.keyboardVoices.delete(code);
  stopAudioVoice(voice);
  refreshSoundingIndicators();
  return true;
}

function stopLatchedSounds({ keepKey = null } = {}) {
  for (const key of audioEngine.latchedPending.keys()) {
    if (key !== keepKey) audioEngine.latchedPending.delete(key);
  }
  for (const [key, voice] of audioEngine.latchedVoices) {
    if (key === keepKey) continue;
    audioEngine.latchedVoices.delete(key);
    stopAudioVoice(voice);
  }
}

function setAudioMouseMode(mode) {
  if (!["poly", "mono"].includes(mode)) return;
  state.audioMouseMode = mode;
  if (mode === "mono") {
    const last = [...audioEngine.latchedVoices, ...audioEngine.latchedPending]
      .sort((first, second) => (second[1].requestSequence ?? 0) - (first[1].requestSequence ?? 0))[0];
    stopLatchedSounds({ keepKey: last?.[0] ?? null });
  }
  setOptionsDefaultStatus();
  refreshSoundingIndicators();
}

function stopKeyboardSounds() {
  audioEngine.keyboardVoices.forEach(stopAudioVoice);
  audioEngine.keyboardVoices.clear();
  audioEngine.pressedKeyboardCodes.clear();
  refreshSoundingIndicators();
}

// Bourdon continu retiré le 21 octobre 2026 (Simon le joue lui-même en cliquant sur les notes).

function stopAllSounds() {
  audioEngine.generation += 1;
  audioEngine.latchedPending.clear();
  audioEngine.latchedVoices.forEach(stopAudioVoice);
  audioEngine.latchedVoices.clear();
  stopKeyboardSounds();
  refreshSoundingIndicators();
}

function setAudioMuted(muted) {
  const nextMuted = Boolean(muted);
  if (nextMuted) {
    if (state.audioVolume > 0) state.audioVolumeBeforeMute = state.audioVolume;
    audioEngine.generation += 1;
    audioEngine.latchedPending.clear();
    stopKeyboardSounds();
  } else if (state.audioVolume <= 0) {
    state.audioVolume = state.audioVolumeBeforeMute || 100;
  }
  state.audioMuted = nextMuted;
  updateAudioOutputGain();
  refreshSoundingIndicators();
}

function keyboardScaleRatios() {
  const unique = [];
  const seen = new Set();
  selectedGraphRatios().forEach((relativeRatio) => {
    const value = audioPitchKey(relativeRatio);
    if (seen.has(value)) return;
    seen.add(value);
    unique.push({ relativeRatio, value });
  });
  return unique;
}

function intervalKeyboardScaleRatios() {
  const context = state.catalog === "tetracordes" ? tetrachordContextForSelection() : intervalContextForSelection();
  if (!context) return [];
  const unique = [];
  const seen = new Set();
  context.mode.ratios.slice(0, -1).forEach((modeRatio) => {
    const relativeRatio = divideAndReduce(modeRatio, context.lowerRatio);
    const fraction = relativeRatio ? parseFraction(relativeRatio) : null;
    const normalized = fraction ? fractionToString(reduceToOctave(fraction)) : null;
    if (!normalized) return;
    const value = audioPitchKey(normalized);
    if (seen.has(value)) return;
    seen.add(value);
    unique.push({ relativeRatio: normalized, value });
  });
  return unique.sort((first, second) => (
    ratioCents(first.relativeRatio) - ratioCents(second.relativeRatio)
  ));
}

function keyboardPitch(code) {
  const mapping = AUDIO_KEYBOARD_MAP.get(code);
  if (!mapping || !state.selectedFamily || modeTableHasFifthRows()) return null;
  if (
    (state.catalog === "intervalles" && intervalEntryForSelection())
    || (state.catalog === "tetracordes" && tetrachordEntryForSelection())
  ) {
    const scale = intervalKeyboardScaleRatios();
    if (!scale.length) return null;
    const degree = mapping.row === 0
      ? mapping.index - scale.length
      : mapping.row === 1
        ? mapping.index
        : mapping.index + scale.length;
    const octaveOffset = Math.floor(degree / scale.length);
    const index = positiveModulo(degree, scale.length);
    return {
      octaveShift: state.audioOctave + octaveOffset,
      relativeRatio: scale[index].relativeRatio,
      value: scale[index].value,
    };
  }
  if (state.catalog === "accords" && currentChord()) {
    if (mapping.index > 7) return null;
    const context = currentChordContextMode();
    if (context) {
      const scale = context.mode.ratios.slice(0, -1).map((modeRatio) => {
        const absolutePitch = multiplyAndReduce(context.tonic, modeRatio);
        const relativeRatio = absolutePitch
          ? divideAndReduce(absolutePitch, state.selectedTonic)
          : null;
        return relativeRatio ? { relativeRatio, value: audioPitchKey(relativeRatio) } : null;
      }).filter(Boolean).sort((first, second) => (
        ratioCents(first.relativeRatio) - ratioCents(second.relativeRatio)
      ));
      if (!scale.length) return null;
      const degree = mapping.row === 0
        ? mapping.index - scale.length
        : mapping.row === 1
          ? mapping.index
          : mapping.index + scale.length;
      const octaveOffset = Math.floor(degree / scale.length);
      const index = positiveModulo(degree, scale.length);
      return {
        octaveShift: state.audioOctave + octaveOffset,
        relativeRatio: scale[index].relativeRatio,
        value: scale[index].value,
      };
    }
    const chord = currentChord();
    const variant = currentChordVariant();
    if (!chord || !variant) return null;
    const tone = chordTones(chord, variant).find(({ degree }) => {
      const match = normalizedChordDegreeLabel(degree).match(/(\d+)/);
      if (!match) return false;
      const degreeNumber = Number(match[1]);
      return (degreeNumber === 8 ? 7 : (degreeNumber - 1) % 7) === mapping.index;
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
  let degree;
  if (!state.selectedModeId || state.selectedModeId === ALL_SELECTION_ID) {
    // Dans l’inventaire complet d’une famille, les trois rangées forment une
    // seule suite continue : A vient donc après / au lieu de rappeler la tonique.
    degree = mapping.index + mapping.row * AUDIO_KEYBOARD_ROWS[0].length;
  } else if (mapping.row === 0) {
    degree = mapping.index - scale.length;
  } else if (mapping.row === 1) {
    degree = mapping.index;
  } else {
    degree = mapping.index + scale.length;
  }
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
    target.isContentEditable || ["INPUT", "TEXTAREA"].includes(target.tagName)
    // Le menu des timbres n'est pas une zone de saisie : les lettres y jouent les notes au
    // lieu de sauter à un autre timbre par leur initiale (21 octobre 2026).
    || (target.tagName === "SELECT" && target.id !== "audio-instrument")
  );
}

/** Le menu des timbres prend la largeur du nom le plus long, mesuré dans la police réellement
 *  affichée (elle peut différer d'un ordinateur à l'autre). */
function sizeTimbreSelect() {
  const select = elements.audioInstrument ?? document.querySelector("#audio-instrument");
  if (!select) return;
  const style = getComputedStyle(select);
  const context = document.createElement("canvas").getContext("2d");
  if (!context) return;
  context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const longest = Math.max(...[...select.options].map((option) => context.measureText(option.textContent).width));
  const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  if (Number.isFinite(longest)) select.style.width = `${Math.ceil(longest + padding + 2)}px`;
}

// ---------- Panneau « Réglages du son » ----------

function refreshAudioSettingsPanel() {
  const settings = currentTimbreSettings();
  const lofi = state.audioSettings ?? AUDIO_LOFI_DEFAULTS;
  const sync = (input, output, value, format = String) => {
    if (!input) return;
    if (Number(input.value) !== value) input.value = String(value);
    if (output) output.textContent = format(value);
  };
  sync(elements.audioBrightness, elements.audioBrightnessValue, settings.brightness);
  sync(elements.audioReverb, elements.audioReverbValue, settings.reverb);
  sync(elements.audioWear, elements.audioWearValue, lofi.wear);
  sync(elements.audioHiss, elements.audioHissValue, lofi.hiss);
  sync(elements.audioWow, elements.audioWowValue, lofi.wow, (value) => `${value} cent${value > 1 ? "s" : ""}`);
  const isLofi = state.audioInstrument === "lofi";
  if (elements.audioLofiSettings) elements.audioLofiSettings.hidden = !isLofi;
  const isTanpura = state.audioInstrument === "tanpura";
  sync(elements.audioSweep, elements.audioSweepValue, state.audioSettings?.sweep ?? AUDIO_TANPURA_DEFAULTS.sweep);
  if (elements.audioTanpuraSettings) elements.audioTanpuraSettings.hidden = !isTanpura;
  if (elements.audioSettingsTimbre) {
    elements.audioSettingsTimbre.textContent = AUDIO_TIMBRE_BY_ID.get(state.audioInstrument)?.label ?? "";
  }
  if (elements.audioSettingsReset) {
    const factory = factoryAudioSettings();
    const factoryTimbre = factory.timbres[state.audioInstrument];
    const unchanged = factoryTimbre
      && settings.brightness === factoryTimbre.brightness
      && settings.reverb === factoryTimbre.reverb
      && (!isLofi || ["wear", "hiss", "wow"].every((name) => lofi[name] === factory[name]))
      && (!isTanpura || (state.audioSettings?.sweep ?? factory.sweep) === factory.sweep);
    elements.audioSettingsReset.disabled = Boolean(unchanged);
  }
}

function setAudioSetting(name, rawValue) {
  const value = Number(rawValue);
  if (!Number.isFinite(value)) return;
  const next = normalizedAudioSettings(state.audioSettings);
  if (name === "brightness" || name === "reverb") next.timbres[state.audioInstrument][name] = value;
  else if (["wear", "hiss", "wow", "sweep"].includes(name)) next[name] = value;
  else return;
  state.audioSettings = normalizedAudioSettings(next);
  applyAudioSettings();
  if (name === "sweep") soundingVoices().forEach((voice) => voice.setSweep?.(tanpuraSweep()));
  refreshAudioSettingsPanel();
  setOptionsDefaultStatus();
}

// Rétablit les réglages d'origine du timbre choisi (et ceux du lo-fi s'il est choisi).
function resetTimbreSettings() {
  const factory = factoryAudioSettings();
  const next = normalizedAudioSettings(state.audioSettings);
  next.timbres[state.audioInstrument] = { ...factory.timbres[state.audioInstrument] };
  if (state.audioInstrument === "lofi") Object.assign(next, AUDIO_LOFI_DEFAULTS);
  if (state.audioInstrument === "tanpura") Object.assign(next, AUDIO_TANPURA_DEFAULTS);
  state.audioSettings = next;
  applyAudioSettings();
  soundingVoices().forEach((voice) => voice.setSweep?.(tanpuraSweep()));
  refreshAudioSettingsPanel();
  setOptionsDefaultStatus();
}

// Garde le panneau entièrement à l'écran, même quand la barre passe sur deux lignes (écran étroit).
function placeAudioSettingsPopover() {
  const menu = elements.audioSettingsMenu;
  const popover = menu?.querySelector(".audio-settings-popover");
  if (!menu?.open || !popover) return;
  popover.style.transform = "";
  const rect = popover.getBoundingClientRect();
  const margin = 8;
  let shift = 0;
  if (rect.left < margin) shift = margin - rect.left;
  else if (rect.right > window.innerWidth - margin) shift = window.innerWidth - margin - rect.right;
  if (shift) popover.style.transform = `translateX(${Math.round(shift)}px)`;
}

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
  if (!first || !second || second.numerator === 0n) return null;
  return fractionToString(reduceToOctave(simplify({
    numerator: first.numerator * second.denominator,
    denominator: first.denominator * second.numerator,
  })));
}

function contextualModeAudioRatio(tonicRatio, modeRatio, referenceTonic = state.selectedTonic) {
  const tonic = parseFraction(tonicRatio);
  const interval = parseFraction(modeRatio);
  const reference = parseFraction(referenceTonic);
  if (!tonic || !interval || !reference || reference.numerator === 0n) return null;
  return fractionToString(simplify({
    numerator: tonic.numerator * interval.numerator * reference.denominator,
    denominator: tonic.denominator * interval.denominator * reference.numerator,
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
    if (remaining > 1n) {
      exponents.set(remaining, (exponents.get(remaining) ?? 0) + direction);
    }
  };
  addFactors(fraction.numerator, 1);
  addFactors(fraction.denominator, -1);
  for (const [prime, exponent] of exponents) {
    if (exponent === 0) exponents.delete(prime);
  }
  return exponents;
}

function latticeBasisForPrime(prime) {
  const basisMap = state.graphSystem === "grady" ? GRADY_LATTICE_BASIS
    : state.graphSystem === "simon1" ? SIMON_1_LATTICE_BASIS : SIMON_LATTICE_BASIS;
  const known = basisMap.get(prime);
  let basis = known;
  if (!basis) {
    const numericPrime = Number(prime);
    const angle = ((numericPrime % 31) / 31) * Math.PI * 2 + 0.31;
    const radius = 0.9 + Math.min(0.8, Math.log(numericPrime) / 10);
    basis = [Math.cos(angle) * radius, Math.sin(angle) * radius];
  }
  // Only harmonic 5 changes length; all other axes keep their own coordinates.
  return state.graphSystem !== "grady" && prime === 5n
    ? [basis[0], basis[1] * activeAxis5Length() / activeAxis5NormalLength()]
    : basis;
}

function latticeExponentKey(exponents) {
  return [...exponents.entries()]
    .sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))
    .map(([prime, exponent]) => `${prime}:${exponent}`)
    .join("|");
}

// A horizontal axis is one harmonic family translated by powers of 3.
// Its labels must stay on the same side even when some degrees are omitted.
function latticeHorizontalAxisKey(exponents) {
  return latticeExponentKey(new Map(
    [...exponents].filter(([prime]) => prime !== 3n),
  ));
}

function latticeDistance(first, second) {
  const primes = new Set([...first.keys(), ...second.keys()]);
  let distance = 0;
  for (const prime of primes) {
    distance += Math.abs((first.get(prime) ?? 0) - (second.get(prime) ?? 0));
  }
  return distance;
}

function setLatticeExponent(exponents, prime, exponent) {
  if (exponent === 0) exponents.delete(prime);
  else exponents.set(prime, exponent);
}

function latticeIntermediateExponents(first, second) {
  if (latticeDistance(first, second) !== 2) return [];

  const differences = [...new Set([...first.keys(), ...second.keys()])]
    .map((prime) => ({
      difference: (first.get(prime) ?? 0) - (second.get(prime) ?? 0),
      prime,
    }))
    .filter(({ difference }) => difference !== 0);

  if (differences.length === 1 && Math.abs(differences[0].difference) === 2) {
    const intermediate = new Map(second);
    const { difference, prime } = differences[0];
    setLatticeExponent(intermediate, prime, (second.get(prime) ?? 0) + difference / 2);
    return [intermediate];
  }

  if (
    differences.length === 2 &&
    differences.every(({ difference }) => Math.abs(difference) === 1)
  ) {
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

function layoutHasVerticalSpan(layout) {
  const positions = layout.nodes.map((node) => node.y);
  return Math.max(...positions) > Math.min(...positions);
}

function buildLatticeLayout(
  values,
  connectionLevel = state.connectionLevel,
  requiredAuxiliaryExponents = [],
) {
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

  if (connectionLevel >= 2 || requiredAuxiliaryExponents.length) {
    const primaryKeys = new Set(primaryNodes.map(({ exponents }) => latticeExponentKey(exponents)));
    const auxiliaryKeys = new Set();

    if (connectionLevel >= 2) {
      for (let first = 0; first < primaryNodes.length; first += 1) {
        for (let second = first + 1; second < primaryNodes.length; second += 1) {
          for (const intermediate of latticeIntermediateExponents(
            primaryNodes[first].exponents,
            primaryNodes[second].exponents,
          )) {
            const key = latticeExponentKey(intermediate);
            if (primaryKeys.has(key) || auxiliaryKeys.has(key)) continue;
            auxiliaryKeys.add(key);
            allNodes.push({
              aliases: [],
              auxiliary: true,
              exponents: intermediate,
              ratio: null,
            });
          }
        }
      }
    }

    requiredAuxiliaryExponents.forEach((exponents) => {
      const key = latticeExponentKey(exponents);
      if (primaryKeys.has(key) || auxiliaryKeys.has(key)) return;
      auxiliaryKeys.add(key);
      allNodes.push({ aliases: [], auxiliary: true, exponents, ratio: null });
    });

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
  // Keep each profile's normal drawing as the scale reference. Fitting each
  // length independently to exactly 500px made the 5-axis appear unchanged.
  const normalYs = state.graphSystem !== "grady" ? rawNodes.map((node) => (
    node.rawY + (node.exponents.get(5n) ?? 0)
      * (activeAxis5Length() - activeAxis5NormalLength()) / activeAxis5NormalLength()
  )) : null;
  const normalSpanY = normalYs ? Math.max(...normalYs) - Math.min(...normalYs) : spanY;
  const normalScaleY = normalSpanY === 0 ? Number.POSITIVE_INFINITY : 500 / normalSpanY;
  // Reserve at most 60 extra pixels for longer settings, leaving room for
  // labels in the 620px drawing. Beyond that, proportions still change.
  const availableHeight = state.graphSystem !== "grady"
    ? Math.min(560, 500 + Math.max(0, activeAxis5Length() - activeAxis5NormalLength()) * 10)
    : 500;
  const scaleY = spanY === 0 ? Number.POSITIVE_INFINITY : availableHeight / spanY;
  const unitScale = spanX === 0 && spanY === 0 ? 1 : Math.min(scaleX, scaleY, normalScaleY);
  const contentWidth = spanX * unitScale;
  const contentHeight = spanY * unitScale;
  const offsetX = (1000 - contentWidth) / 2 - minX * unitScale;
  const offsetY = (620 - contentHeight) / 2 - minY * unitScale;
  const nodes = rawNodes.map((node) => ({
    ...node,
    x: spanX === 0 && spanY === 0 ? 500 : offsetX + node.rawX * unitScale,
    y: spanX === 0 && spanY === 0 ? 310 : offsetY + node.rawY * unitScale,
  }));
  const edges = [];

  for (let first = 0; first < nodes.length; first += 1) {
    for (let second = first + 1; second < nodes.length; second += 1) {
      const prime = latticeNeighbourPrime(nodes[first].exponents, nodes[second].exponents);
      if (prime !== null) {
        edges.push({
          auxiliary: nodes[first].auxiliary || nodes[second].auxiliary,
          first,
          second,
          prime,
        });
      }
    }
  }

  return { edges, nodes };
}

function requiresSecondConnectionLevel(values) {
  return layoutHasDisconnectedPrimary(buildLatticeLayout(values, 1));
}

function layoutHasDisconnectedPrimary(layout) {
  const primaryIndices = layout.nodes
    .map((node, index) => (node.auxiliary ? -1 : index))
    .filter((index) => index >= 0);
  if (primaryIndices.length <= 1) return false;
  const visited = new Set([primaryIndices[0]]);
  const queue = [primaryIndices[0]];
  const neighbours = new Map(layout.nodes.map((_, index) => [index, []]));
  layout.edges.forEach((edge) => {
    neighbours.get(edge.first).push(edge.second);
    neighbours.get(edge.second).push(edge.first);
  });
  while (queue.length) {
    const index = queue.shift();
    neighbours.get(index).forEach((neighbour) => {
      if (visited.has(neighbour)) return;
      visited.add(neighbour);
      queue.push(neighbour);
    });
  }
  return primaryIndices.some((index) => !visited.has(index));
}

function applyAutomaticConnectionLevel(values) {
  if (state.connectionLevelManual) return;
  // Emergency links are part of level 1. Level 2 is an explicit request for
  // additional limit-7 modal context, never an automatic repair step.
  state.connectionLevel = state.catalog !== "modes" && requiresSecondConnectionLevel(values) ? 2 : 1;
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

function ratioToTableCents(value, notation) {
  const tunerLabel = ratioToTunerLabel(value, notation);
  if (!tunerLabel) return null;
  // Une déviation numérique seule désigne la note HEJI déjà affichée. Quand
  // l'accordeur emploie une autre référence chromatique, son nom complet doit
  // rester visible : A♭+35 ne peut pas être abrégé en +35 sous un A HEJI.
  return tunerLabel;
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
    slash.setAttribute("aria-hidden", "true");
    slash.textContent = "/";
    const denominatorSpan = document.createElement("span");
    denominatorSpan.textContent = denominator;
    denominatorSpan.style.color = colorForInteger(denominator);
    wrapper.append(slash, denominatorSpan);
  }
  return wrapper;
}

function createHejiPitch(ratio, includeCents, options = undefined) {
  const notation = ratioToHeji(ratio, options);
  if (!notation) {
    if (appliedNetworkConfiguration.sourceMethod === "scala") {
      const fallback = createColorizedRatio(ratio);
      fallback.title = "Ratio exact ; orthographe HEJI hors de la plage disponible.";
      return fallback;
    }
    const undefinedLabel = document.createElement("span");
    undefinedLabel.className = "undefined-heji";
    undefinedLabel.textContent = "Non défini";
    return undefinedLabel;
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
  const centsValue = ratioToTunerLabel(ratio, notation);
  wrapper.setAttribute(
    "aria-label",
    `${plainHejiNote(notation)}, notation HEJI du rapport ${ratio}; ${centsValue} en tempérament égal`,
  );
  const cents = document.createElement("span");
  cents.className = "cents-label";
  cents.setAttribute("aria-hidden", "true");
  cents.textContent = centsValue;
  wrapper.append(pitch, cents);
  return wrapper;
}

function createDisplayLabel(relativeRatio, absoluteRatio = relativeRatio) {
  if (state.displayMode === "none") return null;
  if (state.displayMode === "ratio") return createColorizedRatio(relativeRatio);
  if (state.displayMode === "degrees" && state.catalog === "modes") {
    const mode = selectedModeById();
    if (!mode) return null;
    const normalizedRatio = multiplyAndReduce(relativeRatio, "1/1") ?? relativeRatio;
    const occurrence = modeChordApi.analyzeModeChords(mode, chordData).find((candidate) => (
      (multiplyAndReduce(candidate.degreeRatio, "1/1") ?? candidate.degreeRatio) === normalizedRatio
    ));
    if (!occurrence) return null;
    const degree = document.createElement("span");
    degree.className = "graph-degree-label";
    appendDegreeLabel(
      degree,
      modeChordApi.romanDegreeLabel(
        modeDegreeLabel(occurrence.degreeRatio, occurrence.degreeIndex),
        occurrence.quality,
      ),
    );
    return degree;
  }
  return createHejiPitch(absoluteRatio, state.displayMode === "heji-cents");
}

// Modèle A2 validé : chaque hauteur conserve une colonne de même largeur.
// Seuls les en-têtes des qualités de degrés sont fusionnés.
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

// Les rapports 13/10 et 25/16 exigent une orthographe fonctionnelle plutôt
// qu'un classement par la seule hauteur en cents : quarte diminuée et quinte
// augmentée. Cette règle vaut aussi lorsqu'ils apparaissent dans un mode.
const DEGREE_SPELLING_OVERRIDES = new Map([
  ["13/10", "♭4"],
  ["25/16", "♯5"],
  ["11/9", "3"],
  ["11/6", "7"],
]);

// Grille fixe du modèle Word validé. Les 19 microcolonnes conservent les
// emplacements alternatifs (b2/2, b3/3, etc.) même lorsqu'ils sont vides.
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

// Dans le modèle modal validé, ces proportions sont des discordances : toute
// l'expression est rouge, au lieu de colorer ses facteurs séparément.
const DISCORDANT_PROPORTIONS = new Set([
  "13:16", "21:25", "21:26", "25:28", "27:32", "28:33",
  "22:27", "32:29", "32:39", "33:40", "63:80", "64:75", "99:112",
  "112:135", "225:256",
]);

const MAX_ADMITTED_SUPERPARTICULAR_DENOMINATOR = 48n;
const TOLERATED_INTERVAL_RATIOS = new Set([
  "9/7", "14/9", "11/8", "11/9", "7/5", "10/7", "14/11",
  "13/9", "25/16", "13/10", "45/32", "13/8", "13/11",
]);
const INTERVAL_NAME_ORDER = [
  "2d", "2m", "2M", "2A",
  "3d", "3m", "3M", "3A",
  "4d", "4J", "4A",
  "5d", "5J", "5A",
  "6d", "6m", "6M", "6A",
  "7d", "7m", "7M", "7A",
  "8d", "8J", "8A",
];
const INTERVAL_MENU_GROUPS = [
  { label: "Secondes", genericNumbers: [2] },
  { label: "Tierces", genericNumbers: [3] },
  { label: "Quartes/Quintes", genericNumbers: [4, 5] },
  { label: "Sixtes", genericNumbers: [6] },
  { label: "Septièmes", genericNumbers: [7] },
];
const IONIAN_DEFAULT_INTERVAL_RATIO_BY_GROUP = new Map([
  ["Secondes", "9/8"],
  ["Tierces", "5/4"],
  ["Quartes/Quintes", "4/3"],
  ["Sixtes", "5/3"],
  ["Septièmes", "15/8"],
]);
const INTERVAL_PREFERRED_LOWER_DEGREE_INDEX = new Map([
  ["16/9", 1],
]);

let concordantIntervalCatalogCache = null;

function exactIntervalRatio(lowerValue, upperValue) {
  const lower = parseFraction(lowerValue);
  const upper = parseFraction(upperValue);
  if (!lower || !upper) return null;
  return fractionToString(simplify({
    numerator: upper.numerator * lower.denominator,
    denominator: upper.denominator * lower.numerator,
  }));
}

function isAdmittedIntervalRatio(value) {
  const interval = parseFraction(value);
  if (!interval) return false;
  if (interval.numerator === interval.denominator) return true;
  if (
    interval.numerator - interval.denominator === 1n
    && interval.denominator <= MAX_ADMITTED_SUPERPARTICULAR_DENOMINATOR
  ) return true;
  const inversion = simplify({
    numerator: interval.denominator * 2n,
    denominator: interval.numerator,
  });
  if (
    inversion.numerator - inversion.denominator === 1n
    && inversion.denominator <= MAX_ADMITTED_SUPERPARTICULAR_DENOMINATOR
  ) return true;
  return TOLERATED_INTERVAL_RATIOS.has(fractionToString(interval));
}

function exactIntervalName(ratio, lowerIndex, upperIndex) {
  const genericNumber = upperIndex - lowerIndex + 1;
  if (genericNumber === 4 && ratio === "13/10") return "4d";
  const semitones = Math.round(ratioCents(ratio) / 100);
  const majorSemitones = new Map([[2, 2], [3, 4], [6, 9], [7, 11]]);
  const perfectSemitones = new Map([[4, 5], [5, 7], [8, 12]]);
  if (majorSemitones.has(genericNumber)) {
    const offset = semitones - majorSemitones.get(genericNumber);
    if (offset === 0) return `${genericNumber}M`;
    if (offset === -1) return `${genericNumber}m`;
    if (offset > 0) return `${genericNumber}${"A".repeat(offset)}`;
    return `${genericNumber}${"d".repeat(Math.abs(offset + 1))}`;
  }
  if (perfectSemitones.has(genericNumber)) {
    const offset = semitones - perfectSemitones.get(genericNumber);
    if (offset === 0) return `${genericNumber}J`;
    if (offset > 0) return `${genericNumber}${"A".repeat(offset)}`;
    return `${genericNumber}${"d".repeat(Math.abs(offset))}`;
  }
  return "";
}

function concordantIntervalCatalog() {
  if (concordantIntervalCatalogCache) return concordantIntervalCatalogCache;
  const entries = new Map();
  MODE_PRESETS.forEach((mode) => {
    const [groupIndex, familyIndex, presetIndex] = mode.id.split("-").map(Number);
    mode.ratios.forEach((lowerRatio, lowerIndex) => {
      mode.ratios.slice(lowerIndex + 1).forEach((upperRatio, offset) => {
        const upperIndex = lowerIndex + offset + 1;
        const ratio = exactIntervalRatio(lowerRatio, upperRatio);
        const intervalName = ratio ? exactIntervalName(ratio, lowerIndex, upperIndex) : "";
        if (!ratio || ratio === "1/1" || !intervalName || !isAdmittedIntervalRatio(ratio)) return;
        const proportion = intervalProportion("1/1", ratio);
        const id = `${ratio}@${intervalName}`;
        let entry = entries.get(id);
        if (!entry) {
          entry = {
            cents: ratioCents(ratio),
            genericNumber: upperIndex - lowerIndex + 1,
            id,
            intervalName,
            occurrences: [],
            proportion,
            ratio,
          };
          entries.set(id, entry);
        }
        entry.occurrences.push({
          familyIndex,
          groupIndex,
          lowerIndex,
          lowerRatio,
          mode,
          presetIndex,
          upperIndex,
          upperRatio,
        });
      });
    });
  });
  concordantIntervalCatalogCache = [...entries.values()].sort((first, second) => (
    INTERVAL_NAME_ORDER.indexOf(first.intervalName) - INTERVAL_NAME_ORDER.indexOf(second.intervalName)
    || first.cents - second.cents
    || first.ratio.localeCompare(second.ratio)
  ));
  return concordantIntervalCatalogCache;
}

function concordantModeRatios() {
  return [...new Set(modesAvailableForTonic(state.selectedTonic).flatMap((mode) => mode.ratios))]
    .sort((first, second) => (
      ratioCents(first) - ratioCents(second) || first.localeCompare(second)
    ));
}

function intervalEntryForSelection(selection = state.intervalSelection) {
  if (!selection) return null;
  return concordantIntervalCatalog().find((entry) => entry.id === selection)
    ?? concordantIntervalCatalog().find((entry) => entry.ratio === selection)
    ?? null;
}

function availableIntervalEntries(anchorTonic = state.selectedTonic) {
  if (!anchorTonic) return [];
  return concordantIntervalCatalog().filter((entry) => (
    networkConcordanceIsEnabled(entry.ratio)
    && Boolean(intervalContextForSelection(entry.id, anchorTonic))
  ));
}

function catalogOverviewSelected(catalog = state.catalog) {
  if (catalog === "intervalles") return state.intervalSelection === ALL_SELECTION_ID;
  if (catalog === "tetracordes") return state.tetrachordSelection === ALL_SELECTION_ID;
  if (catalog === "accords") return state.selectedChordName === ALL_SELECTION_ID;
  return state.selectedModeId === ALL_SELECTION_ID;
}

function catalogOverviewRatios(catalog = state.catalog) {
  if (!state.selectedTonic || !state.selectedFamily) return [];
  let ratios = [];
  if (catalog === "intervalles") {
    ratios = availableIntervalEntries().map((entry) => entry.ratio);
  } else if (catalog === "tetracordes") {
    ratios = availableTetrachordEntries().flatMap((entry) => entry.ratios)
      .filter((ratio) => ratioCents(ratio) <= ratioCents("4/3"));
  } else if (catalog === "accords") {
    ratios = chordData.columns.flatMap((column) => column.names.flatMap((chordName) => {
      const chord = chordData.chords[chordName];
      return availableChordVariantIndices(chord, chordName).flatMap((index) => (
        chordFunctionRatios(chord, chord.variants[index])
      ));
    }));
  } else {
    ratios = concordantModeRatios();
  }
  if (!ratios.length) return [];
  const boundedRatios = catalog === "tetracordes"
    ? ["1/1", ...ratios]
    : ["1/1", ...ratios, "2/1"];
  return [...new Set(boundedRatios.filter(Boolean))].sort((first, second) => (
    ratioCents(first) - ratioCents(second) || first.localeCompare(second)
  ));
}

function intervalIsAvailable(selection, anchorTonic = state.selectedTonic) {
  if (!selection) return false;
  const entry = intervalEntryForSelection(selection);
  return Boolean(entry && intervalContextForSelection(entry.id, anchorTonic));
}

function defaultIntervalSelection(anchorTonic = state.selectedTonic) {
  const entries = availableIntervalEntries(anchorTonic);
  return entries.find((entry) => entry.ratio === "5/4")?.id
    ?? entries[0]?.id
    ?? "";
}

function intervalContextCandidates(
  selection = state.intervalSelection,
  anchorTonic = state.intervalAnchorTonic || state.selectedTonic,
) {
  const entry = intervalEntryForSelection(selection);
  if (!entry || !anchorTonic || !networkConcordanceIsEnabled(entry.ratio)) return [];
  const candidates = entry.occurrences.map((occurrence) => {
    const modeTonic = divideAndReduce(anchorTonic, occurrence.lowerRatio);
    const familyKey = modeTonic ? TONIC_FAMILY_BY_RATIO.get(modeTonic) : "";
    return modeTonic
      && familyKey
      && TONIC_RATIO_SET.has(modeTonic)
      && networkAdmitsModeAtTonic(modeTonic, occurrence.mode)
      ? { ...occurrence, anchorTonic, entry, familyKey, modeTonic }
      : null;
  }).filter(Boolean);
  const simplestByContext = new Map();
  candidates.forEach((candidate) => {
    const genericModeId = genericModeIdFromPresetId(candidate.mode.id);
    const key = [
      genericModeId,
      candidate.modeTonic,
      candidate.lowerIndex,
      candidate.upperIndex,
    ].join("|");
    const current = simplestByContext.get(key);
    if (!current || compareIntervalFunctionContexts(candidate, current) < 0) {
      simplestByContext.set(key, candidate);
    }
  });
  return [...simplestByContext.values()];
}

function intervalContextForSelection(
  selection = state.intervalSelection,
  anchorTonic = state.intervalAnchorTonic || state.selectedTonic,
) {
  const candidates = intervalContextCandidates(selection, anchorTonic);
  if (!candidates.length) return null;
  const preview = state.intervalFunctionPreview;
  if (
    preview
    && preview.entryId === candidates[0].entry.id
    && preview.anchorTonic === anchorTonic
  ) {
    const selected = candidates.find((candidate) => (
      candidate.mode.id === preview.modeId
      && candidate.modeTonic === preview.modeTonic
      && candidate.lowerIndex === preview.lowerIndex
      && candidate.upperIndex === preview.upperIndex
    ));
    if (selected) return selected;
  }
  const entry = candidates[0].entry;
  const preferredLowerIndex = INTERVAL_PREFERRED_LOWER_DEGREE_INDEX.get(entry.ratio);
  return candidates.sort((first, second) => (
    Number(second.lowerIndex === preferredLowerIndex) - Number(first.lowerIndex === preferredLowerIndex)
    || Number(second.lowerRatio === "1/1") - Number(first.lowerRatio === "1/1")
    || Number(second.mode.family === MODE_GROUP_DEFAULT_FAMILIES.get(second.mode.group))
      - Number(first.mode.family === MODE_GROUP_DEFAULT_FAMILIES.get(first.mode.group))
    || modeLimitNumber(first.mode) - modeLimitNumber(second.mode)
    || first.groupIndex - second.groupIndex
    || first.familyIndex - second.familyIndex
    || first.presetIndex - second.presetIndex
    || first.lowerIndex - second.lowerIndex
  ))[0] ?? null;
}

function intervalContextRelativeRatios(context) {
  if (!context) return ["1/1"];
  return context.mode.ratios.map((ratio) => divideAndReduce(ratio, context.lowerRatio)).filter(Boolean);
}

function tetrachordEntryForSelection(code = state.tetrachordSelection) {
  return TETRACHORD_CATALOG.find((entry) => entry.code === code) ?? null;
}

function tetrachordContextCandidates(
  code = state.tetrachordSelection,
  anchorTonic = state.selectedTonic,
  options = undefined,
) {
  const entry = tetrachordEntryForSelection(code);
  if (!entry || !anchorTonic) return [];
  const candidates = entry.occurrences.map((occurrence) => {
    const modeTonic = divideAndReduce(anchorTonic, occurrence.lowerRatio);
    const familyKey = TONIC_FAMILY_BY_RATIO.get(modeTonic);
    return tonicIsAvailableInNetwork(modeTonic, appliedNetworkConfiguration, options)
      && networkAdmitsModeAtTonic(modeTonic, occurrence.mode, appliedNetworkConfiguration, options)
      ? { ...occurrence, entry, anchorTonic, modeTonic, familyKey }
      : null;
  }).filter(Boolean);
  const positionRank = (index) => index === 0 ? 0 : index === 4 ? 1 : 2;
  return candidates.sort((first, second) => (
    positionRank(first.lowerIndex) - positionRank(second.lowerIndex)
    || modeLimitNumber(first.mode) - modeLimitNumber(second.mode)
    || MODE_GROUPS.findIndex((group) => group.label === first.mode.group)
      - MODE_GROUPS.findIndex((group) => group.label === second.mode.group)
    || Number(second.mode.family === MODE_GROUP_DEFAULT_FAMILIES.get(second.mode.group))
      - Number(first.mode.family === MODE_GROUP_DEFAULT_FAMILIES.get(first.mode.group))
    || first.modeIndex - second.modeIndex
    || first.lowerIndex - second.lowerIndex
  ));
}

function tetrachordContextMatches(snapshot, context) {
  return Boolean(snapshot && context
    && snapshot.code === context.entry.code && snapshot.anchorTonic === context.anchorTonic
    && snapshot.modeId === context.mode.id && snapshot.modeTonic === context.modeTonic
    && snapshot.lowerIndex === context.lowerIndex);
}

function tetrachordContextForSelection(
  code = state.tetrachordSelection,
  anchorTonic = state.selectedTonic,
  { includePreview = true } = {},
) {
  const candidates = tetrachordContextCandidates(code, anchorTonic);
  const preview = includePreview && candidates.find((candidate) => (
    tetrachordContextMatches(state.tetrachordFunctionPreview, candidate)
  ));
  return preview || candidates.find((candidate) => (
    tetrachordContextMatches(state.tetrachordModeContext, candidate)
  )) || candidates[0] || null;
}

function availableTetrachordEntries(anchorTonic = state.selectedTonic) {
  return TETRACHORD_CATALOG.filter((entry) => tetrachordContextCandidates(entry.code, anchorTonic).length);
}

function defaultTetrachordSelection(anchorTonic = state.selectedTonic) {
  const entries = availableTetrachordEntries(anchorTonic);
  return entries.find((entry) => entry.code === "Maj-24L5")?.code ?? entries[0]?.code ?? "";
}

function tetrachordEndsOnOctave(context) {
  return Boolean(context) && context.lowerIndex + context.entry.ratios.length - 1 >= context.mode.ratios.length - 1;
}

function tetrachordHighlightedPitches(context = tetrachordContextForSelection()) {
  return octavePitchSet(context?.entry.ratios.map((ratio) => multiplyAndReduce(context.anchorTonic, ratio)) ?? []);
}

function intervalHighlightedRelativeRatios(context) {
  if (!context) return new Set();
  return new Set(["1/1", divideAndReduce(context.upperRatio, context.lowerRatio)].filter(Boolean));
}

function storedIntervalContextSelection() {
  const stored = state.intervalModeContext ?? state.intervalChordContext;
  if (stored?.intervalRatio && stored.anchorTonic) {
    return intervalContextForSelection(stored.intervalSelection ?? stored.intervalRatio, stored.anchorTonic);
  }
  return state.catalog === "intervalles" ? intervalContextForSelection() : null;
}

function serializeIntervalContext(context) {
  return context ? {
    anchorTonic: context.anchorTonic,
    intervalRatio: context.entry.ratio,
    intervalSelection: context.entry.id,
    lowerRatio: context.lowerRatio,
    modeId: context.mode.id,
    modeTonic: context.modeTonic,
    upperRatio: context.upperRatio,
  } : null;
}

function intervalFunctionPreviewFromContext(context, pending = false) {
  return context ? {
    anchorTonic: context.anchorTonic,
    entryId: context.entry.id,
    lowerIndex: context.lowerIndex,
    modeId: context.mode.id,
    modeTonic: context.modeTonic,
    pending,
    upperIndex: context.upperIndex,
  } : null;
}

function intervalFunctionPreviewMatchesContext(preview, context) {
  return Boolean(
    preview
    && context
    && preview.anchorTonic === context.anchorTonic
    && preview.entryId === context.entry.id
    && preview.lowerIndex === context.lowerIndex
    && preview.modeId === context.mode.id
    && preview.modeTonic === context.modeTonic
    && preview.upperIndex === context.upperIndex
  );
}

function modeSlot(label, slots = MODE_TABLE_SLOTS) {
  return slots[label] ?? MODE_TABLE_SLOTS[label] ?? MODE_TABLE_SLOTS["4"];
}

function placeOnModeGrid(element, label, slots) {
  const [start, end] = modeSlot(label, slots);
  element.style.gridColumn = `${start} / ${end}`;
}

function modeGridLinePercent(gridLine, gridWeights) {
  const total = gridWeights.reduce((sum, value) => sum + value, 0);
  const before = gridWeights.slice(0, gridLine - 1).reduce((sum, value) => sum + value, 0);
  return (before / total) * 100;
}

function modeSlotCenter(label, gridWeights, slots) {
  const [start, end] = modeSlot(label, slots);
  const total = gridWeights.reduce((sum, value) => sum + value, 0);
  const before = gridWeights.slice(0, start - 1).reduce((sum, value) => sum + value, 0);
  const width = gridWeights.slice(start - 1, end - 1).reduce((sum, value) => sum + value, 0);
  return ((before + width / 2) / total) * 100;
}

function formatModeLabel(value) {
  return value
    .replace(/ L(5|7|11|13) \(sous-mineur\)/g, " L$1sm")
    .replace(/ L(5|7|11|13) \(mineur\)/g, " L$1m")
    .replace(/#(?=\d)/g, "♯")
    .replace(/\bb(?=\d)/g, "♭");
}

function appendDegreeLabel(container, value) {
  const label = formatModeLabel(value);
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

function modeDegreeLabel(ratio, index) {
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

function intervalProportion(lowerValue, upperValue, upperOctaves = 0) {
  const lower = parseFraction(lowerValue);
  const upper = parseFraction(upperValue);
  if (!lower || !upper) return "";
  const interval = simplify({
    numerator: upper.numerator * (2n ** BigInt(upperOctaves)) * lower.denominator,
    denominator: upper.denominator * lower.numerator,
  });
  return `${interval.denominator}:${interval.numerator}`;
}

function createColorizedProportion(value) {
  const wrapper = document.createElement("span");
  wrapper.className = "colorized-ratio";
  wrapper.setAttribute("aria-label", value);
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

function appendParenthesizedColorizedProportion(container, value) {
  const opening = document.createElement("span");
  opening.className = "ratio-punctuation";
  opening.textContent = "(";
  const closing = document.createElement("span");
  closing.className = "ratio-punctuation";
  closing.textContent = ")";
  container.append(opening, createColorizedProportion(value), closing);
}

// Une rangée d'intervalles se lit hiérarchiquement. La première rangée prend
// pour repères les deux notes mesurées; chaque rangée suivante prend pour
// repères les libellés de la rangée immédiatement supérieure qu'elle agrège.
// Ce choix évite qu'une seconde augmentée déporte visuellement une tierce vers
// l'une de ses notes extrêmes.
function hierarchicalProportionCenter(noteCenters, parentLabelCenters = []) {
  const validParents = parentLabelCenters.filter(Number.isFinite);
  const anchors = validParents.length >= 2
    ? validParents
    : noteCenters.filter(Number.isFinite);
  if (!anchors.length) return 0;
  return anchors.reduce((total, center) => total + center, 0) / anchors.length;
}

function createProportionRow(
  ratios,
  distance,
  caption,
  includeCyclicThird,
  gridWeights,
  slots,
  isHighlightedInterval = null,
) {
  const row = document.createElement("div");
  row.className = "proportion-row";
  const captionElement = document.createElement("span");
  captionElement.className = "proportion-caption visually-hidden";
  captionElement.textContent = caption;
  row.append(captionElement);
  const visibleCount = includeCyclicThird ? ratios.length - 1 : ratios.length - distance;
  for (let index = 0; index < visibleCount; index += 1) {
    let upperIndex = index + distance;
    let upperOctaves = 0;
    if (upperIndex >= ratios.length) {
      upperIndex -= ratios.length - 1;
      upperOctaves = 1;
    }
    const label = document.createElement("span");
    label.className = "proportion-label";
    if (
      isHighlightedInterval
      && !isHighlightedInterval(ratios[index], ratios[upperIndex], upperOctaves)
    ) {
      label.classList.add("is-function-context");
    }
    const secondIntervalCenter = (secondIndex, octaveShift = 0) => {
      const lowerDegree = modeDegreeLabel(ratios[secondIndex], secondIndex);
      const nextIndex = secondIndex + 1;
      const upperDegree = modeDegreeLabel(ratios[nextIndex], nextIndex);
      const lowerCenter = modeSlotCenter(lowerDegree, gridWeights, slots) + octaveShift * 100;
      const upperCenter = modeSlotCenter(upperDegree, gridWeights, slots) + octaveShift * 100;
      return hierarchicalProportionCenter([lowerCenter, upperCenter]);
    };
    let midpoint;
    let positionBasis = "notes";
    if (distance === 1) {
      midpoint = secondIntervalCenter(index);
    } else if (upperOctaves) {
      // La tierce cyclique prolonge la rangée au bord de l'octave, où son
      // second intervalle de seconde se poursuit dans l'octave suivante.
      const lastSecond = secondIntervalCenter(index);
      const nextSecond = (
        modeSlotCenter("8", gridWeights, slots)
        + modeSlotCenter(modeDegreeLabel(ratios[1], 1), gridWeights, slots)
        + 100
      ) / 2;
      midpoint = Math.min(
        hierarchicalProportionCenter([], [lastSecond, nextSecond]),
        modeSlotCenter("8", gridWeights, slots),
      );
      positionBasis = "parent-proportions";
    } else {
      // Une tierce est centrée entre ses deux intervalles de secondes, et non
      // entre les centres de ses deux notes extrêmes. La différence devient
      // essentielle lorsqu'une des secondes est augmentée.
      midpoint = hierarchicalProportionCenter([], [
        secondIntervalCenter(index),
        secondIntervalCenter(index + 1),
      ]);
      positionBasis = "parent-proportions";
    }
    label.style.left = `${midpoint}%`;
    label.dataset.intervalDistance = String(distance);
    label.dataset.intervalStart = String(index);
    label.dataset.intervalEnd = String(upperIndex);
    label.dataset.positionBasis = positionBasis;
    label.append(
      createColorizedProportion(intervalProportion(ratios[index], ratios[upperIndex], upperOctaves)),
    );
    row.append(label);
  }
  return row;
}

function appendGridBoundary(row, gridLine, className, gridWeights) {
  const boundary = document.createElement("span");
  boundary.className = className;
  boundary.setAttribute("aria-hidden", "true");
  boundary.style.left = `${modeGridLinePercent(gridLine, gridWeights)}%`;
  row.append(boundary);
}

function renderColorizedModeTitle(mode) {
  elements.tableTitle.replaceChildren();
  const label = formatModeLabel(mode.label);
  const match = label.match(/^(.*?L)(5|7|11|13)(.*)$/);
  if (!match) {
    elements.tableTitle.textContent = label;
    return;
  }
  elements.tableTitle.append(document.createTextNode(match[1]));
  const limit = document.createElement("span");
  limit.textContent = match[2];
  limit.style.color = colorForInteger(match[2]);
  elements.tableTitle.append(limit, document.createTextNode(match[3]));
}

const CONSEQUENT_CHORD_NAME_PARTS = new Map([
  ["mb5", ["m", "♭5"]],
  ["smb5", ["sm", "♭5"]],
  ["m6", ["m", "6"]],
  ["sm6", ["sm", "6"]],
  ["madd9", ["m", "add9"]],
  ["madd11", ["m", "add11"]],
  ["maddb9", ["m", "add♭9"]],
  ["smadd9", ["sm", "add9"]],
  ["smadd11", ["sm", "add11"]],
  ["smaddb9", ["sm", "add♭9"]],
  // 22 octobre 2026 : 6 en taille normale, add♯11 en exposant.
  ["6add#11", ["6", "add♯11"]],
  ["maj7#11", ["maj7", "♯11"]],
  ["maj9#11", ["maj9", "♯11"]],
  ["maj7#5", ["maj7", "♯5"]],
  ["m(maj7)", ["m", "maj7"]],
  ["m(maj9)", ["m", "maj9"]],
  ["Fr+6", ["Fr", "+6"]],
  ["Gr+6", ["Gr", "+6"]],
  ["Fr/Ger+6", ["Fr/Ger", "+6"]],
  ["9#11", ["9", "♯11"]],
  ["7b13", ["7", "♭13"]],
  ["9b13", ["9", "♭13"]],
  ["7no3", ["7", "no3"]],
  ["9no3", ["9", "no3"]],
  ["m7b5", ["m7", "♭5"]],
  ["m7b9", ["m7", "♭9"]],
]);

function appendConsequentChordName(container, value) {
  const parts = CONSEQUENT_CHORD_NAME_PARTS.get(value);
  if (!parts) {
    container.textContent = String(value)
      .replace(/#(?=\d)/g, "♯")
      .replace(/b(?=\d)/g, "♭");
    return;
  }
  container.append(document.createTextNode(parts[0]));
  const suffix = document.createElement("span");
  suffix.className = "mode-chord-suffix";
  suffix.textContent = parts[1];
  container.append(suffix);
}

function createModeChordRows(mode, tonicRatio, highlightedPitches, gridWeights, slots, dimChordInformation = false) {
  const functionRow = document.createElement("div");
  functionRow.className = "mode-chord-function-row";
  const chordRow = document.createElement("div");
  chordRow.className = "mode-chord-name-row";
  MODE_FAMILY_BOUNDARIES.forEach((gridLine) => {
    appendGridBoundary(functionRow, gridLine, "mode-family-boundary", gridWeights);
    appendGridBoundary(chordRow, gridLine, "mode-family-boundary", gridWeights);
  });
  modeChordApi.analyzeModeChords(mode, chordData).forEach((occurrence) => {
    const degreeLabel = modeDegreeLabel(occurrence.degreeRatio, occurrence.degreeIndex);
    const absolutePitch = multiplyAndReduce(tonicRatio, occurrence.degreeRatio) ?? occurrence.degreeRatio;
    const isContextPitch = dimChordInformation
      || Boolean(highlightedPitches && !highlightedPitches.has(absolutePitch));
    const isTonicFunction = occurrence.degreeIndex === 0;

    const functionCell = document.createElement("div");
    functionCell.className = "mode-chord-function";
    functionCell.classList.toggle("is-characteristic", isTonicFunction);
    functionCell.classList.toggle("is-function-context", isContextPitch);
    appendDegreeLabel(
      functionCell,
      modeChordApi.romanDegreeLabel(degreeLabel, occurrence.quality),
    );
    placeOnModeGrid(functionCell, degreeLabel, slots);
    functionRow.append(functionCell);

    const chordCell = document.createElement("div");
    chordCell.className = "mode-chord-name";
    chordCell.classList.toggle("is-characteristic", isTonicFunction);
    chordCell.classList.toggle("is-function-context", isContextPitch);
    occurrence.chordNames.forEach((chordName) => {
      const line = document.createElement("span");
      line.className = "mode-chord-name-line";
      appendConsequentChordName(line, chordName);
      chordCell.append(line);
    });
    placeOnModeGrid(chordCell, degreeLabel, slots);
    chordRow.append(chordCell);
  });
  return { chordRow, functionRow };
}

function octavePitchSet(ratios) {
  // Compare exact pitches modulo octaves, without collapsing comma variants.
  return new Set([...ratios].map((ratio) => multiplyAndReduce(ratio, "1/1")).filter(Boolean));
}

function modeTableTetrachordStarts(mode, tonicRatio = state.selectedTonic, selectedTetrachord = null) {
  const neutralDimension = networkDimensionKey(appliedNetworkConfiguration.generatorRatio);
  // L'appartenance h3 se mesure dans le réseau actif, modulo octaves et quintes.
  // Elle ne dépend ni de l'orthographe tempérée ni des limites visibles du réseau.
  const preferredStartIndices = mode.ratios.slice(0, -1).flatMap((ratio, index) => {
    const pitch = tonicRatio ? multiplyAndReduce(tonicRatio, ratio) : null;
    return pitch && networkDimensionKey(pitch) === neutralDimension ? [index] : [];
  });
  return modeTetrachordApi.preferredTetrachordStarts(mode, { preferredStartIndices, selectedTetrachord });
}

function normalizedTableFifths(value) {
  const count = Number(value);
  return Number.isInteger(count) && count >= 0 && count <= MAX_TABLE_FIFTHS ? count : 0;
}

function modeTableFifthsAvailable() {
  return state.catalog === "modes" && Boolean(state.selectedTonic && state.selectedFamily && selectedModeById());
}

function modeTableFifthRows(mode = selectedModeById()) {
  if (!modeTableFifthsAvailable() || !mode) return [];
  const rows = [{ tonicRatio: state.selectedTonic, fifthOffset: 0 }];
  for (const [direction, count, interval] of [
    [1, normalizedTableFifths(state.tableFifthsAbove), "3/2"],
    [-1, normalizedTableFifths(state.tableFifthsBelow), "4/3"],
  ]) {
    let tonic = state.selectedTonic;
    for (let distance = 1; distance <= count; distance += 1) {
      tonic = multiplyAndReduce(tonic, interval);
      // Keep exact fifth distances, including gaps: an unavailable mode does
      // not become another variant, nor prevent later valid rows appearing.
      if (networkAdmitsModeAtTonic(tonic, mode)) {
        rows.push({ tonicRatio: tonic, fifthOffset: direction * distance });
      }
    }
  }
  return rows.sort((first, second) => second.fifthOffset - first.fifthOffset);
}

function modeTableHasFifthRows() {
  return state.showTablePanel && modeTableFifthRows().length > 1;
}

function renderSelectedModeTable(mode, options = {}) {
  const tonicRatio = options.tonicRatio ?? state.selectedTonic;
  const highlightedPitches = options.highlightedPitches ? octavePitchSet(options.highlightedPitches) : null;
  const dimChordInformation = Boolean(options.dimChordInformation);
  const dimOctave = Boolean(options.dimOctave);
  const dimFirst = Boolean(options.dimFirst);
  const model = document.createElement("div");
  model.className = "mode-model";
  if (highlightedPitches) model.classList.add("is-function-preview");
  const gridWeights = MODE_TABLE_GRID_WEIGHTS;
  const slots = MODE_TABLE_SLOTS;
  model.style.setProperty(
    "--mode-table-grid",
    gridWeights.map((value) => `${value}fr`).join(" "),
  );

  const degreeRow = document.createElement("div");
  degreeRow.className = "mode-degree-row";
  const { chordRow, functionRow } = createModeChordRows(
    mode,
    tonicRatio,
    highlightedPitches,
    gridWeights,
    slots,
    dimChordInformation,
  );
  const pitchBody = document.createElement("div");
  pitchBody.className = "mode-pitch-body";
  const ratioRow = document.createElement("div");
  ratioRow.className = "mode-ratio-row";
  const tonicRows = options.tonicRows?.length
    ? options.tonicRows
    : [{ tonicRatio, fifthOffset: 0 }];
  model.classList.toggle("has-fifth-rows", tonicRows.length > 1);

  MODE_FAMILY_BOUNDARIES.forEach((gridLine) => {
    appendGridBoundary(degreeRow, gridLine, "mode-family-boundary", gridWeights);
  });

  mode.ratios.forEach((ratio, index) => {
    const degreeLabel = modeDegreeLabel(ratio, index);
    const absolutePitch = multiplyAndReduce(tonicRatio, ratio) ?? ratio;
    const isContextPitch = Boolean(highlightedPitches && !highlightedPitches.has(absolutePitch))
      || (dimOctave && index === mode.ratios.length - 1)
      || (dimFirst && index === 0);
    const degree = document.createElement("div");
    degree.className = "mode-degree";
    degree.classList.toggle("is-function-context", isContextPitch);
    appendDegreeLabel(degree, degreeLabel);
    placeOnModeGrid(degree, degreeLabel, slots);
    degreeRow.append(degree);

    const ratioCell = document.createElement("div");
    ratioCell.className = "mode-ratio-cell";
    ratioCell.classList.toggle("is-function-context", isContextPitch);
    placeOnModeGrid(ratioCell, degreeLabel, slots);
    ratioCell.append(createColorizedRatio(ratio));
    ratioRow.append(ratioCell);

  });

  const hejiRows = tonicRows.map((row) => {
    const hejiRow = document.createElement("div");
    hejiRow.className = "mode-heji-row";
    hejiRow.dataset.tonicRatio = row.tonicRatio;
    hejiRow.dataset.fifthOffset = String(row.fifthOffset);
    hejiRow.classList.toggle("is-selected-tonic", tonicRows.length > 1 && row.fifthOffset === 0);
    hejiRow.setAttribute("role", "group");
    hejiRow.setAttribute("aria-label", row.fifthOffset === 0
      ? "Mode sur la tonique sélectionnée"
      : `${Math.abs(row.fifthOffset)} quinte${Math.abs(row.fifthOffset) > 1 ? "s" : ""} ${row.fifthOffset > 0 ? "au-dessus" : "au-dessous"}`);
    mode.ratios.forEach((ratio, index) => {
      const absolutePitch = multiplyAndReduce(row.tonicRatio, ratio) ?? ratio;
      const isContextPitch = Boolean(highlightedPitches && !highlightedPitches.has(absolutePitch))
        || (dimOctave && index === mode.ratios.length - 1)
        || (dimFirst && index === 0);
      const hejiCell = document.createElement("button");
      hejiCell.type = "button";
      hejiCell.className = "mode-heji-cell";
      hejiCell.classList.toggle("is-function-context", isContextPitch);
      placeOnModeGrid(hejiCell, modeDegreeLabel(ratio, index), slots);
      // Cents and HEJI belong to this exact row, independently of graph display.
      hejiCell.append(createHejiPitch(absolutePitch, state.showTableCents));
      const audioRatio = contextualModeAudioRatio(row.tonicRatio, ratio) ?? ratio;
      configureSoundTrigger(hejiCell, audioRatio, { preserveRegister: true });
      hejiRow.append(hejiCell);
    });
    return hejiRow;
  });

  // Le bord gauche représente un départ à 1/1; seuls les autres départs
  // de la paire retenue selon h3 et la sélection demandent un pointillé.
  modeTableTetrachordStarts(mode, tonicRatio, options.selectedTetrachord).filter((index) => index > 0).forEach((index) => {
    const degreeLabel = modeDegreeLabel(mode.ratios[index], index);
    appendGridBoundary(
      pitchBody,
      modeSlot(degreeLabel, slots)[0],
      "mode-tetrachord-start",
      gridWeights,
    );
  });

  const proportions = document.createElement("div");
  proportions.className = "mode-proportions";
  const isHighlightedInterval = highlightedPitches
    ? (lowerRatio, upperRatio) => (
      highlightedPitches.has(multiplyAndReduce(tonicRatio, lowerRatio))
      && highlightedPitches.has(multiplyAndReduce(tonicRatio, upperRatio))
    )
    : null;
  proportions.append(
    createProportionRow(
      mode.ratios,
      1,
      "Secondes",
      false,
      gridWeights,
      slots,
      isHighlightedInterval,
    ),
    createProportionRow(
      mode.ratios,
      2,
      "Tierces",
      true,
      gridWeights,
      slots,
      isHighlightedInterval,
    ),
  );
  pitchBody.append(ratioRow, ...hejiRows);
  model.append(functionRow, chordRow, degreeRow, pitchBody, proportions);
  elements.tableContent.append(model);
}

function renderConcordantTable(family, explicitRatios = null) {
  const model = document.createElement("div");
  model.className = "concordant-linear";
  const ratios = (explicitRatios ?? ["1/1", ...family.concordant])
    .slice()
    .sort((first, second) => ratioCents(first) - ratioCents(second));
  const rawDegreeLabels = ratios.map(concordantDegreeLabel);
  const mergeSharpFiveAndFlatSix = rawDegreeLabels.includes("♯5") && rawDegreeLabels.includes("♭6");
  const degreeLabels = rawDegreeLabels.map((label) => (
    mergeSharpFiveAndFlatSix && (label === "♯5" || label === "♭6")
      ? "♯5/♭6"
      : label
  ));
  const groupBoundaries = degreeLabels
    .map((label, index) => (index > 0 && label !== degreeLabels[index - 1] ? index : null))
    .filter((index) => index !== null);
  model.style.setProperty("--concordant-count", String(ratios.length));
  const preferredWidth = ratios.length * 58;
  // Remplit toute la place disponible (comme sur le site du 10 octobre); les colonnes
  // s'élargissent également. Les deux bordures sont comprises dans le minimum.
  model.style.width = "100%";
  model.style.minWidth = `${preferredWidth + 2}px`;
  elements.tableSection.style.setProperty("--table-preferred-width", `${preferredWidth}px`);

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

    if (state.showTableCents) {
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
    }
  });

  // Le modèle A2 reste toujours complet, indépendamment de l'affichage du
  // réseau, afin de préserver l'analyse des concordances.
  model.append(degreeRow, ratioRow, pitchRow);
  if (state.showTableCents) model.append(centsRow);
  groupBoundaries.forEach((index) => {
    const boundary = document.createElement("span");
    boundary.className = "concordant-group-line";
    boundary.setAttribute("aria-hidden", "true");
    boundary.style.left = `${(index / ratios.length) * 100}%`;
    model.append(boundary);
  });
  elements.tableContent.append(model);
  requestAnimationFrame(updateConcordantTableOverflow);
}

function updateConcordantTableOverflow() {
  const model = elements.tableContent.querySelector(".concordant-linear");
  elements.tableScroll.classList.remove("is-overflowing");
  if (!model || !elements.tableSection.classList.contains("is-concordant")) return;
  elements.tableScroll.classList.toggle(
    "is-overflowing",
    model.scrollWidth > elements.tableScroll.clientWidth + 1,
  );
}

function prepareSimpleTableSection() {
  elements.tableSection.hidden = false;
  elements.tableSection.classList.remove("is-concordant");
  elements.tableScroll.classList.remove("is-overflowing");
  elements.tableSection.style.removeProperty("--table-preferred-width");
}

function renderNeutralTonicTable() {
  prepareSimpleTableSection();
  elements.tableTitle.textContent = "";
  const model = document.createElement("div");
  model.className = "mode-model is-neutral";
  model.style.setProperty(
    "--mode-table-grid",
    MODE_TABLE_GRID_WEIGHTS.map((value) => `${value}fr`).join(" "),
  );

  const degreeRow = document.createElement("div");
  degreeRow.className = "mode-degree-row";
  MODE_FAMILY_BOUNDARIES.forEach((gridLine) => {
    appendGridBoundary(degreeRow, gridLine, "mode-family-boundary", MODE_TABLE_GRID_WEIGHTS);
  });
  const degree = document.createElement("div");
  degree.className = "mode-degree";
  appendDegreeLabel(degree, "1");
  placeOnModeGrid(degree, "1");
  degreeRow.append(degree);

  const pitchBody = document.createElement("div");
  pitchBody.className = "mode-pitch-body";
  const ratioRow = document.createElement("div");
  ratioRow.className = "mode-ratio-row";
  const hejiRow = document.createElement("div");
  hejiRow.className = "mode-heji-row";
  const pitch = document.createElement("button");
  pitch.type = "button";
  pitch.className = "mode-heji-cell";
  placeOnModeGrid(pitch, "1");
  pitch.append(createHejiPitch(state.selectedTonic, false));
  configureSoundTrigger(pitch, "1/1", { preserveRegister: true });
  hejiRow.append(pitch);
  pitchBody.append(ratioRow, hejiRow);

  const proportions = document.createElement("div");
  proportions.className = "mode-proportions";
  for (let index = 0; index < 2; index += 1) {
    const emptyRow = document.createElement("div");
    emptyRow.className = "proportion-row is-empty";
    proportions.append(emptyRow);
  }
  model.append(degreeRow, pitchBody, proportions);
  elements.tableContent.append(model);
}

function renderIntervalTable() {
  if (!state.intervalSelection) {
    renderNeutralTonicTable();
    return;
  }
  const context = intervalContextForSelection();
  if (!context) {
    renderNeutralTonicTable();
    return;
  }
  prepareSimpleTableSection();
  const upperPitch = multiplyAndReduce(context.anchorTonic, context.entry.ratio);
  const highlightedPitches = new Set([context.anchorTonic, upperPitch].filter(Boolean));
  elements.tableTitle.textContent = `${context.entry.proportion} — ${context.entry.intervalName} — ${formatModeLabel(context.mode.label)}`;
  renderSelectedModeTable(context.mode, {
    highlightedPitches,
    tonicRatio: context.modeTonic,
  });
}

function renderModeTable() {
  elements.tableContent.replaceChildren();
  elements.tableScroll.classList.remove("is-overflowing");
  elements.tableSection.dataset.displayMode = state.showTableCents ? "heji-cents" : "heji";
  if (!state.selectedTonic || !state.selectedFamily) {
    elements.tableSection.hidden = true;
    elements.tableSection.classList.remove("is-concordant");
    elements.tableTitle.textContent = "";
    return;
  }

  if (catalogOverviewSelected()) {
    const ratios = catalogOverviewRatios();
    if (!ratios.length) {
      elements.tableSection.hidden = true;
      elements.tableSection.classList.remove("is-concordant");
      elements.tableSection.style.removeProperty("--table-preferred-width");
      elements.tableTitle.textContent = "";
      return;
    }
    elements.tableSection.hidden = false;
    elements.tableSection.classList.add("is-concordant");
    elements.tableTitle.textContent = "Tout";
    renderConcordantTable(FAMILY_DEFINITIONS[state.selectedFamily], ratios);
    return;
  }

  if (state.catalog === "tetracordes") {
    const context = tetrachordContextForSelection();
    if (!context) {
      elements.tableSection.hidden = true;
      elements.tableSection.classList.remove("is-concordant");
      elements.tableSection.style.removeProperty("--table-preferred-width");
      elements.tableTitle.textContent = "";
      return;
    }
    prepareSimpleTableSection();
    elements.tableTitle.textContent = `${context.entry.code} — ${formatModeLabel(context.mode.label)}`;
    renderSelectedModeTable(context.mode, {
      highlightedPitches: tetrachordHighlightedPitches(context),
      tonicRatio: context.modeTonic,
      selectedTetrachord: { code: context.entry.code, startIndex: context.lowerIndex },
      dimChordInformation: true,
      // Le degré 8 reste en filigrane, sauf quand le tétracorde s'y termine : il fait alors partie
      // de la suite de notes consécutives, et c'est le degré 1 qui passe en filigrane, comme pour
      // un intervalle (décision de Simon, 16 octobre 2026).
      dimOctave: !tetrachordEndsOnOctave(context),
      dimFirst: tetrachordEndsOnOctave(context) && context.lowerIndex > 0,
    });
    return;
  }
  if (state.catalog === "intervalles") {
    renderIntervalTable();
    return;
  }

  if (state.catalog === "accords") {
    renderChordDetails();
    return;
  }

  elements.tableSection.hidden = false;
  const selectedMode = selectedModeById();
  if (selectedMode) {
    elements.tableSection.classList.remove("is-concordant");
    elements.tableSection.style.removeProperty("--table-preferred-width");
    renderColorizedModeTitle(selectedMode);
    renderSelectedModeTable(selectedMode, { tonicRows: modeTableFifthRows(selectedMode) });
  } else {
    renderNeutralTonicTable();
  }
}

function modesAvailableForTonic(tonic) {
  if (!tonic || !TONIC_RATIO_SET.has(tonic)) return [];
  return MODE_PRESETS.filter((mode) => networkAdmitsModeAtTonic(tonic, mode));
}

function selectedModeById(modeId = state.selectedModeId) {
  if (!modeId || modeId === ALL_SELECTION_ID) return null;
  return MODE_PRESETS.find((mode) => mode.id === modeId) ?? null;
}

function selectableModesAvailableForTonic(tonic = state.selectedTonic) {
  return modesAvailableForTonic(tonic);
}

const MODE_ROTATION_DEGREE_LABELS = ["I", "II", "III", "IV", "V", "VI", "VII"];

function rotatedModeRatios(mode, startIndex) {
  const scaleLength = mode?.ratios?.length - 1;
  const root = parseFraction(mode?.ratios?.[startIndex] ?? "");
  if (!root || scaleLength !== 7 || startIndex < 1 || startIndex >= scaleLength) return [];
  const rotated = [];
  for (let offset = 0; offset < scaleLength; offset += 1) {
    const absoluteIndex = startIndex + offset;
    const ratio = parseFraction(mode.ratios[absoluteIndex % scaleLength]);
    if (!ratio) return [];
    const octaveMultiplier = absoluteIndex >= scaleLength ? 2n : 1n;
    rotated.push(fractionToString(simplify({
      numerator: ratio.numerator * octaveMultiplier * root.denominator,
      denominator: ratio.denominator * root.numerator,
    })));
  }
  return [...rotated, "2/1"];
}

function exactModeRotationRelations(targetMode) {
  if (!targetMode) return [];
  const targetKey = targetMode.ratios.join("|");
  return MODE_PRESETS.flatMap((sourceMode) => {
    if (sourceMode.id === targetMode.id) return [];
    return MODE_ROTATION_DEGREE_LABELS.slice(1).flatMap((degree, offset) => {
      const startIndex = offset + 1;
      return rotatedModeRatios(sourceMode, startIndex).join("|") === targetKey
        ? [{ degree, degreeRatio: sourceMode.ratios[startIndex], sourceMode, startIndex }]
        : [];
    });
  });
}

function renderModeRotationControl() {
  const visible = state.catalog === "modes" && Boolean(state.selectedTonic && state.selectedFamily);
  elements.modeRotationControl.hidden = !visible;
  if (!visible) return;
  const selectedMode = selectedModeById();
  const relations = exactModeRotationRelations(selectedMode);
  elements.modeRotationDetails.replaceChildren();
  if (!selectedMode || !relations.length) {
    elements.modeRotationDetails.setAttribute("aria-label", "Aucune rotation exacte pour le mode sélectionné");
    elements.modeRotationDetails.title = "";
    return;
  }
  const heading = document.createElement("span");
  heading.className = "mode-rotation-heading";
  heading.textContent = "Rotation :";
  elements.modeRotationDetails.append(heading);
  const descriptions = [];
  relations.forEach(({ degree, sourceMode }) => {
    const entry = document.createElement("span");
    entry.className = "mode-rotation-entry";
    const relation = document.createElement("span");
    relation.className = "mode-rotation-relation";
    relation.append(document.createTextNode(`${degree} de ${formatModeLabel(sourceMode.family)} `));
    appendColorizedModeLimit(relation, modeSpecificLabel(sourceMode));
    const description = `${formatModeLabel(selectedMode.label)} est le degré ${degree} de ${formatModeLabel(sourceMode.label)}`;
    entry.setAttribute("aria-label", description);
    descriptions.push(description);
    entry.append(relation);
    elements.modeRotationDetails.append(entry);
  });
  const accessibleDescription = descriptions.join("; ");
  elements.modeRotationDetails.setAttribute("aria-label", accessibleDescription);
  elements.modeRotationDetails.title = accessibleDescription;
}

function intervalModeContextSelection() {
  const context = state.intervalModeContext;
  const mode = context?.modeId
    ? MODE_PRESETS.find((candidate) => candidate.id === context.modeId)
    : null;
  return mode && context.modeTonic
    ? { ...context, familyKey: TONIC_FAMILY_BY_RATIO.get(context.modeTonic), mode }
    : null;
}

function modesAvailableForCurrentFamily() {
  const modes = modesAvailableForTonic(state.selectedTonic);
  const intervalContext = intervalModeContextSelection();
  if (
    intervalContext
    && intervalContext.modeTonic === state.selectedTonic
    && !modes.some((mode) => mode.id === intervalContext.mode.id)
  ) {
    modes.push(intervalContext.mode);
  }
  return modes;
}

// Dans les tableaux, les modes de la gamme majeure gardent leur nom entier;
// les autres suivent les abréviations des tableaux synthèses du Traité.
const MODE_FAMILY_ABBREVIATIONS = new Map([
  ["Lydien", "Lydien"],
  ["Ionien", "Ionien"],
  ["Mixolydien", "Mixolydien"],
  ["Dorien", "Dorien"],
  ["Éolien", "Éolien"],
  ["Phrygien", "Phrygien"],
  ["Lydien #5", "Lyd. ♯5"],
  ["Lydien b7", "Lyd. ♭7"],
  ["Mineur mélodique", "min. m."],
  ["Mixolydien b6", "Mixo. ♭6"],
  ["Dorien b2", "Dor. ♭2"],
  ["Ionien #5", "Ionien ♯5"],
  ["Dorien #4", "Dor. ♯4"],
  ["Mineur harmonique", "min. h."],
  ["Phrygien 3", "Phryg. 3"],
  ["Lydien b3", "Lyd. ♭3"],
  ["Majeure harmonique", "Maj. h."],
  ["Mixolydien b2", "Mixo. ♭2"],
  ["Phrygien b4", "Phryg. ♭4"],
  ["Mineur harmonique #4", "min. h. ♯4"],
  ["Double harmonique majeur", "D.H.M."],
  ["Éolien #4", "Éolien ♯4"],
  ["Napolitain mineur", "Nap. m."],
  ["Lydien dom. b6", "Lyd. dom. ♭6"],
  ["Napolitain majeur", "Nap. M."],
].map(([name, label]) => [formatModeLabel(name), label]));

const MODE_GROUP_ABBREVIATIONS = new Map([
  ["Majeure", "Majeure"],
  ["Mineure mélodique", "min. m."],
  ["Mineure harmonique", "min. h."],
  ["Majeure harmonique", "Maj. h."],
  ["Double harmonique majeure", "D.H.M."],
  ["Napolitaine mineure", "Nap. m."],
  ["Napolitaine majeure", "Nap. M."],
]);

// Sélection autoritaire du document 260730_MODES_selection : le calculateur
// général reste complet, mais le panneau ne propose que ces couples tonique–mode.
// Classes de hauteur : A=0, B=2, C=3, D=5, E=7, F=8, G=10.
const CURATED_MODULATION_TONIC_PITCH_CLASSES = new Map([
  ["Lydien", new Set([2, 3, 5, 7, 8, 10])],
  ["Ionien", new Set([2, 3, 5, 7, 8, 10])],
  ["Mixolydien", new Set([3, 5, 10])],
  ["Dorien", new Set([3, 5, 10])],
  ["Éolien", new Set([2, 3, 5, 7, 8, 10])],
  ["Phrygien", new Set([2, 3, 5, 7, 8, 10])],
  ["Lydien #5", new Set([2, 3, 5, 7, 8, 10])],
  ["Lydien b7", new Set([3, 5, 10])],
  ["Mineur mélodique", new Set([3, 5, 10])],
  ["Mixolydien b6", new Set([3, 5, 10])],
  ["Dorien b2", new Set([3, 5, 10])],
  ["Ionien #5", new Set([2, 3, 5, 7, 8, 10])],
  ["Dorien #4", new Set([3, 5, 10])],
  ["Mineur harmonique", new Set([3, 5, 10])],
  ["Phrygien 3", new Set([3, 5, 10])],
  ["Lydien b3", new Set([3, 5, 10])],
  ["Majeure harmonique", new Set([3, 5, 10])],
  ["Mixolydien b2", new Set([3, 5, 10])],
  ["Phrygien b4", new Set([2, 3, 5, 7, 8, 10])],
  ["Mineur harmonique #4", new Set([3, 5, 8, 10])],
  ["Double harmonique majeur", new Set([0, 3, 5, 10])],
  ["Éolien #4", new Set([3, 5, 8, 10])],
  ["Napolitain mineur", new Set([0, 3, 5, 10])],
  ["Lydien dom. b6", new Set([3, 5, 8, 10])],
  ["Napolitain majeur", new Set([3, 5, 10])],
]);

function modeFamilyAbbreviationFromName(modeName) {
  // Les analyses arrivent tantôt avec b/#, tantôt déjà composées en ♭/♯.
  const normalizedName = formatModeLabel(modeName);
  return MODE_FAMILY_ABBREVIATIONS.get(normalizedName) ?? normalizedName;
}

function modulationModeNameWithoutLimit(modeName) {
  return formatModeLabel(modeName)
    .replace(/\s+L(?:5|7|11|13)(?:sm|m)?\b/g, "")
    .trim();
}

function modulationModeLabelFromName(modeName) {
  const nameWithoutLimit = modulationModeNameWithoutLimit(modeName);
  return modeFamilyAbbreviationFromName(nameWithoutLimit);
}

function intervalFunctionModeLabel(mode) {
  return modeFamilyAbbreviation(mode);
}

function modeGroupPresentation(group) {
  if (!group) return null;
  const order = MODE_GROUPS.findIndex((candidate) => candidate.label === group);
  return {
    full: formatModeLabel(group),
    order: order < 0 ? MODE_GROUPS.length : order,
    short: MODE_GROUP_ABBREVIATIONS.get(group) ?? formatModeLabel(group),
  };
}

function functionMatrixScaleGroup(row) {
  const groups = new Set(
    [...row.cells.values()].flat().map((entry) => (
      entry.context?.mode.group
      ?? entry.occurrence?.mode.group
      ?? entry.modeGroup?.group
    )).filter(Boolean),
  );
  if (groups.size !== 1) return null;
  const [group] = groups;
  return modeGroupPresentation(group);
}

function compareFunctionMatrixRows(first, second) {
  const firstGroup = functionMatrixScaleGroup(first);
  const secondGroup = functionMatrixScaleGroup(second);
  return (firstGroup?.order ?? MODE_GROUPS.length) - (secondGroup?.order ?? MODE_GROUPS.length)
    || second.cells.size - first.cells.size
    || first.index - second.index;
}

function modulationTonicPitchClassIsIncluded(modeName, tonicPitchClass) {
  if (tonicPitchClass === 0) return true;
  return CURATED_MODULATION_TONIC_PITCH_CLASSES.get(modeName)?.has(tonicPitchClass) ?? false;
}

function modeFamilyAbbreviation(mode) {
  return modeFamilyAbbreviationFromName(mode.family);
}

function modeFamilyTriggerLabel(mode) {
  return modeFamilyAbbreviation(mode);
}

function availableModeFamilies(modes) {
  const families = [];
  MODE_GROUPS.forEach((group) => {
    group.families.forEach((family) => {
      const variants = modes.filter((mode) => (
        mode.group === group.label && mode.family === family.label
      ));
      if (variants.length) families.push({ family, group, variants: variants.sort(compareModeVariants) });
    });
  });
  return families;
}

function modeLimitNumber(mode) {
  return Number(modeSpecificLabel(mode).match(/^L(5|7|11|13)/)?.[1] ?? 99);
}

function cloneNetworkConfiguration(configuration) {
  return JSON.parse(JSON.stringify(configuration));
}

function networkPresetId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `reseau-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function legacyFamilyFunctions(familyKey, familySource) {
  if (!familySource?.enabled && !familySource?.manualEnabled) {
    return [...OPTIONAL_MODAL_FUNCTION_RATIOS];
  }
  const harmonics = familySource.harmonics ?? [];
  const ratios = new Set(["3/2"]);
  MODE_PRESETS.forEach((mode) => {
    if (!mode.ratios.every((ratio) => networkModel.ratioUsesPermittedHarmonics(ratio, harmonics))) return;
    mode.ratios.forEach((ratio) => ratios.add(ratio));
  });
  if (familyKey === "h3" && harmonics.includes(5)) ratios.add("10/7");
  return OPTIONAL_MODAL_FUNCTION_RATIOS.filter((ratio) => ratios.has(ratio));
}

function normalizeNetworkConfiguration(configuration, fallbackId = networkPresetId()) {
  const source = configuration && typeof configuration === "object" ? configuration : {};
  const inferredScope = /^tfp\b/i.test(String(source.name ?? ""))
    ? "tfp"
    : /^(?:tfe|touche)\b/i.test(String(source.name ?? ""))
      || /^touche-/i.test(String(source.id ?? ""))
      ? "tfe"
      : "global";
  const legacyReferenceRatio = NETWORK_REFERENCE_RATIO_SET.has(String(source.referenceRatio))
    ? String(source.referenceRatio)
    : DEFAULT_NETWORK_CONFIGURATION.referenceRatio;
  const parsedGenerator = parseFraction(String(source.generatorRatio ?? ""));
  const legacyGeneratorRatio = parsedGenerator
    ? fractionToString(reduceToOctave(parsedGenerator))
    : DEFAULT_NETWORK_CONFIGURATION.generatorRatio;
  // Le La bécarre est désormais la seule référence du diapason. Les anciens
  // réseaux qui déplaçaient la référence conservent leur note de 1/1 : leur
  // décalage est reporté une seule fois sur la tonique et ses hauteurs.
  const generatorRatio = multiplyAndReduce(legacyReferenceRatio, legacyGeneratorRatio)
    ?? legacyGeneratorRatio;
  const normalized = {
    id: String(source.id || fallbackId),
    name: String(source.name || "Nouveau réseau").trim().slice(0, 60) || "Nouveau réseau",
    scope: ["global", "tfe", "tfp"].includes(source.scope) ? source.scope : inferredScope,
    diapasonHz: Math.min(480, Math.max(400, Math.round(Number(source.diapasonHz) || 440))),
    referenceRatio: "1/1",
    generatorRatio,
    sourceMethod: source.sourceMethod === "scala" ? "scala" : "configure",
    scalaText: typeof source.scalaText === "string" ? source.scalaText.slice(0, 32768) : "",
    // Ratios relatifs à la tonique d'accueil. null : toutes les notes saisies.
    selectedTonicRatios: Array.isArray(source.selectedTonicRatios)
      ? [...new Set(source.selectedTonicRatios.map(String).map((ratio) => {
        const fraction = parseFraction(ratio);
        return fraction && fraction.numerator > 0n && fraction.denominator > 0n
          ? fractionToString(reduceToOctave(fraction)) : null;
      }).filter(Boolean))] : null,
    abstractFretPlanId: tfeFretPlanPreset(source.abstractFretPlanId)?.id ?? null,
    savedFrettierSnapshot: source.savedFrettierSnapshot?.kind === "tfe"
      ? source.savedFrettierSnapshot : null,
    // D3 : transposition h3 d'un modèle TFP, créée par la fenêtre de choix des touches.
    ...(typeof source.transposedFrom === "string" && source.transposedFrom ? { transposedFrom: source.transposedFrom } : {}),
    // La liste précise n'est plus configurable dans le Réseau : elle reste
    // l'inventaire de référence utilisé pour construire les menus.
    concordances: [...NETWORK_CONCORDANCE_RATIOS],
    excludedModeIds: Array.isArray(source.excludedModeIds)
      ? [...new Set(source.excludedModeIds.map(String))]
        .filter((id) => MODE_PRESETS.some((mode) => mode.id === id))
      : [],
    families: {},
  };
  NETWORK_FAMILY_ORDER.forEach((familyKey) => {
    const familySource = source.families?.[familyKey] ?? DEFAULT_NETWORK_CONFIGURATION.families[familyKey];
    const blueprint = NETWORK_FAMILY_BLUEPRINTS[familyKey];
    const manualEnabled = blueprint.locked
      ? true
      : typeof familySource?.manualEnabled === "boolean"
        ? familySource.manualEnabled
        : Boolean(familySource?.enabled);
    const family = {
      enabled: manualEnabled,
      manualEnabled,
      negative: Math.min(8, Math.max(0, Math.round(Number(familySource?.negative) || 0))),
      positive: Math.min(8, Math.max(0, Math.round(Number(familySource?.positive) || 0))),
      harmonics: NETWORK_HARMONICS.filter((harmonic) => familySource?.harmonics?.includes(harmonic)),
    };
    const candidateConfiguration = { ...normalized, families: {
      ...normalized.families, [familyKey]: { ...family, enabled: true },
    } };
    const candidates = generatedFamilyTonics(candidateConfiguration, familyKey);
    const selectedTonics = Array.isArray(familySource?.selectedTonics)
      ? familySource.selectedTonics.map((tonic) => (
        legacyReferenceRatio === "1/1"
          ? tonic
          : multiplyNetworkRatio(tonic, legacyReferenceRatio)
      ))
      : null;
    family.selectedTonics = selectedTonics
      ? candidates.filter((tonic) => selectedTonics.includes(tonic))
      : candidates;
    family.functions = Array.isArray(familySource?.functions)
      ? OPTIONAL_MODAL_FUNCTION_RATIOS.filter((ratio) => familySource.functions.includes(ratio))
      : legacyFamilyFunctions(familyKey, familySource);
    normalized.families[familyKey] = family;
  });
  if (normalized.sourceMethod === "scala") {
    normalized.scalaRatios = networkModel.parseNetworkRatios(normalized.scalaText).ratios;
    if (normalized.selectedTonicRatios !== null) {
      normalized.selectedTonicRatios = normalized.selectedTonicRatios
        .filter((ratio) => normalized.scalaRatios.includes(ratio));
    }
    if (normalized.abstractFretPlanId) {
      const canonical = DEFAULT_TOUCH_NETWORK_CONFIGURATIONS.find((preset) => (
        preset.abstractFretPlanId === normalized.abstractFretPlanId
      ));
      const canonicalRatios = canonical
        ? networkModel.parseNetworkRatios(canonical.scalaText).ratios : [];
      if (normalized.generatorRatio !== "1/1"
        || normalized.scalaRatios.length !== canonicalRatios.length
        || normalized.scalaRatios.some((ratio, index) => ratio !== canonicalRatios[index])) {
        normalized.abstractFretPlanId = null;
      }
    }
  }
  synchronizeNetworkConfiguration(normalized);
  // Reconstituer les choix des autres familles depuis le bassin historique.
  // La famille 1/1* admet, elle, toutes les fonctions modales du Traité.
  if (normalized.id === DEFAULT_NETWORK_CONFIGURATION.id
    && normalized.sourceMethod === "configure"
    && NETWORK_FAMILY_ORDER.every((key) => !Array.isArray(source.families?.[key]?.functions))) {
    maximizeFunctionsWithinCurrentPool(normalized);
    normalized.families.h3.functions = [...OPTIONAL_MODAL_FUNCTION_RATIOS];
    configuredNetworkPitchCache.delete(normalized);
    configuredNetworkPitchSetCache.delete(normalized);
  }
  return normalized;
}

function maximizeFunctionsWithinCurrentPool(configuration) {
  const referencePitches = new Set(fullNetworkPitchRatios(configuration));
  NETWORK_FAMILY_ORDER.forEach((familyKey) => {
    const family = configuration.families[familyKey];
    if (!family.enabled) return;
    family.functions = OPTIONAL_MODAL_FUNCTION_RATIOS.filter((ratio) => (
      family.selectedTonics.every((tonic) => (
        referencePitches.has(multiplyAndReduce(tonic, ratio))
      ))
    ));
  });
  configuredNetworkPitchCache.delete(configuration);
  configuredNetworkPitchSetCache.delete(configuration);
}

const importedNetworkPitchCache = new WeakMap();

function importedNetworkPitchSet(configuration = appliedNetworkConfiguration) {
  const key = `${configuration.referenceRatio}|${configuration.generatorRatio}|${configuration.scalaText}`;
  const cached = importedNetworkPitchCache.get(configuration);
  if (cached?.key === key) return cached.pitches;
  const tonic = configuration.generatorRatio;
  const pitches = new Set((configuration.scalaRatios ?? networkModel.parseNetworkRatios(configuration.scalaText).ratios)
    .map((ratio) => multiplyAndReduce(tonic, ratio)));
  importedNetworkPitchCache.set(configuration, { key, pitches });
  return pitches;
}

function importedNetworkTonics(configuration = appliedNetworkConfiguration) {
  const pitches = importedNetworkPitchSet(configuration);
  if (!Array.isArray(configuration.selectedTonicRatios)) return [...pitches];
  return [...new Set(configuration.selectedTonicRatios
    .map((ratio) => multiplyAndReduce(configuration.generatorRatio, ratio))
    .filter((ratio) => pitches.has(ratio)))];
}

function importedNetworkTonicGroups(configuration) {
  const groups = new Map();
  [...importedNetworkPitchSet(configuration)].forEach((tonic) => {
    const family = importedTonicFamily(tonic, configuration);
    if (!groups.has(family.displayRatio)) groups.set(family.displayRatio, []);
    groups.get(family.displayRatio).push(tonic);
  });
  return [...groups].sort(([a], [b]) => ratioCents(a) - ratioCents(b))
    .map(([displayRatio, tonics]) => ({
      displayRatio,
      tonics: tonics.sort((a, b) => (factorOddPrimes(parseFraction(a)).get(3n) ?? 0)
        - (factorOddPrimes(parseFraction(b)).get(3n) ?? 0)),
    }));
}

function setImportedTonicSelection(configuration, tonics, selected) {
  const next = new Set(importedNetworkTonics(configuration));
  tonics.forEach((tonic) => selected ? next.add(tonic) : next.delete(tonic));
  configuration.selectedTonicRatios = [...next]
    .map((tonic) => divideAndReduce(tonic, configuration.generatorRatio));
}

function importedNetworkContains(ratios, tonic, configuration = appliedNetworkConfiguration) {
  if (!tonic) return false;
  const pitches = importedNetworkPitchSet(configuration);
  return ratios.every((ratio) => pitches.has(multiplyAndReduce(tonic, ratio)));
}

function importedTonicFamily(ratio, configuration) {
  const relative = divideAndReduce(ratio, configuration.generatorRatio);
  const fraction = parseFraction(relative);
  while (fraction.numerator % 3n === 0n) fraction.numerator /= 3n;
  while (fraction.denominator % 3n === 0n) fraction.denominator /= 3n;
  const displayRatio = fractionToString(reduceToOctave(fraction));
  return {
    key: `scala:${ratio}`, imported: true, displayRatio,
    shortLabel: `${displayRatio}*`, label: `${displayRatio}* — données saisies`,
    tonics: [ratio], harmonics: [], concordant: [],
  };
}

function multiplyNetworkRatio(firstValue, secondValue) {
  const first = parseFraction(firstValue);
  const second = parseFraction(secondValue);
  if (!first || !second) return null;
  let { numerator, denominator } = simplify({
    numerator: first.numerator * second.numerator,
    denominator: first.denominator * second.denominator,
  });
  while (numerator < denominator) numerator *= 2n;
  while (numerator > denominator * 2n) denominator *= 2n;
  return fractionToString(simplify({ numerator, denominator }));
}

function networkDimensionKey(value) {
  const fraction = parseFraction(value);
  if (!fraction) return "";
  const exponents = factorOddPrimes(fraction);
  exponents.delete(3n);
  return latticeExponentKey(exponents) || "neutral";
}

function synchronizeNetworkConfiguration(configuration) {
  NETWORK_FAMILY_ORDER.forEach((familyKey) => {
    const family = configuration.families[familyKey];
    family.enabled = Boolean(
      NETWORK_FAMILY_BLUEPRINTS[familyKey].locked || family.manualEnabled,
    );
    family.harmonics = [...new Set(family.harmonics)]
      .sort((first, second) => (
        NETWORK_HARMONICS.indexOf(first) - NETWORK_HARMONICS.indexOf(second)
      ));
    family.selectedTonics = [...new Set(family.selectedTonics ?? [])];
    family.functions = OPTIONAL_MODAL_FUNCTION_RATIOS.filter((ratio) => family.functions?.includes(ratio));
  });
  return configuration;
}

function generatedFamilyTonics(configuration, familyKey) {
  const familyConfiguration = configuration.families[familyKey];
  if (!familyConfiguration?.enabled) return [];
  const seed = multiplyNetworkRatio(
    configuration.generatorRatio,
    NETWORK_FAMILY_BLUEPRINTS[familyKey].seedMultiplier,
  );
  if (!seed) return [];
  const tonics = [seed];
  let descending = seed;
  for (let index = 0; index < familyConfiguration.negative; index += 1) {
    descending = multiplyNetworkRatio(descending, "2/3");
    if (descending) tonics.push(descending);
  }
  let ascending = seed;
  for (let index = 0; index < familyConfiguration.positive; index += 1) {
    ascending = multiplyNetworkRatio(ascending, "3/2");
    if (ascending) tonics.push(ascending);
  }
  return [...new Set(tonics)].sort((first, second) => (
    (factorOddPrimes(parseFraction(second)).get(3n) ?? 0)
      - (factorOddPrimes(parseFraction(first)).get(3n) ?? 0)
    || first.localeCompare(second)
  ));
}

function transposeSelectedTonics(configuration, previousGeneratorRatio) {
  if (configuration.sourceMethod !== "configure"
    || previousGeneratorRatio === configuration.generatorRatio) return;
  const shift = divideAndReduce(configuration.generatorRatio, previousGeneratorRatio);
  if (!shift) return;
  NETWORK_FAMILY_ORDER.forEach((familyKey) => {
    const family = configuration.families[familyKey];
    family.selectedTonics = family.selectedTonics
      .map((tonic) => multiplyAndReduce(tonic, shift))
      .filter(Boolean);
  });
}

function rebuildNetworkIndexes(configuration) {
  synchronizeNetworkConfiguration(configuration);
  appliedNetworkConfiguration = configuration;
  configuredReferenceRatio = configuration.referenceRatio;
  TONIC_RATIOS.splice(0, TONIC_RATIOS.length);
  TONIC_RATIO_SET.clear();
  TONIC_FAMILY_BY_RATIO.clear();
  Object.entries(FAMILY_DEFINITIONS).forEach(([key, family]) => {
    if (family.imported) delete FAMILY_DEFINITIONS[key];
  });
  NETWORK_FAMILY_ORDER.forEach((familyKey) => {
    const family = FAMILY_DEFINITIONS[familyKey];
    const familyConfiguration = configuration.families[familyKey];
    family.tonics = configuration.sourceMethod === "scala" || !familyConfiguration.enabled
      ? [] : [...familyConfiguration.selectedTonics];
    family.harmonics = configuration.sourceMethod !== "scala" && familyConfiguration.enabled ? [...familyConfiguration.harmonics] : [];
    family.tonics.forEach((ratio) => {
      TONIC_RATIO_SET.add(ratio);
      if (!TONIC_FAMILY_BY_RATIO.has(ratio)) TONIC_FAMILY_BY_RATIO.set(ratio, familyKey);
    });
  });
  if (configuration.sourceMethod === "scala") {
    const pitches = importedNetworkTonics(configuration);
    pitches.forEach((ratio) => {
      // One internal context per tonic: exact containment can differ even
      // between two notes of the same harmonic family. Menu grouping is visual.
      const family = importedTonicFamily(ratio, configuration);
      FAMILY_DEFINITIONS[family.key] = family;
      TONIC_RATIO_SET.add(ratio);
      TONIC_FAMILY_BY_RATIO.set(ratio, family.key);
    });
  }
  TONIC_RATIOS.push(...[...TONIC_RATIO_SET].sort((first, second) => (
    ratioCents(first) - ratioCents(second) || first.localeCompare(second)
  )));
  NETWORK_FAMILY_ORDER.forEach((familyKey) => {
    const family = FAMILY_DEFINITIONS[familyKey];
    family.concordant = configuration.sourceMethod === "configure"
      ? [...configuration.families[familyKey].functions]
      : [];
  });
  configuredAudioReferenceA3Hz = configuration.diapasonHz / 2;
}

function activeNetworkPreset() {
  return networkManager.presets.find((preset) => preset.id === networkManager.activeId)
    ?? networkManager.presets[0]
    ?? normalizeNetworkConfiguration(DEFAULT_NETWORK_CONFIGURATION, DEFAULT_NETWORK_CONFIGURATION.id);
}

function saveNetworkStore() {
  try {
    localStorage.setItem(NETWORK_STORE_KEY, JSON.stringify({
      activeId: networkManager.activeId,
      defaultId: networkManager.defaultId,
      lastActiveIdsByScope: networkManager.lastActiveIdsByScope,
      // Personal TFE networks are authoritative on the account, not this device.
      presets: networkManager.presets.filter((preset) => !preset.savedFrettierSnapshot),
      schemaVersion: NETWORK_STORE_SCHEMA_VERSION,
    }));
  } catch (error) {
    console.warn("Les réseaux ne peuvent pas être sauvegardés dans ce navigateur.", error);
  }
}

function loadNetworkStore() {
  let stored = null;
  try {
    stored = JSON.parse(localStorage.getItem(NETWORK_STORE_KEY) || "null");
  } catch (error) {
    console.warn("La sauvegarde des réseaux est illisible; le réseau initial est restauré.", error);
  }
  if (stored && Number(stored.schemaVersion ?? 0) < NETWORK_STORE_SCHEMA_VERSION) {
    try {
      localStorage.setItem(`${NETWORK_STORE_KEY}-avant-v${NETWORK_STORE_SCHEMA_VERSION}`,
        JSON.stringify(stored));
    } catch { /* La migration reste possible même sans copie locale. */ }
  }
  const storedPresets = Array.isArray(stored?.presets)
    ? stored.presets.filter((preset) => String(preset?.name ?? "").trim().toLowerCase() !== "test")
    : [];
  networkManager.presets = storedPresets.flatMap((preset) => {
    if (/^touche-l(?:5|7|11|13)-defaut-demi-positions$/.test(String(preset?.id ?? ""))) return [];
    if (preset.savedFrettierSnapshot) return [];
    if (REMOVED_BUILTIN_NETWORK_IDS.has(String(preset?.id ?? ""))) return [];
    try {
      if (preset.id === DEFAULT_NETWORK_CONFIGURATION.id
        && Number(stored?.schemaVersion ?? 0) < 10) {
        // La référence de la famille 1/1* passe de Ré à La sans transposer
        // les toniques ni les 85 hauteurs historiques du réseau.
        preset.generatorRatio = "1/1";
        [["h3", 4, 1], ["h5", 4, 0], ["sh5", 3, 1], ["sh7", 2, 2]]
          .forEach(([key, negative, positive]) => {
            if (!preset.families?.[key]) return;
            preset.families[key].negative = negative;
            preset.families[key].positive = positive;
          });
        if (preset.families?.h3?.selectedTonics?.includes("2/1")) {
          preset.families.h3.selectedTonics = preset.families.h3.selectedTonics
            .map((tonic) => tonic === "2/1" ? "1/1" : tonic);
        }
        ["h25", "h10/7", "sh7/5"].forEach((key) => {
          if (!preset.families?.[key]) return;
          preset.families[key].manualEnabled = false;
          preset.families[key].enabled = false;
          preset.families[key].selectedTonics = [];
        });
      }
      if (preset.id === DEFAULT_NETWORK_CONFIGURATION.id
        && Number(stored?.schemaVersion ?? 0) < 11
        && preset.families?.h3) {
        // Les fonctions 21/20, 11/10 et 13/10 ne doivent plus être exclues
        // pour préserver artificiellement les 85 hauteurs de l'ancien bassin.
        preset.families.h3.functions = [...OPTIONAL_MODAL_FUNCTION_RATIOS];
      }
      return [normalizeNetworkConfiguration(preset, preset?.id)];
    }
    catch (error) { console.warn("Un réseau sauvegardé invalide ne peut pas être chargé.", error); return []; }
  });
  const builtInConfigurations = [
    DEFAULT_NETWORK_CONFIGURATION,
    ALTO_CELLO_NETWORK_CONFIGURATION,
    ...DEFAULT_TOUCH_NETWORK_CONFIGURATIONS,
    ...DEFAULT_TFP_NETWORK_CONFIGURATIONS,
  ];
  builtInConfigurations.forEach((configuration) => {
    const existing = networkManager.presets.find((preset) => preset.id === configuration.id);
    if (existing) {
      if (configuration.id === ALTO_CELLO_NETWORK_CONFIGURATION.id) {
        // Remplacement unique de l'ancien corpus par le projet saisi.
        // Les modifications ultérieures du projet ne sont jamais écrasées.
        if (Number(stored?.schemaVersion ?? 0) < 14) {
          const existingIndex = networkManager.presets.indexOf(existing);
          networkManager.presets.splice(existingIndex, 1,
            normalizeNetworkConfiguration(configuration, configuration.id));
        } else {
          existing.scope = configuration.scope;
        }
      } else if (configuration.id === DEFAULT_NETWORK_CONFIGURATION.id) {
        if (existing.name === "Réseau actuel") existing.name = DEFAULT_NETWORK_CONFIGURATION.name;
        existing.scope = "global";
        if (Number(stored?.schemaVersion ?? 0) < 3) {
          existing.families.sh7.harmonics = existing.families.sh7.harmonics
            .filter((harmonic) => harmonic !== 13);
        }
        if (Number(stored?.schemaVersion ?? 0) < 5) {
          ["h3", "sh5"].forEach((familyKey) => {
            const harmonics = existing.families[familyKey].harmonics;
            if (!harmonics.includes(25)) harmonics.push(25);
            harmonics.sort((first, second) => (
              NETWORK_HARMONICS.indexOf(first) - NETWORK_HARMONICS.indexOf(second)
            ));
          });
        }
        if (Number(stored?.schemaVersion ?? 0) < 6) {
          const harmonics = existing.families.sh7.harmonics;
          if (!harmonics.includes(5)) harmonics.push(5);
          harmonics.sort((first, second) => (
            NETWORK_HARMONICS.indexOf(first) - NETWORK_HARMONICS.indexOf(second)
          ));
        }
        if (Number(stored?.schemaVersion ?? 0) < 7) {
          existing.families.sh7.harmonics = existing.families.sh7.harmonics
            .filter((harmonic) => harmonic !== 5);
        }
      } else {
        // Ne jamais écraser un nom personnel lors de la migration des TFE.
        if (configuration.scope !== "tfe" || existing.name === configuration.name
          || existing.name === TFE_PRESET_LEGACY_NAMES[configuration.id]
          || existing.name === TFE_PRESET_NAMES_V14[configuration.id]
          || existing.name === TFE_PRESET_NAMES_V17[configuration.id]) {
          existing.name = configuration.name;
        }
        // Modèle de référence L7 : 7/6 remplace 6/5 (19 octobre 2026), sauf si la suite a été modifiée.
        if (configuration.id === "touche-l7-defaut"
          && String(existing.scalaText ?? "").trim() === TFE_L7_SCALA_V14) {
          existing.scalaText = configuration.scalaText;
        }
        // Demande D1 : nouveau modèle L13 (13/8 5/3), sauf si la suite a été modifiée.
        if (configuration.id === "touche-l13-defaut"
          && String(existing.scalaText ?? "").trim() === TFE_L13_SCALA_V16) {
          existing.scalaText = configuration.scalaText;
        }
        existing.scope = configuration.scope;
      }
      return;
    }
    networkManager.presets.push(normalizeNetworkConfiguration(configuration, configuration.id));
  });
  const knownIds = new Set(networkManager.presets.map((preset) => preset.id));
  const migrateStarredTouchId = (id) => String(id ?? "").replace(/-demi-positions$/, "");
  const savedDefaultId = migrateStarredTouchId(stored?.defaultId);
  const savedActiveId = migrateStarredTouchId(stored?.activeId);
  if (savedActiveId && !knownIds.has(savedActiveId)) pendingPersonalTfeActiveId = savedActiveId;
  networkManager.defaultId = knownIds.has(savedDefaultId)
    ? savedDefaultId
    : networkManager.presets[0].id;
  networkManager.lastActiveIdsByScope = Object.fromEntries(
    Object.entries(stored?.lastActiveIdsByScope ?? {})
      .map(([scope, id]) => [scope, migrateStarredTouchId(id)])
      .filter(([, id]) => knownIds.has(id)),
  );
  networkManager.activeId = knownIds.has(savedActiveId)
    ? savedActiveId : networkManager.defaultId;
  networkManager.lastActiveIdsByScope[activeNetworkPreset().scope] = networkManager.activeId;
  rebuildNetworkIndexes(activeNetworkPreset());
  saveNetworkStore();
}

function personalTfeConfiguration(record) {
  if (!record || typeof record.id !== "string" || typeof record.name !== "string"
    || record.snapshot?.kind !== "tfe" || typeof record.generatorRatio !== "string"
    || typeof record.scalaText !== "string") return null;
  try {
    return normalizeNetworkConfiguration({
      id: record.id,
      name: record.name,
      scope: "tfe",
      sourceMethod: "scala",
      generatorRatio: record.generatorRatio,
      scalaText: record.scalaText,
      savedFrettierSnapshot: record.snapshot,
    }, record.id);
  } catch (error) {
    console.warn("Une touche personnelle n’a pas pu être chargée.", error);
    return null;
  }
}

// Nettoyage ponctuel demandé le 9 octobre 2026 : uniquement ces deux tests.
// Passer par DELETE conserve l'identité et les permissions du compte connecté.
const RETIRED_TFE_TEST_RECORDS = [
  {
    "id": "221069e3-1701-4e25-b10a-d0d000dc131f",
    "updatedAt": 1791582990131
  },
  {
    "id": "ebe1faf9-08ad-43b3-9863-f46b394e5a3a",
    "updatedAt": 1791579295840
  }
];
async function retireRequestedTfeTestRecords(records) {
  const remaining = [...records];
  for (const target of RETIRED_TFE_TEST_RECORDS) {
    const index = remaining.findIndex((record) => record.id === target.id
      && record.updatedAt === target.updatedAt);
    if (index < 0) continue;
    const response = await fetch(`${PERSONAL_TFE_NETWORKS_URL}?id=${encodeURIComponent(target.id)}&ifUnmodifiedSince=${target.updatedAt}`, {
      method: "DELETE", credentials: "same-origin",
    });
    if (response.ok) remaining.splice(index, 1);
    else console.warn("Une touche de test a changé ou n’a pas pu être supprimée; elle est conservée.");
  }
  return remaining;
}

// Lit la réponse du serveur de sauvegarde sans planter si elle n'est pas du JSON
// (page « introuvable », copie du site sans serveur, panne) : on obtient alors un message clair.
async function readPersonalTfePayload(response) {
  const unavailable = "La sauvegarde personnelle des touches n’est pas disponible sur cette copie du site.";
  try {
    return { ok: response.ok, payload: await response.json() };
  } catch {
    return { ok: false, payload: { error: unavailable } };
  }
}

// ---------- Touches enregistrées dans ce navigateur (lot 9, 16 octobre 2026) ----------
// Quand le serveur de sauvegarde personnelle n'est pas joignable (copie du site, hors ligne),
// la touche est enregistrée dans ce navigateur, comme les autres réseaux. Le calcul du réseau
// projeté reprend exactement celui du serveur (app/api/personal-tfe-networks/model.ts).
const LOCAL_TFE_STORE_KEY = "harmonie-naturelle-touches-locales-v1";
const LOCAL_TFE_ID_PREFIX = "touche-locale-";

function isLocalTfePreset(preset) {
  return String(preset?.id ?? "").startsWith(LOCAL_TFE_ID_PREFIX);
}

function readLocalTfeRecords() {
  try {
    const records = JSON.parse(localStorage.getItem(LOCAL_TFE_STORE_KEY) || "[]");
    return Array.isArray(records) ? records.filter((record) => isLocalTfePreset(record)) : [];
  } catch {
    return [];
  }
}

function writeLocalTfeRecords(records) {
  localStorage.setItem(LOCAL_TFE_STORE_KEY, JSON.stringify(records));
}

function localTfeFraction(value) {
  const match = typeof value === "string" && value.trim().match(/^(\d+)\s*\/\s*(\d+)$/);
  if (!match) throw new Error("Un rapport de la touche est invalide.");
  let numerator = BigInt(match[1]);
  let denominator = BigInt(match[2]);
  if (!numerator || !denominator || numerator > 1000000n || denominator > 1000000n) {
    throw new Error("Un rapport de la touche dépasse les limites acceptées.");
  }
  let a = numerator; let b = denominator;
  while (b) [a, b] = [b, a % b];
  return { numerator: numerator / a, denominator: denominator / a };
}

function localTfeRatioText(value) {
  return `${value.numerator}/${value.denominator}`;
}

function localTfeOctave(value) {
  let { numerator, denominator } = value;
  while (numerator < denominator) numerator *= 2n;
  while (numerator >= denominator * 2n) denominator *= 2n;
  return localTfeFraction(`${numerator}/${denominator}`);
}

function localTfeCompare(first, second) {
  const difference = first.numerator * second.denominator - second.numerator * first.denominator;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}

function localTfeSupported(value) {
  const limit = 2147483647n;
  if (value.numerator > limit || value.denominator > limit) throw new Error("Une hauteur projetée dépasse les limites du réseau.");
  for (let term of [value.numerator, value.denominator]) {
    for (const prime of [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n]) while (term % prime === 0n) term /= prime;
    if (term !== 1n) throw new Error("Une hauteur projetée dépasse la limite 23 du réseau HEJI.");
  }
}

/** Même calcul que le serveur : toutes les hauteurs des six cordes, ramenées au 1/1 de la touche. */
function projectLocalTfe(snapshot) {
  const product = (first, second) => localTfeFraction(`${first.numerator * second.numerator}/${first.denominator * second.denominator}`);
  const quotient = (first, second) => localTfeFraction(`${first.numerator * second.denominator}/${first.denominator * second.numerator}`);
  const reference = localTfeFraction(snapshot.referenceRatioToA);
  // Capo (C1) : seules sonnent la frette du capo (nouvelle corde à vide) et les frettes au-delà.
  const capo = typeof snapshot.capoFret === "string" && snapshot.allFrets.includes(snapshot.capoFret)
    ? localTfeFraction(snapshot.capoFret) : null;
  const allPositions = [localTfeFraction("1/1"), ...snapshot.allFrets.map(localTfeFraction)];
  const positions = capo ? allPositions.filter((position) => localTfeCompare(position, capo) >= 0) : allPositions;
  const absolute = new Map();
  snapshot.strings.map(localTfeFraction).forEach((string) => positions.forEach((position) => {
    const pitch = localTfeOctave(product(product(reference, string), position));
    localTfeSupported(pitch);
    absolute.set(localTfeRatioText(pitch), pitch);
  }));
  // Avec un capo, l'instrument est transposé : le 1/1 est la corde de référence jouée au capo.
  const openReference = localTfeOctave(capo ? product(reference, capo) : reference);
  const anchor = absolute.get(localTfeRatioText(openReference)) ?? [...absolute.values()][0];
  const relative = new Map();
  absolute.forEach((pitch) => {
    const item = localTfeOctave(quotient(pitch, anchor));
    localTfeSupported(item);
    relative.set(localTfeRatioText(item), item);
  });
  const scalaText = [...relative.values()].filter((item) => localTfeRatioText(item) !== "1/1")
    .sort(localTfeCompare).map(localTfeRatioText).concat("2/1").join("\n");
  return { generatorRatio: localTfeRatioText(anchor), scalaText };
}

function localTfeFingerprint(snapshot) {
  return JSON.stringify([snapshot.mainFrets, snapshot.allFrets, snapshot.strings, snapshot.referenceRatioToA,
    ...(snapshot.capoFret ? [snapshot.capoFret] : [])]);
}

/** Enregistre dans ce navigateur, avec les mêmes règles de nom et de remplacement que le serveur. */
function saveLocalTfeRecord(snapshot, name, replacement) {
  const normalizedName = String(name ?? "").trim().normalize("NFC");
  if (!normalizedName || normalizedName.length > 140 || /[\u0000-\u001f\u007f<>]/.test(normalizedName)) {
    return { error: "Donne un nom de 1 à 140 caractères à cette sauvegarde." };
  }
  let projection;
  try { projection = projectLocalTfe(snapshot); } catch (error) { return { error: error.message }; }
  const records = readLocalTfeRecords();
  const fingerprint = localTfeFingerprint(snapshot);
  const identical = records.find((record) => localTfeFingerprint(record.snapshot) === fingerprint);
  const sameName = records.find((record) => record.name.normalize("NFC") === normalizedName);
  if (identical && sameName && identical.id !== sameName.id) {
    return { error: "Ce nom appartient à une autre touche. Choisis un autre nom avant de confirmer." };
  }
  const previous = sameName ?? identical;
  if (previous && (replacement?.id !== previous.id || replacement?.updatedAt !== previous.updatedAt)) {
    return { existing: { id: previous.id, name: previous.name, updatedAt: previous.updatedAt } };
  }
  const now = Math.max(Date.now(), (previous?.updatedAt ?? 0) + 1);
  const record = {
    id: previous?.id ?? `${LOCAL_TFE_ID_PREFIX}${now.toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    name: normalizedName, snapshot: structuredClone(snapshot), ...projection, updatedAt: now,
  };
  try {
    writeLocalTfeRecords([...records.filter((item) => item.id !== record.id), record]);
  } catch {
    return { error: "Ce navigateur refuse l’enregistrement (navigation privée ou stockage plein)." };
  }
  return { id: record.id };
}

/** Le serveur est absent sur cette copie du site : on enregistre alors dans le navigateur. */
function personalTfeServerUnavailable(response, payload) {
  // 401 : personne n’est connecté au compte; la touche reste alors dans ce navigateur.
  return !response || [401, 404, 405, 501, 502, 503, 504].includes(response.status)
    || payload?.error === "La sauvegarde personnelle des touches n’est pas disponible sur cette copie du site.";
}

async function loadPersonalTfeNetworks({ activateId = "" } = {}) {
  let serverRecords = [];
  let serverError = null;
  try {
    const response = await fetch(PERSONAL_TFE_NETWORKS_URL, {
      credentials: "same-origin", cache: "no-store",
    });
    const { ok, payload } = await readPersonalTfePayload(response);
    if (ok) serverRecords = await retireRequestedTfeTestRecords(Array.isArray(payload.networks) ? payload.networks : []);
    else if (!personalTfeServerUnavailable(response, payload)) {
      serverError = new Error(payload?.error || "Impossible de charger les touches personnelles.");
    }
  } catch {
    // Pas de serveur joignable : seules les touches de ce navigateur sont chargées.
  }
  const records = [...serverRecords, ...readLocalTfeRecords()];
  const personal = records.map(personalTfeConfiguration).filter(Boolean);
  networkManager.presets = [
    ...networkManager.presets.filter((preset) => !preset.savedFrettierSnapshot),
    ...personal,
  ];
  const wantedId = activateId || pendingPersonalTfeActiveId || networkManager.activeId;
  pendingPersonalTfeActiveId = "";
  if (personal.some((preset) => preset.id === wantedId)) {
    activateNetworkPreset(wantedId, { confirmed: true });
  } else if (!networkManager.presets.some((preset) => preset.id === networkManager.activeId)) {
    activateNetworkPreset(networkManager.defaultId, { confirmed: true });
  } else {
    saveNetworkStore();
    renderActiveNetworkSelector();
    renderNetworkPresetSelector();
  }
  if (serverError) throw serverError;
  return personal;
}

function setFrettierSaveStatus(message) {
  if (elements.frettierSaveStatus) elements.frettierSaveStatus.textContent = message;
}

let pendingFrettierSave = null;

function frettierSaveDescription(snapshot) {
  const pitchName = (ratio) => {
    const notation = ratioToHeji(ratio, { applyReference: false });
    return notation ? plainHejiNote(notation) : ratio.replace("/", "∶");
  };
  const limit = Math.max(3, ...snapshot.allFrets.flatMap((ratio) => {
    const fraction = parseFraction(ratio);
    return fraction ? [...factorOddPrimes(fraction).keys()].map(Number) : [];
  }));
  const scordatura = [...snapshot.strings].reverse().map((ratio) =>
    pitchName(multiplyAndReduce(snapshot.referenceRatioToA, ratio))).join("");
  const reference = pitchName(snapshot.referenceRatioToA);
  const model = `TFE-L${limit}-${snapshot.allFrets.length}F`;
  // Préréglage « Scordaturas TFE » (C2) : le nom reprend le préréglage et le 1/1, ex. -Orkney-C.
  const named = typeof snapshot.presetCode === "string" && snapshot.presetCode.trim()
    ? snapshot.presetCode.trim() : scordatura;
  // Capo (C1) : suffixe « -capo II » (chiffre romain de la frette du capo).
  const capo = typeof snapshot.capoLabel === "string" && snapshot.capoLabel ? `-capo ${snapshot.capoLabel}` : "";
  return { model, scordatura, reference, name: `${model}-${named}-${reference}${capo}` };
}

function openFrettierSaveDialog() {
  if (frettierUiState.fretboardType !== "tfe" || !frettierUiState.savedSnapshot) {
    setFrettierSaveStatus("Sélectionne d’abord une touche TFE.");
    return;
  }
  const snapshot = structuredClone(frettierUiState.savedSnapshot);
  if (snapshot.invalidFrets || !snapshot.allFrets?.length) {
    setFrettierSaveStatus("Corrige les rapports invalides avant de sauvegarder.");
    return;
  }
  const description = frettierSaveDescription(snapshot);
  snapshot.scordatura = description.scordatura;
  pendingFrettierSave = { snapshot, replacement: null, busy: false };
  const dialog = document.querySelector("#frettier-save-dialog");
  document.querySelector("#frettier-save-model").textContent = description.model;
  document.querySelector("#frettier-save-scordatura").textContent = description.scordatura;
  document.querySelector("#frettier-save-reference").textContent = description.reference;
  document.querySelector("#frettier-save-name").value = description.name;
  document.querySelector("#frettier-save-feedback").textContent = "";
  document.querySelector("#frettier-save-confirm").textContent = "Sauvegarder";
  setFrettierSaveStatus("");
  dialog.showModal();
  document.querySelector("#frettier-save-name").focus();
}

async function saveCurrentTfeNetwork() {
  if (!pendingFrettierSave || pendingFrettierSave.busy) return;
  const input = document.querySelector("#frettier-save-name");
  const name = input.value.trim();
  if (!name) { input.reportValidity(); return; }
  const pending = pendingFrettierSave;
  const confirm = document.querySelector("#frettier-save-confirm");
  const cancel = document.querySelector("#frettier-save-cancel");
  const feedback = document.querySelector("#frettier-save-feedback");
  pending.busy = true;
  confirm.disabled = true;
  cancel.disabled = true;
  input.disabled = true;
  feedback.textContent = "Sauvegarde…";
  let savedId = null;
  let savedLocally = false;
  try {
    let response = null;
    let result = { ok: false, payload: null };
    if (!pending.local) {
      try {
        response = await fetch(PERSONAL_TFE_NETWORKS_URL, {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...pending.snapshot, name,
            ...(pending.replacement ? { replaceId: pending.replacement.id,
              replaceUpdatedAt: pending.replacement.updatedAt } : {}),
          }),
        });
        result = await readPersonalTfePayload(response);
      } catch {
        response = null;
      }
    }
    if (pending.local || personalTfeServerUnavailable(response, result.payload)) {
      // Lot 9 : pas de serveur sur cette copie du site → enregistrement dans ce navigateur.
      pending.local = true;
      const local = saveLocalTfeRecord(pending.snapshot, name, pending.replacement);
      if (local.existing) {
        pending.replacement = local.existing;
        feedback.textContent = `« ${local.existing.name} » existe déjà. Confirmer son remplacement, modifier le nom ou annuler.`;
        confirm.textContent = "Confirmer le remplacement";
        return;
      }
      if (local.error) throw new Error(local.error);
      savedId = local.id;
      savedLocally = true;
    } else {
      const { ok, payload } = result;
      if (response.status === 409 && payload.existing) {
        pending.replacement = payload.existing;
        feedback.textContent = `« ${payload.existing.name} » existe déjà. Confirmer son remplacement, modifier le nom ou annuler.`;
        confirm.textContent = "Confirmer le remplacement";
        return;
      }
      if (!ok) throw new Error(payload?.error || "Sauvegarde impossible.");
      savedId = payload.network.id;
    }
  } catch (error) {
    pending.replacement = null;
    confirm.textContent = "Sauvegarder";
    feedback.textContent = error instanceof Error ? error.message : "Sauvegarde impossible.";
  } finally {
    pending.busy = false;
    confirm.disabled = false;
    cancel.disabled = false;
    input.disabled = false;
  }
  if (!savedId) return;
  document.querySelector("#frettier-save-dialog").close();
  setFrettierSaveStatus(savedLocally
    // 20 octobre 2026 : sur la page Claude, ce qui est gardé dans le navigateur est aussi recopié dans l'espace
    // durable de la personne connectée (site-claude/index.html).
    ? "Touche enregistrée : elle est maintenant un réseau dans tous les onglets."
    : "Touche enregistrée dans tes réseaux : elle est maintenant offerte dans tous les onglets.");
  try {
    await loadPersonalTfeNetworks({ activateId: savedId });
  } catch {
    setFrettierSaveStatus("Touche enregistrée. Recharge la page pour actualiser la liste.");
  }
}

async function deletePersonalTfeNetwork(preset) {
  try {
    if (isLocalTfePreset(preset)) {
      writeLocalTfeRecords(readLocalTfeRecords().filter((record) => record.id !== preset.id));
    } else {
      const response = await fetch(`${PERSONAL_TFE_NETWORKS_URL}?id=${encodeURIComponent(preset.id)}`, {
        method: "DELETE", credentials: "same-origin",
      });
      const { ok, payload } = await readPersonalTfePayload(response);
      if (!ok) throw new Error(payload?.error || "Suppression impossible.");
    }
    networkManager.presets = networkManager.presets.filter((candidate) => candidate.id !== preset.id);
    if (networkManager.defaultId === preset.id) networkManager.defaultId = networkManager.presets[0].id;
    networkManager.activeId = networkManager.defaultId;
    Object.keys(networkManager.lastActiveIdsByScope).forEach((scope) => {
      if (networkManager.lastActiveIdsByScope[scope] === preset.id) delete networkManager.lastActiveIdsByScope[scope];
    });
    networkManager.lastActiveIdsByScope[activeNetworkPreset().scope] = networkManager.activeId;
    networkManager.draft = cloneNetworkConfiguration(activeNetworkPreset());
    networkRenaming = false;
    networkMethodLocked = true;
    networkDraftHistory.undo.length = 0;
    networkDraftHistory.redo.length = 0;
    networkOpeningSnapshot = networkDraftSnapshot();
    saveNetworkStore();
    applyNetworkConfiguration(activeNetworkPreset(), { resetSelection: true });
    renderNetworkConfigurator("Touche supprimée de tes réseaux personnels.");
  } catch (error) {
    renderNetworkConfigurator(error instanceof Error ? error.message : "Suppression impossible.");
  }
}

function resetSelectionToNetworkHome(configuration = activeNetworkPreset()) {
  const preferredTonic = configuration?.generatorRatio;
  const tonic = TONIC_RATIO_SET.has(preferredTonic) ? preferredTonic : TONIC_RATIOS[0] ?? null;
  const ionian = tonic
    ? resolvedModeSelectionForTonic(tonic, DEFAULT_MODE_ID, "Ionien L5")
    : null;
  const fallbackMode = tonic ? modesAvailableForTonic(tonic)[0] : null;
  state.catalog = "modes";
  state.selectedTonic = tonic;
  state.selectedFamily = tonic ? TONIC_FAMILY_BY_RATIO.get(tonic) : null;
  state.intervalAnchorTonic = tonic;
  state.intervalSelection = "";
  state.tetrachordSelection = "";
  state.tetrachordModeContext = null;
  state.selectedChordName = "";
  state.selectedVariantIndex = 0;
  state.selectedModeId = ionian?.id ?? fallbackMode?.id ?? ALL_SELECTION_ID;
}

function reconcileSelectionWithNetwork() {
  const preferredConfiguration = activeNetworkPreset();
  const preferredTonic = preferredConfiguration.generatorRatio;
  if (!TONIC_RATIO_SET.has(state.selectedTonic)) {
    state.selectedTonic = TONIC_RATIO_SET.has(preferredTonic) ? preferredTonic : TONIC_RATIOS[0] ?? null;
  }
  state.selectedFamily = state.selectedTonic ? TONIC_FAMILY_BY_RATIO.get(state.selectedTonic) : null;
  if (!TONIC_RATIO_SET.has(state.intervalAnchorTonic)) state.intervalAnchorTonic = state.selectedTonic;
  state.functionPreview = null;
  state.functionPreviewAnchor = null;
  state.intervalFunctionPreview = null;
  state.intervalFunctionPreviewAnchor = null;
  state.tetrachordFunctionPreview = null;
  state.modulationPreview = null;
  state.modulationAnchor = null;
  clearModeOriginContext();
  clearIntervalTransitionContexts();
  if (state.catalog === "tetracordes" && state.tetrachordSelection !== ALL_SELECTION_ID && !tetrachordContextForSelection()) {
    state.tetrachordModeContext = null;
    state.tetrachordSelection = defaultTetrachordSelection();
  }
  if (
    state.catalog === "intervalles"
    && state.intervalSelection !== ALL_SELECTION_ID
    && !intervalIsAvailable(state.intervalSelection, state.intervalAnchorTonic)
  ) {
    state.intervalSelection = defaultIntervalSelection(state.intervalAnchorTonic);
  }
  if (state.catalog === "modes" && state.selectedModeId !== ALL_SELECTION_ID) {
    const requestedMode = selectedModeById();
    let selectedMode = resolvedModeSelection(state.selectedModeId, requestedMode?.label);
    if (!selectedMode) {
      const fallbackTonics = [
        preferredTonic,
        ...TONIC_RATIOS.slice().sort((first, second) => (
          Math.abs(ratioCents(first) - ratioCents(state.selectedTonic))
          - Math.abs(ratioCents(second) - ratioCents(state.selectedTonic))
        )),
      ];
      for (const tonic of [...new Set(fallbackTonics)]) {
        selectedMode = resolvedModeSelectionForTonic(tonic, state.selectedModeId, requestedMode?.label);
        if (!selectedMode) continue;
        state.selectedTonic = tonic;
        state.selectedFamily = TONIC_FAMILY_BY_RATIO.get(tonic);
        break;
      }
    }
    state.selectedModeId = selectedMode?.id ?? ALL_SELECTION_ID;
  }
  if (state.catalog === "accords" && state.selectedChordName !== ALL_SELECTION_ID) {
    const selection = resolvedChordSelection(state.selectedChordName, state.selectedVariantIndex);
    state.selectedChordName = selection?.chordName ?? "";
    state.selectedVariantIndex = selection?.variantIndex ?? 0;
  }
}

function applyNetworkConfiguration(configuration, { renderApplication = true, resetSelection = false } = {}) {
  const previousAnalysisNetworkIdentity = networkAnalysisIdentity(networkAnalysisData());
  const normalized = normalizeNetworkConfiguration(configuration, configuration?.id);
  rebuildNetworkIndexes(normalized);
  const switchesAnalysisNetwork = previousAnalysisNetworkIdentity
    !== networkAnalysisIdentity(networkAnalysisData());
  if (switchesAnalysisNetwork) resetNetworkAnalysisUiState(normalized.id);
  syncNetworkAnalysis();
  syncFrettierNetwork();
  if (resetSelection) {
    stopAllSounds();
    resetSelectionToNetworkHome(normalized);
    navigationHistory.entries.length = 0;
    navigationHistory.index = -1;
  }
  reconcileSelectionWithNetwork();
  if (!renderApplication) return normalized;
  const wasRestoring = navigationHistory.restoring;
  navigationHistory.restoring = true;
  populateSelectionMenu();
  render();
  navigationHistory.restoring = wasRestoring;
  if (resetSelection && !wasRestoring) {
    recordNavigationState();
    updateHistoryNavigation();
  }
  return normalized;
}

function networkScopeForSource(source = networkConfiguratorContext.source) {
  if (source === "frettier-tfp") return "tfp";
  if (source === "frettier-tfe") return "tfe";
  return "global";
}

function networkScopeForCurrentPage() {
  return document.body.dataset.pageTab === "frettier"
    ? frettierUiState.fretboardType
    : "global";
}

function networkNameForScope(name, scope) {
  const trimmedName = String(name || "Nouveau réseau").trim() || "Nouveau réseau";
  if (scope === "tfe" || scope === "tfp") {
    const prefix = scope.toUpperCase();
    if (new RegExp(`^${prefix}(?:\\s+|-)`, "i").test(trimmedName)) return trimmedName.slice(0, 60);
    const plainName = trimmedName.replace(/^(?:TFE|TFP)(?:\s+|-+)/i, "") || "Nouveau réseau";
    return `${prefix} ${plainName}`.slice(0, 60);
  }
  return trimmedName.replace(/^(?:TFE|TFP)(?:\s+|-+)/i, "").slice(0, 60);
}

// Lot 9 (décision de Simon, 16 octobre 2026) : une touche TFE sans scordatura enregistrée n'est pas
// un réseau, mais des « positions de frettes », point de départ d'une touche dans le Frettier.
// Elle n'apparaît donc que dans le Frettier (TFE). Une touche enregistrée avec sa scordatura
// (savedFrettierSnapshot) devient un réseau, offert dans tous les onglets.
function isFretPositionTemplate(preset) {
  return preset?.scope === "tfe" && !preset.savedFrettierSnapshot;
}

function networkVisibleInConfigurator(preset) {
  const scope = networkScopeForSource();
  return (!networkConfiguratorContext.ratiosOnly || preset.sourceMethod === "scala")
    && (scope === "global" || preset.scope === scope);
}

// 19 octobre 2026 (Simon) : ces positions de frettes figurent de nouveau dans le menu des autres onglets;
// choisies hors du Frettier, la page n'affiche qu'un message (syncFretTemplateNotice).
function networkVisibleOnCurrentPage(preset) {
  // D3 : une transposition créée par la fenêtre de choix n'encombre pas les menus, sauf quand elle est active.
  if (preset.transposedFrom && preset.id !== networkManager.activeId) return false;
  const scope = networkScopeForCurrentPage();
  if (scope === "global") return true;
  return preset.scope === scope;
}

function syncFretTemplateNotice() {
  const notice = document.querySelector("#fret-template-notice");
  const active = document.body.dataset.pageTab !== "frettier" && isFretPositionTemplate(activeNetworkPreset());
  if (active) document.body.dataset.fretTemplate = "true";
  else delete document.body.dataset.fretTemplate;
  if (notice) notice.hidden = !active;
}

/** En quittant le Frettier, des positions de frettes actives cèdent la place au dernier réseau. */
function leaveFretPositionTemplateNetwork() {
  if (!isFretPositionTemplate(activeNetworkPreset())) return;
  const wanted = [networkManager.lastActiveIdsByScope.global, networkManager.defaultId];
  const target = wanted.map((id) => networkManager.presets.find((preset) => preset.id === id))
    .find((preset) => preset && !isFretPositionTemplate(preset))
    ?? networkManager.presets.find((preset) => !isFretPositionTemplate(preset));
  if (target) activateNetworkPreset(target.id, { confirmed: true });
}

function closeNetworkPresetMenu({ restoreFocus = false } = {}) {
  if (!elements.networkPresetMenu) return;
  closeNetworkPresetSubmenus();
  elements.networkPresetMenu.hidden = true;
  elements.networkPresetButton.setAttribute("aria-expanded", "false");
  if (restoreFocus) elements.networkPresetButton.focus();
}

function closeNetworkPresetSubmenus() {
  if (!elements.networkPresetMenu) return;
  elements.networkPresetMenu.querySelectorAll(".network-preset-group-trigger").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
  elements.networkPresetMenu.querySelectorAll(".network-preset-group").forEach((group) => {
    group.classList.remove("is-open", "opens-left");
  });
  elements.networkPresetMenu.querySelectorAll(".network-preset-submenu").forEach((submenu) => {
    submenu.hidden = true;
    submenu.style.removeProperty("top");
  });
}

function openNetworkPresetSubmenu(trigger, focusFirst = false) {
  const group = trigger?.closest(".network-preset-group");
  const submenu = group?.querySelector(".network-preset-submenu");
  if (!group || !submenu) return;
  closeNetworkPresetSubmenus();
  group.classList.add("is-open");
  trigger.setAttribute("aria-expanded", "true");
  submenu.hidden = false;
  submenu.style.top = "-6px";
  if (typeof submenu.getBoundingClientRect === "function") {
    const viewportPadding = 8;
    const bottomOverflow = submenu.getBoundingClientRect().bottom - (window.innerHeight - viewportPadding);
    if (bottomOverflow > 0) submenu.style.top = `${-6 - bottomOverflow}px`;
    const adjustedRect = submenu.getBoundingClientRect();
    if (adjustedRect.top < viewportPadding) {
      submenu.style.top = `${Number.parseFloat(submenu.style.top) + viewportPadding - adjustedRect.top}px`;
    }
    if (
      submenu.getBoundingClientRect().right > window.innerWidth - viewportPadding
      && group.getBoundingClientRect().left > submenu.getBoundingClientRect().width
    ) group.classList.add("opens-left");
  }
  if (focusFirst) submenu.querySelector("button:not(:disabled)")?.focus();
}

function createNetworkPresetChoice(entry) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "network-preset-option";
  button.setAttribute("role", "menuitemradio");
  button.dataset.networkPresetId = entry.id;
  button.disabled = entry.disabled;
  button.setAttribute("aria-checked", String(entry.id === elements.networkPresetSelect.value));
  button.setAttribute("aria-label", entry.name);
  appendColorizedNetworkLabel(button, entry.name);
  return button;
}

// Noms historiques reconnus uniquement avec leur identifiant intégré.
const TFE_PRESET_LEGACY_NAMES = {
  "touche-l5-defaut": "TFE L5 défaut",
  "touche-l7-defaut": "TFE L7 défaut",
  "touche-l11-defaut": "TFE L11 défaut",
  "touche-l13-defaut": "TFE L13 défaut",
  "tfe-l13-15f-defaut": "TFE-L13-15F-défaut",
  "tfe-l13-15f-16-15-defaut": "TFE-L13-15F-(16/15)-défaut",
  "tfe-l13-18f-defaut": "TFE-L13-18F-défaut",
  "tfe-l13-19f-21-20-defaut": "TFE-L13-19F-(21/20)-défaut",
  "tfe-l13-19f-25-24-defaut": "TFE-L13-19F-(25/24)-défaut",
  "tfe-l13-21f-defaut": "TFE-L13-21F-défaut",
  "tfe-l13-20f-defaut": "TFE-L13-20F-défaut",
  "tfe-l5-diesis-14f-defaut": "TFE-L5-diésis-14F-défaut",
  "tfe-3-star-5-11-14f-defaut": "TFE-3*–5–11-14F-défaut",
  "tfe-3-5-7-13-12f-defaut": "TFE-3–5–7–13-12F-défaut"
};

// Noms en vigueur jusqu'au 19 octobre 2026 (suffixe « -défaut »), reconnus pour la migration.
const TFE_PRESET_NAMES_V14 = {
  "touche-l5-defaut": "TFE-L5-12F-défaut",
  "touche-l7-defaut": "TFE-L7-12F-défaut",
  "touche-l11-defaut": "TFE-L11-12F-défaut",
  "touche-l13-defaut": "TFE-L13-12F-défaut",
  "tfe-l13-15f-defaut": "TFE-L13-15F-défaut",
  "tfe-l13-15f-16-15-defaut": "TFE-L13-15F-(33/20)-défaut",
  "tfe-l13-18f-defaut": "TFE-L13-18F-défaut",
  "tfe-l13-19f-21-20-defaut": "TFE-L13-19F-(21/20)-défaut",
  "tfe-l13-19f-25-24-defaut": "TFE-L13-19F-(25/24)-défaut",
  "tfe-l13-21f-defaut": "TFE-L13-21F-défaut",
  "tfe-l13-20f-defaut": "TFE-L13-20F-défaut",
  "tfe-l5-diesis-14f-defaut": "TFE-L5-14F-(diésis)-défaut",
  "tfe-3-star-5-11-14f-defaut": "TFE-L11-14F-(3–5–11)-défaut",
  "tfe-3-5-7-13-12f-defaut": "TFE-L13-12F-(3–5–7–13)-défaut",
  "tfe-l7-12f-21-20-7-5-propose": "TFE-L7-12F-(21/20–7/5)-proposé",
};
// Noms en vigueur jusqu'au 20 octobre 2026 (demande E), reconnus pour la migration.
const TFE_PRESET_NAMES_V17 = {
  "tfe-l5-diesis-14f-defaut": "TFE-L5-14F-(diésis)",
  "tfe-l7-12f-21-20-7-5-propose": "TFE-L7-12F-(6/5–8/5–9/5)-proposé",
};
// Ancienne suite du modèle L7 (6/5 au lieu de 7/6), remplacée si elle n'a pas été modifiée.
const TFE_L7_SCALA_V14 = ["21/20", "9/8", "6/5", "5/4", "4/3", "7/5", "3/2", "14/9", "5/3", "7/4", "15/8", "2/1"].join("\n");
// Ancienne suite du modèle L13 (avant D1), remplacée si elle n'a pas été modifiée.
const TFE_L13_SCALA_V16 = ["21/20", "9/8", "7/6", "5/4", "4/3", "11/8", "3/2", "14/9", "13/8", "7/4", "15/8", "2/1"].join("\n");

// Menus TFE et TFP par limite (Simon, 19 octobre 2026) : chaque limite est une section; le modèle de
// référence (même suite de 12 rapports en TFE et en TFP) vient en tête, puis les variations, par nombre
// croissant de rapports différents du modèle, puis (TFE) par nombre décroissant de frettes.
// Les touches enregistrées restent dans leur propre section, en premier.
const TOUCH_LIMIT_REFERENCE_IDS = {
  tfe: { 5: "touche-l5-defaut", 7: "touche-l7-defaut", 11: "touche-l11-defaut", 13: "touche-l13-defaut" },
  tfp: { 5: "tfp-l5c-g5-a", 7: "tfp-l7-a", 11: "tfp-l11-21-20-propose-a", 13: "tfp-l13-g7-a" },
};

function touchPresetRatios(entry) {
  const canonical = [...DEFAULT_TOUCH_NETWORK_CONFIGURATIONS, ...DEFAULT_TFP_NETWORK_CONFIGURATIONS]
    .find((preset) => preset.id === entry.id || preset.abstractFretPlanId === entry.id);
  const text = canonical?.scalaText
    ?? networkManager.presets.find((preset) => preset.id === entry.id)?.scalaText ?? "";
  return String(text).split(/\s+/).filter((value) => /^\d+\/\d+$/.test(value) && value !== "2/1");
}

function touchPresetName(entry) {
  const canonical = DEFAULT_TOUCH_NETWORK_CONFIGURATIONS.find((preset) =>
    preset.id === entry.id || preset.abstractFretPlanId === entry.id);
  return canonical?.name ?? entry.name ?? "";
}

/** Rapports qui distinguent une touche du modèle de sa limite : ajoutés (+) et absents (−). */
function touchPresetDifferences(entry, scope) {
  const limit = Number(/^TF[EP]-L(\d+)/.exec(touchPresetName(entry))?.[1]);
  const referenceId = TOUCH_LIMIT_REFERENCE_IDS[scope]?.[limit];
  if (!referenceId) return null;
  const reference = new Set(touchPresetRatios({ id: referenceId }));
  const ratios = touchPresetRatios(entry);
  return {
    isReference: entry.id === referenceId,
    added: ratios.filter((ratio) => !reference.has(ratio)),
    missing: [...reference].filter((ratio) => !ratios.includes(ratio)),
  };
}

// Classement des menus TFE et TFP (Simon, 19 octobre 2026) : par limite (défaut), par scordatura, par tonique.
const TOUCH_SORT_STORE_KEY = "harmonie-naturelle-tri-touches-v1";
const TOUCH_SORT_MODES = [["limit", "Limite"], ["scordatura", "Scordatura"], ["tonic", "Tonique"]];

function touchSortMode(scope) {
  try {
    const stored = JSON.parse(localStorage.getItem(TOUCH_SORT_STORE_KEY) || "{}")?.[scope];
    return TOUCH_SORT_MODES.some(([mode]) => mode === stored) ? stored : "limit";
  } catch { return "limit"; }
}

function setTouchSortMode(scope, mode) {
  try {
    const stored = JSON.parse(localStorage.getItem(TOUCH_SORT_STORE_KEY) || "{}") || {};
    stored[scope] = mode;
    localStorage.setItem(TOUCH_SORT_STORE_KEY, JSON.stringify(stored));
  } catch { /* Le classement reste celui par défaut. */ }
}

function touchPresetConfiguration(entry) {
  return networkManager.presets.find((preset) => preset.id === entry.id) ?? entry;
}

/** Scordatura d'une touche : celle que le Frettier reconnaît (TFP) ou celle enregistrée (TFE). */
function touchPresetScordatura(entry, scope) {
  const preset = touchPresetConfiguration(entry);
  if (scope === "tfp") {
    const found = typeof tfpScordaturaForNetwork === "function" ? tfpScordaturaForNetwork(preset) : null;
    return found && found.label !== "—"
      ? { label: found.label, order: TFP_SCORDATURA_CONFIGURATIONS.findIndex((item) => item.id === found.id) }
      : { label: "Sans scordatura", order: -1 };
  }
  const code = preset.savedFrettierSnapshot?.scordatura;
  return code && code !== "Personnalisé" ? { label: code, order: 1 }
    : preset.savedFrettierSnapshot ? { label: "Personnalisée", order: 2 } : { label: "Sans scordatura", order: 0 };
}

/** Note du 1/1 d'une touche, et sa hauteur en cents au-dessus de la (pour l'ordre des sections). */
function touchPresetTonic(entry, scope) {
  const preset = touchPresetConfiguration(entry);
  const ratio = scope === "tfe"
    ? preset.savedFrettierSnapshot?.referenceRatioToA ?? "1/1"
    : typeof networkGeneratorPitchRatio === "function" ? networkGeneratorPitchRatio(preset) : "1/1";
  const heji = typeof ratioToHeji === "function" ? ratioToHeji(ratio) : null;
  const label = heji && typeof plainHejiNote === "function" ? plainHejiNote(heji) : ratio;
  return { label, order: typeof ratioCents === "function" ? ratioCents(ratio) : 0 };
}

function touchSortAvailability(entries, scope) {
  return {
    limit: true,
    scordatura: scope === "tfp" || entries.some((entry) => touchPresetConfiguration(entry).savedFrettierSnapshot),
    tonic: true,
  };
}

function touchPresetSections(entries, scope = "tfe", mode = "limit") {
  const ranked = entries.map((entry, index) => {
    const name = touchPresetName(entry);
    const limitMatch = /^TF[EP]-L(\d+)/.exec(name);
    const differences = touchPresetDifferences(entry, scope);
    const group = mode === "scordatura" ? touchPresetScordatura(entry, scope)
      : mode === "tonic" ? touchPresetTonic(entry, scope) : null;
    return {
      entry, index, group,
      saved: Boolean(entry.savedFrettierSnapshot),
      limit: limitMatch ? Number(limitMatch[1]) : Infinity,
      reference: Boolean(differences?.isReference),
      variations: differences ? differences.added.length + differences.missing.length : Infinity,
      frets: Number(/-(\d+)F(?:-|$)/.exec(name)?.[1] ?? touchPresetRatios(entry).length + 1),
    };
  }).sort((first, second) => (first.group && second.group
      ? first.group.order - second.group.order || first.group.label.localeCompare(second.group.label) : 0)
    || Number(second.saved) - Number(first.saved)
    || first.limit - second.limit
    || Number(second.reference) - Number(first.reference)
    || first.variations - second.variations
    || (scope === "tfe" ? second.frets - first.frets : 0)
    || first.index - second.index);
  const sections = [];
  ranked.forEach(({ entry, saved, limit, group }) => {
    const label = group ? group.label
      : saved ? "Touches enregistrées" : Number.isFinite(limit) ? `L${limit}` : "Autres";
    let section = sections.at(-1);
    if (!section || section.label !== label) {
      section = { label, entries: [] };
      sections.push(section);
    }
    section.entries.push(entry);
  });
  return sections;
}

function touchPresetDifferenceTitle(entry, scope) {
  const differences = touchPresetDifferences(entry, scope);
  if (!differences) return "";
  if (differences.isReference) return "modèle de référence de la limite";
  const parts = [];
  if (differences.added.length) parts.push(`+ ${differences.added.join(" ")}`);
  if (differences.missing.length) parts.push(`− ${differences.missing.join(" ")}`);
  return parts.length ? `par rapport au modèle : ${parts.join(" ; ")}` : "mêmes rapports que le modèle";
}

function appendTfeMenuSections(container, entries, createChoice, scope = "tfe", { sortable = false } = {}) {
  // D8 : la fenêtre de choix des touches s'ouvre aussi depuis le panneau Réseau et la barre des autres onglets.
  if (typeof openTouchPicker === "function") {
    const open = document.createElement("button");
    open.type = "button";
    open.className = "touch-picker-open";
    open.dataset.touchPickerScope = scope;
    open.setAttribute("role", "menuitem");
    open.textContent = "Fenêtre de choix des touches…";
    container.append(open);
  }
  const mode = sortable ? touchSortMode(scope) : "limit";
  const availability = touchSortAvailability(entries, scope);
  const activeMode = availability[mode] ? mode : "limit";
  if (sortable) {
    const bar = document.createElement("div");
    bar.className = "touch-sort-bar";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Classer les touches");
    TOUCH_SORT_MODES.forEach(([value, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "touch-sort-option";
      button.dataset.touchSort = value;
      button.dataset.touchScope = scope;
      button.textContent = label;
      button.disabled = !availability[value];
      if (button.disabled) button.title = "Aucune touche enregistrée avec une scordatura";
      button.setAttribute("aria-pressed", String(value === activeMode));
      bar.append(button);
    });
    container.append(bar);
  }
  touchPresetSections(entries, scope, activeMode).forEach(({ label, entries: sectionEntries }) => {
    const heading = document.createElement("div");
    heading.className = "tfe-preset-section-heading";
    heading.setAttribute("role", "presentation");
    heading.setAttribute("aria-hidden", "true");
    // Même code de couleur que dans les noms (L5, L7, G5, D7G7…).
    if (typeof appendColorizedNetworkLabel === "function") appendColorizedNetworkLabel(heading, label);
    else heading.textContent = label;
    container.append(heading);
    sectionEntries.forEach((entry) => {
      const choice = createChoice(entry);
      choice.setAttribute("aria-label", `${label} : ${entry.name}`);
      // D8 : trois natures séparées; les positions de frettes TFE portent la mention « sans scordatura ».
      if (scope === "tfe" && typeof isFretPositionTemplate === "function"
        && isFretPositionTemplate(touchPresetConfiguration(entry))) choice.dataset.fretTemplate = "true";
      // E1 : une remarque de modèle tient lieu de description (pas de liste de rapports en plus).
      const differences = typeof TFP_MODEL_NOTES !== "undefined" && TFP_MODEL_NOTES.get(entry.id)?.note
        ? "" : touchPresetDifferenceTitle(entry, scope);
      if (differences) choice.title = [choice.title || entry.name, differences].join(" — ");
      container.append(choice);
    });
  });
}

/** Clic sur un choix de classement : le menu est redessiné et reste ouvert sur le même sous-menu. */
function handleTouchSortClick(event, rerender) {
  const button = event.target.closest?.("[data-touch-sort]");
  if (!button) return false;
  event.preventDefault();
  event.stopPropagation();
  if (!button.disabled) {
    setTouchSortMode(button.dataset.touchScope, button.dataset.touchSort);
    rerender(button.dataset.touchScope);
  }
  return true;
}

function appendTfeSelectSections(select, entries, appendOption, prefix = "", scope = "tfe") {
  touchPresetSections(entries, scope).forEach(({ label, entries: sectionEntries }) => {
    const group = document.createElement("optgroup");
    group.label = prefix + label;
    sectionEntries.forEach((entry) => appendOption(group, entry));
    select.append(group);
  });
}

function renderNetworkPresetSelector() {
  closeNetworkPresetMenu();
  elements.networkPresetSelect.replaceChildren();
  const visiblePresets = networkManager.presets.filter((preset) => networkVisibleInConfigurator(preset));
  const entries = visiblePresets.map((preset) => {
    let disabled = false;
    if (networkConfiguratorContext.expectedPitchCount) {
      try {
        disabled = preset.sourceMethod !== "scala"
          || networkModel.parseNetworkRatios(preset.scalaText).count !== networkConfiguratorContext.expectedPitchCount;
      } catch {
        disabled = true;
      }
    }
    return { id: preset.id, name: preset.name, scope: preset.scope ?? "global", disabled };
  });
  const draftIsUnsaved = networkManager.draft
    && !networkManager.presets.some((preset) => preset.id === networkManager.draft.id);
  if (draftIsUnsaved) {
    entries.push({
      id: networkManager.draft.id,
      name: `${networkManager.draft.name} · non enregistré`,
      scope: networkManager.draft.scope ?? "global",
      disabled: false,
    });
  }
  ACTIVE_NETWORK_MENU_GROUPS.forEach(([scope, label]) => {
    const groupEntries = entries.filter((entry) => entry.scope === scope);
    if (!groupEntries.length) return;
    const appendOption = (group, entry) => {
      const option = document.createElement("option");
      option.value = entry.id;
      option.textContent = entry.name;
      option.disabled = entry.disabled;
      group.append(option);
    };
    if (scope === "tfe" || scope === "tfp") {
      appendTfeSelectSections(elements.networkPresetSelect, groupEntries, appendOption,
        `${scope.toUpperCase()} — `, scope);
    } else {
      const group = document.createElement("optgroup");
      group.label = label;
      groupEntries.forEach((entry) => appendOption(group, entry));
      elements.networkPresetSelect.append(group);
    }
  });
  if (!entries.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Sélectionner un réseau";
    elements.networkPresetSelect.append(option);
  }
  const selectedId = draftIsUnsaved
    ? networkManager.draft.id
    : entries.some((entry) => entry.id === networkManager.activeId)
      ? networkManager.activeId
      : "";
  elements.networkPresetSelect.value = selectedId;
  const editingName = networkRenaming || Boolean(draftIsUnsaved);
  elements.networkPresetSelect.hidden = editingName;
  elements.networkPresetPicker.hidden = editingName;
  elements.networkNameInput.hidden = !editingName;
  elements.networkPresetMenu.replaceChildren();
  ACTIVE_NETWORK_MENU_GROUPS.forEach(([scope, label]) => {
    const groupEntries = entries.filter((entry) => entry.scope === scope);
    if (!groupEntries.length) return;
    const group = document.createElement("div");
    group.className = "network-preset-group";
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "network-preset-group-trigger";
    trigger.setAttribute("role", "menuitem");
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");
    const triggerLabel = document.createElement("span");
    triggerLabel.textContent = label;
    const arrow = document.createElement("span");
    arrow.className = "network-preset-group-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "›";
    trigger.append(triggerLabel, arrow);
    const submenu = document.createElement("div");
    submenu.className = "network-preset-submenu";
    submenu.setAttribute("role", "menu");
    submenu.setAttribute("aria-label", label);
    submenu.hidden = true;
    if (scope === "tfe" || scope === "tfp") {
      appendTfeMenuSections(submenu, groupEntries, createNetworkPresetChoice, scope, { sortable: true });
    }
    else groupEntries.forEach((entry) => submenu.append(createNetworkPresetChoice(entry)));
    group.append(trigger, submenu);
    elements.networkPresetMenu.append(group);
  });
  const selectedLabel = entries.find((entry) => entry.id === selectedId)?.name ?? "Sélectionner un réseau";
  appendColorizedNetworkLabel(elements.networkPresetButtonLabel, selectedLabel);
  elements.networkPresetButton.setAttribute("aria-label", `Réseau actif : ${selectedLabel}`);
  elements.networkPresetButton.title = selectedLabel;
  elements.networkPresetButton.disabled = !entries.length;
  renderActiveNetworkSelector();
}

function networkBulkActions(scope) {
  const actions = document.createElement("div");
  actions.className = "network-config-bulk-actions";
  const scopeLabels = {
    families: "Sélection globale des toniques",
    functions: "Sélection globale des fonctions",
    modes: "Sélection globale des modes",
  };
  const datasetKeys = {
    families: "networkFamilyBulk",
    functions: "networkFunctionBulk",
    modes: "networkModeBulk",
  };
  actions.setAttribute("aria-label", scopeLabels[scope]);
  [
    ["all", "Tout"],
    ["none", "Rien"],
  ].forEach(([value, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset[datasetKeys[scope]] = value;
    actions.append(button);
  });
  return actions;
}

const networkOpenConfiguratorSections = new Set();
const networkDraftHistory = { undo: [], redo: [] };
let networkEditingField = null;
let networkOpeningSnapshot = null;
let networkPendingAction = null;
let networkCommitAfterSave = null;
let networkRenaming = false;
let networkMethodLocked = true;

function networkDraftIsDirty() {
  if (!networkManager.draft) return false;
  const saved = networkManager.presets.find((preset) => preset.id === networkManager.draft.id);
  return !saved || networkConfiguratorMethod !== networkManager.draft.sourceMethod
    || JSON.stringify(networkManager.draft) !== JSON.stringify(saved);
}

function guardNetworkDraft(action) {
  if (!networkDraftIsDirty()) { action(); return; }
  networkPendingAction = action;
  elements.networkUnsavedDialog.showModal();
}

function networkDraftSnapshot() {
  return {
    draft: cloneNetworkConfiguration(networkManager.draft),
    method: networkConfiguratorMethod,
    isNewDraft: networkManager.isNewDraft,
    methodLocked: networkMethodLocked,
  };
}

function restoreNetworkDraftSnapshot(snapshot) {
  networkManager.draft = cloneNetworkConfiguration(snapshot.draft);
  networkConfiguratorMethod = snapshot.method;
  networkManager.isNewDraft = snapshot.isNewDraft;
  networkMethodLocked = snapshot.methodLocked;
  networkEditingField = null;
}

function networkDraftMatchesOpening() {
  return !networkOpeningSnapshot || JSON.stringify(networkDraftSnapshot()) === JSON.stringify(networkOpeningSnapshot);
}

function rememberNetworkDraftChange() {
  if (!networkManager.draft) return;
  networkDraftHistory.undo.push(networkDraftSnapshot());
  if (networkDraftHistory.undo.length > 80) networkDraftHistory.undo.shift();
  networkDraftHistory.redo.length = 0;
  elements.networkConfigUndo.disabled = false;
  elements.networkConfigRedo.disabled = true;
  elements.networkConfigReset.disabled = false;
}

function rememberNetworkTextEdit(field) {
  if (networkEditingField !== field) {
    rememberNetworkDraftChange();
    networkEditingField = field;
  }
}

function travelNetworkDraftHistory(direction) {
  const source = networkDraftHistory[direction];
  const target = networkDraftHistory[direction === "undo" ? "redo" : "undo"];
  if (!source.length || !networkManager.draft) return;
  target.push(networkDraftSnapshot());
  const snapshot = source.pop();
  restoreNetworkDraftSnapshot(snapshot);
  previewNetworkDraft();
}

function resetNetworkDraftToOpening() {
  if (!networkManager.draft || networkDraftMatchesOpening()) return;
  rememberNetworkDraftChange();
  restoreNetworkDraftSnapshot(networkOpeningSnapshot);
  previewNetworkDraft("Configuration rétablie à l’ouverture du panneau.");
}

function networkDetails(key, title, { open = false } = {}) {
  const details = document.createElement("details");
  details.className = "network-config-tree-section";
  details.open = networkOpenConfiguratorSections.has(key) || open;
  const summary = document.createElement("summary");
  if (typeof title === "string") summary.textContent = title;
  else summary.append(title);
  details.append(summary);
  details.addEventListener("toggle", () => {
    if (!details.isConnected) return;
    if (details.open) networkOpenConfiguratorSections.add(key);
    else networkOpenConfiguratorSections.delete(key);
  });
  return details;
}

function networkGeneratorPitchRatio(configuration) {
  return multiplyAndReduce(configuration.referenceRatio, configuration.generatorRatio)
    ?? configuration.generatorRatio;
}

function appendNetworkPitchChoice(container, ratio) {
  container.replaceChildren(createHejiPitch(ratio, false, { applyReference: false }));
}

function closeNetworkPitchMenus() {
  elements.networkGeneratorNoteMenu.hidden = true;
  elements.networkGeneratorNote.setAttribute("aria-expanded", "false");
}

function toggleNetworkPitchMenu(button, menu) {
  const willOpen = menu.hidden;
  closeNetworkPitchMenus();
  menu.hidden = !willOpen;
  button.setAttribute("aria-expanded", String(willOpen));
  if (willOpen) (menu.querySelector('[aria-pressed="true"]') ?? menu.querySelector("button"))?.focus();
}

function renderNetworkPitchChoices(menu, selectedRatio) {
  menu.replaceChildren();
  NETWORK_DEFAULT_TONIC_FAMILY_ORDER.forEach((familyKey) => {
    const group = document.createElement("section");
    group.className = "network-pitch-family-group";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", `Famille ${FAMILY_DEFINITIONS[familyKey].shortLabel}`);
    const heading = document.createElement("strong");
    heading.className = "network-pitch-family-heading";
    appendTonicFamilyLabel(heading, familyKey);
    const options = document.createElement("div");
    options.className = "network-pitch-family-options";
    NETWORK_DEFAULT_TONIC_CHOICES[familyKey].forEach((ratio) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "network-pitch-option";
      button.dataset.networkGeneratorPitchRatio = ratio;
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", String(ratio === selectedRatio));
      button.setAttribute("aria-pressed", String(ratio === selectedRatio));
      const notation = ratioToHeji(ratio, { applyReference: false });
      button.setAttribute("aria-label", `Choisir ${notation ? plainHejiNote(notation) : ratio}, famille ${FAMILY_DEFINITIONS[familyKey].shortLabel}`);
      appendNetworkPitchChoice(button, ratio);
      const ratioLabel = document.createElement("span");
      ratioLabel.className = "network-pitch-option-ratio";
      ratioLabel.append(createColorizedRatio(ratio));
      button.append(ratioLabel);
      options.append(button);
    });
    group.append(heading, options);
    menu.append(group);
  });
}

function renderNetworkPitchControls(configuration) {
  closeNetworkPitchMenus();
  const generatorPitchRatio = networkGeneratorPitchRatio(configuration);
  appendNetworkPitchChoice(elements.networkGeneratorNote, generatorPitchRatio);
  renderNetworkPitchChoices(elements.networkGeneratorNoteMenu, generatorPitchRatio);
}

function renderImportedNetworkFamilyConfiguration(configuration) {
  const tree = document.createElement("div");
  tree.className = "network-config-tree";
  const selected = new Set(importedNetworkTonics(configuration));
  importedNetworkTonicGroups(configuration).forEach(({ displayRatio, tonics }) => {
    const count = tonics.filter((tonic) => selected.has(tonic)).length;
    const title = document.createElement("span");
    const familyCheck = document.createElement("input");
    familyCheck.type = "checkbox";
    familyCheck.checked = count === tonics.length;
    familyCheck.indeterminate = count > 0 && count < tonics.length;
    familyCheck.dataset.networkImportedFamily = displayRatio;
    familyCheck.setAttribute("aria-label", `Famille ${displayRatio}*`);
    familyCheck.addEventListener("click", (event) => event.stopPropagation());
    title.append(familyCheck, createColorizedRatio(displayRatio), document.createTextNode("*"));
    const details = networkDetails(`imported-tonics:${displayRatio}`, title);
    const actions = networkBulkActions("families");
    actions.classList.add("network-local-bulk");
    actions.querySelectorAll("button").forEach((button) => {
      delete button.dataset.networkFamilyBulk;
      button.dataset.networkImportedBulk = displayRatio;
      button.dataset.networkBulkAction = button.textContent === "Tout" ? "all" : "none";
    });
    const list = document.createElement("div");
    list.className = "network-config-choice-list network-tonic-choices";
    tonics.forEach((tonic) => {
      const label = document.createElement("label");
      label.className = "network-config-choice";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = selected.has(tonic);
      checkbox.dataset.networkImportedTonic = tonic;
      const ratio = document.createElement("span");
      ratio.className = "network-config-choice-ratio";
      ratio.append(createColorizedRatio(divideAndReduce(tonic, configuration.generatorRatio)));
      label.append(checkbox, createHejiPitch(tonic, false, { applyReference: false }), ratio);
      list.append(label);
    });
    details.append(actions, list);
    tree.append(details);
  });
  elements.networkFamilyBulk.replaceChildren(...networkBulkActions("families").children);
  elements.networkFamilyConfig.replaceChildren(tree);
}

function refreshImportedNetworkFilters() {
  if (!networkManager.draft || networkConfiguratorMethod !== "scala") return;
  // Frettier retains its ratios-only editor. Global entered networks reuse
  // Toniques and Modes; functions never participate in their pitch pool.
  if (networkManager.draft.scope !== "global") {
    elements.networkConfigurePanel.hidden = true;
    return;
  }
  try {
    const configuration = normalizeNetworkConfiguration({
      ...networkManager.draft, sourceMethod: "scala",
      scalaText: elements.networkScalaInput.value,
    }, networkManager.draft.id);
    elements.networkConfigurePanel.hidden = false;
    renderImportedNetworkFamilyConfiguration(configuration);
    if (document.querySelector("#network-modes-title")?.parentElement?.open) {
      renderNetworkModeConfiguration(configuration);
    } else {
      elements.networkModeBulk.replaceChildren(...networkBulkActions("modes").children);
    }
  } catch {
    // No stale choices against incomplete input. Keep the text editable.
    elements.networkConfigurePanel.hidden = true;
  }
}

function renderNetworkFamilyConfiguration(configuration) {
  const tree = document.createElement("div");
  tree.className = "network-config-tree";
  NETWORK_FAMILY_ORDER.forEach((familyKey) => {
    const familyConfiguration = configuration.families[familyKey];
    const title = document.createElement("span");
    const familyCheck = document.createElement("input");
    familyCheck.type = "checkbox";
    familyCheck.checked = familyConfiguration.enabled;
    familyCheck.disabled = Boolean(NETWORK_FAMILY_BLUEPRINTS[familyKey].locked);
    familyCheck.dataset.networkFamilyEnabled = familyKey;
    familyCheck.setAttribute("aria-label", `Famille ${FAMILY_DEFINITIONS[familyKey].shortLabel}`);
    familyCheck.addEventListener("click", (event) => event.stopPropagation());
    title.append(familyCheck);
    appendTonicFamilyLabel(title, familyKey);
    const details = networkDetails(`tonics:${familyKey}`, title);
    details.classList.toggle("is-inactive", !familyConfiguration.enabled);
    const localActions = networkBulkActions("families");
    localActions.classList.add("network-local-bulk");
    localActions.querySelectorAll("button").forEach((button) => {
      delete button.dataset.networkFamilyBulk;
      button.dataset.networkFamilyLocalBulk = familyKey;
      button.dataset.networkBulkAction = button.textContent === "Tout" ? "all" : "none";
      button.disabled = !familyConfiguration.enabled;
    });
    const list = document.createElement("div");
    list.className = "network-config-choice-list network-tonic-choices";
    const anchor = multiplyNetworkRatio(configuration.generatorRatio,
      NETWORK_FAMILY_BLUEPRINTS[familyKey].seedMultiplier);
    generatedFamilyTonics({ ...configuration, families: {
      ...configuration.families, [familyKey]: { ...familyConfiguration, enabled: true },
    } }, familyKey).forEach((tonic) => {
      const label = document.createElement("label");
      label.className = "network-config-choice";
      label.classList.toggle("is-family-anchor", tonic === anchor);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = familyConfiguration.selectedTonics.includes(tonic);
      checkbox.disabled = !familyConfiguration.enabled;
      checkbox.dataset.networkFamilyTonic = familyKey;
      checkbox.dataset.networkTonicRatio = tonic;
      const note = createHejiPitch(tonic, false, { applyReference: false });
      const ratio = document.createElement("span");
      ratio.className = "network-config-choice-ratio";
      ratio.append(createColorizedRatio(tonic));
      label.append(checkbox, note, ratio);
      list.append(label);
    });
    details.append(localActions, list);
    tree.append(details);
  });
  elements.networkFamilyBulk.replaceChildren(...networkBulkActions("families").children);
  elements.networkFamilyConfig.replaceChildren(tree);
}

const NETWORK_FUNCTION_LIMITS = [5, 7, 11, 13];

function modalFunctionLimit(ratio) {
  const primes = factorOddPrimes(parseFraction(ratio));
  return NETWORK_FUNCTION_LIMITS.findLast((prime) => primes.has(BigInt(prime))) ?? 5;
}

function renderNetworkFunctionConfiguration(configuration) {
  const tree = document.createElement("div");
  tree.className = "network-config-tree";
  NETWORK_FAMILY_ORDER.forEach((familyKey) => {
    const familyConfiguration = configuration.families[familyKey];
    const title = document.createElement("span");
    appendTonicFamilyLabel(title, familyKey);
    const details = networkDetails(`functions:${familyKey}`, title);
    details.classList.toggle("is-inactive", !familyConfiguration.enabled);
    const localActions = networkBulkActions("functions");
    localActions.classList.add("network-local-bulk");
    localActions.querySelectorAll("button").forEach((button) => {
      delete button.dataset.networkFunctionBulk;
      button.dataset.networkFunctionLocalBulk = familyKey;
      button.dataset.networkBulkAction = button.textContent === "Tout" ? "all" : "none";
      button.disabled = !familyConfiguration.enabled;
    });
    const columns = document.createElement("div");
    columns.className = "network-function-columns";
    columns.setAttribute("role", "group");
    columns.setAttribute("aria-label", `Fonctions modales de la famille ${FAMILY_DEFINITIONS[familyKey].shortLabel}`);
    NETWORK_FUNCTION_LIMITS.forEach((limit) => {
      const column = document.createElement("section");
      column.className = "network-function-column";
      const heading = document.createElement("label");
      heading.className = "network-function-column-heading";
      const limitCheck = document.createElement("input");
      limitCheck.type = "checkbox";
      limitCheck.dataset.networkFunctionLimit = String(limit);
      limitCheck.dataset.networkFunctionFamily = familyKey;
      limitCheck.disabled = !familyConfiguration.enabled;
      const ratios = OPTIONAL_MODAL_FUNCTION_RATIOS.filter((ratio) => modalFunctionLimit(ratio) === limit)
        .sort((first, second) => ratioCents(first) - ratioCents(second));
      const selectedCount = ratios.filter((ratio) => familyConfiguration.functions.includes(ratio)).length;
      limitCheck.checked = selectedCount > 0 && selectedCount === ratios.length;
      limitCheck.indeterminate = selectedCount > 0 && selectedCount < ratios.length;
      limitCheck.setAttribute("aria-label", `Toutes les fonctions de limite ${limit}`);
      heading.append(limitCheck, document.createTextNode(String(limit)));
      column.append(heading);
      ratios.forEach((ratio) => {
        const label = document.createElement("label");
        label.className = "network-function-choice";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = familyConfiguration.functions.includes(ratio);
        checkbox.disabled = !familyConfiguration.enabled;
        checkbox.dataset.networkFamilyFunction = familyKey;
        checkbox.dataset.networkFunctionRatio = ratio;
        label.append(checkbox, createColorizedRatio(ratio));
        column.append(label);
      });
      columns.append(column);
    });
    details.append(localActions, columns);
    tree.append(details);
  });
  elements.networkFunctionBulk.replaceChildren(...networkBulkActions("functions").children);
  elements.networkFunctionConfig.replaceChildren(tree);
}

let networkPossibleModesCache = null;

function networkPossibleModeIds(configuration) {
  const signature = JSON.stringify({
    generatorRatio: configuration.generatorRatio,
    sourceMethod: configuration.sourceMethod,
    scalaText: configuration.scalaText,
    families: configuration.families,
    selectedTonicRatios: configuration.selectedTonicRatios,
  });
  if (networkPossibleModesCache?.signature === signature) return networkPossibleModesCache.ids;
  const unrestricted = { ...configuration, excludedModeIds: [] };
  const tonics = configuredNetworkTonics(configuration);
  const ids = new Set(MODE_PRESETS.filter((mode) => tonics.some((tonic) => (
    networkAdmitsModeAtTonic(tonic, mode, unrestricted)
  ))).map((mode) => mode.id));
  networkPossibleModesCache = { signature, ids };
  return ids;
}

function renderNetworkModeConfiguration(configuration) {
  const tree = document.createElement("div");
  tree.className = "network-config-tree";
  const possibleIds = networkPossibleModeIds(configuration);
  MODE_GROUPS.forEach((group, groupIndex) => {
    const groupTitle = document.createElement("span");
    const groupCheck = document.createElement("input");
    groupCheck.type = "checkbox";
    groupCheck.dataset.networkModeGroup = String(groupIndex);
    groupCheck.setAttribute("aria-label", `Tous les modes de ${group.label}`);
    groupCheck.addEventListener("click", (event) => event.stopPropagation());
    groupTitle.append(groupCheck, document.createTextNode(group.label));
    const details = networkDetails(`modes:${groupIndex}`, groupTitle);
    const groupModes = MODE_PRESETS.filter((mode) => mode.group === group.label);
    const groupPossible = groupModes.filter((mode) => possibleIds.has(mode.id));
    const groupSelected = groupPossible.filter((mode) => !configuration.excludedModeIds.includes(mode.id)).length;
    groupCheck.checked = groupPossible.length > 0 && groupSelected === groupPossible.length;
    groupCheck.indeterminate = groupSelected > 0 && groupSelected < groupPossible.length;
    groupCheck.disabled = groupPossible.length === 0;
    group.families.forEach((family, familyIndex) => {
      const familyTitle = document.createElement("span");
      const familyCheck = document.createElement("input");
      familyCheck.type = "checkbox";
      familyCheck.dataset.networkModeFamily = `${groupIndex}:${familyIndex}`;
      familyCheck.setAttribute("aria-label", `Tous les modes de ${family.label}`);
      familyCheck.addEventListener("click", (event) => event.stopPropagation());
      familyTitle.append(familyCheck, document.createTextNode(family.label));
      const familyDetails = networkDetails(`modes:${groupIndex}:${familyIndex}`, familyTitle,
        { open: details.open });
      const list = document.createElement("div");
      list.className = "network-config-choice-list";
      const familyPossible = [];
      family.presets.forEach((preset, presetIndex) => {
        const mode = MODE_PRESETS.find((entry) => entry.id === `${groupIndex}-${familyIndex}-${presetIndex}`);
        if (!mode) return;
        const possible = possibleIds.has(mode.id);
        if (possible) familyPossible.push(mode);
        const label = document.createElement("label");
        label.className = "network-config-choice";
        label.classList.toggle("is-inactive", !possible);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = possible && !configuration.excludedModeIds.includes(mode.id);
        checkbox.disabled = !possible;
        checkbox.dataset.networkModeId = mode.id;
        const text = document.createElement("span");
        const marker = mode.label.search(/\bL(?:5|7|11|13)/);
        if (marker < 0) text.textContent = mode.label;
        else {
          text.append(document.createTextNode(mode.label.slice(0, marker)));
          appendColorizedModeLimit(text, mode.label.slice(marker));
        }
        label.append(checkbox, text);
        list.append(label);
      });
      const familySelected = familyPossible.filter((mode) => !configuration.excludedModeIds.includes(mode.id)).length;
      familyCheck.checked = familyPossible.length > 0 && familySelected === familyPossible.length;
      familyCheck.indeterminate = familySelected > 0 && familySelected < familyPossible.length;
      familyCheck.disabled = familyPossible.length === 0;
      familyDetails.append(list);
      details.append(familyDetails);
    });
    details.addEventListener("toggle", () => {
      if (details.open) details.querySelectorAll(":scope > details").forEach((child) => { child.open = true; });
    });
    tree.append(details);
  });
  elements.networkModeBulk.replaceChildren(...networkBulkActions("modes").children);
  elements.networkModeConfig.replaceChildren(tree);
}

let networkPreviewFrame = null;
let networkPreviewTimer = null;
let networkPreviewSignature = "";

function networkPreviewConfiguration() {
  const draft = networkManager.draft;
  if (!draft) return null;
  if (networkConfiguratorMethod !== "scala") return draft;
  const scalaText = elements.networkScalaInput.value;
  if (!scalaText.trim()) throw new Error("Entrez des hauteurs pour afficher l’aperçu.");
  if (draft.sourceMethod === "scala" && scalaText === draft.scalaText) return draft;
  return normalizeNetworkConfiguration({ ...draft, sourceMethod: "scala", scalaText }, draft.id);
}

function networkPreviewPitchRatios(configuration) {
  // The diagram's 1/1 is the selected tonic, while the network pool remains
  // expressed against the fixed A diapason for every other consumer.
  return fullNetworkPitchRatios(configuration)
    .map((pitch) => divideAndReduce(pitch, configuration.generatorRatio))
    .filter(Boolean);
}

function renderNetworkPreview() {
  networkPreviewFrame = null;
  if (!elements.networkPreviewGraph || elements.networkConfigDrawer.hidden) return;
  try {
    const configuration = networkPreviewConfiguration();
    if (!configuration) return;
    // D8 : des positions de frettes sans scordatura ne forment pas un réseau; on le dit au lieu de le dessiner.
    if (isFretPositionTemplate(configuration)) {
      const notice = document.createElement("p");
      notice.className = "network-preview-template-notice";
      notice.textContent = "Positions de frettes, sans scordatura : pas un réseau.";
      elements.networkPreviewGraph.replaceChildren(notice);
      networkPreviewSignature = "";
      syncPanelTouchLattice(null);
      schedulePanelPolyvalence(null);
      elements.networkPreviewStatus.textContent = "";
      return;
    }
    const ratios = networkPreviewPitchRatios(configuration);
    const signature = JSON.stringify([
      configuration.name,
      ratios,
      state.catalog,
      state.graphSystem,
      state.connectionLevel,
      state.simonAxis5Length,
      state.simon1Axis5Length,
    ]);
    if (signature !== networkPreviewSignature || !elements.networkPreviewGraph.childElementCount) {
      const figure = createSummaryNetworkFigure({
        name: configuration.name,
        pitchRatios: ratios,
      }, "none");
      elements.networkPreviewGraph.replaceChildren(figure);
      networkPreviewSignature = signature;
      syncPanelTouchLattice(configuration);
      schedulePanelPolyvalence(configuration);
    }
    positionSummaryNetworkLabels(elements.networkPreviewGraph);
    elements.networkPreviewStatus.textContent = "";
  } catch (error) {
    elements.networkPreviewStatus.textContent = error.message;
    // Lors d’une saisie incomplète, garder le dernier graphe valide visible.
  }
}

function scheduleNetworkPreview({ debounceMs = 0 } = {}) {
  if (!elements.networkPreviewGraph || elements.networkConfigDrawer.hidden
    || typeof requestAnimationFrame !== "function"
    || typeof cancelAnimationFrame !== "function") return;
  if (networkPreviewTimer !== null) clearTimeout(networkPreviewTimer);
  if (networkPreviewFrame !== null) cancelAnimationFrame(networkPreviewFrame);
  const scheduleFrame = () => {
    networkPreviewTimer = null;
    networkPreviewFrame = requestAnimationFrame(renderNetworkPreview);
  };
  if (debounceMs > 0) networkPreviewTimer = setTimeout(scheduleFrame, debounceMs);
  else scheduleFrame();
}

function renderNetworkConfigurator(message = "") {
  renderNetworkPresetSelector();
  if (!networkManager.draft) return;
  const configuration = networkManager.draft;
  elements.networkConfigDrawer.dataset.context = networkConfiguratorContext.source;
  elements.networkNameInput.value = configuration.name;
  elements.networkDiapasonInput.value = String(configuration.diapasonHz);
  renderNetworkPitchControls(configuration);
  const fromScala = networkConfiguratorMethod === "scala";
  if (!fromScala) {
    renderNetworkFamilyConfiguration(configuration);
    renderNetworkFunctionConfiguration(configuration);
    if (document.querySelector("#network-modes-title")?.parentElement?.open) {
      renderNetworkModeConfiguration(configuration);
    } else {
      elements.networkModeBulk.replaceChildren(...networkBulkActions("modes").children);
    }
  }
  elements.networkConfigurePanel.hidden = fromScala;
  elements.networkScalaPanel.hidden = !fromScala;
  elements.networkMethodConfigure.setAttribute("aria-pressed", String(!fromScala));
  elements.networkMethodScala.setAttribute("aria-pressed", String(fromScala));
  elements.networkMethodConfigure.disabled = networkConfiguratorContext.ratiosOnly
    || (networkMethodLocked && configuration.sourceMethod !== "configure");
  elements.networkMethodScala.disabled = networkMethodLocked && configuration.sourceMethod !== "scala";
  const methodChoiceAvailable = !networkMethodLocked && !networkConfiguratorContext.ratiosOnly;
  if (elements.networkMethodSwitch) elements.networkMethodSwitch.hidden = !methodChoiceAvailable;
  if (elements.networkLockedMethodLabel) {
    elements.networkLockedMethodLabel.hidden = true;
    elements.networkLockedMethodLabel.textContent = "";
  }
  elements.networkScalaInput.value = configuration.scalaText;
  document.querySelector("#network-functions-section").hidden = fromScala;
  document.querySelector("#network-data-export-section").hidden = fromScala;
  if (fromScala) refreshImportedNetworkFilters();
  updateNetworkDataControls();
  elements.networkConfigStatus.textContent = message;
  const dirty = networkDraftIsDirty();
  elements.networkSaveButton.disabled = !dirty || Boolean(configuration.savedFrettierSnapshot);
  elements.networkDirtyIndicator.hidden = !dirty;
  elements.networkDuplicateButton.disabled = !configuration;
  elements.networkRenameButton.disabled = !configuration || Boolean(configuration.savedFrettierSnapshot);
  elements.networkDeleteButton.disabled = networkManager.isNewDraft || networkManager.presets.length <= 1;
  elements.networkConfigUndo.disabled = networkDraftHistory.undo.length === 0;
  elements.networkConfigRedo.disabled = networkDraftHistory.redo.length === 0;
  elements.networkConfigReset.disabled = networkDraftMatchesOpening();
  scheduleNetworkPreview();
}

function updateNetworkDataControls() {
  const text = elements.networkScalaInput.value ?? "";
  elements.networkScalaApply.disabled = Boolean(networkManager.draft?.savedFrettierSnapshot)
    || (networkConfiguratorMethod === "scala" && !text.trim());
  elements.networkScalaApply.textContent = "Enregistrer et quitter";
}

function reportNetworkDataError(error) {
  elements.networkScalaInput.setAttribute("aria-invalid", "true");
  elements.networkScalaStatus.textContent = error.message;
}

function validateNetworkConfiguratorData(configuration) {
  if (configuration.sourceMethod === "scala" && configuration.scope === "global"
    && importedNetworkTonics(configuration).length === 0) {
    throw new Error("Sélectionne au moins une tonique parmi les notes saisies.");
  }
  if (!networkConfiguratorContext.expectedPitchCount || configuration.sourceMethod !== "scala") return;
  const parsed = networkModel.parseNetworkRatios(configuration.scalaText);
  if (parsed.count !== networkConfiguratorContext.expectedPitchCount) {
    throw new Error(`Le modèle du Frettier doit contenir exactement ${networkConfiguratorContext.expectedPitchCount} hauteurs distinctes.`);
  }
  if (networkConfiguratorContext.source === "frettier-tfp" && !tfpScordaturaForNetwork(configuration)) {
    throw new Error("Entrer un système valide.");
  }
}

function previewNetworkDraft(message = "") {
  if (!networkManager.draft) return false;
  if (networkManager.draft.sourceMethod === "scala" && !networkManager.draft.scalaText.trim()) {
    renderNetworkConfigurator(message);
    elements.networkScalaInput.setAttribute("aria-invalid", "false");
    elements.networkScalaStatus.textContent = "";
    return false;
  }
  // Les choix restent locaux jusqu'à Enregistrer : aucun index ou onglet du site
  // n'est recalculé pendant la sélection des cases.
  try {
    validateNetworkConfiguratorData(networkManager.draft);
    networkManager.draft = normalizeNetworkConfiguration(networkManager.draft, networkManager.draft.id);
  }
  catch (error) { renderNetworkConfigurator(); reportNetworkDataError(error); return false; }
  elements.networkScalaInput.setAttribute("aria-invalid", "false");
  elements.networkScalaStatus.textContent = "";
  renderNetworkConfigurator(message);
  return true;
}

function setNetworkConfiguratorContext(context = {}) {
  const nextSource = context.source === "frettier-tfp"
    ? "frettier-tfp"
    : context.source === "frettier-tfe"
      ? "frettier-tfe"
      : context.source === "analysis"
        ? "analysis"
        : "modes";
  if (networkConfiguratorContext.source !== nextSource && elements.networkConfigDrawer.hidden) {
    networkManager.draft = null;
    networkManager.isNewDraft = false;
  }
  networkConfiguratorContext.source = nextSource;
  networkConfiguratorContext.expectedPitchCount = context.expectedPitchCount === 12 ? 12 : null;
  networkConfiguratorContext.ratiosOnly = Boolean(context.ratiosOnly);
  const seedLimit = networkConfiguratorContext.expectedPitchCount ?? 128;
  networkConfiguratorContext.seedRatios = Array.isArray(context.seedRatios)
    ? context.seedRatios.filter((ratio) => typeof ratio === "string" && /^\d+\s*\/\s*\d+$/.test(ratio)).slice(0, seedLimit)
    : [];
}

function openNetworkConfigurator({ newDraft = false, context = null } = {}) {
  if (context) setNetworkConfiguratorContext(context);
  const ratiosOnly = networkConfiguratorContext.ratiosOnly;
  const expectsFiniteFretboard = networkConfiguratorContext.expectedPitchCount === 12;
  const targetScope = networkScopeForSource();
  if (newDraft) {
    networkManager.isNewDraft = true;
    networkManager.draft = normalizeNetworkConfiguration({
      ...cloneNetworkConfiguration(DEFAULT_NETWORK_CONFIGURATION),
      id: networkPresetId(),
      name: networkNameForScope("Nouveau réseau", targetScope),
      scope: targetScope,
      sourceMethod: ratiosOnly ? "scala" : "configure",
      scalaText: ratiosOnly ? networkConfiguratorContext.seedRatios.join("\n") : "",
    });
  } else if (ratiosOnly) {
    const active = activeNetworkPreset();
    let activeIsCompatible = false;
    try {
      activeIsCompatible = networkVisibleInConfigurator(active)
        && active.sourceMethod === "scala"
        && (!expectsFiniteFretboard
          || networkModel.parseNetworkRatios(active.scalaText).count === 12)
        && (targetScope !== "tfp" || Boolean(tfpScordaturaForNetwork(active)));
    } catch {
      activeIsCompatible = false;
    }
    if (activeIsCompatible) {
      networkManager.isNewDraft = false;
      networkManager.draft = cloneNetworkConfiguration(active);
    } else {
      networkManager.isNewDraft = true;
      networkManager.draft = normalizeNetworkConfiguration({
        ...cloneNetworkConfiguration(DEFAULT_NETWORK_CONFIGURATION),
        id: networkPresetId(),
        name: networkNameForScope(
          networkConfiguratorContext.source === "analysis"
            ? "Nouveau réseau"
            : "Nouveau réseau de touche",
          targetScope,
        ),
        scope: targetScope,
        sourceMethod: "scala",
        scalaText: networkConfiguratorContext.seedRatios.join("\n"),
      });
    }
  } else {
    networkManager.isNewDraft = false;
    networkManager.draft = cloneNetworkConfiguration(activeNetworkPreset());
  }
  networkConfiguratorMethod = networkManager.draft.sourceMethod === "scala" ? "scala" : "configure";
  networkRenaming = newDraft || networkManager.isNewDraft;
  networkMethodLocked = !newDraft;
  networkDraftHistory.undo.length = 0;
  networkDraftHistory.redo.length = 0;
  networkEditingField = null;
  networkOpenConfiguratorSections.clear();
  elements.networkConfigurePanel.querySelectorAll(".network-config-main-section > details")
    .forEach((details) => { details.open = false; });
  networkOpeningSnapshot = networkDraftSnapshot();
  elements.networkConfigDrawer.hidden = false;
  renderNetworkConfigurator();
  if (newDraft) {
    elements.networkNameInput.focus();
    elements.networkNameInput.select();
  }
}

function closeNetworkConfigurator({ restoreFocus = true } = {}) {
  if (networkDraftIsDirty()) {
    guardNetworkDraft(() => closeNetworkConfigurator({ restoreFocus }));
    return;
  }
  if (networkPreviewTimer !== null) clearTimeout(networkPreviewTimer);
  if (networkPreviewFrame !== null) cancelAnimationFrame(networkPreviewFrame);
  networkPreviewTimer = null;
  networkPreviewFrame = null;
  closeNetworkPitchMenus();
  elements.networkConfigDrawer.hidden = true;
  networkManager.draft = null;
  networkCommitAfterSave = null;
  networkRenaming = false;
  renderNetworkPresetSelector();
  if (restoreFocus && !networkConfiguratorContext.source.startsWith("frettier")) {
    elements.networkConfigureButton.focus();
  }
}

let networkAnalysisCatalogCache = null;
function networkAnalysisCatalog() {
  if (networkAnalysisCatalogCache) return networkAnalysisCatalogCache;
  const catalog = [];
  concordantIntervalCatalog().slice().sort((a,b) => a.cents-b.cents).forEach((entry) => {
    const group = INTERVAL_MENU_GROUPS.find(({ genericNumbers }) => genericNumbers.includes(entry.genericNumber));
    if (group) catalog.push({ id: `interval:${entry.id}`, kind: "intervalles", group: group.label,
      family: entry.id, label: `${entry.proportion} · ${entry.intervalName}`,
      ratios: ["1/1", entry.ratio], columnLabels: ["1", modeDegreeLabel(entry.ratio, entry.genericNumber - 1)], limit: selectionLimitLabel([entry.ratio]),
      isDefault: entry.ratio === IONIAN_DEFAULT_INTERVAL_RATIO_BY_GROUP.get(group.label) });
  });
  chordData.columns.forEach((column) => column.names.forEach((name) => {
    const chord = chordData.chords[name];
    const seen = new Set();
    chord.variants.forEach((variant, index) => {
      const ratios = chordFunctionRatios(chord, variant);
      const signature = ratios.slice().sort().join(",");
      if (seen.has(signature)) return;
      seen.add(signature);
      const degrees = variant.functionDegrees ?? chord.functionDegrees ?? chord.degrees;
      catalog.push({ id: `chord:${name}:${index}`, kind: "accords", group: column.group,
        family: name, label: name, ratios, columnLabels: degrees.map(normalizedChordDegreeLabel),
        limit: chordVariantLimitLabel(name, index, variant), isDefault: name === column.names[0] });
    });
  }));
  TETRACHORD_CATALOG.forEach((entry) => catalog.push({ id: `tetra:${entry.code}`, kind: "tetracordes",
    group: entry.family, family: entry.code, label: entry.code, ratios: entry.ratios,
    columnLabels: entry.ratios.map((ratio, index) => modeDegreeLabel(ratio, index)),
    limit: selectionLimitLabel(entry.ratios), isDefault: modeTetrachordApi.groups.find(group => group.label === entry.family)?.codes[0] === entry.code }));
  MODE_PRESETS.forEach((mode) => catalog.push({ id: `mode:${mode.id}`, kind: "modes",
    group: mode.group, family: mode.family, label: formatModeLabel(mode.family),
    ratios: mode.ratios, columnLabels: mode.ratios.map((ratio, index) => modeDegreeLabel(ratio, index)),
    limit: modeSpecificLabel(mode), isDefault: mode.family === MODE_GROUP_DEFAULT_FAMILIES.get(mode.group) }));

  const byId = new Map(catalog.map((pattern) => [pattern.id, pattern]));
  const modePattern = (mode) => mode ? byId.get(`mode:${mode.id}`) : null;
  const modeSource = (pattern) => pattern?.kind === "modes"
    ? MODE_PRESETS.find((mode) => `mode:${mode.id}` === pattern.id) ?? null : null;
  const uniquePatterns = (patterns) => [...new Map(patterns.filter(Boolean).map((pattern) => [pattern.id, pattern])).values()];
  const chordModelLabelsForPattern = (pattern) => {
    if (pattern?.kind !== "accords") return [];
    const chord = chordData.chords[pattern.family];
    if (!chord) return [];
    const signature = pattern.ratios.slice().sort().join(",");
    return [...new Set(chord.variants.flatMap((variant, index) => (
      chordFunctionRatios(chord, variant).slice().sort().join(",") === signature
        ? [CHORD_MODE_MODELS[pattern.family]?.[index]].filter(Boolean) : []
    )))];
  };
  const orderedModesForPattern = (pattern) => {
    if (pattern.kind === "modes") return [pattern];
    if (pattern.kind === "accords") {
      return uniquePatterns(chordModelLabelsForPattern(pattern).map((label) => (
        modePattern(MODE_PRESETS.find((mode) => mode.label === label))
      )));
    }
    if (pattern.kind === "tetracordes") {
      const entry = TETRACHORD_CATALOG.find((candidate) => `tetra:${candidate.code}` === pattern.id);
      const occurrences = [...(entry?.occurrences ?? [])].sort((first, second) => (
        Number(second.lowerRatio === "1/1") - Number(first.lowerRatio === "1/1")
        || Number(second.mode.family === MODE_GROUP_DEFAULT_FAMILIES.get(second.mode.group))
          - Number(first.mode.family === MODE_GROUP_DEFAULT_FAMILIES.get(first.mode.group))
      ));
      return uniquePatterns(occurrences.map((occurrence) => modePattern(occurrence.mode)));
    }
    const entry = concordantIntervalCatalog().find((candidate) => `interval:${candidate.id}` === pattern.id);
    const occurrences = [...(entry?.occurrences ?? [])].sort((first, second) => (
      Number(first.lowerIndex !== 0) - Number(second.lowerIndex !== 0)
      || Number(second.mode.family === MODE_GROUP_DEFAULT_FAMILIES.get(second.mode.group))
        - Number(first.mode.family === MODE_GROUP_DEFAULT_FAMILIES.get(first.mode.group))
      || modeLimitNumber(first.mode) - modeLimitNumber(second.mode)
      || first.groupIndex - second.groupIndex
      || first.familyIndex - second.familyIndex
      || first.presetIndex - second.presetIndex
    ));
    return uniquePatterns(occurrences.map((occurrence) => modePattern(occurrence.mode)));
  };
  const intervalIdsForPattern = (pattern) => {
    const degreeThree = pattern.columnLabels?.findIndex((label) => chordDegreeNumber(label) === 3) ?? -1;
    const preferredRatios = pattern.kind === "accords"
      ? (degreeThree > 0
        ? [pattern.ratios[degreeThree], ...pattern.ratios.slice(1)]
        : pattern.ratios.slice(1).sort((first, second) => ratioCents(first) - ratioCents(second)))
      : [pattern.ratios[2], pattern.ratios[1], pattern.ratios[3]];
    return [...new Set(preferredRatios.filter(Boolean))].flatMap((ratio) => catalog
      .filter((candidate) => candidate.kind === "intervalles" && candidate.ratios[1] === ratio)
      .map((candidate) => candidate.id));
  };
  const tetrachordIdsForModes = (modePatterns) => uniquePatterns(modePatterns.flatMap((pattern) => {
    const mode = modeSource(pattern);
    return (mode ? modeTetrachordApi.documentedTetrachordPairs(mode) : []).flatMap((pair) => (
      [...pair.members].sort((first, second) => first.startIndex - second.startIndex)
        .map((member) => byId.get(`tetra:${member.code}`))
    ));
  })).map((pattern) => pattern.id);
  const chordIdsForModes = (modePatterns) => uniquePatterns(modePatterns.flatMap((pattern) => {
    const mode = modeSource(pattern);
    if (!mode) return [];
    const modeRatios = new Set(mode.ratios.slice(0, 7));
    const characteristic = (MODE_CHARACTERISTIC_CHORDS[mode.label] ?? []).flatMap((name) => catalog.filter((candidate) => (
      candidate.kind === "accords" && candidate.family === name
      && candidate.ratios.every((ratio) => modeRatios.has(ratio))
    )));
    const modeled = catalog.filter((candidate) => candidate.kind === "accords"
      && chordModelLabelsForPattern(candidate).includes(mode.label));
    return [...characteristic, ...modeled];
  })).map((pattern) => pattern.id);
  catalog.forEach((pattern) => {
    const modes = orderedModesForPattern(pattern);
    const related = {
      intervalles: intervalIdsForPattern(pattern),
      accords: pattern.kind === "accords" ? [pattern.id] : chordIdsForModes(modes),
      tetracordes: pattern.kind === "tetracordes" ? [pattern.id] : tetrachordIdsForModes(modes),
      modes: modes.map((candidate) => candidate.id),
    };
    pattern.related = Object.fromEntries(Object.entries(related).filter(([, ids]) => ids.length));
  });
  networkAnalysisCatalogCache = catalog;
  return catalog;
}

// ---------- Polyvalence du réseau (C4; révisée avec Simon le 19 octobre 2026) ----------
// Trois nombres : les modes du réseau, ses tétracordes, et ses modulations. Une modulation relie deux
// modes du réseau qui ne diffèrent que d'un degré, sur la même tonique ou non : exactement les entrées du
// panneau Modulations de l'onglet Modes, dont on garde les cibles présentes dans le réseau. Chaque paire
// est comptée une fois (A → B et B → A sont la même modulation).
/** D6 : registres où chaque hauteur existe sur le manche (cordes à vide × positions, jusqu'au rapport 3).
 *  Clé : hauteur réduite à l'octave (par rapport à la), valeur : ensemble des octaves. null sans cordes. */
function networkFretboardRegisters(configuration) {
  const ratioValue = (ratio) => { const f = parseFraction(ratio); return f ? Number(f.numerator) / Number(f.denominator) : null; };
  const doubled = (ratio) => { const f = parseFraction(ratio); return f ? `${f.numerator * 2n}/${f.denominator}` : null; };
  // Positions d'une corde : rapports exacts, de 1/1 au rapport 3 (une octave et demie de manche).
  const withinNeck = (steps) => [...new Set(steps.flatMap((step) => [step, doubled(step)]).filter(Boolean))]
    .filter((step) => ratioValue(step) <= 3 + 1e-9);
  let opens = null;
  let positionsForString = null;
  const snapshot = configuration?.savedFrettierSnapshot;
  if (snapshot?.kind === "tfe" && Array.isArray(snapshot.strings)) {
    opens = snapshot.strings.map((string) => multiplyAndReduce(snapshot.referenceRatioToA, string));
    const capo = snapshot.capoFret ? ratioValue(snapshot.capoFret) : null;
    const frets = withinNeck(["1/1", ...snapshot.allFrets]).filter((step) => !capo || ratioValue(step) >= capo - 1e-9);
    positionsForString = () => frets;
  } else if (configuration?.scope === "tfp" && typeof tfpScordaturaForNetwork === "function") {
    const scordatura = tfpScordaturaForNetwork(configuration);
    if (!scordatura) return null;
    opens = scordatura.stringsToA.map((ratio) => multiplyAndReduce("1/1", ratio));
    const pool = fullNetworkPitchRatios(configuration);
    positionsForString = (open) => withinNeck(["1/1", ...pool.map((pitch) => divideAndReduce(pitch, open))]);
  } else return null;
  if (opens.some((ratio) => !ratio)) return null;
  // Registre des cordes : la plus grave entre −2100 et −900 cents sous A3, chaque suivante dans l'octave au-dessus.
  const placed = [];
  let previous = null;
  for (let index = opens.length - 1; index >= 0; index -= 1) {
    let cents = 1200 * Math.log2(ratioValue(opens[index]));
    if (previous === null) { while (cents >= -900) cents -= 1200; while (cents < -2100) cents += 1200; }
    else { while (cents > previous + 1200) cents -= 1200; while (cents <= previous) cents += 1200; }
    placed[index] = cents;
    previous = cents;
  }
  const registers = new Map();
  opens.forEach((open, index) => positionsForString(open).forEach((step) => {
    const cents = placed[index] + 1200 * Math.log2(ratioValue(step));
    const pitch = multiplyAndReduce(open, step);
    if (!pitch) return;
    const pitchCents = 1200 * Math.log2(ratioValue(pitch));
    const octave = Math.round((cents - pitchCents) / 1200);
    if (!registers.has(pitch)) registers.set(pitch, new Set());
    registers.get(pitch).add(octave);
  }));
  return registers;
}

let networkConnectionStatsCache = { key: "", value: null };
const networkConnectionStatsMemo = new Map();
function networkConnectionStats(configuration = appliedNetworkConfiguration) {
  // Fenêtre de choix des touches (D3) : calculable pour n'importe quel réseau, pas seulement le réseau actif.
  const key = JSON.stringify(configuration);
  if (networkConnectionStatsCache.key === key) return networkConnectionStatsCache.value;
  if (networkConnectionStatsMemo.has(key)) return networkConnectionStatsMemo.get(key);
  const selections = [];
  TONIC_RATIOS.forEach((tonic) => {
    MODE_PRESETS.forEach((mode) => {
      if (!networkAdmitsModeAtTonic(tonic, mode, configuration)) return;
      selections.push({ selectedFamily: TONIC_FAMILY_BY_RATIO.get(tonic), selectedModeId: mode.id, selectedTonic: tonic });
    });
  });
  const selectionKey = (selection) => `${selection.selectedModeId}@${selection.selectedTonic}`;
  const modeById = new Map(MODE_PRESETS.map((mode) => [mode.id, mode]));
  // Modes admis, regroupés comme les cibles du calculateur : mode générique et classe de hauteur.
  const byTarget = new Map();
  selections.forEach((selection) => {
    if (!FAMILY_DEFINITIONS[selection.selectedFamily]) return;
    const pitchClass = ratioToHeji(selection.selectedTonic)?.referenceSemitone;
    const targetKey = `${genericModeIdFromPresetId(selection.selectedModeId)}|${pitchClass}`;
    if (!byTarget.has(targetKey)) byTarget.set(targetKey, []);
    byTarget.get(targetKey).push(selection);
  });
  const tonicOrder = new Map(TONIC_RATIOS.map((ratio, index) => [ratio, index]));
  byTarget.forEach((list) => list.sort((first, second) => (
    (tonicOrder.get(first.selectedTonic) ?? 0) - (tonicOrder.get(second.selectedTonic) ?? 0)
    || compareModeVariants(modeById.get(first.selectedModeId), modeById.get(second.selectedModeId)))));
  const pairs = new Set();
  const analyses = new Map();
  if (modeConnectionApi && genericModeCatalog.length) {
    selections.forEach((source) => {
      const tonicPitchClass = ratioToHeji(source.selectedTonic)?.referenceSemitone;
      if (!Number.isInteger(tonicPitchClass)) return;
      const analysisKey = `${genericModeIdFromPresetId(source.selectedModeId)}|${tonicPitchClass}`;
      if (!analyses.has(analysisKey)) analyses.set(analysisKey, modeConnectionApi.calculateModeConnections({
        catalog: genericModeCatalog,
        sourceMode: genericModeIdFromPresetId(source.selectedModeId),
        sourceTonicPitchClass: tonicPitchClass,
        includeTonicAlterations: false,
      }));
      const analysis = analyses.get(analysisKey);
      // Même choix de cible que le panneau (resolveModulationTarget), sur les modes déjà admis : plus rapide.
      const sourceMode = modeById.get(source.selectedModeId);
      analysis.mutations.forEach((mutation) => mutation.targets.forEach((target) => {
        if (!modulationTonicPitchClassIsIncluded(target.modeName, target.tonicPitchClass)) return;
        const candidates = (byTarget.get(`${target.modeId}|${target.tonicPitchClass}`) ?? []).map((selection) => {
          const mode = modeById.get(selection.selectedModeId);
          return { selection, mode,
            commonPitchCount: exactCommonPitchCount(source, sourceMode, selection, mode),
            sameLimit: modeSpecificLabel(mode) === modeSpecificLabel(sourceMode),
            limitDistance: Math.abs(modeLimitNumber(mode) - modeLimitNumber(sourceMode)) };
        }).sort((first, second) => second.commonPitchCount - first.commonPitchCount
          || Number(second.sameLimit) - Number(first.sameLimit)
          || first.limitDistance - second.limitDistance
          || modeLimitNumber(first.mode) - modeLimitNumber(second.mode)
          || ratioCents(first.selection.selectedTonic) - ratioCents(second.selection.selectedTonic));
        const choice = candidates[0]?.selection;
        if (!choice) return;
        const origin = selectionKey(source);
        const destination = selectionKey(choice);
        if (destination !== origin) pairs.add([origin, destination].sort().join("↔"));
      }));
    });
  }
  // Tétracordes : chaque tétracorde du catalogue, sur chaque tonique du réseau où toutes ses notes existent.
  let tetrachords = 0;
  const usefulPitches = new Set();
  TONIC_RATIOS.forEach((tonic) => {
    TETRACHORD_CATALOG.forEach((entry) => {
      if (networkContainsRatiosAtTonic(entry.ratios, tonic, configuration)
        && ratiosUseEnabledNetworkConcordances(entry.ratios, configuration)) {
        tetrachords += 1;
        entry.ratios.forEach((ratio) => usefulPitches.add(multiplyAndReduce(tonic, ratio)));
      }
    });
  });
  // D6 : ventilation des modes par limite et par tonique.
  const byLimit = {};
  const byTonic = {};
  selections.forEach(({ selectedModeId, selectedTonic }) => {
    const limit = `L${modeLimitNumber(modeById.get(selectedModeId))}`;
    byLimit[limit] = (byLimit[limit] ?? 0) + 1;
    const heji = ratioToHeji(selectedTonic);
    const tonic = heji ? plainHejiNote(heji) : selectedTonic;
    byTonic[tonic] = (byTonic[tonic] ?? 0) + 1;
  });
  const value = { modes: selections.length, tetrachords, modulations: pairs.size,
    byLimit: Object.entries(byLimit).sort((a, b) => Number(a[0].slice(1)) - Number(b[0].slice(1))),
    byTonic: Object.entries(byTonic).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])) };
  // D9 : accords admis (toutes leurs notes dans le réseau, sur une fondamentale du réseau), colorations (même
  // fondamentale) et enchaînements (fondamentales différentes) : paires partageant au moins deux notes, sans que
  // l'un contienne l'autre; classes de hauteur exactes, paires non ordonnées.
  const chordPool = new Set(fullNetworkPitchRatios(configuration));
  const chordSeen = new Set();
  const admittedChords = [];
  const chordsByLevel = {};
  const chordsByRoot = {};
  networkAnalysisCatalog().filter((pattern) => pattern.kind === "accords").forEach((pattern) => {
    chordPool.forEach((root) => {
      const pitches = pattern.ratios.map((ratio) => multiplyAndReduce(root, ratio));
      if (!pitches.every((pitch) => pitch && chordPool.has(pitch))) return;
      const set = new Set(pitches);
      const key = `${pattern.family}@${root}@${[...set].sort().join(",")}`;
      if (chordSeen.has(key)) return;
      chordSeen.add(key);
      admittedChords.push({ root, set });
      const level = pattern.group ?? "Autres";
      chordsByLevel[level] = (chordsByLevel[level] ?? 0) + 1;
      const heji = ratioToHeji(root);
      const rootName = heji ? plainHejiNote(heji) : root;
      chordsByRoot[rootName] = (chordsByRoot[rootName] ?? 0) + 1;
    });
  });
  let colorations = 0;
  let progressions = 0;
  for (let i = 0; i < admittedChords.length; i += 1) {
    for (let j = i + 1; j < admittedChords.length; j += 1) {
      const first = admittedChords[i].set;
      const second = admittedChords[j].set;
      let shared = 0;
      first.forEach((pitch) => { if (second.has(pitch)) shared += 1; });
      if (shared < 2 || shared === first.size || shared === second.size) continue;
      if (admittedChords[i].root === admittedChords[j].root) colorations += 1;
      else progressions += 1;
    }
  }
  const levelOrder = chordData.columns.map((column) => column.group);
  Object.assign(value, {
    chords: admittedChords.length,
    chordsByLevel: Object.entries(chordsByLevel).sort((a, b) => levelOrder.indexOf(a[0]) - levelOrder.indexOf(b[0])),
    chordsByRoot: Object.entries(chordsByRoot).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
    colorations, progressions,
  });
  // D6 : jeu idiomatique, sur les touches qui ont des cordes (TFE enregistrée ou TFP).
  const registers = networkFretboardRegisters(configuration);
  if (registers) {
    const pitchSets = selections.map(({ selectedModeId, selectedTonic }) => modeById.get(selectedModeId).ratios
      .slice(0, -1).map((ratio) => multiplyAndReduce(selectedTonic, ratio)));
    value.multiPositionModes = pitchSets.filter((pitches) => pitches.every((pitch) => (registers.get(pitch)?.size ?? 0) >= 2)).length;
    pitchSets.flat().forEach((pitch) => usefulPitches.add(pitch));
    // Accords complets du bassin (toutes leurs notes présentes sur une fondamentale du bassin).
    const pool = new Set(fullNetworkPitchRatios(configuration));
    networkAnalysisCatalog().filter((pattern) => pattern.kind === "accords").forEach((pattern) => {
      pool.forEach((root) => {
        const pitches = pattern.ratios.map((ratio) => multiplyAndReduce(root, ratio));
        if (pitches.every((pitch) => pitch && pool.has(pitch))) pitches.forEach((pitch) => usefulPitches.add(pitch));
      });
    });
    value.orphanPitches = [...usefulPitches].filter((pitch) => pitch && (registers.get(pitch)?.size ?? 0) === 1).sort();
    value.orphans = value.orphanPitches.length;
  }
  // Le moteur des modulations se charge à part : ne pas garder un résultat calculé sans lui.
  if (modeConnectionApi && genericModeCatalog.length) {
    if (configuration === appliedNetworkConfiguration) networkConnectionStatsCache = { key, value };
    networkConnectionStatsMemo.set(key, value);
    if (networkConnectionStatsMemo.size > 200) networkConnectionStatsMemo.delete(networkConnectionStatsMemo.keys().next().value);
  }
  return value;
}

function networkAnalysisData() {
  const ratios = [...new Set(TONIC_RATIOS.map((ratio) =>
    divideAndReduce(ratio, appliedNetworkConfiguration.generatorRatio)).filter(Boolean))];
  ratios.sort((first, second) => {
    const a = parseFraction(first);
    const b = parseFraction(second);
    const difference = a.numerator * b.denominator - b.numerator * a.denominator;
    return difference < 0n ? -1 : difference > 0n ? 1 : 0;
  });
  const absoluteNetworkPitches = fullNetworkPitchRatios(appliedNetworkConfiguration);
  const pitchRatios = [...new Set(absoluteNetworkPitches.map((pitch) => (
    divideAndReduce(pitch, appliedNetworkConfiguration.generatorRatio)
  )).filter(Boolean))].sort((first, second) => (
    ratioCents(first) - ratioCents(second) || first.localeCompare(second)
  ));
  const groups = new Map();
  [...new Set([...NETWORK_FAMILY_ORDER, ...Object.keys(FAMILY_DEFINITIONS)])]
    .map((key) => FAMILY_DEFINITIONS[key]).filter(Boolean).forEach((family) => {
    const label = family.displayRatio ?? NETWORK_FAMILY_BLUEPRINTS[family.key]?.displayRatio ?? "1/1";
    if (!groups.has(label)) groups.set(label, []);
    const ordered = [...new Set(family.tonics)].filter((ratio) => TONIC_RATIO_SET.has(ratio))
      .sort((a, b) => (factorOddPrimes(parseFraction(a)).get(3n) ?? 0) - (factorOddPrimes(parseFraction(b)).get(3n) ?? 0));
    groups.get(label).push(...ordered.map((ratio) => divideAndReduce(ratio, appliedNetworkConfiguration.generatorRatio)));
  });
  const tonicBasinsByRatio = new Map();
  const allowedModeIdsByTonic = {};
  TONIC_RATIOS.forEach((tonic) => {
    const relativeTonic = divideAndReduce(tonic, appliedNetworkConfiguration.generatorRatio);
    if (!relativeTonic || tonicBasinsByRatio.has(relativeTonic)) return;
    allowedModeIdsByTonic[relativeTonic] = MODE_PRESETS
      .filter((mode) => networkAdmitsModeAtTonic(tonic, mode))
      .map((mode) => mode.id);
    // Every tonic reads the same finite global network from its own origin.
    // A contributed pitch stays in that basin; mode admission still requires
    // the optional functions authorized for this tonic’s own family.
    const basin = [...new Set([
      "1/1",
      ...absoluteNetworkPitches.map((pitch) => divideAndReduce(pitch, tonic)).filter(Boolean),
      "2/1",
    ])];
    const modelRatios = [...basin];
    modelRatios.sort((first, second) => ratioCents(first) - ratioCents(second) || first.localeCompare(second));
    basin.sort((first, second) => ratioCents(first) - ratioCents(second) || first.localeCompare(second));
    tonicBasinsByRatio.set(relativeTonic, {ratios:basin, modelRatios});
  });
  return { ratios, referenceRatioToA: networkGeneratorPitchRatio(appliedNetworkConfiguration),
    id: appliedNetworkConfiguration.id, name: appliedNetworkConfiguration.name,
    sourceMethod: appliedNetworkConfiguration.sourceMethod,
    pitchRatios,
    displayMode: ["degrees", "none"].includes(selectedDisplayMode()) ? "heji" : selectedDisplayMode(),
    catalog: networkAnalysisCatalog(),
    allowedModeIdsByTonic,
    concordances: NETWORK_CONCORDANCE_GROUPS,
    tonicBasins: ratios.map((tonic) => ({ tonic,
      ratios: tonicBasinsByRatio.get(tonic)?.ratios ?? ["1/1", "2/1"],
      modelRatios: tonicBasinsByRatio.get(tonic)?.modelRatios ?? ["1/1", "2/1"] })),
    tonicGroups: [...groups].filter(([, values]) => values.length).map(([label, values]) => ({label,
      ratios: [...new Set(values)].sort((a,b) => (factorOddPrimes(parseFraction(a)).get(3n) ?? 0) - (factorOddPrimes(parseFraction(b)).get(3n) ?? 0))})) };
}

const SUMMARY_KINDS = [
  { id: "accords", label: "Accords" },
  { id: "tetracordes", label: "Tétracordes" },
  { id: "modes", label: "Modes" },
];
const SUMMARY_EXCLUDED_CHORDS = new Set(["sus2", "sus4"]);
const SUMMARY_MODE_TABLE_WIDTH = 760;
const SUMMARY_MODE_GRID_WEIGHT = MODE_TABLE_GRID_WEIGHTS.reduce((total, weight) => total + weight, 0);
// The printable table has no width of its own: each fixed microcolumn gets
// the same physical unit, including columns left blank by a given pattern.
// The full nineteen-column mode grid occupies the page's 6.92in text area.
const SUMMARY_PDF_MICROCOLUMN_PX = (6.92 * 96 - 2) / SUMMARY_MODE_GRID_WEIGHT;
let networkSummaryDocumentSignature = "";
let networkSummaryModelCache = { signature: "", model: null };

function summarySafeId(...parts) {
  return `sommaire-${parts.join("-").normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function summaryAbsolutePitch(data, tonic, ratio = "1/1") {
  const relative = multiplyAndReduce(tonic, ratio) ?? ratio;
  return multiplyAndReduce(data.referenceRatioToA, relative) ?? relative;
}

function summaryPatternTitle(pattern) {
  if (pattern.kind === "accords") return chordDisplayName(pattern.label);
  return formatModeLabel(pattern.label);
}

function summaryPatternHeadingLabel(pattern) {
  const title = summaryPatternTitle(pattern);
  if (pattern.kind === "accords") return title;
  if (!pattern.limit || title.includes(pattern.limit)) return title;
  return pattern.kind === "modes" ? `${title} ${pattern.limit}` : `${title} — ${pattern.limit}`;
}

function summaryModeTocLabel(pattern) {
  const mode = summaryModeForPattern(pattern);
  if (!mode) return summaryPatternHeadingLabel(pattern);
  return [modeFamilyAbbreviationFromName(mode.family), modeSpecificLabel(mode)]
    .filter(Boolean)
    .join(" ");
}

function appendSummaryColorizedText(container, value) {
  const text = String(value ?? "");
  const tetrachord = text.match(/^(.*?-)(\d+)(L)(5|7|11|13)(.*)$/);
  if (!tetrachord) {
    appendColorizedChordLimit(container, text);
    return;
  }
  container.append(document.createTextNode(tetrachord[1]));
  const structure = document.createElement("span");
  structure.textContent = tetrachord[2];
  structure.style.color = colorForInteger(tetrachord[2]);
  const limit = document.createElement("span");
  limit.textContent = tetrachord[4];
  limit.style.color = colorForInteger(tetrachord[4]);
  container.append(structure, document.createTextNode(tetrachord[3]), limit,
    document.createTextNode(tetrachord[5]));
}

function createSummaryHeading(level, id, tocLabel, content = tocLabel) {
  const heading = document.createElement(`h${level}`);
  heading.id = id;
  heading.dataset.tocLabel = tocLabel;
  if (content?.nodeType) heading.append(content);
  else if (level === 1) appendColorizedNetworkLabel(heading, content);
  else appendSummaryColorizedText(heading, content);
  return heading;
}

function createSummaryTonicLabel(data, tonic, includeCents = false) {
  const wrapper = document.createElement("span");
  wrapper.className = "summary-tonic-label";
  wrapper.append(createHejiPitch(summaryAbsolutePitch(data, tonic), includeCents));
  return wrapper;
}

function createSummaryPitchDisplay(relativeRatio, absoluteRatio) {
  if (summaryDisplayMode() === "ratio") return createColorizedRatio(relativeRatio);
  return createHejiPitch(absoluteRatio, summaryDisplayMode() === "heji-cents");
}

function summaryDisplayMode() {
  return ["degrees", "none"].includes(state.displayMode) ? "heji" : state.displayMode;
}

const SUMMARY_COMPOSITE_FAMILY_LABELS = new Map([
  ["7/5", "sh7/5"],
  ["10/7", "h10/7"],
  ["11/10", "h11/10"],
  ["13/10", "sh13/10"],
].map(([ratio, label]) => [networkDimensionKey(ratio), label]));

function summaryTonicFamilyLabel(tonic) {
  const dimension = networkDimensionKey(tonic);
  for (const [key, blueprint] of Object.entries(NETWORK_FAMILY_BLUEPRINTS)) {
    if (networkDimensionKey(blueprint.seedMultiplier) === dimension) return key;
  }
  if (SUMMARY_COMPOSITE_FAMILY_LABELS.has(dimension)) {
    return SUMMARY_COMPOSITE_FAMILY_LABELS.get(dimension);
  }
  const fraction = parseFraction(tonic);
  if (!fraction) return "h3";
  const exponents = factorOddPrimes(fraction);
  exponents.delete(3n);
  const parts = [...exponents.entries()]
    .filter(([, exponent]) => exponent)
    .sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))
    .map(([prime, exponent]) => {
      const factor = prime ** BigInt(Math.abs(exponent));
      return `${exponent > 0 ? "h" : "sh"}${factor}`;
    });
  return parts.length ? parts.join("·") : "h3";
}

function summaryTonicTocLabel(data, tonic) {
  const absolute = summaryAbsolutePitch(data, tonic);
  return `Tonique ${plainHejiNote(ratioToHeji(absolute))} — ${summaryTonicFamilyLabel(tonic)}`;
}

function summaryModeForPattern(pattern) {
  return pattern.kind === "modes"
    ? MODE_PRESETS.find((candidate) => `mode:${candidate.id}` === pattern.id) ?? null
    : null;
}

function summaryTetrachordForPattern(pattern) {
  return pattern.kind === "tetracordes"
    ? TETRACHORD_CATALOG.find((entry) => `tetra:${entry.code}` === pattern.id) ?? null
    : null;
}

function summaryChordVariantsForPattern(pattern) {
  if (pattern.kind !== "accords") return [];
  const chord = chordData.chords[pattern.family];
  if (!chord) return [];
  const signature = pattern.ratios.slice().sort().join(",");
  return chord.variants.flatMap((variant, variantIndex) => (
    chordFunctionRatios(chord, variant).slice().sort().join(",") === signature
      ? [{ chord, chordName: pattern.family, variant, variantIndex }]
      : []
  ));
}

function summaryPatternIsAvailable(data, basin, pattern) {
  const absoluteTonic = summaryAbsolutePitch(data, basin.tonic);
  if (pattern.kind === "modes") {
    return networkAdmitsModeAtTonic(
      absoluteTonic,
      summaryModeForPattern(pattern),
      appliedNetworkConfiguration,
    );
  }
  if (pattern.kind === "tetracordes") {
    const entry = summaryTetrachordForPattern(pattern);
    return Boolean(entry && tetrachordContextCandidates(entry.code, absoluteTonic).length);
  }
  if (pattern.kind === "accords") {
    return summaryChordVariantsForPattern(pattern).some(({ chord, chordName, variant, variantIndex }) => (
      variantAvailableForTonic(variant, absoluteTonic)
      && familyAdmitsChordVariant(chordName, chord, variantIndex, absoluteTonic)
    ));
  }
  return false;
}

function summaryPatternTones(pattern) {
  const chordDegrees = pattern.kind === "accords"
    ? chordData.chords[pattern.family]?.degrees
    : null;
  const tones = pattern.ratios.map((ratio, index) => {
    const degree = chordDegrees?.[index] ?? pattern.columnLabels?.[index] ?? String(index + 1);
    return {
      degree,
      ratio,
      slot: pattern.kind === "accords" ? chordDegreeSlotLabel(degree) : degree,
    };
  });
  if (pattern.kind !== "accords") return tones;
  return tones.sort((first, second) => (
    modeSlotCenter(first.slot, MODE_TABLE_GRID_WEIGHTS, MODE_TABLE_SLOTS)
    - modeSlotCenter(second.slot, MODE_TABLE_GRID_WEIGHTS, MODE_TABLE_SLOTS)
    || ratioCents(first.ratio) - ratioCents(second.ratio)
  ));
}

function summaryPatternGrid(pattern, tones) {
  if (pattern.kind === "accords") {
    const usedEnds = tones.map((tone) => modeSlot(tone.slot, MODE_TABLE_SLOTS)[1]);
    const furthestUsedLine = Math.max(MODE_TABLE_SLOTS["5"][1], ...usedEnds);
    const lastLine = furthestUsedLine > MODE_TABLE_SLOTS["6"][1]
      ? MODE_TABLE_SLOTS["7"][1]
      : furthestUsedLine > MODE_TABLE_SLOTS["5"][1]
        ? MODE_TABLE_SLOTS["6"][1]
        : MODE_TABLE_SLOTS["5"][1];
    return {
      boundaries: MODE_FAMILY_BOUNDARIES.filter((line) => line > 1 && line < lastLine),
      lastLine,
      slots: MODE_TABLE_SLOTS,
      weights: MODE_TABLE_GRID_WEIGHTS.slice(0, lastLine - 1),
    };
  }
  const lastLine = pattern.kind === "modes"
    ? MODE_TABLE_GRID_WEIGHTS.length + 1
    : Math.max(...tones.map((tone) => modeSlot(tone.slot, MODE_TABLE_SLOTS)[1]));
  return {
    boundaries: MODE_FAMILY_BOUNDARIES.filter((line) => line > 1 && line < lastLine),
    lastLine,
    slots: MODE_TABLE_SLOTS,
    weights: MODE_TABLE_GRID_WEIGHTS.slice(0, lastLine - 1),
  };
}

function summaryChordProportionEntries(tones, distance, grid) {
  const parentEntries = distance > 1
    ? summaryChordProportionEntries(tones, distance - 1, grid)
    : [];
  const entries = [];
  for (let firstIndex = 0; firstIndex < tones.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < tones.length; secondIndex += 1) {
      const firstDegree = chordDegreeNumber(tones[firstIndex].slot);
      const secondDegree = chordDegreeNumber(tones[secondIndex].slot);
      if (firstDegree === null || secondDegree === null || secondDegree - firstDegree !== distance) continue;
      const firstCenter = modeSlotCenter(tones[firstIndex].slot, grid.weights, grid.slots);
      const secondCenter = modeSlotCenter(tones[secondIndex].slot, grid.weights, grid.slots);
      const firstParent = parentEntries.find((entry) => entry.firstIndex === firstIndex);
      const secondParent = firstParent
        ? parentEntries.find((entry) => (
          entry.firstIndex === firstParent.secondIndex
          && entry.secondIndex === secondIndex
        ))
        : null;
      const parentLabelCenters = firstParent && secondParent
        ? [firstParent.center, secondParent.center]
        : [];
      entries.push({
        center: hierarchicalProportionCenter(
          [firstCenter, secondCenter],
          parentLabelCenters,
        ),
        firstIndex,
        positionBasis: parentLabelCenters.length
          ? "parent-proportions"
          : "notes",
        secondIndex,
        value: intervalProportion(
          tones[firstIndex].ratio,
          tones[secondIndex].ratio,
        ),
      });
    }
  }
  return entries;
}

function createSummaryChordProportionRow(tones, distance, caption, grid) {
  const row = document.createElement("div");
  row.className = "proportion-row";
  const hiddenCaption = document.createElement("span");
  hiddenCaption.className = "proportion-caption visually-hidden";
  hiddenCaption.textContent = caption;
  row.append(hiddenCaption);
  const entries = summaryChordProportionEntries(tones, distance, grid);
  entries.forEach((entry) => {
    const label = document.createElement("span");
    label.className = "proportion-label";
    label.style.left = `${entry.center}%`;
    label.dataset.intervalDistance = String(distance);
    label.dataset.intervalStart = String(entry.firstIndex);
    label.dataset.intervalEnd = String(entry.secondIndex);
    label.dataset.positionBasis = entry.positionBasis;
    label.append(createColorizedProportion(entry.value));
    row.append(label);
  });
  if (!entries.length) row.classList.add("is-empty");
  return row;
}

function createSummaryTetrachordThirdRow(ratios, grid) {
  const row = createProportionRow(
    ratios,
    2,
    "Tierces",
    false,
    grid.weights,
    grid.slots,
  );
  if (ratios.length < 3 || ratios.includes("3/2")) return row;
  const proportion = intervalProportion(ratios[2], "3/2");
  if (!proportion) return row;
  const label = document.createElement("span");
  label.className = "proportion-label is-implicit-fifth";
  label.style.left = `${modeSlotCenter("4", grid.weights, grid.slots)}%`;
  label.dataset.intervalDistance = "2";
  label.dataset.intervalStart = "2";
  label.dataset.intervalTarget = "5";
  appendParenthesizedColorizedProportion(label, proportion);
  row.append(label);
  return row;
}

function createSummaryPatternModel(pattern, occurrences, data) {
  const tones = summaryPatternTones(pattern);
  const grid = summaryPatternGrid(pattern, tones);
  const gridWeight = grid.weights.reduce((total, weight) => total + weight, 0);
  const patternWidth = Math.round(SUMMARY_MODE_TABLE_WIDTH * gridWeight / SUMMARY_MODE_GRID_WEIGHT);
  const printGrid = grid.weights.map((weight) => (
    `${(SUMMARY_PDF_MICROCOLUMN_PX * weight).toFixed(5)}px`
  )).join(" ");
  const wrap = document.createElement("div");
  wrap.className = `summary-analysis-wrap summary-${pattern.kind}-analysis`;
  wrap.style.setProperty("--summary-pattern-width", `${patternWidth}px`);
  const model = document.createElement("div");
  model.className = `mode-model summary-pattern-model summary-${pattern.kind}-model`;
  model.dataset.summaryPatternWidth = String(patternWidth);
  model.style.setProperty("--summary-pattern-width", `${patternWidth}px`);
  model.style.setProperty("--summary-print-mode-table-grid", printGrid);
  model.style.setProperty("--mode-table-grid", grid.weights.map((value) => `${value}fr`).join(" "));

  const mode = summaryModeForPattern(pattern);
  if (mode) {
    const { chordRow, functionRow } = createModeChordRows(
      mode,
      occurrences[0]?.absoluteTonic ?? "1/1",
      null,
      grid.weights,
      grid.slots,
    );
    model.append(functionRow, chordRow);
  }

  const degreeRow = document.createElement("div");
  degreeRow.className = "mode-degree-row";
  grid.boundaries.forEach((line) => appendGridBoundary(
    degreeRow,
    line,
    "mode-family-boundary",
    grid.weights,
  ));
  tones.forEach((tone) => {
    const degree = document.createElement("div");
    degree.className = "mode-degree";
    appendDegreeLabel(degree, pattern.kind === "accords" ? tone.slot : tone.degree);
    placeOnModeGrid(degree, tone.slot, grid.slots);
    degreeRow.append(degree);
  });

  const pitchBody = document.createElement("div");
  pitchBody.className = "mode-pitch-body";
  if (pattern.kind === "modes" && mode) {
    // A single-tonic summary can mirror Modes exactly. When one table groups
    // several tonics, use the mode's documented primary construction.
    const starts = occurrences.length === 1
      ? modeTableTetrachordStarts(mode, occurrences[0].absoluteTonic)
      : modeTetrachordApi.primaryTetrachordStarts(mode);
    starts
      .filter((index) => index > 0 && tones[index])
      .forEach((index) => appendGridBoundary(
        pitchBody,
        modeSlot(tones[index].slot, grid.slots)[0],
        "mode-tetrachord-start",
        grid.weights,
      ));
  }
  const ratioRow = document.createElement("div");
  ratioRow.className = "mode-ratio-row";
  tones.forEach((tone) => {
    const cell = document.createElement("div");
    cell.className = "mode-ratio-cell";
    placeOnModeGrid(cell, tone.slot, grid.slots);
    cell.append(createColorizedRatio(tone.ratio));
    ratioRow.append(cell);
  });

  const hejiRows = document.createElement("div");
  hejiRows.className = "summary-heji-rows";
  occurrences.forEach(({ tonic }) => {
    const row = document.createElement("div");
    row.className = "mode-heji-row summary-heji-row";
    tones.forEach((tone) => {
      const cell = document.createElement("div");
      cell.className = "mode-heji-cell";
      placeOnModeGrid(cell, tone.slot, grid.slots);
      cell.append(createHejiPitch(
        summaryAbsolutePitch(data, tonic, tone.ratio),
        summaryDisplayMode() === "heji-cents",
      ));
      row.append(cell);
    });
    hejiRows.append(row);
  });
  pitchBody.append(ratioRow, hejiRows);

  const proportions = document.createElement("div");
  proportions.className = "mode-proportions";
  if (pattern.kind === "accords") {
    const secondRow = createSummaryChordProportionRow(tones, 1, "Secondes", grid);
    const thirdRow = createSummaryChordProportionRow(tones, 2, "Tierces", grid);
    if (!secondRow.classList.contains("is-empty") || thirdRow.classList.contains("is-empty")) {
      proportions.append(secondRow);
    }
    proportions.append(thirdRow);
  } else {
    proportions.append(
      createProportionRow(pattern.ratios, 1, "Secondes", false, grid.weights, grid.slots),
      pattern.kind === "tetracordes"
        ? createSummaryTetrachordThirdRow(pattern.ratios, grid)
        : createProportionRow(
          pattern.ratios,
          2,
          "Tierces",
          true,
          grid.weights,
          grid.slots,
        ),
    );
  }
  model.append(degreeRow, pitchBody, proportions);
  wrap.append(model);
  return wrap;
}

const SUMMARY_CHORD_DEGREE_COLUMNS = [
  { key: "1", family: "1", spellings: ["1"], fallback: "1" },
  { key: "flat-2", family: "2", spellings: ["♭2"], fallback: "♭2" },
  { key: "2", family: "2", spellings: ["2"], fallback: "2" },
  { key: "flat-3", family: "3", spellings: ["♯2", "♭3"], fallback: "♭3" },
  { key: "3", family: "3", spellings: ["3", "♭4"], fallback: "3" },
  { key: "4", family: "4-5", spellings: ["4"], fallback: "4" },
  { key: "tritone", family: "4-5", spellings: ["♯4", "♭5"], fallback: "♯4/♭5", fixedLabel: "♯4/♭5" },
  { key: "5", family: "4-5", spellings: ["5"], fallback: "5" },
  { key: "flat-6", family: "6", spellings: ["♯5", "♭6"], fallback: "♭6", fixedLabel: "♭6" },
  { key: "6", family: "6", spellings: ["6"], fallback: "6" },
  { key: "flat-7", family: "7", spellings: ["♯6", "♭7"], fallback: "♭7" },
  { key: "7", family: "7", spellings: ["7"], fallback: "7" },
];

const SUMMARY_TETRACHORD_DEGREE_COLUMNS = [
  { key: "1", family: "1", spellings: ["1"], fallback: "1" },
  { key: "flat-2", family: "2", spellings: ["♭2"], fallback: "♭2" },
  { key: "2", family: "2", spellings: ["2"], fallback: "2" },
  { key: "flat-3", family: "3", spellings: ["♭3"], fallback: "♭3" },
  { key: "3", family: "3", spellings: ["3"], fallback: "3" },
  { key: "4", family: "4", spellings: ["4"], fallback: "4" },
];

function summaryDegreeColumnForSlot(slot, columns) {
  const normalized = chordDegreeSlotLabel(slot);
  return columns.find((column) => column.spellings.includes(normalized)) ?? null;
}

function summaryDegreeColumnLabel(column, tones) {
  if (column.fixedLabel) return column.fixedLabel;
  const used = column.spellings.filter((spelling) => tones.some((tone) => (
    chordDegreeSlotLabel(tone.slot) === spelling
  )));
  return used.length ? used.join("/") : column.fallback;
}

function summaryDegreeColumnClass(columns, index) {
  const family = columns[index].family;
  const classes = ["summary-degree-column"];
  if (!index || columns[index - 1].family !== family) classes.push("is-family-start");
  if (index === columns.length - 1 || columns[index + 1].family !== family) {
    classes.push("is-family-end");
  }
  return classes.join(" ");
}

function appendSummaryDegreeColumns(table, firstColumnLabel, columns, tones) {
  const colgroup = document.createElement("colgroup");
  const nameColumn = document.createElement("col");
  nameColumn.className = "summary-name-column";
  colgroup.append(nameColumn);
  columns.forEach((column) => {
    const col = document.createElement("col");
    col.dataset.degreeSlot = column.key;
    colgroup.append(col);
  });
  table.append(colgroup);

  const thead = document.createElement("thead");
  const headingRow = document.createElement("tr");
  const nameHeading = document.createElement("th");
  nameHeading.scope = "col";
  nameHeading.textContent = firstColumnLabel;
  headingRow.append(nameHeading);
  columns.forEach((column, index) => {
    const heading = document.createElement("th");
    heading.scope = "col";
    heading.className = summaryDegreeColumnClass(columns, index);
    heading.dataset.degreeSlot = column.key;
    heading.dataset.degreeFamily = column.family;
    appendDegreeLabel(heading, summaryDegreeColumnLabel(column, tones));
    headingRow.append(heading);
  });
  thead.append(headingRow);
  table.append(thead);
}

function createSummaryChordMatrix(patterns, tonic, data) {
  const rows = patterns.map((pattern) => ({ pattern, tones: summaryPatternTones(pattern) }));
  const allTones = rows.flatMap(({ tones }) => tones);
  const wrap = document.createElement("div");
  wrap.className = "summary-synthesis-wrap summary-chord-matrix-wrap";
  const table = document.createElement("table");
  table.className = "summary-synthesis-table summary-fixed-degree-table summary-chord-matrix";
  appendSummaryDegreeColumns(table, "Accord", SUMMARY_CHORD_DEGREE_COLUMNS, allTones);
  const tbody = document.createElement("tbody");
  rows.forEach(({ pattern, tones }) => {
    const row = document.createElement("tr");
    const name = document.createElement("th");
    name.scope = "row";
    appendConsequentChordName(name, pattern.family);
    row.append(name);
    const tonesByDegree = new Map();
    tones.forEach((tone) => {
      const column = summaryDegreeColumnForSlot(tone.slot, SUMMARY_CHORD_DEGREE_COLUMNS);
      if (!column) return;
      if (!tonesByDegree.has(column.key)) tonesByDegree.set(column.key, []);
      tonesByDegree.get(column.key).push(tone);
    });
    SUMMARY_CHORD_DEGREE_COLUMNS.forEach((column, index) => {
      const cell = document.createElement("td");
      cell.className = summaryDegreeColumnClass(SUMMARY_CHORD_DEGREE_COLUMNS, index);
      cell.dataset.degreeSlot = column.key;
      cell.dataset.degreeFamily = column.family;
      (tonesByDegree.get(column.key) ?? []).forEach((tone) => {
        cell.append(createSummaryPitchDisplay(
          tone.ratio,
          summaryAbsolutePitch(data, tonic, tone.ratio),
        ));
      });
      row.append(cell);
    });
    tbody.append(row);
  });
  table.append(tbody);
  wrap.append(table);
  return wrap;
}

function createSummaryTetrachordSynthesis(patterns, tonic, data) {
  const rows = patterns.map((pattern) => ({ pattern, tones: summaryPatternTones(pattern) }));
  const wrap = document.createElement("div");
  wrap.className = "summary-synthesis-wrap summary-tetrachord-synthesis-wrap";
  const table = document.createElement("table");
  table.className = "summary-synthesis-table summary-fixed-degree-table summary-tetrachord-synthesis";
  appendSummaryDegreeColumns(
    table,
    "Tétracorde",
    SUMMARY_TETRACHORD_DEGREE_COLUMNS,
    rows.flatMap(({ tones }) => tones),
  );
  const tbody = document.createElement("tbody");
  rows.forEach(({ pattern, tones }) => {
    const row = document.createElement("tr");
    row.dataset.family = pattern.group;
    const name = document.createElement("th");
    name.scope = "row";
    appendSummaryColorizedText(name, summaryPatternTitle(pattern));
    row.append(name);
    const tonesByDegree = new Map();
    tones.forEach((tone) => {
      const column = summaryDegreeColumnForSlot(tone.degree, SUMMARY_TETRACHORD_DEGREE_COLUMNS);
      if (column) tonesByDegree.set(column.key, tone);
    });
    SUMMARY_TETRACHORD_DEGREE_COLUMNS.forEach((column, index) => {
      const cell = document.createElement("td");
      cell.className = summaryDegreeColumnClass(SUMMARY_TETRACHORD_DEGREE_COLUMNS, index);
      cell.dataset.degreeSlot = column.key;
      cell.dataset.degreeFamily = column.family;
      const tone = tonesByDegree.get(column.key);
      if (tone) cell.append(createSummaryPitchDisplay(
        tone.ratio,
        summaryAbsolutePitch(data, tonic, tone.ratio),
      ));
      row.append(cell);
    });
    tbody.append(row);
  });
  table.append(tbody);
  wrap.append(table);
  return wrap;
}

function graphLabelTargetFontSize(displayMode) {
  return (displayMode === "ratio" ? 19 : 15) * state.textSize / 2;
}

function calibratedGraphLabelOffset(value) {
  // A displayed 2 now equals the former 1.5, without changing the scale of
  // existing controls or the side chosen for a harmonic family.
  return value * 0.75;
}

function createSummaryNetworkFigure(data, labelMode = "heji") {
  const labelWidth = 130;
  const labelHeight = 34;
  const labelNames = {
    none: "sans libellés",
    heji: "en notation HEJI",
    ratio: "avec ratios",
  };
  const figure = document.createElement("figure");
  figure.className = "summary-network-figure";
  figure.classList.toggle("is-label-offset-zero", state.textOffset === 0 && labelMode !== "none");
  figure.dataset.summaryGraph = labelMode;
  figure.style.setProperty("--graph-label-font-size", `${graphLabelTargetFontSize(labelMode)}px`);
  const caption = document.createElement("figcaption");
  caption.className = "visually-hidden";
  caption.textContent = `Réseau complet ${data.name}, ${labelNames[labelMode] ?? labelNames.heji}`;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "-20 0 1040 620");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", caption.textContent);
  const ratios = data.pitchRatios?.length ? data.pitchRatios : ["1/1"];
  const modalPlan = state.catalog === "modes" ? modalConnectionPlan(ratios, state.connectionLevel) : null;
  const layout = modalPlan
    ? buildLatticeLayout(ratios, 1, modalPlan.auxiliaryExponents)
    : buildLatticeLayout(ratios, state.connectionLevel);
  if (modalPlan) appendModalSupplementalEdges(layout, modalPlan);
  layout.edges.forEach((edge) => {
    if (modalPlan && edge.auxiliary && !modalPlan.highlightedEdgeKeys.has(latticeLayoutEdgeKey(
      layout.nodes[edge.first], layout.nodes[edge.second],
    ))) return;
    const first = layout.nodes[edge.first];
    const second = layout.nodes[edge.second];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.classList.add("summary-network-line");
    if (edge.auxiliary) line.classList.add("summary-network-line-auxiliary");
    line.setAttribute("x1", String(first.x));
    line.setAttribute("y1", String(first.y));
    line.setAttribute("x2", String(second.x));
    line.setAttribute("y2", String(second.y));
    line.style.stroke = edge.supplemental ? "var(--ink)" : colorForPrime(edge.prime);
    // D8 : axe de la liaison (filtre des axes par limite dans le panneau Réseau).
    if (edge.prime !== undefined && edge.prime !== null) line.dataset.prime = String(edge.prime);
    svg.append(line);
  });
  layout.nodes.forEach((node) => {
    if (node.auxiliary) {
      if (modalPlan && !modalPlan.auxiliaryExponents.some((exponents) => (
        latticeExponentKey(exponents) === latticeLayoutNodeKey(node)
      ))) return;
      const auxiliary = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      auxiliary.classList.add("summary-network-auxiliary-dot");
      auxiliary.setAttribute("cx", String(node.x));
      auxiliary.setAttribute("cy", String(node.y));
      auxiliary.setAttribute("r", "3.5");
      svg.append(auxiliary);
      return;
    }
    const ratio = node.aliases[0] ?? node.ratio;
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("summary-network-node");
    group.dataset.graphAxisFamily = latticeHorizontalAxisKey(node.exponents);
    // D8 : rapport et harmoniques de la classe (cordes à vide, orphelines, filtre des axes).
    group.dataset.ratio = ratio;
    group.dataset.primes = [...node.exponents.keys()].map(String).join(" ");
    group.setAttribute("transform", `translate(${node.x} ${node.y})`);
    if (node.aliases.includes("1/1")) {
      const star = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      star.classList.add("summary-network-root-star");
      star.setAttribute("points", starPolygonPoints(0, 0, 4.5, 1.89));
      group.append(star);
    } else {
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.classList.add("summary-network-dot");
      dot.setAttribute("cx", "0");
      dot.setAttribute("cy", "0");
      dot.setAttribute("r", "3.5");
      group.append(dot);
    }
    if (labelMode !== "none") {
      const label = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      label.setAttribute("x", String(-labelWidth / 2));
      label.setAttribute("y", String(-labelHeight / 2));
      label.setAttribute("width", String(labelWidth));
      label.setAttribute("height", String(labelHeight));
      const content = document.createElement("div");
      content.className = "summary-network-label";
      content.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      content.append(labelMode === "ratio"
        ? createColorizedRatio(ratio)
        : createHejiPitch(summaryAbsolutePitch(data, ratio), false));
      label.append(content);
      group.append(label);
    }
    svg.append(group);
  });
  figure.append(caption, svg);
  return figure;
}

function summaryTonicKey(data, tonic) {
  return summaryAbsolutePitch(data, tonic);
}

function summaryExcludedTonicKeys(data) {
  if (!summaryUiState.excludedTonicKeysByNetwork.has(data.id)) {
    summaryUiState.excludedTonicKeysByNetwork.set(data.id, new Set());
  }
  return summaryUiState.excludedTonicKeysByNetwork.get(data.id);
}

function summaryBaseTonicBasins(data) {
  // A configured network admits only its designated tonics. Imported Scala
  // networks already designate every imported pitch in rebuildNetworkIndexes.
  return data.tonicBasins;
}

function summaryDocumentModel(data, tonicBasins = data.tonicBasins) {
  const patterns = data.catalog.filter((pattern) => (
    SUMMARY_KINDS.some((kind) => kind.id === pattern.kind)
    && !(pattern.kind === "accords" && SUMMARY_EXCLUDED_CHORDS.has(pattern.family))
  ));
  const occurrencesByPattern = new Map(patterns.map((pattern) => [pattern.id, []]));
  const patternsByTonicAndKind = new Map();
  tonicBasins.forEach((basin) => {
    SUMMARY_KINDS.forEach(({ id }) => patternsByTonicAndKind.set(`${basin.tonic}|${id}`, []));
    patterns.forEach((pattern) => {
      if (!summaryPatternIsAvailable(data, basin, pattern)) return;
      const occurrence = {
        absoluteTonic: summaryAbsolutePitch(data, basin.tonic),
        pattern,
        tonic: basin.tonic,
      };
      occurrencesByPattern.get(pattern.id).push(occurrence);
      patternsByTonicAndKind.get(`${basin.tonic}|${pattern.kind}`).push(pattern);
    });
  });
  return { data, patterns, occurrencesByPattern, patternsByTonicAndKind, tonicBasins };
}

function summaryDocumentModelFor(data, tonicBasins) {
  const signature = JSON.stringify([
    data.id,
    data.referenceRatioToA,
    data.sourceMethod,
    data.pitchRatios,
    data.allowedModeIdsByTonic,
    tonicBasins.map((basin) => basin.tonic),
    appliedNetworkConfiguration.concordances,
    appliedNetworkConfiguration.families,
    appliedNetworkConfiguration.excludedModeIds,
  ]);
  if (networkSummaryModelCache.signature !== signature || !networkSummaryModelCache.model) {
    networkSummaryModelCache = {
      signature,
      model: summaryDocumentModel(data, tonicBasins),
    };
  }
  return networkSummaryModelCache.model;
}

function summaryCategoryStructure(kind, patterns) {
  if (kind === "accords") {
    return chordData.columns.flatMap((column) => {
      const families = column.names.flatMap((name) => {
        const familyPatterns = patterns.filter((pattern) => pattern.family === name);
        return familyPatterns.length ? [{ key: name, label: chordDisplayName(name), patterns: familyPatterns }] : [];
      });
      return families.length ? [{ key: column.group, label: column.group, families }] : [];
    });
  }
  if (kind === "modes") {
    return MODE_GROUPS.flatMap((group) => {
      const families = group.families.flatMap((family) => {
        const familyPatterns = patterns.filter((pattern) => pattern.family === family.label);
        return familyPatterns.length
          ? [{
            key: family.label,
            label: modeFamilyAbbreviationFromName(family.label),
            headingLabel: formatModeLabel(family.label),
            patterns: familyPatterns,
          }]
          : [];
      });
      return families.length
        ? [{
          key: group.label,
          label: modeGroupPresentation(group.label)?.short ?? formatModeLabel(group.label),
          headingLabel: formatModeLabel(group.label),
          families,
        }]
        : [];
    });
  }
  const groups = [...new Set(patterns.map((pattern) => pattern.group))];
  return groups.map((group) => ({
    key: group,
    label: group,
    families: patterns.filter((pattern) => pattern.group === group).map((pattern) => ({
      key: pattern.id,
      label: summaryPatternHeadingLabel(pattern),
      patterns: [pattern],
    })),
  }));
}

function summaryOutlineKey(parts) {
  return parts.map((part) => encodeURIComponent(String(part))).join("/");
}

function summaryOutlineNode(parts, label, children = []) {
  return { children, key: summaryOutlineKey(parts), label, parts };
}

function summaryOutlineChildrenForKind(part, kind, patterns) {
  return summaryCategoryStructure(kind, patterns).map((group) => {
    const groupParts = [part, kind, group.key];
    const families = group.families.map((family) => {
      const familyParts = [...groupParts, family.key];
      const variants = kind === "modes"
        ? family.patterns.map((pattern) => summaryOutlineNode(
          [...familyParts, pattern.id],
          summaryModeTocLabel(pattern),
        ))
        : [];
      return summaryOutlineNode(familyParts, family.label, variants);
    });
    return summaryOutlineNode(groupParts, group.label, families);
  });
}

function summaryContentOutline(model) {
  const availablePatterns = model.patterns.filter((pattern) => (
    model.occurrencesByPattern.get(pattern.id)?.length
  ));
  const graphs = summaryOutlineNode(["graphs"], "Graphiques du réseau", [
    summaryOutlineNode(["graphs", "none"], "Sans libellés"),
    summaryOutlineNode(["graphs", "heji"], "HEJI"),
    summaryOutlineNode(["graphs", "ratio"], "Ratios"),
  ]);
  const pivots = [
    ["element", "Par élément"],
    ["tonic", "Par tonique"],
  ].map(([part, label]) => summaryOutlineNode([part], label, SUMMARY_KINDS.flatMap((kind) => {
    const patterns = availablePatterns.filter((pattern) => pattern.kind === kind.id);
    if (!patterns.length) return [];
    return [summaryOutlineNode(
      [part, kind.id],
      kind.label,
      summaryOutlineChildrenForKind(part, kind.id, patterns),
    )];
  })));
  return [graphs, ...pivots];
}

function summaryPatternOutlineParts(part, kind, pattern) {
  if (kind === "accords") {
    const group = chordData.columns.find((column) => column.names.includes(pattern.family))?.group
      ?? pattern.group;
    return [part, kind, group, pattern.family];
  }
  if (kind === "modes") {
    const mode = summaryModeForPattern(pattern);
    return [part, kind, mode?.group ?? pattern.group, mode?.family ?? pattern.family, pattern.id];
  }
  return [part, kind, pattern.group, pattern.id];
}

function summaryOutlinePathIsEnabled(parts) {
  return parts.every((part, index) => (
    !summaryUiState.disabledOutlineIds.has(summaryOutlineKey(parts.slice(0, index + 1)))
  ));
}

function summaryPatternIsEnabled(part, kind, pattern) {
  return summaryOutlinePathIsEnabled(summaryPatternOutlineParts(part, kind, pattern));
}

function summaryOutlineNodeState(node) {
  if (summaryUiState.disabledOutlineIds.has(node.key)) return "none";
  if (!node.children.length) return "all";
  const childStates = node.children.map(summaryOutlineNodeState);
  if (childStates.every((stateValue) => stateValue === "all")) return "all";
  if (childStates.every((stateValue) => stateValue === "none")) return "none";
  return "mixed";
}

function setSummaryOutlineBranch(node, enabled, { descendants = false } = {}) {
  if (enabled) summaryUiState.disabledOutlineIds.delete(node.key);
  else summaryUiState.disabledOutlineIds.add(node.key);
  if (descendants) node.children.forEach((child) => (
    setSummaryOutlineBranch(child, enabled, { descendants: true })
  ));
}

function summaryOutlineCheckbox(node, { inheritedOff = false } = {}) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const nodeState = summaryOutlineNodeState(node);
  // Une branche éteinte par un parent décoché s'affiche décochée et grisée; la sélection fine
  // est conservée et revient quand on recoche le parent.
  checkbox.checked = !inheritedOff && nodeState !== "none";
  checkbox.indeterminate = !inheritedOff && nodeState === "mixed";
  checkbox.disabled = inheritedOff;
  checkbox.setAttribute("aria-checked", checkbox.indeterminate ? "mixed" : String(checkbox.checked));
  checkbox.addEventListener("change", () => {
    if (summaryUiState.disabledOutlineIds.has(node.key)) {
      setSummaryOutlineBranch(node, true);
    } else if (nodeState === "all") {
      setSummaryOutlineBranch(node, false);
    } else {
      setSummaryOutlineBranch(node, true, { descendants: true });
    }
    renderNetworkSummaryDocument({ force: true });
  });
  return checkbox;
}

function renderSummaryOpeningOptions(graphs) {
  if (!elements.summaryOpeningOptions) return;
  elements.summaryOpeningOptions.replaceChildren();
  if (!graphs) return;
  graphs.children.forEach((node) => {
    const label = document.createElement("label");
    label.className = "summary-opening-option";
    const checkbox = summaryOutlineCheckbox(node);
    if (summaryUiState.disabledOutlineIds.has(graphs.key)) {
      checkbox.checked = false;
      checkbox.indeterminate = false;
      checkbox.setAttribute("aria-checked", "false");
    }
    // L'ouverture n'a plus de case parente : cocher une version la rend toujours visible.
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) summaryUiState.disabledOutlineIds.delete(graphs.key);
    }, { capture: true });
    const text = document.createElement("span");
    text.textContent = node.label;
    label.append(checkbox, text);
    elements.summaryOpeningOptions.append(label);
  });
}

function renderSummaryOptionsTree(tree) {
  if (!elements.summaryOptionsTree) return;
  elements.summaryOptionsTree.replaceChildren();
  // Ouverture (graphiques) à part; l'arbre ne montre que les deux parties du document.
  renderSummaryOpeningOptions(tree.find((node) => node.key === summaryOutlineKey(["graphs"])));
  const parts = tree.filter((node) => node.key !== summaryOutlineKey(["graphs"]));
  const renderBranch = (nodes, depth = 1, inheritedOff = false) => {
    const list = document.createElement("ul");
    list.className = "summary-filter-branch";
    nodes.forEach((node, index) => {
      const item = document.createElement("li");
      const row = document.createElement("div");
      row.className = "summary-filter-row";
      if (inheritedOff) row.classList.add("is-inherited-off");
      const branchId = summarySafeId("filtre", depth, index, node.key);
      const childrenOff = inheritedOff || summaryUiState.disabledOutlineIds.has(node.key);
      let children = null;
      if (node.children.length) {
        const expanded = summaryUiState.outlineExpansion.has(node.key)
          ? summaryUiState.outlineExpansion.get(node.key)
          : depth <= 2;
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "summary-filter-toggle";
        toggle.setAttribute("aria-controls", branchId);
        toggle.setAttribute("aria-expanded", String(expanded));
        toggle.setAttribute("aria-label", `${expanded ? "Replier" : "Déplier"} ${node.label}`);
        toggle.textContent = expanded ? "▾" : "▸";
        children = renderBranch(node.children, depth + 1, childrenOff);
        children.id = branchId;
        children.hidden = !expanded;
        toggle.addEventListener("click", () => {
          const nextExpanded = toggle.getAttribute("aria-expanded") !== "true";
          summaryUiState.outlineExpansion.set(node.key, nextExpanded);
          toggle.setAttribute("aria-expanded", String(nextExpanded));
          toggle.setAttribute("aria-label", `${nextExpanded ? "Replier" : "Déplier"} ${node.label}`);
          toggle.textContent = nextExpanded ? "▾" : "▸";
          children.hidden = !nextExpanded;
        });
        row.append(toggle);
      } else {
        const spacer = document.createElement("span");
        spacer.className = "summary-filter-spacer";
        spacer.setAttribute("aria-hidden", "true");
        row.append(spacer);
      }
      const label = document.createElement("label");
      const checkbox = summaryOutlineCheckbox(node, { inheritedOff });
      const text = document.createElement("span");
      text.className = "summary-filter-label";
      appendSummaryColorizedText(text, node.label);
      label.append(checkbox, text);
      row.append(label);
      if (depth === 1 && node.children.length) {
        // Tout / Rien n'agissent que sur cette partie (Par élément ou Par tonique).
        const actions = document.createElement("span");
        actions.className = "summary-branch-actions";
        for (const [enabled, buttonText] of [[true, "Tout"], [false, "Rien"]]) {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = buttonText;
          button.dataset.summaryBranchAction = enabled ? "all" : "none";
          button.setAttribute("aria-label", `${buttonText} : ${node.label}`);
          button.addEventListener("click", (event) => {
            // L'arbre est redessiné : sans cela, le menu croirait à un clic extérieur et se fermerait.
            event.stopPropagation();
            setSummaryOutlineBranch(node, enabled, { descendants: true });
            renderNetworkSummaryDocument({ force: true });
          });
          actions.append(button);
        }
        row.append(actions);
      }
      item.append(row);
      if (children) item.append(children);
      list.append(item);
    });
    return list;
  };
  elements.summaryOptionsTree.append(renderBranch(parts));
}

function renderSummaryTonics(data, tonicBasins) {
  if (!elements.summaryTonicsList) return;
  const excluded = summaryExcludedTonicKeys(data);
  summaryUiState.tonicRatios = tonicBasins.map((basin) => basin.tonic);
  const list = document.createElement("ul");
  list.className = "summary-tonic-list";
  tonicBasins.forEach((basin) => {
    const key = summaryTonicKey(data, basin.tonic);
    const item = document.createElement("li");
    const label = document.createElement("label");
    label.className = "summary-tonic-option";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !excluded.has(key);
    checkbox.dataset.summaryTonicKey = key;
    const pitch = createSummaryTonicLabel(data, basin.tonic, false);
    const family = document.createElement("span");
    family.className = "summary-tonic-family";
    family.textContent = `— ${summaryTonicFamilyLabel(basin.tonic)}`;
    const ratio = document.createElement("span");
    ratio.className = "summary-tonic-ratio";
    ratio.textContent = key;
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) excluded.delete(key);
      else excluded.add(key);
      renderNetworkSummaryDocument({ force: true });
    });
    label.append(checkbox, pitch, family, ratio);
    item.append(label);
    list.append(item);
  });
  elements.summaryTonicsList.replaceChildren(list);
}

function summarySelectedTonicBasins(data, tonicBasins) {
  const excluded = summaryExcludedTonicKeys(data);
  return tonicBasins.filter((basin) => !excluded.has(summaryTonicKey(data, basin.tonic)));
}

function buildSummaryTableOfContents() {
  elements.summaryTocLinks.replaceChildren();
  const root = { children: [], level: 0 };
  const stack = [root];
  elements.summaryDocument.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").forEach((heading) => {
    const level = Number(heading.tagName.slice(1));
    while (stack.at(-1).level >= level) stack.pop();
    const node = {
      children: [],
      heading,
      label: heading.dataset.tocLabel || heading.textContent.trim(),
      level,
    };
    stack.at(-1).children.push(node);
    stack.push(node);
  });

  const renderBranch = (nodes, parentId = "racine") => {
    const list = document.createElement("ul");
    list.className = "summary-toc-tree";
    nodes.forEach((node, index) => {
      const item = document.createElement("li");
      item.dataset.level = String(node.level);
      const row = document.createElement("div");
      row.className = "summary-toc-row";
      const branchId = summarySafeId("toc", parentId, index, node.heading.id);
      if (node.children.length) {
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "summary-toc-toggle";
        const expanded = node.level <= 2;
        toggle.setAttribute("aria-controls", branchId);
        toggle.setAttribute("aria-expanded", String(expanded));
        toggle.setAttribute("aria-label", `${expanded ? "Replier" : "Déplier"} ${node.label}`);
        toggle.textContent = expanded ? "▾" : "▸";
        row.append(toggle);
        const children = renderBranch(node.children, branchId);
        children.id = branchId;
        children.hidden = !expanded;
        toggle.addEventListener("click", () => {
          const nextExpanded = toggle.getAttribute("aria-expanded") !== "true";
          toggle.setAttribute("aria-expanded", String(nextExpanded));
          toggle.setAttribute("aria-label", `${nextExpanded ? "Replier" : "Déplier"} ${node.label}`);
          toggle.textContent = nextExpanded ? "▾" : "▸";
          children.hidden = !nextExpanded;
        });
        item.append(row, children);
      } else {
        const spacer = document.createElement("span");
        spacer.className = "summary-toc-spacer";
        spacer.setAttribute("aria-hidden", "true");
        row.append(spacer);
        item.append(row);
      }
      const link = document.createElement("a");
      link.href = `#${node.heading.id}`;
      if (node.level === 1) appendColorizedNetworkLabel(link, node.label);
      else appendSummaryColorizedText(link, node.label);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const viewport = elements.summaryDocument.closest(".summary-document-viewport");
        if (!viewport) return;
        const targetTop = node.heading.getBoundingClientRect().top
          - viewport.getBoundingClientRect().top + viewport.scrollTop;
        viewport.scrollTo({ top: Math.max(0, targetTop - 12), behavior: "auto" });
        history.replaceState(history.state, "", `#${encodeURIComponent(node.heading.id)}`);
      });
      row.append(link);
      list.append(item);
    });
    return list;
  };
  elements.summaryTocLinks.append(renderBranch(root.children));
}

function renderNetworkSummaryDocument({ force = false } = {}) {
  if (!elements.summaryDocument || !elements.summaryTocLinks) return;
  syncSummaryTableVisibility();
  const data = networkAnalysisData();
  const tonicBasins = summaryBaseTonicBasins(data);
  const model = summaryDocumentModelFor(data, tonicBasins);
  const contentTree = summaryContentOutline(model);
  const selectedTonicBasins = summarySelectedTonicBasins(data, tonicBasins);
  const selectedTonics = new Set(selectedTonicBasins.map((basin) => basin.tonic));
  const selectedOccurrences = (pattern) => (
    model.occurrencesByPattern.get(pattern.id)?.filter((occurrence) => (
      selectedTonics.has(occurrence.tonic)
    )) ?? []
  );
  summaryUiState.contentTree = contentTree;
  const signature = JSON.stringify([
    data.id,
    data.name,
    data.referenceRatioToA,
    data.pitchRatios,
    summaryDisplayMode(),
    state.catalog,
    state.graphSystem,
    state.connectionLevel,
    state.simonAxis5Length,
    state.simon1Axis5Length,
    state.textSize,
    state.textOffset,
    tonicBasins.map((basin) => basin.tonic),
    [...summaryExcludedTonicKeys(data)].sort(),
    [...summaryUiState.disabledOutlineIds].sort(),
    appliedNetworkConfiguration.concordances,
    appliedNetworkConfiguration.families,
    appliedNetworkConfiguration.excludedModeIds,
  ]);
  if (!force && signature === networkSummaryDocumentSignature && elements.summaryDocument.childElementCount) {
    scheduleSummaryTargetedLabelMasks();
    return;
  }
  const fragment = document.createDocumentFragment();
  const titleId = summarySafeId("reseau");
  fragment.append(createSummaryHeading(1, titleId, data.name, data.name));
  ["none", "heji", "ratio"].forEach((labelMode) => {
    if (summaryOutlinePathIsEnabled(["graphs", labelMode])) {
      fragment.append(createSummaryNetworkFigure(data, labelMode));
    }
  });

  if (summaryOutlinePathIsEnabled(["element"])) {
    const categoryId = summarySafeId("par-element");
    fragment.append(createSummaryHeading(2, categoryId, "Par élément"));
    SUMMARY_KINDS.forEach(({ id: kind, label }) => {
      if (!summaryOutlinePathIsEnabled(["element", kind])) return;
      const kindPatterns = model.patterns.filter((pattern) => (
        pattern.kind === kind
        && summaryPatternIsEnabled("element", kind, pattern)
        && selectedOccurrences(pattern).length
      ));
      const sectionId = summarySafeId("categorie", kind);
      const section = document.createElement("section");
      section.className = "summary-section-block";
      section.append(createSummaryHeading(3, sectionId, label));
      const groups = summaryCategoryStructure(kind, kindPatterns);
      if (!groups.length) {
        const empty = document.createElement("p");
        empty.className = "summary-empty";
        empty.textContent = "Aucun résultat dans ce réseau.";
        section.append(empty);
      }
      groups.forEach((group) => {
        section.append(createSummaryHeading(
          4,
          summarySafeId("categorie", kind, group.key),
          group.label,
          group.headingLabel ?? group.label,
        ));
        group.families.forEach((family) => {
          section.append(createSummaryHeading(
            5,
            summarySafeId("categorie", kind, group.key, family.key),
            family.label,
            family.headingLabel ?? family.label,
          ));
          const showVariantHeading = kind === "modes";
          family.patterns.forEach((pattern) => {
            if (showVariantHeading) {
              section.append(createSummaryHeading(
                6,
                summarySafeId("categorie", kind, group.key, family.key, pattern.id),
                summaryModeTocLabel(pattern),
                summaryPatternHeadingLabel(pattern),
              ));
            }
            section.append(createSummaryPatternModel(
              pattern,
              selectedOccurrences(pattern),
              data,
            ));
          });
        });
      });
      fragment.append(section);
    });
  }

  if (summaryOutlinePathIsEnabled(["tonic"])) {
    const tonicPartId = summarySafeId("par-tonique");
    fragment.append(createSummaryHeading(2, tonicPartId, "Par tonique"));
    SUMMARY_KINDS.forEach(({ id: kind, label }) => {
      if (!summaryOutlinePathIsEnabled(["tonic", kind])) return;
      const sectionId = summarySafeId("tonique", kind);
      const section = document.createElement("section");
      section.className = "summary-section-block";
      section.append(createSummaryHeading(3, sectionId, label));
      let hasContent = false;
      selectedTonicBasins.forEach((basin) => {
        const patterns = (model.patternsByTonicAndKind.get(`${basin.tonic}|${kind}`) ?? [])
          .filter((pattern) => summaryPatternIsEnabled("tonic", kind, pattern));
        if (!patterns.length) return;
        hasContent = true;
        const absolute = summaryAbsolutePitch(data, basin.tonic);
        const tocLabel = summaryTonicTocLabel(data, basin.tonic);
        const headingContent = createSummaryTonicLabel(data, basin.tonic, false);
        section.append(createSummaryHeading(
          4,
          summarySafeId("tonique", kind, basin.tonic),
          tocLabel,
          headingContent,
        ));
        if (kind === "accords") {
          section.append(createSummaryChordMatrix(patterns, basin.tonic, data));
        } else if (kind === "tetracordes") {
          section.append(createSummaryTetrachordSynthesis(patterns, basin.tonic, data));
        } else {
          summaryCategoryStructure("modes", patterns).forEach((group) => {
            section.append(createSummaryHeading(
              5,
              summarySafeId("tonique", kind, basin.tonic, group.key),
              group.label,
              group.headingLabel ?? group.label,
            ));
            group.families.flatMap((family) => family.patterns).forEach((pattern) => {
              section.append(
                createSummaryHeading(
                  6,
                  summarySafeId("tonique", kind, basin.tonic, group.key, pattern.id),
                  summaryModeTocLabel(pattern),
                  summaryPatternHeadingLabel(pattern),
                ),
                createSummaryPatternModel(pattern, [{
                  absoluteTonic: absolute,
                  pattern,
                  tonic: basin.tonic,
                }], data),
              );
            });
          });
        }
      });
      if (!hasContent) {
        const empty = document.createElement("p");
        empty.className = "summary-empty";
        empty.textContent = "Aucun résultat dans ce réseau.";
        section.append(empty);
      }
      fragment.append(section);
    });
  }
  elements.summaryDocument.replaceChildren(fragment);
  elements.summaryDocument.dataset.displayMode = summaryDisplayMode();
  networkSummaryDocumentSignature = signature;
  buildSummaryTableOfContents();
  renderSummaryOptionsTree(contentTree);
  renderSummaryTonics(data, tonicBasins);
  scheduleSummaryTargetedLabelMasks();
}

let summaryWordExportInProgress = false;

function summaryExportTitle() {
  const networkName = networkAnalysisData()?.name?.trim();
  return networkName ? `Sommaire — ${networkName}` : "Sommaire";
}

function summaryExportFilename(extension) {
  const filename = summaryExportTitle()
    .normalize("NFC")
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, " ")
    .trim();
  return `${filename || "Sommaire"}.${extension}`;
}

function setSummaryDownloadStatus(message = "", state = "") {
  elements.summaryDownloadStatus.textContent = message;
  if (state) elements.summaryDownloadStatus.dataset.state = state;
  else delete elements.summaryDownloadStatus.dataset.state;
}

function setSummaryDownloadBusy(busy) {
  summaryWordExportInProgress = busy;
  elements.summaryDownloadWord.disabled = busy;
  elements.summaryDownloadButton.disabled = busy;
}

function downloadSummaryBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

// Retained for the documented PDF restoration path; no button invokes it now.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function printNetworkSummary() {
  if (!elements.summaryDocument.childElementCount) renderNetworkSummaryDocument({ force: true });
  const previousTitle = document.title;
  let cleaned = false;
  let cleanupTimer = 0;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    clearTimeout(cleanupTimer);
    window.removeEventListener("afterprint", cleanup);
    document.body.classList.remove("is-printing-summary");
    document.title = previousTitle;
    scheduleSummaryTargetedLabelMasks();
  };
  document.title = summaryExportTitle();
  document.body.classList.add("is-printing-summary");
  updateSummaryTargetedLabelMasks();
  closeMenu(elements.summaryDownloadButton, elements.summaryDownloadPopover);
  setSummaryDownloadStatus("");
  window.addEventListener("afterprint", cleanup, { once: true });
  try {
    window.print();
  } catch (error) {
    setSummaryDownloadStatus(
      error instanceof Error ? error.message : "Impossible d’ouvrir l’impression.",
      "error",
    );
  } finally {
    if (!cleaned) cleanupTimer = setTimeout(cleanup, 1500);
  }
}

async function downloadNetworkSummaryWord() {
  if (summaryWordExportInProgress) return;
  if (!elements.summaryDocument.childElementCount) renderNetworkSummaryDocument({ force: true });
  await document.fonts?.ready;
  updateSummaryTargetedLabelMasks();
  const title = summaryExportTitle();
  const filename = summaryExportFilename("docx");
  const summarySnapshot = elements.summaryDocument.cloneNode(true);
  const liveFigures = [...elements.summaryDocument.querySelectorAll(".summary-network-figure")];
  summarySnapshot.querySelectorAll(".summary-network-figure").forEach((figure, index) => {
    const width = liveFigures[index]?.getBoundingClientRect().width;
    if (width > 0) figure.dataset.exportCaptureWidth = String(width);
  });
  setSummaryDownloadBusy(true);
  setSummaryDownloadStatus("Préparation du document Word…");
  try {
    const { createSummaryDocx } = await import("./vendor/document-exports.mjs?v=a91b258f");
    const blob = await createSummaryDocx(summarySnapshot, {
      title,
      onProgress: ({ completed, total, label }) => {
        const percentage = total ? Math.round((completed / total) * 100) : 0;
        setSummaryDownloadStatus(`Word : ${label} (${percentage} %)`);
      },
    });
    downloadSummaryBlob(blob, filename);
    setSummaryDownloadStatus("Document Word téléchargé.");
  } catch (error) {
    console.error("Échec de l’export Word du Sommaire", error);
    setSummaryDownloadStatus(
      error instanceof Error ? error.message : "Impossible de créer le document Word.",
      "error",
    );
  } finally {
    setSummaryDownloadBusy(false);
  }
}

function networkAnalysisIdentity(network) {
  return JSON.stringify({
    id: network.id ?? "",
    referenceRatioToA: network.referenceRatioToA,
    ratios: network.ratios,
    pitchRatios: network.pitchRatios ?? [],
    allowedModeIdsByTonic: network.allowedModeIdsByTonic ?? {},
    tonicBasins: (network.tonicBasins ?? []).map(({ tonic, ratios, modelRatios }) => (
      [tonic, ratios, modelRatios ?? []]
    )),
  });
}

function syncNetworkAnalysis() {
  const frame = document.querySelector("#network-analysis-frame");
  if (frame?.dataset.ready !== "true") return;
  const network = networkAnalysisData();
  // Polyvalence : calculée seulement quand l'onglet Analyse est affiché (jusqu'à ~0,6 s sur un grand réseau).
  if (document.body.dataset.pageTab === "analysis") network.connectionStats = networkConnectionStats();
  const signature = JSON.stringify(network);
  if (signature === frame.dataset.networkSignature) return;
  frame.contentWindow.postMessage({ type: "harmonie:network-analysis", network },
    window.location.origin === "null" ? "*" : window.location.origin);
  frame.dataset.networkSignature = signature;
}

function sendNetworkAnalysisCommand(command, value) {
  const frame = document.querySelector("#network-analysis-frame");
  if (frame?.dataset.ready !== "true" || !frame.contentWindow) return;
  frame.contentWindow.postMessage(
    { type: "harmonie:analysis-command", command, value },
    window.location.origin === "null" ? "*" : window.location.origin,
  );
}

// Demande D5 (Simon, 19 octobre 2026) : la scordatura d'une TFP se calcule corde par corde. Chaque corde à vide
// garde sa hauteur standard si l'échelle la contient; sinon elle prend une hauteur voisine de l'échelle, à un
// comma près (variantes 5, 7, 11, 13 connues du Système). Les deux cordes de mi restent à la même hauteur.
// Entre plusieurs possibilités : le moins de limites distinctes dans le code, puis la plus petite déviation en
// cents. Une surcharge par modèle reste possible (TFP_SCORDATURA_OVERRIDES).
const TFP_OPEN_STRING_LETTERS = ["E", "B", "G", "D", "A", "E"];
const TFP_STRING_VARIANTS = (() => {
  const variants = TFP_BASE_STRINGS_TO_A.map(() => new Map());
  TFP_SCORDATURA_CONFIGURATIONS.forEach(({ label, stringsToA }) => {
    const tokens = [...String(label).matchAll(/([EADGB])(\d+)/g)].map(([, note, limit]) => [note, limit]);
    stringsToA.forEach((ratio, index) => {
      if (ratio === TFP_BASE_STRINGS_TO_A[index]) return;
      const limit = tokens.find(([note]) => note === TFP_OPEN_STRING_LETTERS[index])?.[1];
      // Pas de corde de mi en harmonique 5 (E5, donc E5B5) dans la reconnaissance : trop complexe pour le gain
      // (Simon, 20 octobre 2026). B5 seul reste possible (ex. L11a et L13c sur ré). E5B5 reste au choix manuel.
      if (limit === "5" && TFP_OPEN_STRING_LETTERS[index] === "E") return;
      if (limit) variants[index].set(ratio, limit);
    });
  });
  return variants;
})();
const TFP_SCORDATURA_OVERRIDES = {};

function tfpScordaturaCode(stringsToA) {
  const parts = [];
  // Ordre du code : du grave à l'aigu (E A D G B), comme les noms du Système (A7D7G13, E7G13B7…).
  [5, 4, 3, 2, 1].forEach((index) => {
    const ratio = stringsToA[index];
    if (ratio === TFP_BASE_STRINGS_TO_A[index]) return;
    parts.push(`${TFP_OPEN_STRING_LETTERS[index]}${TFP_STRING_VARIANTS[index].get(ratio)}`);
  });
  return parts.join("") || "—";
}

function tfpScordaturaForNetwork(configuration) {
  if (configuration?.sourceMethod !== "scala") return null;
  try {
    const parsed = networkModel.parseNetworkRatios(configuration.scalaText);
    if (parsed.count !== 12) return null;
    const referenceRatioToA = networkGeneratorPitchRatio(configuration);
    const ratios = new Set(parsed.ratios);
    const inScale = (ratioToA) => ratios.has(divideAndReduce(ratioToA, referenceRatioToA));
    const choices = TFP_BASE_STRINGS_TO_A.map((base, index) => [base, ...TFP_STRING_VARIANTS[index].keys()]
      .filter((ratio) => inScale(ratio)));
    if (choices.some((list) => !list.length)) return null;
    const combinations = [];
    const walk = (index, picked) => {
      if (index === 6) {
        if (picked[0] === picked[5]) combinations.push([...picked]);
        return;
      }
      choices[index].forEach((ratio) => walk(index + 1, [...picked, ratio]));
    };
    walk(0, []);
    if (!combinations.length) return null;
    const override = TFP_SCORDATURA_OVERRIDES[configuration.id];
    const scored = combinations.map((stringsToA) => {
      const limits = new Set(stringsToA.flatMap((ratio, index) => (
        ratio === TFP_BASE_STRINGS_TO_A[index] ? [] : [TFP_STRING_VARIANTS[index].get(ratio)])));
      const deviation = stringsToA.reduce((total, ratio, index) => total
        + Math.abs(ratioCents(ratio) - ratioCents(TFP_BASE_STRINGS_TO_A[index])), 0);
      return { stringsToA, label: tfpScordaturaCode(stringsToA), limits: limits.size, deviation };
    }).sort((first, second) => first.limits - second.limits || first.deviation - second.deviation);
    const chosen = (override && scored.find((entry) => entry.label === override)) || scored[0];
    const known = TFP_SCORDATURA_CONFIGURATIONS.find((preset) => preset.label === chosen.label);
    return {
      id: known?.id ?? "tfp-custom",
      label: chosen.label,
      stringsToA: chosen.stringsToA,
      openStringRatios: chosen.stringsToA.map((ratio) => divideAndReduce(ratio, referenceRatioToA)),
      alternatives: scored.map((entry) => entry.label),
    };
  } catch {
    return null;
  }
}

function fretboardNetworkIsCompatible(
  configuration = appliedNetworkConfiguration,
  type = frettierUiState.fretboardType,
) {
  if (configuration?.scope !== type || configuration?.sourceMethod !== "scala") return false;
  if (type === "tfe" && configuration.savedFrettierSnapshot?.kind === "tfe") return true;
  if (type === "tfe" && tfeFretPlanPreset(configuration.abstractFretPlanId)) return true;
  try {
    if (networkModel.parseNetworkRatios(configuration.scalaText).count !== 12) return false;
    return type !== "tfp" || Boolean(tfpScordaturaForNetwork(configuration));
  } catch {
    return false;
  }
}

const ACTIVE_NETWORK_MENU_GROUPS = [
  ["global", "Réseaux généraux"],
  ["tfe", "TFE"],
  ["tfp", "TFP"],
];

function closeActiveNetworkSubmenus() {
  if (!elements.activeNetworkMenu) return;
  elements.activeNetworkMenu.querySelectorAll(".active-network-group-trigger").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
  elements.activeNetworkMenu.querySelectorAll(".active-network-group").forEach((group) => {
    group.classList.remove("is-open", "opens-left");
  });
  elements.activeNetworkMenu.querySelectorAll(".active-network-submenu").forEach((submenu) => {
    submenu.hidden = true;
    submenu.style.removeProperty("top");
  });
}

function openActiveNetworkSubmenu(trigger, focusFirst = false) {
  const group = trigger?.closest(".active-network-group");
  const submenu = group?.querySelector(".active-network-submenu");
  if (!group || !submenu) return;
  closeActiveNetworkSubmenus();
  group.classList.add("is-open");
  trigger.setAttribute("aria-expanded", "true");
  submenu.hidden = false;
  submenu.style.top = "-7px";
  const submenuRect = submenu.getBoundingClientRect();
  const viewportPadding = 8;
  const bottomOverflow = submenuRect.bottom - (window.innerHeight - viewportPadding);
  if (bottomOverflow > 0) submenu.style.top = `${-7 - bottomOverflow}px`;
  const adjustedRect = submenu.getBoundingClientRect();
  if (adjustedRect.top < viewportPadding) {
    submenu.style.top = `${Number.parseFloat(submenu.style.top) + viewportPadding - adjustedRect.top}px`;
  }
  if (
    submenu.getBoundingClientRect().right > window.innerWidth - viewportPadding
    && group.getBoundingClientRect().left > submenu.getBoundingClientRect().width
  ) group.classList.add("opens-left");
  if (focusFirst) submenu.querySelector("button:not(:disabled)")?.focus();
}

function activeNetworkMenuLevelEntries(target = document.activeElement) {
  const submenu = target?.closest?.(".active-network-submenu");
  if (submenu && !submenu.hidden) {
    return [...submenu.querySelectorAll(".active-network-option")]
      .filter((option) => !option.disabled && !option.hidden);
  }
  return [...elements.activeNetworkMenu.children].map((child) => {
    if (child.classList.contains("active-network-group")) {
      return child.querySelector(".active-network-group-trigger");
    }
    return child.classList.contains("active-network-option") ? child : null;
  }).filter((entry) => entry && !entry.disabled && !entry.hidden);
}

function focusActiveNetworkMenuEntry(key, target = document.activeElement) {
  const entries = activeNetworkMenuLevelEntries(target);
  if (!entries.length) return false;
  const current = entries.indexOf(target);
  const next = key === "Home" ? 0
    : key === "End" ? entries.length - 1
      : key === "ArrowDown" ? (current < 0 ? 0 : (current + 1) % entries.length)
        : current < 0 ? entries.length - 1 : (current - 1 + entries.length) % entries.length;
  entries[next]?.focus();
  return true;
}

function createActiveNetworkChoice(preset, frettierIsActive) {
  const isFretPlan = Boolean(tfeFretPlanPreset(preset.id));
  const button = document.createElement("button");
  button.type = "button";
  button.className = "active-network-option";
  button.dataset.networkPresetId = preset.id;
  button.disabled = frettierIsActive && !isFretPlan && !fretboardNetworkIsCompatible(preset);
  button.setAttribute("role", "menuitemradio");
  button.setAttribute("aria-checked", String(isFretPlan
    ? preset.id === frettierUiState.fretPlanId
    : !frettierUiState.fretPlanId && preset.id === networkManager.activeId));
  button.setAttribute("aria-label", preset.name);
  // Modèles (C5, E5) : la remarque du modèle (source, rôle) en infobulle; plus d'ancien nom.
  const model = typeof TFP_MODEL_NOTES !== "undefined" ? TFP_MODEL_NOTES.get(preset.id) : null;
  button.title = [preset.name, model?.note ?? "",
    !frettierIsActive && isFretPositionTemplate(preset) ? "sans scordatura : à attribuer dans le Frettier" : ""]
    .filter(Boolean).join(" — ");
  appendColorizedNetworkLabel(button, preset.name);
  return button;
}

function appendColorizedNetworkLabel(container, value) {
  const label = String(value);
  const parts = [];
  const append = (part, color = null) => {
    const span = document.createElement("span");
    span.className = `network-label-segment${color ? " network-label-harmonic" : ""}`;
    if (color) span.style.color = color;
    span.textContent = part;
    parts.push(span);
  };
  const harmonicLabels = new Set(["5", "7", "11", "13"]);
  const hasFretCount = /^TFE-(?:15|18|19)(?:-|$)/.test(label);
  let start = 0;
  for (const match of label.matchAll(/\d+/g)) {
    const index = match.index ?? 0;
    if (index > start) append(label.slice(start, index));
    const number = match[0];
    const isRatioPart = label[index - 1] === "/" || label[index + number.length] === "/";
    const isFretCount = (hasFretCount && index === 4) || label[index + number.length] === "F";
    const color = !isFretCount && (harmonicLabels.has(number) || isRatioPart)
      ? colorForInteger(number) : null;
    append(number, color);
    start = index + match[0].length;
  }
  if (start < label.length) append(label.slice(start));
  container.replaceChildren(...parts);
}

function builtInTouchPreset(id) {
  return DEFAULT_TOUCH_NETWORK_CONFIGURATIONS.some((preset) => preset.id === id);
}

function frettierCurrentPresetLabel(preset) {
  if (frettierUiState.fretboardType !== "tfe"
    || frettierUiState.snapshotContextId !== preset.id) return preset.name;
  const snapshot = frettierUiState.savedSnapshot;
  if (!snapshot || snapshot.invalidFrets || !Array.isArray(snapshot.allFrets)) return preset.name;
  const canonical = DEFAULT_TOUCH_NETWORK_CONFIGURATIONS.find((entry) =>
    entry.id === preset.id || entry.abstractFretPlanId === preset.id);
  const expected = canonical
    ? canonical.scalaText.trim().split(/\s+/)
    : preset.savedFrettierSnapshot?.allFrets;
  if (!expected || (expected.length === snapshot.allFrets.length
    && expected.every((ratio, index) => ratio === snapshot.allFrets[index]))) return preset.name;
  // Keep personal names and all saved edits; never silently reset the user's instrument.
  return canonical ? `TFE-${snapshot.allFrets.length}F-modifiée`
    : `${preset.name} · modifiée (${snapshot.allFrets.length} frettes)`;
}

function renderActiveNetworkSelector() {
  syncFretTemplateNotice();
  if (!elements.activeNetworkSelect || !elements.activeNetworkMenu || !elements.activeNetworkLabel) return;
  const frettierIsActive = document.body.dataset.pageTab === "frettier";
  const active = activeNetworkPreset();
  const activePlan = frettierIsActive && frettierUiState.fretboardType === "tfe"
    ? tfeFretPlanPreset(frettierUiState.fretPlanId) : null;
  const activeIsAvailable = Boolean(activePlan) || !frettierIsActive || fretboardNetworkIsCompatible(active);
  const baseLabel = activePlan?.name ?? (activeIsAvailable ? active.name : "Sélectionner une touche");
  const activeLabel = frettierIsActive && activeIsAvailable
    ? frettierCurrentPresetLabel(activePlan ?? active) : baseLabel;
  appendColorizedNetworkLabel(elements.activeNetworkLabel, activeLabel);
  elements.activeNetworkButton.setAttribute("aria-label", activeLabel);
  elements.activeNetworkButton.title = activeLabel === baseLabel ? activeLabel : `${activeLabel} — Base : ${baseLabel}`;
  elements.activeNetworkSelect.replaceChildren();
  elements.activeNetworkMenu.replaceChildren();
  elements.activeNetworkMenu.classList.toggle("is-flat", frettierIsActive);
  if (frettierIsActive) {
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "Sélectionner une touche";
    elements.activeNetworkSelect.append(empty);
  }
  const visiblePresets = networkManager.presets.filter((preset) =>
    networkVisibleOnCurrentPage(preset) && !/-demi-positions$/.test(preset.id));
  const appendPresetOption = (container, preset) => {
    const option = document.createElement("option");
    option.value = preset.id;
    option.textContent = preset.name;
    option.disabled = frettierIsActive && !tfeFretPlanPreset(preset.id) && !fretboardNetworkIsCompatible(preset);
    container.append(option);
  };
  if (frettierIsActive) {
    if (frettierUiState.fretboardType === "tfe") {
      appendTfeSelectSections(elements.activeNetworkSelect, visiblePresets, appendPresetOption);
      appendTfeMenuSections(elements.activeNetworkMenu, visiblePresets,
        (preset) => createActiveNetworkChoice(preset, true), "tfe", { sortable: true });
    } else {
      appendTfeSelectSections(elements.activeNetworkSelect, visiblePresets, appendPresetOption, "", "tfp");
      appendTfeMenuSections(elements.activeNetworkMenu, visiblePresets,
        (preset) => createActiveNetworkChoice(preset, true), "tfp", { sortable: true });
    }
  } else {
    ACTIVE_NETWORK_MENU_GROUPS.forEach(([scope, label]) => {
      const presets = visiblePresets.filter((preset) => preset.scope === scope);
      if (!presets.length) return;
      if (scope === "tfe" || scope === "tfp") {
        appendTfeSelectSections(elements.activeNetworkSelect, presets, appendPresetOption,
          `${scope.toUpperCase()} — `, scope);
      } else {
        const group = document.createElement("optgroup");
        group.label = label;
        presets.forEach((preset) => appendPresetOption(group, preset));
        elements.activeNetworkSelect.append(group);
      }

      const fanGroup = document.createElement("div");
      fanGroup.className = "active-network-group";
      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "active-network-group-trigger";
      trigger.setAttribute("role", "menuitem");
      trigger.setAttribute("aria-haspopup", "menu");
      trigger.setAttribute("aria-expanded", "false");
      const triggerLabel = document.createElement("span");
      triggerLabel.textContent = label;
      const arrow = document.createElement("span");
      arrow.className = "active-network-group-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "›";
      trigger.append(triggerLabel, arrow);
      const submenu = document.createElement("div");
      submenu.className = "active-network-submenu";
      submenu.setAttribute("role", "menu");
      submenu.setAttribute("aria-label", label);
      submenu.hidden = true;
      if (scope === "tfe" || scope === "tfp") {
        appendTfeMenuSections(submenu, presets, (preset) => createActiveNetworkChoice(preset, false), scope,
          { sortable: true });
      } else presets.forEach((preset) => submenu.append(createActiveNetworkChoice(preset, false)));
      fanGroup.append(trigger, submenu);
      elements.activeNetworkMenu.append(fanGroup);
    });
  }
  elements.activeNetworkSelect.value = activeIsAvailable
    ? activePlan?.id ?? networkManager.activeId
    : "";
  elements.activeNetworkSelect.title = activeLabel;
}

function renderDisplaySelector() {
  if (!elements.displaySelect) return;
  const frettierIsActive = document.body.dataset.pageTab === "frettier";
  const summaryIsActive = document.body.dataset.pageTab === "summary";
  const modesAreActive = document.body.dataset.pageTab === "modes";
  const degreesAreAvailable = modesAreActive
    && state.catalog === "modes"
    && ["mode", "mode-network"].includes(state.graphView);
  let none = elements.displaySelect.querySelector('option[value="none"]');
  if (modesAreActive) {
    if (!none) {
      none = document.createElement("option");
      none.value = "none";
      none.textContent = "Aucun";
      elements.displaySelect.append(none);
    }
  } else {
    none?.remove();
  }
  let degrees = elements.displaySelect.querySelector('option[value="degrees"]');
  if (degreesAreAvailable) {
    if (!degrees) {
      degrees = document.createElement("option");
      degrees.value = "degrees";
      degrees.textContent = "Degrés";
      if (none && typeof elements.displaySelect.insertBefore === "function") {
        elements.displaySelect.insertBefore(degrees, none);
      } else {
        elements.displaySelect.append(degrees);
      }
    }
  } else {
    degrees?.remove();
    if (!summaryIsActive && state.displayMode === "degrees") setDisplayMode("heji");
  }
  if (!modesAreActive && !summaryIsActive && state.displayMode === "none") setDisplayMode("heji");
  let millimetres = elements.displaySelect.querySelector('option[value="width"]');
  if (frettierIsActive) {
    if (!millimetres) {
      millimetres = document.createElement("option");
      millimetres.value = "width";
      millimetres.textContent = "mm";
      elements.displaySelect.append(millimetres);
    }
  } else {
    millimetres?.remove();
  }
  let visual = elements.displaySelect.querySelector('option[value="visual"]');
  if (frettierIsActive && frettierUiState.fretboardType === "tfe") {
    if (!visual) {
      visual = document.createElement("option");
      visual.value = "visual";
      visual.textContent = "Visuel";
      elements.displaySelect.append(visual);
    }
  } else {
    visual?.remove();
  }
  elements.displaySelect.value = frettierIsActive
    ? frettierUiState.displayMode
    : summaryIsActive
    ? summaryDisplayMode()
    : selectedDisplayMode();
}

function renderDiscordanceButton(button, discordanceDisplay = "red") {
  if (!button) return;
  const labels = {red:"Discordances rouges",hidden:"Discordances masquées",colors:"Discordances affichées"};
  const value = labels[discordanceDisplay] ? discordanceDisplay : "red";
  button.dataset.state = value;
  button.setAttribute("aria-label", `Discordances : ${labels[value].replace("Discordances ", "")}`);
  button.title = labels[value];
}

function renderAnalysisControls() {
  const ready = typeof networkAnalysisUiState.matrixStepsAvailable === "boolean";
  elements.analysisToolbarSteps.disabled = !ready || !networkAnalysisUiState.matrixStepsAvailable;
  elements.analysisToolbarIntervals.disabled = !ready;
  elements.analysisToolbarDiscordances.disabled = !ready;
  elements.analysisToolbarSteps.setAttribute("aria-pressed", String(networkAnalysisUiState.matrixView === "steps"));
  elements.analysisToolbarIntervals.setAttribute("aria-pressed", String(networkAnalysisUiState.matrixView === "intervals"));
  renderDiscordanceButton(elements.analysisToolbarDiscordances, networkAnalysisUiState.discordanceDisplay);
}

function renderFrettierMinimumWidthPresets() {
  if (!elements.frettierMinimumWidthPresets) return;
  const selectedValue = frettierUiState.minimumFretWidthDraft.replace(",", ".").trim();
  elements.frettierMinimumWidthPresets
    .querySelectorAll("[data-minimum-fret-width-preset]")
    .forEach((button) => {
      if (!FRETTIER_MINIMUM_WIDTH_PRESETS.has(button.dataset.minimumFretWidthPreset)) return;
      const preset = frettierMinimumWidthPreset(button.dataset.minimumFretWidthPreset);
      if (!preset) return;
      button.dataset.minimumFretWidthValue = String(preset.value);
      button.title = `${button.dataset.minimumFretWidthPreset} (${preset.fretRatios.join(" → ")}) · ${String(preset.value).replace(".", ",")} mm`;
      button.setAttribute("aria-label", button.title);
      if (!button.querySelector(".minimum-fret-width-preset-frets")) {
        const frets = document.createElement("span");
        frets.className = "minimum-fret-width-preset-frets";
        frets.append(
          Object.assign(document.createElement("span"), { className: "ratio-punctuation", textContent: "(" }),
          createColorizedRatio(preset.fretRatios[0]),
          Object.assign(document.createElement("span"), { className: "ratio-punctuation", textContent: " → " }),
          createColorizedRatio(preset.fretRatios[1]),
          Object.assign(document.createElement("span"), { className: "ratio-punctuation", textContent: ")" }),
        );
        button.replaceChildren(
          createColorizedProportion(button.dataset.minimumFretWidthPreset),
          frets,
        );
      }
      button.setAttribute("aria-pressed", String(String(preset.value) === selectedValue));
    });
}

function renderFrettierControls() {
  const partial = frettierUiState.fretboardType === "tfp";
  elements.frettierTfeButton?.setAttribute("aria-pressed", String(!partial));
  elements.frettierTfpButton?.setAttribute("aria-pressed", String(partial));
  renderDiscordanceButton(elements.frettierDiscordanceButton, frettierUiState.discordanceDisplay);
  if (elements.frettierFlexibilityButton) elements.frettierFlexibilityButton.hidden = partial;
  elements.frettierFlexibilityButton?.setAttribute("aria-pressed", String(frettierUiState.showFlexibleOnly));
  // « Orphelines » (décision de Simon, 18 octobre 2026) : le mot se raye quand elles sont retirées,
  // comme Discordances. Critère inchangé : notes présentes dans une seule octave du manche.
  if (elements.frettierFlexibilityButton) {
    elements.frettierFlexibilityButton.title = frettierUiState.showFlexibleOnly
      ? "Orphelines retirées — cliquer pour les afficher"
      : "Orphelines : notes présentes dans une seule octave du manche — cliquer pour les retirer";
  }
  if (elements.frettierMinimumWidth && elements.frettierMinimumWidth.value !== frettierUiState.minimumFretWidthDraft) {
    elements.frettierMinimumWidth.value = frettierUiState.minimumFretWidthDraft;
  }
  renderFrettierMinimumWidthPresets();
  elements.frettierUndoButton.disabled = !frettierUiState.canUndo;
  elements.frettierRedoButton.disabled = !frettierUiState.canRedo;
}

function renderGlobalToolbar() {
  renderActiveNetworkSelector();
  renderDisplaySelector();
  renderAnalysisControls();
  renderFrettierControls();
  renderTopToolbar();
}

const TOP_TOOLBAR_STORAGE_KEY = "hn-top-toolbar-collapsed-v1";
const collapsedTopToolbars = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(TOP_TOOLBAR_STORAGE_KEY) || "{}");
    return {
      modes: saved?.modes === true, analysis: saved?.analysis === true,
      summary: saved?.summary === true, frettier: saved?.frettier === true,
    };
  } catch { return { modes: false, analysis: false, summary: false, frettier: false }; }
})();

function renderTopToolbar() {
  const tab = document.body.dataset.pageTab;
  // Lot 8 : la barre se replie dans les quatre onglets, avec la même commande au même endroit.
  const available = ["modes", "analysis", "summary", "frettier"].includes(tab);
  const button = document.querySelector("#top-toolbar-toggle");
  const toolbar = document.querySelector("#top-settings-toolbar");
  const navigation = document.querySelector("#top-navigation-toolbar");
  const bar = document.querySelector(".app-bar");
  if (!button || !toolbar || !navigation || !bar?.classList) return;
  const collapsed = available && collapsedTopToolbars[tab] === true;
  button.hidden = !available;
  toolbar.hidden = collapsed;
  toolbar.inert = collapsed;
  navigation.hidden = collapsed;
  navigation.inert = collapsed;
  bar.classList.toggle("is-settings-collapsed", collapsed);
  button.setAttribute("aria-expanded", String(!collapsed));
  const label = collapsed ? "Dérouler la barre de menu" : "Replier la barre de menu";
  button.setAttribute("aria-label", label);
  button.title = label;
  if (typeof positionModesSidebarToggle === "function") requestAnimationFrame(positionModesSidebarToggle);
}

// ---------- Plein écran (lot 8) ----------
function fullscreenElement() {
  return document.fullscreenElement ?? document.webkitFullscreenElement ?? null;
}

function renderFullscreenToggle() {
  const button = document.querySelector("#fullscreen-toggle");
  if (!button) return;
  const root = document.documentElement;
  const available = Boolean(
    (document.fullscreenEnabled || document.webkitFullscreenEnabled)
    && (root.requestFullscreen || root.webkitRequestFullscreen),
  );
  button.hidden = !available;
  const active = Boolean(fullscreenElement());
  button.setAttribute("aria-pressed", String(active));
  const label = active ? "Quitter le plein écran" : "Plein écran";
  button.setAttribute("aria-label", label);
  button.title = active ? `${label} (Échap)` : label;
}

async function toggleFullscreen() {
  const root = document.documentElement;
  try {
    if (fullscreenElement()) await (document.exitFullscreen ?? document.webkitExitFullscreen).call(document);
    else await (root.requestFullscreen ?? root.webkitRequestFullscreen).call(root);
  } catch {
    // Le navigateur a refusé : on laisse simplement l'affichage tel quel.
  }
  renderFullscreenToggle();
}

function toggleTopToolbar() {
  const tab = document.body.dataset.pageTab;
  if (!["modes", "analysis", "summary", "frettier"].includes(tab)) return;
  closeAllMenus();
  collapsedTopToolbars[tab] = !collapsedTopToolbars[tab];
  try { localStorage.setItem(TOP_TOOLBAR_STORAGE_KEY, JSON.stringify(collapsedTopToolbars)); } catch {}
  renderTopToolbar();
  document.querySelector("#top-toolbar-toggle")?.focus({ preventScroll: true });
  scheduleGraphFit();
  requestAnimationFrame(updateTableTonicMarker);
}

function syncFrettierGraphSystem() {
  const frame = document.querySelector("#frettier-frame");
  if (frame?.dataset.ready !== "true" || !frame.contentWindow) return;
  frame.contentWindow.postMessage(
    {
      type: "harmonie-naturelle-graph-system",
      graphSystem: state.graphSystem,
      simonAxis5Length: state.simonAxis5Length,
      simon1Axis5Length: state.simon1Axis5Length,
    },
    window.location.origin === "null" ? "*" : window.location.origin,
  );
}

function syncGraphOptions() {
  elements.graphSystem.value = state.graphSystem;
  const adjustable = state.graphSystem !== "grady";
  const normal = activeAxis5NormalLength();
  const current = activeAxis5Length();
  const unit = state.graphSystem === "grady" ? 40 : normal;
  if (typeof elements.graphCoordinateOutputs?.forEach === "function") {
    elements.graphCoordinateOutputs.forEach((output, prime) => {
      const [x, y] = latticeBasisForPrime(BigInt(prime));
      output.textContent = `(${Math.round(x * unit)}, ${Math.round(-y * unit)})`;
    });
  }
  elements.simonAxis5LengthOption.hidden = !adjustable;
  elements.simonAxis5LengthButtons.forEach((button, index) => {
    const length = index === 0 ? normal : normal + 3;
    button.setAttribute("data-simon-axis-5-length", String(length));
    button.textContent = `${index === 0 ? "Normale" : "Allongée"} (${length})`;
    button.setAttribute("aria-pressed", String(length === current));
    button.disabled = !adjustable;
  });
  elements.simonAxis5LengthButtons[0]?.parentElement?.setAttribute("aria-label",
    `Valeurs prédéfinies de la coordonnée y de l’axe 5 pour ${state.graphSystem === "simon1" ? "Simon Martin 1" : "Simon Martin 2"}`);
}

function normalizedOptionsConfiguration(value) {
  const source = value && typeof value === "object" ? value : {};
  const inRange = (candidate, min, max, fallback) => {
    const number = Number(candidate);
    return Number.isFinite(number) && number >= min && number <= max ? number : fallback;
  };
  return {
    graphSystem: ["simon", "simon1", "grady"].includes(source.graphSystem)
      ? source.graphSystem : FACTORY_OPTIONS.graphSystem,
    simonAxis5Length: parseSimonAxis5Length(source.simonAxis5Length)
      ?? FACTORY_OPTIONS.simonAxis5Length,
    simon1Axis5Length: parseSimonAxis5Length(source.simon1Axis5Length)
      ?? FACTORY_OPTIONS.simon1Axis5Length,
    graphView: ["mode", "mode-network", "tonics", "network"].includes(source.graphView)
      ? source.graphView : FACTORY_OPTIONS.graphView,
    displayMode: ["heji", "ratio", "heji-cents", "degrees", "none"].includes(source.displayMode)
      ? source.displayMode : FACTORY_OPTIONS.displayMode,
    modesSidebarCollapsed: source.modesSidebarCollapsed === true,
    showGraphPanel: source.showGraphPanel !== false,
    showTablePanel: source.showTablePanel !== false,
    showTableCents: source.showTableCents === true,
    tableShowModeName: source.tableShowModeName === true,
    tableFifthsAbove: normalizedTableFifths(source.tableFifthsAbove),
    tableFifthsBelow: normalizedTableFifths(source.tableFifthsBelow),
    tableShowChords: source.tableShowChords !== false,
    tableShowRatios: source.tableShowRatios !== false,
    tableShowTetrachords: source.tableShowTetrachords !== false,
    tableShowIntervals: source.tableShowIntervals !== false,
    connectionLevel: Number.isInteger(source.connectionLevel)
      ? inRange(source.connectionLevel, 1, 2, FACTORY_OPTIONS.connectionLevel)
      : FACTORY_OPTIONS.connectionLevel,
    connectionLevelManual: source.connectionLevelManual === true,
    textSize: inRange(source.textSize, 0.5, 4, FACTORY_OPTIONS.textSize),
    textOffset: inRange(source.textOffset, 0, 6, FACTORY_OPTIONS.textOffset),
    targetedLabelMask: source.targetedLabelMask === true,
    audioInstrument: normalizedAudioInstrument(source.audioInstrument) ?? FACTORY_OPTIONS.audioInstrument,
    audioSettings: normalizedAudioSettings(source.audioSettings),
    audioOctave: [-1, 0, 1].includes(source.audioOctave)
      ? source.audioOctave : FACTORY_OPTIONS.audioOctave,
    audioVolume: Math.round(inRange(source.audioVolume, 0, 100, FACTORY_OPTIONS.audioVolume)),
    audioMuted: source.audioMuted === true,
    audioMouseMode: source.audioMouseMode === "mono" ? "mono" : "poly",
  };
}

function currentOptionsConfiguration() {
  return Object.fromEntries(Object.keys(FACTORY_OPTIONS).map((key) => [key, state[key]]));
}

function persistLatestOptions() {
  if (!optionsPersistenceReady) return;
  const serialized = JSON.stringify(currentOptionsConfiguration());
  if (serialized === lastPersistedOptions) return;
  try {
    window.localStorage.setItem(OPTIONS_LATEST_STORAGE_KEY, serialized);
    lastPersistedOptions = serialized;
  } catch {
    // Storage may be unavailable; current settings remain usable for this visit.
  }
}

function setOptionsDefaultStatus(message = "") {
  if (elements.optionsDefaultStatus) elements.optionsDefaultStatus.textContent = message;
  persistLatestOptions();
}

function applyOptionsConfiguration(value, { renderNow = true } = {}) {
  const next = normalizedOptionsConfiguration(value);
  if (renderNow) stopAllSounds();
  Object.assign(state, next);
  state.audioVolumeBeforeMute = next.audioVolume > 0 ? next.audioVolume : 100;
  elements.textSize.value = String(next.textSize);
  elements.textOffset.value = String(next.textOffset);
  elements.targetedLabelMask.checked = next.targetedLabelMask;
  elements.audioVolume.value = String(next.audioVolume);
  elements.audioInstrument.value = next.audioInstrument;
  updateAudioOutputGain({ immediate: true });
  applyAudioSettings({ immediate: true });
  refreshAudioSettingsPanel();
  if (renderNow) {
    render();
    scheduleNetworkPreview();
    syncFrettierGraphSystem();
    updateLiveTargetedLabelMasks();
    scheduleSummaryTargetedLabelMasks();
  }
}

function setGraphSystem(graphSystem) {
  const next = graphSystem === "grady" || graphSystem === "simon1" ? graphSystem : "simon";
  if (state.graphSystem === next) {
    syncGraphOptions();
    return;
  }
  state.graphSystem = next;
  syncGraphOptions();
  setOptionsDefaultStatus();
  render();
  scheduleNetworkPreview();
  syncFrettierGraphSystem();
}

function setSimonAxis5Length(length) {
  const next = parseSimonAxis5Length(length);
  if (next === null) return false;
  if (state.simonAxis5Length === next) {
    syncGraphOptions();
    return true;
  }
  state.simonAxis5Length = next;
  syncGraphOptions();
  setOptionsDefaultStatus();
  render();
  scheduleNetworkPreview();
  syncFrettierGraphSystem();
  return true;
}

function setSimon1Axis5Length(length) {
  const next = parseSimonAxis5Length(length);
  if (next === null) return false;
  if (state.simon1Axis5Length === next) {
    syncGraphOptions();
    return true;
  }
  state.simon1Axis5Length = next;
  syncGraphOptions();
  setOptionsDefaultStatus();
  render();
  scheduleNetworkPreview();
  syncFrettierGraphSystem();
  return true;
}

function setActiveAxis5Length(length) {
  return state.graphSystem === "simon1"
    ? setSimon1Axis5Length(length) : setSimonAxis5Length(length);
}

function setTargetedLabelMask(enabled) {
  const next = Boolean(enabled);
  if (state.targetedLabelMask === next) return;
  state.targetedLabelMask = next;
  elements.targetedLabelMask.checked = next;
  setOptionsDefaultStatus();
  updateLiveTargetedLabelMasks();
  scheduleSummaryTargetedLabelMasks();
}

function syncFrettierNetwork() {
  const frame = document.querySelector("#frettier-frame");
  if (frame?.dataset.ready !== "true" || !frame.contentWindow) return;
  if (frettierUiState.fretboardType === "tfe" && frettierUiState.fretPlanId) {
    const signature = `fret-plan:${frettierUiState.fretPlanId}`;
    if (signature === frame.dataset.networkSignature) return;
    frame.contentWindow.postMessage(
      { type: "harmonie:fretboard-plan", id: frettierUiState.fretPlanId },
      window.location.origin === "null" ? "*" : window.location.origin,
    );
    frame.dataset.networkSignature = signature;
    renderActiveNetworkSelector();
    return;
  }
  if (frettierUiState.fretboardType === "tfe"
    && appliedNetworkConfiguration.savedFrettierSnapshot?.kind === "tfe") {
    const saved = appliedNetworkConfiguration;
    const signature = JSON.stringify([saved.id, saved.savedFrettierSnapshot]);
    if (signature === frame.dataset.networkSignature) return;
    frame.contentWindow.postMessage(
      { type: "harmonie:fretboard-saved", id: saved.id, snapshot: saved.savedFrettierSnapshot },
      window.location.origin === "null" ? "*" : window.location.origin,
    );
    frame.dataset.networkSignature = signature;
    renderActiveNetworkSelector();
    return;
  }
  if (frettierUiState.fretboardType === "tfe"
    && tfeFretPlanPreset(appliedNetworkConfiguration.abstractFretPlanId)) {
    const planId = appliedNetworkConfiguration.abstractFretPlanId;
    const signature = `abstract-fret-plan:${appliedNetworkConfiguration.id}:${planId}`;
    if (signature === frame.dataset.networkSignature) return;
    frame.contentWindow.postMessage(
      { type: "harmonie:fretboard-plan", id: planId },
      window.location.origin === "null" ? "*" : window.location.origin,
    );
    frame.dataset.networkSignature = signature;
    renderActiveNetworkSelector();
    return;
  }
  if (!fretboardNetworkIsCompatible()) {
    const signature = `unavailable:${frettierUiState.fretboardType}:${appliedNetworkConfiguration.id}`;
    if (signature === frame.dataset.networkSignature) return;
    frame.contentWindow.postMessage(
      { type: "harmonie:fretboard-network-unavailable",
        message: frettierUiState.fretboardType === "tfp" && appliedNetworkConfiguration.scope === "tfp"
          ? "Entrer un système valide."
          : "Sélectionner un réseau compatible." },
      window.location.origin === "null" ? "*" : window.location.origin,
    );
    frame.dataset.networkSignature = signature;
    renderActiveNetworkSelector();
    return;
  }
  const fullNetwork = networkAnalysisData();
  const tfpScordatura = frettierUiState.fretboardType === "tfp"
    ? tfpScordaturaForNetwork(appliedNetworkConfiguration)
    : null;
  const network = {
    id: fullNetwork.id,
    name: fullNetwork.name,
    fretboardType: frettierUiState.fretboardType,
    ratios: fullNetwork.ratios,
    referenceRatioToA: fullNetwork.referenceRatioToA,
    sourceMethod: fullNetwork.sourceMethod,
    ...(tfpScordatura ? {
      tfpScordaturaId: tfpScordatura.id,
      tfpScordaturaLabel: tfpScordatura.label,
      tfpOpenStringRatios: tfpScordatura.openStringRatios,
    } : {}),
  };
  const signature = JSON.stringify(network);
  if (signature === frame.dataset.networkSignature) return;
  frame.contentWindow.postMessage(
    { type: "harmonie:fretboard-network", network },
    window.location.origin === "null" ? "*" : window.location.origin,
  );
  frame.dataset.networkSignature = signature;
}

/** Indique au Frettier les cases qui sonnent (clic) et les hauteurs jouées au clavier. */
function syncFrettierSounding() {
  const frame = document.querySelector("#frettier-frame");
  if (frame?.dataset.ready !== "true" || !frame.contentWindow) return;
  const cells = [...audioEngine.latchedVoices.values()].map((voice) => voice.frettierCell).filter(Boolean);
  // Hauteur réelle de chaque note jouée au clavier, ramenée à la touche (sans le réglage Oct.) :
  // seules les cases de cette octave s'allument.
  const multipliers = [...audioEngine.keyboardVoices.values()]
    .map((voice) => voice.frequency / configuredAudioReferenceA3Hz / (2 ** state.audioOctave));
  // Hauteur réelle des cases cliquées : leurs autres positions sur la touche sont encadrées.
  const clicked = [...audioEngine.latchedVoices.values()].filter((voice) => voice.frettierCell)
    .map((voice) => voice.frequency / configuredAudioReferenceA3Hz / (2 ** state.audioOctave));
  const signature = JSON.stringify([cells, multipliers.map((value) => value.toFixed(6)), clicked.map((value) => value.toFixed(6))]);
  if (frame.dataset.soundingSignature === signature) return;
  frame.dataset.soundingSignature = signature;
  frame.contentWindow.postMessage(
    { type: "harmonie:frettier-sounding", cells, multipliers, clicked },
    window.location.origin === "null" ? "*" : window.location.origin,
  );
}

function sendFrettierCommand(command, value) {
  const frame = document.querySelector("#frettier-frame");
  if (frame?.dataset.ready !== "true" || !frame.contentWindow) return;
  frame.contentWindow.postMessage(
    { type: "harmonie:frettier-command", command, value },
    window.location.origin === "null" ? "*" : window.location.origin,
  );
}

function preferredFretboardNetwork(type) {
  const preferredId = networkManager.lastActiveIdsByScope[type];
  const candidates = [
    networkManager.presets.find((preset) => preset.id === preferredId),
    ...networkManager.presets,
  ].filter(Boolean);
  return candidates.find((preset, index) => (
    candidates.findIndex((candidate) => candidate.id === preset.id) === index
    && fretboardNetworkIsCompatible(preset, type)
  )) ?? null;
}

function switchFretboardType(type) {
  if (!["tfe", "tfp"].includes(type)) return;
  if (!elements.networkConfigDrawer.hidden) {
    if (networkDraftIsDirty()) return;
    closeNetworkConfigurator({ restoreFocus: false });
  }
  const active = activeNetworkPreset();
  const activeIsCompatible = fretboardNetworkIsCompatible(active, type);
  if (frettierUiState.fretboardType === type && activeIsCompatible) return;
  frettierUiState.fretboardType = type;
  if (type === "tfp") frettierUiState.fretPlanId = null;
  if (type === "tfp") frettierUiState.showFlexibleOnly = false;
  if (type === "tfp" && frettierUiState.displayMode === "visual") frettierUiState.displayMode = "heji";
  const frame = document.querySelector("#frettier-frame");
  if (frame) delete frame.dataset.networkSignature;
  sendFrettierCommand("set-type", type);
  const preferredNetwork = activeIsCompatible ? active : preferredFretboardNetwork(type);
  if (preferredNetwork && preferredNetwork.id !== active.id && elements.networkConfigDrawer.hidden) {
    activateNetworkPreset(preferredNetwork.id, { confirmed: true });
    return;
  }
  renderGlobalToolbar();
  syncFrettierNetwork();
}

function adoptActiveTouchNetworkForFrettier({ allowFallback = true } = {}) {
  const active = activeNetworkPreset();
  if (!["tfe", "tfp"].includes(active.scope) || !fretboardNetworkIsCompatible(active, active.scope)) {
    // Arrivée depuis un réseau général (16 octobre 2026) : le Frettier ouvre la dernière touche
    // utilisée du type courant, comme la bascule TFE/TFP, plutôt qu'une page vide.
    if (!allowFallback || !elements.networkConfigDrawer.hidden) return;
    const type = frettierUiState.fretboardType === "tfp" ? "tfp" : "tfe";
    const preferred = preferredFretboardNetwork(type) ?? preferredFretboardNetwork(type === "tfe" ? "tfp" : "tfe");
    if (!preferred || preferred.id === active.id) return;
    activateNetworkPreset(preferred.id, { confirmed: true });
    adoptActiveTouchNetworkForFrettier({ allowFallback: false });
    return;
  }
  const typeChanged = frettierUiState.fretboardType !== active.scope;
  frettierUiState.fretboardType = active.scope;
  if (active.scope === "tfp") frettierUiState.showFlexibleOnly = false;
  if (active.scope === "tfp" && frettierUiState.displayMode === "visual") frettierUiState.displayMode = "heji";
  const frame = document.querySelector("#frettier-frame");
  if (frame) delete frame.dataset.networkSignature;
  if (typeChanged) sendFrettierCommand("set-type", active.scope);
}

function networkRatioLines(configuration) {
  const ratios = fullNetworkPitchRatios(configuration)
    .map((pitch) => divideAndReduce(pitch, configuration.generatorRatio))
    .filter(Boolean)
    .filter((ratio) => ratio !== "1/1" && ratio !== "2/1")
    .sort((first, second) => ratioCents(first) - ratioCents(second));
  return [...new Set([...ratios, "2/1"])];
}

function currentNetworkRatioLines() {
  return networkRatioLines(appliedNetworkConfiguration);
}

function restoreModesAtNetworkReference() {
  stopAllSounds();
  discardModulationPreview();
  clearModeOriginContext();
  clearIntervalTransitionContexts();
  resetSelectionToNetworkHome(activeNetworkPreset());
  populateSelectionMenu();
  render();
}

function setCatalogOverviewState(catalog) {
  state.catalog = catalog;
  state.intervalAnchorTonic = state.selectedTonic;
  state.intervalSelection = catalog === "intervalles" ? ALL_SELECTION_ID : "";
  state.tetrachordSelection = catalog === "tetracordes" ? ALL_SELECTION_ID : "";
  state.tetrachordModeContext = null;
  state.selectedChordName = catalog === "accords" ? ALL_SELECTION_ID : "";
  state.selectedModeId = catalog === "modes" ? ALL_SELECTION_ID : "";
  state.selectedVariantIndex = 0;
}

function restoreModesFromNetworkAnalysis() {
  if (
    networkAnalysisUiState.networkId !== appliedNetworkConfiguration.id
    || !networkAnalysisStateCanRestoreModes
  ) {
    restoreModesAtNetworkReference();
    return;
  }
  const catalog = networkAnalysisUiState.catalog;
  if (!["intervalles", "tetracordes", "accords", "modes"].includes(catalog)) return;
  stopAllSounds();
  discardModulationPreview();
  clearModeOriginContext();
  clearIntervalTransitionContexts();
  const contextualTonic = networkAnalysisUiState.tonic === "all"
    ? activeNetworkPreset().generatorRatio
    : multiplyAndReduce(appliedNetworkConfiguration.generatorRatio, networkAnalysisUiState.tonic);
  const tonic = contextualTonic && TONIC_RATIO_SET.has(contextualTonic)
    ? contextualTonic
    : TONIC_RATIOS[0] ?? null;
  state.selectedTonic = tonic;
  state.selectedFamily = tonic ? TONIC_FAMILY_BY_RATIO.get(tonic) : null;
  state.intervalAnchorTonic = tonic;
  const selection = networkAnalysisUiState.selection;
  if (!selection || selection === ALL_SELECTION_ID) {
    setCatalogOverviewState(catalog);
  } else if (catalog === "intervalles") {
    state.catalog = catalog;
    state.intervalAnchorTonic = state.selectedTonic;
    const entryId = selection.replace(/^interval:/, "");
    state.intervalSelection = intervalIsAvailable(entryId, state.selectedTonic) ? entryId : ALL_SELECTION_ID;
    state.tetrachordSelection = "";
    state.selectedChordName = "";
    state.selectedModeId = "";
  } else if (catalog === "tetracordes") {
    state.catalog = catalog;
    const code = selection.replace(/^tetra:/, "");
    const context = tetrachordContextCandidates(code, state.selectedTonic)[0] ?? null;
    state.tetrachordSelection = context ? code : ALL_SELECTION_ID;
    state.tetrachordModeContext = context ? serializeTetrachordContext(context) : null;
    state.intervalSelection = "";
    state.selectedChordName = "";
    state.selectedModeId = "";
  } else if (catalog === "accords") {
    state.catalog = catalog;
    const match = selection.match(/^chord:(.*):(\d+)$/);
    const chordName = match?.[1] ?? "";
    const variantIndex = Number(match?.[2]);
    const available = chordData.chords[chordName] ? availableChordVariantIndices(chordData.chords[chordName], chordName) : [];
    state.selectedChordName = available.includes(variantIndex) ? chordName : ALL_SELECTION_ID;
    state.selectedVariantIndex = available.includes(variantIndex) ? variantIndex : 0;
    state.intervalSelection = "";
    state.tetrachordSelection = "";
    state.selectedModeId = "";
  } else {
    state.catalog = catalog;
    const modeId = selection.replace(/^mode:/, "");
    const requestedMode = MODE_PRESETS.find((mode) => mode.id === modeId);
    const mode = requestedMode
      ? resolvedModeSelectionForTonic(state.selectedTonic, modeId, requestedMode.label)
      : null;
    state.selectedModeId = mode?.id ?? ALL_SELECTION_ID;
    state.intervalSelection = "";
    state.tetrachordSelection = "";
    state.selectedChordName = "";
  }
  closeAllMenus();
  populateSelectionMenu();
  render();
}

function standaloneFrettierHtml({ analysis = false } = {}) {
  const encoded = document.querySelector("#frettier-frame")?.dataset.standaloneFrettier;
  if (!encoded) return "";
  const html = new TextDecoder().decode(
    Uint8Array.from(atob(encoded), (char) => char.charCodeAt(0)),
  );
  if (!analysis || html.includes('data-network-analysis="true"')) return html;
  return html.replace(/<html(?=[\s>])/, '<html data-network-analysis="true"');
}

function selectPageTab(tab) {
  if (!PAGE_TABS.includes(tab)) return;
  const previousTab = document.body.dataset.pageTab;
  if (tab !== "modes" && modulationColumnWindow.expanded) {
    setModulationExpanded(false, { restoreFocus: false });
  }
  closeAllMenus();
  stopKeyboardSounds();
  document.body.dataset.pageTab = tab;
  try {
    const target = window.parent !== window ? window.parent : window;
    const url = new URL(target.location.href);
    url.searchParams.set("onglet", tab);
    target.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  } catch {
    // The tab still works when an embedding context does not expose its history.
  }
  document.querySelector("#modes-page-panel").hidden = tab !== "modes";
  document.querySelector("#network-analysis-panel").hidden = tab !== "analysis";
  document.querySelector("#network-summary-panel").hidden = tab !== "summary";
  document.querySelector("#frettier-panel").hidden = tab !== "frettier";
  document.querySelectorAll("[data-page-tab]").forEach((button) => {
    const active = button.dataset.pageTab === tab;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  // Seulement en quittant le Frettier (lot 9); une touche sans scordatura choisie dans un autre onglet y reste,
  // avec son message (19 octobre 2026).
  if (previousTab === "frettier" && tab !== "frettier") leaveFretPositionTemplateNetwork();
  if (previousTab === "frettier" && tab === "modes") restoreModesAtNetworkReference();
  else if (previousTab === "analysis" && tab === "modes") restoreModesFromNetworkAnalysis();
  if (tab === "frettier") adoptActiveTouchNetworkForFrettier();
  renderGlobalToolbar();
  if (tab === "analysis") {
    const frame = document.querySelector("#network-analysis-frame");
    if (!frame.dataset.loaded) {
      frame.dataset.loaded = "true";
      const standaloneHtml = standaloneFrettierHtml({ analysis: true });
      if (standaloneHtml) frame.srcdoc = standaloneHtml;
      else frame.src = frame.dataset.src;
    }
    syncNetworkAnalysis();
  } else if (tab === "summary") {
    renderNetworkSummaryDocument();
  } else if (tab === "frettier") {
    const frame = document.querySelector("#frettier-frame");
    if (!frame.dataset.loaded) {
      frame.dataset.loaded = "true";
      const standaloneHtml = standaloneFrettierHtml();
      if (standaloneHtml) frame.srcdoc = standaloneHtml;
      else frame.src = frame.dataset.src;
    }
    syncFrettierNetwork();
  } else {
    if (elements.modesSidebarToggle) renderModesSidebar();
    scheduleGraphFit();
  }
}

function handleNetworkAnalysisMessage(event) {
  if (event.origin !== window.location.origin) return;
  const frame = document.querySelector("#network-analysis-frame");
  if (frame?.contentWindow && event.source === frame.contentWindow) {
    if (event.data?.type === "harmonie:analysis-ready") {
      frame.dataset.ready = "true";
      delete frame.dataset.networkSignature;
      syncNetworkAnalysis();
    } else if (event.data?.type === "harmonie:analysis-state") {
      const reportedNetworkId = typeof event.data.networkId === "string" ? event.data.networkId : "";
      const reportedNetworkIdentity = typeof event.data.networkIdentity === "string"
        ? event.data.networkIdentity
        : "";
      const currentNetworkIdentity = networkAnalysisIdentity(networkAnalysisData());
      if (
        networkAnalysisUiState.networkId !== appliedNetworkConfiguration.id
        || reportedNetworkId !== appliedNetworkConfiguration.id
        || networkAnalysisUiState.networkIdentity !== currentNetworkIdentity
        || reportedNetworkIdentity !== currentNetworkIdentity
      ) return;
      if (
        pendingNetworkAnalysisStateNetworkId === appliedNetworkConfiguration.id
        && pendingNetworkAnalysisStateIdentity === currentNetworkIdentity
      ) {
        if (!isInitialNetworkAnalysisStateMessage(event.data)) return;
        pendingNetworkAnalysisStateNetworkId = "";
        pendingNetworkAnalysisStateIdentity = "";
      } else if (!isInitialNetworkAnalysisStateMessage(event.data)) {
        networkAnalysisStateCanRestoreModes = true;
      }
      if (["all", ...networkAnalysisData().ratios].includes(event.data.tonic)) networkAnalysisUiState.tonic = event.data.tonic;
      if (["intervalles", "tetracordes", "accords", "modes"].includes(event.data.catalog)) networkAnalysisUiState.catalog = event.data.catalog;
      if (typeof event.data.selection === "string") networkAnalysisUiState.selection = event.data.selection;
      if (["steps", "intervals"].includes(event.data.matrixView)) networkAnalysisUiState.matrixView = event.data.matrixView;
      if (typeof event.data.matrixStepsAvailable === "boolean") networkAnalysisUiState.matrixStepsAvailable = event.data.matrixStepsAvailable;
      if (["red", "hidden", "colors"].includes(event.data.discordanceDisplay)) networkAnalysisUiState.discordanceDisplay = event.data.discordanceDisplay;
      if (["model", "ratios"].includes(event.data.active)) networkAnalysisUiState.active = event.data.active;
      if (["all", "none", "selection"].includes(event.data.ratioFilterMode)) networkAnalysisUiState.ratioFilterMode = event.data.ratioFilterMode;
      if (Array.isArray(event.data.custom)) networkAnalysisUiState.custom = event.data.custom;
      renderAnalysisControls();
    } else if (event.data?.type === "harmonie:analysis-interaction") {
      if (!elements.networkConfigDrawer.hidden) closeNetworkConfigurator({ restoreFocus: false });
    }
    return;
  }

  const frettierFrame = document.querySelector("#frettier-frame");
  if (!frettierFrame?.contentWindow || event.source !== frettierFrame.contentWindow) return;
  if (event.data?.type === "harmonie:frettier-ready") {
    frettierFrame.dataset.ready = "true";
    delete frettierFrame.dataset.networkSignature;
    delete frettierFrame.dataset.soundingSignature;
    syncFrettierGraphSystem();
    syncFrettierNetwork();
  } else if (event.data?.type === "harmonie:frettier-state") {
    const reportedType = ["tfe", "tfp"].includes(event.data.fretboardType)
      ? event.data.fretboardType
      : null;
    const active = activeNetworkPreset();
    const activeNetworkType = ["tfe", "tfp"].includes(active?.scope)
      && fretboardNetworkIsCompatible(active, active.scope)
      ? active.scope
      : null;
    // The selected touch network is authoritative while the embedded fretboard
    // boots. Its first state message can still contain the iframe's TFE default;
    // accepting that transient value would immediately invalidate an active TFP
    // network and leave the fretboard blank.
    frettierUiState.fretboardType = activeNetworkType ?? reportedType ?? frettierUiState.fretboardType;
    if (["ratio", "heji", "heji-cents", "width", "visual"].includes(event.data.displayMode)) frettierUiState.displayMode = event.data.displayMode;
    if (["red", "hidden", "colors"].includes(event.data.discordanceDisplay)) frettierUiState.discordanceDisplay = event.data.discordanceDisplay;
    frettierUiState.showFlexibleOnly = Boolean(event.data.showFlexibleOnly);
    frettierUiState.minimumFretWidthDraft = typeof event.data.minimumFretWidthDraft === "string"
      ? event.data.minimumFretWidthDraft : frettierUiState.minimumFretWidthDraft;
    frettierUiState.canUndo = event.data.canUndo === true;
    frettierUiState.canRedo = event.data.canRedo === true;
    frettierUiState.frets = Array.isArray(event.data.frets) ? event.data.frets.filter((ratio) => typeof ratio === "string") : [];
    renderGlobalToolbar();
    if (activeNetworkType && reportedType && reportedType !== activeNetworkType) {
      delete frettierFrame.dataset.networkSignature;
      sendFrettierCommand("set-type", activeNetworkType);
      syncFrettierNetwork();
    }
  } else if (event.data?.type === "harmonie:frettier-scordaturas" && Array.isArray(event.data.presets)) {
    // D3 : préréglages des cordes à vide, pour la fenêtre de choix des touches TFE.
    touchPickerScordaturas = event.data.presets.filter((preset) => typeof preset?.id === "string"
      && Array.isArray(preset.strings) && preset.strings.length === 6);
  } else if (event.data?.type === "harmonie:frettier-snapshot") {
    const snapshot = event.data.snapshot;
    if (snapshot?.kind === "tfe" && Array.isArray(snapshot.mainFrets)
      && Array.isArray(snapshot.allFrets) && Array.isArray(snapshot.strings)) {
      frettierUiState.savedSnapshot = snapshot;
      frettierUiState.snapshotContextId = typeof event.data.networkId === "string" ? event.data.networkId : null;
      renderActiveNetworkSelector();
    }
  } else if (event.data?.type === "harmonie:frettier-play") {
    toggleFrettierCellSound(event.data);
  } else if (event.data?.type === "harmonie:frettier-scale") {
    audioEngine.frettierScale = Array.isArray(event.data.scale)
      ? event.data.scale.filter((entry) => typeof entry?.value === "string"
        && Number.isFinite(entry.multiplier) && entry.multiplier > 0)
      : [];
    audioEngine.frettierScaleStart = Number.isInteger(event.data.start)
      ? Math.min(Math.max(event.data.start, 0), Math.max(audioEngine.frettierScale.length - 1, 0)) : 0;
  } else if (event.data?.type === "harmonie:frettier-key") {
    if (typeof event.data.code !== "string") return;
    if (event.data.down) handleFrettierKeyboard({ code: event.data.code, repeat: event.data.repeat === true });
    else releasePressedKeyVoice(event.data.code);
  } else if (event.data?.type === "harmonie:frettier-key-reset") {
    stopKeyboardSounds();
  } else if (event.data?.type === "harmonie:frettier-interaction" && !elements.networkConfigDrawer.hidden) {
    closeNetworkConfigurator({ restoreFocus: false });
  } else if (event.data?.type === "harmonie:activate-fretboard-preset") {
    const presetId = {
      "limit-5": "touche-l5-defaut",
      "limit-7": "touche-l7-defaut",
      "limit-11": "touche-l11-defaut",
      "limit-13": "touche-l13-defaut",
    }[event.data.preset];
    if (presetId) activateNetworkPreset(presetId);
  } else if (event.data?.type === "harmonie:open-network-config") {
    const seedRatios = Array.isArray(event.data.ratios)
      && event.data.ratios.length === 12
      && event.data.ratios.every((ratio) => typeof ratio === "string" && /^\d+\s*\/\s*\d+$/.test(ratio))
      ? event.data.ratios
      : currentNetworkRatioLines();
    const partial = event.data.context === "tfp";
    openNetworkConfigurator({ context: {
      source: partial ? "frettier-tfp" : "frettier-tfe",
      ratiosOnly: true,
      expectedPitchCount: 12,
      seedRatios,
    } });
  }
}

function closeNetworkOnOutsideClick(event) {
  const eventPath = typeof event.composedPath === "function" ? event.composedPath() : [];
  const insideDrawer = eventPath.includes(elements.networkConfigDrawer)
    || elements.networkConfigDrawer.contains(event.target);
  const onConfigureButton = eventPath.includes(elements.networkConfigureButton)
    || elements.networkConfigureButton.contains(event.target);
  // D8 : la fenêtre de choix des touches, ouverte depuis le panneau, passe par-dessus sans le fermer.
  const insidePicker = typeof touchPicker !== "undefined" && touchPicker.element
    && (eventPath.includes(touchPicker.element) || touchPicker.element.contains(event.target));
  if (!elements.networkConfigDrawer.hidden
    && !insideDrawer
    && !insidePicker
    && !onConfigureButton) {
    closeNetworkConfigurator({ restoreFocus: false });
  }
}

function persistNetworkDraft() {
  if (!networkManager.draft) return false;
  if (networkManager.draft.savedFrettierSnapshot) {
    renderNetworkConfigurator("Modifie la touche dans Frettier, puis utilise Sauvegarder.");
    return false;
  }
  if (networkConfiguratorMethod === "scala" && networkManager.draft.sourceMethod !== "scala") {
    elements.networkScalaStatus.textContent = "Validez d'abord la liste de hauteurs avant d'enregistrer ce réseau.";
    elements.networkScalaInput.focus();
    return false;
  }
  let draft;
  try {
    const contextScope = networkScopeForSource();
    const targetScope = contextScope === "global"
      ? networkManager.draft.scope ?? "global"
      : contextScope;
    const candidate = normalizeNetworkConfiguration({
      ...networkManager.draft,
      name: networkNameForScope(elements.networkNameInput.value, targetScope),
      scope: targetScope,
    }, networkManager.draft.id);
    validateNetworkConfiguratorData(candidate);
    draft = candidate;
  }
  catch (error) { reportNetworkDataError(error); return false; }
  const existingIndex = networkManager.presets.findIndex((preset) => preset.id === draft.id);
  const switchesNetwork = networkManager.activeId !== draft.id;
  if (existingIndex >= 0) networkManager.presets.splice(existingIndex, 1, draft);
  else networkManager.presets.push(draft);
  networkManager.activeId = draft.id;
  networkManager.lastActiveIdsByScope[draft.scope] = draft.id;
  networkManager.isNewDraft = false;
  networkManager.draft = cloneNetworkConfiguration(draft);
  networkMethodLocked = true;
  applyNetworkConfiguration(draft, { resetSelection: switchesNetwork });
  saveNetworkStore();
  networkRenaming = false;
  networkOpeningSnapshot = networkDraftSnapshot();
  networkDraftHistory.undo.length = 0;
  networkDraftHistory.redo.length = 0;
  elements.networkScalaInput.setAttribute("aria-invalid", "false");
  elements.networkScalaStatus.textContent = "";
  renderNetworkConfigurator("Réseau enregistré et appliqué.");
  return true;
}

function commitNetworkDraftAndContinue(afterSave = () => closeNetworkConfigurator()) {
  if (!networkManager.draft || !previewNetworkDraft()) return;
  const continuation = networkCommitAfterSave ?? afterSave;
  const existing = networkManager.presets.find((preset) => preset.id === networkManager.draft.id);
  if (existing && networkDraftIsDirty()) {
    networkCommitAfterSave = continuation;
    elements.networkUpdateTitle.textContent = `Modifier le réseau « ${existing.name} » ?`;
    elements.networkUpdateDialog.showModal();
    return;
  }
  if (!persistNetworkDraft()) return;
  networkCommitAfterSave = null;
  continuation();
}

function activateNetworkPreset(presetId, { confirmed = false } = {}) {
  const fretPlan = tfeFretPlanPreset(presetId);
  if (fretPlan) {
    if (document.body.dataset.pageTab !== "frettier" || frettierUiState.fretboardType !== "tfe") return;
    frettierUiState.fretPlanId = fretPlan.id;
    const frame = document.querySelector("#frettier-frame");
    if (frame) delete frame.dataset.networkSignature;
    renderGlobalToolbar();
    syncFrettierNetwork();
    return;
  }
  const preset = networkManager.presets.find((candidate) => candidate.id === presetId);
  if (!preset || (!elements.networkConfigDrawer.hidden && !networkVisibleInConfigurator(preset))) return;
  if (!confirmed && !elements.networkConfigDrawer.hidden && networkDraftIsDirty()) {
    renderNetworkPresetSelector();
    guardNetworkDraft(() => activateNetworkPreset(presetId, { confirmed: true }));
    return;
  }
  networkManager.activeId = preset.id;
  frettierUiState.fretPlanId = null;
  networkManager.lastActiveIdsByScope[preset.scope] = preset.id;
  elements.networkScalaInput.setAttribute("aria-invalid", "false");
  elements.networkScalaStatus.textContent = "";
  saveNetworkStore();
  applyNetworkConfiguration(preset, { resetSelection: true });
  networkManager.draft = elements.networkConfigDrawer.hidden ? null : cloneNetworkConfiguration(preset);
  networkManager.isNewDraft = false;
  networkRenaming = false;
  networkMethodLocked = true;
  networkDraftHistory.undo.length = 0;
  networkDraftHistory.redo.length = 0;
  networkEditingField = null;
  if (networkManager.draft) {
    networkConfiguratorMethod = networkManager.draft.sourceMethod === "scala" ? "scala" : "configure";
    networkOpeningSnapshot = networkDraftSnapshot();
  }
  renderNetworkPresetSelector();
  if (networkManager.draft) renderNetworkConfigurator();
}

function lowestModeVariant(variants) {
  return variants.find((mode) => DEFAULT_MODE_VARIANT_LABELS.has(mode.label))
    ?? variants.slice().sort(compareModeVariants)[0];
}

function modeVariantFlavorPriority(mode) {
  const label = modeSpecificLabel(mode);
  if (/sm\b/.test(label)) return 0;
  if (/m\b/.test(label)) return 1;
  return 0;
}

function compareModeVariants(first, second) {
  return modeLimitNumber(first) - modeLimitNumber(second)
    || modeVariantFlavorPriority(first) - modeVariantFlavorPriority(second);
}

function selectionTriggerLabels() {
  const catalogLabel = {
    accords: "Accords",
    intervalles: "Intervalles",
    modes: "Modes",
    tetracordes: "Tétracordes",
  }[state.catalog] ?? "";
  const common = ["Tout", catalogLabel];
  if (state.catalog === "intervalles") {
    return common.concat(availableIntervalEntries().map((entry) => `${entry.proportion} · ${entry.intervalName}`));
  }
  if (state.catalog === "tetracordes") {
    return common.concat(availableTetrachordEntries().map((entry) => entry.ratios.join(" ")));
  }
  if (state.catalog === "accords") {
    return common.concat([...new Set(
      [...elements.modeMenuPopover.querySelectorAll("[data-chord-name]")]
        .map((button) => chordDisplayName(button.dataset.chordName)),
    )]);
  }
  return common.concat(availableModeFamilies(modesAvailableForCurrentFamily())
    .map(({ family, variants }) => (
      variants[0] ? modeFamilyTriggerLabel(variants[0]) : formatModeLabel(family.label)
    )));
}

function fitSelectionMenuTypography() {
  const button = elements.modeMenuButton;
  if (!button || typeof getComputedStyle !== "function") return;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;
  const style = getComputedStyle(button);
  const usableWidth = Math.max(48, button.clientWidth - 42);
  const labels = selectionTriggerLabels().filter(Boolean);
  const minimumSize = 10;
  let fittedSize = 16;
  for (; fittedSize >= minimumSize; fittedSize -= 0.25) {
    context.font = `${style.fontWeight} ${fittedSize}px ${style.fontFamily}`;
    const everyLabelFits = labels.every((label) => {
      const ratioCount = state.catalog === "tetracordes"
        ? label.trim().split(/\s+/).filter(Boolean).length
        : 1;
      const renderedWidth = context.measureText(label).width
        + (Math.max(0, ratioCount - 1) * 0.6 * fittedSize);
      return renderedWidth <= usableWidth;
    });
    if (everyLabelFits) break;
  }
  button.style.setProperty("--selection-menu-font-size", `${Math.max(minimumSize, fittedSize)}px`);
}

function scheduleSelectionMenuTypography() {
  requestAnimationFrame(fitSelectionMenuTypography);
}

function updateModeControlWidth(modes = []) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;
  const style = getComputedStyle(elements.modeMenuButton);
  context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const families = availableModeFamilies(modes);
  const submenuLabels = [
    ...families.map(({ family, variants }) => (
      `${formatModeLabel(family.label)} (${variants.map(modeSpecificLabel).join(" ")})`
    )),
  ];
  const submenuWidth = Math.max(
    220,
    Math.min(390, Math.ceil(Math.max(...submenuLabels.map((label) => context.measureText(label).width)) + 44)),
  );
  elements.modeControl.style.setProperty("--mode-submenu-width", `${submenuWidth}px`);
}

function createFanMenuGroup(label) {
  const group = document.createElement("div");
  group.className = "mode-menu-fan-group";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "mode-menu-group-trigger";
  trigger.dataset.menuGroup = label;
  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");
  const triggerLabel = document.createElement("span");
  triggerLabel.textContent = label;
  const arrow = document.createElement("span");
  arrow.className = "mode-menu-group-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "›";
  trigger.append(triggerLabel, arrow);

  const submenu = document.createElement("section");
  submenu.className = "mode-menu-submenu";
  submenu.dataset.menuSubmenu = label;
  submenu.setAttribute("role", "group");
  submenu.setAttribute("aria-label", label);
  submenu.hidden = true;
  group.append(trigger, submenu);
  return { group, trigger, submenu };
}

function closeFanSubmenus() {
  elements.modeMenuPopover.querySelectorAll(".mode-menu-group-trigger").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
  elements.modeMenuPopover.querySelectorAll(".mode-menu-fan-group").forEach((group) => {
    group.classList.remove("is-open", "opens-left");
  });
  elements.modeMenuPopover.querySelectorAll(".mode-menu-submenu").forEach((submenu) => {
    submenu.hidden = true;
    submenu.style.removeProperty("top");
  });
}

function openFanSubmenu(trigger, focusFirst = false) {
  if (!trigger) return;
  const group = trigger.closest(".mode-menu-fan-group");
  const submenu = group?.querySelector(".mode-menu-submenu");
  if (!group || !submenu) return;
  closeFanSubmenus();
  group.classList.add("is-open");
  trigger.setAttribute("aria-expanded", "true");
  submenu.hidden = false;
  submenu.style.top = "-7px";
  const submenuRect = submenu.getBoundingClientRect();
  const viewportPadding = 8;
  const bottomOverflow = submenuRect.bottom - (window.innerHeight - viewportPadding);
  if (bottomOverflow > 0) submenu.style.top = `${-7 - bottomOverflow}px`;
  let adjustedRect = submenu.getBoundingClientRect();
  if (adjustedRect.top < viewportPadding) {
    submenu.style.top = `${Number.parseFloat(submenu.style.top) + viewportPadding - adjustedRect.top}px`;
    adjustedRect = submenu.getBoundingClientRect();
  }
  if (adjustedRect.right > window.innerWidth - viewportPadding && group.getBoundingClientRect().left > adjustedRect.width) {
    group.classList.add("opens-left");
  }
  if (focusFirst) submenu.querySelector("button:not(:disabled)")?.focus();
}

function intervalMenuOptionLabel(entry) {
  return `${entry.proportion} · ${entry.intervalName} · ${Math.round(entry.cents)} c`;
}

function appendCatalogOverview(primaryMenu) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "mode-menu-overview";
  button.dataset.catalogOverview = ALL_SELECTION_ID;
  button.setAttribute("role", "option");
  button.setAttribute("aria-selected", String(catalogOverviewSelected()));
  button.textContent = "Tout";
  primaryMenu.append(button);
}

function populateIntervalSelect() {
  elements.modeSelect.replaceChildren();
  elements.modeMenuPopover.replaceChildren();
  const allOption = document.createElement("option");
  allOption.value = ALL_SELECTION_ID;
  allOption.textContent = "Tout";
  elements.modeSelect.append(allOption);

  const primaryMenu = document.createElement("div");
  primaryMenu.className = "mode-menu-primary";
  appendCatalogOverview(primaryMenu);

  const catalog = availableIntervalEntries();
  INTERVAL_MENU_GROUPS.forEach(({ label, genericNumbers }) => {
    const entries = catalog
      .filter((entry) => genericNumbers.includes(entry.genericNumber))
      .sort((first, second) => (
        first.cents - second.cents
        || INTERVAL_NAME_ORDER.indexOf(first.intervalName) - INTERVAL_NAME_ORDER.indexOf(second.intervalName)
        || first.ratio.localeCompare(second.ratio)
      ));
    if (!entries.length) return;
    const nativeGroup = document.createElement("optgroup");
    nativeGroup.label = label;
    const { group, trigger, submenu } = createFanMenuGroup(label);
    trigger.dataset.intervalCategory = label;
    const preferredRatio = IONIAN_DEFAULT_INTERVAL_RATIO_BY_GROUP.get(label);
    const defaultEntry = entries.find((entry) => entry.ratio === preferredRatio) ?? entries[0];
    if (defaultEntry) trigger.dataset.defaultIntervalSelection = defaultEntry.id;
    entries.forEach((entry) => {
      const visibleLabel = intervalMenuOptionLabel(entry);
      const option = document.createElement("option");
      option.value = entry.id;
      option.textContent = visibleLabel;
      nativeGroup.append(option);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "mode-menu-family-option interval-menu-option";
      button.dataset.intervalSelection = entry.id;
      button.setAttribute("role", "option");
      const proportion = document.createElement("span");
      proportion.className = "interval-menu-proportion";
      proportion.append(createColorizedProportion(entry.proportion));
      const details = document.createElement("span");
      details.className = "interval-menu-details";
      details.textContent = `${entry.intervalName} · ${Math.round(entry.cents)} c`;
      button.append(proportion, details);
      submenu.append(button);
    });
    elements.modeSelect.append(nativeGroup);
    primaryMenu.append(group);
  });
  elements.modeMenuPopover.append(primaryMenu);
  elements.modeSelect.value = state.intervalSelection;
  updateIntervalMenuLabel();
}

function updateIntervalMenuLabel() {
  elements.modeMenuLabel.replaceChildren();
  const entry = intervalEntryForSelection();
  if (catalogOverviewSelected("intervalles")) {
    elements.modeMenuLabel.textContent = "Tout";
    elements.modeMenuButton.setAttribute("aria-label", "Afficher toutes les hauteurs utilisées par les intervalles");
  } else if (entry) {
    elements.modeMenuLabel.append(
      createColorizedProportion(entry.proportion),
      document.createTextNode(` · ${entry.intervalName}`),
    );
    elements.modeMenuButton.setAttribute("aria-label", `Intervalle sélectionné : ${intervalMenuOptionLabel(entry)}`);
  } else {
    elements.modeMenuLabel.textContent = "Intervalles";
    elements.modeMenuButton.setAttribute("aria-label", "Choisir un intervalle concordant");
  }
  elements.modeMenuPopover.querySelectorAll("[data-interval-selection]").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.intervalSelection === state.intervalSelection));
  });
  renderFixedLimitSelector(entry ? selectionLimitLabel([entry.ratio]) : "", "l’intervalle");
}

function populateModeSelect() {
  elements.modeSelect.replaceChildren();
  elements.modeMenuPopover.replaceChildren();
  const allOption = document.createElement("option");
  allOption.value = ALL_SELECTION_ID;
  allOption.textContent = "Tout";
  elements.modeSelect.append(allOption);

  const primaryMenu = document.createElement("div");
  primaryMenu.className = "mode-menu-primary";
  elements.modeMenuPopover.append(primaryMenu);
  appendCatalogOverview(primaryMenu);

  if (!state.selectedFamily) {
    updateModeControlWidth();
    updateModeMenuLabel();
    return;
  }
  const modes = modesAvailableForCurrentFamily();
  const families = availableModeFamilies(modes);

  MODE_GROUPS.forEach((group) => {
    const groupFamilies = families.filter((entry) => entry.group.label === group.label);
    if (!groupFamilies.length) return;

    const nativeGroup = document.createElement("optgroup");
    nativeGroup.label = group.label;
    const { group: menuGroup, trigger: menuTrigger, submenu } = createFanMenuGroup(group.label);
    const defaultFamily = groupFamilies.find(({ family }) => (
      family.label === MODE_GROUP_DEFAULT_FAMILIES.get(group.label)
    )) ?? groupFamilies[0];
    menuTrigger.dataset.defaultModeId = lowestModeVariant(defaultFamily.variants).id;

    groupFamilies.forEach(({ family, variants }) => {
      variants.forEach((mode) => {
        const option = document.createElement("option");
        option.value = mode.id;
        option.textContent = `${formatModeLabel(family.label)} — ${modeSpecificLabel(mode)}`;
        nativeGroup.append(option);
      });

      const familyOption = document.createElement("button");
      familyOption.type = "button";
      familyOption.className = "mode-menu-family-option";
      familyOption.dataset.defaultModeId = lowestModeVariant(variants).id;
      familyOption.dataset.modeFamily = `${group.label}|${family.label}`;
      familyOption.setAttribute("role", "option");
      const familyName = document.createElement("span");
      familyName.className = "mode-menu-level-2";
      familyName.textContent = formatModeLabel(family.label);
      const limits = document.createElement("span");
      limits.className = "mode-menu-family-limits";
      limits.append(document.createTextNode("("));
      variants.forEach((mode, index) => {
        if (index) limits.append(document.createTextNode(" "));
        appendColorizedModeLimit(limits, modeSpecificLabel(mode));
      });
      limits.append(document.createTextNode(")"));
      familyOption.append(familyName, limits);
      submenu.append(familyOption);
    });

    if (nativeGroup.children.length) {
      elements.modeSelect.append(nativeGroup);
      primaryMenu.append(menuGroup);
    }
  });
  elements.modeSelect.value = state.selectedModeId;
  updateModeControlWidth(modes);
  updateModeMenuLabel();
}

function modeSpecificLabel(mode) {
  const full = formatModeLabel(mode.label);
  const family = formatModeLabel(mode.family);
  return full.startsWith(family) ? full.slice(family.length).trim() : full;
}

function appendColorizedModeLimit(container, value) {
  const match = value.match(/^(L)(5|7|11|13)(.*)$/);
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

function selectionLimitLabel(ratios) {
  if (!ratios?.length) return "";
  // L5 est le premier niveau proposé et comprend aussi les rapports 2/3-limite.
  let limit = 5n;
  for (const ratio of ratios) {
    const fraction = parseFraction(ratio);
    if (!fraction) continue;
    for (const integer of [fraction.numerator, fraction.denominator]) {
      const prime = greatestPrimeFactor(integer);
      if (prime > limit) limit = prime;
    }
  }
  return `L${limit}`;
}

function renderLimitButtonFace(button, limitLabel) {
  const number = String(limitLabel).match(/(?:^|L)(5|7|11|13)/)?.[1] ?? "";
  const label = document.createElement("span");
  label.className = "mode-variant-label";
  appendColorizedModeLimit(label, String(limitLabel));
  button.replaceChildren(label);
  button.dataset.limit = number;
  button.style.setProperty("--limit-color", LIMIT_COLORS[number] ?? LIMIT_COLORS[3]);
  button.title = `Limite ${number}`;
}

function renderFixedLimitSelector(selectedLimit = "", subject = "la sélection") {
  elements.modeVariantSelector.replaceChildren();
  elements.modeVariantSelector.style.setProperty("--limit-choice-count", CHORD_LIMITS.length);
  elements.modeVariantSelector.hidden = false;
  elements.modeVariantSelector.setAttribute("aria-label", `Limite harmonique de ${subject}`);
  CHORD_LIMITS.forEach((limit) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mode-variant-button";
    button.disabled = true;
    button.setAttribute("aria-pressed", String(limit === selectedLimit));
    button.setAttribute("aria-label", limit === selectedLimit
      ? `${limit} — limite de ${subject}` : `${limit} non disponible`);
    renderLimitButtonFace(button, limit);
    elements.modeVariantSelector.append(button);
  });
}

function appendTonicFamilyLabel(container, familyKey) {
  const displayRatio = NETWORK_FAMILY_BLUEPRINTS[familyKey]?.displayRatio ?? FAMILY_DEFINITIONS[familyKey]?.displayRatio;
  if (!displayRatio) {
    container.textContent = familyKey;
    return;
  }
  const notation = ratioToHeji(displayRatio, { applyReference: false });
  const label = document.createElement("span");
  label.className = "network-family-label";
  label.classList.toggle("is-neutral", displayRatio === "1/1");
  label.dataset.networkFamilyLabel = familyKey;
  const accidentalText = NETWORK_FAMILY_ACCIDENTAL_OVERRIDES[familyKey] ?? notation?.accidental;
  if (accidentalText) {
    const accidental = document.createElement("span");
    accidental.className = "network-family-accidental";
    accidental.setAttribute("aria-hidden", "true");
    accidental.textContent = accidentalText;
    label.append(accidental);
  }
  const ratio = document.createElement("span");
  ratio.className = "network-family-ratio";
  ratio.append(createColorizedRatio(displayRatio), document.createTextNode("*"));
  label.append(ratio);
  container.append(label);
}

function renderTonicMenu() {
  elements.tonicMenuPopover.replaceChildren();
  const menuFamilies = new Map(TONIC_MENU_FAMILY_ORDER.map((key) => [key, FAMILY_DEFINITIONS[key]]));
  if (appliedNetworkConfiguration.sourceMethod === "scala") {
    menuFamilies.clear();
    const groups = new Map();
    Object.values(FAMILY_DEFINITIONS).filter((family) => family.imported).forEach((family) => {
      if (!groups.has(family.displayRatio)) groups.set(family.displayRatio, { ...family, tonics: [] });
      groups.get(family.displayRatio).tonics.push(...family.tonics);
    });
    groups.forEach((family) => menuFamilies.set(family.key, family));
  }
  menuFamilies.forEach((family, familyKey) => {
    if (!family) return;
    // Order within each harmonic family by its exact fifth coordinate, not
    // by octave-folded pitch height. Leave the underlying musical data intact.
    const tonics = [...new Set(family.tonics)]
      .filter((ratio) => TONIC_RATIO_SET.has(ratio))
      .sort((first, second) => (
        (factorOddPrimes(parseFraction(first)).get(3n) ?? 0)
        - (factorOddPrimes(parseFraction(second)).get(3n) ?? 0)
      ));
    if (!tonics.length) return;

    const group = document.createElement("section");
    group.className = "tonic-menu-group";
    const heading = document.createElement("strong");
    heading.className = "tonic-menu-family";
    appendTonicFamilyLabel(heading, familyKey);
    const tonicList = document.createElement("div");
    tonicList.className = "tonic-menu-tonics";
    group.append(heading, tonicList);

    tonics.forEach((ratio) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "tonic-menu-option";
      option.dataset.tonicRatio = ratio;
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(ratio === state.selectedTonic));
      option.setAttribute("aria-label", `Choisir la tonique ${plainHejiNote(ratioToHeji(ratio))}, famille ${family.shortLabel}`);
      const requestedMode = selectedModeById();
      option.disabled = state.catalog === "modes"
        && state.selectedModeId !== ALL_SELECTION_ID
        && !resolvedModeSelectionForTonic(ratio, state.selectedModeId, requestedMode?.label);
      if (option.disabled) option.title = "Aucun mode complet n’est disponible sur cette tonique dans le réseau actuel.";
      option.append(createHejiPitch(ratio, false));
      const ratioLabel = document.createElement("span");
      ratioLabel.className = "tonic-menu-option-ratio";
      ratioLabel.append(createColorizedRatio(ratio));
      option.append(ratioLabel);
      tonicList.append(option);
    });
    elements.tonicMenuPopover.append(group);
  });
}

function tonicNetworkNavigation() {
  const targets = Object.fromEntries(Object.keys(TONIC_NAVIGATION_STEPS).map((direction) => [direction, null]));
  const fraction = parseFraction(state.selectedTonic);
  if (!fraction || !TONIC_RATIO_SET.has(state.selectedTonic)) return targets;
  const positions = new Map([...TONIC_RATIO_SET].map((ratio) => [
    latticeExponentKey(factorOddPrimes(parseFraction(ratio))), ratio,
  ]));
  const origin = factorOddPrimes(fraction);
  Object.entries(TONIC_NAVIGATION_STEPS).forEach(([direction, { prime, step }]) => {
    const destination = new Map(origin);
    setLatticeExponent(destination, prime, (origin.get(prime) ?? 0) + step);
    targets[direction] = positions.get(latticeExponentKey(destination)) ?? null;
  });
  return targets;
}

function renderTonicNavigation() {
  const targets = tonicNetworkNavigation();
  elements.tonicNavigationButtons.forEach((button) => {
    const direction = button.dataset.tonicStep;
    const rawTarget = targets[direction];
    const requestedMode = selectedModeById();
    const target = rawTarget && state.catalog === "modes" && state.selectedModeId !== ALL_SELECTION_ID
      && !resolvedModeSelectionForTonic(rawTarget, state.selectedModeId, requestedMode?.label)
      ? null
      : rawTarget;
    // Une flèche grisée dit pourquoi (16 octobre 2026) : tonique voisine sans mode complet,
    // ou aucune tonique voisine dans ce réseau.
    const destination = target
      ? `${plainHejiNote(ratioToHeji(target))} (${target})`
      : rawTarget
        ? `${plainHejiNote(ratioToHeji(rawTarget))} (${rawTarget}) — aucun mode ${requestedMode ? `${formatModeLabel(requestedMode.label)} ` : ""}complet disponible`
        : "aucune tonique voisine dans ce réseau";
    const label = `${TONIC_NAVIGATION_STEPS[direction].label} : ${destination}`;
    button.disabled = !target;
    button.title = label;
    button.setAttribute("aria-label", label);
  });
}

function navigateTonicNetwork(direction) {
  const target = tonicNetworkNavigation()[direction];
  if (target) selectTonic(target);
}

function centerSelectedTonicMenu() {
  window.requestAnimationFrame(() => {
    const selected = elements.tonicMenuPopover.querySelector('[aria-selected="true"]');
    if (!selected || elements.tonicMenuPopover.hidden) return;
    const menuBounds = elements.tonicMenuPopover.getBoundingClientRect();
    const selectedBounds = selected.getBoundingClientRect();
    const centeredScrollTop = elements.tonicMenuPopover.scrollTop
      + selectedBounds.top
      - menuBounds.top
      - (elements.tonicMenuPopover.clientHeight - selectedBounds.height) / 2;
    const maximumScrollTop = Math.max(
      0,
      elements.tonicMenuPopover.scrollHeight - elements.tonicMenuPopover.clientHeight,
    );
    elements.tonicMenuPopover.scrollTop = Math.min(
      maximumScrollTop,
      Math.max(0, centeredScrollTop),
    );
  });
}

function updateModeMenuLabel() {
  elements.modeMenuLabel.replaceChildren();
  const selectedMode = selectedModeById();
  if (state.selectedModeId === ALL_SELECTION_ID) {
    elements.modeMenuLabel.textContent = "Tout";
    elements.modeMenuButton.setAttribute("aria-label", "Afficher toutes les hauteurs disponibles dans les modes");
  } else if (!selectedMode) {
    elements.modeMenuLabel.textContent = "Modes";
    elements.modeMenuButton.setAttribute("aria-label", "Choisir un mode");
  } else {
    elements.modeMenuLabel.textContent = modeFamilyTriggerLabel(selectedMode);
    elements.modeMenuButton.setAttribute(
      "aria-label",
      `Mode sélectionné : ${formatModeLabel(selectedMode.label)}`,
    );
  }
  elements.modeMenuPopover.querySelectorAll("[data-mode-id]").forEach((button) => {
    const selected = button.dataset.modeId === state.selectedModeId;
    button.setAttribute("aria-selected", String(selected));
  });
  elements.modeMenuPopover.querySelectorAll("[data-mode-family]").forEach((button) => {
    const familyKey = selectedMode ? `${selectedMode.group}|${selectedMode.family}` : "";
    button.setAttribute("aria-selected", String(button.dataset.modeFamily === familyKey));
  });
  elements.modeMenuPopover.querySelectorAll("[data-catalog-overview]").forEach((button) => {
    button.setAttribute("aria-selected", String(catalogOverviewSelected()));
  });
  elements.modeMenuPopover.querySelectorAll(".mode-menu-group-trigger").forEach((button) => {
    button.setAttribute("aria-current", String(button.dataset.menuGroup === selectedMode?.group));
  });
  renderModeVariantSelector();
}

function renderModeVariantSelector() {
  elements.modeVariantSelector.replaceChildren();
  const selectedMode = selectedModeById();
  if (!state.selectedFamily || !selectedMode) {
    renderFixedLimitSelector("", "mode");
    return;
  }
  elements.modeVariantSelector.hidden = false;
  elements.modeVariantSelector.setAttribute("aria-label", "Limite du mode");
  const variants = selectedMode
    ? modesAvailableForCurrentFamily()
      .filter((mode) => mode.group === selectedMode.group && mode.family === selectedMode.family)
    : [];
  const limits = ["L5", "L7", "L11", "L13"];
  limits.forEach((baseLimit) => {
    const matchingVariants = variants.filter((mode) => (
      modeSpecificLabel(mode).match(/^L(5|7|11|13)/)?.[0] === baseLimit
    )).sort(compareModeVariants);
    if (!matchingVariants.length) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mode-variant-button";
      button.disabled = true;
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", `${baseLimit} non disponible`);
      renderLimitButtonFace(button, baseLimit);
      elements.modeVariantSelector.append(button);
      return;
    }
    matchingVariants.forEach((mode) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mode-variant-button";
      button.dataset.modeId = mode.id;
      button.setAttribute("aria-pressed", String(mode.id === state.selectedModeId));
      button.setAttribute("aria-label", `Choisir ${formatModeLabel(mode.label)}`);
      renderLimitButtonFace(button, modeSpecificLabel(mode));
      elements.modeVariantSelector.append(button);
    });
  });
  elements.modeVariantSelector.style.setProperty(
    "--limit-choice-count",
    elements.modeVariantSelector.children.length,
  );
}

function currentChord() {
  return state.selectedChordName ? chordData.chords[state.selectedChordName] : null;
}

function currentChordVariant() {
  return currentChord()?.variants[state.selectedVariantIndex] ?? null;
}

function networkTonicEquivalent(value) {
  if (!value) return null;
  if (TONIC_RATIO_SET.has(value)) return value;
  const octaveClass = multiplyAndReduce(value, "1/1");
  if (!octaveClass) return null;
  if (TONIC_RATIO_SET.has(octaveClass)) return octaveClass;
  return TONIC_RATIOS.find((tonic) => multiplyAndReduce(tonic, "1/1") === octaveClass) ?? null;
}

function contextualModeTonic(variant, chordTonic = state.selectedTonic) {
  const tonic = variant?.modeTonicDegreeRatio
    ? divideAndReduce(chordTonic, variant.modeTonicDegreeRatio)
    : chordTonic;
  return networkTonicEquivalent(tonic) ?? tonic;
}

function variantAvailableForTonic(
  variant,
  chordTonic = state.selectedTonic,
  options = undefined,
) {
  const tonic = contextualModeTonic(variant, chordTonic);
  return tonicIsAvailableInNetwork(tonic, appliedNetworkConfiguration, options);
}

function familyAdmitsChordVariant(
  chordName,
  chord,
  variantIndex,
  chordTonic = state.selectedTonic,
  options = undefined,
) {
  const variant = chord?.variants[variantIndex];
  const modelLabel = CHORD_MODE_MODELS[chordName]?.[variantIndex];
  const modeTonic = contextualModeTonic(variant, chordTonic);
  const familyKey = modeTonic ? TONIC_FAMILY_BY_RATIO.get(modeTonic) : null;
  const family = familyKey ? FAMILY_DEFINITIONS[familyKey] : null;
  const allowUndesignatedTonic = Boolean(options?.allowUndesignatedTonic);
  if (
    !variant
    || (!modelLabel && !variant.label)
    || !modeTonic
    || (!family && !allowUndesignatedTonic)
    || !tonicIsAvailableInNetwork(modeTonic, appliedNetworkConfiguration, options)
    || !networkContainsRatiosAtTonic(
      variant.pitchRatios,
      modeTonic,
      appliedNetworkConfiguration,
      options,
    )
    || !ratiosUseEnabledNetworkConcordances(variant.pitchRatios)
  ) return false;
  return true;
}

function availableChordVariantIndices(
  chord,
  chordName = state.selectedChordName,
  chordTonic = state.selectedTonic,
) {
  if (!chord) return [];
  const indices = chord.variants
    .map((variant, index) => (
      variantAvailableForTonic(variant, chordTonic)
      && familyAdmitsChordVariant(chordName, chord, index, chordTonic)
        ? index
        : -1
    ))
    .filter((index) => index >= 0);
  const intervalContext = state.intervalChordContext;
  if (
    intervalContext
    && intervalContext.chordName === chordName
    && intervalContext.chordTonic === chordTonic
    && !indices.includes(intervalContext.variantIndex)
  ) {
    indices.push(intervalContext.variantIndex);
  }
  return indices.sort((first, second) => first - second);
}

function modeMatchingModel(modelLabel, tonic) {
  if (!modelLabel || !tonic) return null;
  const canonicalModel = canonicalModeModelLabel(modelLabel);
  return modesAvailableForTonic(tonic).find((mode) => (
    canonicalModeModelLabel(mode.label) === canonicalModel
  )) ?? null;
}

function resolvedModeSelectionForTonic(tonic, requestedModeId = "", preferredModel = "") {
  const availableModes = selectableModesAvailableForTonic(tonic).sort(compareModeVariants);
  const requested = availableModes.find((mode) => mode.id === requestedModeId);
  if (requested) return requested;
  const modeled = availableModes.filter((mode) => (
    canonicalModeModelLabel(mode.label) === canonicalModeModelLabel(preferredModel)
  )).sort(compareModeVariants)[0];
  if (modeled) return modeled;
  const requestedMode = selectedModeById(requestedModeId);
  const nearestVariant = requestedMode
    ? availableModes
      .filter((mode) => mode.group === requestedMode.group && mode.family === requestedMode.family)
      .sort((first, second) => (
        Math.abs(modeLimitNumber(first) - modeLimitNumber(requestedMode))
        - Math.abs(modeLimitNumber(second) - modeLimitNumber(requestedMode))
        || compareModeVariants(first, second)
      ))[0]
    : null;
  if (nearestVariant) return nearestVariant;
  for (const fallbackLabel of ["Ionien L5", "Éolien L5"]) {
    const fallback = availableModes.find((mode) => (
      canonicalModeModelLabel(mode.label) === canonicalModeModelLabel(fallbackLabel)
    ));
    if (fallback) return fallback;
  }
  return availableModes[0] ?? null;
}

function resolvedModeSelection(requestedModeId = "", preferredModel = "") {
  return resolvedModeSelectionForTonic(state.selectedTonic, requestedModeId, preferredModel);
}

function ensureCurrentModeSelection() {
  if (state.catalog !== "modes") return;
  if (state.selectedModeId === ALL_SELECTION_ID) return;
  const requestedMode = selectedModeById();
  const selectedMode = resolvedModeSelection(
    state.selectedModeId || DEFAULT_MODE_ID,
    requestedMode?.label || MODE_PRESETS.find((mode) => mode.id === DEFAULT_MODE_ID)?.label,
  );
  state.selectedModeId = selectedMode?.id ?? ALL_SELECTION_ID;
}

function resolvedChordSelection(
  requestedChordName = "",
  requestedVariantIndex = 0,
  chordTonic = state.selectedTonic,
) {
  const requestedChord = chordData.chords[requestedChordName];
  if (
    requestedChord
    && availableChordVariantIndices(requestedChord, requestedChordName, chordTonic)
      .includes(requestedVariantIndex)
  ) {
    return { chordName: requestedChordName, variantIndex: requestedVariantIndex };
  }
  const orderedNames = [
    "M",
    "m",
    ...chordData.columns.flatMap((column) => column.names).filter((name) => name !== "M" && name !== "m"),
  ];
  for (const chordName of orderedNames) {
    const chord = chordData.chords[chordName];
    const variantIndex = availableChordVariantIndices(chord, chordName, chordTonic)[0];
    if (variantIndex !== undefined) return { chordName, variantIndex };
  }
  return null;
}

function characteristicModeSelectionForCurrentChord() {
  const variant = currentChordVariant();
  const modeTonic = contextualModeTonic(variant);
  const familyKey = modeTonic ? TONIC_FAMILY_BY_RATIO.get(modeTonic) : "";
  const mode = modeMatchingModel(currentChordModeModel(), modeTonic);
  return mode && modeTonic
    ? { familyKey, mode, tonic: modeTonic }
    : null;
}

function containedChordSelectionForMode(mode, menuOrder) {
  const modeRatios = new Set(mode.ratios.slice(0, 7));
  const candidates = [];
  menuOrder.forEach((chordName, menuIndex) => {
    const chord = chordData.chords[chordName];
    if (!chord) return;
    chord.variants.forEach((variant, variantIndex) => {
      if (
        !availableChordVariantIndices(chord, chordName, state.selectedTonic).includes(variantIndex)
        || !variant.pitchRatios.every((ratio) => modeRatios.has(ratio))
      ) return;
      candidates.push({
        chordName,
        chordTonic: state.selectedTonic,
        menuIndex,
        pitchCount: new Set(variant.pitchRatios).size,
        variantIndex,
      });
    });
  });
  return candidates.sort((first, second) => (
    second.pitchCount - first.pitchCount
    || first.menuIndex - second.menuIndex
    || first.variantIndex - second.variantIndex
  ))[0] ?? null;
}

function characteristicChordSelectionForMode(mode) {
  if (!mode) return null;
  const canonicalMode = canonicalModeModelLabel(mode.label);
  const menuOrder = chordData.columns.flatMap((column) => column.names);
  const modeRatios = new Set(mode.ratios.slice(0, 7));
  const preferredChordNames = MODE_CHARACTERISTIC_CHORDS[canonicalMode] ?? [];
  for (const preferredChordName of preferredChordNames) {
    const preferredChord = chordData.chords[preferredChordName];
    if (!preferredChord) continue;
    for (let variantIndex = 0; variantIndex < preferredChord.variants.length; variantIndex += 1) {
      const variant = preferredChord.variants[variantIndex];
      if (!variant.pitchRatios.every((ratio) => modeRatios.has(ratio))) continue;
      const chordTonic = variant.modeTonicDegreeRatio
        ? multiplyAndReduce(state.selectedTonic, variant.modeTonicDegreeRatio)
        : state.selectedTonic;
      if (
        chordTonic
        && TONIC_RATIO_SET.has(chordTonic)
        && availableChordVariantIndices(preferredChord, preferredChordName, chordTonic).includes(variantIndex)
      ) {
        return { chordName: preferredChordName, chordTonic, variantIndex };
      }
    }
  }
  const coreTriads = ["M", "m", "sm", "mb5", "smb5", "#5"];
  const orderedNames = [
    ...coreTriads.filter((name) => menuOrder.includes(name)),
    ...menuOrder.filter((name) => !coreTriads.includes(name)),
  ];
  for (const chordName of orderedNames) {
    const chord = chordData.chords[chordName];
    for (let variantIndex = 0; variantIndex < chord.variants.length; variantIndex += 1) {
      if (canonicalModeModelLabel(CHORD_MODE_MODELS[chordName]?.[variantIndex] ?? "") !== canonicalMode) continue;
      const variant = chord.variants[variantIndex];
      const chordTonic = variant.modeTonicDegreeRatio
        ? multiplyAndReduce(state.selectedTonic, variant.modeTonicDegreeRatio)
        : state.selectedTonic;
      if (
        chordTonic
        && TONIC_RATIO_SET.has(chordTonic)
        && availableChordVariantIndices(chord, chordName, chordTonic).includes(variantIndex)
      ) {
        return { chordName, chordTonic, variantIndex };
      }
    }
  }
  return containedChordSelectionForMode(mode, menuOrder);
}

function simplestChordSelectionForInterval(context) {
  if (!context?.mode || !context.modeTonic) return null;
  const modeRatios = new Set(context.mode.ratios.slice(0, 7));
  const menuOrder = chordData.columns.flatMap((column) => column.names);
  const candidates = [];
  menuOrder.forEach((chordName, menuIndex) => {
    const chord = chordData.chords[chordName];
    if (!chord || chord.hiddenFundamental) return;
    chord.variants.forEach((variant, variantIndex) => {
      const chordRatios = chordFunctionRatios(chord, variant);
      context.mode.ratios.slice(0, 7).forEach((degreeRatio, degreeIndex) => {
        const pitches = chordRatios.map((ratio) => multiplyAndReduce(degreeRatio, ratio)).filter(Boolean);
        if (
          !pitches.length
          || !pitches.every((ratio) => modeRatios.has(ratio))
          || !pitches.includes(context.lowerRatio)
          || !pitches.includes(context.upperRatio)
        ) return;
        const chordTonic = multiplyAndReduce(context.modeTonic, degreeRatio);
        if (!chordTonic || !TONIC_RATIO_SET.has(chordTonic)) return;
        candidates.push({
          chordName,
          chordTonic,
          degreeIndex,
          menuIndex,
          pitchCount: new Set(pitches).size,
          variantIndex,
        });
      });
    });
  });
  return candidates.sort((first, second) => (
    first.pitchCount - second.pitchCount
    || Number(second.degreeIndex === 0) - Number(first.degreeIndex === 0)
    || first.menuIndex - second.menuIndex
    || first.variantIndex - second.variantIndex
  ))[0] ?? null;
}

function currentChordAnchorRatio() {
  return currentChord()?.hiddenFundamental
    ? currentChordVariant()?.tonicAnchorRatio ?? "1/1"
    : "1/1";
}

function chordAudioRatio(functionalRatio) {
  return divideAndReduce(functionalRatio, currentChordAnchorRatio()) ?? functionalRatio;
}

function chordAbsoluteRatio(functionalRatio) {
  return multiplyAndReduce(state.selectedTonic, chordAudioRatio(functionalRatio)) ?? functionalRatio;
}

function currentChordModeModel() {
  return CHORD_MODE_MODELS[state.selectedChordName]?.[state.selectedVariantIndex] ?? "";
}

function chordVariantLimitLabel(chordName, variantIndex, variant) {
  if (CHORDS_WITHOUT_VISIBLE_LIMIT.has(chordName)) return "";
  if (variant?.label && /^L(?:5|7|11|13)$/.test(variant.label)) return variant.label;
  const model = CHORD_MODE_MODELS[chordName]?.[variantIndex] ?? "";
  const match = model.match(/\bL(5|7|11|13)(?=sm\b|m\b|\b)/);
  return match ? `L${match[1]}` : "";
}

function appendColorizedChordLimit(container, value) {
  const match = String(value).match(/^(.*?L)(5|7|11|13)(.*)$/);
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

function chordContextLabel(variant) {
  return (variant?.contextLabel ?? "").replace(/\s+L(?:5|7|11|13)(?:sm|m)?\b/g, "").trim();
}

function contextualChordMenuLabel(chordName, variantIndex, variant) {
  const context = chordContextLabel(variant);
  const limit = context ? chordVariantLimitLabel(chordName, variantIndex, variant) : "";
  return `${chordDisplayName(chordName)}${limit ? ` (${limit})` : ""}`;
}

function renderChordVariantSelector() {
  const chord = currentChord();
  elements.modeVariantSelector.replaceChildren();
  elements.modeVariantSelector.style.setProperty("--limit-choice-count", CHORD_LIMITS.length);
  if (!chord || !state.selectedChordName) {
    renderFixedLimitSelector("", "l’accord");
    return;
  }
  elements.modeVariantSelector.hidden = false;
  elements.modeVariantSelector.setAttribute("aria-label", "Limite de l’accord");
  if (CHORDS_WITHOUT_VISIBLE_LIMIT.has(state.selectedChordName)) {
    renderFixedLimitSelector(selectionLimitLabel(currentChordVariant()?.pitchRatios), "l’accord");
    return;
  }
  const availableIndices = availableChordVariantIndices(chord);
  CHORD_LIMITS.forEach((limitLabel) => {
    const indices = availableIndices.filter((variantIndex) => (
      chordVariantLimitLabel(state.selectedChordName, variantIndex, chord?.variants[variantIndex]) === limitLabel
    ));
    const currentLimit = currentChordVariant()
      ? chordVariantLimitLabel(state.selectedChordName, state.selectedVariantIndex, currentChordVariant())
      : "";
    const index = currentLimit === limitLabel && indices.includes(state.selectedVariantIndex)
      ? state.selectedVariantIndex
      : indices[0] ?? -1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mode-variant-button";
    renderLimitButtonFace(button, limitLabel);
    if (index < 0) {
      button.disabled = true;
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", `${limitLabel} non disponible`);
    } else {
      button.dataset.chordVariantIndex = String(index);
      button.setAttribute("aria-pressed", String(currentLimit === limitLabel));
      button.setAttribute("aria-label", `Choisir ${chordDisplayName(state.selectedChordName)} ${limitLabel}`);
    }
    elements.modeVariantSelector.append(button);
  });
}

function updateChordMenuLabel() {
  const overview = catalogOverviewSelected("accords");
  const label = overview ? "Tout" : state.selectedChordName ? chordDisplayName(state.selectedChordName) : "Accords";
  elements.modeMenuLabel.replaceChildren();
  appendColorizedChordLimit(elements.modeMenuLabel, label);
  elements.modeMenuButton.setAttribute(
    "aria-label",
    overview
      ? "Afficher toutes les hauteurs utilisées par les accords"
      : state.selectedChordName
      ? `Accord sélectionné : ${label}`
      : "Choisir un accord",
  );
  elements.modeMenuPopover.querySelectorAll("[data-chord-name]").forEach((button) => {
    const variantMatches = button.dataset.chordVariantIndex === undefined
      || Number(button.dataset.chordVariantIndex) === state.selectedVariantIndex;
    button.setAttribute("aria-selected", String(
      button.dataset.chordName === state.selectedChordName && variantMatches,
    ));
  });
  const selectedColumn = chordData.columns.find((column) => column.names.includes(state.selectedChordName));
  elements.modeMenuPopover.querySelectorAll(".mode-menu-group-trigger").forEach((button) => {
    button.setAttribute("aria-current", String(button.dataset.menuGroup === selectedColumn?.group));
  });
  renderChordVariantSelector();
}

function chordMenuContextIndices(chordName, availableIndices) {
  const chord = chordData.chords[chordName];
  const bySound = new Map();
  availableIndices.forEach((index) => {
    const variant = chord.variants[index];
    if (!variant.contextLabel) return;
    // Different host modes can describe the same rooted chord. Keep one menu
    // choice, retaining the active context instead of switching it on redraw.
    const key = `${chordVariantLimitLabel(chordName, index, variant)}:${chordFunctionRatios(chord, variant).slice().sort().join(',')}`;
    if (!bySound.has(key) || (state.selectedChordName === chordName && state.selectedVariantIndex === index)) {
      bySound.set(key, index);
    }
  });
  return [...bySound.values()];
}

function populateChordSelect() {
  elements.modeSelect.replaceChildren();
  elements.modeMenuPopover.replaceChildren();
  const allOption = document.createElement("option");
  allOption.value = ALL_SELECTION_ID;
  allOption.textContent = "Tout";
  elements.modeSelect.append(allOption);
  const primaryMenu = document.createElement("div");
  primaryMenu.className = "mode-menu-primary";
  elements.modeMenuPopover.append(primaryMenu);
  appendCatalogOverview(primaryMenu);
  const submenuLabels = [];

  chordData.columns.forEach((column) => {
    const nativeGroup = document.createElement("optgroup");
    nativeGroup.label = column.group;
    const { group: menuGroup, trigger: menuTrigger, submenu } = createFanMenuGroup(column.group);
    let defaultSelection = null;

    column.names.forEach((chordName) => {
      const chord = chordData.chords[chordName];
      const availableIndices = availableChordVariantIndices(chord, chordName);
      if (!availableIndices.length) return;
      const contextualIndices = chordMenuContextIndices(chordName, availableIndices);
      const appendOption = (variantIndex = null) => {
        const variant = variantIndex === null ? null : chord.variants[variantIndex];
        const contextLabel = chordContextLabel(variant);
        const value = variantIndex === null ? chordName : `${chordName}::${variantIndex}`;
        const visibleLabel = contextualChordMenuLabel(chordName, variantIndex, variant);
        if (!defaultSelection) defaultSelection = { chordName, variantIndex };
        submenuLabels.push(visibleLabel);
        const option = document.createElement("option");
        option.value = value;
        option.textContent = visibleLabel;
        nativeGroup.append(option);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "mode-menu-family-option chord-menu-family-option";
        button.dataset.chordName = chordName;
        if (variantIndex !== null) button.dataset.chordVariantIndex = String(variantIndex);
        button.setAttribute("role", "option");
        const name = document.createElement("span");
        name.className = "mode-menu-level-2";
        name.textContent = chordDisplayName(chordName);
        button.append(name);
        const labels = contextLabel
          ? [chordVariantLimitLabel(chordName, variantIndex, variant)].filter(Boolean)
          : [...new Set(availableIndices.map((index) => (
            chordVariantLimitLabel(chordName, index, chord.variants[index])
          )).filter(Boolean))];
        if (labels.length) {
          const limits = document.createElement("span");
          limits.className = "mode-menu-family-limits";
          limits.append(document.createTextNode(" ("));
          labels.forEach((label, index) => {
            if (index) limits.append(document.createTextNode(" "));
            appendColorizedChordLimit(limits, label);
          });
          limits.append(document.createTextNode(")"));
          button.append(limits);
        }
        submenu.append(button);
      };
      if (contextualIndices.length) contextualIndices.forEach(appendOption);
      else appendOption();
    });
    if (defaultSelection) {
      menuTrigger.dataset.defaultChordName = defaultSelection.chordName;
      if (defaultSelection.variantIndex !== null) {
        menuTrigger.dataset.defaultChordVariantIndex = String(defaultSelection.variantIndex);
      }
    }
    elements.modeSelect.append(nativeGroup);
    if (nativeGroup.children.length) primaryMenu.append(menuGroup);
  });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context && submenuLabels.length) {
    const style = getComputedStyle(elements.modeMenuButton);
    context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const width = Math.max(
      220,
      Math.min(390, Math.ceil(Math.max(...submenuLabels.map((label) => context.measureText(label).width)) + 44)),
    );
    elements.modeControl.style.setProperty("--mode-submenu-width", `${width}px`);
  }
  elements.modeSelect.value = currentChordVariant()?.contextLabel
    ? `${state.selectedChordName}::${state.selectedVariantIndex}`
    : state.selectedChordName;
  updateChordMenuLabel();
}

function tetrachordMenuOptionLabel(entry) {
  return `${entry.ratios.join(" ")} (${entry.code})`;
}

function createTetrachordMenuLabel(entry, { includeCode = true } = {}) {
  const label = document.createElement("span");
  label.className = "tetrachord-menu-label";
  const ratios = document.createElement("span");
  ratios.className = "tetrachord-menu-ratios";
  entry.ratios.forEach((ratio, index) => {
    if (index) ratios.append(document.createTextNode(" "));
    ratios.append(createColorizedRatio(ratio));
  });
  label.append(ratios);
  if (!includeCode) return label;
  const code = document.createElement("span");
  code.className = "tetrachord-menu-code";
  // Le 3 de Phryg3 désigne un degré, pas une limite harmonique.
  const match = entry.code.match(/^(.*-)(\d+)(L(?:5|7|11|13)(?:sm|m)?)$/);
  code.append(document.createTextNode("("));
  if (match) {
    code.append(document.createTextNode(match[1]));
    const integer = document.createElement("span");
    integer.textContent = match[2];
    integer.style.color = colorForInteger(match[2]);
    code.append(integer);
    appendColorizedModeLimit(code, match[3]);
  } else {
    code.append(document.createTextNode(entry.code));
  }
  code.append(document.createTextNode(")"));
  label.append(document.createTextNode(" "), code);
  return label;
}

function updateTetrachordMenuLabel() {
  const entry = tetrachordEntryForSelection();
  elements.modeMenuLabel.replaceChildren();
  if (catalogOverviewSelected("tetracordes")) elements.modeMenuLabel.textContent = "Tout";
  else if (entry) elements.modeMenuLabel.append(createTetrachordMenuLabel(entry, { includeCode: false }));
  else elements.modeMenuLabel.textContent = "Tétracordes";
  elements.modeMenuButton.setAttribute("aria-label", catalogOverviewSelected("tetracordes")
    ? "Afficher toutes les hauteurs utilisées par les tétracordes"
    : entry ? `Tétracorde sélectionné : ${tetrachordMenuOptionLabel(entry)}` : "Choisir un tétracorde");
  elements.modeMenuPopover.querySelectorAll("[data-tetrachord-code]").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.tetrachordCode === state.tetrachordSelection));
  });
  renderFixedLimitSelector(entry ? selectionLimitLabel(entry.ratios) : "", "tétracorde");
}

function populateTetrachordSelect() {
  elements.modeSelect.replaceChildren();
  elements.modeMenuPopover.replaceChildren();
  elements.modeControl.style.setProperty("--mode-submenu-width", "340px");
  const allOption = document.createElement("option");
  allOption.value = ALL_SELECTION_ID;
  allOption.textContent = "Tout";
  elements.modeSelect.append(allOption);
  const primaryMenu = document.createElement("div");
  primaryMenu.className = "mode-menu-primary";
  const available = new Set(availableTetrachordEntries().map((entry) => entry.code));
  if (state.tetrachordSelection !== ALL_SELECTION_ID && !available.has(state.tetrachordSelection)) {
    state.tetrachordSelection = "";
    state.tetrachordModeContext = null;
  }
  appendCatalogOverview(primaryMenu);
  for (const { label, codes } of modeTetrachordApi.groups) {
    const nativeGroup = document.createElement("optgroup");
    nativeGroup.label = label;
    const { group, trigger, submenu } = createFanMenuGroup(label);
    trigger.dataset.defaultTetrachordCode = codes.find((code) => available.has(code)) ?? "";
    for (const code of codes) {
      const entry = TETRACHORD_CATALOG.find((candidate) => candidate.code === code);
      const option = document.createElement("option");
      option.value = code;
      option.textContent = tetrachordMenuOptionLabel(entry);
      option.disabled = !available.has(code);
      nativeGroup.append(option);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mode-menu-family-option";
      button.dataset.tetrachordCode = code;
      button.setAttribute("role", "option");
      button.append(createTetrachordMenuLabel(entry));
      button.disabled = option.disabled;
      if (button.disabled) button.title = "Aucun mode de contexte disponible pour cette tonique dans le réseau actif.";
      submenu.append(button);
    }
    elements.modeSelect.append(nativeGroup);
    primaryMenu.append(group);
  }
  elements.modeMenuPopover.append(primaryMenu);
  elements.modeSelect.value = state.tetrachordSelection;
  updateTetrachordMenuLabel();
}

function populateSelectionMenu() {
  if (state.catalog === "intervalles") populateIntervalSelect();
  else if (state.catalog === "tetracordes") populateTetrachordSelect();
  else if (state.catalog === "accords") populateChordSelect();
  else populateModeSelect();
  scheduleSelectionMenuTypography();
}

function selectionMenuNavigation() {
  const primary = elements.modeMenuPopover.querySelector(".mode-menu-primary");
  const groups = [...(primary?.children ?? [])].map((group) => {
    const overview = group.classList.contains("mode-menu-overview");
    const items = (overview ? [group] : [...group.querySelectorAll(".mode-menu-family-option")])
      .filter((item) => !item.disabled);
    return { items, trigger: overview ? group : group.querySelector(".mode-menu-group-trigger") };
  }).filter((group) => group.items.length);
  const groupIndex = groups.findIndex((group) => group.items.some((item) => (
    item.getAttribute("aria-selected") === "true"
  )));
  const group = groups[groupIndex];
  const itemIndex = group?.items.findIndex((item) => item.getAttribute("aria-selected") === "true") ?? -1;
  return {
    left: groupIndex > 0 ? groups[groupIndex - 1].trigger : null,
    right: groups[groupIndex + 1]?.trigger ?? null,
    up: itemIndex > 0 ? group.items[itemIndex - 1] : null,
    down: group ? group.items[itemIndex + 1] ?? null : groups[0]?.trigger ?? null,
  };
}

const SELECTION_NAVIGATION_KEYS = new Map([
  ["ArrowLeft", "left"], ["ArrowRight", "right"],
  ["ArrowUp", "up"], ["ArrowDown", "down"],
]);

function renderSelectionNavigation() {
  const targets = state.selectedTonic ? selectionMenuNavigation() : {};
  const labels = {
    left: "Catégorie précédente", right: "Catégorie suivante",
    up: "Élément précédent", down: "Élément suivant",
  };
  const keyboardLabels = { left: "gauche", right: "droite", up: "haut", down: "bas" };
  elements.selectionNavigationButtons.forEach((button) => {
    const direction = button.dataset.selectionStep;
    const target = targets[direction];
    button.disabled = !target;
    const destination = target?.dataset.menuGroup ?? target?.textContent?.trim();
    const label = `${labels[direction]}${destination ? ` : ${destination}` : ""}`;
    button.title = `${label} — flèche ${keyboardLabels[direction]} du clavier`;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-keyshortcuts", [...SELECTION_NAVIGATION_KEYS].find(([, step]) => step === direction)[0]);
  });
}

function navigateSelectionMenu(direction) {
  if (!state.selectedTonic) return;
  const target = selectionMenuNavigation()[direction];
  if (!target) return;
  closeAllMenus();
  // Use the actual menu action: identical defaults, variants and musical context.
  target.click();
}

function handleSelectionNavigationKey(event) {
  if (document.body.dataset.pageTab && document.body.dataset.pageTab !== "modes") return false;
  const direction = SELECTION_NAVIGATION_KEYS.get(event.key);
  if (!direction || event.defaultPrevented || event.isComposing
    || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
    || isTypingTarget(event.target)
    || event.target?.closest?.('[role="slider"], [role="spinbutton"], [role="listbox"], [role="combobox"], [role="menu"], [role="tablist"]')
    || !elements.networkConfigDrawer.hidden
    || allMenus().some(([, popover]) => !popover.hidden)) return false;
  // Same action and same boundaries as a triangle click. Do not scroll the page,
  // even when there is no next item at the edge of the menu.
  event.preventDefault();
  navigateSelectionMenu(direction);
  return true;
}

function normalizedChordDegreeLabel(value) {
  return String(value).replace(/#(?=\d)/g, "♯").replace(/b(?=\d)/g, "♭");
}

function chordDegreeSlotLabel(value) {
  const label = normalizedChordDegreeLabel(value);
  const match = label.match(/^([♭♯]*)(\d+)$/);
  if (!match) return label;
  const degree = Number(match[2]);
  return `${match[1]}${((degree - 1) % 7) + 1}`;
}

function displayChordDegree(value) {
  const label = normalizedChordDegreeLabel(value);
  if (label === "9") return "2";
  if (label === "♭9") return "♭2";
  return label;
}

function chordTones(chord, variant) {
  const degrees = variant.functionDegrees ?? chord.functionDegrees ?? chord.degrees;
  return degrees.map((degree, index) => ({
    degree,
    ratio: variant.pitchRatios[index],
    slot: chordDegreeSlotLabel(degree),
  })).sort((first, second) => (
    modeSlotCenter(first.slot, MODE_TABLE_GRID_WEIGHTS, MODE_TABLE_SLOTS)
    - modeSlotCenter(second.slot, MODE_TABLE_GRID_WEIGHTS, MODE_TABLE_SLOTS)
    || ratioCents(first.ratio) - ratioCents(second.ratio)
  ));
}

function chordDegreeNumber(value) {
  const match = chordDegreeSlotLabel(value).match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function createChordProportionRow(tones, distance, caption) {
  const row = document.createElement("div");
  row.className = "proportion-row";
  const hiddenCaption = document.createElement("span");
  hiddenCaption.className = "proportion-caption visually-hidden";
  hiddenCaption.textContent = caption;
  row.append(hiddenCaption);
  let count = 0;
  for (let firstIndex = 0; firstIndex < tones.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < tones.length; secondIndex += 1) {
      const firstDegree = chordDegreeNumber(tones[firstIndex].slot);
      const secondDegree = chordDegreeNumber(tones[secondIndex].slot);
      if (firstDegree === null || secondDegree === null || secondDegree - firstDegree !== distance) continue;
      const label = document.createElement("span");
      label.className = "proportion-label";
      const firstCenter = modeSlotCenter(tones[firstIndex].slot, MODE_TABLE_GRID_WEIGHTS, MODE_TABLE_SLOTS);
      const secondCenter = modeSlotCenter(tones[secondIndex].slot, MODE_TABLE_GRID_WEIGHTS, MODE_TABLE_SLOTS);
      label.style.left = `${(firstCenter + secondCenter) / 2}%`;
      label.append(createColorizedProportion(intervalProportion(tones[firstIndex].ratio, tones[secondIndex].ratio)));
      row.append(label);
      count += 1;
    }
  }
  if (!count) row.classList.add("is-empty");
  return row;
}

function renderChordAnalysis(chord, variant) {
  const tones = chordTones(chord, variant);
  const displayedTones = chord.hiddenFundamental
    ? [{ degree: "1", ghost: true, ratio: "1/1", slot: "1" }, ...tones]
    : tones;
  const model = document.createElement("div");
  model.className = "mode-model chord-model";
  model.dataset.modeModel = currentChordModeModel();
  model.style.setProperty("--mode-table-grid", MODE_TABLE_GRID_WEIGHTS.map((value) => `${value}fr`).join(" "));
  const degreeRow = document.createElement("div");
  degreeRow.className = "mode-degree-row";
  MODE_FAMILY_BOUNDARIES.forEach((gridLine) => appendGridBoundary(
    degreeRow, gridLine, "mode-family-boundary", MODE_TABLE_GRID_WEIGHTS,
  ));
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
    placeOnModeGrid(degree, tone.slot, MODE_TABLE_SLOTS);
    degreeRow.append(degree);
    const ratioCell = document.createElement("div");
    ratioCell.className = `mode-ratio-cell${tone.ghost ? " is-implicit-root" : ""}`;
    placeOnModeGrid(ratioCell, tone.slot, MODE_TABLE_SLOTS);
    ratioCell.append(createColorizedRatio(tone.ratio));
    ratioRow.append(ratioCell);
    const hejiCell = document.createElement(tone.ghost ? "div" : "button");
    if (!tone.ghost) hejiCell.type = "button";
    hejiCell.className = `mode-heji-cell${tone.ghost ? " is-implicit-root" : ""}`;
    placeOnModeGrid(hejiCell, tone.slot, MODE_TABLE_SLOTS);
    hejiCell.append(createHejiPitch(chordAbsoluteRatio(tone.ratio), state.showTableCents));
    if (!tone.ghost) configureSoundTrigger(hejiCell, chordAudioRatio(tone.ratio), { preserveRegister: true });
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
    const note = document.createElement("p");
    note.className = "chord-equivalence-note";
    note.append(document.createTextNode("Quasi équivalent enharmonique de "));
    note.append(createHejiPitch(chordAbsoluteRatio(chord.enharmonicSeventhRootRatio)));
    note.append(document.createTextNode("7"));
    contents.push(note);
  }
  if (chord.interpretation) {
    const interpretation = document.createElement("p");
    interpretation.className = "chord-interpretation";
    interpretation.textContent = chord.interpretation;
    contents.push(interpretation);
  }
  elements.tableContent.replaceChildren(...contents);
}

function renderChordFunctionPreview(chord, variant) {
  const preview = state.functionPreview;
  const mode = preview ? MODE_PRESETS.find((candidate) => candidate.id === preview.modeId) : null;
  if (!preview || !mode) return false;
  const highlightedPitches = new Set(
    chordTones(chord, variant).map((tone) => chordAbsoluteRatio(tone.ratio)),
  );
  const modeName = formatModeLabel(mode.label);
  const preposition = /^[AEÉÈÊËIÎÏOÔÖUÛÜY]/i.test(modeName) ? "d’" : "de ";
  elements.tableTitle.textContent = `${chordDisplayName(state.selectedChordName)} — ${chordFunctionDegreeLabel(preview.degreeLabel)} ${preposition}${modeName}`;
  renderSelectedModeTable(mode, {
    highlightedPitches,
    tonicRatio: preview.modeTonic,
  });
  return true;
}

function renderChordDetails() {
  const chord = currentChord();
  const variant = currentChordVariant();
  elements.tableSection.dataset.displayMode = state.showTableCents ? "heji-cents" : "heji";
  elements.tableSection.hidden = false;
  if (!chord || !variant) {
    renderNeutralTonicTable();
    return;
  }
  elements.tableSection.classList.remove("is-concordant");
  elements.tableSection.style.removeProperty("--table-preferred-width");
  if (renderChordFunctionPreview(chord, variant)) return;
  elements.tableTitle.textContent = currentChordModeModel()
    ? `${chordDisplayName(state.selectedChordName)} — modèle ${currentChordModeModel()}`
    : chordDisplayName(state.selectedChordName);
  renderChordAnalysis(chord, variant);
}

function chordSpecificAuxiliaryExponents() {
  if (state.catalog !== "accords" || state.selectedChordName !== "Gr+6" || currentChordVariant()?.label !== "L5") return [];
  const missingLimitFiveStep = parseFraction("9/8");
  return missingLimitFiveStep ? [factorOddPrimes(missingLimitFiveStep)] : [];
}

function closeMenu(button, popover) {
  if (popover === elements.modeMenuPopover) closeFanSubmenus();
  if (popover === elements.activeNetworkMenu) closeActiveNetworkSubmenus();
  popover.hidden = true;
  button.setAttribute("aria-expanded", "false");
}

function allMenus() {
  return [
    [elements.selectionSummary, elements.tonicMenuPopover],
    [elements.modeMenuButton, elements.modeMenuPopover],
    [elements.activeNetworkButton, elements.activeNetworkMenu],
    [elements.optionsButton, elements.optionsPopover],
    [elements.frettierOptionsButton, elements.frettierOptionsPopover],
    [elements.summaryDownloadButton, elements.summaryDownloadPopover],
    [elements.summaryOptionsButton, elements.summaryOptionsPopover],
  ];
}

function closeAllMenus(exceptPopover = null) {
  allMenus().forEach(([button, popover]) => {
    if (popover !== exceptPopover) closeMenu(button, popover);
  });
}

function toggleMenu(button, popover) {
  const willOpen = popover.hidden;
  closeAllMenus(popover);
  popover.hidden = !willOpen;
  button.setAttribute("aria-expanded", String(willOpen));
}

function currentChordContextMode() {
  const preview = state.functionPreview;
  const previewMode = preview ? MODE_PRESETS.find((candidate) => candidate.id === preview.modeId) : null;
  // Le tableau de l'accord rend toujours functionPreview, qu'il s'agisse
  // d'une proposition à confirmer ou du contexte déjà confirmé. Le graphe,
  // le clavier et les changements de panneau doivent suivre exactement cette
  // même rotation visible. modeOriginContext reste uniquement un repli utile
  // quand aucun contexte fonctionnel n'est affiché.
  if (preview?.modeTonic && previewMode) {
    return {
      familyKey: TONIC_FAMILY_BY_RATIO.get(preview.modeTonic),
      mode: previewMode,
      tonic: preview.modeTonic,
    };
  }
  const origin = modeOriginContextSelection();
  if (origin) return origin;
  return null;
}

function chordGraphToneRatios() {
  const chord = currentChord();
  const variant = currentChordVariant();
  if (!chord || !variant) return [];
  return chord.hiddenFundamental ? ["1/1", ...variant.pitchRatios] : variant.pitchRatios;
}

function chordContextGraphRatios() {
  const context = currentChordContextMode();
  if (!context || !state.selectedTonic) return [];
  return context.mode.ratios.map((ratio) => {
    const absolutePitch = multiplyAndReduce(context.tonic, ratio);
    const chordRelativePitch = absolutePitch
      ? divideAndReduce(absolutePitch, state.selectedTonic)
      : null;
    return chordRelativePitch
      ? multiplyAndReduce(chordRelativePitch, currentChordAnchorRatio())
      : null;
  }).filter(Boolean);
}

function networkNodeIsChordTone(node) {
  const chordTones = octavePitchSet(chordGraphToneRatios());
  return [...octavePitchSet(node.aliases ?? [node.ratio])].some((ratio) => chordTones.has(ratio));
}

function networkNodeIsIntervalTone(node) {
  const context = intervalContextForSelection();
  const tones = octavePitchSet(intervalHighlightedRelativeRatios(context));
  return [...octavePitchSet(node.aliases ?? [node.ratio])].some((ratio) => tones.has(ratio));
}

function networkNodeIsTetrachordTone(node) {
  const tones = octavePitchSet(tetrachordEntryForSelection()?.ratios ?? []);
  return [...octavePitchSet(node.aliases ?? [node.ratio])].some((ratio) => tones.has(ratio));
}

function configuredFamilyStructuralRatios(familyKey, configuration = appliedNetworkConfiguration) {
  const structuralRatios = ["1/1", ...FIXED_MODAL_FUNCTION_RATIOS,
    ...(configuration.families?.[familyKey]?.functions ?? []), "2/1"];
  return [...new Set(structuralRatios)]
    .sort((first, second) => (
      ratioCents(first) - ratioCents(second) || first.localeCompare(second)
    ));
}

const configuredNetworkPitchCache = new WeakMap();
const configuredNetworkPitchSetCache = new WeakMap();

function configuredNetworkTonics(configuration) {
  if (configuration.sourceMethod === "scala") return importedNetworkTonics(configuration);
  return [...new Set(NETWORK_FAMILY_ORDER.flatMap((familyKey) => (
    configuration.families?.[familyKey]?.enabled
      ? configuration.families[familyKey].selectedTonics ?? [] : []
  )))];
}

// Source de vérité : les toniques sélectionnées multipliées par les fonctions
// autorisées dans leur famille. Les modes ne peuvent que restreindre ce bassin.
function fullNetworkPitchRatios(configuration = appliedNetworkConfiguration) {
  if (configuration.sourceMethod === "scala") {
    return [...importedNetworkPitchSet(configuration)].sort((first, second) => (
      ratioCents(first) - ratioCents(second) || first.localeCompare(second)
    ));
  }
  const cached = configuredNetworkPitchCache.get(configuration);
  if (cached) return [...cached];
  const pitches = new Set();
  NETWORK_FAMILY_ORDER.forEach((familyKey) => {
    const family = configuration.families[familyKey];
    if (!family.enabled) return;
    family.selectedTonics.forEach((tonic) => configuredFamilyStructuralRatios(familyKey, configuration).forEach((ratio) => {
      const pitch = multiplyAndReduce(tonic, ratio);
      if (pitch) pitches.add(pitch);
    }));
  });
  const sorted = [...pitches].sort((first, second) => (
    ratioCents(first) - ratioCents(second) || first.localeCompare(second)
  ));
  configuredNetworkPitchCache.set(configuration, sorted);
  return [...sorted];
}

function fullNetworkPitchSet(configuration = appliedNetworkConfiguration) {
  const cached = configuredNetworkPitchSetCache.get(configuration);
  if (cached) return cached;
  const pitches = new Set(fullNetworkPitchRatios(configuration));
  configuredNetworkPitchSetCache.set(configuration, pitches);
  return pitches;
}

function tonicIsAvailableInNetwork(
  tonic,
  configuration = appliedNetworkConfiguration,
  { allowUndesignatedTonic = false } = {},
) {
  if (!tonic) return false;
  if (configuredNetworkTonics(configuration).includes(tonic)) return true;
  return allowUndesignatedTonic
    && fullNetworkPitchSet(configuration).has(multiplyAndReduce(tonic, "1/1"));
}

function fullNetworkGraphRatios() {
  if (!state.selectedTonic) return fullNetworkPitchRatios();
  return [...new Set(fullNetworkPitchRatios().map((ratio) => (
    divideAndReduce(ratio, state.selectedTonic)
  )).filter(Boolean))].sort((first, second) => (
    ratioCents(first) - ratioCents(second) || first.localeCompare(second)
  ));
}

function selectedGraphRatios() {
  if (!state.selectedTonic || !state.selectedFamily) return TONIC_RATIOS;
  if (catalogOverviewSelected()) return catalogOverviewRatios();
  if (state.catalog === "tetracordes") {
    const context = tetrachordContextForSelection();
    return context ? intervalContextRelativeRatios(context) : [];
  }
  if (state.catalog === "intervalles") {
    return state.intervalSelection
      ? intervalContextRelativeRatios(intervalContextForSelection())
      : ["1/1"];
  }
  if (state.catalog === "accords") {
    if (state.selectedChordName) {
      const chord = currentChord();
      const variant = currentChordVariant();
      if (!chord || !variant) return [];
      return [...new Set([...chordGraphToneRatios(), ...chordContextGraphRatios()])];
    }
    return ["1/1"];
  }
  if (state.selectedModeId) {
    return selectedModeById()?.ratios ?? [];
  }
  return appliedNetworkConfiguration.sourceMethod === "scala" ? concordantModeRatios() : ["1/1"];
}

function activeRatios() {
  if (["network", "mode-network"].includes(state.graphView)) return fullNetworkGraphRatios();
  return selectedGraphRatios();
}

function foregroundGraphRatios() {
  if (catalogOverviewSelected()) return catalogOverviewRatios();
  if (state.catalog === "accords") return chordGraphToneRatios();
  if (state.catalog === "intervalles") {
    return intervalHighlightedRelativeRatios(intervalContextForSelection());
  }
  if (state.catalog === "tetracordes") return tetrachordEntryForSelection()?.ratios ?? [];
  return selectedModeById()?.ratios ?? ["1/1"];
}

let compositeSelectionNodeKeys = new Set();
let compositeSelectionEdgeKeys = new Set();
let modalSupplementalEdgeKeys = new Set();
let modalSupplementalNodeKeys = new Set();
let modalForegroundEdgeKeys = new Set();

function latticeLayoutNodeKey(node) {
  return latticeExponentKey(node.exponents);
}

function latticeLayoutEdgeKey(first, second) {
  return [latticeLayoutNodeKey(first), latticeLayoutNodeKey(second)].sort().join("::");
}

function modalConnectionPlan(values, connectionLevel) {
  const primary = new Map();
  values.forEach((ratio) => {
    const fraction = parseFraction(ratio);
    if (!fraction) return;
    const exponents = factorOddPrimes(fraction);
    const key = latticeExponentKey(exponents);
    if (!primary.has(key)) primary.set(key, { exponents, key, ratio });
  });
  const nodes = [...primary.values()].sort((first, second) => first.key.localeCompare(second.key));
  const highlightedEdgeKeys = new Set();
  const supplementalPairs = [];
  const auxiliaryExponents = [];
  const auxiliaryKeys = new Set();
  const degree = new Map(nodes.map((node) => [node.key, 0]));
  for (let first = 0; first < nodes.length; first += 1) {
    for (let second = first + 1; second < nodes.length; second += 1) {
      if (latticeNeighbourPrime(nodes[first].exponents, nodes[second].exponents) === null) continue;
      degree.set(nodes[first].key, degree.get(nodes[first].key) + 1);
      degree.set(nodes[second].key, degree.get(nodes[second].key) + 1);
    }
  }
  const primeLimit = (exponents) => Math.max(3, ...[...exponents.keys()].map(Number));
  const modalAxisPrimes = new Set([3n, 5n, 7n, 11n, 13n]);
  const edgeKey = (first, second) => [latticeExponentKey(first), latticeExponentKey(second)].sort().join("::");
  const addPair = (first, second) => {
    const prime = latticeNeighbourPrime(first.exponents, second.exponents);
    if (prime === null || !modalAxisPrimes.has(prime)) return;
    const key = edgeKey(first.exponents, second.exponents);
    if (highlightedEdgeKeys.has(key)) return;
    highlightedEdgeKeys.add(key);
    supplementalPairs.push([first.key, second.key]);
  };
  const axisRoute = (first, second, requireAuxiliary = false) => {
    const cache = new Map();
    const better = (candidate, current) => !current || candidate.cost < current.cost
      || (candidate.cost === current.cost
        && candidate.path.map((point) => point.key).join("|")
          < current.path.map((point) => point.key).join("|"));
    const choose = (exponents) => {
      const key = latticeExponentKey(exponents);
      if (key === second.key) return [{ cost: 0, path: [{ exponents, key }] }, null];
      if (cache.has(key)) return cache.get(key);
      const best = [null, null];
      const primes = [...new Set([...exponents.keys(), ...second.exponents.keys()])]
        .sort((left, right) => Number(left - right));
      primes.forEach((prime) => {
        const here = exponents.get(prime) ?? 0;
        const there = second.exponents.get(prime) ?? 0;
        if (here === there) return;
        if (!modalAxisPrimes.has(prime)) return;
        const next = new Map(exponents);
        setLatticeExponent(next, prime, here + Math.sign(there - here));
        const nextKey = latticeExponentKey(next);
        const tails = choose(next);
        const isNewPoint = nextKey !== second.key && !primary.has(nextKey);
        const mixedHighPrimes = next.has(11n) && next.has(13n) ? 100 : 0;
        tails.forEach((tail, tailUsesAuxiliary) => {
          if (!tail) return;
          const usesAuxiliary = Number(isNewPoint || tailUsesAuxiliary === 1);
          const candidate = {
            cost: tail.cost + (isNewPoint ? auxiliaryKeys.has(nextKey) ? 50 : 1000 : 0)
              + mixedHighPrimes + primeLimit(next),
            path: [{ exponents, key }, ...tail.path],
          };
          if (better(candidate, best[usesAuxiliary])) best[usesAuxiliary] = candidate;
        });
      });
      cache.set(key, best);
      return best;
    };
    const [solid, dotted] = choose(first.exponents);
    if (requireAuxiliary) return dotted?.path ?? [];
    return (solid && dotted ? better(solid, dotted) ? solid : dotted : solid ?? dotted)?.path ?? [];
  };
  const addAxisRoute = (first, second, requireAuxiliary = false) => {
    const route = axisRoute(first, second, requireAuxiliary);
    const missing = route.slice(1, -1).filter(({ key }) => !primary.has(key));
    if (!missing.length) return;
    missing.forEach(({ exponents, key }) => {
      if (auxiliaryKeys.has(key)) return;
      auxiliaryKeys.add(key);
      auxiliaryExponents.push(exponents);
    });
    for (let index = 1; index < route.length; index += 1) {
      const previous = route[index - 1];
      const current = route[index];
      if (primary.has(previous.key) && primary.has(current.key)) continue;
      addPair(previous, current);
    }
  };

  // Level 1 repairs only genuinely isolated notes. A directly linked 11/8
  // and 11/6 pair already has its ordinary solid 4/3 connection.
  const connected = nodes.filter((node) => degree.get(node.key) > 0);
  const anchor = nodes[0] && [...nodes].sort((first, second) => (
    primeLimit(first.exponents) - primeLimit(second.exponents)
    || first.key.localeCompare(second.key)
  ))[0];
  const targets = connected.length ? connected : anchor ? [anchor] : [];
  nodes.filter((node) => degree.get(node.key) === 0 && (connected.length || node !== anchor)).forEach((node) => {
    const target = [...targets].filter((candidate) => candidate !== node).sort((first, second) => (
      latticeDistance(node.exponents, first.exponents) - latticeDistance(node.exponents, second.exponents)
      || primeLimit(first.exponents) - primeLimit(second.exponents)
      || first.key.localeCompare(second.key)
    ))[0];
    if (!target) return;
    // Even an emergency link must follow the prime axes, with neutral
    // intersection points rather than a free diagonal shortcut.
    addAxisRoute(node, target);
  });

  if (connectionLevel >= 2) {
    // A modal relation is determined by the interval between the two notes.
    // At level 2, prefer an alternate shortest axial route through a neutral
    // intersection even if another shortest route is already solid. Use the
    // shorter octave-equivalent direction (5/3 ↔ 1/1 is 6/5), and the
    // actual modal-function vocabulary through prime limit 7. The 28/27
    // modal step is included explicitly among the network concordances.
    const modalIntervals = new Set([
      ...MODAL_FUNCTION_RATIOS.filter((ratio) => modalFunctionLimit(ratio) <= 7),
      "28/27",
    ]);
    for (let first = 0; first < nodes.length; first += 1) {
      for (let second = first + 1; second < nodes.length; second += 1) {
        const left = nodes[first];
        const right = nodes[second];
        if (primeLimit(left.exponents) > 7 || primeLimit(right.exponents) > 7) continue;
        if (latticeNeighbourPrime(left.exponents, right.exponents) !== null) continue;
        const forward = divideAndReduce(left.ratio, right.ratio);
        const backward = divideAndReduce(right.ratio, left.ratio);
        const interval = ratioCents(forward) <= ratioCents(backward) ? forward : backward;
        if (!modalIntervals.has(interval) || ratioCents(interval) > ratioCents("5/4")) continue;

        // Only the unit-axis segments touching a neutral intersection become
        // dotted; direct diagonals across the lattice are never valid.
        addAxisRoute(left, right, true);
      }
    }
  }
  if (connectionLevel >= 2) {
    // Existing neutral intersections reveal all their unit-axis links to the
    // selected notes, without creating any new point or auxiliary-only route.
    for (const exponents of auxiliaryExponents) {
      const auxiliaryNode = { key: latticeExponentKey(exponents), exponents };
      for (const node of nodes) addPair(node, auxiliaryNode);
    }
  }
  return { auxiliaryExponents, highlightedEdgeKeys, supplementalPairs };
}

function appendModalSupplementalEdges(layout, plan) {
  if (!plan?.supplementalPairs.length) return;
  const nodeIndex = new Map(layout.nodes.map((node, index) => [latticeLayoutNodeKey(node), index]));
  plan.supplementalPairs.forEach(([firstKey, secondKey]) => {
    const first = nodeIndex.get(firstKey);
    const second = nodeIndex.get(secondKey);
    if (first === undefined || second === undefined) return;
    const prime = latticeNeighbourPrime(layout.nodes[first].exponents, layout.nodes[second].exponents);
    if (![3n, 5n, 7n, 11n, 13n].includes(prime)) return;
    const existing = layout.edges.find((edge) => (
      (edge.first === first && edge.second === second)
      || (edge.first === second && edge.second === first)
    ));
    if (existing) {
      existing.auxiliary = true;
      existing.supplemental = true;
      return;
    }
    layout.edges.push({ auxiliary: true, first, second, prime, supplemental: true });
  });
}

function updateCompositeSelectionMembership() {
  compositeSelectionNodeKeys = new Set();
  compositeSelectionEdgeKeys = new Set();
  if (!["mode", "mode-network"].includes(state.graphView)) return;
  const selectionLayout = buildLatticeLayout(
    foregroundGraphRatios(),
    state.catalog === "modes" ? 1 : state.connectionLevel,
    state.catalog === "modes" ? [] : chordSpecificAuxiliaryExponents(),
  );
  selectionLayout.nodes.forEach((node) => {
    if (!node.auxiliary) compositeSelectionNodeKeys.add(latticeLayoutNodeKey(node));
  });
  selectionLayout.edges.forEach((edge) => {
    // Auxiliary paths are structural context, not notes of a selected mode.
    // Chord-specific auxiliary paths remain highlighted for augmented sixths.
    if (edge.auxiliary && state.catalog === "modes") return;
    compositeSelectionEdgeKeys.add(latticeLayoutEdgeKey(
      selectionLayout.nodes[edge.first],
      selectionLayout.nodes[edge.second],
    ));
  });
}

function networkNodeIsCurrentSelection(node) {
  return compositeSelectionNodeKeys.has(latticeLayoutNodeKey(node));
}

function absoluteRatio(relativeRatio) {
  if (!state.selectedTonic) return relativeRatio;
  return multiplyAndReduce(state.selectedTonic, relativeRatio) ?? relativeRatio;
}

function renderLines(layout) {
  elements.lines.replaceChildren();
  const orderedEdges = [...layout.edges].sort((first, second) => (
    Number(first.supplemental) - Number(second.supplemental)
    || Number(second.auxiliary) - Number(first.auxiliary)
  ));
  for (const edge of orderedEdges) {
    const first = layout.nodes[edge.first];
    const second = layout.nodes[edge.second];
    const edgeKey = latticeLayoutEdgeKey(first, second);
    if (state.catalog === "modes" && edge.auxiliary && !modalSupplementalEdgeKeys.has(edgeKey)) continue;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    if (edge.auxiliary) line.classList.add("network-line-auxiliary");
    if (state.graphView === "mode-network") {
      if (modalSupplementalEdgeKeys.has(edgeKey)) {
        line.classList.add("network-line-bridge");
        if (!modalForegroundEdgeKeys.has(edgeKey)) line.classList.add("network-line-watermark");
      } else if (!compositeSelectionEdgeKeys.has(edgeKey)) {
        line.classList.add("network-line-watermark");
      } else if (!networkNodeIsCurrentSelection(first) || !networkNodeIsCurrentSelection(second)) {
        // Lien de la sélection qui passe par une position sans note (niveau de connexion 2) :
        // en pointillé, comme dans le réseau des toniques (demande de Simon, 16 octobre 2026).
        line.classList.add("network-line-bridge");
      }
    } else if (state.graphView === "mode" && state.catalog === "modes" && edge.auxiliary) {
      line.classList.add("network-line-bridge");
    } else if (state.graphView === "network" && state.catalog === "modes" && edge.auxiliary) {
      line.classList.add("network-line-bridge");
    } else if (
      state.graphView !== "network"
      && (
        (
          state.catalog === "accords"
          && state.selectedChordName
          && currentChordContextMode()
          && (!networkNodeIsChordTone(first) || !networkNodeIsChordTone(second))
        )
        || (
          state.catalog === "intervalles"
          && intervalEntryForSelection()
          && (!networkNodeIsIntervalTone(first) || !networkNodeIsIntervalTone(second))
        )
        || (
          state.catalog === "tetracordes"
          && tetrachordEntryForSelection()
          && (!networkNodeIsTetrachordTone(first) || !networkNodeIsTetrachordTone(second))
        )
      )
    ) {
      line.classList.add("network-line-context");
    }
    line.setAttribute("x1", String(first.x));
    line.setAttribute("x2", String(second.x));
    line.setAttribute("y1", String(first.y));
    line.setAttribute("y2", String(second.y));
    line.style.stroke = edge.supplemental ? "var(--ink)" : colorForPrime(edge.prime);
    elements.lines.append(line);
  }
}

function createRootStar() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("node-root-star");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("viewBox", "0 0 24 24");
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  polygon.setAttribute("points", starPolygonPoints(12, 12, 12, 5.04));
  svg.append(polygon);
  return svg;
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

const TONIC_MINI_LABEL_WIDTH = 150;
const TONIC_MINI_LABEL_HEIGHT = 50;
const TONIC_MINI_LABEL_OFFSET = 8;
const TONIC_MINI_GRAPH_SCALE = 0.9;
const TONIC_MINI_LABEL_SIDE_BY_FAMILY = new Map([
  ["h5", "above"],
  ["h10/7", "above"],
  ["h3", "below"],
  ["sh7", "below"],
  ["sh7/5", "below"],
  ["sh5", "below"],
]);

function tonicMiniLabelBounds(node, side) {
  return {
    height: TONIC_MINI_LABEL_HEIGHT,
    width: TONIC_MINI_LABEL_WIDTH,
    x: node.x - TONIC_MINI_LABEL_WIDTH / 2,
    y: state.textOffset === 0
      ? node.y - TONIC_MINI_LABEL_HEIGHT / 2
      : side === "above"
        ? node.y - TONIC_MINI_LABEL_OFFSET - TONIC_MINI_LABEL_HEIGHT
        : node.y + TONIC_MINI_LABEL_OFFSET,
  };
}

function tonicMiniPointInsideBounds(x, y, bounds, padding = 0) {
  return x >= bounds.x - padding
    && x <= bounds.x + bounds.width + padding
    && y >= bounds.y - padding
    && y <= bounds.y + bounds.height + padding;
}

function tonicMiniOrientation(first, second, third) {
  return (second.x - first.x) * (third.y - first.y)
    - (second.y - first.y) * (third.x - first.x);
}

function tonicMiniPointOnSegment(start, end, point) {
  return point.x >= Math.min(start.x, end.x)
    && point.x <= Math.max(start.x, end.x)
    && point.y >= Math.min(start.y, end.y)
    && point.y <= Math.max(start.y, end.y);
}

function tonicMiniSegmentsIntersect(firstStart, firstEnd, secondStart, secondEnd) {
  const firstTurn = tonicMiniOrientation(firstStart, firstEnd, secondStart);
  const secondTurn = tonicMiniOrientation(firstStart, firstEnd, secondEnd);
  const thirdTurn = tonicMiniOrientation(secondStart, secondEnd, firstStart);
  const fourthTurn = tonicMiniOrientation(secondStart, secondEnd, firstEnd);
  if (
    Math.sign(firstTurn) !== Math.sign(secondTurn)
    && Math.sign(thirdTurn) !== Math.sign(fourthTurn)
  ) return true;
  if (firstTurn === 0 && tonicMiniPointOnSegment(firstStart, firstEnd, secondStart)) return true;
  if (secondTurn === 0 && tonicMiniPointOnSegment(firstStart, firstEnd, secondEnd)) return true;
  if (thirdTurn === 0 && tonicMiniPointOnSegment(secondStart, secondEnd, firstStart)) return true;
  return fourthTurn === 0 && tonicMiniPointOnSegment(secondStart, secondEnd, firstEnd);
}

function tonicMiniSegmentHitsBounds(first, second, bounds) {
  if (
    tonicMiniPointInsideBounds(first.x, first.y, bounds)
    || tonicMiniPointInsideBounds(second.x, second.y, bounds)
  ) return true;
  const topLeft = { x: bounds.x, y: bounds.y };
  const topRight = { x: bounds.x + bounds.width, y: bounds.y };
  const bottomLeft = { x: bounds.x, y: bounds.y + bounds.height };
  const bottomRight = { x: bounds.x + bounds.width, y: bounds.y + bounds.height };
  return tonicMiniSegmentsIntersect(first, second, topLeft, topRight)
    || tonicMiniSegmentsIntersect(first, second, topRight, bottomRight)
    || tonicMiniSegmentsIntersect(first, second, bottomRight, bottomLeft)
    || tonicMiniSegmentsIntersect(first, second, bottomLeft, topLeft);
}

function tonicMiniBoundsOverlap(first, second) {
  return first.x < second.x + second.width
    && first.x + first.width > second.x
    && first.y < second.y + second.height
    && first.y + first.height > second.y;
}



function positionedTonicMiniLabel(layout, nodeIndex, placedBounds, familyKey) {
  const node = layout.nodes[nodeIndex];
  if (state.textOffset === 0) {
    return { bounds: tonicMiniLabelBounds(node, "center"), side: "center" };
  }
  // The family decides the side once; neighbours never move individual labels.
  const side = TONIC_MINI_LABEL_SIDE_BY_FAMILY.get(familyKey) || "above";
  return { bounds: tonicMiniLabelBounds(node, side), side };
}

function createTonicMiniLabel(ratio, placement) {
  const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
  foreignObject.classList.add("tonic-mini-label", `is-${placement.side}`);
  foreignObject.setAttribute("aria-hidden", "true");
  foreignObject.setAttribute("x", String(placement.bounds.x));
  foreignObject.setAttribute("y", String(placement.bounds.y));
  foreignObject.setAttribute("width", String(placement.bounds.width));
  foreignObject.setAttribute("height", String(placement.bounds.height));
  const content = document.createElement("div");
  content.className = "tonic-mini-label-content";
  content.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  content.append(
    state.displayMode === "ratio"
      ? createColorizedRatio(ratio)
      : createHejiPitch(ratio, state.displayMode === "heji-cents"),
  );
  foreignObject.append(content);
  return foreignObject;
}

function renderTonicMiniMap() {
  elements.tonicMiniMap.replaceChildren();
  if (!state.selectedTonic) return;
  const ratios = TONIC_RATIOS;
  // Niveau de connexion 2 (16 octobre 2026) : une tonique isolée est rattachée par les axes
  // premiers, en pointillé, à travers les positions absentes du réseau (petits points gris
  // sans étiquette), comme le fait déjà le graphique du mode.
  const repair = state.connectionLevel >= 2 ? modalConnectionPlan(ratios, 1) : null;
  const baseLayout = buildLatticeLayout(ratios, 1, repair?.auxiliaryExponents ?? []);
  elements.tonicMiniMap.dataset.hasVerticalSpan = String(layoutHasVerticalSpan(baseLayout));
  const layout = {
    ...baseLayout,
    nodes: baseLayout.nodes.map((node) => ({
      ...node,
      x: 500 + (node.x - 500) * TONIC_MINI_GRAPH_SCALE,
      y: 310 + (node.y - 310) * TONIC_MINI_GRAPH_SCALE,
    })),
  };
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 1000 620");
  svg.setAttribute("role", "img");
  svg.setAttribute(
    "aria-label",
    `Réseau permanent de ${layout.nodes.length} toniques; tonique courante ${state.selectedTonic}`,
  );
  layout.edges.forEach((edge) => {
    const first = layout.nodes[edge.first];
    const second = layout.nodes[edge.second];
    if (edge.auxiliary && !repair?.highlightedEdgeKeys.has(latticeLayoutEdgeKey(first, second))) return;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.classList.add("tonic-mini-line");
    if (edge.auxiliary) line.classList.add("tonic-mini-line-auxiliary");
    line.setAttribute("x1", String(first.x));
    line.setAttribute("x2", String(second.x));
    line.setAttribute("y1", String(first.y));
    line.setAttribute("y2", String(second.y));
    line.style.stroke = colorForPrime(edge.prime);
    svg.append(line);
  });
  const labelLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  labelLayer.classList.add("tonic-mini-label-layer");
  const placedLabelBounds = [];
  layout.nodes.forEach((node, nodeIndex) => {
    if (node.auxiliary) {
      const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      point.classList.add("tonic-mini-auxiliary");
      point.setAttribute("cx", String(node.x));
      point.setAttribute("cy", String(node.y));
      point.setAttribute("r", "2");
      point.setAttribute("aria-hidden", "true");
      svg.append(point);
      return;
    }
    const targetRatio = node.aliases.includes(state.selectedTonic)
      ? state.selectedTonic
      : node.aliases[0];

    const target = document.createElementNS("http://www.w3.org/2000/svg", "g");
    target.classList.add("tonic-mini-target", "network-overview-tonic");
    target.dataset.nodeIndex = String(nodeIndex);
    target.setAttribute("role", "button");
    target.setAttribute("tabindex", "0");
    const isCurrentTonic = node.aliases.includes(state.selectedTonic);
    const familyKey = TONIC_FAMILY_BY_RATIO.get(targetRatio);
    const audioRelativeRatio = divideAndReduce(targetRatio, state.selectedTonic);
    if (audioRelativeRatio) {
      target.dataset.tonicAudioRatio = audioPitchKey(audioRelativeRatio);
    }
    if (state.displayMode !== "none") {
      const labelPlacement = positionedTonicMiniLabel(layout, nodeIndex, placedLabelBounds, familyKey);
      placedLabelBounds.push(labelPlacement.bounds);
      const label = createTonicMiniLabel(targetRatio, labelPlacement);
      label.dataset.nodeIndex = String(nodeIndex);
      labelLayer.append(label);
    }
    target.setAttribute(
      "aria-label",
      isCurrentTonic
        ? `Afficher toutes les hauteurs de la tonique ${plainHejiNote(ratioToHeji(targetRatio))}`
        : `Choisir la tonique ${plainHejiNote(ratioToHeji(targetRatio))}`,
    );
    const chooseTonic = () => {
      if (isCurrentTonic) showAllAvailableNotes();
      else selectTonic(targetRatio);
    };
    target.addEventListener("click", chooseTonic);
    target.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      chooseTonic();
    });
    const hitArea = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    hitArea.classList.add("tonic-mini-hit");
    hitArea.setAttribute("cx", String(node.x));
    hitArea.setAttribute("cy", String(node.y));
    hitArea.setAttribute("r", "24");
    target.append(hitArea);
    if (isCurrentTonic) {
      const star = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      star.classList.add("tonic-mini-marker", "tonic-mini-star");
      star.dataset.centerX = String(node.x);
      star.dataset.centerY = String(node.y);
      star.setAttribute("points", starPolygonPoints(node.x, node.y, 4.5, 1.89));
      target.append(star);
      svg.append(target);
      return;
    }
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.classList.add("tonic-mini-marker", "tonic-mini-dot");
    dot.setAttribute("cx", String(node.x));
    dot.setAttribute("cy", String(node.y));
    dot.setAttribute("r", "3");
    target.append(dot);
    svg.append(target);
  });
  svg.append(labelLayer);
  elements.tonicMiniMap.append(svg);
}

function renderNodes(layout) {
  elements.nodes.replaceChildren();
  for (const node of layout.nodes) {
    if (node.auxiliary) {
      const auxiliary = document.createElement("span");
      auxiliary.className = `network-auxiliary-dot${state.graphView === "mode-network" && !modalSupplementalNodeKeys.has(latticeLayoutNodeKey(node)) ? " is-network-watermark" : ""}`;
      auxiliary.setAttribute("aria-hidden", "true");
      auxiliary.style.left = `${node.x / 10}%`;
      auxiliary.style.top = `${(node.y / 620) * 100}%`;
      elements.nodes.append(auxiliary);
      continue;
    }

    if (
      state.graphView !== "network"
      &&
      ["intervalles", "tetracordes"].includes(state.catalog)
      && state.selectedTonic
    ) {
      const ratio = node.aliases[0] ?? node.ratio;
      const intervalContext = state.catalog === "tetracordes" ? tetrachordContextForSelection() : intervalContextForSelection();
      const overview = catalogOverviewSelected();
      const hasInterval = Boolean(intervalContext);
      const isIntervalTone = overview || !hasInterval || (state.catalog === "tetracordes"
        ? networkNodeIsTetrachordTone(node) : networkNodeIsIntervalTone(node));
      const isRoot = node.aliases.includes("1/1");
      const container = document.createElement("button");
      container.type = "button";
      container.className = `network-node ${
        isIntervalTone
          ? "is-interval-tone"
          : state.graphView === "mode-network" ? "is-network-watermark" : "is-mode-context"
      }`;
      container.style.left = `${node.x / 10}%`;
      container.style.top = `${(node.y / 620) * 100}%`;
      container.dataset.graphAxisFamily = latticeHorizontalAxisKey(node.exponents);
      if (state.displayMode !== "none" && (state.graphView !== "mode-network" || isIntervalTone)) {
        const label = document.createElement("span");
        label.className = "node-label";
        const content = hasInterval || overview
          ? createDisplayLabel(ratio, absoluteRatio(ratio))
          : createHejiPitch(state.selectedTonic, false);
        if (content) {
          label.append(content);
          container.append(label);
        }
      }
      container.append(isRoot ? createRootStar() : Object.assign(
        document.createElement("span"), { className: "node-dot" },
      ));
      configureSoundTrigger(container, ratio);
      elements.nodes.append(container);
      continue;
    }

    if (state.graphView !== "network" && state.catalog === "accords" && state.selectedTonic) {
      const ratio = node.aliases[0] ?? node.ratio;
      const isChordTone = catalogOverviewSelected("accords") || !state.selectedChordName || networkNodeIsChordTone(node);
      const implicitRoot = Boolean(
        isChordTone && currentChord()?.hiddenFundamental && node.aliases.includes("1/1"),
      );
      const tonicNode = node.aliases.includes(currentChordAnchorRatio());
      const container = document.createElement(implicitRoot ? "span" : "button");
      if (!implicitRoot) container.type = "button";
      container.className = `network-node ${
        isChordTone
          ? "is-chord-tone"
          : state.graphView === "mode-network" ? "is-network-watermark" : "is-mode-context"
      }${implicitRoot ? " is-implicit-root" : ""}`;
      container.style.left = `${node.x / 10}%`;
      container.style.top = `${(node.y / 620) * 100}%`;
      container.dataset.graphAxisFamily = latticeHorizontalAxisKey(node.exponents);
      if (state.displayMode !== "none" && (state.graphView !== "mode-network" || isChordTone)) {
        const label = document.createElement("span");
        label.className = "node-label";
        const content = createDisplayLabel(ratio, chordAbsoluteRatio(ratio));
        if (content) {
          label.append(content);
          container.append(label);
        }
      }
      container.append(tonicNode && !implicitRoot ? createRootStar() : Object.assign(
        document.createElement("span"), { className: "node-dot" },
      ));
      if (!implicitRoot) configureSoundTrigger(container, chordAudioRatio(ratio));
      elements.nodes.append(container);
      continue;
    }

    const isTonicLevel = !state.selectedTonic;
    const isCompositeSelection = state.graphView !== "mode-network"
      || networkNodeIsCurrentSelection(node);
    const container = document.createElement("button");
    container.className = `network-node${isTonicLevel ? " tonic-node" : ""}${
      isCompositeSelection ? "" : " is-network-watermark"
    }`;
    container.style.left = `${node.x / 10}%`;
    container.style.top = `${(node.y / 620) * 100}%`;
    container.dataset.graphAxisFamily = latticeHorizontalAxisKey(node.exponents);
    container.type = "button";

    const relativeRatio = node.ratio;
    const absolute = absoluteRatio(relativeRatio);
    if (state.displayMode !== "none" && isCompositeSelection) {
      const label = document.createElement("span");
      label.className = "node-label";
      const content = createDisplayLabel(relativeRatio, absolute);
      if (content) {
        label.append(content);
        container.append(label);
      }
    }

    const isRoot = !isTonicLevel && node.aliases.includes("1/1");
    container.append(isRoot ? createRootStar() : Object.assign(document.createElement("span"), { className: "node-dot" }));

    if (isTonicLevel) {
      const familyKey = TONIC_FAMILY_BY_RATIO.get(relativeRatio);
      const family = FAMILY_DEFINITIONS[familyKey];
      const notation = ratioToHeji(relativeRatio);
      container.title = `${relativeRatio} · ${plainHejiNote(notation)} · ${family.label}`;
      container.setAttribute(
        "aria-label",
        `Tonique ${relativeRatio}, ${plainHejiNote(notation)}, ${family.label}. Afficher ses hauteurs concordantes.`,
      );
      container.addEventListener("click", () => selectTonic(relativeRatio));
    } else {
      const notation = ratioToHeji(absolute);
      const octaveAlias = node.aliases.length > 1 ? ` · équivalent ${node.aliases.join(" / ")}` : "";
      container.title = `${relativeRatio} · ${plainHejiNote(notation)}${octaveAlias}`;
      configureSoundTrigger(container, relativeRatio);
    }

    elements.nodes.append(container);
  }
}

function renderSummary() {
  if (!state.selectedTonic || !state.selectedFamily) {
    elements.tonicMiniMap.replaceChildren();
    elements.tonicMenuPopover.replaceChildren();
    elements.selectionSummary.hidden = true;
    elements.selectionSummary.replaceChildren();
    return;
  }
  elements.selectionSummary.hidden = false;
  elements.selectionSummary.replaceChildren();
  renderTonicMiniMap();
  renderTonicMenu();

  const tonic = document.createElement("span");
  tonic.className = "summary-tonic";
  tonic.setAttribute("aria-label", `Tonique ${state.selectedTonic}`);
  tonic.append(createHejiPitch(state.selectedTonic, false));
  const caret = document.createElement("span");
  caret.className = "menu-caret";
  caret.setAttribute("aria-hidden", "true");
  elements.selectionSummary.append(tonic, caret);
  elements.selectionSummary.setAttribute(
    "aria-label",
    `Tonique ${plainHejiNote(ratioToHeji(state.selectedTonic))}. Ouvrir la liste des toniques.`,
  );
}

function renderHeadings(layout) {
  const selectedMode = selectedModeById();

  if (!state.selectedTonic || !state.selectedFamily) {
    elements.title.textContent = "Réseau des toniques";
    elements.primarySelection.hidden = true;
    elements.modeControl.hidden = true;
    elements.soundControls.hidden = true;
    elements.soundMuteButton.hidden = true;
    elements.tonicInstruction.hidden = false;
    elements.status.textContent = `${layout.nodes.filter((node) => !node.auxiliary).length} toniques distinctes dans l’octave.`;
    return;
  }

  elements.primarySelection.hidden = false;
  elements.modeControl.hidden = false;
  elements.soundControls.hidden = false;
  elements.soundMuteButton.hidden = false;
  elements.tonicInstruction.hidden = true;
  if (catalogOverviewSelected()) {
    const kind = { intervalles: "intervalles", accords: "accords", tetracordes: "tétracordes", modes: "modes" }[state.catalog];
    elements.title.textContent = "Tout";
    elements.status.textContent = `${layout.nodes.filter((node) => !node.auxiliary).length} hauteurs utilisées par les ${kind} disponibles.`;
    return;
  }
  if (state.catalog === "tetracordes") {
    const context = tetrachordContextForSelection();
    elements.title.textContent = context?.entry.code ?? "Tétracordes";
    elements.status.textContent = context
      ? `${context.entry.code}, quatre hauteurs en clair dans ${formatModeLabel(context.mode.label)} ; autres hauteurs en filigrane.`
      : "Aucun tétracorde disponible pour cette tonique dans le réseau actif.";
    return;
  }
  if (state.catalog === "intervalles") {
    const interval = intervalEntryForSelection();
    if (interval) {
      const context = intervalContextForSelection();
      elements.title.textContent = `${interval.proportion} — ${interval.intervalName}`;
      elements.status.textContent = `Intervalle ${interval.proportion}, ${Math.round(interval.cents)} cents, ${interval.intervalName}, dans ${context ? formatModeLabel(context.mode.label) : "un mode retenu"}.`;
    } else {
      elements.title.textContent = "Tonique";
      elements.status.textContent = `Tonique ${plainHejiNote(ratioToHeji(state.selectedTonic))}, sans intervalle sélectionné.`;
    }
    return;
  }
  if (state.catalog === "accords") {
    elements.title.textContent = state.selectedChordName ? chordDisplayName(state.selectedChordName) : "Tonique";
    const soundingCount = layout.nodes.filter((node) => (
      !node.auxiliary && !(currentChord()?.hiddenFundamental && node.aliases.includes("1/1"))
    )).length;
    elements.status.textContent = state.selectedChordName
      ? `${soundingCount} hauteurs distinctes, accord ${chordDisplayName(state.selectedChordName)}, tonique ${state.selectedTonic}.`
      : `Tonique ${plainHejiNote(ratioToHeji(state.selectedTonic))}, sans accord sélectionné.`;
    return;
  }
  if (selectedMode) {
    elements.title.textContent = formatModeLabel(selectedMode.label);
    elements.status.textContent = `${layout.nodes.filter((node) => !node.auxiliary).length} hauteurs distinctes, mode ${formatModeLabel(selectedMode.label)}, tonique ${state.selectedTonic}.`;
  } else {
    elements.title.textContent = "Tonique";
    elements.status.textContent = `Tonique ${plainHejiNote(ratioToHeji(state.selectedTonic))}, sans mode sélectionné.`;
  }
}

function renderGraphView() {
  const graphView = state.selectedTonic ? state.graphView : "mode";
  const showTonics = graphView === "tonics";
  elements.graphWorkspace.dataset.graphView = graphView;
  elements.graphViewSwitch.hidden = !state.selectedTonic;
  if (elements.graphViewSelect) {
    elements.graphViewSelect.value = graphView;
    elements.graphViewSelect.disabled = !state.selectedTonic;
  }
  const degreesAvailable = state.catalog === "modes" && ["mode", "mode-network"].includes(graphView);
  const degreeOption = elements.graphDisplaySelect?.querySelector('option[value="degrees"]');
  if (degreeOption) degreeOption.disabled = !degreesAvailable;
  if (elements.graphDisplaySelect) elements.graphDisplaySelect.value = state.displayMode;
  elements.selectionGraphPanel.hidden = showTonics;
  elements.tonicNetworkGraphPanel.hidden = !showTonics;
  elements.graphViewButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.graphView === graphView));
  });
}

let tableFifthsKeyboardSuspended = false;

function renderModeTableFifthControls() {
  const available = modeTableFifthsAvailable();
  elements.tableShowModeName.checked = state.tableShowModeName;
  elements.tableShowModeName.disabled = !available;
  elements.tableHeading.classList.toggle("visually-hidden", !(available && state.tableShowModeName));
  elements.tableFifthsControls.hidden = !available;
  for (const [count, minus, plus, output] of [
    [normalizedTableFifths(state.tableFifthsAbove), elements.tableFifthsAboveMinus, elements.tableFifthsAbovePlus, elements.tableFifthsAboveCount],
    [normalizedTableFifths(state.tableFifthsBelow), elements.tableFifthsBelowMinus, elements.tableFifthsBelowPlus, elements.tableFifthsBelowCount],
  ]) {
    output.textContent = String(count);
    minus.disabled = !available || count === 0;
    plus.disabled = !available || count === MAX_TABLE_FIFTHS;
  }
  const suspendKeyboard = modeTableHasFifthRows();
  if (suspendKeyboard && !tableFifthsKeyboardSuspended) stopKeyboardSounds();
  tableFifthsKeyboardSuspended = suspendKeyboard;
}


function positionModesSidebarToggle() {
  const toggle = elements.modesSidebarToggle;
  const layout = elements.modesLayout;
  if (!toggle || !layout || toggle.hidden || document.body.dataset.pageTab !== "modes") return;
  if (state.modesSidebarCollapsed) {
    // Barre du haut repliée : la commande se range dans la même bande, à droite de celle de la barre.
    const barCollapsed = document.querySelector?.(".app-bar")?.classList.contains("is-settings-collapsed");
    toggle.style.left = barCollapsed ? "40px" : "6px";
    toggle.style.top = barCollapsed ? "-30px" : "0px";
    return;
  }
  const host = layout.getBoundingClientRect();
  const reset = elements.primarySelection.querySelector("#page-refresh")?.getBoundingClientRect();
  toggle.style.left = reset ? `${reset.left - host.left - 28}px` : "8px";
  toggle.style.top = reset ? `${reset.top - host.top}px` : "8px";
}

function renderModesSidebar() {
  const toggle = elements.modesSidebarToggle;
  if (!toggle || !elements.modesLayout || !elements.primarySelection) return;
  const collapsed = state.modesSidebarCollapsed === true;
  elements.modesLayout.classList.toggle("is-sidebar-collapsed", collapsed);
  elements.primarySelection.inert = collapsed;
  toggle.hidden = !state.selectedTonic || elements.primarySelection.hidden;
  toggle.setAttribute("aria-expanded", String(!collapsed));
  const label = collapsed ? "Réouvrir le panneau de sélection" : "Replier le panneau de sélection";
  toggle.setAttribute("aria-label", label);
  toggle.title = label;
  requestAnimationFrame(positionModesSidebarToggle);
}

function setModesSidebarCollapsed(collapsed) {
  closeAllMenus();
  if (modulationColumnWindow.expanded) setModulationExpanded(false, { restoreFocus: false });
  state.modesSidebarCollapsed = Boolean(collapsed);
  renderModesSidebar();
  persistLatestOptions();
  scheduleGraphFit();
  requestAnimationFrame(updateTableTonicMarker);
  elements.modesSidebarToggle?.focus({ preventScroll: true });
}

function renderModesWindows() {
  if (!elements.showGraphPanel || !elements.showTablePanel || !elements.tableShowCents) return;
  syncSummaryTableVisibility();
  const showGraph = state.showGraphPanel;
  const showTable = state.showTablePanel && !elements.tableSection.hidden;
  const layout = showGraph ? (showTable ? "both" : "graph") : (showTable ? "table" : "none");
  elements.showGraphPanel.checked = state.showGraphPanel;
  elements.showTablePanel.checked = state.showTablePanel;
  elements.tableShowCents.checked = state.showTableCents;
  elements.tableShowChords.checked = state.tableShowChords;
  elements.tableShowRatios.checked = state.tableShowRatios;
  elements.tableShowTetrachords.checked = state.tableShowTetrachords;
  elements.tableShowIntervals.checked = state.tableShowIntervals;
  elements.graphWorkspace.hidden = !showGraph;
  elements.tableSection.classList.toggle("is-window-hidden", !showTable);
  elements.tableSection.inert = !showTable;
  elements.tableSection.dataset.showChords = String(state.tableShowChords);
  elements.tableSection.dataset.showRatios = String(state.tableShowRatios);
  elements.tableSection.dataset.showTetrachords = String(state.tableShowTetrachords);
  elements.tableSection.dataset.showIntervals = String(state.tableShowIntervals);
  renderModeTableFifthControls();
  if (elements.graphWorkspace.parentElement) {
    elements.graphWorkspace.parentElement.dataset.windowLayout = layout;
  }
  if (elements.modesWindowEmpty) elements.modesWindowEmpty.hidden = layout !== "none";
}

function syncSummaryTableVisibility() {
  if (!elements.summaryDocument) return;
  elements.summaryDocument.dataset.showChords = String(state.tableShowChords);
  elements.summaryDocument.dataset.showRatios = String(state.tableShowRatios);
  elements.summaryDocument.dataset.showTetrachords = String(state.tableShowTetrachords);
  elements.summaryDocument.dataset.showIntervals = String(state.tableShowIntervals);
}

let graphFitFrame = 0;

function graphFitTransform(bounds, width, height, maxScale = Infinity, heightFill = 1) {
  // A small ink/focus allowance, in screen pixels, not a second invisible canvas.
  const margin = 8;
  const widthScale = Math.max(1, width - margin * 2) / Math.max(1, bounds.width);
  const heightScale = Math.max(1, height - margin * 2) / Math.max(1, bounds.height);
  // Reserve space before deciding whether width or height limits the graph.
  // The limiting dimension can switch when the vertical axis is lengthened.
  const scale = Math.min(widthScale, heightScale * heightFill, maxScale);
  return {
    scale,
    x: (width - bounds.width * scale) / 2 - bounds.x * scale,
    y: (height - bounds.height * scale) / 2 - bounds.y * scale,
  };
}

function simonGraphHeightFill(stage) {
  if (state.graphSystem !== "simon" || stage.dataset.hasVerticalSpan !== "true") return 1;
  return Math.min(1, state.simonAxis5Length / 16);
}

function visibleGraphBounds(stage) {
  const origin = stage.getBoundingClientRect();
  // Exclude the SVG canvas, transparent hit areas and label layout wrappers.
  // Include the actual glyph boxes, including HEJI accidentals outside a label.
  const parts = stage.querySelectorAll([
    ".node-label", ".node-label *", ".node-dot", ".node-root-star",
    ".network-auxiliary-dot", ".network-lines line", ".tonic-mini-line",
    ".tonic-mini-marker", ".tonic-mini-label-content > *",
    ".tonic-mini-label-content > * *",
  ].join(","));
  const rects = [...parts].map((part) => part.getBoundingClientRect())
    .filter((rect) => rect.width || rect.height);
  if (!rects.length) return null;
  const left = Math.min(...rects.map((rect) => rect.left));
  const right = Math.max(...rects.map((rect) => rect.right));
  const top = Math.min(...rects.map((rect) => rect.top));
  const bottom = Math.max(...rects.map((rect) => rect.bottom));
  return { x: left - origin.left, y: top - origin.top, width: right - left, height: bottom - top };
}

function graphLabelInkBounds(label) {
  // Anchor the common text line, not the variable HEJI accidentals or cents.
  // DOM line boxes keep all letters of an axis family on the same baseline.
  const core = label.querySelector(".heji-note")
    || label.querySelector(".degree-text")
    || label.querySelector(".colorized-ratio")
    || label.querySelector(".undefined-heji");
  const rect = (core || label).getBoundingClientRect();
  return rect.width || rect.height
    ? { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right }
    : null;
}

function graphCenteredLabelTranslation(centerY, ink) {
  return centerY - (ink.top + ink.bottom) / 2;
}

function graphLabelTranslation({ centerY, ink, below }, dotRadius, scale) {
  const centered = graphCenteredLabelTranslation(centerY, ink);
  if (state.textOffset === 0) return centered;
  // Measure the common text line; accidentals never move a family member.
  // From 0 to 1 the label leaves the point continuously; afterward each
  // increment increases its clearance without changing the axis family side.
  const gap = Math.max(0, 7 + (calibratedGraphLabelOffset(state.textOffset) - 2) * 5) / scale;
  const halfHeight = (ink.bottom - ink.top) / 2;
  const distance = (halfHeight + dotRadius + gap) * Math.min(1, state.textOffset);
  return centered + (below ? distance : -distance);
}

function graphLabelCollisionBounds(label) {
  // Accidentals may paint outside the label's own rectangle. Measure the ink,
  // including the complete ratio or degree when one of those is displayed.
  const glyphs = label.querySelectorAll(
    ".heji-note, .heji-accidental, .cents-label, .colorized-ratio, .graph-degree-label, .undefined-heji",
  );
  const rects = [...glyphs].map((glyph) => glyph.getBoundingClientRect())
    .filter((rect) => rect.width && rect.height);
  if (!rects.length) rects.push(label.getBoundingClientRect());
  const padding = 3;
  const left = Math.min(...rects.map((rect) => rect.left)) - padding;
  const right = Math.max(...rects.map((rect) => rect.right)) + padding;
  const top = Math.min(...rects.map((rect) => rect.top)) - padding;
  const bottom = Math.max(...rects.map((rect) => rect.bottom)) + padding;
  return { x: left, y: top, width: right - left, height: bottom - top };
}

function applyTargetedLabelMasks(svg, labels, lineSelector, foregroundSelector) {
  if (!svg) return;
  svg.querySelector(":scope > .targeted-label-mask-layer")?.remove();
  if (!state.targetedLabelMask || !labels.length || !svg.getBoundingClientRect().width) return;

  const matrix = svg.getScreenCTM();
  if (!matrix) return;
  let inverse;
  try {
    inverse = matrix.inverse();
  } catch {
    return;
  }
  const toScreen = (x, y) => new DOMPoint(x, y).matrixTransform(matrix);
  const lines = [...svg.querySelectorAll(lineSelector)].map((line) => {
    const first = toScreen(Number(line.getAttribute("x1")), Number(line.getAttribute("y1")));
    const second = toScreen(Number(line.getAttribute("x2")), Number(line.getAttribute("y2")));
    return {
      first,
      second,
      left: Math.min(first.x, second.x),
      right: Math.max(first.x, second.x),
      top: Math.min(first.y, second.y),
      bottom: Math.max(first.y, second.y),
    };
  });
  if (!lines.length) return;

  const layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  layer.classList.add("targeted-label-mask-layer");
  layer.setAttribute("aria-hidden", "true");
  layer.setAttribute("pointer-events", "none");
  const surface = getComputedStyle(svg).getPropertyValue("--surface").trim() || "#fffefb";
  for (const label of labels) {
    const bounds = graphLabelCollisionBounds(label);
    if (!bounds.width || !bounds.height) continue;
    const intersects = lines.some(({ first, second, left, right, top, bottom }) => (
      right >= bounds.x && left <= bounds.x + bounds.width
      && bottom >= bounds.y && top <= bounds.y + bounds.height
      && tonicMiniSegmentHitsBounds(first, second, bounds)
    ));
    if (!intersects) continue;
    const corners = [
      [bounds.x, bounds.y],
      [bounds.x + bounds.width, bounds.y],
      [bounds.x, bounds.y + bounds.height],
      [bounds.x + bounds.width, bounds.y + bounds.height],
    ].map(([x, y]) => new DOMPoint(x, y).matrixTransform(inverse));
    const x = Math.min(...corners.map((corner) => corner.x));
    const y = Math.min(...corners.map((corner) => corner.y));
    const right = Math.max(...corners.map((corner) => corner.x));
    const bottom = Math.max(...corners.map((corner) => corner.y));
    const mask = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    mask.setAttribute("x", String(x));
    mask.setAttribute("y", String(y));
    mask.setAttribute("width", String(right - x));
    mask.setAttribute("height", String(bottom - y));
    mask.setAttribute("fill", surface);
    layer.append(mask);
  }
  if (!layer.childElementCount) return;
  const foreground = foregroundSelector ? svg.querySelector(foregroundSelector) : null;
  if (foreground) svg.insertBefore(layer, foreground);
  else svg.append(layer);
}

function updateLiveTargetedLabelMasks() {
  applyTargetedLabelMasks(
    elements.lines,
    [...elements.stage.querySelectorAll(".network-node .node-label")],
    "line",
    null,
  );
  const tonicSvg = elements.tonicMiniMap.querySelector("svg");
  applyTargetedLabelMasks(
    tonicSvg,
    [...elements.tonicMiniMap.querySelectorAll(".tonic-mini-label-content")],
    ".tonic-mini-line",
    ".tonic-mini-target, .tonic-mini-label-layer",
  );
}

function positionSummaryNetworkLabels(container) {
  container?.querySelectorAll(".summary-network-figure svg").forEach((svg) => {
    const viewHeight = svg.viewBox.baseVal.height;
    const scale = viewHeight ? svg.getBoundingClientRect().height / viewHeight : 0;
    if (!scale) return;
    svg.querySelectorAll(".summary-network-node").forEach((node) => {
      const label = node.querySelector("foreignObject");
      const point = node.querySelector(".summary-network-dot, .summary-network-root-star");
      if (!label || !point) return;
      const baseX = -Number(label.getAttribute("width")) / 2;
      const baseY = -Number(label.getAttribute("height")) / 2;
      label.setAttribute("x", String(baseX));
      label.setAttribute("y", String(baseY));
      const ink = graphLabelInkBounds(label);
      const matrix = node.getScreenCTM();
      if (!ink || !matrix) return;
      // The group's origin is the musical point, including the asymmetric star.
      const centerY = matrix.f;
      const relativeInk = {
        top: (ink.top - centerY) / scale,
        bottom: (ink.bottom - centerY) / scale,
      };
      label.setAttribute("x", String(baseX + (matrix.e - (ink.left + ink.right) / 2) / scale));
      label.setAttribute("y", String(baseY + graphLabelTranslation(
        { centerY: 0, ink: relativeInk, below: false }, 3.5, 1,
      )));
    });
  });
}

function updateSummaryTargetedLabelMasks() {
  positionSummaryNetworkLabels(elements.summaryDocument);
  elements.summaryDocument.querySelectorAll(".summary-network-figure svg").forEach((svg) => {
    applyTargetedLabelMasks(
      svg,
      [...svg.querySelectorAll(".summary-network-label")],
      ".summary-network-line",
      ".summary-network-node",
    );
  });
}

let summaryTargetedMaskFrame = 0;
function scheduleSummaryTargetedLabelMasks() {
  if (summaryTargetedMaskFrame) cancelAnimationFrame(summaryTargetedMaskFrame);
  summaryTargetedMaskFrame = requestAnimationFrame(() => {
    summaryTargetedMaskFrame = 0;
    updateSummaryTargetedLabelMasks();
  });
}







function positionGraphDetails(stage, scale) {
  const starRadius = 4.5 / scale;
  const dotRadius = 3.5 / scale;
  stage.style.setProperty("--graph-star-size", `${starRadius * 2}px`);
  stage.style.setProperty("--graph-star-stroke", `${1.2 / scale}px`);
  stage.style.setProperty("--graph-dot-size", `${dotRadius * 2}px`);
  stage.style.setProperty("--graph-dot-stroke", `${1 / scale}px`);
  stage.style.setProperty("--graph-auxiliary-size", `${7 / scale}px`);
  stage.querySelectorAll(".tonic-mini-dot").forEach((dot) => {
    dot.setAttribute("r", String(dotRadius - 0.5 / scale));
  });
  stage.querySelectorAll(".tonic-mini-star").forEach((star) => {
    star.setAttribute("points", starPolygonPoints(
      Number(star.dataset.centerX), Number(star.dataset.centerY), starRadius, starRadius * 0.42,
    ));
  });
  stage.querySelectorAll(".network-node.is-label-below").forEach((node) => node.classList.remove("is-label-below"));
  const labels = [];
  const collectLabel = (label, anchor, below = false) => {
    if (!label || !anchor) return;
    label.style.translate = "0 0";
    const ink = graphLabelInkBounds(label);
    const point = anchor.getBoundingClientRect();
    if (!ink || (!point.width && !point.height)) return;
    labels.push({ element: label, centerX: point.left + point.width / 2, centerY: point.top + point.height / 2, ink, below });
  };
  stage.querySelectorAll(".network-node").forEach((node) => {
    collectLabel(
      node.querySelector(".node-label"),
      node,
      node.classList.contains("is-label-below"),
    );
  });
  stage.querySelectorAll(".tonic-mini-label").forEach((label) => {
    const anchor = stage.querySelector(`.tonic-mini-target[data-node-index="${label.dataset.nodeIndex}"] .tonic-mini-hit`);
    collectLabel(label.querySelector(".tonic-mini-label-content"), anchor, label.classList.contains("is-below"));
  });
  labels.forEach((label) => {
    const translation = graphLabelTranslation(label, dotRadius, scale);
    const horizontal = label.centerX - (label.ink.left + label.ink.right) / 2;
    label.element.style.translate = `${horizontal}px ${translation}px`;
  });
  // No collision pass: each label remains anchored to its musical point.
}

function fitGraphsToWorkspace() {
  graphFitFrame = 0;
  if (!elements.graphWorkspace || !state.selectedTonic) {
    elements.stage.style.removeProperty("transform");
    elements.stage.style.removeProperty("--graph-label-font-size");
    elements.stage.style.removeProperty("--graph-star-size");
    elements.stage.style.removeProperty("--graph-star-stroke");
    elements.stage.style.removeProperty("--graph-dot-size");
    elements.stage.style.removeProperty("--graph-dot-stroke");
    elements.stage.style.removeProperty("--graph-auxiliary-size");
    updateLiveTargetedLabelMasks();
    return;
  }
  for (const [panel, stage] of [
    [elements.selectionGraphPanel, elements.stage],
    [elements.tonicNetworkGraphPanel, elements.tonicMiniMap],
  ]) {
    if (panel.hidden) continue;
    const viewport = panel.getBoundingClientRect();
    if (viewport.width < 1 || viewport.height < 1) continue;
    stage.style.transform = "none";
    const markerCount = stage.querySelectorAll(".network-node, .tonic-mini-marker").length;
    const maxScale = markerCount <= 1 ? 1 : Infinity;
    const heightFill = simonGraphHeightFill(stage);
    // Both views use the same on-screen type size, independent of drawing scale.
    // Refit with the actual label boxes so larger text cannot escape the frame.
    const targetFontSize = graphLabelTargetFontSize(state.displayMode);
    let scale = 1;
    let fit;
    for (let iteration = 0; iteration < 12; iteration += 1) {
      stage.style.setProperty("--graph-label-font-size", `${targetFontSize / scale}px`);
      positionGraphDetails(stage, scale);
      const bounds = visibleGraphBounds(stage);
      if (!bounds) break;
      fit = graphFitTransform(bounds, viewport.width, viewport.height, maxScale, heightFill);
      if (Math.abs(fit.scale - scale) < 0.0001) break;
      scale = fit.scale;
    }
    if (!fit) continue;
    stage.style.transform = `translate(${fit.x}px, ${fit.y}px) scale(${fit.scale})`;
  }
  updateLiveTargetedLabelMasks();
}

function scheduleGraphFit() {
  if (graphFitFrame) cancelAnimationFrame(graphFitFrame);
  graphFitFrame = requestAnimationFrame(fitGraphsToWorkspace);
}

function render() {
  if (
    state.displayMode === "degrees"
    && (state.catalog !== "modes" || !["mode", "mode-network"].includes(state.graphView))
  ) setDisplayMode("heji");
  ensureCurrentModeSelection();
  document.body.classList.toggle("has-selection", Boolean(state.selectedTonic));
  document.body.classList.toggle("has-mode-selection", Boolean(
    state.selectedTonic && (
      state.catalog === "intervalles"
        ? state.intervalSelection
        : state.catalog === "tetracordes"
          ? state.tetrachordSelection
        : state.catalog === "accords"
          ? state.selectedChordName
          : state.selectedModeId
    ),
  ));
  document.body.dataset.catalog = state.catalog;
  const functionView = state.catalog === "accords" && currentChord()
    ? buildChordFunctionAnalysis()
    : null;
  const intervalFunctionView = state.catalog === "intervalles" && intervalEntryForSelection()
    ? buildIntervalFunctionAnalysis()
    : null;
  const tetrachordFunctionView = state.catalog === "tetracordes"
    ? buildTetrachordFunctionAnalysis()
    : null;
  recordNavigationState();
  updateHistoryNavigation();
  const ratios = activeRatios();
  applyAutomaticConnectionLevel(ratios);
  const modeForegroundRatios = state.catalog === "modes"
    ? state.connectionLevel >= 2 && (["network", "mode-network"].includes(state.graphView) || !selectedModeById())
      ? ratios
      : ["mode", "mode-network"].includes(state.graphView)
        ? foregroundGraphRatios()
        : []
    : [];
  const modalPlan = state.catalog === "modes"
    ? modalConnectionPlan(modeForegroundRatios, state.connectionLevel)
    : null;
  modalSupplementalEdgeKeys = modalPlan?.highlightedEdgeKeys ?? new Set();
  const foregroundModalPlan = state.catalog === "modes" && state.graphView === "mode-network" && selectedModeById()
    ? modalConnectionPlan(foregroundGraphRatios(), state.connectionLevel)
    : modalPlan;
  modalForegroundEdgeKeys = foregroundModalPlan?.highlightedEdgeKeys ?? new Set();
  modalSupplementalNodeKeys = new Set(foregroundModalPlan?.auxiliaryExponents.map(latticeExponentKey) ?? []);
  updateCompositeSelectionMembership();
  const layout = state.catalog === "modes"
    ? buildLatticeLayout(ratios, 1, modalPlan?.auxiliaryExponents ?? [])
    : buildLatticeLayout(ratios, state.connectionLevel, chordSpecificAuxiliaryExponents());
  if (state.catalog === "modes") appendModalSupplementalEdges(layout, modalPlan);
  elements.stage.dataset.hasVerticalSpan = String(layoutHasVerticalSpan(layout));
  const modulationView = state.catalog === "modes" ? buildModulationAnalysis() : null;
  renderLines(layout);
  renderNodes(layout);
  renderSummary();
  renderModeRotationControl();
  renderHeadings(layout);
  renderGraphView();
  renderModulationControls(modulationView, functionView, intervalFunctionView, tetrachordFunctionView);
  renderModeTable();
  renderModesWindows();
  if (elements.modesSidebarToggle) renderModesSidebar();
  renderSelectionNavigation();
  renderTonicNavigation();
  const scale = (state.textSize / 2) * (state.selectedTonic ? 0.96 : 1);
  elements.stage.style.setProperty("--network-node-scale", String(scale));
  elements.stage.style.setProperty("--network-text-scale", String(scale));
  // Keep side-of-axis decisions stable while the distance control changes.
  elements.stage.style.setProperty("--network-label-offset", `${calibratedGraphLabelOffset(2) * 5}px`);
  elements.stage.classList.toggle("is-label-offset-zero", state.textOffset === 0);
  elements.tonicMiniMap.classList.toggle("is-label-offset-zero", state.textOffset === 0 && state.displayMode !== "none");
  renderGlobalToolbar();
  syncGraphOptions();
  elements.targetedLabelMask.checked = state.targetedLabelMask;
  if (document.body.dataset.pageTab === "summary") renderNetworkSummaryDocument();
  elements.connectionButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(Number(button.dataset.connectionLevel) === state.connectionLevel),
    );
  });
  elements.audioInstrument.value = state.audioInstrument;
  document.querySelectorAll("[data-harmonic-view]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.harmonicView === state.catalog));
  });
  refreshSoundingIndicators();
  persistLatestOptions();
  requestAnimationFrame(() => {
    updateTableTonicMarker();
    elements.scroll.scrollLeft = Math.max(0, (elements.scroll.scrollWidth - elements.scroll.clientWidth) / 2);
    fitGraphsToWorkspace();
  });
}

function cloneNavigationValue(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function harmonicNavigationSnapshot() {
  return {
    catalog: state.catalog,
    functionPreview: cloneNavigationValue(state.functionPreview),
    functionSelectionKey: state.functionSelectionKey,
    functionSelectionSource: state.functionSelectionSource,
    intervalAnchorTonic: state.intervalAnchorTonic,
    intervalChordContext: cloneNavigationValue(state.intervalChordContext),
    intervalFunctionPreview: cloneNavigationValue(state.intervalFunctionPreview),
    intervalFunctionSelectionKey: state.intervalFunctionSelectionKey,
    intervalFunctionSelectionSource: state.intervalFunctionSelectionSource,
    intervalModeContext: cloneNavigationValue(state.intervalModeContext),
    intervalSelection: state.intervalSelection,
    tetrachordSelection: state.tetrachordSelection,
    tetrachordModeContext: cloneNavigationValue(state.tetrachordModeContext),
    tetrachordFunctionPreview: cloneNavigationValue(state.tetrachordFunctionPreview),
    modeOriginContext: cloneNavigationValue(state.modeOriginContext),
    modulationAnchor: cloneNavigationValue(state.modulationAnchor),
    modulationPreview: cloneNavigationValue(state.modulationPreview),
    selectedChordName: state.selectedChordName,
    selectedFamily: state.selectedFamily,
    selectedModeId: state.selectedModeId,
    selectedTonic: state.selectedTonic,
    selectedVariantIndex: state.selectedVariantIndex,
  };
}

function recordNavigationState() {
  if (navigationHistory.restoring) return;
  const snapshot = harmonicNavigationSnapshot();
  const key = JSON.stringify(snapshot);
  const current = navigationHistory.entries[navigationHistory.index];
  if (current?.key === key) return;
  navigationHistory.entries.splice(navigationHistory.index + 1);
  navigationHistory.entries.push({ key, snapshot });
  navigationHistory.index = navigationHistory.entries.length - 1;
}

function updateHistoryNavigation() {
  elements.historyBack.disabled = navigationHistory.index <= 0;
  elements.historyForward.disabled = navigationHistory.index >= navigationHistory.entries.length - 1;
}

function navigateSelectionHistory(direction) {
  const nextIndex = navigationHistory.index + direction;
  const entry = navigationHistory.entries[nextIndex];
  if (!entry) return;
  stopAllSounds();
  navigationHistory.restoring = true;
  navigationHistory.index = nextIndex;
  Object.assign(state, cloneNavigationValue(entry.snapshot));
  // History stores selections, not network permissions. A previous selection
  // must not re-enable harmonics since unchecked in the active configuration.
  if (
    !TONIC_RATIO_SET.has(state.selectedTonic)
    || (state.catalog === "modes" && state.selectedModeId !== ALL_SELECTION_ID
      && !networkAdmitsModeAtTonic(state.selectedTonic, selectedModeById()))
  ) reconcileSelectionWithNetwork();
  closeAllMenus();
  populateSelectionMenu();
  render();
  navigationHistory.restoring = false;
  updateHistoryNavigation();
}

function genericModeIdFromPresetId(presetId) {
  return presetId.split("-").slice(0, 2).join("-");
}

function currentSelectionSnapshot() {
  return {
    selectedFamily: state.selectedFamily,
    selectedModeId: state.selectedModeId,
    selectedTonic: state.selectedTonic,
  };
}

function setModeOriginContext(context) {
  state.modeOriginContext = context?.selectedModeId
    ? {
      selectedFamily: context.selectedFamily,
      selectedModeId: context.selectedModeId,
      selectedTonic: context.selectedTonic,
    }
    : null;
}

function clearModeOriginContext() {
  state.modeOriginContext = null;
}

function modeOriginContextSelection() {
  const context = state.modeOriginContext;
  if (!context?.selectedModeId || !context.selectedTonic) return null;
  const mode = selectedModeById(context.selectedModeId);
  const familyKey = TONIC_FAMILY_BY_RATIO.get(context.selectedTonic);
  const family = FAMILY_DEFINITIONS[familyKey];
  const forcedByInterval = state.intervalChordContext
    && state.intervalChordContext.modeId === mode?.id
    && state.intervalChordContext.modeTonic === context.selectedTonic;
  return mode && family && (forcedByInterval || networkAdmitsModeAtTonic(context.selectedTonic, mode))
    ? { familyKey, mode, tonic: context.selectedTonic }
    : null;
}

function seedChordFunctionPreviewFromModeContext(context) {
  const mode = context?.selectedModeId
    ? selectedModeById(context.selectedModeId)
    : null;
  const chord = currentChord();
  const variant = currentChordVariant();
  if (!mode || !chord || !variant || !context.selectedTonic || !state.selectedTonic) return;
  const degreeRatio = divideAndReduce(state.selectedTonic, context.selectedTonic);
  const degreeIndex = mode.ratios.slice(0, 7).findIndex((ratio) => ratio === degreeRatio);
  const chordRatios = chordFunctionRatios(chord, variant);
  if (degreeIndex < 0 || !chordOccursOnModeDegree(mode, degreeRatio, chordRatios)) return;
  const degreeLabel = modeDegreeLabel(degreeRatio, degreeIndex);
  state.functionSelectionKey = degreeLabel;
  state.functionSelectionSource = `${state.selectedChordName}::${state.selectedVariantIndex}`;
  state.functionPreview = {
    degreeKey: degreeLabel,
    degreeLabel,
    degreeRatio,
    modeId: mode.id,
    modeTonic: context.selectedTonic,
    pending: false,
  };
}

function buildModulationAnalysis() {
  const source = state.modulationAnchor ?? currentSelectionSnapshot();
  if (
    !source.selectedModeId
    || source.selectedModeId === ALL_SELECTION_ID
    || !modeConnectionApi
    || !genericModeCatalog.length
  ) {
    return null;
  }
  const tonicPitchClass = ratioToHeji(source.selectedTonic)?.referenceSemitone;
  if (!Number.isInteger(tonicPitchClass)) return null;
  const analysis = modeConnectionApi.calculateModeConnections({
    catalog: genericModeCatalog,
    sourceMode: genericModeIdFromPresetId(source.selectedModeId),
    sourceTonicPitchClass: tonicPitchClass,
    includeTonicAlterations: false,
  });
  return { analysis, source };
}

function chordFunctionRatios(chord, variant) {
  return modeChordApi.normalizedVariantRatios(chord, variant);
}

function chordOccursOnModeDegree(mode, degreeRatio, chordRatios) {
  const modeRatios = new Set(mode.ratios.slice(0, 7));
  return chordRatios.every((ratio) => modeRatios.has(multiplyAndReduce(degreeRatio, ratio)));
}

function canonicalModeModelLabel(value) {
  return formatModeLabel(value)
    .replace(/^Majeur harmonique\b/, "Majeure harmonique")
    .replace(/^Lydien dominant ♭6\b/, "Lydien dom. ♭6");
}

function chordFunctionModeName(row) {
  return modeFamilyAbbreviationFromName(row.family);
}

function chordFunctionQuality(chordName) {
  if (["mb5", "smb5", "m7b5"].includes(chordName)) return "diminished";
  if (["#5", "maj7#5"].includes(chordName)) return "augmented";
  if (/^(?:m|sm)/.test(chordName) && !/^maj/.test(chordName)) return "minor";
  return "major";
}

function intervalFunctionDegreeLabel(degreeLabel) {
  const match = degreeLabel.match(/^([♭♯]*)(\d+)$/);
  if (!match) return degreeLabel;
  const romans = new Map([
    [1, "I"], [2, "II"], [3, "III"], [4, "IV"],
    [5, "V"], [6, "VI"], [7, "VII"], [8, "I"],
  ]);
  return `${match[1]}${romans.get(Number(match[2])) ?? match[2]}`;
}

function chordFunctionDegreeLabel(degreeLabel) {
  const match = degreeLabel.match(/^([♭♯]*)(\d+)$/);
  if (!match) return degreeLabel;
  const romans = new Map([
    [1, "I"], [2, "II"], [3, "III"], [4, "IV"],
    [5, "V"], [6, "VI"], [7, "VII"], [8, "I"],
  ]);
  const quality = chordFunctionQuality(state.selectedChordName);
  let numeral = romans.get(Number(match[2])) ?? match[2];
  if (quality === "minor" || quality === "diminished") numeral = numeral.toLowerCase();
  const suffix = quality === "augmented" ? "+" : quality === "diminished" ? "°" : "";
  return `${match[1]}${numeral}${suffix}`;
}

function compareIntervalFunctionContexts(first, second) {
  return (
    Number(second.mode.family === MODE_GROUP_DEFAULT_FAMILIES.get(second.mode.group))
      - Number(first.mode.family === MODE_GROUP_DEFAULT_FAMILIES.get(first.mode.group))
    || modeLimitNumber(first.mode) - modeLimitNumber(second.mode)
    || first.groupIndex - second.groupIndex
    || first.familyIndex - second.familyIndex
    || first.presetIndex - second.presetIndex
  );
}

function buildIntervalFunctionAnalysis() {
  const entry = intervalEntryForSelection();
  const anchorTonic = state.intervalAnchorTonic || state.selectedTonic;
  if (!entry || !anchorTonic) return null;
  const candidates = intervalContextCandidates(entry.id, anchorTonic);
  if (!candidates.length) return { degrees: [], entry };
  const source = `${entry.id}::${anchorTonic}`;
  const previewContext = candidates.find((candidate) => (
    intervalFunctionPreviewMatchesContext(state.intervalFunctionPreview, candidate)
  ));
  if (state.intervalFunctionSelectionSource !== source || !previewContext) {
    state.intervalFunctionSelectionSource = source;
    state.intervalFunctionPreview = null;
    state.intervalFunctionPreviewAnchor = null;
    const defaultContext = intervalContextForSelection(entry.id, anchorTonic);
    state.intervalFunctionPreview = intervalFunctionPreviewFromContext(defaultContext, false);
    state.intervalFunctionSelectionKey = defaultContext
      ? modeDegreeLabel(defaultContext.lowerRatio, defaultContext.lowerIndex)
      : "";
  }

  const degreesByLabel = new Map();
  candidates.forEach((context) => {
    const label = modeDegreeLabel(context.lowerRatio, context.lowerIndex);
    let degree = degreesByLabel.get(label);
    if (!degree) {
      degree = {
        key: label,
        label,
        modeGroups: [],
        modeGroupsByKey: new Map(),
      };
      degreesByLabel.set(label, degree);
    }
    const modeGroupKey = `${context.groupIndex}-${context.familyIndex}`;
    let modeGroup = degree.modeGroupsByKey.get(modeGroupKey);
    if (!modeGroup) {
      modeGroup = {
        family: context.mode.family,
        group: context.mode.group,
        occurrences: [],
        occurrenceKeys: new Set(),
      };
      degree.modeGroupsByKey.set(modeGroupKey, modeGroup);
      degree.modeGroups.push(modeGroup);
    }
    const occurrenceKey = `${context.mode.id}|${context.modeTonic}|${context.lowerIndex}|${context.upperIndex}`;
    if (!modeGroup.occurrenceKeys.has(occurrenceKey)) {
      modeGroup.occurrenceKeys.add(occurrenceKey);
      modeGroup.occurrences.push(context);
    }
  });

  const degrees = [...degreesByLabel.values()].map((degree) => {
    degree.modeGroups.forEach((modeGroup) => {
      modeGroup.occurrences.sort(compareIntervalFunctionContexts);
      delete modeGroup.occurrenceKeys;
    });
    delete degree.modeGroupsByKey;
    return degree;
  }).sort((first, second) => (
    modeSlot(first.label, MODE_TABLE_SLOTS)[0] - modeSlot(second.label, MODE_TABLE_SLOTS)[0]
    || first.label.localeCompare(second.label, "fr")
  ));
  if (!degrees.some((degree) => degree.key === state.intervalFunctionSelectionKey)) {
    const current = intervalContextForSelection(entry.id, anchorTonic);
    state.intervalFunctionSelectionKey = current
      ? modeDegreeLabel(current.lowerRatio, current.lowerIndex)
      : degrees[0]?.key ?? "";
  }
  return { degrees, entry };
}

function buildChordFunctionAnalysis() {
  const chord = currentChord();
  const variant = currentChordVariant();
  if (!chord || !variant) return null;
  const chordRatios = chordFunctionRatios(chord, variant);
  const modelLabel = canonicalModeModelLabel(currentChordModeModel());
  const degreesByLabel = new Map();

  MODE_GROUPS.forEach((group, groupIndex) => {
    group.families.forEach((family, familyIndex) => {
      family.presets.forEach((preset, presetIndex) => {
        const mode = MODE_PRESETS.find((candidate) => candidate.id === `${groupIndex}-${familyIndex}-${presetIndex}`);
        if (!mode) return;
        const degrees = mode.ratios.slice(0, 7).map((ratio, index) => ({
          label: modeDegreeLabel(ratio, index),
          ratio,
        })).filter(({ ratio }) => chordOccursOnModeDegree(mode, ratio, chordRatios));
        if (!degrees.length) return;
        degrees.forEach(({ label, ratio }) => {
          let degree = degreesByLabel.get(label);
          if (!degree) {
            degree = {
              key: label,
              label,
              modeGroups: [],
              modeGroupsByKey: new Map(),
            };
            degreesByLabel.set(label, degree);
          }
          const modeGroupKey = `${groupIndex}-${familyIndex}`;
          let modeGroup = degree.modeGroupsByKey.get(modeGroupKey);
          if (!modeGroup) {
            modeGroup = {
              family: family.label,
              group: group.label,
              isCharacteristic: false,
              occurrences: [],
            };
            degree.modeGroupsByKey.set(modeGroupKey, modeGroup);
            degree.modeGroups.push(modeGroup);
          }
          modeGroup.occurrences.push({ degreeRatio: ratio, mode });
        });
      });
    });
  });

  const degrees = [...degreesByLabel.values()].map((degree) => {
    degree.isLocked = CHORDS_WITH_LOCKED_TONIC_FUNCTION.has(state.selectedChordName)
      && degree.label === "1";
    degree.modeGroups = degree.modeGroups.filter((modeGroup) => (
      selectableChordFunctionOccurrences(modeGroup).length > 0
    ));
    degree.modeGroups.forEach((modeGroup) => {
      modeGroup.isCharacteristic = degree.label === "1" && modeGroup.occurrences.some(({ mode }) => (
        canonicalModeModelLabel(mode.label) === modelLabel
      ));
    });
    delete degree.modeGroupsByKey;
    return degree;
  }).filter((degree) => degree.modeGroups.length > 0).sort((first, second) => (
    modeSlot(first.label, MODE_TABLE_SLOTS)[0] - modeSlot(second.label, MODE_TABLE_SLOTS)[0]
    || first.label.localeCompare(second.label, "fr")
  ));
  const source = `${state.selectedChordName}::${state.selectedVariantIndex}`;
  if (
    state.functionSelectionSource !== source
    || !degrees.some((degree) => (
      degree.key === state.functionSelectionKey
      && !degree.isLocked
      && degree.modeGroups.length > 0
    ))
  ) {
    state.functionPreview = null;
    state.functionPreviewAnchor = null;
    state.functionSelectionSource = source;
    const selectableDegrees = degrees.filter((degree) => !degree.isLocked && degree.modeGroups.length > 0);
    state.functionSelectionKey = selectableDegrees.find((degree) => degree.label === "1")?.key
      ?? selectableDegrees.find((degree) => degree.modeGroups.some((modeGroup) => modeGroup.isCharacteristic))?.key
      ?? selectableDegrees[0]?.key
      ?? "";
  }
  if (!state.functionPreview) {
    const selectedDegree = degrees.find((degree) => degree.key === state.functionSelectionKey);
    const contextDegree = degrees.find((degree) => (
      degree.label === "1" && degree.modeGroups.some((modeGroup) => modeGroup.isCharacteristic)
    )) ?? selectedDegree;
    const defaultOccurrence = contextDegree?.modeGroups
      .slice()
      .sort((first, second) => Number(second.isCharacteristic) - Number(first.isCharacteristic))
      .map((modeGroup) => preferredChordFunctionOccurrence(modeGroup))
      .find(Boolean);
    if (contextDegree && defaultOccurrence) {
      state.functionPreview = {
        degreeKey: contextDegree.key,
        degreeLabel: contextDegree.label,
        degreeRatio: defaultOccurrence.degreeRatio,
        modeId: defaultOccurrence.mode.id,
        modeTonic: defaultOccurrence.modeTonic,
        pending: false,
      };
    }
  }
  return { degrees };
}

function alteredDegreeLabel(sourceDegreeLabel, direction) {
  const match = sourceDegreeLabel.match(/^([♭♯]*)(\d+)$/);
  if (!match) return sourceDegreeLabel;
  const accidentalValue = [...match[1]].reduce(
    (value, accidental) => value + (accidental === "♯" ? 1 : -1),
    0,
  ) + direction;
  const accidental = accidentalValue > 0
    ? "♯".repeat(accidentalValue)
    : "♭".repeat(Math.abs(accidentalValue));
  return `${accidental}${match[2]}`;
}

function destinationDegreeLabel(mutation) {
  const parallelTarget = mutation.targets.find((target) => target.connectionType === "parallel");
  const parallelMode = parallelTarget
    ? genericModeCatalog.find((mode) => mode.id === parallelTarget.modeId)
    : null;
  if (parallelMode) return parallelMode.degrees[mutation.sourceDegreeIndex - 1];
  // Hors modulation parallèle, le degré reste relatif à la tonique source.
  // Ainsi, ré lydien E → E♯ s'écrit bien 2 ↗ ♯2, jamais 2 → ♭3.
  return alteredDegreeLabel(mutation.sourceDegreeLabel, mutation.direction);
}

function signedFifthDistance(sourcePitchClass, targetPitchClass) {
  for (let steps = 0; steps < 12; steps += 1) {
    if (positiveModulo(sourcePitchClass + steps * 7, 12) !== targetPitchClass) continue;
    return steps > 6 ? steps - 12 : steps;
  }
  return 0;
}

function appendModulationChange(container, fromDegree, toDegree, direction) {
  const from = document.createElement("span");
  const arrow = document.createElement("span");
  const to = document.createElement("span");
  appendDegreeLabel(from, fromDegree);
  arrow.className = "modulation-change-arrow";
  arrow.textContent = direction > 0 ? "↗" : "↘";
  appendDegreeLabel(to, toDegree);
  container.append(from, arrow, to);
}

function collectModulationEntries(analysis, sourceSelection) {
  const entries = [];
  const seen = new Set();
  for (const mutation of analysis.mutations) {
    const destinationDegree = destinationDegreeLabel(mutation);
    for (const target of mutation.targets) {
      if (!modulationTonicPitchClassIsIncluded(target.modeName, target.tonicPitchClass)) continue;
      const selection = resolveModulationTarget(target, sourceSelection);
      if (!selection) continue;
      const fifthDistance = signedFifthDistance(analysis.source.tonicPitchClass, target.tonicPitchClass);
      const key = [
        mutation.sourceDegreeIndex,
        mutation.direction,
        destinationDegree,
        target.modeId,
        selection.selectedTonic,
      ].join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ mutation, destinationDegree, target, fifthDistance, selection });
    }
  }
  return entries;
}

function collectEquivalentModulationEntries(analysis, sourceSelection) {
  const sourcePitchClass = ratioToHeji(sourceSelection.selectedTonic)?.referenceSemitone;
  if (!Number.isInteger(sourcePitchClass)) return [];
  const entries = [];
  const seen = new Set();
  for (const target of analysis.equivalent ?? []) {
    if (target.tonicPitchClass === sourcePitchClass) continue;
    if (!modulationTonicPitchClassIsIncluded(target.modeName, target.tonicPitchClass)) continue;
    const selection = resolveModulationTarget(target, sourceSelection);
    if (!selection) continue;
    const key = [target.modeId, selection.selectedTonic].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push({
      fifthDistance: signedFifthDistance(sourcePitchClass, target.tonicPitchClass),
      selection,
      target,
    });
  }
  return entries;
}

function modePresetsForGenericMode(genericModeId) {
  return MODE_PRESETS
    .filter((mode) => genericModeIdFromPresetId(mode.id) === genericModeId)
    .sort(compareModeVariants);
}

function networkConcordanceIsEnabled(
  ratio,
  configuration = appliedNetworkConfiguration,
) {
  return !NETWORK_CONCORDANCE_RATIO_SET.has(ratio)
    || configuration.concordances?.includes(ratio);
}

function ratiosUseEnabledNetworkConcordances(
  ratios,
  configuration = appliedNetworkConfiguration,
) {
  return ratios.every((ratio) => (
    ratio === "1/1"
    || ratio === "2/1"
    || networkConcordanceIsEnabled(ratio, configuration)
  ));
}

function networkContainsRatiosAtTonic(
  ratios,
  tonic,
  configuration = appliedNetworkConfiguration,
  options = undefined,
) {
  if (!tonicIsAvailableInNetwork(tonic, configuration, options)) return false;
  if (configuration.sourceMethod === "scala") {
    return importedNetworkContains(ratios, tonic, configuration);
  }
  const pitches = fullNetworkPitchSet(configuration);
  return ratios.every((ratio) => pitches.has(multiplyAndReduce(tonic, ratio)));
}

function networkAllowsModeFunctionsAtTonic(tonic, mode, configuration) {
  // Une saisie libre n'a pas de familles fonctionnelles : seules ses hauteurs
  // explicites déterminent les modes possibles.
  if (configuration.sourceMethod === "scala") return true;
  // Une tonique commune à plusieurs familles suit le même ordre de priorité
  // que l'index des toniques et les menus du Réseau.
  const familyKey = NETWORK_FAMILY_ORDER.find((key) => (
    configuration.families?.[key]?.enabled
    && configuration.families[key].selectedTonics?.includes(tonic)
  ));
  if (!familyKey) return false;
  const functions = configuration.families[familyKey].functions ?? [];
  return mode.ratios.every((ratio) => (
    !OPTIONAL_MODAL_FUNCTION_RATIOS.includes(ratio) || functions.includes(ratio)
  ));
}

function networkAdmitsModeAtTonic(
  tonic,
  mode,
  configuration = appliedNetworkConfiguration,
  options = undefined,
) {
  return Boolean(
    mode
    && !configuration.excludedModeIds?.includes(mode.id)
    && networkAllowsModeFunctionsAtTonic(tonic, mode, configuration)
    && networkContainsRatiosAtTonic(mode.ratios, tonic, configuration, options)
    && ratiosUseEnabledNetworkConcordances(mode.ratios, configuration)
  );
}

function exactModePitchSet(selection, mode) {
  return new Set(mode.ratios.slice(0, 7).map((ratio) => (
    multiplyAndReduce(selection.selectedTonic, ratio)
  )).filter(Boolean));
}

function modePitchClassSetKey(selection, mode) {
  const tonicPitchClass = ratioToHeji(selection.selectedTonic)?.referenceSemitone;
  if (!Number.isInteger(tonicPitchClass)) return "";
  const structuralMode = genericModeCatalog.find((candidate) => (
    candidate.id === genericModeIdFromPresetId(mode.id)
  ));
  const relativePitchClasses = structuralMode?.pitchClasses ?? mode.ratios.slice(0, 7).map((ratio, index) => (
    positiveModulo(degreeFifthGeneratorDistance(modeDegreeLabel(ratio, index)) * 7, 12)
  ));
  const pitchClasses = relativePitchClasses.map((pitchClass) => (
    positiveModulo(tonicPitchClass + pitchClass, 12)
  ));
  if (new Set(pitchClasses).size !== 7) return "";
  return [...new Set(pitchClasses)].sort((first, second) => first - second).join("|");
}

function exactCommonPitchCount(sourceSelection, sourceMode, targetSelection, targetMode) {
  const sourcePitches = exactModePitchSet(sourceSelection, sourceMode);
  return [...exactModePitchSet(targetSelection, targetMode)]
    .filter((pitch) => sourcePitches.has(pitch))
    .length;
}

function tonicRatiosForPitchClass(pitchClass) {
  return [...new Set(TONIC_RATIOS)].filter((ratio) => (
    ratioToHeji(ratio)?.referenceSemitone === pitchClass
  ));
}

function resolveModulationTarget(
  target,
  sourceSelection = state.modulationAnchor ?? currentSelectionSnapshot(),
) {
  const sourceMode = MODE_PRESETS.find((mode) => mode.id === sourceSelection.selectedModeId);
  if (!sourceMode) return null;
  const modes = modePresetsForGenericMode(target.modeId);
  const tonicRatios = tonicRatiosForPitchClass(target.tonicPitchClass);
  const candidates = tonicRatios.flatMap((ratio) => {
    const familyKey = TONIC_FAMILY_BY_RATIO.get(ratio);
    const family = FAMILY_DEFINITIONS[familyKey];
    return modes.filter((mode) => family && networkAdmitsModeAtTonic(ratio, mode)).map((mode) => {
      const targetSelection = { selectedFamily: familyKey, selectedModeId: mode.id, selectedTonic: ratio };
      return {
        admitted: family ? networkAdmitsModeAtTonic(ratio, mode) : false,
        commonPitchCount: exactCommonPitchCount(sourceSelection, sourceMode, targetSelection, mode),
        familyKey,
        limitDistance: Math.abs(modeLimitNumber(mode) - modeLimitNumber(sourceMode)),
        mode,
        ratio,
        sameLimit: modeSpecificLabel(mode) === modeSpecificLabel(sourceMode),
      };
    });
  }).sort((first, second) => (
    second.commonPitchCount - first.commonPitchCount
    || Number(second.sameLimit) - Number(first.sameLimit)
    || first.limitDistance - second.limitDistance
    || Number(second.admitted) - Number(first.admitted)
    || modeLimitNumber(first.mode) - modeLimitNumber(second.mode)
    || ratioCents(first.ratio) - ratioCents(second.ratio)
  ));
  const choice = candidates[0];
  if (!choice?.familyKey || !choice.mode) return null;
  return {
    selectedFamily: choice.familyKey,
    selectedModeId: choice.mode.id,
    selectedTonic: choice.ratio,
  };
}

function restoreSelection(snapshot) {
  state.selectedFamily = snapshot.selectedFamily;
  state.selectedModeId = snapshot.selectedModeId;
  state.selectedTonic = snapshot.selectedTonic;
}

function previewModulationTarget(entry) {
  const selection = entry.selection ?? resolveModulationTarget(entry.target);
  if (!selection) return;
  stopAllSounds();
  const source = state.modulationAnchor ?? currentSelectionSnapshot();
  if (
    selection.selectedModeId === source.selectedModeId
    && selection.selectedTonic === source.selectedTonic
  ) {
    state.modulationAnchor = null;
    state.modulationPreview = null;
    restoreSelection(source);
    populateModeSelect();
    render();
    return;
  }
  if (!state.modulationAnchor) state.modulationAnchor = source;
  restoreSelection(selection);
  state.modulationPreview = {
    modeId: entry.target.modeId,
    modeName: modulationModeLabelFromName(entry.target.modeName),
    tonicRatio: selection.selectedTonic,
  };
  populateModeSelect();
  render();
}

function cancelModulationPreview() {
  if (!state.modulationAnchor) return;
  stopAllSounds();
  const source = state.modulationAnchor;
  state.modulationAnchor = null;
  state.modulationPreview = null;
  restoreSelection(source);
  populateModeSelect();
  render();
}

function confirmModulationPreview() {
  if (!state.modulationAnchor) return;
  stopAllSounds();
  state.modulationAnchor = null;
  state.modulationPreview = null;
  populateModeSelect();
  render();
}

function confirmChordFunctionPreview() {
  const preview = state.functionPreview;
  const familyKey = preview ? TONIC_FAMILY_BY_RATIO.get(preview.modeTonic) : null;
  if (!preview || !familyKey) return;
  stopAllSounds();
  const targetMode = MODE_PRESETS.find((mode) => mode.id === preview.modeId);
  const targetModeContext = targetMode ? {
    selectedFamily: familyKey,
    selectedModeId: targetMode.id,
    selectedTonic: preview.modeTonic,
  } : null;
  state.catalog = "accords";
  state.selectedTonic = preview.modeTonic;
  state.selectedFamily = familyKey;
  state.selectedModeId = preview.modeId;
  const characteristic = characteristicChordSelectionForMode(targetMode);
  state.selectedModeId = "";
  if (characteristic) {
    state.selectedTonic = characteristic.chordTonic;
    state.selectedFamily = TONIC_FAMILY_BY_RATIO.get(characteristic.chordTonic);
    state.selectedChordName = characteristic.chordName;
    state.selectedVariantIndex = characteristic.variantIndex;
  } else {
    const fallback = resolvedChordSelection();
    state.selectedChordName = fallback?.chordName ?? "";
    state.selectedVariantIndex = fallback?.variantIndex ?? 0;
  }
  setModeOriginContext(targetModeContext);
  state.functionPreview = null;
  state.functionPreviewAnchor = null;
  state.functionSelectionKey = "";
  state.functionSelectionSource = "";
  state.modulationAnchor = null;
  state.modulationPreview = null;
  seedChordFunctionPreviewFromModeContext(targetModeContext);
  closeAllMenus();
  populateChordSelect();
  render();
}

function confirmIntervalFunctionPreview() {
  if (!state.intervalFunctionPreview?.pending) return;
  stopAllSounds();
  state.intervalFunctionPreview = {
    ...state.intervalFunctionPreview,
    pending: false,
  };
  state.intervalFunctionPreviewAnchor = null;
  state.intervalModeContext = serializeIntervalContext(intervalContextForSelection());
  render();
}

function confirmAnalysisPreview() {
  if (state.catalog === "intervalles") confirmIntervalFunctionPreview();
  else if (state.catalog === "tetracordes") confirmTetrachordFunctionPreview();
  else if (state.catalog === "accords") confirmChordFunctionPreview();
  else confirmModulationPreview();
}

function cancelAnalysisPreview() {
  stopAllSounds();
  if (state.catalog === "intervalles") {
    const anchor = state.intervalFunctionPreviewAnchor;
    if (!anchor) return;
    state.intervalFunctionPreview = anchor.preview ? { ...anchor.preview } : null;
    state.intervalFunctionSelectionKey = anchor.selectionKey;
    state.intervalFunctionPreviewAnchor = null;
    render();
    return;
  }
  if (state.catalog === "tetracordes") {
    if (!state.tetrachordFunctionPreview?.pending) return;
    state.tetrachordFunctionPreview = null;
    render();
    return;
  }
  if (state.catalog === "accords") {
    const anchor = state.functionPreviewAnchor;
    if (!anchor) return;
    state.functionPreview = anchor.preview ? { ...anchor.preview } : null;
    state.functionSelectionKey = anchor.selectionKey;
    state.functionPreviewAnchor = null;
    render();
    return;
  }
  cancelModulationPreview();
}

function createModulationTargetButton(entry, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "modulation-target-button";
  button.textContent = label;
  const fullLabel = modulationModeNameWithoutLimit(entry.target.modeName);
  const targetTonicRatio = entry.selection?.selectedTonic;
  const targetTonic = targetTonicRatio
    ? plainHejiNote(ratioToHeji(targetTonicRatio))
    : "";
  button.setAttribute(
    "aria-label",
    `Comparer avec ${targetTonic ? `${targetTonic} ` : ""}${fullLabel}`,
  );
  button.title = fullLabel;
  const isPreviewed = state.modulationPreview
    && state.modulationPreview.modeId === entry.target.modeId
    && state.modulationPreview.tonicRatio === targetTonicRatio;
  button.classList.toggle("is-previewed", Boolean(isPreviewed));
  button.setAttribute("aria-pressed", String(Boolean(isPreviewed)));
  button.addEventListener("click", () => previewModulationTarget(entry));
  return button;
}

function degreeFifthGeneratorDistance(degreeLabel) {
  const match = degreeLabel.match(/^([♭♯]*)(\d+)$/);
  if (!match) return 0;
  const baseDistance = new Map([
    [1, 0], [2, 2], [3, 4], [4, -1], [5, 1], [6, 3], [7, 5], [8, 0],
  ]).get(Number(match[2])) ?? 0;
  const accidentalDistance = [...match[1]].reduce(
    (sum, accidental) => sum + (accidental === "♯" ? 7 : -7),
    0,
  );
  return baseDistance + accidentalDistance;
}

function modulationRowKey(mutation, destinationDegree = destinationDegreeLabel(mutation)) {
  return [mutation.sourceDegreeIndex, mutation.direction, destinationDegree].join("|");
}

function modulationRowDefinitions(analysis) {
  const rows = new Map();
  analysis.mutations.forEach((mutation) => {
    const destinationDegree = destinationDegreeLabel(mutation);
    const key = modulationRowKey(mutation, destinationDegree);
    if (rows.has(key)) return;
    rows.set(key, {
      brightnessBand: mutation.direction,
      destinationDegree,
      generatorDistance: degreeFifthGeneratorDistance(destinationDegree),
      key,
      mutation,
      origin: false,
    });
  });
  return [...rows.values()];
}

function modulationItemScaleGroup(item, source) {
  if (item.origin) {
    const sourceMode = selectedModeById(source.selectedModeId);
    return modeGroupPresentation(sourceMode?.group);
  }
  const groups = new Set(item.mutation.targets.map((target) => target.group).filter(Boolean));
  if (groups.size !== 1) return null;
  return modeGroupPresentation([...groups][0]);
}

function modulationTonicColumns(entries, source) {
  const sourcePitchClass = ratioToHeji(source.selectedTonic)?.referenceSemitone;
  const columns = new Map();
  const addColumn = (ratio, preferRatio = false) => {
    if (!ratio) return;
    const pitchClass = ratioToHeji(ratio)?.referenceSemitone;
    if (!Number.isInteger(pitchClass) || !Number.isInteger(sourcePitchClass)) return;
    if (columns.has(pitchClass) && !preferRatio) return;
    columns.set(pitchClass, {
      fifthDistance: signedFifthDistance(sourcePitchClass, pitchClass),
      pitchClass,
      ratio,
    });
  };
  entries.forEach((entry) => addColumn(entry.selection?.selectedTonic, true));
  addColumn(source.selectedTonic, true);
  const tonicOrder = new Map([...new Set(TONIC_RATIOS)].map((ratio, index) => [ratio, index]));
  return [...columns.values()].sort((first, second) => (
    first.fifthDistance - second.fifthDistance
    || Number(second.pitchClass === sourcePitchClass) - Number(first.pitchClass === sourcePitchClass)
    || (tonicOrder.get(first.ratio) ?? 0) - (tonicOrder.get(second.ratio) ?? 0)
  ));
}

function deduplicateVisibleEntries(entries, labelForEntry, isSelectedEntry = () => false) {
  const byLabel = new Map();
  entries.forEach((entry) => {
    const label = labelForEntry(entry);
    const existing = byLabel.get(label);
    if (!existing || (!isSelectedEntry(existing) && isSelectedEntry(entry))) byLabel.set(label, entry);
  });
  return [...byLabel.values()];
}

function modulationEntryIsPreviewed(entry) {
  return Boolean(
    state.modulationPreview
    && state.modulationPreview.modeId === entry.target.modeId
    && state.modulationPreview.tonicRatio === entry.selection?.selectedTonic,
  );
}

function createModulationGridRow(className, columns, includeScaleColumn = false) {
  const row = document.createElement("div");
  row.className = `modulation-simple-row ${className}`.trim();
  row.dataset.includesScaleColumn = String(includeScaleColumn);
  row.style.gridTemplateColumns = includeScaleColumn
    ? `var(--modulation-scale-column-width) var(--modulation-change-column-width) repeat(${columns.length}, var(--modulation-data-column-width))`
    : `var(--modulation-change-column-width) repeat(${columns.length}, var(--modulation-data-column-width))`;
  return row;
}

function createModulationScaleLabel(scaleGroup, showLabel = false, tonic = false) {
  const label = document.createElement("span");
  label.className = `modulation-scale-label${tonic ? " modulation-scale-spacer" : ""}`;
  if (showLabel && scaleGroup) {
    label.textContent = scaleGroup.short;
    label.title = scaleGroup.full;
    label.setAttribute("role", "rowheader");
    label.setAttribute("aria-label", `Gamme ${scaleGroup.full}`);
  } else {
    label.setAttribute("aria-hidden", "true");
  }
  return label;
}

function createModulationTonicRow(columns) {
  const row = createModulationGridRow("modulation-tonic-row", columns, true);
  row.append(createModulationScaleLabel(null, false, true));
  const spacer = document.createElement("span");
  spacer.className = "modulation-change modulation-tonic-spacer";
  row.append(spacer);
  columns.forEach((column, columnIndex) => {
    const tonic = document.createElement("span");
    tonic.className = "modulation-tonic-cell";
    tonic.dataset.modulationColumnIndex = String(columnIndex);
    const isCurrent = column.pitchClass === ratioToHeji(state.selectedTonic)?.referenceSemitone;
    tonic.classList.toggle("is-current", isCurrent);
    if (isCurrent) tonic.setAttribute("aria-current", "true");
    const tonicName = plainHejiNote(ratioToHeji(column.ratio));
    const generatorLabel = column.fifthDistance === 0
      ? "tonique courante"
      : `${Math.abs(column.fifthDistance)} générateur${Math.abs(column.fifthDistance) > 1 ? "s" : ""} de quinte ${column.fifthDistance < 0 ? "descendant" : "ascendant"}${Math.abs(column.fifthDistance) > 1 ? "s" : ""}`;
    tonic.title = `${tonicName} — ${generatorLabel}.`;
    tonic.setAttribute("aria-label", `${tonicName}, ${generatorLabel}`);
    tonic.append(createHejiPitch(column.ratio, false));
    row.append(tonic);
  });
  return row;
}

function createModulationRow(rowDefinition, columns, entries) {
  const row = createModulationGridRow("modulation-transformation-row", columns);
  let hasProvisionalSelection = false;
  const change = document.createElement("span");
  change.className = "modulation-change";
  appendModulationChange(
    change,
    rowDefinition.mutation.sourceDegreeLabel,
    rowDefinition.destinationDegree,
    rowDefinition.mutation.direction,
  );
  row.append(change);
  columns.forEach((column, columnIndex) => {
    const cell = document.createElement("div");
    cell.className = "modulation-mode-cell";
    cell.dataset.modulationColumnIndex = String(columnIndex);
    const cellEntries = entries
      .filter((entry) => entry.target.tonicPitchClass === column.pitchClass)
      .sort((first, second) => first.target.modeName.localeCompare(second.target.modeName, "fr"));
    const visibleEntries = deduplicateVisibleEntries(
      cellEntries,
      (entry) => modulationModeLabelFromName(entry.target.modeName),
      modulationEntryIsPreviewed,
    );
    if (visibleEntries.some(modulationEntryIsPreviewed)) hasProvisionalSelection = true;
    visibleEntries.forEach((entry) => cell.append(
        createModulationTargetButton(
          entry,
          modulationModeLabelFromName(entry.target.modeName),
        ),
      ));
    row.append(cell);
  });
  row.classList.toggle("is-provisional-selection", hasProvisionalSelection);
  return row;
}

function createModulationOriginRow(source, columns, entries) {
  const sourceMode = selectedModeById(source.selectedModeId);
  const row = createModulationGridRow("modulation-origin-row", columns);
  let hasProvisionalSelection = !state.modulationPreview;
  const change = document.createElement("span");
  change.className = "modulation-change";
  row.append(change);
  columns.forEach((column, columnIndex) => {
    const cell = document.createElement("div");
    cell.className = "modulation-mode-cell";
    cell.dataset.modulationColumnIndex = String(columnIndex);
    if (column.pitchClass === ratioToHeji(source.selectedTonic)?.referenceSemitone) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "modulation-target-button modulation-origin-button";
      button.textContent = sourceMode
        ? modulationModeLabelFromName(sourceMode.family)
        : "Mode d’origine";
      button.setAttribute("aria-label", "Revenir au mode d’origine");
      button.title = sourceMode ? `${formatModeLabel(sourceMode.family)} — mode d’origine` : "Mode d’origine";
      button.classList.toggle("is-previewed", !state.modulationPreview);
      button.setAttribute("aria-pressed", String(!state.modulationPreview));
      button.addEventListener("click", cancelModulationPreview);
      cell.append(button);
    } else {
      const cellEntries = entries
        .filter((entry) => entry.target.tonicPitchClass === column.pitchClass)
        .sort((first, second) => first.target.modeName.localeCompare(second.target.modeName, "fr"));
      const visibleEntries = deduplicateVisibleEntries(
        cellEntries,
        (entry) => modulationModeLabelFromName(entry.target.modeName),
        modulationEntryIsPreviewed,
      );
      if (visibleEntries.some(modulationEntryIsPreviewed)) hasProvisionalSelection = true;
      visibleEntries.forEach((entry) => cell.append(createModulationTargetButton(
          entry,
          modulationModeLabelFromName(entry.target.modeName),
        )));
    }
    row.append(cell);
  });
  row.classList.toggle("is-provisional-selection", hasProvisionalSelection);
  return row;
}

function modulationColumnRoot() {
  return elements.modulationList.querySelector?.(".modulation-groups, .chord-function-view");
}

let tableMeasurementCanvas = null;

function measuredLabelWidth(element) {
  const text = element?.textContent?.replace(/\s+/g, " ").trim();
  if (!text || typeof getComputedStyle !== "function") return 0;
  tableMeasurementCanvas ??= document.createElement("canvas");
  const context = tableMeasurementCanvas.getContext("2d");
  if (!context) return 0;
  const style = getComputedStyle(element);
  context.font = [style.fontStyle, style.fontWeight, style.fontSize, style.fontFamily]
    .filter(Boolean)
    .join(" ");
  const spacing = Number.parseFloat(style.letterSpacing);
  return context.measureText(text).width
    + (Number.isFinite(spacing) ? Math.max(0, text.length - 1) * spacing : 0);
}

function measuredColumnWidth(list, selectors, minimum, padding) {
  const labels = [...list.querySelectorAll(selectors)];
  const widest = labels.reduce((width, label) => Math.max(width, measuredLabelWidth(label)), 0);
  return Math.ceil(Math.max(minimum, widest + padding));
}

function updateModulationColumnNavigation(columnCount, selectedColumnIndex, expanded) {
  const navigation = elements.modulationColumnNavigation;
  if (!navigation) return;
  navigation.hidden = expanded || columnCount < 1;
  elements.modulationColumnPrevious.disabled = expanded || selectedColumnIndex <= 0;
  elements.modulationColumnNext.disabled = expanded || selectedColumnIndex >= columnCount - 1;
  navigation.setAttribute(
    "aria-label",
    expanded
      ? `Toutes les colonnes, ${columnCount} au total`
      : `Colonne ${selectedColumnIndex + 1} sur ${columnCount}`,
  );
}

function moveModulationColumnWindow(direction) {
  const list = modulationColumnRoot();
  const columnCount = Number(list?.dataset.columnCount);
  if (!list || modulationColumnWindow.expanded || !Number.isFinite(columnCount) || columnCount < 1) return;
  modulationColumnWindow.start = Math.max(
    0,
    Math.min(columnCount - 1, modulationColumnWindow.start + direction),
  );
  fitModulationDataColumns(list);
}

function fitModulationDataColumns(list = modulationColumnRoot()) {
  if (!list || !elements.modulationPanel) {
    if (elements.modulationColumnNavigation) elements.modulationColumnNavigation.hidden = true;
    elements.modulationPanel?.classList.remove("is-column-windowed");
    if (elements.modulationExpandButton) elements.modulationExpandButton.disabled = true;
    return;
  }
  const columnCount = Number(list.dataset.columnCount);
  if (!Number.isFinite(columnCount) || columnCount < 1) {
    disableModulationColumnWindow();
    return;
  }
  const expanded = modulationColumnWindow.expanded;
  const visibleColumnCount = expanded ? columnCount : 1;
  const currentColumnIndex = Math.min(
    columnCount - 1,
    Math.max(0, Number(list.dataset.currentColumnIndex) || 0),
  );
  const signature = list.dataset.columnSignature ?? "";
  const signatureChanged = modulationColumnWindow.signature !== signature;
  if (signatureChanged) {
    modulationColumnWindow.signature = signature;
    modulationColumnWindow.start = currentColumnIndex;
  }
  modulationColumnWindow.visible = visibleColumnCount;
  modulationColumnWindow.start = Math.max(
    0,
    Math.min(columnCount - 1, modulationColumnWindow.start),
  );
  const firstVisible = expanded ? 0 : modulationColumnWindow.start;
  const lastVisible = firstVisible + visibleColumnCount;
  list.querySelectorAll("[data-modulation-column-index]").forEach((cell) => {
    const columnIndex = Number(cell.dataset.modulationColumnIndex);
    cell.hidden = columnIndex < firstVisible || columnIndex >= lastVisible;
  });
  const isFunctionView = list.classList.contains("chord-function-view");
  const naturalDataWidth = measuredColumnWidth(
    list,
    isFunctionView
      ? ".chord-function-degree-button, .chord-function-mode-item, .chord-function-mode-name"
      : ".modulation-tonic-cell, .modulation-target-button",
    isFunctionView ? 88 : 92,
    18,
  );
  let dataWidth = naturalDataWidth;
  let leadingWidth = 0;
  if (isFunctionView) {
    leadingWidth = measuredColumnWidth(
      list,
      ".chord-function-target-tonic, .function-scale-label",
      58,
      16,
    );
    const availableDataWidth = Math.max(76, elements.modulationPanel.clientWidth - 4 - leadingWidth);
    if (!expanded) dataWidth = availableDataWidth;
    list.style.setProperty("--function-leading-column-width", `${leadingWidth}px`);
    list.style.setProperty("--function-data-column-width", `${dataWidth}px`);
    const dataColumn = "var(--function-data-column-width)";
    list.querySelectorAll(".chord-function-degree-selector, .chord-function-scale-row").forEach((row) => {
      const leadingColumn = row.classList.contains("chord-function-degree-selector")
        ? "var(--function-leading-column-width) "
        : "";
      row.style.gridTemplateColumns = `${leadingColumn}repeat(${visibleColumnCount}, ${dataColumn})`;
    });
    list.querySelectorAll(".function-scale-group").forEach((group) => {
      group.style.gridTemplateColumns = "var(--function-leading-column-width) max-content";
    });
    list.style.width = `${leadingWidth + (visibleColumnCount * dataWidth)}px`;
    list.style.minWidth = list.style.width;
  } else {
    const scaleWidth = measuredColumnWidth(list, ".modulation-scale-label", 50, 14);
    const changeWidth = measuredColumnWidth(list, ".modulation-change", 44, 12);
    leadingWidth = scaleWidth + changeWidth;
    const availableDataWidth = Math.max(76, elements.modulationPanel.clientWidth - 4 - leadingWidth);
    if (!expanded) dataWidth = availableDataWidth;
    list.style.setProperty("--modulation-scale-column-width", `${scaleWidth}px`);
    list.style.setProperty("--modulation-change-column-width", `${changeWidth}px`);
    list.style.setProperty("--modulation-data-column-width", `${dataWidth}px`);
    const dataColumn = "var(--modulation-data-column-width)";
    list.querySelectorAll(".modulation-simple-row").forEach((row) => {
      const scaleColumn = row.dataset.includesScaleColumn === "true"
        ? "var(--modulation-scale-column-width) "
        : "";
      row.style.gridTemplateColumns = `${scaleColumn}var(--modulation-change-column-width) repeat(${visibleColumnCount}, ${dataColumn})`;
    });
    list.querySelectorAll(".modulation-scale-group").forEach((group) => {
      group.style.gridTemplateColumns = "var(--modulation-scale-column-width) max-content";
    });
    list.style.width = `${leadingWidth + (visibleColumnCount * dataWidth)}px`;
    list.style.minWidth = list.style.width;
  }
  const defaultResultFontSize = 11.84;
  const resultFontScale = expanded
    ? 1
    : Math.min(1, Math.max(1, dataWidth - 18) / Math.max(1, naturalDataWidth - 18));
  list.style.setProperty(
    "--modulation-result-font-size",
    `${Math.max(10, defaultResultFontSize * resultFontScale).toFixed(2)}px`,
  );
  elements.modulationControl.style.setProperty("--modulation-heading-leading-width", `${leadingWidth}px`);
  elements.modulationControl.style.setProperty("--modulation-heading-leading-offset", `${leadingWidth / 2}px`);
  elements.modulationControl.style.setProperty("--modulation-heading-data-width", `${dataWidth}px`);
  elements.modulationPanel.classList.add("is-column-windowed");
  if (!expanded) elements.modulationPanel.scrollLeft = 0;
  updateModulationColumnNavigation(columnCount, firstVisible, expanded);
  elements.modulationColumnPosition.textContent = expanded
    ? `Toutes les colonnes, ${columnCount} au total`
    : `Colonne ${firstVisible + 1} sur ${columnCount}`;
  elements.modulationExpandButton.disabled = false;
}

function disableModulationColumnWindow() {
  if (elements.modulationColumnNavigation) {
    elements.modulationColumnNavigation.hidden = true;
    elements.modulationColumnPrevious.disabled = true;
    elements.modulationColumnNext.disabled = true;
  }
  elements.modulationPanel.classList.remove("is-column-windowed");
  if (elements.modulationExpandButton) elements.modulationExpandButton.disabled = true;
}

function setModulationExpanded(expanded, { restoreFocus = true } = {}) {
  const nextExpanded = Boolean(expanded && !elements.modulationControl.hidden && modulationColumnRoot());
  if (nextExpanded === modulationColumnWindow.expanded) return;
  if (nextExpanded) {
    modulationColumnWindow.returnFocus = document.activeElement;
  }
  modulationColumnWindow.expanded = nextExpanded;
  elements.modulationControl.classList.toggle("is-expanded", nextExpanded);
  document.body.classList.toggle("is-modulation-expanded", nextExpanded);
  elements.modulationExpandButton.setAttribute("aria-expanded", String(nextExpanded));
  elements.modulationExpandButton.setAttribute(
    "aria-label",
    nextExpanded ? "Réduire le tableau des modulations" : "Agrandir le tableau des modulations",
  );
  elements.modulationExpandButton.title = nextExpanded
    ? "Revenir à une colonne"
    : "Afficher toutes les colonnes";
  fitModulationDataColumns();
  if (!nextExpanded && restoreFocus && modulationColumnWindow.returnFocus?.focus) {
    modulationColumnWindow.returnFocus.focus();
  }
  if (!nextExpanded) modulationColumnWindow.returnFocus = null;
}

function renderModulationList(modulationView) {
  const previousScrollTop = elements.modulationPanel.scrollTop;
  const entries = collectModulationEntries(modulationView.analysis, modulationView.source);
  const equivalentEntries = collectEquivalentModulationEntries(
    modulationView.analysis,
    modulationView.source,
  );
  const columns = modulationTonicColumns([...entries, ...equivalentEntries], modulationView.source)
    .filter((column) => (
      column.pitchClass === ratioToHeji(modulationView.source.selectedTonic)?.referenceSemitone
      || entries.some((entry) => entry.target.tonicPitchClass === column.pitchClass)
      || equivalentEntries.some((entry) => entry.target.tonicPitchClass === column.pitchClass)
    ));
  const list = document.createElement("div");
  list.className = "modulation-groups modulation-simple-list";
  list.dataset.columnCount = String(columns.length);
  list.dataset.currentColumnIndex = String(Math.max(
    0,
    columns.findIndex((column) => (
      column.pitchClass === ratioToHeji(modulationView.source.selectedTonic)?.referenceSemitone
    )),
  ));
  list.dataset.columnSignature = [
    modulationView.source.selectedTonic,
    modulationView.source.selectedModeId,
    ...columns.map((column) => `${column.pitchClass}:${column.ratio}`),
  ].join("|");
  const orderedItems = [
    ...modulationRowDefinitions(modulationView.analysis),
    { brightnessBand: 0, generatorDistance: 0, origin: true },
  ].sort((first, second) => (
    second.brightnessBand - first.brightnessBand
    || second.generatorDistance - first.generatorDistance
    || Number(second.origin) - Number(first.origin)
    || (first.mutation?.sourceDegreeIndex ?? 0) - (second.mutation?.sourceDegreeIndex ?? 0)
  )).map((item) => ({
    ...item,
    scaleGroup: modulationItemScaleGroup(item, modulationView.source),
    entries: item.origin ? [] : entries.filter((entry) => (
      modulationRowKey(entry.mutation, entry.destinationDegree) === item.key
      && columns.some((column) => column.pitchClass === entry.target.tonicPitchClass)
    )),
  })).filter((item) => item.origin || item.entries.length > 0);
  list.append(createModulationTonicRow(columns));
  const groupedItems = [];
  orderedItems.forEach((item) => {
    const scaleGroupKey = item.scaleGroup?.full ?? "";
    const currentGroup = groupedItems.at(-1);
    if (!currentGroup || currentGroup.key !== scaleGroupKey) {
      groupedItems.push({ items: [item], key: scaleGroupKey, scaleGroup: item.scaleGroup });
    } else {
      currentGroup.items.push(item);
    }
  });
  groupedItems.forEach((groupDefinition) => {
    const group = document.createElement("div");
    group.className = "modulation-scale-group";
    group.style.gridTemplateColumns = "var(--modulation-scale-column-width) max-content";
    group.append(createModulationScaleLabel(groupDefinition.scaleGroup, Boolean(groupDefinition.key)));
    const rows = document.createElement("div");
    rows.className = "modulation-scale-group-rows";
    groupDefinition.items.forEach((item) => {
      rows.append(
        item.origin
          ? createModulationOriginRow(
            modulationView.source,
            columns,
            equivalentEntries,
          )
          : createModulationRow(item, columns, item.entries),
      );
    });
    group.append(rows);
    list.append(group);
  });
  if (!orderedItems.some((item) => !item.origin)) {
    const empty = document.createElement("p");
    empty.className = "modulation-empty";
    empty.textContent = "Aucun autre mode voisin par une seule altération.";
    list.append(empty);
  }
  elements.modulationList.replaceChildren(list);
  fitModulationDataColumns(list);
  elements.modulationPanel.scrollTop = previousScrollTop;
}

function renderModulationConfirmation() {
  let hasPendingPreview = false;
  if (state.catalog === "intervalles") {
    hasPendingPreview = Boolean(state.intervalFunctionPreview?.pending);
  } else if (state.catalog === "tetracordes") {
    hasPendingPreview = Boolean(state.tetrachordFunctionPreview?.pending
      && tetrachordContextMatches(state.tetrachordFunctionPreview, tetrachordContextForSelection()));
  } else if (state.catalog === "accords") {
    hasPendingPreview = Boolean(
      state.functionPreview?.pending
      && state.functionPreview.degreeKey === state.functionSelectionKey
    );
  } else {
    hasPendingPreview = Boolean(state.modulationPreview);
  }
  elements.confirmModulation.disabled = !hasPendingPreview;
  elements.cancelModulation.disabled = !hasPendingPreview;
}

function selectableChordFunctionOccurrences(modeGroup) {
  return modeGroup.occurrences.map((occurrence) => {
    const modeTonic = divideAndReduce(state.selectedTonic, occurrence.degreeRatio);
    const family = modeTonic ? FAMILY_DEFINITIONS[TONIC_FAMILY_BY_RATIO.get(modeTonic)] : null;
    return modeTonic && family && networkAdmitsModeAtTonic(modeTonic, occurrence.mode)
      ? { ...occurrence, modeTonic }
      : null;
  }).filter(Boolean);
}

function preferredChordFunctionOccurrence(modeGroup) {
  const modelLabel = canonicalModeModelLabel(currentChordModeModel());
  const limitLabel = chordVariantLimitLabel(
    state.selectedChordName,
    state.selectedVariantIndex,
    currentChordVariant(),
  );
  const desiredLimit = Number(limitLabel.replace("L", "")) || 5;
  return selectableChordFunctionOccurrences(modeGroup).sort((first, second) => (
    Number(canonicalModeModelLabel(second.mode.label) === modelLabel)
    - Number(canonicalModeModelLabel(first.mode.label) === modelLabel)
    || Math.abs(modeLimitNumber(first.mode) - desiredLimit) - Math.abs(modeLimitNumber(second.mode) - desiredLimit)
    || modeLimitNumber(first.mode) - modeLimitNumber(second.mode)
  ))[0] ?? null;
}

function previewChordFunctionMode(degree, occurrence) {
  if (!occurrence) {
    state.functionPreview = null;
    state.functionPreviewAnchor = null;
    render();
    return;
  }
  stopAllSounds();
  const origin = modeOriginContextSelection();
  const canonicalTonic = contextualModeTonic(currentChordVariant()) ?? state.selectedTonic;
  const isConfirmed = origin
    ? occurrence.mode.id === origin.mode.id && occurrence.modeTonic === origin.tonic
    : degree.label === "1"
      && occurrence.modeTonic === canonicalTonic
      && canonicalModeModelLabel(occurrence.mode.label) === canonicalModeModelLabel(currentChordModeModel());
  if (!state.functionPreviewAnchor && !isConfirmed) {
    state.functionPreviewAnchor = {
      preview: state.functionPreview ? { ...state.functionPreview } : null,
      selectionKey: state.functionSelectionKey,
    };
  }
  state.functionSelectionKey = degree.key;
  state.functionPreview = {
    degreeKey: degree.key,
    degreeLabel: degree.label,
    degreeRatio: occurrence.degreeRatio,
    modeId: occurrence.mode.id,
    modeTonic: occurrence.modeTonic,
    pending: !isConfirmed,
  };
  if (isConfirmed) state.functionPreviewAnchor = null;
  render();
}

function chordFunctionGridColumns(element, degrees, includeTonic = false) {
  element.style.gridTemplateColumns = includeTonic
    ? `var(--function-leading-column-width, 48px) repeat(${degrees.length}, var(--function-data-column-width))`
    : `repeat(${degrees.length}, var(--function-data-column-width))`;
  [...element.children].slice(includeTonic ? 1 : 0).forEach((cell, columnIndex) => {
    cell.dataset.modulationColumnIndex = String(columnIndex);
  });
  return element;
}

function configureFunctionColumnWindow(panel, degrees) {
  const selectedColumn = [...panel.querySelectorAll(".chord-function-degree-button")]
    .find((button) => button.getAttribute("aria-pressed") === "true");
  panel.dataset.columnCount = String(degrees.length);
  panel.dataset.currentColumnIndex = selectedColumn?.dataset.modulationColumnIndex ?? "0";
  panel.dataset.columnSignature = [
    state.catalog,
    state.selectedTonic,
    state.selectedModeId,
    state.selectedChordName,
    state.intervalSelection,
    state.tetrachordSelection,
    selectedColumn?.dataset.modulationColumnIndex ?? "0",
    ...degrees.map((degree) => degree.key ?? degree.label ?? ""),
  ].join("|");
  elements.modulationList.replaceChildren(panel);
  fitModulationDataColumns(panel);
}

function chordFunctionMatrixRows(degrees) {
  const origin = modeOriginContextSelection();
  const originKey = origin
    ? modePitchClassSetKey({ selectedTonic: origin.tonic }, origin.mode)
    : "";
  const rowsByKey = new Map();
  degrees.filter((degree) => !degree.isLocked).forEach((degree) => {
    degree.modeGroups.forEach((modeGroup) => {
      const selectable = selectableChordFunctionOccurrences(modeGroup);
      const occurrence = selectable.find((candidate) => (
        origin
        && candidate.mode.id === origin.mode.id
        && candidate.modeTonic === origin.tonic
      )) ?? preferredChordFunctionOccurrence(modeGroup);
      if (!occurrence) return;
      const scaleKey = modePitchClassSetKey({ selectedTonic: occurrence.modeTonic }, occurrence.mode);
      if (!scaleKey) return;
      let row = rowsByKey.get(scaleKey);
      const entry = { degree, modeGroup, occurrence, scaleKey };
      if (!row) {
        row = {
          cells: new Map(),
          index: rowsByKey.size,
          isOrigin: scaleKey === originKey,
          key: scaleKey,
        };
        rowsByKey.set(scaleKey, row);
      }
      const cellEntries = row.cells.get(entry.degree.key) ?? [];
      cellEntries.push(entry);
      row.cells.set(entry.degree.key, cellEntries);
    });
  });

  return [...rowsByKey.values()].sort(compareFunctionMatrixRows);
}

function createChordFunctionDegreeSelector(degrees) {
  const selector = document.createElement("div");
  selector.className = "chord-function-degree-selector";
  selector.setAttribute("role", "group");
  selector.setAttribute("aria-label", "Degrés possibles de l’accord");
  const selectedDegree = degrees.find((degree) => (
    degree.key === state.functionSelectionKey && !degree.isLocked
  )) ?? degrees.find((degree) => !degree.isLocked && degree.modeGroups.length) ?? degrees[0];
  const previewTonic = state.functionPreview?.degreeKey === selectedDegree?.key
    ? state.functionPreview.modeTonic
    : "";
  const preferredOccurrence = [...(selectedDegree?.modeGroups ?? [])]
    .sort((first, second) => Number(second.isCharacteristic) - Number(first.isCharacteristic))
    .map((modeGroup) => preferredChordFunctionOccurrence(modeGroup))
    .find(Boolean);
  const selectedTonic = previewTonic || preferredOccurrence?.modeTonic || "";
  const tonic = document.createElement("span");
  tonic.className = "chord-function-target-tonic";
  tonic.setAttribute("role", "rowheader");
  tonic.setAttribute("aria-label", selectedTonic ? `Tonique ${plainHejiNote(ratioToHeji(selectedTonic))}` : "Tonique");
  if (selectedTonic) {
    tonic.append(createHejiPitch(selectedTonic, false));
    const colon = document.createElement("span");
    colon.className = "chord-function-key-colon";
    colon.textContent = ":";
    tonic.append(colon);
  }
  selector.append(tonic);
  degrees.forEach((degree) => {
    const label = chordFunctionDegreeLabel(degree.label);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chord-function-degree-button";
    appendDegreeLabel(button, label);
    button.disabled = degree.isLocked;
    button.classList.toggle("is-locked", degree.isLocked);
    const isCurrent = degree.key === state.functionSelectionKey;
    button.classList.toggle("is-current", isCurrent);
    button.setAttribute(
      "aria-label",
      degree.isLocked
        ? `Fonctions sur le degré ${label} verrouillées pour ${chordDisplayName(state.selectedChordName)}`
        : `Choisir le degré ${label}`,
    );
    button.setAttribute("aria-pressed", String(!degree.isLocked && isCurrent));
    button.addEventListener("click", () => {
      if (degree.isLocked) return;
      state.functionSelectionKey = degree.key;
      state.functionPreview = null;
      state.functionPreviewAnchor = null;
      render();
    });
    selector.append(button);
  });
  return chordFunctionGridColumns(selector, degrees, true);
}

function createChordFunctionModeButton(entry) {
  const { degree, modeGroup, occurrence } = entry;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chord-function-mode-item";
  const isSelected = state.functionPreview?.degreeKey === degree.key
    && state.functionPreview?.modeId === occurrence.mode.id
    && state.functionPreview?.modeTonic === occurrence.modeTonic;
  button.classList.toggle("is-previewed", Boolean(isSelected));
  button.setAttribute("aria-pressed", String(Boolean(isSelected)));
  const tonicName = plainHejiNote(ratioToHeji(occurrence.modeTonic));
  const fullModeName = modulationModeNameWithoutLimit(occurrence.mode.label);
  button.setAttribute(
    "aria-label",
    `Prévisualiser ${tonicName} ${fullModeName}, accord au degré ${chordFunctionDegreeLabel(degree.label)}`,
  );
  button.title = `${tonicName} ${fullModeName}`;
  const modeName = document.createElement("span");
  modeName.className = "chord-function-mode-name";
  modeName.textContent = chordFunctionModeName(modeGroup);
  button.append(modeName);
  button.addEventListener("click", () => previewChordFunctionMode(degree, occurrence));
  return button;
}

function appendFunctionScaleGroup(container, scaleGroup, scaleRows) {
  const group = document.createElement("div");
  group.className = "function-scale-group";
  group.style.gridTemplateColumns = "var(--function-leading-column-width, 48px) max-content";
  const label = document.createElement("span");
  label.className = "function-scale-label";
  if (scaleGroup) {
    label.textContent = scaleGroup.short;
    label.title = scaleGroup.full;
    label.setAttribute("role", "rowheader");
    label.setAttribute("aria-label", `Gamme ${scaleGroup.full}`);
  } else {
    label.setAttribute("aria-hidden", "true");
  }
  const rows = document.createElement("div");
  rows.className = "function-scale-group-rows";
  rows.append(...scaleRows);
  group.append(label, rows);
  container.append(group);
}

function createChordFunctionModeList(rows, degrees) {
  const modes = document.createElement("div");
  modes.className = "chord-function-mode-list";
  const groupedRows = [];
  rows.filter((row) => (
    degrees.some((degree) => row.cells.get(degree.key)?.length)
  )).forEach((row) => {
    const scaleGroup = functionMatrixScaleGroup(row);
    const scaleGroupKey = scaleGroup?.full ?? "";
    const currentGroup = groupedRows.at(-1);
    if (!currentGroup || currentGroup.key !== scaleGroupKey) {
      groupedRows.push({ key: scaleGroupKey, rows: [row], scaleGroup });
    } else {
      currentGroup.rows.push(row);
    }
  });
  groupedRows.forEach((groupDefinition) => {
    const scaleRows = groupDefinition.rows.map((row) => {
      const scaleRow = document.createElement("div");
      let hasProvisionalSelection = false;
      scaleRow.className = "chord-function-scale-row";
      scaleRow.classList.toggle("is-origin-scale", row.isOrigin);
      scaleRow.setAttribute("role", "row");
      degrees.forEach((degree) => {
        const cell = document.createElement("div");
        cell.className = "chord-function-mode-cell";
        cell.setAttribute("role", "gridcell");
        const entries = (row.cells.get(degree.key) ?? [])
          .sort((first, second) => (
            first.modeGroup.family.localeCompare(second.modeGroup.family, "fr")
            || modeLimitNumber(first.occurrence.mode) - modeLimitNumber(second.occurrence.mode)
          ));
        const visibleEntries = deduplicateVisibleEntries(
          entries,
          (entry) => chordFunctionModeName(entry.modeGroup),
          (entry) => Boolean(
            state.functionPreview?.degreeKey === entry.degree.key
            && state.functionPreview.modeId === entry.occurrence.mode.id
            && state.functionPreview.modeTonic === entry.occurrence.modeTonic
          ),
        );
        if (visibleEntries.some((entry) => (
          state.functionPreview?.degreeKey === entry.degree.key
          && state.functionPreview.modeId === entry.occurrence.mode.id
          && state.functionPreview.modeTonic === entry.occurrence.modeTonic
        ))) hasProvisionalSelection = true;
        visibleEntries.forEach((entry) => cell.append(createChordFunctionModeButton(entry)));
        scaleRow.append(cell);
      });
      scaleRow.classList.toggle("is-provisional-selection", hasProvisionalSelection);
      return chordFunctionGridColumns(scaleRow, degrees);
    });
    appendFunctionScaleGroup(modes, groupDefinition.scaleGroup, scaleRows);
  });
  return modes;
}

function preferredIntervalFunctionContext(degree) {
  return (degree?.modeGroups ?? [])
    .flatMap((modeGroup) => modeGroup.occurrences)
    .sort(compareIntervalFunctionContexts)[0] ?? null;
}

function previewIntervalFunctionMode(degree, context) {
  if (!context) return;
  stopAllSounds();
  const isConfirmed = !state.intervalFunctionPreview?.pending
    && intervalFunctionPreviewMatchesContext(state.intervalFunctionPreview, context);
  if (!state.intervalFunctionPreviewAnchor && !isConfirmed) {
    state.intervalFunctionPreviewAnchor = {
      preview: state.intervalFunctionPreview ? { ...state.intervalFunctionPreview } : null,
      selectionKey: state.intervalFunctionSelectionKey,
    };
  }
  state.intervalFunctionSelectionKey = degree.key;
  state.intervalFunctionPreview = intervalFunctionPreviewFromContext(context, !isConfirmed);
  if (isConfirmed) state.intervalFunctionPreviewAnchor = null;
  render();
}

function intervalFunctionMatrixRows(degrees) {
  const selectedContext = intervalContextForSelection();
  const selectedScaleKey = selectedContext
    ? modePitchClassSetKey({ selectedTonic: selectedContext.modeTonic }, selectedContext.mode)
    : "";
  const rowsByKey = new Map();
  degrees.forEach((degree) => {
    degree.modeGroups.forEach((modeGroup) => {
      modeGroup.occurrences.forEach((context) => {
        const scaleKey = modePitchClassSetKey({ selectedTonic: context.modeTonic }, context.mode);
        if (!scaleKey) return;
        let row = rowsByKey.get(scaleKey);
        if (!row) {
          row = {
            cells: new Map(),
            index: rowsByKey.size,
            isOrigin: scaleKey === selectedScaleKey,
            key: scaleKey,
          };
          rowsByKey.set(scaleKey, row);
        }
        const entries = row.cells.get(degree.key) ?? [];
        entries.push({ context, degree, modeGroup });
        row.cells.set(degree.key, entries);
      });
    });
  });
  return [...rowsByKey.values()].sort(compareFunctionMatrixRows);
}

function createIntervalFunctionDegreeSelector(degrees) {
  const selector = document.createElement("div");
  selector.className = "chord-function-degree-selector";
  selector.setAttribute("role", "group");
  selector.setAttribute("aria-label", "Degrés possibles de la note de départ");
  const selectedDegree = degrees.find((degree) => degree.key === state.intervalFunctionSelectionKey)
    ?? degrees[0];
  const currentContext = intervalContextForSelection();
  const selectedContext = currentContext
    && modeDegreeLabel(currentContext.lowerRatio, currentContext.lowerIndex) === selectedDegree?.key
    ? currentContext
    : preferredIntervalFunctionContext(selectedDegree);
  const tonic = document.createElement("span");
  tonic.className = "chord-function-target-tonic";
  tonic.setAttribute("role", "rowheader");
  tonic.setAttribute(
    "aria-label",
    selectedContext ? `Tonique ${plainHejiNote(ratioToHeji(selectedContext.modeTonic))}` : "Tonique",
  );
  if (selectedContext) {
    tonic.append(createHejiPitch(selectedContext.modeTonic, false));
    const colon = document.createElement("span");
    colon.className = "chord-function-key-colon";
    colon.textContent = ":";
    tonic.append(colon);
  }
  selector.append(tonic);
  degrees.forEach((degree) => {
    const label = intervalFunctionDegreeLabel(degree.label);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chord-function-degree-button";
    appendDegreeLabel(button, label);
    const isCurrent = degree.key === state.intervalFunctionSelectionKey;
    button.classList.toggle("is-current", isCurrent);
    button.setAttribute("aria-label", `Choisir le degré de départ ${label}`);
    button.setAttribute("aria-pressed", String(isCurrent));
    button.addEventListener("click", () => {
      const preferred = preferredIntervalFunctionContext(degree);
      if (preferred) previewIntervalFunctionMode(degree, preferred);
    });
    selector.append(button);
  });
  return chordFunctionGridColumns(selector, degrees, true);
}

function createIntervalFunctionModeButton(entry) {
  const { context, degree } = entry;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chord-function-mode-item";
  const isSelected = intervalFunctionPreviewMatchesContext(state.intervalFunctionPreview, context);
  button.classList.toggle("is-previewed", isSelected);
  button.setAttribute("aria-pressed", String(isSelected));
  const tonicName = plainHejiNote(ratioToHeji(context.modeTonic));
  const fullModeName = modulationModeNameWithoutLimit(context.mode.label);
  button.setAttribute(
    "aria-label",
    `Prévisualiser ${tonicName} ${fullModeName}, note de départ au degré ${degree.label}`,
  );
  button.title = `${tonicName} ${fullModeName}`;
  const modeName = document.createElement("span");
  modeName.className = "chord-function-mode-name";
  modeName.textContent = intervalFunctionModeLabel(context.mode);
  button.append(modeName);
  button.addEventListener("click", () => previewIntervalFunctionMode(degree, context));
  return button;
}

function createIntervalFunctionModeList(rows, degrees) {
  const modes = document.createElement("div");
  modes.className = "chord-function-mode-list";
  modes.addEventListener("scroll", () => {
    state.intervalFunctionScrollTop = modes.scrollTop;
  }, { passive: true });
  const groupedRows = [];
  rows.forEach((row) => {
    const scaleGroup = functionMatrixScaleGroup(row);
    const scaleGroupKey = scaleGroup?.full ?? "";
    const currentGroup = groupedRows.at(-1);
    if (!currentGroup || currentGroup.key !== scaleGroupKey) {
      groupedRows.push({ key: scaleGroupKey, rows: [row], scaleGroup });
    } else {
      currentGroup.rows.push(row);
    }
  });
  groupedRows.forEach((groupDefinition) => {
    const scaleRows = groupDefinition.rows.map((row) => {
      const scaleRow = document.createElement("div");
      let hasProvisionalSelection = false;
      scaleRow.className = "chord-function-scale-row";
      scaleRow.classList.toggle("is-origin-scale", row.isOrigin);
      scaleRow.setAttribute("role", "row");
      degrees.forEach((degree) => {
        const cell = document.createElement("div");
        cell.className = "chord-function-mode-cell";
        cell.setAttribute("role", "gridcell");
        const entries = (row.cells.get(degree.key) ?? [])
          .sort((first, second) => compareIntervalFunctionContexts(first.context, second.context));
        const visibleEntries = deduplicateVisibleEntries(
          entries,
          (entry) => intervalFunctionModeLabel(entry.context.mode),
          (entry) => intervalFunctionPreviewMatchesContext(state.intervalFunctionPreview, entry.context),
        );
        if (visibleEntries.some((entry) => (
          intervalFunctionPreviewMatchesContext(state.intervalFunctionPreview, entry.context)
        ))) hasProvisionalSelection = true;
        visibleEntries.forEach((entry) => cell.append(createIntervalFunctionModeButton(entry)));
        scaleRow.append(cell);
      });
      scaleRow.classList.toggle("is-provisional-selection", hasProvisionalSelection);
      return chordFunctionGridColumns(scaleRow, degrees);
    });
    appendFunctionScaleGroup(modes, groupDefinition.scaleGroup, scaleRows);
  });
  requestAnimationFrame(() => {
    modes.scrollTop = state.intervalFunctionScrollTop;
  });
  return modes;
}

function renderIntervalFunctionList(functionView) {
  const panel = document.createElement("div");
  panel.className = "chord-function-view interval-function-view";
  const rows = functionView?.degrees?.length ? intervalFunctionMatrixRows(functionView.degrees) : [];
  const degrees = (functionView?.degrees ?? []).filter((degree) => (
    rows.some((row) => row.cells.get(degree.key)?.length)
  ));
  if (!degrees.length) {
    state.intervalFunctionPreview = null;
    state.intervalFunctionPreviewAnchor = null;
    const empty = document.createElement("p");
    empty.className = "modulation-empty";
    empty.textContent = "Aucun mode retenu ne contient cet intervalle exact depuis cette note.";
    panel.append(empty);
    elements.modulationList.replaceChildren(panel);
    return;
  }
  if (!degrees.some((degree) => degree.key === state.intervalFunctionSelectionKey)) {
    state.intervalFunctionSelectionKey = degrees[0].key;
    state.intervalFunctionPreview = null;
    state.intervalFunctionPreviewAnchor = null;
  }
  panel.setAttribute("role", "grid");
  panel.setAttribute("aria-label", "Modes contenant l’intervalle exact, regroupés par gamme et degré de départ");
  panel.append(
    createIntervalFunctionDegreeSelector(degrees),
    createIntervalFunctionModeList(rows, degrees),
  );
  configureFunctionColumnWindow(panel, degrees);
}

function renderChordFunctionList(functionView) {
  const panel = document.createElement("div");
  panel.className = "chord-function-view";
  const rows = functionView?.degrees?.length ? chordFunctionMatrixRows(functionView.degrees) : [];
  const degrees = (functionView?.degrees ?? []).filter((degree) => (
    rows.some((row) => row.cells.get(degree.key)?.length)
  ));
  if (!degrees.length) {
    state.functionPreview = null;
    state.functionPreviewAnchor = null;
    const empty = document.createElement("p");
    empty.className = "modulation-empty";
    empty.textContent = "Aucune fonction exacte dans les modes sélectionnés.";
    panel.append(empty);
    elements.modulationList.replaceChildren(panel);
    return;
  }
  if (!degrees.some((degree) => degree.key === state.functionSelectionKey && !degree.isLocked)) {
    state.functionSelectionKey = degrees.find((degree) => !degree.isLocked)?.key ?? degrees[0].key;
    state.functionPreview = null;
    state.functionPreviewAnchor = null;
  }
  panel.setAttribute("role", "grid");
  panel.setAttribute("aria-label", "Modes regroupés par gamme et par degré de l’accord");
  panel.append(
    createChordFunctionDegreeSelector(degrees),
    createChordFunctionModeList(rows, degrees),
  );
  configureFunctionColumnWindow(panel, degrees);
}

function buildTetrachordFunctionAnalysis() {
  const entry = tetrachordEntryForSelection();
  if (!entry || !state.selectedTonic) return null;
  // Every exact occurrence is eligible, independently of h3 preference or of
  // the pair used for the mode's dashed boundaries.
  const candidates = tetrachordContextCandidates();
  if (!candidates.some((context) => tetrachordContextMatches(state.tetrachordFunctionPreview, context))) {
    state.tetrachordFunctionPreview = null;
  }
  const confirmed = tetrachordContextForSelection(undefined, undefined, { includePreview: false });
  state.tetrachordModeContext = serializeTetrachordContext(confirmed);
  const degreesByLabel = new Map();
  candidates.forEach((context) => {
    const label = modeDegreeLabel(context.lowerRatio, context.lowerIndex);
    if (!degreesByLabel.has(label)) degreesByLabel.set(label, { key: label, label, contexts: [] });
    degreesByLabel.get(label).contexts.push(context);
  });
  const degrees = [...degreesByLabel.values()].sort((first, second) => (
    modeSlot(first.label, MODE_TABLE_SLOTS)[0] - modeSlot(second.label, MODE_TABLE_SLOTS)[0]
    || first.label.localeCompare(second.label, "fr")
  ));
  return { entry, degrees, confirmed, current: tetrachordContextForSelection() };
}

function previewTetrachordFunctionMode(context) {
  const candidate = tetrachordContextCandidates().find((item) => (
    tetrachordContextMatches(serializeTetrachordContext(context), item)
  ));
  if (!candidate) return;
  stopAllSounds();
  const confirmed = tetrachordContextForSelection(undefined, undefined, { includePreview: false });
  state.tetrachordModeContext = serializeTetrachordContext(confirmed);
  state.tetrachordFunctionPreview = tetrachordContextMatches(state.tetrachordModeContext, candidate)
    ? null : { ...serializeTetrachordContext(candidate), pending: true };
  render();
}

function confirmTetrachordFunctionPreview() {
  if (!state.tetrachordFunctionPreview?.pending) return;
  const context = tetrachordContextForSelection();
  if (!tetrachordContextMatches(state.tetrachordFunctionPreview, context)) return;
  stopAllSounds();
  state.tetrachordModeContext = serializeTetrachordContext(context);
  state.tetrachordFunctionPreview = null;
  render();
}

function tetrachordFunctionMatrixRows(analysis) {
  const rowsByKey = new Map();
  const originKey = analysis.confirmed
    ? modePitchClassSetKey({ selectedTonic: analysis.confirmed.modeTonic }, analysis.confirmed.mode) : "";
  analysis.degrees.forEach((degree) => {
    degree.contexts.forEach((context) => {
      const scaleKey = modePitchClassSetKey({ selectedTonic: context.modeTonic }, context.mode);
      // Same structural grouping as the other panels; keep ALL exact variants
      // as separate buttons, never merge them by tempered pitch or mode name.
      const key = `${context.mode.group}|${scaleKey}`;
      if (!rowsByKey.has(key)) rowsByKey.set(key, {
        key, cells: new Map(), index: rowsByKey.size, isOrigin: scaleKey === originKey,
      });
      const row = rowsByKey.get(key);
      const entries = row.cells.get(degree.key) ?? [];
      entries.push({ context, degree });
      row.cells.set(degree.key, entries);
    });
  });
  return [...rowsByKey.values()].sort(compareFunctionMatrixRows);
}

function createTetrachordFunctionDegreeSelector(analysis) {
  const selector = document.createElement("div");
  selector.className = "chord-function-degree-selector";
  selector.setAttribute("role", "row");
  selector.setAttribute("aria-label", "Tonique du mode et degrés de départ du tétracorde");
  const tonic = document.createElement("span");
  tonic.className = "chord-function-target-tonic";
  tonic.setAttribute("role", "columnheader");
  if (analysis.current) {
    tonic.append(createHejiPitch(analysis.current.modeTonic, false));
    const colon = document.createElement("span");
    colon.className = "chord-function-key-colon";
    colon.textContent = ":";
    tonic.append(colon);
    tonic.title = `Tonique du mode : ${plainHejiNote(ratioToHeji(analysis.current.modeTonic))}`;
    tonic.setAttribute("aria-label", tonic.title);
  }
  selector.append(tonic);
  analysis.degrees.forEach((degree) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chord-function-degree-button";
    button.dataset.tetrachordDegree = degree.key;
    appendDegreeLabel(button, intervalFunctionDegreeLabel(degree.label));
    const selected = analysis.current && degree.contexts.some((context) => (
      tetrachordContextMatches(serializeTetrachordContext(analysis.current), context)
    ));
    button.classList.toggle("is-current", Boolean(selected));
    button.setAttribute("aria-pressed", String(Boolean(selected)));
    button.setAttribute("aria-label", `Prévisualiser le tétracorde au degré ${button.textContent}`);
    button.addEventListener("click", () => {
      // Preserve the mode when exploring another placement of the same tetra.
      const context = degree.contexts.find((item) => item.mode.id === analysis.current?.mode.id)
        ?? degree.contexts[0];
      previewTetrachordFunctionMode(context);
    });
    selector.append(button);
  });
  return chordFunctionGridColumns(selector, analysis.degrees, true);
}

function createTetrachordFunctionModeButton(context, degree, current) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chord-function-mode-item";
  button.dataset.tetrachordContext = JSON.stringify(serializeTetrachordContext(context));
  const selected = tetrachordContextMatches(serializeTetrachordContext(current), context);
  button.classList.toggle("is-previewed", selected);
  button.setAttribute("aria-pressed", String(selected));
  const tonicName = plainHejiNote(ratioToHeji(context.modeTonic));
  const fullName = formatModeLabel(context.mode.label);
  button.title = `${tonicName} ${fullName} — départ au degré ${intervalFunctionDegreeLabel(degree.label)}`;
  button.setAttribute("aria-label", `Prévisualiser ${button.title}`);
  const name = document.createElement("span");
  name.className = "chord-function-mode-name";
  name.textContent = `${modeFamilyAbbreviation(context.mode)} `;
  appendColorizedModeLimit(name, context.mode.label.match(/L(?:5|7|11|13)(?:sm|m)?$/)?.[0] ?? "");
  button.append(name);
  button.addEventListener("click", () => previewTetrachordFunctionMode(context));
  return button;
}

function renderTetrachordFunctionList(analysis) {
  const panel = document.createElement("div");
  panel.className = "chord-function-view tetrachord-function-view";
  const rows = analysis?.degrees?.length ? tetrachordFunctionMatrixRows(analysis) : [];
  const degrees = (analysis?.degrees ?? []).filter((degree) => (
    rows.some((row) => row.cells.get(degree.key)?.length)
  ));
  if (!degrees.length) {
    state.tetrachordFunctionPreview = null;
    const empty = document.createElement("p");
    empty.className = "modulation-empty";
    empty.textContent = "Aucun mode retenu ne contient ce tétracorde exact depuis cette note dans le réseau actif.";
    panel.append(empty);
    elements.modulationList.replaceChildren(panel);
    return;
  }
  panel.setAttribute("role", "grid");
  panel.setAttribute("aria-label", "Modes contenant le tétracorde exact, avec les degrés de départ sur la première ligne");
  // The first row is always the tonic/degrees header, never a vertical list.
  const visibleAnalysis = { ...analysis, degrees };
  panel.append(createTetrachordFunctionDegreeSelector(visibleAnalysis));
  const modes = document.createElement("div");
  modes.className = "chord-function-mode-list";
  const groups = new Map();
  rows.forEach((row) => {
    const scaleGroup = functionMatrixScaleGroup(row);
    if (!groups.has(scaleGroup.full)) groups.set(scaleGroup.full, { scaleGroup, rows: [] });
    const scaleRow = document.createElement("div");
    let hasProvisionalSelection = false;
    scaleRow.className = "chord-function-scale-row";
    scaleRow.setAttribute("role", "row");
    scaleRow.classList.toggle("is-origin-scale", row.isOrigin);
    degrees.forEach((degree) => {
      const cell = document.createElement("div");
      cell.className = "chord-function-mode-cell";
      cell.setAttribute("role", "gridcell");
      const entries = row.cells.get(degree.key) ?? [];
      const visibleEntries = deduplicateVisibleEntries(
        entries,
        ({ context }) => `${modeFamilyAbbreviation(context.mode)} ${context.mode.label.match(/L(?:5|7|11|13)(?:sm|m)?$/)?.[0] ?? ""}`,
        ({ context }) => tetrachordContextMatches(serializeTetrachordContext(analysis.current), context),
      );
      if (visibleEntries.some(({ context }) => (
        tetrachordContextMatches(serializeTetrachordContext(analysis.current), context)
      ))) hasProvisionalSelection = true;
      visibleEntries.forEach(({ context }) => {
        cell.append(createTetrachordFunctionModeButton(context, degree, analysis.current));
      });
      scaleRow.append(cell);
    });
    scaleRow.classList.toggle("is-provisional-selection", hasProvisionalSelection);
    groups.get(scaleGroup.full).rows.push(chordFunctionGridColumns(scaleRow, degrees));
  });
  groups.forEach(({ scaleGroup, rows }) => appendFunctionScaleGroup(modes, scaleGroup, rows));
  panel.append(modes);
  configureFunctionColumnWindow(panel, degrees);
}

function renderModulationControls(modulationView, functionView = null, intervalFunctionView = null, tetrachordFunctionView = null) {
  const hasSelectedInterval = state.catalog === "intervalles" && Boolean(intervalEntryForSelection());
  const hasSelectedMode = state.catalog === "modes"
    && Boolean(state.selectedModeId)
    && state.selectedModeId !== ALL_SELECTION_ID;
  const hasSelectedChord = state.catalog === "accords" && Boolean(currentChord());
  const hasSelectedTetrachord = state.catalog === "tetracordes" && Boolean(tetrachordEntryForSelection());
  const hasAnalysis = hasSelectedInterval || hasSelectedMode || hasSelectedChord || hasSelectedTetrachord;
  if (!hasAnalysis && modulationColumnWindow.expanded) {
    setModulationExpanded(false, { restoreFocus: false });
  }
  elements.modulationControl.hidden = !hasAnalysis;
  elements.modulationPanel.hidden = !hasAnalysis;
  elements.modulationControl.setAttribute(
    "aria-label",
    hasSelectedInterval
      ? "Contextes modaux de l’intervalle"
      : hasSelectedTetrachord
        ? "Contextes modaux du tétracorde"
        : hasSelectedChord
          ? "Fonctions de l’accord dans les modes"
          : "Analyse des modulations",
  );
  renderModulationConfirmation();
  disableModulationColumnWindow();
  if (hasSelectedTetrachord) {
    renderTetrachordFunctionList(tetrachordFunctionView ?? buildTetrachordFunctionAnalysis());
    renderModulationConfirmation();
    return;
  }
  if (hasSelectedInterval) {
    renderIntervalFunctionList(intervalFunctionView ?? buildIntervalFunctionAnalysis());
    renderModulationConfirmation();
    return;
  }
  if (hasSelectedChord) {
    renderChordFunctionList(functionView ?? buildChordFunctionAnalysis());
    renderModulationConfirmation();
    return;
  }
  if (hasSelectedMode) {
    if (modeConnectionError) {
      elements.modulationList.textContent = "Le calculateur de modulations est momentanément indisponible.";
    } else if (!modulationView) {
      elements.modulationList.textContent = "Calcul des modes voisins…";
    } else {
      renderModulationList(modulationView);
    }
    renderModulationConfirmation();
  } else {
    elements.modulationList.replaceChildren();
  }
}

function discardModulationPreview() {
  state.functionPreview = null;
  state.functionPreviewAnchor = null;
  state.intervalFunctionPreview = null;
  state.intervalFunctionPreviewAnchor = null;
  state.tetrachordFunctionPreview = null;
  state.intervalFunctionScrollTop = 0;
  state.intervalFunctionSelectionKey = "";
  state.intervalFunctionSelectionSource = "";
  state.modulationAnchor = null;
  state.modulationPreview = null;
}

function clearIntervalTransitionContexts() {
  state.intervalChordContext = null;
  state.intervalModeContext = null;
}

function selectInterval(selection) {
  if (!intervalIsAvailable(selection)) return;
  stopAllSounds();
  discardModulationPreview();
  clearModeOriginContext();
  clearIntervalTransitionContexts();
  state.catalog = "intervalles";
  state.intervalAnchorTonic = state.selectedTonic;
  state.intervalSelection = selection;
  state.selectedChordName = "";
  state.selectedModeId = "";
  state.selectedVariantIndex = 0;
  closeAllMenus();
  populateIntervalSelect();
  render();
}

function serializeTetrachordContext(context) {
  return context ? {
    code: context.entry.code,
    anchorTonic: context.anchorTonic,
    modeId: context.mode.id,
    modeTonic: context.modeTonic,
    lowerIndex: context.lowerIndex,
  } : null;
}

function selectTetrachord(code, preferredContext = null) {
  if (!tetrachordContextCandidates(code).length) return;
  stopAllSounds();
  discardModulationPreview();
  clearModeOriginContext();
  clearIntervalTransitionContexts();
  state.catalog = "tetracordes";
  state.tetrachordSelection = code;
  state.tetrachordModeContext = serializeTetrachordContext(preferredContext);
  state.selectedModeId = "";
  state.selectedChordName = "";
  state.intervalSelection = "";
  state.selectedVariantIndex = 0;
  closeAllMenus();
  populateTetrachordSelect();
  render();
}

function enterTetrachordView() {
  const interval = state.catalog === "intervalles" ? intervalContextForSelection() : null;
  const context = state.catalog === "accords" ? currentChordContextMode()
    : interval ? { mode: interval.mode, tonic: interval.modeTonic }
      : { mode: selectedModeById(), tonic: state.selectedTonic };
  const existing = TETRACHORD_CATALOG.flatMap((entry) => tetrachordContextCandidates(entry.code))
    .find((candidate) => candidate.mode.id === context?.mode?.id && candidate.modeTonic === context?.tonic);
  const code = existing?.entry.code ?? defaultTetrachordSelection();
  if (code) {
    selectTetrachord(code, existing);
    return;
  }
  // A custom network may admit none of the retained constructions.
  stopAllSounds();
  discardModulationPreview();
  clearModeOriginContext();
  clearIntervalTransitionContexts();
  state.catalog = "tetracordes";
  state.tetrachordSelection = "";
  state.tetrachordModeContext = null;
  state.selectedModeId = "";
  state.selectedChordName = "";
  state.intervalSelection = "";
  closeAllMenus();
  populateTetrachordSelect();
  render();
}

function tetrachordIntervalContext(context) {
  if (!context) return null;
  // Prefer the third; if that interval is not retained, use the second or
  // fourth of this same tetrachord, never an unrelated memorized interval.
  for (const index of [2, 1, 3]) {
    const candidates = concordantIntervalCatalog()
      .filter((entry) => entry.ratio === context.entry.ratios[index])
      .flatMap((entry) => intervalContextCandidates(entry.id, context.anchorTonic));
    const selected = candidates.find((candidate) => candidate.mode.id === context.mode.id
      && candidate.modeTonic === context.modeTonic && candidate.lowerIndex === context.lowerIndex)
      ?? candidates[0];
    if (selected) return selected;
  }
  return null;
}

function showAllAvailableNotes() {
  if (!state.selectedTonic || !state.selectedFamily) return;
  stopAllSounds();
  discardModulationPreview();
  clearModeOriginContext();
  clearIntervalTransitionContexts();
  state.intervalAnchorTonic = state.selectedTonic;
  if (state.catalog === "intervalles") state.intervalSelection = ALL_SELECTION_ID;
  else if (state.catalog === "tetracordes") {
    state.tetrachordSelection = ALL_SELECTION_ID;
    state.tetrachordModeContext = null;
  } else if (state.catalog === "accords") state.selectedChordName = ALL_SELECTION_ID;
  else state.selectedModeId = ALL_SELECTION_ID;
  state.selectedVariantIndex = 0;
  populateSelectionMenu();
  closeAllMenus();
  render();
}

function selectTonic(ratio) {
  stopAllSounds();
  discardModulationPreview();
  const requestedChordName = state.selectedChordName;
  const requestedVariantIndex = state.selectedVariantIndex;
  const requestedModeId = state.selectedModeId;
  const requestedMode = selectedModeById(requestedModeId);
  const nextMode = state.catalog === "modes" && requestedModeId !== ALL_SELECTION_ID
    ? resolvedModeSelectionForTonic(ratio, requestedModeId, requestedMode?.label)
    : null;
  if (state.catalog === "modes" && requestedModeId !== ALL_SELECTION_ID && !nextMode) return;
  if (state.catalog === "accords") clearModeOriginContext();
  if (state.catalog !== "intervalles") clearIntervalTransitionContexts();
  state.selectedTonic = ratio;
  state.selectedFamily = TONIC_FAMILY_BY_RATIO.get(ratio);
  if (state.catalog === "tetracordes") {
    state.tetrachordModeContext = null;
    if (state.tetrachordSelection !== ALL_SELECTION_ID && !tetrachordContextForSelection()) {
      state.tetrachordSelection = defaultTetrachordSelection();
    }
  }
  if (state.catalog === "intervalles") {
    state.intervalAnchorTonic = ratio;
    if (state.intervalSelection !== ALL_SELECTION_ID && !intervalIsAvailable(state.intervalSelection, ratio)) {
      state.intervalSelection = defaultIntervalSelection(ratio);
    }
  }
  if (state.catalog === "accords" && requestedChordName === ALL_SELECTION_ID) {
    state.selectedChordName = ALL_SELECTION_ID;
    state.selectedVariantIndex = 0;
  } else if (state.catalog === "accords" && requestedChordName) {
    const selection = resolvedChordSelection(requestedChordName, requestedVariantIndex);
    state.selectedChordName = selection?.chordName ?? "";
    state.selectedVariantIndex = selection?.variantIndex ?? 0;
  } else if (state.catalog === "modes") {
    state.selectedModeId = requestedModeId === ALL_SELECTION_ID
      ? ALL_SELECTION_ID
      : nextMode.id;
  } else if (state.catalog === "accords") {
    const selection = resolvedChordSelection(requestedChordName, requestedVariantIndex);
    state.selectedChordName = selection?.chordName ?? "";
    state.selectedVariantIndex = selection?.variantIndex ?? 0;
  }
  populateSelectionMenu();
  closeAllMenus();
  render();
}

function reloadApplicationPage() {
  stopAllSounds();
  // Reload the complete site, not just the embedded module with its original
  // ?vue=... parameter. Saved network preferences follow normal page startup.
  try {
    (window.top ?? window).location.reload();
  } catch {
    // Standalone exports or a host that disallows access to its top frame.
    window.location.reload();
  }
}

// Retained for URL-serialization regression tests; the obsolete copy button is gone.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function shareableUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("vue", state.catalog);
  for (const key of ["tetracorde", "tetra-mode", "tetra-tonic", "tetra-degre"]) url.searchParams.delete(key);
  if (state.selectedTonic) {
    url.searchParams.set("tonic", state.selectedTonic);
    if (state.catalog === "tetracordes") {
      for (const key of ["accord", "mode", "variante", "intervalle"]) url.searchParams.delete(key);
      url.searchParams.set("tetracorde", state.tetrachordSelection || "aucun");
      const context = tetrachordContextForSelection();
      if (context) {
        url.searchParams.set("tetra-mode", context.mode.id);
        url.searchParams.set("tetra-tonic", context.modeTonic);
        url.searchParams.set("tetra-degre", String(context.lowerIndex));
      }
    } else if (state.catalog === "intervalles") {
      url.searchParams.delete("accord");
      url.searchParams.delete("mode");
      url.searchParams.delete("variante");
      url.searchParams.set("intervalle", state.intervalSelection || "aucun");
    } else if (state.catalog === "accords") {
      url.searchParams.delete("mode");
      url.searchParams.delete("intervalle");
      url.searchParams.set("accord", state.selectedChordName || "all");
      url.searchParams.set("variante", String(state.selectedVariantIndex));
    } else {
      url.searchParams.delete("accord");
      url.searchParams.delete("intervalle");
      url.searchParams.delete("variante");
      url.searchParams.set("mode", state.selectedModeId || "all");
    }
  } else {
    url.searchParams.delete("tonic");
    url.searchParams.delete("mode");
  }
  url.searchParams.set("affichage", selectedDisplayMode());
  url.searchParams.delete("cents");
  url.searchParams.set("table-cents", state.showTableCents ? "1" : "0");
  url.searchParams.set("table-mode-name", state.tableShowModeName ? "1" : "0");
  url.searchParams.set("table-fifths-above", String(normalizedTableFifths(state.tableFifthsAbove)));
  url.searchParams.set("table-fifths-below", String(normalizedTableFifths(state.tableFifthsBelow)));
  url.searchParams.set("octave", String(state.audioOctave));
  url.searchParams.set("timbre", state.audioInstrument);
  url.searchParams.set("souris", state.audioMouseMode);
  return url.toString();
}

// Retained for ratio-serialization regression tests; the obsolete copy button is gone.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scalaRatioText() {
  const ratios = [...new Set(selectedGraphRatios())]
    .filter((ratio) => ratio !== "1/1")
    .sort((first, second) => ratioCents(first) - ratioCents(second));
  const octaveIndex = ratios.indexOf("2/1");
  if (octaveIndex >= 0) ratios.splice(octaveIndex, 1);
  ratios.push("2/1");
  return ratios.join("\n");
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("La copie n’est pas disponible dans ce navigateur.");
}

function tonicThirdIntervalContext(mode, tonic) {
  const thirdRatio = mode?.ratios?.[2];
  if (!thirdRatio || !tonic) return null;
  const entry = concordantIntervalCatalog().find((candidate) => (
    candidate.ratio === thirdRatio
    && candidate.occurrences.some((occurrence) => (
      occurrence.mode.id === mode.id
      && occurrence.lowerRatio === "1/1"
      && occurrence.upperRatio === thirdRatio
    ))
  ));
  if (!entry) return null;
  return intervalContextCandidates(entry.id, tonic).find((context) => (
    context.mode.id === mode.id
    && context.modeTonic === tonic
    && context.lowerRatio === "1/1"
    && context.upperRatio === thirdRatio
  )) ?? null;
}

function chordIntervalContext(visibleModeContext, storedContext) {
  const chord = currentChord();
  const variant = currentChordVariant();
  if (!chord || !variant || !state.selectedTonic) return null;
  const pitches = octavePitchSet(variant.pitchRatios.map(chordAbsoluteRatio));
  const containsContext = (context) => Boolean(context
    && pitches.has(multiplyAndReduce(context.anchorTonic, "1/1"))
    && pitches.has(multiplyAndReduce(context.anchorTonic, context.entry.ratio)));
  const stored = state.intervalChordContext;
  if (stored?.chordName === state.selectedChordName
    && stored.variantIndex === state.selectedVariantIndex
    && stored.chordTonic === state.selectedTonic
    && containsContext(storedContext)) return storedContext;

  // Choose only real chord tones, preferring its third over an old menu choice.
  const relativeTones = chordTones(chord, variant).map((tone) => ({
    ...tone, relativeRatio: chordAudioRatio(tone.ratio),
  })).filter((tone) => tone.relativeRatio !== "1/1");
  const candidates = relativeTones.flatMap((tone) => concordantIntervalCatalog()
    .filter((entry) => entry.ratio === tone.relativeRatio)
    .flatMap((entry) => intervalContextCandidates(entry.id, state.selectedTonic)
      .filter(containsContext).map((context) => ({ context, tone }))));
  const sameVisibleMode = (context) => Number(Boolean(visibleModeContext
    && context.mode.id === visibleModeContext.mode.id
    && multiplyAndReduce(context.modeTonic, "1/1") === multiplyAndReduce(visibleModeContext.tonic, "1/1")));
  return candidates.sort((first, second) => (
    Number(chordDegreeNumber(second.tone.slot) === 3) - Number(chordDegreeNumber(first.tone.slot) === 3)
    || sameVisibleMode(second.context) - sameVisibleMode(first.context)
    || ratioCents(first.tone.relativeRatio) - ratioCents(second.tone.relativeRatio)
    || compareIntervalFunctionContexts(first.context, second.context)
  ))[0]?.context ?? null;
}

function leaveTetrachordView(view) {
  const context = tetrachordContextForSelection();
  const interval = view === "intervalles" ? tetrachordIntervalContext(context) : null;
  stopAllSounds();
  discardModulationPreview();
  clearModeOriginContext();
  clearIntervalTransitionContexts();
  if (view === "intervalles") {
    state.catalog = "intervalles";
    state.intervalAnchorTonic = state.selectedTonic;
    state.intervalSelection = interval?.entry.id ?? "";
    state.intervalModeContext = serializeIntervalContext(interval);
    state.intervalFunctionPreview = interval ? intervalFunctionPreviewFromContext(interval, false) : null;
    state.selectedModeId = "";
    state.selectedChordName = "";
    closeAllMenus();
    populateSelectionMenu();
    render();
    return true;
  }
  // Reuse the established mode → chord path with the mode actually shown.
  state.catalog = "modes";
  state.selectedModeId = context?.mode.id ?? "";
  state.selectedTonic = context?.modeTonic ?? state.selectedTonic;
  state.selectedFamily = TONIC_FAMILY_BY_RATIO.get(state.selectedTonic);
  return false;
}

function switchHarmonicView(view) {
  if (!["intervalles", "tetracordes", "accords", "modes"].includes(view) || view === state.catalog) return;
  if (view !== "modes" && state.displayMode === "degrees") setDisplayMode("heji");
  if (catalogOverviewSelected()) {
    stopAllSounds();
    discardModulationPreview();
    clearModeOriginContext();
    clearIntervalTransitionContexts();
    setCatalogOverviewState(view);
    closeAllMenus();
    populateSelectionMenu();
    render();
    return;
  }
  if (view === "tetracordes") {
    enterTetrachordView();
    return;
  }
  if (state.catalog === "tetracordes" && leaveTetrachordView(view)) return;
  stopAllSounds();
  const selectedMode = selectedModeById();
  const selectedModeContext = selectedMode ? currentSelectionSnapshot() : null;
  const selectedModeIntervalContext = view === "intervalles" && state.catalog === "modes"
    ? tonicThirdIntervalContext(selectedMode, state.selectedTonic)
    : null;
  const intervalContext = storedIntervalContextSelection();
  // Capturer le contexte modal visible avant discardModulationPreview(), qui
  // efface functionPreview. Ainsi G9 affiché dans Mixolydien ♭6 ouvre bien ce
  // mode sur G, plutôt que la rotation Mineur mélodique qui a pu l'engendrer.
  const visibleChordModeContext = state.catalog === "accords"
    ? currentChordContextMode()
    : null;
  const enteringIntervalsFromChord = view === "intervalles" && state.catalog === "accords";
  const destinationIntervalContext = enteringIntervalsFromChord
    ? chordIntervalContext(visibleChordModeContext, intervalContext)
    : selectedModeIntervalContext;
  discardModulationPreview();
  state.functionSelectionKey = "";
  state.functionSelectionSource = "";

  if (view === "intervalles") {
    state.catalog = "intervalles";
    if (destinationIntervalContext) {
      state.selectedTonic = destinationIntervalContext.anchorTonic;
      state.selectedFamily = TONIC_FAMILY_BY_RATIO.get(state.selectedTonic);
      state.intervalAnchorTonic = destinationIntervalContext.anchorTonic;
      state.intervalSelection = destinationIntervalContext.entry.id;
    } else {
      state.intervalAnchorTonic = state.selectedTonic;
      state.intervalSelection = "";
    }
    state.selectedChordName = "";
    state.selectedModeId = "";
    state.selectedVariantIndex = 0;
    clearModeOriginContext();
    clearIntervalTransitionContexts();
    if (destinationIntervalContext) {
      state.intervalModeContext = serializeIntervalContext(destinationIntervalContext);
      state.intervalFunctionPreview = intervalFunctionPreviewFromContext(
        destinationIntervalContext,
        false,
      );
    }
    if (!enteringIntervalsFromChord && !intervalIsAvailable(state.intervalSelection, state.intervalAnchorTonic)) {
      state.intervalSelection = defaultIntervalSelection(state.intervalAnchorTonic);
    }
  } else if (view === "modes" && intervalContext) {
    state.catalog = "modes";
    state.selectedTonic = intervalContext.modeTonic;
    state.selectedFamily = intervalContext.familyKey;
    state.selectedChordName = "";
    state.selectedModeId = intervalContext.mode.id;
    state.selectedVariantIndex = 0;
    state.intervalModeContext = serializeIntervalContext(intervalContext);
    state.intervalChordContext = null;
    clearModeOriginContext();
  } else if (view === "modes") {
    const characteristic = visibleChordModeContext ?? characteristicModeSelectionForCurrentChord();
    state.catalog = view;
    state.selectedChordName = "";
    state.selectedVariantIndex = 0;
    if (characteristic) {
      state.selectedTonic = characteristic.tonic;
      state.selectedFamily = characteristic.familyKey;
      state.selectedModeId = characteristic.mode.id;
    } else if (state.selectedModeId && state.selectedModeId !== ALL_SELECTION_ID) {
      state.selectedModeId = resolvedModeSelection(state.selectedModeId)?.id ?? "";
    } else {
      state.selectedModeId = resolvedModeSelection(DEFAULT_MODE_ID)?.id ?? "";
    }
    clearIntervalTransitionContexts();
  } else {
    const intervalChord = intervalContext ? simplestChordSelectionForInterval(intervalContext) : null;
    const characteristic = intervalChord ? null : characteristicChordSelectionForMode(selectedMode);
    state.catalog = view;
    state.selectedModeId = "";
    if (intervalChord) {
      const modeContext = {
        selectedFamily: intervalContext.familyKey,
        selectedModeId: intervalContext.mode.id,
        selectedTonic: intervalContext.modeTonic,
      };
      state.selectedTonic = intervalChord.chordTonic;
      state.selectedFamily = TONIC_FAMILY_BY_RATIO.get(intervalChord.chordTonic);
      state.selectedChordName = intervalChord.chordName;
      state.selectedVariantIndex = intervalChord.variantIndex;
      state.intervalChordContext = {
        ...serializeIntervalContext(intervalContext),
        chordName: intervalChord.chordName,
        chordTonic: intervalChord.chordTonic,
        variantIndex: intervalChord.variantIndex,
      };
      state.intervalModeContext = null;
      setModeOriginContext(modeContext);
      seedChordFunctionPreviewFromModeContext(modeContext);
    } else if (characteristic) {
      setModeOriginContext(selectedModeContext);
      state.selectedTonic = characteristic.chordTonic;
      state.selectedFamily = TONIC_FAMILY_BY_RATIO.get(characteristic.chordTonic);
      state.selectedChordName = characteristic.chordName;
      state.selectedVariantIndex = characteristic.variantIndex;
      seedChordFunctionPreviewFromModeContext(selectedModeContext);
      clearIntervalTransitionContexts();
    } else if (selectedMode) {
      clearModeOriginContext();
      const fallback = resolvedChordSelection();
      state.selectedChordName = fallback?.chordName ?? "";
      state.selectedVariantIndex = fallback?.variantIndex ?? 0;
      clearIntervalTransitionContexts();
    } else {
      clearModeOriginContext();
      const fallback = resolvedChordSelection();
      state.selectedChordName = fallback?.chordName ?? "";
      state.selectedVariantIndex = fallback?.variantIndex ?? 0;
      clearIntervalTransitionContexts();
    }
  }
  closeAllMenus();
  populateSelectionMenu();
  render();
}

function selectedDisplayMode() {
  return state.displayMode;
}

function setDisplayMode(display) {
  state.displayMode = ["heji", "ratio", "heji-cents", "degrees", "none"].includes(display)
    ? display : "heji";
}

function restoreStateFromUrl() {
  const parameters = new URL(window.location.href).searchParams;
  const display = parameters.get("affichage");
  if (["heji", "ratio", "heji-cents", "degrees", "none"].includes(display)) setDisplayMode(display);
  // Preserve old links where HEJI + cents also controlled the table.
  if (display === "heji-cents") state.showTableCents = true;
  if (["0", "1"].includes(parameters.get("table-cents"))) {
    state.showTableCents = parameters.get("table-cents") === "1";
  }
  if (["0", "1"].includes(parameters.get("table-mode-name"))) {
    state.tableShowModeName = parameters.get("table-mode-name") === "1";
  }
  for (const [parameter, key] of [
    ["table-fifths-above", "tableFifthsAbove"],
    ["table-fifths-below", "tableFifthsBelow"],
  ]) {
    if (parameters.has(parameter)) state[key] = normalizedTableFifths(parameters.get(parameter));
  }
  // Older shared links used a separate cents flag.
  if (parameters.get("cents") === "1") {
    setDisplayMode("heji-cents");
    state.showTableCents = true;
  }
  const requestedOctave = parameters.get("octave");
  const octave = Number(requestedOctave);
  if (requestedOctave !== null && [-1, 0, 1].includes(octave)) state.audioOctave = octave;
  const instrument = parameters.get("timbre");
  const requestedInstrument = normalizedAudioInstrument(instrument);
  if (requestedInstrument) state.audioInstrument = requestedInstrument;
  const mouseMode = parameters.get("souris");
  if (["poly", "mono"].includes(mouseMode)) state.audioMouseMode = mouseMode;

  const tonic = parameters.get("tonic");
  if (!tonic || !TONIC_RATIO_SET.has(tonic)) return;
  state.selectedTonic = tonic;
  state.selectedFamily = TONIC_FAMILY_BY_RATIO.get(tonic);
  if (state.catalog === "tetracordes") {
    const code = parameters.get("tetracorde");
    state.tetrachordFunctionPreview = null;
    state.tetrachordSelection = code === ALL_SELECTION_ID
      ? ALL_SELECTION_ID
      : tetrachordContextCandidates(code, tonic).length
      ? code : defaultTetrachordSelection(tonic);
    state.tetrachordModeContext = {
      code: state.tetrachordSelection,
      anchorTonic: tonic,
      modeId: parameters.get("tetra-mode"),
      modeTonic: parameters.get("tetra-tonic"),
      lowerIndex: Number(parameters.get("tetra-degre")),
    };
    return;
  }
  if (state.catalog === "intervalles") {
    const requestedInterval = parameters.get("intervalle");
    const requestedEntry = intervalEntryForSelection(requestedInterval);
    state.intervalAnchorTonic = tonic;
    state.intervalSelection = requestedInterval === ALL_SELECTION_ID
      ? ALL_SELECTION_ID
      : requestedEntry && intervalContextForSelection(requestedEntry.id, tonic)
      ? requestedEntry.id
      : defaultIntervalSelection(tonic);
    return;
  }
  if (state.catalog === "accords") {
    const chordName = parameters.get("accord");
    if (chordName === ALL_SELECTION_ID) {
      state.selectedChordName = ALL_SELECTION_ID;
      state.selectedVariantIndex = 0;
    } else if (chordData.chords[chordName]) {
      state.selectedChordName = chordName;
      const available = availableChordVariantIndices(currentChord());
      const requested = Number(parameters.get("variante"));
      state.selectedVariantIndex = available.includes(requested) ? requested : available[0] ?? 0;
    }
    return;
  }
  const availableModes = modesAvailableForTonic(tonic);
  const requestedMode = parameters.get("mode");
  if (requestedMode === ALL_SELECTION_ID) {
    state.selectedModeId = ALL_SELECTION_ID;
  } else if (availableModes.some((mode) => mode.id === requestedMode)) {
    state.selectedModeId = requestedMode;
  }
}

elements.displaySelect.addEventListener("change", (event) => {
  if (document.body.dataset.pageTab === "frettier") {
    sendFrettierCommand("set-display", event.target.value);
    return;
  }
  if (document.body.dataset.pageTab === "summary") {
    setDisplayMode(event.target.value);
    renderNetworkSummaryDocument({ force: true });
    return;
  }
  setDisplayMode(event.target.value);
  syncNetworkAnalysis();
  render();
});

elements.graphDisplaySelect.addEventListener("change", (event) => {
  setDisplayMode(event.target.value);
  setOptionsDefaultStatus();
  syncNetworkAnalysis();
  render();
});

elements.showGraphPanel.addEventListener("change", (event) => {
  state.showGraphPanel = event.target.checked;
  setOptionsDefaultStatus();
  render();
});
elements.showTablePanel.addEventListener("change", (event) => {
  state.showTablePanel = event.target.checked;
  setOptionsDefaultStatus();
  render();
});
elements.tableShowCents.addEventListener("change", (event) => {
  state.showTableCents = event.target.checked;
  setOptionsDefaultStatus();
  render();
});
elements.tableShowModeName.addEventListener("change", (event) => {
  state.tableShowModeName = event.target.checked;
  setOptionsDefaultStatus();
  render();
});
for (const [button, key, step] of [
  [elements.tableFifthsAboveMinus, "tableFifthsAbove", -1],
  [elements.tableFifthsAbovePlus, "tableFifthsAbove", 1],
  [elements.tableFifthsBelowMinus, "tableFifthsBelow", -1],
  [elements.tableFifthsBelowPlus, "tableFifthsBelow", 1],
]) {
  button.addEventListener("click", () => {
    if (!modeTableFifthsAvailable()) return;
    state[key] = Math.min(MAX_TABLE_FIFTHS, Math.max(0, normalizedTableFifths(state[key]) + step));
    setOptionsDefaultStatus();
    render();
  });
}
elements.tableShowChords.addEventListener("change", (event) => {
  state.tableShowChords = event.target.checked;
  setOptionsDefaultStatus();
  render();
});
elements.tableShowRatios.addEventListener("change", (event) => {
  state.tableShowRatios = event.target.checked;
  setOptionsDefaultStatus();
  render();
});
elements.tableShowTetrachords.addEventListener("change", (event) => {
  state.tableShowTetrachords = event.target.checked;
  setOptionsDefaultStatus();
  render();
});
elements.tableShowIntervals.addEventListener("change", (event) => {
  state.tableShowIntervals = event.target.checked;
  setOptionsDefaultStatus();
  render();
});

elements.connectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.connectionLevel = Number(button.dataset.connectionLevel);
    state.connectionLevelManual = true;
    setOptionsDefaultStatus();
    render();
  });
});

elements.graphSystem.addEventListener("change", (event) => {
  setGraphSystem(event.target.value);
});

elements.simonAxis5LengthButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveAxis5Length(button.getAttribute("data-simon-axis-5-length"));
  });
});

window.addEventListener("storage", (event) => {
  if (event.key !== OPTIONS_DEFAULT_STORAGE_KEY) return;
  const saved = storedOptionsDefault();
  applyOptionsConfiguration(saved ?? FACTORY_OPTIONS);
  setOptionsDefaultStatus(saved
    ? "Configuration par défaut mise à jour dans un autre onglet."
    : "Paramètres d’origine rétablis dans un autre onglet.");
});

elements.textSize.addEventListener("input", (event) => {
  const value = Number(event.target.value);
  if (!Number.isFinite(value) || value < 0.5 || value > 4) return;
  state.textSize = value;
  setOptionsDefaultStatus();
  render();
});

elements.textOffset.addEventListener("input", (event) => {
  const value = Number(event.target.value);
  if (!Number.isFinite(value) || value < 0 || value > 6) return;
  state.textOffset = value;
  setOptionsDefaultStatus();
  render();
});

elements.targetedLabelMask.addEventListener("change", (event) => {
  setTargetedLabelMask(event.target.checked);
});

elements.audioMouseModeButtons.forEach((button) => {
  button.addEventListener("click", () => setAudioMouseMode(button.dataset.audioMouseMode));
});
elements.audioStop.addEventListener("click", stopAllSounds);
elements.soundControls.addEventListener("keydown", (event) => {
  // Toolbar controls must not play notes; let their native keyboard actions work.
  if (event.key === "Escape") return;
  event.stopPropagation();
});
document.addEventListener("click", (event) => {
  document.querySelectorAll(".audio-toolbar details[open]").forEach((menu) => {
    if (!menu.contains(event.target)) menu.open = false;
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".audio-toolbar details[open]").forEach((menu) => {
    menu.open = false;
    if (menu.contains(document.activeElement)) menu.querySelector("summary")?.focus();
  });
});
elements.soundMuteButton.addEventListener("click", () => {
  setAudioMuted(!state.audioMuted);
  setOptionsDefaultStatus();
});
elements.soundMuteButton.addEventListener("keydown", (event) => {
  if (event.code === "Space") event.stopPropagation();
});
elements.audioVolume.addEventListener("input", (event) => {
  const volume = Math.round(Math.min(100, Math.max(0, Number(event.target.value) || 0)));
  const wasAudible = !state.audioMuted && state.audioVolume > 0;
  if (volume === 0 && state.audioVolume > 0) state.audioVolumeBeforeMute = state.audioVolume;
  if (volume > 0) state.audioVolumeBeforeMute = volume;
  state.audioVolume = volume;
  state.audioMuted = volume === 0;
  setOptionsDefaultStatus();
  if (wasAudible && volume === 0) {
    audioEngine.generation += 1;
    audioEngine.latchedPending.clear();
    stopKeyboardSounds();
  }
  updateAudioOutputGain();
  refreshSoundingIndicators();
});
// Menu fermé : pas de saut au timbre de même initiale (les lettres jouent les notes).
elements.audioInstrument.addEventListener("keydown", (event) => {
  if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) event.preventDefault();
});
elements.audioInstrument.addEventListener("change", async (event) => {
  const instrument = normalizedAudioInstrument(event.target.value);
  if (!instrument) return;
  // Le menu rend la main après le choix (21 octobre 2026) : resté actif, il changeait de
  // timbre tout seul quand on jouait au clavier (lettres) ou naviguait avec les flèches.
  event.target.blur();
  stopAllSounds();
  state.audioInstrument = instrument;
  setOptionsDefaultStatus();
  applyAudioSettings();
  render();
  await preloadStudioInstrument(instrument);
});
[
  [elements.audioBrightness, "brightness"],
  [elements.audioReverb, "reverb"],
  [elements.audioWear, "wear"],
  [elements.audioHiss, "hiss"],
  [elements.audioWow, "wow"],
  [elements.audioSweep, "sweep"],
].forEach(([input, name]) => {
  input?.addEventListener("input", (event) => setAudioSetting(name, event.target.value));
});
elements.audioSettingsReset?.addEventListener("click", resetTimbreSettings);
elements.audioSettingsMenu?.addEventListener("toggle", placeAudioSettingsPopover);
window.addEventListener("resize", placeAudioSettingsPopover);
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
    const step = Number(button.dataset.audioOctaveStep);
    state.audioOctave = Math.min(1, Math.max(-1, state.audioOctave + step));
    setOptionsDefaultStatus();
    refreshSoundingIndicators();
  });
});

elements.optionsSaveDefault.addEventListener("click", () => {
  try {
    window.localStorage.setItem(OPTIONS_DEFAULT_STORAGE_KEY, JSON.stringify(currentOptionsConfiguration()));
    for (const key of [
      GRAPH_SYSTEM_STORAGE_KEY, SIMON_AXIS_5_LENGTH_STORAGE_KEY,
      SIMON_1_AXIS_5_LENGTH_STORAGE_KEY, TARGETED_LABEL_MASK_STORAGE_KEY,
    ]) window.localStorage.removeItem(key);
    setOptionsDefaultStatus("Configuration enregistrée par défaut dans ce navigateur.");
  } catch {
    setOptionsDefaultStatus("Enregistrement impossible dans ce navigateur.");
  }
});

elements.optionsRestoreFactory.addEventListener("click", () => {
  if (!window.confirm("Rétablir les paramètres d’origine et supprimer la configuration enregistrée ?")) return;
  try {
    for (const key of [
      OPTIONS_DEFAULT_STORAGE_KEY, GRAPH_SYSTEM_STORAGE_KEY,
      SIMON_AXIS_5_LENGTH_STORAGE_KEY, SIMON_1_AXIS_5_LENGTH_STORAGE_KEY,
      TARGETED_LABEL_MASK_STORAGE_KEY,
    ]) window.localStorage.removeItem(key);
  } catch {
    setOptionsDefaultStatus("Impossible de supprimer la configuration enregistrée dans ce navigateur.");
    return;
  }
  applyOptionsConfiguration(FACTORY_OPTIONS);
  setOptionsDefaultStatus("Paramètres d’origine rétablis.");
});

const pageTabButtons = [...document.querySelectorAll("[data-page-tab]")];
pageTabButtons.forEach((button) => {
  button.addEventListener("click", () => selectPageTab(button.dataset.pageTab));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = pageTabButtons.indexOf(button);
    const nextIndex = event.key === "Home" ? 0
      : event.key === "End" ? pageTabButtons.length - 1
      : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + pageTabButtons.length) % pageTabButtons.length;
    const nextButton = pageTabButtons[nextIndex];
    selectPageTab(nextButton.dataset.pageTab);
    nextButton.focus();
  });
});
window.addEventListener("message", handleNetworkAnalysisMessage);
elements.frettierTfeButton.addEventListener("click", () => switchFretboardType("tfe"));
elements.analysisToolbarSteps.addEventListener("click", () => sendNetworkAnalysisCommand("set-matrix-view", "steps"));
elements.analysisToolbarIntervals.addEventListener("click", () => sendNetworkAnalysisCommand("set-matrix-view", "intervals"));
elements.analysisToolbarDiscordances.addEventListener("click", () => sendNetworkAnalysisCommand("cycle-discordances"));
elements.frettierTfpButton.addEventListener("click", () => switchFretboardType("tfp"));
elements.frettierDiscordanceButton.addEventListener("click", () => sendFrettierCommand("cycle-discordances"));
elements.frettierFlexibilityButton.addEventListener("click", () => sendFrettierCommand("toggle-flexibility"));
// Capo (C1) : seuil de case réglable (1 mm par défaut).
document.querySelector("#frettier-capo-minimum-width")?.addEventListener("change", (event) => {
  const value = Number(String(event.target.value).replace(",", "."));
  if (Number.isFinite(value) && value >= 0) sendFrettierCommand("set-capo-minimum-width", value);
});
elements.frettierResetButton.addEventListener("click", () => sendFrettierCommand("reset"));
elements.frettierUndoButton.addEventListener("click", () => sendFrettierCommand("undo"));
elements.frettierRedoButton.addEventListener("click", () => sendFrettierCommand("redo"));
elements.frettierMinimumWidth.addEventListener("input", (event) => {
  if (!/^\d*(?:[.,]\d*)?$/.test(event.target.value)) {
    event.target.value = frettierUiState.minimumFretWidthDraft;
    return;
  }
  frettierUiState.minimumFretWidthDraft = event.target.value;
  sendFrettierCommand("set-minimum-width", event.target.value);
  renderFrettierMinimumWidthPresets();
});
elements.frettierMinimumWidth.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  frettierUiState.minimumFretWidthDraft = event.currentTarget.value;
  sendFrettierCommand("set-minimum-width", event.currentTarget.value);
  closeMenu(elements.frettierOptionsButton, elements.frettierOptionsPopover);
  elements.frettierOptionsButton.focus();
});
elements.frettierMinimumWidthPresets.addEventListener("click", (event) => {
  const button = event.target.closest("[data-minimum-fret-width-value]");
  if (!button) return;
  const value = button.dataset.minimumFretWidthValue;
  frettierUiState.minimumFretWidthDraft = value;
  elements.frettierMinimumWidth.value = value;
  sendFrettierCommand("set-minimum-width", value);
  renderFrettierMinimumWidthPresets();
});
elements.historyBack.addEventListener("click", () => navigateSelectionHistory(-1));
elements.historyForward.addEventListener("click", () => navigateSelectionHistory(1));
elements.pageRefresh.addEventListener("click", reloadApplicationPage);
[elements.pageRefresh, elements.historyBack, elements.historyForward].forEach((button) => {
  button.addEventListener("keydown", (event) => {
    if (event.code === "Space") event.stopPropagation();
  });
});
elements.selectionNavigationButtons.forEach((button) => {
  button.addEventListener("click", () => navigateSelectionMenu(button.dataset.selectionStep));
  button.addEventListener("keydown", (event) => {
    // Let Space activate a focused button instead of invoking the global silence shortcut.
    if (event.code === "Space") event.stopPropagation();
  });
});
elements.tonicNavigationButtons.forEach((button) => {
  button.addEventListener("click", () => navigateTonicNetwork(button.dataset.tonicStep));
  button.addEventListener("keydown", (event) => {
    if (event.code === "Space") event.stopPropagation();
  });
});
[elements.confirmModulation, elements.cancelModulation, elements.modulationColumnPrevious,
  elements.modulationColumnNext, elements.modulationExpandButton, elements.optionsButton,
  elements.frettierOptionsButton, elements.summaryDownloadButton,
  elements.summaryOptionsButton].forEach((button) => {
  button.addEventListener("keydown", (event) => {
    // Keep native Space activation for focused controls instead of invoking the global audio stop.
    if (event.code === "Space") event.stopPropagation();
  });
});
elements.confirmModulation.addEventListener("click", confirmAnalysisPreview);
elements.cancelModulation.addEventListener("click", cancelAnalysisPreview);
elements.modulationColumnPrevious.addEventListener("click", () => moveModulationColumnWindow(-1));
elements.modulationColumnNext.addEventListener("click", () => moveModulationColumnWindow(1));
elements.modulationExpandButton.addEventListener("click", () => {
  setModulationExpanded(!modulationColumnWindow.expanded);
});
elements.modeSelect.addEventListener("change", (event) => {
  stopAllSounds();
  discardModulationPreview();
  if (event.target.value === ALL_SELECTION_ID) {
    showAllAvailableNotes();
    return;
  }
  if (state.catalog === "tetracordes") {
    selectTetrachord(event.target.value);
    return;
  }
  if (state.catalog === "intervalles") {
    selectInterval(event.target.value);
    return;
  }
  clearIntervalTransitionContexts();
  if (state.catalog === "accords") {
    clearModeOriginContext();
    const [chordName, variantIndex] = event.target.value.split("::");
    state.selectedChordName = chordName || "";
    const available = availableChordVariantIndices(currentChord());
    const requested = variantIndex === undefined ? null : Number(variantIndex);
    state.selectedVariantIndex = available.includes(requested) ? requested : available[0] ?? 0;
    populateChordSelect();
    render();
    return;
  }
  state.selectedModeId = event.target.value;
  updateModeMenuLabel();
  render();
});

elements.modeMenuButton.addEventListener("click", () => {
  toggleMenu(elements.modeMenuButton, elements.modeMenuPopover);
});

elements.selectionSummary.addEventListener("click", () => {
  const willOpen = elements.tonicMenuPopover.hidden;
  toggleMenu(elements.selectionSummary, elements.tonicMenuPopover);
  if (willOpen) centerSelectedTonicMenu();
});

elements.optionsButton.addEventListener("click", () => {
  toggleMenu(elements.optionsButton, elements.optionsPopover);
  positionGraphOptions();
});

elements.frettierOptionsButton.addEventListener("click", () => {
  toggleMenu(elements.frettierOptionsButton, elements.frettierOptionsPopover);
});

elements.summaryDownloadButton.addEventListener("click", () => {
  if (!summaryWordExportInProgress) toggleMenu(elements.summaryDownloadButton, elements.summaryDownloadPopover);
});

elements.summaryDownloadWord.addEventListener("click", downloadNetworkSummaryWord);

elements.summaryOptionsButton.addEventListener("click", () => {
  if (elements.summaryOptionsPopover.hidden) {
    elements.summaryOptionsPopover.querySelectorAll(".summary-options-section")
      .forEach((section) => { section.open = false; });
  }
  toggleMenu(elements.summaryOptionsButton, elements.summaryOptionsPopover);
});

elements.summaryOptionsReset.addEventListener("click", () => {
  const data = networkAnalysisData();
  summaryUiState.disabledOutlineIds.clear();
  summaryUiState.outlineExpansion.clear();
  summaryExcludedTonicKeys(data).clear();
  renderNetworkSummaryDocument({ force: true });
});

elements.summaryTonicsAll.addEventListener("click", () => {
  const data = networkAnalysisData();
  const excluded = summaryExcludedTonicKeys(data);
  summaryBaseTonicBasins(data).forEach((basin) => excluded.delete(summaryTonicKey(data, basin.tonic)));
  renderNetworkSummaryDocument({ force: true });
});

elements.summaryTonicsNone.addEventListener("click", () => {
  const data = networkAnalysisData();
  const excluded = summaryExcludedTonicKeys(data);
  summaryBaseTonicBasins(data).forEach((basin) => excluded.add(summaryTonicKey(data, basin.tonic)));
  renderNetworkSummaryDocument({ force: true });
});

elements.networkConfigureButton.addEventListener("click", () => {
  const pageTab = document.body.dataset.pageTab;
  if (pageTab === "frettier") {
    openNetworkConfigurator({ context: {
      source: frettierUiState.fretboardType === "tfp" ? "frettier-tfp" : "frettier-tfe",
      ratiosOnly: true,
      expectedPitchCount: 12,
      seedRatios: frettierUiState.frets.length === 12 ? frettierUiState.frets : currentNetworkRatioLines(),
    } });
    return;
  }
  openNetworkConfigurator({ context: pageTab === "analysis"
    ? { source: "analysis", ratiosOnly: false }
    : { source: "modes", ratiosOnly: false } });
});
elements.networkConfigClose.addEventListener("click", () => closeNetworkConfigurator());
elements.networkPresetSelect.addEventListener("change", (event) => activateNetworkPreset(event.target.value));
elements.networkPresetButton.addEventListener("click", () => {
  const opening = elements.networkPresetMenu.hidden;
  closeNetworkPresetMenu();
  elements.networkPresetMenu.hidden = !opening;
  elements.networkPresetButton.setAttribute("aria-expanded", String(opening));
});
elements.networkPresetMenu.addEventListener("click", (event) => {
  if (handleTouchSortClick(event, (scope) => {
    renderNetworkPresetSelector();
    elements.networkPresetMenu.hidden = false;
    elements.networkPresetButton.setAttribute("aria-expanded", "true");
    const trigger = [...elements.networkPresetMenu.querySelectorAll(".network-preset-group-trigger")]
      .find((item) => item.textContent.trim().startsWith(scope.toUpperCase()));
    openNetworkPresetSubmenu(trigger);
    trigger?.closest(".network-preset-group")?.querySelector(`[data-touch-sort][aria-pressed="true"]`)?.focus();
  })) return;
  const option = event.target.closest("[data-network-preset-id]");
  if (option && !option.disabled) {
    const presetId = option.dataset.networkPresetId;
    closeNetworkPresetMenu();
    elements.networkPresetSelect.value = presetId;
    activateNetworkPreset(presetId);
    return;
  }
  const trigger = event.target.closest(".network-preset-group-trigger");
  if (trigger) openNetworkPresetSubmenu(trigger, true);
});
elements.networkPresetMenu.addEventListener("pointerover", (event) => {
  const trigger = event.target.closest(".network-preset-group-trigger");
  if (trigger) openNetworkPresetSubmenu(trigger);
});
elements.networkPresetMenu.addEventListener("focusin", (event) => {
  const trigger = event.target.closest(".network-preset-group-trigger");
  if (trigger) openNetworkPresetSubmenu(trigger);
});
elements.networkPresetButton.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.networkPresetMenu.hidden) {
    event.preventDefault();
    event.stopPropagation();
    closeNetworkPresetMenu();
  } else if (["ArrowDown", "ArrowUp"].includes(event.key)) {
    event.preventDefault();
    elements.networkPresetMenu.hidden = false;
    elements.networkPresetButton.setAttribute("aria-expanded", "true");
    const groups = [...elements.networkPresetMenu.querySelectorAll(".network-preset-group-trigger")];
    (event.key === "ArrowDown" ? groups[0] : groups.at(-1))?.focus();
  }
});
elements.networkPresetMenu.addEventListener("keydown", (event) => {
  const trigger = event.target.closest(".network-preset-group-trigger");
  if (trigger && ["ArrowRight", "Enter", " "].includes(event.key)) {
    event.preventDefault();
    openNetworkPresetSubmenu(trigger, true);
    return;
  }
  if (event.key === "ArrowLeft" && event.target.closest(".network-preset-submenu")) {
    event.preventDefault();
    const group = event.target.closest(".network-preset-group");
    closeNetworkPresetSubmenus();
    group?.querySelector(".network-preset-group-trigger")?.focus();
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    closeNetworkPresetMenu({ restoreFocus: true });
  } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
    event.preventDefault();
    const insideSubmenu = event.target.closest(".network-preset-submenu");
    const options = insideSubmenu
      ? [...insideSubmenu.querySelectorAll(".network-preset-option")].filter((option) => !option.disabled)
      : [...elements.networkPresetMenu.querySelectorAll(".network-preset-group-trigger")];
    const current = options.indexOf(document.activeElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1
      : event.key === "ArrowDown" ? (current + 1) % options.length
        : (current - 1 + options.length) % options.length;
    options[next]?.focus();
  }
});
elements.networkUnsavedContinue.addEventListener("click", () => {
  networkPendingAction = null;
  elements.networkUnsavedDialog.close();
  renderNetworkPresetSelector();
});
elements.networkUnsavedDiscard.addEventListener("click", () => {
  const action = networkPendingAction;
  networkPendingAction = null;
  elements.networkUnsavedDialog.close();
  networkCommitAfterSave = null;
  networkManager.draft = cloneNetworkConfiguration(activeNetworkPreset());
  networkManager.isNewDraft = false;
  networkConfiguratorMethod = networkManager.draft.sourceMethod;
  networkRenaming = false;
  networkMethodLocked = true;
  action?.();
});
elements.networkUnsavedSave.addEventListener("click", () => {
  const action = networkPendingAction;
  networkPendingAction = null;
  elements.networkUnsavedDialog.close();
  commitNetworkDraftAndContinue(action ?? (() => closeNetworkConfigurator()));
});
elements.networkUnsavedDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  networkPendingAction = null;
  elements.networkUnsavedDialog.close();
  renderNetworkPresetSelector();
});
elements.networkUpdateCancel.addEventListener("click", () => {
  elements.networkUpdateDialog.close();
  networkCommitAfterSave = null;
});
elements.networkUpdateDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  elements.networkUpdateDialog.close();
  networkCommitAfterSave = null;
});
elements.networkUpdateRename.addEventListener("click", () => {
  if (!networkManager.draft) return;
  elements.networkUpdateDialog.close();
  const originalName = networkManager.draft.name;
  networkManager.draft.id = networkPresetId();
  networkManager.draft.name = `${originalName} (copie)`;
  networkManager.isNewDraft = true;
  networkRenaming = true;
  renderNetworkConfigurator("Donnez un nom au nouveau réseau, puis enregistrez-le.");
  elements.networkNameInput.focus();
  elements.networkNameInput.select();
});
elements.networkUpdateConfirm.addEventListener("click", () => {
  elements.networkUpdateDialog.close();
  const continuation = networkCommitAfterSave ?? (() => closeNetworkConfigurator());
  if (!persistNetworkDraft()) return;
  networkCommitAfterSave = null;
  continuation();
});
elements.activeNetworkSelect.addEventListener("change", (event) => {
  if (event.target.value) activateNetworkPreset(event.target.value);
  else renderActiveNetworkSelector();
});
elements.activeNetworkButton.addEventListener("click", () => {
  // D3 : dans le Frettier, la fenêtre de choix des touches remplace le menu déroulant.
  if (document.body.dataset.pageTab === "frettier") { openTouchPicker(); return; }
  toggleMenu(elements.activeNetworkButton, elements.activeNetworkMenu);
});
elements.activeNetworkButton.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.activeNetworkMenu.hidden) {
    event.preventDefault();
    event.stopPropagation();
    closeMenu(elements.activeNetworkButton, elements.activeNetworkMenu);
    elements.activeNetworkButton.focus();
    return;
  }
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  if (document.body.dataset.pageTab === "frettier") { openTouchPicker(); return; }
  closeAllMenus(elements.activeNetworkMenu);
  elements.activeNetworkMenu.hidden = false;
  elements.activeNetworkButton.setAttribute("aria-expanded", "true");
  focusActiveNetworkMenuEntry(event.key, null);
});
elements.activeNetworkMenu.addEventListener("click", (event) => {
  // Classement des touches (19 octobre 2026) : redessiner sans fermer le menu.
  if (handleTouchSortClick(event, (scope) => {
    renderActiveNetworkSelector();
    const trigger = [...elements.activeNetworkMenu.querySelectorAll(".active-network-group-trigger")]
      .find((item) => item.textContent.trim().startsWith(scope.toUpperCase()));
    if (trigger) openActiveNetworkSubmenu(trigger);
    elements.activeNetworkMenu.querySelector(`[data-touch-scope="${scope}"][aria-pressed="true"]`)?.focus();
  })) return;
  const option = event.target.closest("[data-network-preset-id]");
  if (option && !option.disabled) {
    activateNetworkPreset(option.dataset.networkPresetId);
    closeMenu(elements.activeNetworkButton, elements.activeNetworkMenu);
    return;
  }
  const trigger = event.target.closest(".active-network-group-trigger");
  if (trigger) openActiveNetworkSubmenu(trigger, true);
});
elements.activeNetworkMenu.addEventListener("pointerover", (event) => {
  const trigger = event.target.closest(".active-network-group-trigger");
  if (trigger) openActiveNetworkSubmenu(trigger);
});
elements.activeNetworkMenu.addEventListener("focusin", (event) => {
  const trigger = event.target.closest(".active-network-group-trigger");
  if (trigger) openActiveNetworkSubmenu(trigger);
});
elements.activeNetworkMenu.addEventListener("keydown", (event) => {
  const trigger = event.target.closest(".active-network-group-trigger");
  if (trigger && ["ArrowRight", "Enter", " "].includes(event.key)) {
    event.preventDefault();
    openActiveNetworkSubmenu(trigger, true);
    return;
  }
  if (event.key === "ArrowLeft" && event.target.closest(".active-network-submenu")) {
    event.preventDefault();
    const group = event.target.closest(".active-network-group");
    closeActiveNetworkSubmenus();
    group?.querySelector(".active-network-group-trigger")?.focus();
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    closeMenu(elements.activeNetworkButton, elements.activeNetworkMenu);
    elements.activeNetworkButton.focus();
    return;
  }
  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
    event.preventDefault();
    focusActiveNetworkMenuEntry(event.key, event.target);
  }
});

function selectNetworkSourceMethod(method) {
  if (!networkManager.draft) return;
  if (networkConfiguratorContext.ratiosOnly && method !== "scala") return;
  if (networkMethodLocked && method !== networkManager.draft.sourceMethod) return;
  if (networkConfiguratorMethod !== method) rememberNetworkDraftChange();
  networkConfiguratorMethod = method === "configure" ? "configure" : "scala";
  if (networkConfiguratorMethod === "scala") {
    renderNetworkConfigurator();
    elements.networkScalaInput.setAttribute("aria-invalid", "false");
    elements.networkScalaStatus.textContent = "";
    elements.networkScalaInput.focus();
    return;
  }
  networkManager.draft.sourceMethod = "configure";
  previewNetworkDraft();
}

elements.networkMethodConfigure.addEventListener("click", () => selectNetworkSourceMethod("configure"));
elements.networkMethodScala.addEventListener("click", () => selectNetworkSourceMethod("scala"));
// Lot 9 : troisième départ de l'assistant « Nouveau réseau » : une touche du Frettier.
document.querySelector("#network-method-frettier")?.addEventListener("click", () => {
  closeNetworkConfigurator({ restoreFocus: false });
  selectPageTab("frettier");
  setFrettierSaveStatus("Construis ou accorde la touche, puis « Sauvegarder » : elle deviendra un réseau.");
});
elements.networkConfigUndo.addEventListener("click", () => travelNetworkDraftHistory("undo"));
elements.networkConfigRedo.addEventListener("click", () => travelNetworkDraftHistory("redo"));
elements.networkConfigReset.addEventListener("click", resetNetworkDraftToOpening);
document.querySelector("#network-modes-title")?.parentElement?.addEventListener("toggle", (event) => {
  if (!event.target.open || !networkManager.draft) return;
  if (networkConfiguratorMethod === "scala") refreshImportedNetworkFilters();
  else renderNetworkModeConfiguration(networkManager.draft);
});
[
  elements.networkNameInput,
  elements.networkDiapasonInput,
  elements.networkScalaInput,
].forEach((field) => field.addEventListener("blur", () => { networkEditingField = null; }));
elements.networkScalaInput.addEventListener("input", (event) => {
  if (!networkManager.draft) return;
  rememberNetworkTextEdit("scala");
  networkManager.draft.scalaText = event.target.value;
  delete networkManager.draft.scalaRatios;
  if (networkConfiguratorMethod === "scala") {
    try {
      networkModel.parseNetworkRatios(event.target.value);
      networkManager.draft.sourceMethod = "scala";
    } catch { /* Incomplete text stays editable; it is never applied. */ }
  }
  refreshImportedNetworkFilters();
  elements.networkScalaInput.setAttribute("aria-invalid", "false");
  elements.networkScalaStatus.textContent = "";
  updateNetworkDataControls();
  elements.networkDirtyIndicator.hidden = !networkDraftIsDirty();
  elements.networkSaveButton.disabled = !networkDraftIsDirty() || Boolean(networkManager.draft.savedFrettierSnapshot);
  scheduleNetworkPreview({ debounceMs: 180 });
});
elements.networkScalaApply.addEventListener("click", () => {
  if (!networkManager.draft) return;
  if (networkConfiguratorMethod === "scala") {
    rememberNetworkDraftChange();
    networkManager.draft.sourceMethod = "scala";
    networkManager.draft.scalaText = elements.networkScalaInput.value;
  }
  commitNetworkDraftAndContinue();
});

elements.networkNameInput.addEventListener("input", (event) => {
  if (!networkManager.draft) return;
  rememberNetworkTextEdit("name");
  networkManager.draft.name = event.target.value;
  elements.networkConfigReset.disabled = networkDraftMatchesOpening();
  elements.networkDirtyIndicator.hidden = !networkDraftIsDirty();
  elements.networkSaveButton.disabled = !networkDraftIsDirty() || Boolean(networkManager.draft.savedFrettierSnapshot);
  scheduleNetworkPreview({ debounceMs: 180 });
});

elements.networkDiapasonInput.addEventListener("input", (event) => {
  if (!networkManager.draft) return;
  const value = Number(event.target.value);
  if (!Number.isInteger(value) || value < 400 || value > 480) {
    elements.networkConfigStatus.textContent = "Le diapason doit être un nombre entier entre 400 et 480 Hz.";
    return;
  }
  rememberNetworkTextEdit("diapason");
  networkManager.draft.diapasonHz = value;
  previewNetworkDraft();
});

elements.networkGeneratorNote.addEventListener("click", () => {
  toggleNetworkPitchMenu(elements.networkGeneratorNote, elements.networkGeneratorNoteMenu);
});

elements.networkGeneratorNoteMenu.addEventListener("click", (event) => {
  const option = event.target.closest("[data-network-generator-pitch-ratio]");
  if (!option || !networkManager.draft) return;
  rememberNetworkDraftChange();
  const previousGeneratorRatio = networkManager.draft.generatorRatio;
  networkManager.draft.generatorRatio = option.dataset.networkGeneratorPitchRatio;
  transposeSelectedTonics(networkManager.draft, previousGeneratorRatio);
  previewNetworkDraft();
});

elements.networkFamilyBulk.addEventListener("click", (event) => {
  const bulk = event.target.closest("[data-network-family-bulk]");
  if (!bulk || !networkManager.draft) return;
  rememberNetworkDraftChange();
  const enabled = bulk.dataset.networkFamilyBulk === "all";
  if (networkConfiguratorMethod === "scala") {
    networkManager.draft.selectedTonicRatios = enabled ? null : [];
    previewNetworkDraft();
    return;
  }
  NETWORK_FAMILY_ORDER.forEach((familyKey) => {
    const family = networkManager.draft.families[familyKey];
    family.manualEnabled = NETWORK_FAMILY_BLUEPRINTS[familyKey].locked ? true : enabled;
    if (enabled) family.selectedTonics = generatedFamilyTonics({ ...networkManager.draft,
      families: { ...networkManager.draft.families, [familyKey]: { ...family, enabled: true } },
    }, familyKey);
    else family.selectedTonics = familyKey === "h3" ? [networkManager.draft.generatorRatio] : [];
  });
  synchronizeNetworkConfiguration(networkManager.draft);
  previewNetworkDraft();
});

elements.networkFamilyConfig.addEventListener("change", (event) => {
  if (!networkManager.draft) return;
  const importedTonic = event.target.closest("[data-network-imported-tonic]");
  const importedFamily = event.target.closest("[data-network-imported-family]");
  if (importedTonic || importedFamily) {
    rememberNetworkDraftChange();
    const tonics = importedTonic ? [importedTonic.dataset.networkImportedTonic]
      : importedNetworkTonicGroups(networkManager.draft)
        .find((group) => group.displayRatio === importedFamily.dataset.networkImportedFamily)?.tonics ?? [];
    setImportedTonicSelection(networkManager.draft, tonics, (importedTonic ?? importedFamily).checked);
    previewNetworkDraft();
    return;
  }
  const familyCheck = event.target.closest("[data-network-family-enabled]");
  if (familyCheck) {
    const familyKey = familyCheck.dataset.networkFamilyEnabled;
    if (NETWORK_FAMILY_BLUEPRINTS[familyKey]?.locked) return;
    rememberNetworkDraftChange();
    const family = networkManager.draft.families[familyKey];
    family.manualEnabled = familyCheck.checked;
    if (familyCheck.checked && family.selectedTonics.length === 0) {
      family.selectedTonics = generatedFamilyTonics({ ...networkManager.draft,
        families: { ...networkManager.draft.families, [familyKey]: { ...family, enabled: true } },
      }, familyKey);
    }
    synchronizeNetworkConfiguration(networkManager.draft);
    previewNetworkDraft();
    return;
  }
  const tonicCheck = event.target.closest("[data-network-family-tonic][data-network-tonic-ratio]");
  if (!tonicCheck) return;
  rememberNetworkDraftChange();
  const family = networkManager.draft.families[tonicCheck.dataset.networkFamilyTonic];
  const ratio = tonicCheck.dataset.networkTonicRatio;
  family.selectedTonics = tonicCheck.checked
    ? [...new Set([...family.selectedTonics, ratio])]
    : family.selectedTonics.filter((tonic) => tonic !== ratio);
  if (!Object.entries(networkManager.draft.families).some(([, candidate]) => (
    candidate.enabled && candidate.selectedTonics.length
  ))) {
    family.selectedTonics.push(ratio);
    renderNetworkConfigurator("Le réseau doit conserver au moins une tonique.");
    return;
  }
  previewNetworkDraft();
});

elements.networkFamilyConfig.addEventListener("click", (event) => {
  const imported = event.target.closest("[data-network-imported-bulk]");
  if (imported && networkManager.draft) {
    rememberNetworkDraftChange();
    const tonics = importedNetworkTonicGroups(networkManager.draft)
      .find((group) => group.displayRatio === imported.dataset.networkImportedBulk)?.tonics ?? [];
    setImportedTonicSelection(networkManager.draft, tonics, imported.dataset.networkBulkAction === "all");
    previewNetworkDraft();
    return;
  }
  const button = event.target.closest("[data-network-family-local-bulk]");
  if (!button || !networkManager.draft) return;
  rememberNetworkDraftChange();
  const key = button.dataset.networkFamilyLocalBulk;
  const family = networkManager.draft.families[key];
  family.selectedTonics = button.dataset.networkBulkAction === "all"
    ? generatedFamilyTonics({ ...networkManager.draft,
      families: { ...networkManager.draft.families, [key]: { ...family, enabled: true } },
    }, key)
    : key === "h3" && !configuredNetworkTonics(networkManager.draft)
      .some((tonic) => !family.selectedTonics.includes(tonic))
      ? [networkManager.draft.generatorRatio] : [];
  previewNetworkDraft();
});

elements.networkFunctionBulk.addEventListener("click", (event) => {
  const bulk = event.target.closest("[data-network-function-bulk]");
  if (!bulk || !networkManager.draft) return;
  rememberNetworkDraftChange();
  const selectAll = bulk.dataset.networkFunctionBulk === "all";
  NETWORK_FAMILY_ORDER.forEach((familyKey) => {
    const family = networkManager.draft.families[familyKey];
    if (family.enabled) family.functions = selectAll ? [...OPTIONAL_MODAL_FUNCTION_RATIOS] : [];
  });
  previewNetworkDraft();
});

elements.networkFunctionConfig.addEventListener("change", (event) => {
  if (!networkManager.draft) return;
  const rowCheck = event.target.dataset?.networkFunctionLimit
    && event.target.dataset?.networkFunctionFamily ? event.target : null;
  if (rowCheck) {
    rememberNetworkDraftChange();
    const family = networkManager.draft.families[rowCheck.dataset.networkFunctionFamily];
    const ratios = OPTIONAL_MODAL_FUNCTION_RATIOS.filter((ratio) => (
      modalFunctionLimit(ratio) === Number(rowCheck.dataset.networkFunctionLimit)
    ));
    family.functions = rowCheck.checked
      ? OPTIONAL_MODAL_FUNCTION_RATIOS.filter((ratio) => ratios.includes(ratio) || family.functions.includes(ratio))
      : family.functions.filter((ratio) => !ratios.includes(ratio));
    previewNetworkDraft();
    return;
  }
  const checkbox = event.target.closest("[data-network-family-function][data-network-function-ratio]");
  if (!checkbox) return;
  rememberNetworkDraftChange();
  const family = networkManager.draft.families[checkbox.dataset.networkFamilyFunction];
  const ratio = checkbox.dataset.networkFunctionRatio;
  family.functions = checkbox.checked
    ? OPTIONAL_MODAL_FUNCTION_RATIOS.filter((candidate) => (
      candidate === ratio || family.functions.includes(candidate)
    ))
    : family.functions.filter((candidate) => candidate !== ratio);
  previewNetworkDraft();
});

elements.networkFunctionConfig.addEventListener("click", (event) => {
  const button = event.target.closest("[data-network-function-local-bulk]");
  if (!button || !networkManager.draft) return;
  rememberNetworkDraftChange();
  networkManager.draft.families[button.dataset.networkFunctionLocalBulk].functions =
    button.dataset.networkBulkAction === "all" ? [...OPTIONAL_MODAL_FUNCTION_RATIOS] : [];
  previewNetworkDraft();
});

elements.networkModeBulk.addEventListener("click", (event) => {
  const bulk = event.target.closest("[data-network-mode-bulk]");
  if (!bulk || !networkManager.draft) return;
  rememberNetworkDraftChange();
  networkManager.draft.excludedModeIds = bulk.dataset.networkModeBulk === "all"
    ? [] : MODE_PRESETS.map((mode) => mode.id);
  previewNetworkDraft();
});

elements.networkModeConfig.addEventListener("change", (event) => {
  if (!networkManager.draft) return;
  const groupCheck = event.target.dataset?.networkModeGroup !== undefined ? event.target : null;
  const familyCheck = event.target.dataset?.networkModeFamily !== undefined ? event.target : null;
  if (groupCheck || familyCheck) {
    rememberNetworkDraftChange();
    const [groupIndex, familyIndex] = familyCheck
      ? familyCheck.dataset.networkModeFamily.split(":").map(Number)
      : [Number(groupCheck.dataset.networkModeGroup), null];
    const selected = Boolean((groupCheck ?? familyCheck).checked);
    const possibleIds = networkPossibleModeIds(networkManager.draft);
    const affected = MODE_PRESETS.filter((mode) => (
      mode.group === MODE_GROUPS[groupIndex].label
      && (familyIndex === null || mode.family === MODE_GROUPS[groupIndex].families[familyIndex].label)
      && possibleIds.has(mode.id)
    )).map((mode) => mode.id);
    networkManager.draft.excludedModeIds = selected
      ? networkManager.draft.excludedModeIds.filter((id) => !affected.includes(id))
      : [...new Set([...networkManager.draft.excludedModeIds, ...affected])];
    previewNetworkDraft();
    return;
  }
  const checkbox = event.target.closest("[data-network-mode-id]");
  if (!checkbox) return;
  rememberNetworkDraftChange();
  const id = checkbox.dataset.networkModeId;
  networkManager.draft.excludedModeIds = checkbox.checked
    ? networkManager.draft.excludedModeIds.filter((candidate) => candidate !== id)
    : [...new Set([...networkManager.draft.excludedModeIds, id])];
  previewNetworkDraft();
});

elements.networkCopyDataButton.addEventListener("click", async () => {
  try {
    await copyText(networkRatioLines(networkManager.draft).join("\n"));
    elements.networkCopyDataStatus.textContent = "Hauteurs copiées.";
  } catch {
    elements.networkCopyDataStatus.textContent = "Copie impossible.";
  }
});

elements.networkNewButton.addEventListener("click", () => {
  guardNetworkDraft(() => openNetworkConfigurator({ newDraft: true }));
});
elements.networkDuplicateButton.addEventListener("click", () => {
  guardNetworkDraft(() => {
    const source = activeNetworkPreset();
    networkManager.draft = normalizeNetworkConfiguration({
      ...cloneNetworkConfiguration(source),
      id: networkPresetId(),
      name: `${source.name} - Copie`.slice(0, 60),
    });
    networkManager.isNewDraft = true;
    networkRenaming = true;
    networkConfiguratorMethod = networkManager.draft.sourceMethod;
    networkMethodLocked = true;
    networkDraftHistory.undo.length = 0;
    networkDraftHistory.redo.length = 0;
    networkOpeningSnapshot = networkDraftSnapshot();
    renderNetworkConfigurator("Copie prête : enregistrez pour l’appliquer.");
    elements.networkNameInput.focus();
    elements.networkNameInput.select();
  });
});
elements.networkRenameButton.addEventListener("click", () => {
  if (!networkManager.draft) return;
  networkRenaming = true;
  renderNetworkConfigurator();
  elements.networkNameInput.focus();
  elements.networkNameInput.select();
});
elements.networkNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    elements.networkNameInput.blur();
  }
  if (event.key === "Escape") {
    event.preventDefault();
    networkManager.draft.name = activeNetworkPreset().name;
    networkRenaming = false;
    renderNetworkConfigurator();
    elements.networkRenameButton.focus();
  }
});
elements.networkSaveButton.addEventListener("click", () => commitNetworkDraftAndContinue());
elements.frettierSaveButton.addEventListener("click", openFrettierSaveDialog);
document.querySelector("#top-toolbar-toggle").addEventListener("click", toggleTopToolbar);
document.querySelector("#fullscreen-toggle")?.addEventListener("click", toggleFullscreen);
document.querySelector("#fullscreen-toggle")?.addEventListener("keydown", (event) => event.stopPropagation());
document.addEventListener?.("fullscreenchange", renderFullscreenToggle);
document.addEventListener?.("webkitfullscreenchange", renderFullscreenToggle);
document.querySelector("#top-toolbar-toggle").addEventListener("keydown", (event) => event.stopPropagation());
document.querySelector("#frettier-save-form").addEventListener("submit", (event) => {
  event.preventDefault();
  void saveCurrentTfeNetwork();
});
document.querySelector("#frettier-save-cancel").addEventListener("click", () => {
  if (!pendingFrettierSave?.busy) document.querySelector("#frettier-save-dialog").close();
});
document.querySelector("#frettier-save-dialog").addEventListener("cancel", (event) => {
  if (pendingFrettierSave?.busy) event.preventDefault();
});
document.querySelector("#frettier-save-dialog").addEventListener("close", () => {
  pendingFrettierSave = null;
  elements.frettierSaveButton.focus({ preventScroll: true });
});
document.querySelector("#frettier-save-name").addEventListener("input", () => {
  if (pendingFrettierSave) pendingFrettierSave.replacement = null;
  document.querySelector("#frettier-save-confirm").textContent = "Sauvegarder";
  document.querySelector("#frettier-save-feedback").textContent = "";
});
elements.networkDeleteButton.addEventListener("click", () => guardNetworkDraft(() => {
  if (networkManager.isNewDraft || networkManager.presets.length <= 1) return;
  const preset = activeNetworkPreset();
  if (!window.confirm(`Supprimer « ${preset.name} »?`)) return;
  if (preset.savedFrettierSnapshot) {
    void deletePersonalTfeNetwork(preset);
    return;
  }
  networkManager.presets = networkManager.presets.filter((candidate) => candidate.id !== preset.id);
  if (networkManager.defaultId === preset.id) networkManager.defaultId = networkManager.presets[0].id;
  networkManager.activeId = networkManager.defaultId;
  Object.keys(networkManager.lastActiveIdsByScope).forEach((scope) => {
    if (networkManager.lastActiveIdsByScope[scope] === preset.id) delete networkManager.lastActiveIdsByScope[scope];
  });
  networkManager.lastActiveIdsByScope[activeNetworkPreset().scope] = networkManager.activeId;
  networkManager.draft = cloneNetworkConfiguration(activeNetworkPreset());
  networkRenaming = false;
  networkMethodLocked = true;
  networkDraftHistory.undo.length = 0;
  networkDraftHistory.redo.length = 0;
  networkOpeningSnapshot = networkDraftSnapshot();
  saveNetworkStore();
  applyNetworkConfiguration(activeNetworkPreset(), { resetSelection: true });
  renderNetworkConfigurator("Réseau supprimé.");
}));

elements.tonicMenuPopover.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tonic-ratio]");
  if (!button) return;
  const ratio = button.dataset.tonicRatio;
  if (ratio === state.selectedTonic) closeMenu(elements.selectionSummary, elements.tonicMenuPopover);
  else selectTonic(ratio);
});

elements.modeMenuPopover.addEventListener("click", (event) => {
  const overviewButton = event.target.closest("[data-catalog-overview]");
  if (overviewButton) {
    showAllAvailableNotes();
    return;
  }
  const groupTrigger = event.target.closest(".mode-menu-group-trigger");
  if (groupTrigger) {
    if (event.target.closest(".mode-menu-group-arrow")) {
      openFanSubmenu(groupTrigger);
      return;
    }
    if (state.catalog === "tetracordes") {
      const code = groupTrigger.dataset.defaultTetrachordCode;
      if (code) selectTetrachord(code);
      else openFanSubmenu(groupTrigger);
      return;
    }
    if (state.catalog === "intervalles") {
      const defaultSelection = groupTrigger.dataset.defaultIntervalSelection;
      if (defaultSelection) {
        selectInterval(defaultSelection);
        return;
      }
      openFanSubmenu(groupTrigger);
      return;
    }
    stopAllSounds();
    discardModulationPreview();
    if (state.catalog === "accords" && groupTrigger.dataset.defaultChordName) {
      clearIntervalTransitionContexts();
      clearModeOriginContext();
      state.selectedChordName = groupTrigger.dataset.defaultChordName;
      const requested = groupTrigger.dataset.defaultChordVariantIndex === undefined
        ? null
        : Number(groupTrigger.dataset.defaultChordVariantIndex);
      const available = availableChordVariantIndices(currentChord());
      state.selectedVariantIndex = available.includes(requested) ? requested : available[0] ?? 0;
      closeMenu(elements.modeMenuButton, elements.modeMenuPopover);
      populateChordSelect();
      render();
      return;
    }
    if (state.catalog === "modes" && groupTrigger.dataset.defaultModeId) {
      clearIntervalTransitionContexts();
      state.selectedModeId = groupTrigger.dataset.defaultModeId;
      elements.modeSelect.value = state.selectedModeId;
      closeMenu(elements.modeMenuButton, elements.modeMenuPopover);
      updateModeMenuLabel();
      render();
      return;
    }
    openFanSubmenu(groupTrigger);
    return;
  }
  if (state.catalog === "tetracordes") {
    const button = event.target.closest("[data-tetrachord-code]");
    if (button && !button.disabled) selectTetrachord(button.dataset.tetrachordCode);
    return;
  }
  if (state.catalog === "intervalles") {
    const intervalButton = event.target.closest("[data-interval-selection]");
    if (!intervalButton) return;
    selectInterval(intervalButton.dataset.intervalSelection);
    return;
  }
  if (state.catalog === "accords") {
    const button = event.target.closest("[data-chord-name]");
    if (!button) return;
    stopAllSounds();
    discardModulationPreview();
    clearIntervalTransitionContexts();
    clearModeOriginContext();
    state.selectedChordName = button.dataset.chordName || "";
    const requested = button.dataset.chordVariantIndex === undefined
      ? null
      : Number(button.dataset.chordVariantIndex);
    const available = availableChordVariantIndices(currentChord());
    state.selectedVariantIndex = available.includes(requested) ? requested : available[0] ?? 0;
    closeMenu(elements.modeMenuButton, elements.modeMenuPopover);
    populateChordSelect();
    render();
    return;
  }
  const button = event.target.closest("[data-mode-id], [data-default-mode-id]");
  if (!button) return;
  stopAllSounds();
  discardModulationPreview();
  clearIntervalTransitionContexts();
  state.selectedModeId = button.dataset.defaultModeId ?? button.dataset.modeId;
  elements.modeSelect.value = state.selectedModeId;
  closeMenu(elements.modeMenuButton, elements.modeMenuPopover);
  updateModeMenuLabel();
  render();
});

elements.modeMenuPopover.addEventListener("pointerover", (event) => {
  const groupTrigger = event.target.closest(".mode-menu-group-trigger");
  if (groupTrigger) openFanSubmenu(groupTrigger);
  else if (event.target.closest(".mode-menu-overview")) closeFanSubmenus();
});

elements.modeMenuPopover.addEventListener("focusin", (event) => {
  const groupTrigger = event.target.closest(".mode-menu-group-trigger");
  if (groupTrigger) openFanSubmenu(groupTrigger);
  else if (event.target.closest(".mode-menu-overview")) closeFanSubmenus();
});

elements.modeMenuPopover.addEventListener("keydown", (event) => {
  const groupTrigger = event.target.closest(".mode-menu-group-trigger");
  if (groupTrigger && event.key === "ArrowRight") {
    event.preventDefault();
    openFanSubmenu(groupTrigger, true);
    return;
  }
  const submenu = event.target.closest(".mode-menu-submenu");
  if (submenu && event.key === "ArrowLeft") {
    event.preventDefault();
    const trigger = submenu.closest(".mode-menu-fan-group")?.querySelector(".mode-menu-group-trigger");
    closeFanSubmenus();
    trigger?.focus();
    return;
  }
  const container = submenu ?? event.target.closest(".mode-menu-primary");
  if (!container || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
  const choices = [...container.querySelectorAll("button:not(:disabled)")].filter((button) => !button.hidden);
  const currentIndex = choices.indexOf(event.target.closest("button"));
  if (currentIndex < 0 || !choices.length) return;
  event.preventDefault();
  const direction = event.key === "ArrowDown" ? 1 : -1;
  choices[(currentIndex + direction + choices.length) % choices.length].focus();
});

elements.modeVariantSelector.addEventListener("click", (event) => {
  if (state.catalog === "accords") {
    const button = event.target.closest("[data-chord-variant-index]");
    if (!button) return;
    stopAllSounds();
    discardModulationPreview();
    clearIntervalTransitionContexts();
    clearModeOriginContext();
    state.selectedVariantIndex = Number(button.dataset.chordVariantIndex);
    populateChordSelect();
    render();
    return;
  }
  const button = event.target.closest("[data-mode-id]");
  if (!button) return;
  stopAllSounds();
  discardModulationPreview();
  clearIntervalTransitionContexts();
  state.selectedModeId = button.dataset.modeId;
  elements.modeSelect.value = state.selectedModeId;
  updateModeMenuLabel();
  render();
});

document.addEventListener("keydown", async (event) => {
  if (document.body.dataset.pageTab === "frettier") {
    handleFrettierKeyboard(event);
    return;
  }
  if (document.body.dataset.pageTab && document.body.dataset.pageTab !== "modes") return;
  if (handleSelectionNavigationKey(event)) return;
  if (
    (event.ctrlKey || event.metaKey)
    && !event.repeat
    && !event.altKey
    && !isTypingTarget(event.target)
    && (event.key.toLowerCase() === "z" || event.key.toLowerCase() === "y")
  ) {
    event.preventDefault();
    const redo = event.key.toLowerCase() === "y" || (event.key.toLowerCase() === "z" && event.shiftKey);
    navigateSelectionHistory(redo ? 1 : -1);
    return;
  }
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
    event.repeat ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    isTypingTarget(event.target) ||
    !AUDIO_KEYBOARD_MAP.has(event.code)
  ) return;
  const pitch = keyboardPitch(event.code);
  if (!pitch || audioEngine.pressedKeyboardCodes.has(event.code)) return;
  event.preventDefault();
  startPressedKeyVoice(event.code, pitch);
});

/** Clavier dans l'onglet Frettier : barre d'espace pour tout arrêter, trois rangées pour jouer.
 *  Reçoit aussi les touches transmises par le cadre du Frettier (objet de même forme). */
function handleFrettierKeyboard(event) {
  if (event.ctrlKey || event.metaKey || event.altKey || isTypingTarget(event.target)) return false;
  if (event.code === "Space") {
    if (event.repeat) return true;
    event.preventDefault?.();
    stopAllSounds();
    return true;
  }
  if (event.repeat || !AUDIO_KEYBOARD_MAP.has(event.code)) return false;
  const pitch = frettierKeyboardPitch(event.code);
  if (!pitch || audioEngine.pressedKeyboardCodes.has(event.code)) return false;
  event.preventDefault?.();
  startPressedKeyVoice(event.code, pitch);
  return true;
}

document.addEventListener("keyup", (event) => {
  if (!AUDIO_KEYBOARD_MAP.has(event.code)) return;
  if (releasePressedKeyVoice(event.code)) event.preventDefault();
});

window.addEventListener("blur", stopKeyboardSounds);
function positionGraphOptions() {
  const menu = elements.optionsPopover;
  if (menu.hidden) return;
  const anchor = elements.optionsButton.getBoundingClientRect();
  const width = Math.min(390, window.innerWidth - 28);
  const below = window.innerHeight - anchor.bottom - 12;
  const above = anchor.top - 12;
  const upwards = below < 280 && above > below;
  menu.style.width = `${width}px`;
  menu.style.maxHeight = `${Math.max(100, upwards ? above : below)}px`;
  menu.style.left = `${Math.max(8, Math.min(anchor.right - width, window.innerWidth - width - 8))}px`;
  menu.style.top = upwards ? "auto" : `${anchor.bottom + 5}px`;
  menu.style.bottom = upwards ? `${window.innerHeight - anchor.top + 5}px` : "auto";
}
window.addEventListener("resize", positionGraphOptions);
window.addEventListener("resize", updateConcordantTableOverflow);
window.addEventListener("resize", updateTableTonicMarker);
elements.tableScroll.addEventListener("scroll", updateTableTonicMarker, { passive: true });
if (typeof ResizeObserver !== "undefined") {
  const tonicMarkerObserver = new ResizeObserver(() => {
    updateConcordantTableOverflow();
    updateTableTonicMarker();
  });
  tonicMarkerObserver.observe(elements.tableContent);
  tonicMarkerObserver.observe(elements.tableSection);
  tonicMarkerObserver.observe(elements.tableScroll);
}

function updateTableTonicMarker() {
  const marker = elements.tableTonicMarker;
  if (!marker) return;
  marker.hidden = true;
  if (!state.showTablePanel || elements.tableSection.hidden
    || (document.body.dataset.pageTab && document.body.dataset.pageTab !== "modes")) return;
  const row = elements.tableContent.querySelector(".mode-heji-row.is-selected-tonic");
  const note = row?.querySelector(".mode-heji-cell .heji-note");
  if (!row || !note) return;
  const anchor = note.getBoundingClientRect();
  const rowBounds = row.getBoundingClientRect();
  const section = elements.tableSection.getBoundingClientRect();
  const viewport = elements.tableScroll.getBoundingClientRect();
  const center = anchor.top + anchor.height / 2;
  if (!anchor.height || center < viewport.top || center > viewport.bottom) return;
  // An overlay outside the table flow: zero width is reserved for the marker.
  marker.style.left = `${rowBounds.left - section.left - 10}px`;
  marker.style.top = `${center - section.top}px`;
  marker.hidden = false;
}

function positionWindowDisplayMenu(menu) {
  const options = menu.querySelector(".window-display-options");
  if (!options) return;
  if (!menu.open) {
    menu.classList.remove("open-upward");
    options.style.removeProperty("--window-menu-available-height");
    return;
  }
  const bounds = menu.getBoundingClientRect();
  const spaceBelow = Math.max(0, window.innerHeight - bounds.bottom - 8);
  const spaceAbove = Math.max(0, bounds.top - 8);
  const openUpward = spaceBelow < options.scrollHeight + 4 && spaceAbove > spaceBelow;
  menu.classList.toggle("open-upward", openUpward);
  options.style.setProperty(
    "--window-menu-available-height",
    `${Math.max(48, openUpward ? spaceAbove : spaceBelow)}px`,
  );
}

document.querySelectorAll(".window-display-menu").forEach((menu) => {
  menu.addEventListener("toggle", () => positionWindowDisplayMenu(menu));
});
window.addEventListener("resize", () => {
  document.querySelectorAll(".window-display-menu[open]").forEach(positionWindowDisplayMenu);
});
window.addEventListener("scroll", () => {
  document.querySelectorAll(".window-display-menu[open]").forEach(positionWindowDisplayMenu);
}, { passive: true });

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopKeyboardSounds();
});

document.addEventListener("click", (event) => {
  closeNetworkOnOutsideClick(event);
  document.querySelectorAll(".window-display-menu[open]").forEach((menu) => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  if (!elements.modeMenuButton.parentElement.contains(event.target)) {
    closeMenu(elements.modeMenuButton, elements.modeMenuPopover);
  }
  if (!elements.selectionSummary.parentElement.contains(event.target)) {
    closeMenu(elements.selectionSummary, elements.tonicMenuPopover);
  }
  if (!elements.optionsButton.parentElement.contains(event.target)) {
    closeMenu(elements.optionsButton, elements.optionsPopover);
  }
  if (!elements.frettierOptionsButton.parentElement.contains(event.target)) {
    closeMenu(elements.frettierOptionsButton, elements.frettierOptionsPopover);
  }
  if (!elements.summaryDownloadButton.parentElement.contains(event.target)) {
    closeMenu(elements.summaryDownloadButton, elements.summaryDownloadPopover);
  }
  // composedPath() garde le trajet du clic même si l'élément cliqué a été redessiné entre-temps
  // (cases et boutons du menu Contenu) : un clic dans le menu ne le ferme jamais.
  if (!event.composedPath().includes(elements.summaryOptionsButton.parentElement)) {
    closeMenu(elements.summaryOptionsButton, elements.summaryOptionsPopover);
  }
  if (!elements.activeNetworkButton.parentElement.contains(event.target)) {
    closeMenu(elements.activeNetworkButton, elements.activeNetworkMenu);
  }
  if (!elements.networkPresetPicker.contains(event.target)) {
    closeNetworkPresetMenu();
  }
  if (!elements.networkGeneratorNote.parentElement.contains(event.target)) {
    closeNetworkPitchMenus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (elements.networkUnsavedDialog.open) return;
  const openDisplayMenu = document.querySelector(".window-display-menu[open]");
  if (openDisplayMenu) {
    openDisplayMenu.open = false;
    if (openDisplayMenu.contains(document.activeElement)) {
      openDisplayMenu.querySelector("summary")?.focus();
    }
    return;
  }
  if (modulationColumnWindow.expanded) {
    setModulationExpanded(false);
    return;
  }
  if (!elements.networkGeneratorNoteMenu.hidden) {
    closeNetworkPitchMenus();
    return;
  }
  if (!elements.networkPresetMenu.hidden) {
    closeNetworkPresetMenu({ restoreFocus: true });
    return;
  }
  if (!elements.networkConfigDrawer.hidden) {
    closeNetworkConfigurator();
    return;
  }
  closeAllMenus();
});

document.querySelectorAll("[data-harmonic-view]").forEach((button) => {
  button.addEventListener("click", () => switchHarmonicView(button.dataset.harmonicView));
});

function selectGraphView(view) {
  state.graphView = view;
  if (state.displayMode === "degrees" && !["mode", "mode-network"].includes(view)) {
    setDisplayMode("heji");
  }
  setOptionsDefaultStatus();
  render();
}

elements.graphViewSelect.addEventListener("change", (event) => selectGraphView(event.target.value));
elements.graphViewButtons.forEach((button) => {
  button.addEventListener("click", () => selectGraphView(button.dataset.graphView));
});


elements.modesSidebarToggle?.addEventListener("click", () => {
  setModesSidebarCollapsed(!state.modesSidebarCollapsed);
});
elements.modesSidebarToggle?.addEventListener("keydown", (event) => {
  // Keep native Enter/Space activation without playing a note or navigating a mode.
  event.stopPropagation();
});
window.addEventListener("resize", positionModesSidebarToggle);
window.addEventListener("scroll", positionModesSidebarToggle, { passive: true });
if (elements.modesLayout && typeof ResizeObserver !== "undefined") {
  const sidebarObserver = new ResizeObserver(positionModesSidebarToggle);
  sidebarObserver.observe(elements.modesLayout);
  sidebarObserver.observe(elements.primarySelection);
}

if (elements.graphWorkspace && typeof ResizeObserver !== "undefined") {
  const graphWorkspaceObserver = new ResizeObserver(scheduleGraphFit);
  graphWorkspaceObserver.observe(elements.graphWorkspace);
  graphWorkspaceObserver.observe(elements.selectionGraphPanel);
  graphWorkspaceObserver.observe(elements.tonicNetworkGraphPanel);
}

if (elements.modulationPanel && typeof ResizeObserver !== "undefined") {
  const modulationPanelObserver = new ResizeObserver(() => fitModulationDataColumns());
  modulationPanelObserver.observe(elements.modulationPanel);
}

if (elements.modeMenuButton && typeof ResizeObserver !== "undefined") {
  const selectionMenuObserver = new ResizeObserver(scheduleSelectionMenuTypography);
  selectionMenuObserver.observe(elements.modeMenuButton);
}

document.fonts?.ready.then(() => {
  scheduleGraphFit();
  scheduleSelectionMenuTypography();
  scheduleSummaryTargetedLabelMasks();
});
document.fonts?.addEventListener("loadingdone", () => {
  scheduleGraphFit();
  scheduleSelectionMenuTypography();
  scheduleSummaryTargetedLabelMasks();
});
window.addEventListener("resize", scheduleSummaryTargetedLabelMasks);

// Touche TFE sans scordatura choisie hors du Frettier : ouvrir cette touche dans le Frettier.
document.querySelector("#fret-template-open-frettier")?.addEventListener("click", () => selectPageTab("frettier"));


function initializeNetworkSelection() {
  // Stored pitches are ratios to the diapason. HEJI applies its note once,
  // at display time; multiplying by referenceRatio here transposes twice.
  state.selectedTonic = activeNetworkPreset().generatorRatio;
  state.selectedFamily = TONIC_FAMILY_BY_RATIO.get(state.selectedTonic);
  state.intervalAnchorTonic = state.selectedTonic;
}

loadNetworkStore();
const savedOptionsDefault = storedOptionsDefault();
if (savedOptionsDefault) applyOptionsConfiguration(savedOptionsDefault, { renderNow: false });
const savedLatestOptions = storedOptionsDefault(OPTIONS_LATEST_STORAGE_KEY);
if (savedLatestOptions) applyOptionsConfiguration(savedLatestOptions, { renderNow: false });
resetNetworkAnalysisUiState(appliedNetworkConfiguration.id, { awaitInitialState: false });
networkAnalysisStateCanRestoreModes = true;
initializeNetworkSelection();
reconcileSelectionWithNetwork();
restoreStateFromUrl();
reconcileSelectionWithNetwork();
renderNetworkPresetSelector();
populateSelectionMenu();
optionsPersistenceReady = true;
document.body.dataset.pageTab = INITIAL_PAGE_TAB;
render();
selectPageTab(INITIAL_PAGE_TAB);
// Au chargement, une sauvegarde personnelle absente reste silencieuse : le message
// n'apparaît que si l'on tente réellement de sauvegarder une touche.
void loadPersonalTfeNetworks().catch((error) => {
  console.warn("Les touches personnelles ne sont pas disponibles pour l’instant.", error);
});
// Largeur du menu des timbres : au démarrage, puis une fois les polices chargées.
sizeTimbreSelect();
document.fonts?.ready.then(sizeTimbreSelect).catch(() => {});
renderFullscreenToggle();

// ---------- Fenêtre de choix des touches (demande D3 de Simon, 19 octobre 2026) ----------
// Remplace, dans le Frettier, le menu déroulant des touches TFE et TFP. Trois colonnes : filtres (limite, centre
// tonal, scordatura), liste des modèles compatibles avec leurs nombres de polyvalence, aperçu du modèle survolé
// (rapports colorés, cordes à vide, petit manche, modes complets), avec « Comparer » pour épingler deux ou trois
// candidats. En TFP, les centres tonals sont des transpositions h3 calculées à la volée (pas des préréglages)
// et la scordatura est un résultat (tfpScordaturaForNetwork, demande D5). En TFE, la scordatura est un choix
// libre parmi les préréglages du Frettier.

let touchPickerScordaturas = [];
const TOUCH_PICKER_STORE_KEY = "harmonie-naturelle-fenetre-touches-v1";
// Centres tonals h3, de sol à si (rapports à la).
const TOUCH_PICKER_CENTERS = [["G", "sol", "16/9"], ["D", "ré", "4/3"], ["A", "la", "1/1"], ["E", "mi", "3/2"], ["B", "si", "9/8"]];
const TOUCH_PICKER_LIMITS = [3, 5, 7, 11, 13];
// Modèles à ne pas transposer : aucun. TFP-L11-(33/20) se transpose par h3 (précision de Simon, 20 octobre 2026);
const TOUCH_PICKER_NO_TRANSPOSITION = new Set();
const touchPicker = {
  scope: "tfp", open: false, element: null, hoveredId: null, selectedId: null, pinned: [], tfeScordatura: "", union: new Set(),
  filters: { limits: [], centers: [], scordaturas: [] }, statsQueue: [], statsTimer: null,
};

function touchPickerLoadFilters(scope) {
  try {
    const stored = JSON.parse(localStorage.getItem(TOUCH_PICKER_STORE_KEY) || "{}")?.[scope];
    if (stored && typeof stored === "object") {
      return {
        limits: Array.isArray(stored.limits) ? stored.limits.filter((value) => TOUCH_PICKER_LIMITS.includes(value)) : [],
        centers: Array.isArray(stored.centers) ? stored.centers.filter((value) => TOUCH_PICKER_CENTERS.some(([letter]) => letter === value)) : [],
        scordaturas: Array.isArray(stored.scordaturas) ? stored.scordaturas.filter((value) => typeof value === "string") : [],
        tfeScordatura: typeof stored.tfeScordatura === "string" ? stored.tfeScordatura : "",
      };
    }
  } catch { /* Filtres par défaut. */ }
  return { limits: [], centers: [], scordaturas: [], tfeScordatura: "" };
}

function touchPickerSaveFilters() {
  try {
    const stored = JSON.parse(localStorage.getItem(TOUCH_PICKER_STORE_KEY) || "{}") || {};
    stored[touchPicker.scope] = { ...touchPicker.filters, tfeScordatura: touchPicker.tfeScordatura };
    localStorage.setItem(TOUCH_PICKER_STORE_KEY, JSON.stringify(stored));
  } catch { /* Mémoire du filtre facultative. */ }
}

function touchPickerCenterOf(ratio) {
  const heji = ratioToHeji(ratio);
  return heji ? plainHejiNote(heji) : ratio;
}

/** Nom d'une TFP transposée : même nom, scordatura recalculée, nouvelle tonique entre parenthèses. */
function touchPickerTransposedName(name, code, letter) {
  const base = String(name).replace(/(?:-[A-G]\d+(?:[A-G]\d+)*)? \([A-G][♯♭]?\)$/, "");
  return `${base}${code && code !== "—" ? `-${code}` : ""} (${letter})`;
}

function touchPickerTransposition(preset, center) {
  if (TOUCH_PICKER_NO_TRANSPOSITION.has(preset.transposedFrom ?? preset.id)) return null;
  const [letter, , ratio] = center;
  const config = { ...preset, id: `${preset.transposedFrom ?? preset.id}@${letter}`, generatorRatio: ratio,
    referenceRatio: "1/1", transposedFrom: preset.transposedFrom ?? preset.id };
  const scordatura = tfpScordaturaForNetwork(config);
  if (!scordatura) return null;
  return { ...config, name: touchPickerTransposedName(preset.name, scordatura.label, letter) };
}

function touchPickerLimit(preset) {
  const named = Number(/^TF[EP]-L(\d+)/.exec(preset.name)?.[1]);
  if (Number.isFinite(named) && named > 0) return named;
  try {
    return Math.max(3, ...networkModel.parseNetworkRatios(preset.scalaText).ratios.map((ratio) => {
      const fraction = parseFraction(ratio);
      let limit = 3;
      for (const term of [fraction.numerator, fraction.denominator]) {
        for (const prime of [5n, 7n, 11n, 13n, 17n, 19n, 23n]) if (term % prime === 0n && Number(prime) > limit) limit = Number(prime);
      }
      return limit;
    }));
  } catch { return 3; }
}

/** Réseau d'une touche TFE (positions de frettes) avec la scordatura choisie dans la fenêtre. */
function touchPickerTfeWithScordatura(preset, scordatura) {
  if (!scordatura) return null;
  const allFrets = (() => {
    try { return networkModel.parseNetworkRatios(preset.scalaText).ratios.filter((ratio) => ratio !== "1/1"); }
    catch { return []; }
  })();
  if (!allFrets.length) return null;
  const frets = [...allFrets.filter((ratio) => ratio !== "2/1"), "2/1"];
  const snapshot = { kind: "tfe", mainFrets: frets, allFrets: frets, strings: [...scordatura.strings],
    referenceRatioToA: scordatura.referenceRatioToA ?? "1/1", scordatura: scordatura.code };
  try {
    const projection = projectLocalTfe(snapshot);
    return { ...preset, id: `${preset.id}+${scordatura.id}`, generatorRatio: projection.generatorRatio,
      referenceRatio: "1/1", scalaText: projection.scalaText, savedFrettierSnapshot: snapshot, touchPickerPreview: true };
  } catch { return null; }
}

function touchPickerCandidates() {
  const scope = touchPicker.scope;
  const { limits, centers, scordaturas } = touchPicker.filters;
  const candidates = [];
  const presets = networkManager.presets.filter((preset) => preset.scope === scope && !preset.transposedFrom
    && !/-demi-positions$/.test(preset.id));
  if (scope === "tfp") {
    presets.forEach((preset) => {
      const natural = touchPickerCenterOf(networkGeneratorPitchRatio(preset));
      const wanted = centers.length ? TOUCH_PICKER_CENTERS.filter(([letter]) => centers.includes(letter))
        : TOUCH_PICKER_CENTERS.filter(([letter]) => letter === natural);
      const list = wanted.length ? wanted : [[natural, natural, networkGeneratorPitchRatio(preset)]];
      list.forEach((center) => {
        const config = center[0] === natural ? preset : touchPickerTransposition(preset, center);
        if (!config) return; // combinaison impossible : aucune scordatura (ex. L13 sur sol).
        const scordatura = tfpScordaturaForNetwork(config);
        if (!scordatura) return;
        candidates.push({ id: config.id, config, name: config.name, limit: touchPickerLimit(preset), natural: config === preset,
          center: center[0], scordatura: scordatura.label, alternatives: scordatura.alternatives ?? [] });
      });
    });
    // Deux modèles du Système lus depuis des notes différentes (ex. TFP-L7-G7 (A) et TFP-L7-D7G7 (E)) donnent la
    // même touche une fois transposés sur un même centre : on ne la montre qu'une fois, de préférence non transposée.
    const seen = new Map();
    candidates.forEach((candidate) => {
      const key = `${networkGeneratorPitchRatio(candidate.config)}|${[...fullNetworkPitchRatios(candidate.config)].sort().join(",")}`;
      const previous = seen.get(key);
      if (!previous || (candidate.natural && !previous.natural)) seen.set(key, candidate);
    });
    candidates.splice(0, candidates.length, ...seen.values());
  } else {
    const chosen = touchPickerScordaturas.find((preset) => preset.id === touchPicker.tfeScordatura) ?? null;
    presets.forEach((preset) => {
      const saved = preset.savedFrettierSnapshot;
      if (saved) {
        candidates.push({ id: preset.id, config: preset, name: preset.name, limit: touchPickerLimit(preset), saved: true,
          center: touchPickerCenterOf(saved.referenceRatioToA ?? "1/1"), scordatura: saved.scordatura ?? "—" });
        return;
      }
      const config = touchPickerTfeWithScordatura(preset, chosen);
      candidates.push({ id: preset.id, config: config ?? preset, name: preset.name, limit: touchPickerLimit(preset),
        template: true, center: chosen ? touchPickerCenterOf(chosen.referenceRatioToA ?? "1/1") : "—",
        scordatura: chosen ? chosen.label : "sans scordatura" });
    });
  }
  return candidates.filter((candidate) => (!limits.length || limits.includes(candidate.limit))
    && (scope === "tfe" ? !centers.length || centers.includes(candidate.center) : true)
    && (scope === "tfp" ? !scordaturas.length || scordaturas.includes(candidate.scordatura) : true))
    .sort((first, second) => first.limit - second.limit
      || TOUCH_PICKER_CENTERS.findIndex(([letter]) => letter === first.center)
        - TOUCH_PICKER_CENTERS.findIndex(([letter]) => letter === second.center)
      || first.name.localeCompare(second.name));
}

function touchPickerChip(label, pressed, onClick, { disabled = false, title = "" } = {}) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "touch-picker-chip";
  button.setAttribute("aria-pressed", String(pressed));
  button.disabled = disabled;
  if (title) button.title = title;
  appendColorizedNetworkLabel(button, label);
  button.addEventListener("click", onClick);
  return button;
}

function touchPickerToggle(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function touchPickerFilterGroup(title, children) {
  const group = document.createElement("section");
  group.className = "touch-picker-filter";
  const heading = document.createElement("h3");
  heading.textContent = title;
  const row = document.createElement("div");
  row.className = "touch-picker-chips";
  row.append(...children);
  group.append(heading, row);
  return group;
}

function renderTouchPickerFilters(container, candidatesBeforeScordatura) {
  container.replaceChildren();
  const rerender = () => { touchPickerSaveFilters(); renderTouchPicker(); };
  container.append(touchPickerFilterGroup("Limite", TOUCH_PICKER_LIMITS.map((limit) => touchPickerChip(`L${limit}`,
    touchPicker.filters.limits.includes(limit), () => {
      touchPicker.filters.limits = touchPickerToggle(touchPicker.filters.limits, limit); rerender();
    }))));
  container.append(touchPickerFilterGroup("Centre tonal", TOUCH_PICKER_CENTERS.map(([letter, name]) => touchPickerChip(name,
    touchPicker.filters.centers.includes(letter), () => {
      touchPicker.filters.centers = touchPickerToggle(touchPicker.filters.centers, letter); rerender();
    }, { title: touchPicker.scope === "tfp" ? `Modèles transposés sur ${name} (h3)` : `Touches dont le 1/1 est ${name}` }))));
  if (touchPicker.scope === "tfp") {
    // Scordatura : un résultat, calculé pour chaque modèle et chaque centre; on peut filtrer sur les codes obtenus.
    const codes = [...new Set(candidatesBeforeScordatura.map((candidate) => candidate.scordatura))];
    container.append(touchPickerFilterGroup("Scordatura (résultat)", codes.map((code) => touchPickerChip(code === "—" ? "standard" : code,
      touchPicker.filters.scordaturas.includes(code), () => {
        touchPicker.filters.scordaturas = touchPickerToggle(touchPicker.filters.scordaturas, code); rerender();
      }))));
  } else {
    const select = document.createElement("select");
    select.className = "touch-picker-scordatura-select";
    select.setAttribute("aria-label", "Scordatura appliquée aux positions de frettes");
    const none = document.createElement("option");
    none.value = "";
    none.textContent = "Sans scordatura";
    select.append(none);
    const groups = new Map();
    touchPickerScordaturas.forEach((preset) => {
      if (!groups.has(preset.group)) {
        const optgroup = document.createElement("optgroup");
        optgroup.label = preset.group;
        groups.set(preset.group, optgroup);
        select.append(optgroup);
      }
      const option = document.createElement("option");
      option.value = preset.id;
      option.textContent = preset.label;
      groups.get(preset.group).append(option);
    });
    select.value = touchPicker.tfeScordatura;
    select.addEventListener("change", () => { touchPicker.tfeScordatura = select.value; rerender(); });
    container.append(touchPickerFilterGroup("Scordatura", [select]));
  }
}

function touchPickerStatsLine(stats) {
  if (!stats) return "…";
  const plural = (count, word) => `${count} ${word}${count > 1 ? "s" : ""}`;
  const parts = [plural(stats.modes, "mode"), plural(stats.modulations, "modulation")];
  if (stats.chords !== undefined) parts.push(plural(stats.chords, "accord"));
  if (stats.multiPositionModes !== undefined) parts.push(`${stats.multiPositionModes} à plusieurs positions`);
  if (stats.orphans !== undefined) parts.push(plural(stats.orphans, "orpheline"));
  return parts.join(" · ");
}

/** Les nombres de polyvalence se calculent un par un, sans bloquer la fenêtre. */
function touchPickerScheduleStats(candidates) {
  clearTimeout(touchPicker.statsTimer);
  touchPicker.statsQueue = candidates.filter((candidate) => !networkConnectionStatsMemo.has(JSON.stringify(candidate.config)));
  const step = () => {
    const next = touchPicker.statsQueue.shift();
    if (!next || !touchPicker.open) return;
    const stats = networkConnectionStats(next.config);
    touchPicker.element?.querySelectorAll(`[data-touch-candidate="${CSS.escape(next.id)}"] .touch-picker-row-stats`)
      .forEach((cell) => { cell.textContent = touchPickerStatsLine(stats); });
    if (touchPicker.statsQueue.length) touchPicker.statsTimer = setTimeout(step, 0);
  };
  touchPicker.statsTimer = setTimeout(step, 0);
}

function touchPickerMemoStats(candidate) {
  return networkConnectionStatsMemo.get(JSON.stringify(candidate.config)) ?? null;
}

function renderTouchPickerList(container, candidates) {
  container.replaceChildren();
  if (!candidates.length) {
    const empty = document.createElement("p");
    empty.className = "touch-picker-empty";
    empty.textContent = "Aucun modèle ne correspond à ces filtres.";
    container.append(empty);
    return;
  }
  const activeId = touchPicker.scope === "tfe" && frettierUiState.fretPlanId ? frettierUiState.fretPlanId : networkManager.activeId;
  // D8 : en TFE, deux natures séparées : touches enregistrées (avec scordatura), puis positions de frettes.
  const ordered = touchPicker.scope === "tfe"
    ? [...candidates.filter((candidate) => candidate.saved), ...candidates.filter((candidate) => !candidate.saved)] : candidates;
  let section = null;
  ordered.forEach((candidate) => {
    const nature = touchPicker.scope !== "tfe" ? null : candidate.saved ? "Touches enregistrées"
      : touchPicker.tfeScordatura ? "Positions de frettes, avec la scordatura choisie" : "Positions de frettes, sans scordatura";
    if (nature && nature !== section) {
      section = nature;
      const heading = document.createElement("h3");
      heading.className = "touch-picker-section";
      heading.textContent = nature;
      container.append(heading);
    }
    const row = document.createElement("button");
    row.type = "button";
    row.className = "touch-picker-row";
    row.dataset.touchCandidate = candidate.id;
    row.setAttribute("aria-pressed", String(candidate.id === touchPicker.selectedId));
    if (candidate.id === activeId) row.classList.add("is-active");
    // Infobulle : remarque du modèle (source, rôle) et origine d'une transposition (E5 : plus d'ancien nom).
    const sourceId = candidate.config.transposedFrom ?? candidate.id;
    const model = typeof TFP_MODEL_NOTES !== "undefined" ? TFP_MODEL_NOTES.get(sourceId) : null;
    const source = candidate.config.transposedFrom ? networkManager.presets.find((item) => item.id === sourceId) : null;
    row.title = [candidate.name, source ? `transposition h3 de ${source.name}` : "",
      model?.note ?? ""].filter(Boolean).join(" — ");
    const name = document.createElement("span");
    name.className = "touch-picker-row-name";
    appendColorizedNetworkLabel(name, candidate.name);
    const scordatura = document.createElement("span");
    scordatura.className = "touch-picker-row-scordatura";
    scordatura.textContent = candidate.template && touchPicker.tfeScordatura
      ? `+ ${candidate.scordatura}` : candidate.template ? "positions de frettes, sans scordatura"
        : `scordatura ${candidate.scordatura === "—" ? "standard" : candidate.scordatura}`;
    const stats = document.createElement("span");
    stats.className = "touch-picker-row-stats";
    stats.textContent = touchPickerStatsLine(touchPickerMemoStats(candidate));
    row.append(name, scordatura, stats);
    row.addEventListener("mouseenter", () => { touchPicker.hoveredId = candidate.id; renderTouchPickerPreview(); });
    row.addEventListener("focus", () => { touchPicker.hoveredId = candidate.id; renderTouchPickerPreview(); });
    row.addEventListener("click", () => {
      touchPicker.selectedId = candidate.id;
      touchPicker.hoveredId = candidate.id;
      container.querySelectorAll(".touch-picker-row").forEach((item) => item.setAttribute("aria-pressed", String(item === row)));
      renderTouchPickerPreview();
    });
    row.addEventListener("dblclick", () => chooseTouchPickerCandidate(candidate));
    if (candidate.template && touchPicker.tfeScordatura) {
      // D6 : touches amovibles sur une même scordatura; cocher les plans à réunir.
      const item = document.createElement("div");
      item.className = "touch-picker-item";
      const label = document.createElement("label");
      label.className = "touch-picker-union-toggle";
      label.title = "Réunir cette touche aux autres touches cochées (touches amovibles, même scordatura)";
      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = touchPicker.union.has(candidate.id);
      box.setAttribute("aria-label", `Réunir ${candidate.name}`);
      box.addEventListener("change", () => {
        if (box.checked) touchPicker.union.add(candidate.id); else touchPicker.union.delete(candidate.id);
        renderTouchPickerUnion();
      });
      label.append(box);
      item.append(label, row);
      container.append(item);
    } else container.append(row);
  });
  touchPickerScheduleStats(candidates);
}

/** Réseau réuni de plusieurs plans de frettes joués sur la même scordatura (même 1/1 : la corde de référence). */
function touchPickerUnionConfiguration(configs) {
  const generator = configs[0].generatorRatio;
  const pitches = new Set();
  configs.forEach((config) => fullNetworkPitchRatios(config).forEach((pitch) => pitches.add(pitch)));
  const ratios = [...pitches].map((pitch) => divideAndReduce(pitch, generator)).filter((ratio) => ratio && ratio !== "1/1")
    .sort((first, second) => ratioCents(first) - ratioCents(second));
  return normalizeNetworkConfiguration({ ...DEFAULT_NETWORK_CONFIGURATION, id: "reunion-touches", name: "Réunion des touches cochées",
    scope: "global", sourceMethod: "scala", generatorRatio: generator, scalaText: [...ratios, "2/1"].join("\n") }, "reunion-touches");
}

let touchPickerUnionTimer = null;
function renderTouchPickerUnion() {
  const container = touchPicker.element?.querySelector(".touch-picker-union");
  if (!container) return;
  clearTimeout(touchPickerUnionTimer);
  const candidates = (touchPicker.lastCandidates ?? []).filter((candidate) => candidate.template && touchPicker.union.has(candidate.id)
    && candidate.config.savedFrettierSnapshot);
  container.replaceChildren();
  container.hidden = touchPicker.scope !== "tfe" || !touchPicker.tfeScordatura || candidates.length < 2;
  if (container.hidden) return;
  const heading = document.createElement("h3");
  const scordatura = touchPickerScordaturas.find((preset) => preset.id === touchPicker.tfeScordatura)?.label ?? "";
  heading.textContent = `Réunion de ${candidates.length} touches sur ${scordatura}`;
  const body = document.createElement("div");
  body.className = "touch-picker-union-body";
  body.textContent = "Calcul…";
  container.append(heading, body);
  touchPickerUnionTimer = setTimeout(() => {
    if (!touchPicker.open) return;
    try {
      // Modes, accords et modulations : la réunion; positions et orphelines : chaque touche, une à la fois.
      const stats = networkConnectionStats(touchPickerUnionConfiguration(candidates.map((candidate) => candidate.config)));
      const list = createPolyvalenceList(stats);
      const table = document.createElement("table");
      table.className = "touch-picker-union-table";
      const head = document.createElement("tr");
      ["Touche", "à plusieurs positions", "orphelines"].forEach((label) => { const th = document.createElement("th"); th.scope = "col"; th.textContent = label; head.append(th); });
      table.append(head);
      candidates.forEach((candidate) => {
        const own = networkConnectionStats(candidate.config);
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.scope = "row";
        appendColorizedNetworkLabel(th, candidate.name);
        tr.append(th, ...[own.multiPositionModes, own.orphans].map((value) => { const td = document.createElement("td"); td.textContent = value ?? "—"; return td; }));
        table.append(tr);
      });
      const note = document.createElement("p");
      note.className = "touch-picker-note";
      note.textContent = "Les positions et les orphelines restent comptées par touche : on ne joue jamais deux touches à la fois.";
      body.replaceChildren(list, table, note);
    } catch { body.textContent = ""; }
  }, 30);
}

function touchPickerOpenStrings(config) {
  if (config.scope === "tfp") {
    const scordatura = tfpScordaturaForNetwork(config);
    return scordatura ? scordatura.openStringRatios.map((ratio, index) => ({ relative: ratio, absolute: scordatura.stringsToA[index] })) : [];
  }
  const snapshot = config.savedFrettierSnapshot;
  if (!snapshot) return [];
  return snapshot.strings.map((ratio) => {
    const absolute = multiplyAndReduce(snapshot.referenceRatioToA ?? "1/1", ratio);
    return { relative: divideAndReduce(absolute, networkGeneratorPitchRatio(config)), absolute };
  });
}

/** Petit manche : six cordes, une marque par position (TFP : notes de l'échelle sur chaque corde; TFE : frettes). */
function touchPickerNeck(config, opens) {
  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("viewBox", "0 0 300 74");
  svg.setAttribute("class", "touch-picker-neck");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Manche (une octave)");
  const x = (value) => 8 + 284 * (1 - 1 / value); // longueur vibrante : position réelle des frettes
  const ratioValue = (ratio) => { const fraction = parseFraction(ratio); return fraction ? Number(fraction.numerator) / Number(fraction.denominator) : null; };
  let scale = [];
  try { scale = networkModel.parseNetworkRatios(config.scalaText).ratios; } catch { /* aucun rapport */ }
  const frets = config.scope === "tfe" && config.savedFrettierSnapshot ? config.savedFrettierSnapshot.allFrets : null;
  opens.forEach((open, index) => {
    const y = 8 + index * 11.6;
    const line = document.createElementNS(svgNs, "line");
    line.setAttribute("x1", "8"); line.setAttribute("x2", "292"); line.setAttribute("y1", String(y)); line.setAttribute("y2", String(y));
    line.setAttribute("class", "touch-picker-neck-string");
    svg.append(line);
    const steps = frets ?? scale.map((ratio) => divideAndReduce(multiplyAndReduce(networkGeneratorPitchRatio(config), ratio), open.absolute));
    steps.forEach((step) => {
      const value = ratioValue(step);
      if (!value || value <= 1 || value > 2) return;
      const mark = document.createElementNS(svgNs, "line");
      mark.setAttribute("x1", String(x(value))); mark.setAttribute("x2", String(x(value)));
      mark.setAttribute("y1", String(y - 4)); mark.setAttribute("y2", String(y + 4));
      mark.setAttribute("class", "touch-picker-neck-fret");
      svg.append(mark);
    });
  });
  return svg;
}

function touchPickerCompleteModes(config) {
  const out = [];
  TONIC_RATIOS.forEach((tonic) => MODE_PRESETS.forEach((mode) => {
    if (networkAdmitsModeAtTonic(tonic, mode, config)) out.push(`${formatModeLabel(mode.label)} sur ${touchPickerCenterOf(tonic)}`);
  }));
  return out;
}

function renderTouchPickerPreview() {
  const container = touchPicker.element?.querySelector(".touch-picker-preview");
  if (!container) return;
  const candidates = touchPicker.lastCandidates ?? [];
  const candidate = candidates.find((item) => item.id === (touchPicker.hoveredId ?? touchPicker.selectedId)) ?? candidates[0];
  container.replaceChildren();
  if (!candidate) return;
  const title = document.createElement("h3");
  appendColorizedNetworkLabel(title, candidate.name);
  const ratios = document.createElement("p");
  ratios.className = "touch-picker-ratios";
  try {
    networkModel.parseNetworkRatios(candidate.config.scalaText).ratios.filter((ratio) => ratio !== "1/1")
      .forEach((ratio) => ratios.append(createColorizedRatio(ratio), " "));
  } catch { /* rien */ }
  container.append(title, ratios);
  const opens = touchPickerOpenStrings(candidate.config);
  if (opens.length) {
    const strings = document.createElement("ol");
    strings.className = "touch-picker-strings";
    strings.setAttribute("aria-label", "Cordes à vide, de la 6e à la 1re");
    [...opens].reverse().forEach((open) => {
      const item = document.createElement("li");
      item.append(`${touchPickerCenterOf(open.absolute)} `, createColorizedRatio(open.relative));
      strings.append(item);
    });
    container.append(strings, touchPickerNeck(candidate.config, opens));
  } else if (candidate.template) {
    const note = document.createElement("p");
    note.className = "touch-picker-note";
    note.textContent = "Positions de frettes, sans scordatura : pas un réseau. Choisir une scordatura à gauche pour l’essayer.";
    container.append(note);
  }
  const stats = networkConnectionStats(candidate.config);
  const summary = document.createElement("p");
  summary.className = "touch-picker-summary";
  summary.textContent = touchPickerStatsLine(stats);
  const modes = touchPickerCompleteModes(candidate.config);
  const modeList = document.createElement("ul");
  modeList.className = "touch-picker-modes";
  modes.slice(0, 40).forEach((label) => { const item = document.createElement("li"); item.textContent = label; modeList.append(item); });
  if (modes.length > 40) { const more = document.createElement("li"); more.textContent = `… et ${modes.length - 40} autres`; modeList.append(more); }
  const modesTitle = document.createElement("h4");
  modesTitle.textContent = `Modes complets (${modes.length})`;
  const actions = document.createElement("div");
  actions.className = "touch-picker-actions";
  const pin = document.createElement("button");
  pin.type = "button";
  pin.className = "touch-picker-pin";
  const pinned = touchPicker.pinned.some((item) => item.id === candidate.id);
  pin.textContent = pinned ? "Retirer de la comparaison" : "Comparer";
  pin.disabled = !pinned && touchPicker.pinned.length >= 3;
  pin.addEventListener("click", () => {
    touchPicker.pinned = pinned ? touchPicker.pinned.filter((item) => item.id !== candidate.id) : [...touchPicker.pinned, candidate];
    renderTouchPickerPreview();
  });
  const choose = document.createElement("button");
  choose.type = "button";
  choose.className = "touch-picker-choose";
  choose.textContent = "Choisir";
  choose.addEventListener("click", () => chooseTouchPickerCandidate(candidate));
  actions.append(pin, choose);
  container.append(summary, actions, modesTitle, modeList);
  renderTouchPickerComparison();
}

function renderTouchPickerComparison() {
  const container = touchPicker.element?.querySelector(".touch-picker-compare");
  if (!container) return;
  container.replaceChildren();
  container.hidden = !touchPicker.pinned.length;
  if (!touchPicker.pinned.length) return;
  const table = document.createElement("table");
  const head = document.createElement("tr");
  head.append(document.createElement("th"));
  touchPicker.pinned.forEach((candidate) => {
    const th = document.createElement("th");
    th.scope = "col";
    appendColorizedNetworkLabel(th, candidate.name);
    head.append(th);
  });
  table.append(head);
  const rows = [["modes", "modes"], ["tetrachords", "tétracordes"], ["modulations", "modulations"], ["chords", "accords"],
    ["colorations", "colorations"], ["progressions", "enchaînements"], ["multiPositionModes", "à plusieurs positions"], ["orphans", "orphelines"]];
  const stats = touchPicker.pinned.map((candidate) => networkConnectionStats(candidate.config));
  rows.forEach(([key, label]) => {
    if (stats.every((item) => item[key] === undefined)) return;
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.textContent = label;
    tr.append(th, ...stats.map((item) => { const td = document.createElement("td"); td.textContent = item[key] ?? "—"; return td; }));
    table.append(tr);
  });
  const heading = document.createElement("h3");
  heading.textContent = "Comparaison";
  container.append(heading, table);
}

function renderTouchPicker() {
  const element = touchPicker.element;
  if (!element) return;
  const scope = touchPicker.scope;
  element.querySelector(".touch-picker-title").textContent = scope === "tfp" ? "Choisir une touche TFP" : "Choisir une touche TFE";
  const saved = { ...touchPicker.filters };
  touchPicker.filters = { ...saved, scordaturas: [] };
  const beforeScordatura = touchPickerCandidates();
  touchPicker.filters = saved;
  const candidates = touchPickerCandidates();
  touchPicker.lastCandidates = candidates;
  renderTouchPickerFilters(element.querySelector(".touch-picker-filters"), beforeScordatura);
  renderTouchPickerList(element.querySelector(".touch-picker-list"), candidates);
  renderTouchPickerUnion();
  element.querySelector(".touch-picker-count").textContent = `${candidates.length} modèle${candidates.length > 1 ? "s" : ""}`;
  renderTouchPickerPreview();
}

function ensureTouchPickerElement() {
  if (touchPicker.element) return touchPicker.element;
  const backdrop = document.createElement("div");
  backdrop.className = "touch-picker-backdrop";
  backdrop.hidden = true;
  backdrop.innerHTML = `<section class="touch-picker" role="dialog" aria-modal="true" aria-labelledby="touch-picker-title">
    <header class="touch-picker-header"><h2 class="touch-picker-title" id="touch-picker-title"></h2>
      <span class="touch-picker-count"></span>
      <button type="button" class="touch-picker-close" aria-label="Fermer">×</button></header>
    <div class="touch-picker-body">
      <aside class="touch-picker-filters" aria-label="Filtres"></aside>
      <div class="touch-picker-list" role="list" aria-label="Modèles compatibles"></div>
      <div class="touch-picker-side"><div class="touch-picker-preview" aria-live="polite"></div>
        <div class="touch-picker-compare" hidden></div><div class="touch-picker-union" hidden></div></div>
    </div></section>`;
  backdrop.addEventListener("mousedown", (event) => { if (event.target === backdrop) closeTouchPicker(); });
  backdrop.querySelector(".touch-picker-close").addEventListener("click", () => closeTouchPicker());
  backdrop.addEventListener("keydown", (event) => { if (event.key === "Escape") { event.stopPropagation(); closeTouchPicker(); } });
  document.body.append(backdrop);
  touchPicker.element = backdrop;
  return backdrop;
}

function openTouchPicker(scope = frettierUiState.fretboardType === "tfp" ? "tfp" : "tfe", opener = document.activeElement) {
  const element = ensureTouchPickerElement();
  touchPicker.opener = opener instanceof HTMLElement ? opener : null;
  const filters = touchPickerLoadFilters(scope);
  touchPicker.scope = scope;
  touchPicker.filters = { limits: filters.limits, centers: filters.centers, scordaturas: filters.scordaturas };
  touchPicker.tfeScordatura = filters.tfeScordatura;
  touchPicker.selectedId = networkManager.activeId;
  touchPicker.hoveredId = null;
  touchPicker.pinned = [];
  touchPicker.union = new Set();
  touchPicker.open = true;
  element.hidden = false;
  closeAllMenus?.();
  renderTouchPicker();
  element.querySelector(".touch-picker-close").focus();
}

function closeTouchPicker() {
  if (!touchPicker.element) return;
  touchPicker.open = false;
  clearTimeout(touchPicker.statsTimer);
  touchPicker.element.hidden = true;
  const opener = touchPicker.opener?.isConnected && touchPicker.opener.getClientRects().length ? touchPicker.opener : null;
  (opener ?? elements.activeNetworkButton)?.focus();
}

/** Sélection → fermeture → mise à jour du Frettier. */
function chooseTouchPickerCandidate(candidate) {
  if (touchPicker.scope === "tfp") {
    let preset = networkManager.presets.find((item) => item.id === candidate.id);
    if (!preset) {
      // Transposition h3 calculée à la volée : enregistrée comme réseau pour pouvoir être rouverte.
      preset = normalizeNetworkConfiguration({ ...candidate.config }, candidate.config.id);
      networkManager.presets.push(preset);
      saveNetworkStore();
    }
    closeTouchPicker();
    activateNetworkPreset(preset.id, { confirmed: true });
    return;
  }
  closeTouchPicker();
  const plan = DEFAULT_TOUCH_NETWORK_CONFIGURATIONS.find((item) => item.id === candidate.id)?.abstractFretPlanId;
  const withScordatura = candidate.template && touchPicker.tfeScordatura;
  // Une scordatura s'applique dans le Frettier : hors du Frettier, on y passe d'abord (D8).
  if (withScordatura && document.body.dataset.pageTab !== "frettier") {
    if (!elements.networkConfigDrawer.hidden) closeNetworkConfigurator?.();
    selectPageTab("frettier");
    if (frettierUiState.fretboardType !== "tfe") document.querySelector("#frettier-tfe-button")?.click();
  }
  activateNetworkPreset(plan && tfeFretPlanPreset(plan) && document.body.dataset.pageTab === "frettier" ? plan : candidate.id,
    { confirmed: true });
  if (withScordatura) sendFrettierCommand("apply-scordatura", touchPicker.tfeScordatura);
}

// Ouverture depuis les sous-menus TFE et TFP des autres onglets et du panneau Réseau (D8).
document.addEventListener("click", (event) => {
  const opener = event.target.closest?.("[data-touch-picker-scope]");
  if (!opener) return;
  event.preventDefault();
  event.stopPropagation();
  closeAllMenus();
  if (typeof closeNetworkPresetMenu === "function") closeNetworkPresetMenu();
  const fallback = opener.closest("#network-config-drawer") ? elements.networkPresetButton : elements.activeNetworkButton;
  openTouchPicker(opener.dataset.touchPickerScope === "tfp" ? "tfp" : "tfe", fallback);
}, true);

// ---------- Panneau Réseau (D8) : polyvalence sous le treillis, treillis d'une touche ----------

/** Liste de polyvalence, mêmes libellés que dans Analyse : totaux, détail dépliable en liste à puces. */
function createPolyvalenceList(stats) {
  const number = (value) => Number(value ?? 0).toLocaleString("fr-CA");
  const list = document.createElement("ul");
  list.className = "polyvalence-list";
  const item = (stat, count, word, title = "", breakdowns = []) => {
    const li = document.createElement("li");
    li.dataset.stat = stat;
    if (title) li.title = title;
    const head = document.createDocumentFragment();
    const strong = document.createElement("strong");
    strong.textContent = number(count);
    head.append(strong, ` ${word}`);
    const lists = breakdowns.filter(([, entries]) => entries?.length);
    if (!lists.length) { li.append(head); list.append(li); return; }
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.append(head);
    details.append(summary);
    lists.forEach(([key, entries, label]) => {
      const sub = document.createElement("ul");
      sub.className = "polyvalence-breakdown";
      sub.dataset.breakdown = key;
      entries.forEach(([name, value]) => {
        const entry = document.createElement("li");
        entry.textContent = `${label(name)} : ${number(value)}`;
        sub.append(entry);
      });
      details.append(sub);
    });
    li.append(details);
    list.append(li);
  };
  item("modes", stats.modes, "modes", "", [["limit", stats.byLimit, (label) => `Modes ${label}`], ["tonic", stats.byTonic, (label) => `Sur ${label}`]]);
  item("tetrachords", stats.tetrachords, "tétracordes");
  item("modulations", stats.modulations, "modulations", "Paires de modes du réseau qui ne diffèrent que d’un degré, sur la même tonique ou non");
  if (stats.chords !== undefined) {
    item("chords", stats.chords, "accords", "Accords du catalogue dont toutes les notes existent dans le réseau, une fois par fondamentale", [
      ["chord-level", stats.chordsByLevel, (label) => {
        const level = String(label).replace(/\s*\/\s*/g, "/");
        return /^triades$/i.test(level) ? "Triades" : `Accords ${level}`;
      }],
      ["chord-root", stats.chordsByRoot, (label) => `Sur ${label}`]]);
    item("colorations", stats.colorations, "colorations", "Deux accords admis sur la même fondamentale, partageant au moins deux notes, sans que l’un contienne l’autre");
    item("progressions", stats.progressions, "enchaînements", "Deux accords admis sur des fondamentales différentes, partageant au moins deux notes, sans que l’un contienne l’autre");
  }
  if (stats.multiPositionModes !== undefined) item("multi-position", stats.multiPositionModes, "modes à plusieurs positions",
    "Modes dont chaque note existe dans au moins deux registres du manche (cordes à vide × frettes, jusqu’au rapport 3)");
  if (stats.orphans !== undefined) item("orphans", stats.orphans, "orphelines",
    "Notes utiles présentes dans un seul registre du manche");
  return list;
}

let panelPolyvalenceTimer = null;
function ensurePanelPolyvalence() {
  let section = document.querySelector("#network-config-polyvalence");
  if (!section) {
    section = document.createElement("section");
    section.id = "network-config-polyvalence";
    section.className = "network-config-section network-config-polyvalence";
    section.setAttribute("aria-label", "Polyvalence du réseau");
    const title = document.createElement("h3");
    title.textContent = "Polyvalence du réseau";
    const body = document.createElement("div");
    body.className = "network-config-polyvalence-body";
    section.append(title, body);
    elements.networkScalaApply.before(section);
  }
  return section;
}

/** Calculée après le dessin du treillis, sans bloquer la saisie. */
function schedulePanelPolyvalence(configuration) {
  clearTimeout(panelPolyvalenceTimer);
  if (elements.networkConfigDrawer.hidden) return;
  const section = ensurePanelPolyvalence();
  const body = section.querySelector(".network-config-polyvalence-body");
  section.hidden = !configuration;
  if (!configuration) return;
  const memo = networkConnectionStatsMemo.get(JSON.stringify(configuration));
  if (memo) { body.replaceChildren(createPolyvalenceList(memo)); return; }
  if (!modeConnectionApi) { body.textContent = "Calcul…"; panelPolyvalenceTimer = setTimeout(() => schedulePanelPolyvalence(configuration), 400); return; }
  body.textContent = "Calcul…";
  panelPolyvalenceTimer = setTimeout(() => {
    if (elements.networkConfigDrawer.hidden) return;
    try {
      body.replaceChildren(createPolyvalenceList(networkConnectionStats(configuration)));
      syncPanelTouchLattice(configuration); // orphelines connues : marquer le treillis
    } catch { body.textContent = ""; }
  }, 250);
}

// Treillis d'une touche : cordes à vide (bourdons) distinguées des classes frettées, orphelines marquées, filtre
// des axes par limite (harmonique). Le filtre est retenu pendant la session.
const panelLatticeHiddenPrimes = new Set();

function touchOpenStringPitches(configuration) {
  if (configuration?.scope === "tfp") return tfpScordaturaForNetwork(configuration)?.stringsToA ?? null;
  const snapshot = configuration?.savedFrettierSnapshot;
  if (snapshot?.kind === "tfe") return snapshot.strings.map((ratio) => multiplyAndReduce(snapshot.referenceRatioToA ?? "1/1", ratio));
  return null;
}

function applyPanelLatticeFilter() {
  const graph = elements.networkPreviewGraph;
  graph.querySelectorAll("line[data-prime]").forEach((line) => {
    line.classList.toggle("is-axis-hidden", panelLatticeHiddenPrimes.has(line.dataset.prime));
  });
  graph.querySelectorAll(".summary-network-node[data-primes]").forEach((node) => {
    const primes = node.dataset.primes.split(" ").filter(Boolean);
    node.classList.toggle("is-axis-hidden", primes.some((prime) => panelLatticeHiddenPrimes.has(prime)));
  });
  document.querySelectorAll("#network-preview-legend [data-axis-prime]").forEach((button) => {
    button.setAttribute("aria-pressed", String(!panelLatticeHiddenPrimes.has(button.dataset.axisPrime)));
  });
}

function syncPanelTouchLattice(configuration) {
  const preview = elements.networkPreviewGraph.closest(".network-preview");
  let legend = document.querySelector("#network-preview-legend");
  if (!legend) {
    legend = document.createElement("div");
    legend.id = "network-preview-legend";
    legend.className = "network-preview-legend";
    preview.append(legend);
  }
  legend.replaceChildren();
  if (!configuration) { legend.hidden = true; return; }
  const svg = elements.networkPreviewGraph.querySelector("svg");
  const primes = [...new Set([...elements.networkPreviewGraph.querySelectorAll("line[data-prime]")]
    .map((line) => line.dataset.prime))].filter((prime) => prime !== "3").sort((a, b) => Number(a) - Number(b));
  const opens = touchOpenStringPitches(configuration);
  if (opens && svg) {
    const generator = configuration.generatorRatio ?? "1/1";
    const openSet = new Set(opens);
    const stats = networkConnectionStatsMemo.get(JSON.stringify(configuration));
    const orphanSet = new Set(stats?.orphanPitches ?? []);
    svg.querySelectorAll(".summary-network-node[data-ratio]").forEach((node) => {
      const absolute = multiplyAndReduce(node.dataset.ratio, generator);
      const open = openSet.has(absolute);
      node.classList.toggle("is-open-string", open);
      node.classList.toggle("is-fretted", !open);
      node.classList.toggle("is-orphan", orphanSet.has(absolute));
      if (open && !node.querySelector(".touch-open-ring")) {
        const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ring.setAttribute("class", "touch-open-ring");
        ring.setAttribute("r", "8");
        node.prepend(ring);
      }
      const heji = ratioToHeji(absolute);
      let title = node.querySelector("title");
      if (!title) { title = document.createElementNS("http://www.w3.org/2000/svg", "title"); node.prepend(title); }
      title.textContent = `${heji ? plainHejiNote(heji) : absolute} (${node.dataset.ratio})`
        + (open ? " — corde à vide (bourdon)" : " — classe frettée") + (orphanSet.has(absolute) ? " — orpheline" : "");
    });
    const roles = document.createElement("p");
    roles.className = "network-preview-roles";
    roles.innerHTML = `<span class="legend-open">cordes à vide (bourdons)</span><span class="legend-fretted">classes frettées</span>`
      + `<span class="legend-orphan">orphelines${stats ? ` (${stats.orphans ?? 0})` : ""}</span>`;
    legend.append(roles);
  }
  if (primes.length) {
    const filter = document.createElement("div");
    filter.className = "network-preview-axes";
    filter.setAttribute("role", "group");
    filter.setAttribute("aria-label", "Axes affichés, par limite");
    const label = document.createElement("span");
    label.textContent = "Axes :";
    filter.append(label);
    primes.forEach((prime) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.axisPrime = prime;
      button.style.setProperty("--axis-color", colorForPrime(BigInt(prime)));
      button.textContent = `h${prime}`;
      button.title = `Montrer ou cacher l’axe de l’harmonique ${prime} et les classes qui en dépendent`;
      button.addEventListener("click", () => {
        if (panelLatticeHiddenPrimes.has(prime)) panelLatticeHiddenPrimes.delete(prime); else panelLatticeHiddenPrimes.add(prime);
        applyPanelLatticeFilter();
      });
      filter.append(button);
    });
    legend.append(filter);
  }
  legend.hidden = !legend.childElementCount;
  applyPanelLatticeFilter();
}

// ---------- Pages de projet (répétition), 23 octobre 2026 ----------
// Modes s'ouvre en « mode projet » quand la page fournit window.HN_PROJET (adresse de donnees.json) ou que
// l'adresse contient ?projet=<nom> (fichier projets/<nom>/donnees.json). Le projet ne montre que son matériel :
// enregistrements et repères (sections et lettres), le mode de référence et les tétracordes, chacun dans le tableau
// de Modes avec ses seules toniques en rangées, le bourdon et les timbres retenus. Tout le reste de Modes (barre du
// haut, graphe, menus, réglages) est caché; rien n'est enregistré dans le navigateur. Révision du 24 octobre 2026
// (Simon) : sans graphe, sans degrés ni accords, bourdon sur la tonique du mode, octave par + / −. Seconde révision du
// 24 octobre : aucun texte de présentation, titre = nom de l'option, notes du bourdon allumées, monodie, un seul repère.

// Toniques nommées en solfège : naturels pythagoriciens à partir du la (1/1 = la), position sur la chaîne de quintes.
const PROJECT_TONICS = {
  fa: { ratio: "128/81", fifths: -1 }, do: { ratio: "32/27", fifths: 0 }, sol: { ratio: "16/9", fifths: 1 },
  "ré": { ratio: "4/3", fifths: 2 }, la: { ratio: "1/1", fifths: 3 }, mi: { ratio: "3/2", fifths: 4 },
  si: { ratio: "9/8", fifths: 5 },
};
const projectState = {
  active: false, data: null, base: "", current: null, drone: null, droneFifth: true, octaveOffset: 0,
  droneVolume: 70, notesVolume: 70, droneBus: null, rows: null, tetrachordColumns: null, currentName: "",
};

function projectSourceUrl() {
  if (typeof window.HN_PROJET === "string") return window.HN_PROJET;
  const slug = new URLSearchParams(window.location.search).get("projet");
  return slug && /^[\w-]+$/.test(slug) ? `projets/${slug}/donnees.json` : null;
}

function projectTonic(name) {
  const tonic = PROJECT_TONICS[name];
  if (!tonic) throw new Error(`Tonique inconnue dans le projet : ${name}`);
  return tonic;
}

function projectModeAtTonic(label, tonicRatio) {
  return MODE_PRESETS.find((mode) => mode.label === label && networkAdmitsModeAtTonic(tonicRatio, mode)) ?? null;
}

// Octave réelle (scientifique) de la tonique qui sonnerait avec l'octave Modes donnée.
function projectTonicOctave(audioOctave) {
  // Par la note la plus proche (do pythagoricien = do tempéré − 6 cents, toujours dans l'octave de son nom).
  const midi = Math.round(69 + 12 * Math.log2(audioTonicFrequency() * 2 ** audioOctave / 440));
  return Math.floor(midi / 12) - 1;
}

// Registre de référence (donnees.json, sons.octave : tonique dans l'octave de do4), décalé par le réglage + / −.
function applyProjectRegister() {
  if (!state.selectedTonic) return;
  state.audioOctave = (projectState.data.sons.octave ?? 4) + projectState.octaveOffset - projectTonicOctave(0);
}

// ---------- Sélections du projet ----------

// Une sélection = un mode sur plusieurs toniques : le tableau de Modes à rangées de quintes, réduit aux seules
// rangées demandées. Le rang central (dans la liste) donne la tonique choisie.
function projectRowsSelection({ mode, rowTonics, principal, columns = null }) {
  const offsets = rowTonics.map((tonic) => tonic.fifths - principal.fifths);
  return () => {
    Object.assign(state, {
      catalog: "modes", selectedTonic: principal.modeTonic, selectedFamily: TONIC_FAMILY_BY_RATIO.get(principal.modeTonic),
      selectedModeId: mode.id, tableFifthsBelow: Math.max(0, -Math.min(...offsets)), tableFifthsAbove: Math.max(0, Math.max(...offsets)),
    });
    projectState.rows = new Set(rowTonics.map((tonic) => tonic.modeTonic));
    projectState.tetrachordColumns = columns;
  };
}

function projectReferenceSelection() {
  const reference = projectState.data.reference;
  const tonics = reference.toniques.map((name) => ({ name, ...projectTonic(name), modeTonic: projectTonic(name).ratio }));
  const principal = tonics[Math.floor((tonics.length - 1) / 2)];
  const mode = projectModeAtTonic(reference.nom, principal.modeTonic);
  if (!mode) throw new Error(`Mode introuvable dans le réseau : ${reference.nom}`);
  return projectRowsSelection({ mode, rowTonics: tonics, principal });
}

// Tétracorde : montré dans le mode qui le contient (le mode de référence s'il le contient), sur la tonique de ce
// mode pour chacune de ses toniques; les degrés hors du tétracorde passent en filigrane.
function projectTetrachordSelection(tetrachord) {
  const first = projectTonic(tetrachord.toniques[0]).ratio;
  const candidates = tetrachordContextCandidates(tetrachord.nom, first);
  const context = candidates.find((c) => c.mode.label === projectState.data.reference.nom) ?? candidates[0];
  if (!context) throw new Error(`Tétracorde introuvable dans le réseau : ${tetrachord.nom}`);
  const tonics = tetrachord.toniques.map((name) => {
    const tonic = projectTonic(name);
    return { name, ...tonic, modeTonic: divideAndReduce(tonic.ratio, context.lowerRatio) };
  });
  const principal = tonics[Math.floor((tonics.length - 1) / 2)];
  const mode = projectModeAtTonic(context.mode.label, principal.modeTonic) ?? context.mode;
  const columns = { start: context.lowerIndex, length: context.entry.ratios.length, code: tetrachord.nom };
  return projectRowsSelection({ mode, rowTonics: tonics, principal, columns });
}

function selectProjectItem(key, name, apply) {
  stopProjectDrone();
  stopAllSounds();
  projectState.current = key;
  projectState.currentName = name;
  apply();
  applyProjectRegister();
  render();
}

// ---------- Bourdon (propre aux pages de projet) ----------

function ensureProjectDroneBus() {
  if (projectState.droneBus || !audioEngine.context) return projectState.droneBus;
  const bus = audioEngine.context.createGain();
  bus.connect(audioEngine.dry);
  bus.connect(audioEngine.reverb);
  projectState.droneBus = bus;
  applyProjectVolumes();
  return bus;
}

function applyProjectVolumes() {
  const level = (value) => 0.56 * (value / 100) ** 2;
  if (audioEngine.master) audioEngine.master.gain.value = level(projectState.notesVolume);
  if (projectState.droneBus) projectState.droneBus.gain.value = level(projectState.droneVolume);
}

async function startProjectDrone(key, rootFrequency) {
  const request = { key, rootFrequency, voices: [] };
  projectState.drone = request;
  refreshProjectDroneButtons();
  const context = await ensureAudioContext();
  const instrumentId = state.audioInstrument;
  if (!context || !(await ensureTimbreSamples(instrumentId)) || projectState.drone !== request) return;
  const bus = ensureProjectDroneBus();
  const level = AUDIO_TIMBRE_BY_ID.get(instrumentId)?.level ?? 1;
  const frequencies = projectState.droneFifth ? [rootFrequency, rootFrequency * 1.5] : [rootFrequency];
  request.voices = frequencies.map((frequency, index) => {
    const graph = AUDIO_VOICE_BUILDERS[instrumentId](context, frequency, 200 + index);
    if (!graph) return null;
    const now = context.currentTime;
    graph.gain.gain.setValueAtTime(0.0001, now);
    graph.gain.gain.exponentialRampToValueAtTime(graph.peak * level * (index ? 0.75 : 1), now + Math.max(0.15, graph.attack));
    graph.gain.connect(bus);
    graph.sources.forEach((source) => source.start(now));
    return { frequency, ...graph, release: Math.max(0.5, graph.release ?? 0.5) };
  }).filter(Boolean);
}

function stopProjectDrone() {
  projectState.drone?.voices.forEach(stopAudioVoice);
  projectState.drone = null;
  refreshProjectDroneButtons();
}

async function restartProjectDrone() {
  const drone = projectState.drone;
  if (!drone) return;
  stopProjectDrone();
  const button = document.querySelector(`[data-project-drone="${CSS.escape(drone.key)}"]`);
  if (button) await startProjectDrone(drone.key, projectDroneFrequency(button));
}

function projectDroneFrequency(button) {
  const row = button.closest(".project-drone-anchor")?.projectRow;
  // Toujours la tonique du mode de la rangée (pour un tétracorde supérieur : ré–la, pas la–mi).
  const cell = row?.querySelector(".mode-heji-cell[data-audio-relative-ratio]");
  if (!cell) return null;
  return audioFrequency(cell.dataset.audioRelativeRatio, state.audioOctave + Number(cell.dataset.audioRegister ?? 0));
}

// Cases que le bourdon fait entendre : la tonique de la rangée et, avec « Tonique + quinte », sa quinte 3/2.
function projectDroneCells(row) {
  const cells = [...(row?.querySelectorAll(".mode-heji-cell[data-audio-relative-ratio]") ?? [])];
  if (!cells.length) return [];
  const frequency = (cell) => audioFrequency(cell.dataset.audioRelativeRatio, Number(cell.dataset.audioRegister ?? 0));
  const tonic = frequency(cells[0]);
  const fifth = projectState.droneFifth ? cells.find((cell) => Math.abs(frequency(cell) / tonic - 1.5) < 1e-9) : null;
  return [cells[0], fifth].filter(Boolean);
}

// Le bourdon allume ses notes dans le tableau, comme des notes cliquées.
function refreshProjectDroneButtons() {
  document.querySelectorAll(".is-project-drone-note").forEach((cell) => {
    cell.classList.remove("is-project-drone-note", "is-sounding");
    refreshSoundTrigger(cell);
  });
  document.querySelectorAll("[data-project-drone]").forEach((button) => {
    const on = projectState.drone?.key === button.dataset.projectDrone;
    button.setAttribute("aria-pressed", String(on));
    button.projectRow?.classList.toggle("has-project-drone", on);
    if (on) projectDroneCells(button.projectRow).forEach((cell) => cell.classList.add("is-project-drone-note", "is-sounding"));
  });
}

// ---------- Interface ----------

function projectElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function projectSegmented(label, options, isPressed, onChoose) {
  const group = projectElement("span", "project-segmented");
  group.setAttribute("role", "group");
  group.setAttribute("aria-label", label);
  options.forEach((option, index) => {
    const button = projectElement("button", "", option.label);
    button.type = "button";
    button.setAttribute("aria-pressed", String(isPressed(option, index)));
    button.addEventListener("click", () => {
      group.querySelectorAll("button").forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
      onChoose(option, index);
    });
    group.append(button);
  });
  return group;
}

function projectSlider(label, value, onInput) {
  const wrapper = projectElement("label", "project-slider");
  wrapper.append(projectElement("span", "", label));
  const input = projectElement("input");
  input.type = "range";
  input.min = "0";
  input.max = "100";
  input.value = String(value);
  input.addEventListener("input", () => onInput(Number(input.value)));
  wrapper.append(input);
  return wrapper;
}

// Nom avec le code de couleur des limites (Éolien L7, Phryg-12L13, Phryg-60L7m…) : le nombre devant L et celui de
// la limite, chacun dans la couleur de sa limite, comme les entiers ailleurs dans le site (30 et 60 : limite 5).
function projectColorizedName(text) {
  const wrapper = projectElement("span", "project-name");
  const match = String(text).match(/^(.*?)(\d*)(L)(\d+)(\D*)$/);
  if (!match) { wrapper.textContent = text; return wrapper; }
  const number = (digits) => {
    const span = projectElement("span", "", digits);
    span.style.color = colorForInteger(digits);
    return span;
  };
  const [, before = "", code, letter, limit, after] = match;
  wrapper.append(document.createTextNode(before));
  if (code) wrapper.append(number(code));
  wrapper.append(document.createTextNode(letter), number(limit), document.createTextNode(after));
  return wrapper;
}

// ---------- Repères : sections et lettres, temps calculés d'après la carte de tempo ----------

function projectMeasureTimes(ecoute) {
  const tempo = ecoute.tempo ?? { noire: 60, mesures: [{ depuis: 1, temps: 4 }] };
  const meters = [...(tempo.mesures ?? [{ depuis: 1, temps: 4 }])].sort((a, b) => a.depuis - b.depuis);
  const extras = new Map((tempo.ajouts ?? []).map((extra) => [extra.mesure, extra.secondes]));
  const beatsOf = (measure) => meters.filter((meter) => meter.depuis <= measure).at(-1)?.temps ?? 4;
  return (measure) => {
    let seconds = 0;
    for (let m = 1; m < measure; m += 1) seconds += beatsOf(m) * 60 / tempo.noire + (extras.get(m) ?? 0);
    return seconds;
  };
}

function projectTimeLabel(seconds) {
  const whole = Math.round(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

// Un seul repère actif sur l'ensemble des lecteurs : choisir une partie ou une lettre éteint les repères des autres
// lecteurs (et les met en pause); un second clic sur un repère actif le désélectionne et met le lecteur en pause.
function clearProjectMarkers(exceptRow = null) {
  document.querySelectorAll(".project-player").forEach((row) => {
    if (row === exceptRow) return;
    row.querySelectorAll(".project-marker[aria-pressed=\"true\"]").forEach((button) => button.setAttribute("aria-pressed", "false"));
    row.projectShowLetters?.(null);
  });
}

function projectMarkerGroup(label, className) {
  const group = projectElement("div", "project-marker-group");
  group.append(projectElement("span", "project-marker-label", label));
  const buttons = projectElement("span", className);
  group.append(buttons);
  return { group, buttons };
}

function buildProjectListen() {
  const { ecoute } = projectState.data;
  const timeAt = projectMeasureTimes(ecoute);
  const markerTime = (marker) => (marker.temps !== undefined ? marker.temps : timeAt(marker.mesure));
  const section = projectElement("section", "project-listen");
  section.setAttribute("aria-label", "Écouter");
  ecoute.lecteurs.forEach((player) => {
    const row = projectElement("div", "project-player");
    row.append(projectElement("span", "project-player-title", player.titre));
    const audio = projectElement("audio");
    audio.controls = true;
    audio.preload = "metadata";
    audio.setAttribute("controlsList", "noplaybackrate nodownload");
    audio.src = new URL(player.fichier, projectState.base).href;
    audio.addEventListener("play", () => {
      document.querySelectorAll(".project-player audio").forEach((other) => { if (other !== audio) other.pause(); });
      clearProjectMarkers(row);
    });
    audio.addEventListener("error", () => row.classList.add("is-missing"));
    row.append(audio, projectElement("span", "project-player-missing", "Enregistrement à venir."));
    const seekTo = (seconds) => {
      const seek = () => { audio.currentTime = seconds; audio.play().catch(() => {}); };
      if (audio.readyState >= 1) seek();
      else audio.addEventListener("loadedmetadata", seek, { once: true });
    };
    // Bouton de repère : un clic le choisit et lance la lecture à son temps; un second clic le désélectionne.
    const markerButton = (className, text, ariaLabel, time, onChoose, onClear) => {
      const button = projectElement("button", `project-marker ${className}`, text);
      button.type = "button";
      button.title = ariaLabel;
      button.setAttribute("aria-label", `${player.titre} : ${ariaLabel}`);
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => {
        if (button.getAttribute("aria-pressed") === "true") {
          button.setAttribute("aria-pressed", "false");
          onClear?.();
          audio.pause();
          return;
        }
        clearProjectMarkers(row);
        button.parentElement.querySelectorAll("button").forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
        onChoose?.();
        seekTo(time);
      });
      return button;
    };
    const markers = projectElement("div", "project-markers");
    const parts = projectMarkerGroup("Parties", "project-sections");
    const letters = projectMarkerGroup("Lettres de répétition", "project-letters");
    const showLetters = (part) => {
      letters.group.hidden = !part;
      letters.buttons.replaceChildren(...(part?.lettres ?? []).map((letter) => {
        const time = markerTime(letter);
        return markerButton("is-letter", letter.nom, `lettre ${letter.nom}, mesure ${letter.mesure}, ${projectTimeLabel(time)}`, time);
      }));
    };
    row.projectShowLetters = showLetters;
    ecoute.sections.forEach((part) => {
      const time = markerTime(part);
      parts.buttons.append(markerButton("is-section", part.nom, `${part.nom}, mesure ${part.mesure}, ${projectTimeLabel(time)}`, time,
        () => showLetters(part), () => showLetters(null)));
    });
    showLetters(null);
    markers.append(parts.group, letters.group);
    row.append(markers);
    section.append(row);
  });
  return section;
}

function buildProjectPanel() {
  const { data } = projectState;
  const panel = projectElement("div", "project-panel");
  panel.append(projectElement("h1", "project-title", data.titre));

  // Seulement les options cliquables : le mode de référence, puis les tétracordes.
  const itemButton = (key, label, apply) => {
    const button = projectElement("button", "project-item");
    button.type = "button";
    button.dataset.projectItem = key;
    button.setAttribute("aria-pressed", "false");
    button.append(projectColorizedName(label));
    button.addEventListener("click", () => {
      panel.querySelectorAll("[data-project-item]").forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
      selectProjectItem(key, label, apply);
    });
    return button;
  };
  const items = projectElement("div", "project-items");
  items.append(itemButton("reference", data.reference.nom, projectReferenceSelection()));
  data.tetracordes.forEach((tetrachord, index) => {
    items.append(itemButton(`t${index}`, tetrachord.nom, projectTetrachordSelection(tetrachord)));
  });
  panel.append(items);

  // Bourdon : timbre et « Tout arrêter » (venus de la barre du haut), notes, octave, volumes.
  panel.append(projectElement("h2", "project-heading", "Bourdon"));
  const soundRow = projectElement("div", "project-sound-row");
  const timbre = document.querySelector(".sound-timbre-control");
  if (timbre) soundRow.append(timbre);
  const stop = document.querySelector("#audio-stop");
  if (stop) soundRow.append(stop);
  panel.append(soundRow);
  panel.append(projectSegmented("Notes du bourdon", [{ label: "Tonique + quinte", fifth: true }, { label: "Tonique seule", fifth: false }],
    (option) => option.fifth === projectState.droneFifth, (option) => {
      projectState.droneFifth = option.fifth;
      restartProjectDrone();
    }));
  const octave = projectElement("div", "project-octave");
  octave.setAttribute("role", "group");
  octave.setAttribute("aria-label", "Octave du bourdon et des notes");
  const value = projectElement("output", "project-octave-value");
  const showOctave = () => {
    const offset = projectState.octaveOffset;
    value.textContent = offset === 0 ? "0" : offset > 0 ? `+${offset}` : `−${Math.abs(offset)}`;
  };
  const stepOctave = (step) => {
    projectState.octaveOffset = Math.max(-2, Math.min(2, projectState.octaveOffset + step));
    showOctave();
    const drone = projectState.drone;
    stopAllSounds();
    applyProjectRegister();
    render();
    if (drone) {
      const button = document.querySelector(`[data-project-drone="${CSS.escape(drone.key)}"]`);
      if (button) startProjectDrone(drone.key, projectDroneFrequency(button));
    }
  };
  const down = projectElement("button", "", "−");
  down.type = "button";
  down.setAttribute("aria-label", "Descendre d’une octave");
  down.addEventListener("click", () => stepOctave(-1));
  const up = projectElement("button", "", "+");
  up.type = "button";
  up.setAttribute("aria-label", "Monter d’une octave");
  up.addEventListener("click", () => stepOctave(1));
  octave.append(projectElement("span", "", "Octave"), down, value, up);
  showOctave();
  panel.append(octave);
  panel.append(projectSlider("Volume du bourdon", projectState.droneVolume, (v) => { projectState.droneVolume = v; applyProjectVolumes(); }));
  panel.append(projectSlider("Volume des notes", projectState.notesVolume, (v) => { projectState.notesVolume = v; applyProjectVolumes(); }));
  return panel;
}

// Tableau : seules les rangées des toniques demandées; un bouton « Bourdon » à gauche de chacune; pour un
// tétracorde, les degrés qui n'en font pas partie en filigrane.
function decorateProjectTable() {
  const content = elements.tableContent;
  const model = content.querySelector(".mode-model");
  if (!model) return;
  model.classList.add("has-project-drones");
  const rows = [...content.querySelectorAll(".mode-heji-row")];
  rows.forEach((row) => {
    if (projectState.rows && !projectState.rows.has(row.dataset.tonicRatio ?? state.selectedTonic)) row.remove();
  });
  const columns = projectState.tetrachordColumns;
  [...content.querySelectorAll(".mode-heji-row")].forEach((row, index) => {
    if (columns) {
      [...row.querySelectorAll(".mode-heji-cell")].forEach((cell, degree) => {
        cell.classList.toggle("is-function-context", degree < columns.start || degree >= columns.start + columns.length);
      });
    }
    const tonicRatio = row.dataset.tonicRatio ?? state.selectedTonic;
    const anchor = projectElement("span", "project-drone-anchor");
    const button = projectElement("button", "project-drone-button", "Bourdon");
    button.type = "button";
    button.dataset.projectDrone = `${projectState.current}:${tonicRatio}:${index}`;
    button.setAttribute("aria-label", `Bourdon sur ${plainHejiNote(ratioToHeji(tonicRatio))}`);
    button.projectRow = row;
    anchor.projectRow = row;
    button.addEventListener("click", () => {
      if (projectState.drone?.key === button.dataset.projectDrone) stopProjectDrone();
      else { stopProjectDrone(); startProjectDrone(button.dataset.projectDrone, projectDroneFrequency(button)); }
    });
    anchor.append(button);
    row.prepend(anchor);
  });
  model.classList.toggle("is-function-preview", Boolean(columns));
  if (columns) {
    content.querySelectorAll(".mode-ratio-row .mode-ratio-cell, .mode-degree-row > *").forEach((cell) => cell.classList.remove("is-function-context"));
    [...content.querySelectorAll(".mode-ratio-row .mode-ratio-cell")].forEach((cell, degree) => {
      cell.classList.toggle("is-function-context", degree < columns.start || degree >= columns.start + columns.length);
    });
  }
  // Titre du tableau : le seul nom de l'option cliquée (pour un tétracorde, son nom, pas celui du mode qui le contient).
  elements.tableTitle.replaceChildren(projectColorizedName(projectState.currentName));
  // Le titre commence au bord gauche du tableau, pas à celui de la marge des bourdons.
  const titleBox = elements.tableTitle.closest(".mode-table-heading") ?? elements.tableTitle;
  titleBox.style.marginLeft = "";
  const offset = model.getBoundingClientRect().left - elements.tableTitle.getBoundingClientRect().left;
  if (Math.abs(offset) > 0.5) titleBox.style.marginLeft = `${offset}px`;
  refreshProjectDroneButtons();
}

async function startProjectMode(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Données du projet absentes : ${url}`);
  projectState.data = await response.json();
  projectState.base = new URL(url, document.baseURI).href;
  projectState.active = true;
  document.body.classList.add("is-project");
  document.title = projectState.data.titre;
  // Rien n'est enregistré dans le navigateur, et la sélection reste dans le matériel du projet.
  optionsPersistenceReady = false;
  handleSelectionNavigationKey = () => false;
  navigateSelectionHistory = () => {};
  // Timbres retenus par le projet seulement.
  const allowed = new Set(projectState.data.sons.timbres);
  elements.audioInstrument.querySelectorAll("option").forEach((option) => { if (!allowed.has(option.value)) option.remove(); });
  elements.audioInstrument.querySelectorAll("optgroup").forEach((group) => { if (!group.children.length) group.remove(); });
  const firstGroup = elements.audioInstrument.querySelector("optgroup");
  const defaultOption = elements.audioInstrument.querySelector(`option[value="${projectState.data.sons.defaut}"]`);
  if (defaultOption && firstGroup?.contains(defaultOption) && firstGroup.label !== "Anches et tuyaux") {
    elements.audioInstrument.insertBefore(defaultOption, firstGroup);
    if (!firstGroup.children.length) firstGroup.remove();
  }
  Object.assign(state, {
    audioInstrument: projectState.data.sons.defaut, audioVolume: 100, audioMuted: false, showTableCents: true,
    tableShowModeName: true, tableShowChords: false, graphView: "mode", displayMode: "heji", audioMouseMode: "mono",
  });
  elements.audioInstrument.addEventListener("change", () => restartProjectDrone());
  // « Tout arrêter » et la barre d'espace éteignent aussi le bourdon.
  const baseStopAllSounds = stopAllSounds;
  stopAllSounds = () => { stopProjectDrone(); baseStopAllSounds(); };
  document.querySelector("#audio-stop")?.addEventListener("click", stopProjectDrone);
  // Le volume des notes et le bus du bourdon s'appliquent dès que le son démarre.
  const baseEnsureAudioContext = ensureAudioContext;
  ensureAudioContext = async (options) => {
    const context = await baseEnsureAudioContext(options);
    if (context) { ensureProjectDroneBus(); applyProjectVolumes(); }
    return context;
  };
  // Les notes du bourdon restent allumées quand le tableau rafraîchit les notes qui sonnent.
  const baseRefreshSoundingIndicators = refreshSoundingIndicators;
  refreshSoundingIndicators = () => { baseRefreshSoundingIndicators(); refreshProjectDroneButtons(); };
  const baseRender = render;
  render = () => {
    baseRender();
    if (projectState.active) decorateProjectTable();
  };
  const sidebar = elements.primarySelection ?? document.querySelector("#primary-selection");
  sidebar.hidden = false;
  sidebar.prepend(buildProjectPanel());
  document.querySelector(".analysis-column").prepend(buildProjectListen());
  // Plein écran : coin supérieur droit du tableau.
  const fullscreen = document.querySelector("#fullscreen-toggle");
  if (fullscreen) { fullscreen.classList.add("project-fullscreen"); document.querySelector("#mode-table-section").append(fullscreen); }
  document.querySelector("[data-project-item=\"reference\"]").click();
  applyAudioSettings();
  sizeTimbreSelect();
  document.body.dataset.projectReady = "true";
}

{
  const url = projectSourceUrl();
  if (url) {
    startProjectMode(url).catch((error) => {
      console.error(error);
      document.body.dataset.projectError = String(error.message ?? error);
    });
  }
}
