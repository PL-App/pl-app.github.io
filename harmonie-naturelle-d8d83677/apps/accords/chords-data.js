"use strict";

window.HN_CHORD_DATA = {
  columns: [
    { level: "Niveau 1", group: "Triades", names: ["M", "m", "sm", "mb5", "smb5", "#5", "sus2", "sus4"] },
    { level: "Niveau 2", group: "6 / add", names: ["6", "add9", "add11", "add#11", "6add#11", "addb6", "Fr+6", "Gr+6"] },
    { level: "Niveau 2", group: "m6 / add", names: ["m6", "sm6", "madd9", "madd11", "smadd9", "smadd11", "maddb9", "smaddb9"] },
    { level: "Niveau 3", group: "maj7", names: ["maj7", "maj9", "maj7#11", "maj9#11", "maj7#5", "m(maj7)", "m(maj9)"] },
    { level: "Niveau 3", group: "7", names: ["7", "9", "9#11", "7b13", "9b13", "m7", "m9", "7no3", "9no3", "m7b5", "m7b9"] },
  ],
  chords: {
    "sus2": {
      degrees: ["1", "2", "5"],
      variants: [{ proportions: "6:8:9", intervals: "3:4 + 8:9", notation: "6:8:9", pitchRatios: ["1/1", "9/8", "3/2"] }],
    },
    "sus4": {
      degrees: ["1", "4", "5"],
      variants: [{ proportions: "6:8:9", intervals: "3:4 + 8:9", notation: "4:(4/3):6", pitchRatios: ["1/1", "4/3", "3/2"] }],
    },
    "M": {
      degrees: ["1", "3", "5"],
      variants: [{ proportions: "4:5:6", intervals: "4:5 + 5:6", notation: "4:5:6", pitchRatios: ["1/1", "5/4", "3/2"] }],
    },
    "m": {
      degrees: ["1", "♭3", "5"],
      variants: [{ proportions: "10:12:15", intervals: "5:6 + 4:5", notation: "4:(6/5):6", pitchRatios: ["1/1", "6/5", "3/2"] }],
    },
    "sm": {
      degrees: ["1", "♭3", "5"],
      variants: [{ proportions: "6:7:9", intervals: "6:7 + 7:9", notation: "4:(7/6):6", pitchRatios: ["1/1", "7/6", "3/2"] }],
    },
    "mb5": {
      degrees: ["1", "♭3", "♭5"],
      hiddenFundamental: true,
      interpretation: "Accord sans fondamentale; interprétation principale 3–5–♭7.",
      variants: [
        {
          contextLabel: "Mixo. L7",
          functionDegrees: ["3", "5", "♭7"],
          intervals: "5:6 + 6:7",
          modeTonicDegreeRatio: "5/4",
          notation: "4:(6/5):(7/5)",
          pitchRatios: ["5/4", "3/2", "7/4"],
          proportions: "5:6:7",
          tonicAnchorRatio: "5/4",
        },
        {
          contextLabel: "Phryg. L7",
          functionDegrees: ["5", "♭7", "♭9"],
          intervals: "5:6 + 6:7",
          modeTonicDegreeRatio: "3/2",
          notation: "4:(6/5):(7/5)",
          pitchRatios: ["3/2", "9/5", "21/20"],
          proportions: "5:6:7",
          tonicAnchorRatio: "3/2",
        },
      ],
    },
    "smb5": {
      degrees: ["1", "♭3", "♭5"],
      hiddenFundamental: true,
      interpretation: "Accord sans fondamentale; interprétation principale 5–♭7–♭9.",
      variants: [{
        contextLabel: "Phryg. L7",
        functionDegrees: ["5", "♭7", "♭9"],
        intervals: "6:7 + 5:6",
        modeTonicDegreeRatio: "3/2",
        notation: "4:(7/6):(7/5)",
        pitchRatios: ["3/2", "7/4", "21/20"],
        proportions: "30:35:42",
        tonicAnchorRatio: "3/2",
      }],
    },
    "#5": {
      degrees: ["1", "3", "♯5"],
      variants: [{ proportions: "16:20:25", intervals: "4:5 + 4:5", notation: "4:5:(25)", pitchRatios: ["1/1", "5/4", "25/16"] }],
    },
    "6": {
      degrees: ["1", "3", "5", "6"],
      variants: [{ proportions: "12:15:18:20", intervals: "4:5 + 5:6 + 9:10", notation: "4:5:6:(5/3)", pitchRatios: ["1/1", "5/4", "3/2", "5/3"] }],
    },
    "add9": {
      degrees: ["1", "3", "5", "9"],
      variants: [{ proportions: "6:8:9:10", intervals: "3:4 + 8:9 + 9:10", notation: "6:8:9:10", pitchRatios: ["1/1", "5/4", "3/2", "9/8"] }],
    },
    "add11": {
      degrees: ["1", "3", "5", "11"],
      variants: [{ proportions: "12:15:16:18", intervals: "4:5 + 15:16 + 8:9", notation: "4:5:(4/3):6", pitchRatios: ["1/1", "5/4", "3/2", "4/3"] }],
    },
    "add#11": {
      degrees: ["1", "3", "5", "♯11"],
      variants: [
        { label: "L5", proportions: "32:40:45:48", intervals: "4:5 + 8:9 + 15:16", notation: "4:5:(45):6", pitchRatios: ["1/1", "5/4", "3/2", "45/32"] },
        { label: "L7", proportions: "28:35:40:42", intervals: "4:5 + 7:8 + 20:21", notation: "4:5:(10/7):6", pitchRatios: ["1/1", "5/4", "3/2", "10/7"] },
        { label: "L11", proportions: "8:10:11:12", intervals: "4:5 + 10:11 + 11:12", notation: "8:10:11:12", pitchRatios: ["1/1", "5/4", "3/2", "11/8"] },
      ],
    },
    // Ajouté le 22 octobre 2026 à la demande de Simon (hors sélection 260903) : seulement 84:105:120:126:140
    // (♯11 = 10/7), les ratios du ♭III du Dorien L7m (confirmé par Simon).
    "6add#11": {
      degrees: ["1", "3", "5", "6", "♯11"],
      variants: [
        { label: "L7", proportions: "84:105:120:126:140", intervals: "4:5 + 7:8 + 20:21 + 9:10", notation: "4:5:(10/7):6:(5/3)", pitchRatios: ["1/1", "5/4", "3/2", "5/3", "10/7"] },
      ],
    },
    "addb6": {
      degrees: ["1", "3", "5", "♭6"],
      variants: [{ proportions: "8:10:12:13", intervals: "4:5 + 5:6 + 12:13", notation: "8:10:12:13", pitchRatios: ["1/1", "5/4", "3/2", "13/8"] }],
    },
    "Fr+6": {
      degrees: ["♭6", "1", "2", "♯4"],
      variants: [{ proportions: "128:160:180:225", intervals: "4:5 + 8:9 + 4:5", notation: "(8/5):8:9:(45)", pitchRatios: ["8/5", "1/1", "9/8", "45/32"] }],
    },
    "Gr+6": {
      degrees: ["♭6", "1", "♭3", "♯4"],
      enharmonicSeventhRootRatio: "8/5",
      variants: [
        { label: "L5", proportions: "128:160:192:225", intervals: "4:5 + 5:6 + 64:75", notation: "(8/5):8:(6/5):(45)", pitchRatios: ["8/5", "1/1", "6/5", "45/32"] },
      ],
    },
    "m6": {
      degrees: ["1", "♭3", "5", "6"],
      variants: [{ proportions: "70:84:105:120", intervals: "5:6 + 4:5 + 7:8", notation: "4:(6/5):6:(12/7)", pitchRatios: ["1/1", "6/5", "3/2", "12/7"] }],
    },
    "sm6": {
      degrees: ["1", "♭3", "5", "6"],
      variants: [{ proportions: "6:7:9:10", intervals: "6:7 + 7:9 + 9:10", notation: "4:(7/6):6:(5/3)", pitchRatios: ["1/1", "7/6", "3/2", "5/3"] }],
    },
    "madd9": {
      degrees: ["1", "♭3", "5", "9"],
      variants: [{ proportions: "30:40:45:48", intervals: "3:4 + 8:9 + 15:16", notation: "6:8:9:(6/5)", pitchRatios: ["1/1", "6/5", "3/2", "9/8"] }],
    },
    "madd11": {
      degrees: ["1", "♭3", "5", "11"],
      variants: [{ proportions: "30:36:40:45", intervals: "5:6 + 9:10 + 8:9", notation: "4:(6/5):(4/3):6", pitchRatios: ["1/1", "6/5", "3/2", "4/3"] }],
    },
    "smadd9": {
      degrees: ["1", "♭3", "5", "9"],
      variants: [{ proportions: "18:24:27:28", intervals: "3:4 + 8:9 + 27:28", notation: "6:8:9:(7/6)", pitchRatios: ["1/1", "7/6", "3/2", "9/8"] }],
    },
    "smadd11": {
      degrees: ["1", "♭3", "5", "11"],
      variants: [{ proportions: "6:7:8:9", intervals: "6:7 + 7:8 + 8:9", notation: "4:(7/6):(4/3):6", pitchRatios: ["1/1", "7/6", "3/2", "4/3"] }],
    },
    "maddb9": {
      degrees: ["1", "♭3", "5", "♭9"],
      variants: [{ proportions: "20:21:24:30", intervals: "20:21 + 7:8 + 4:5", notation: "4:(21/20):(6/5):6", pitchRatios: ["1/1", "6/5", "3/2", "21/20"] }],
    },
    "smaddb9": {
      degrees: ["1", "♭3", "5", "♭9"],
      variants: [{ proportions: "60:63:70:90", intervals: "20:21 + 9:10 + 7:9", notation: "4:(21/20):(7/6):6", pitchRatios: ["1/1", "7/6", "3/2", "21/20"] }],
    },
    "maj7": {
      degrees: ["1", "3", "5", "7"],
      variants: [{ proportions: "8:10:12:15", intervals: "4:5 + 5:6 + 4:5", notation: "8:10:12:15", pitchRatios: ["1/1", "5/4", "3/2", "15/8"] }],
    },
    "maj9": {
      degrees: ["1", "3", "5", "7", "9"],
      variants: [{ proportions: "10:12:15:16:18", intervals: "5:6 + 4:5 + 15:16 + 8:9", notation: "10:12:15:16:18", pitchRatios: ["1/1", "5/4", "3/2", "15/8", "9/8"] }],
    },
    "maj7#11": {
      degrees: ["1", "3", "5", "7", "♯11"],
      variants: [{ proportions: "24:30:32:40:45", intervals: "4:5 + 15:16 + 4:5 + 8:9", notation: "12:15:16:20:(45)", pitchRatios: ["1/1", "5/4", "3/2", "15/8", "45/32"] }],
    },
    "maj9#11": {
      degrees: ["1", "3", "5", "7", "9", "♯11"],
      variants: [{ proportions: "24:30:32:36:40:45", intervals: "4:5 + 15:16 + 8:9 + 9:10 + 8:9", notation: "12:15:16:18:20:(45)", pitchRatios: ["1/1", "5/4", "3/2", "15/8", "9/8", "45/32"] }],
    },
    "maj7#5": {
      degrees: ["1", "3", "♯5", "7"],
      variants: [{ proportions: "16:20:25:30", intervals: "4:5 + 4:5 + 5:6", notation: "8:10:(25):15", pitchRatios: ["1/1", "5/4", "25/16", "15/8"] }],
    },
    "m(maj7)": {
      degrees: ["1", "♭3", "5", "7"],
      variants: [{ proportions: "40:48:60:75", intervals: "4:5 + 5:6 + 4:5", notation: "8:(6/5):12:15", pitchRatios: ["1/1", "6/5", "3/2", "15/8"] }],
    },
    "m(maj9)": {
      degrees: ["1", "♭3", "5", "7", "9"],
      variants: [{ proportions: "60:75:80:90:96", intervals: "4:5 + 15:16 + 8:9 + 15:16", notation: "12:15:16:18:(6/5)", pitchRatios: ["1/1", "6/5", "3/2", "15/8", "9/8"] }],
    },
    "7": {
      degrees: ["1", "3", "5", "♭7"],
      variants: [{ proportions: "4:5:6:7", intervals: "4:5 + 5:6 + 6:7", notation: "4:5:6:7", pitchRatios: ["1/1", "5/4", "3/2", "7/4"] }],
    },
    "9": {
      degrees: ["1", "3", "5", "♭7", "9"],
      variants: [{ proportions: "6:7:8:9:10", intervals: "6:7 + 7:8 + 8:9 + 9:10", notation: "6:7:8:9:10", pitchRatios: ["1/1", "5/4", "3/2", "7/4", "9/8"] }],
    },
    "9#11": {
      degrees: ["1", "3", "5", "♭7", "9", "♯11"],
      variants: [{ proportions: "6:7:8:9:10:11", intervals: "6:7 + 7:8 + 8:9 + 9:10 + 10:11", notation: "6:7:8:9:10:11", pitchRatios: ["1/1", "5/4", "3/2", "7/4", "9/8", "11/8"] }],
    },
    "7b13": {
      degrees: ["1", "3", "5", "♭7", "♭13"],
      variants: [{ proportions: "8:10:12:13:14", intervals: "4:5 + 5:6 + 12:13 + 13:14", notation: "8:10:12:13:14", pitchRatios: ["1/1", "5/4", "3/2", "7/4", "13/8"] }],
    },
    "9b13": {
      degrees: ["1", "3", "5", "♭7", "9", "♭13"],
      variants: [{ proportions: "7:8:9:10:12:13", intervals: "7:8 + 8:9 + 9:10 + 5:6 + 12:13", notation: "7:8:9:10:12:13", pitchRatios: ["1/1", "5/4", "3/2", "7/4", "9/8", "13/8"] }],
    },
    "m7": {
      degrees: ["1", "♭3", "5", "♭7"],
      variants: [{ proportions: "12:15:18:20", intervals: "4:5 + 5:6 + 8:9", notation: "(6/5):6:(9/5):8", pitchRatios: ["1/1", "6/5", "3/2", "9/5"] }],
    },
    "m9": {
      degrees: ["1", "♭3", "5", "♭7", "9"],
      variants: [{ proportions: "30:36:40:45:48", intervals: "5:6 + 9:10 + 8:9 + 15:16", notation: "6:(9/5):8:9:(6/5)", pitchRatios: ["1/1", "6/5", "3/2", "9/5", "9/8"] }],
    },
    "7no3": {
      degrees: ["1", "5", "♭7"],
      variants: [{ proportions: "6:7:8", intervals: "6:7 + 7:8", notation: "6:7:8", pitchRatios: ["1/1", "3/2", "7/4"] }],
    },
    "9no3": {
      degrees: ["1", "5", "♭7", "9"],
      variants: [{ proportions: "6:7:8:9", intervals: "6:7 + 7:8 + 8:9", notation: "6:7:8:9", pitchRatios: ["1/1", "3/2", "7/4", "9/8"] }],
    },
    "m7b5": {
      degrees: ["1", "♭3", "♭5", "♭7"],
      hiddenFundamental: true,
      functionDegrees: ["3", "5", "♭7", "9"],
      interpretation: "Accord sans fondamentale; interprétation 3–5–♭7–9.",
      variants: [{
        proportions: "5:6:7:9",
        intervals: "5:6 + 6:7 + 7:9",
        modeTonicDegreeRatio: "5/4",
        notation: "4:(6/5):(7/5):(9/5)",
        pitchRatios: ["5/4", "3/2", "7/4", "9/8"],
        tonicAnchorRatio: "5/4",
      }],
    },
    "m7b9": {
      degrees: ["1", "♭3", "5", "♭7", "♭9"],
      variants: [{ proportions: "12:15:18:20:21", intervals: "4:5 + 5:6 + 9:10 + 20:21", notation: "(6/5):6:(9/5):8:(21/20)", pitchRatios: ["1/1", "6/5", "3/2", "9/5", "21/20"] }],
    },
  },
};
