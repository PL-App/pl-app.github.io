// Page de répétition : structure commune. Tout le contenu (titre, lecteurs, repères, référence, tétracordes,
// toniques, timbres, registres) vient de donnees.json; rien n'est enregistré dans le navigateur.
"use strict";

// Toniques nommées en solfège, en rapports à partir du la (1/1 = la, naturels pythagoriciens).
const TONIQUES = { fa: "128/81", do: "32/27", sol: "16/9", "ré": "4/3", la: "1/1", mi: "3/2", si: "9/8" };
const LA4 = 440;

const engine = {
  context: null, droneBus: null, notesBus: null, banks: new Map(), bankPromises: new Map(),
  drone: null, notes: new Map(), timbre: null, register: null, fifth: true, sequence: 0,
};
// Les timbres de Modes lisent audioEngine.banks et la brillance du timbre choisi.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- lu par moteur.js
const audioEngine = engine;
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- lu par moteur.js
function audioBrightness() { return (engine.timbre?.brightness ?? 50) / 100; }

const $ = (selector) => document.querySelector(selector);
let data = null;

function ratioValue(text) {
  const fraction = parseFraction(text);
  return Number(fraction.numerator) / Number(fraction.denominator);
}
function multiplyRatios(a, b) {
  const x = parseFraction(a); const y = parseFraction(b);
  let { numerator, denominator } = simplify({ numerator: x.numerator * y.numerator, denominator: x.denominator * y.denominator });
  while (numerator >= denominator * 2n) denominator *= 2n;
  while (numerator < denominator) numerator *= 2n;
  return fractionToString({ numerator, denominator });
}

// Fréquence de la tonique dans l'octave choisie (octave scientifique : do3 = 130,8 Hz… si3).
function tonicFrequency(name) {
  const ratio = TONIQUES[name];
  const notation = ratioToHeji(ratio);
  const inOctave4 = LA4 * ratioValue(ratio) * (notation.referenceSemitone >= 3 ? 0.5 : 1);
  return inOctave4 * 2 ** (engine.register.octave - 4);
}

// ---------- Son ----------
async function ensureContext() {
  if (!engine.context) {
    const context = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
    const master = context.createGain();
    const dry = context.createGain();
    const wet = context.createGain();
    const reverb = context.createConvolver();
    const compressor = context.createDynamicsCompressor();
    const makeup = context.createGain();
    const limiter = context.createDynamicsCompressor();
    master.gain.value = 0.56;
    makeup.gain.value = 3.55;
    compressor.threshold.value = -12; compressor.knee.value = 16; compressor.ratio.value = 3;
    compressor.attack.value = 0.012; compressor.release.value = 0.22;
    limiter.threshold.value = -3; limiter.knee.value = 0; limiter.ratio.value = 20;
    limiter.attack.value = 0.002; limiter.release.value = 0.12;
    reverb.buffer = createRoomImpulse(context);
    const droneBus = context.createGain();
    const notesBus = context.createGain();
    droneBus.connect(master); notesBus.connect(master);
    master.connect(dry); master.connect(reverb); reverb.connect(wet);
    dry.connect(compressor); wet.connect(compressor);
    compressor.connect(makeup); makeup.connect(limiter); limiter.connect(context.destination);
    Object.assign(engine, { context, droneBus, notesBus, dry, wet, limiter });
    applyVolumes(); applyReverb();
  }
  if (engine.context.state === "suspended") await engine.context.resume();
  return engine.context;
}

function applyVolumes() {
  if (!engine.context) return;
  const level = (input) => (Number(input.value) / 100) ** 2;
  engine.droneBus.gain.setTargetAtTime(level($("#drone-volume")), engine.context.currentTime, 0.03);
  engine.notesBus.gain.setTargetAtTime(level($("#notes-volume")), engine.context.currentTime, 0.03);
}
function applyReverb() {
  if (!engine.context) return;
  const wet = (engine.timbre?.reverb ?? 30) / 100;
  engine.wet.gain.value = wet * 0.9;
  engine.dry.gain.value = 1 - wet * 0.45;
}

async function ensureBank(bankId) {
  if (engine.banks.has(bankId)) return;
  if (!engine.bankPromises.has(bankId)) {
    engine.bankPromises.set(bankId, (async () => {
      const context = await ensureContext();
      const catalogue = await (await fetch("sons/catalogue.json")).json();
      const bank = await Promise.all((catalogue[bankId] ?? []).map(async (zone) => {
        const response = await fetch(`sons/${bankId}/${zone.file}`);
        if (!response.ok) throw new Error(`Échantillon absent : ${zone.file}`);
        const decoded = await context.decodeAudioData(await response.arrayBuffer());
        return zone.loopEnd ? { ...zone, ...crossfadedLoopBuffer(context, decoded, zone.loopStart, zone.loopEnd) } : { ...zone, buffer: decoded };
      }));
      engine.banks.set(bankId, bank);
    })().catch((error) => { engine.bankPromises.delete(bankId); throw error; }));
  }
  await engine.bankPromises.get(bankId);
}

async function startVoice(frequency, bus) {
  const context = await ensureContext();
  const timbre = engine.timbre;
  if (timbre.banks.length) {
    $("#sound-status").textContent = "Chargement du son…";
    try { await Promise.all(timbre.banks.map(ensureBank)); } catch {
      $("#sound-status").textContent = "Ce son n’a pas pu être chargé.";
      return null;
    }
    $("#sound-status").textContent = "";
  }
  if (timbre !== engine.timbre) return null;
  const graph = AUDIO_VOICE_BUILDERS[timbre.id](context, frequency, (engine.sequence += 1));
  if (!graph) return null;
  const now = context.currentTime;
  graph.gain.gain.setValueAtTime(0.0001, now);
  graph.gain.gain.exponentialRampToValueAtTime(graph.peak * timbre.level, now + graph.attack);
  graph.gain.connect(bus === "drone" ? engine.droneBus : engine.notesBus);
  graph.sources.forEach((source) => source.start(now));
  return { ...graph, frequency };
}

function stopVoice(voice) {
  if (!voice || !engine.context) return;
  const now = engine.context.currentTime;
  try {
    const gain = voice.gain.gain;
    if (gain.cancelAndHoldAtTime) gain.cancelAndHoldAtTime(now); else gain.cancelScheduledValues(now);
    gain.setTargetAtTime(0.0001, now, Math.max(0.014, (voice.release ?? 0.1) / 4));
    voice.sources.forEach((source) => source.stop(now + (voice.release ?? 0.1) + 0.08));
  } catch { /* déjà arrêtée */ }
}

// ---------- Bourdon et notes ----------
async function toggleDrone(lineKey, tonic) {
  const same = engine.drone?.key === lineKey;
  stopDrone();
  if (same) return refreshButtons();
  const request = { key: lineKey, tonic, voices: [] };
  engine.drone = request;
  refreshButtons();
  const root = tonicFrequency(tonic);
  const frequencies = engine.fifth ? [root, root * 1.5] : [root];
  const voices = await Promise.all(frequencies.map((frequency) => startVoice(frequency, "drone")));
  if (engine.drone !== request) { voices.forEach(stopVoice); return; }
  request.voices = voices.filter(Boolean);
}
function stopDrone() {
  engine.drone?.voices.forEach(stopVoice);
  engine.drone = null;
}

async function toggleNote(key, frequency) {
  if (engine.notes.has(key)) {
    stopVoice(engine.notes.get(key)?.voice);
    engine.notes.delete(key);
    return refreshButtons();
  }
  const entry = { voice: null };
  engine.notes.set(key, entry);
  refreshButtons();
  const voice = await startVoice(frequency, "notes");
  if (engine.notes.get(key) !== entry) { stopVoice(voice); return; }
  entry.voice = voice;
}

function stopAll() {
  stopDrone();
  engine.notes.forEach((entry) => stopVoice(entry.voice));
  engine.notes.clear();
  refreshButtons();
}

// Le bourdon et les notes suivent l'octave et le timbre : on les relance avec le nouveau réglage.
async function restartSounding() {
  const drone = engine.drone;
  const notes = [...engine.notes.keys()];
  stopAll();
  if (drone) await toggleDrone(drone.key, drone.tonic);
  for (const key of notes) {
    const button = document.querySelector(`[data-note-key="${CSS.escape(key)}"]`);
    if (button) await toggleNote(key, noteFrequency(button));
  }
}

function noteFrequency(button) {
  return tonicFrequency(button.dataset.tonic) * ratioValue(button.dataset.ratio);
}

function refreshButtons() {
  document.body.dataset.sounding = String(Boolean(engine.drone || engine.notes.size));
  document.querySelectorAll("[data-drone-key]").forEach((button) => {
    const on = engine.drone?.key === button.dataset.droneKey;
    button.setAttribute("aria-pressed", String(on));
    button.closest(".pitch-line")?.classList.toggle("has-drone", on);
  });
  document.querySelectorAll("[data-note-key]").forEach((button) => {
    button.setAttribute("aria-pressed", String(engine.notes.has(button.dataset.noteKey)));
  });
}

// ---------- Rendu ----------
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function colorizedRatio(value) {
  const wrapper = element("span", "ratio");
  const [numerator, denominator] = value.split("/");
  const top = element("span", "", numerator); top.style.color = colorForInteger(numerator);
  const bottom = element("span", "", denominator); bottom.style.color = colorForInteger(denominator);
  wrapper.append(top, element("span", "ratio-slash", "/"), bottom);
  return wrapper;
}

function hejiPitch(absolute) {
  const notation = ratioToHeji(absolute);
  const pitch = element("span", "heji");
  pitch.append(element("span", "heji-accidental", notation.accidental), element("span", "heji-note", notation.note));
  return { pitch, cents: ratioToTunerLabel(absolute, notation), plain: plainHejiNote(notation) };
}

function pitchLine(lineKey, tonic, ratios, referenceSet) {
  const line = element("div", "pitch-line");
  const head = element("div", "line-head");
  head.append(element("span", "tonic-name", tonic));
  const drone = element("button", "drone-button", "Bourdon");
  drone.type = "button";
  drone.dataset.droneKey = lineKey;
  drone.setAttribute("aria-pressed", "false");
  drone.setAttribute("aria-label", `Bourdon sur ${tonic}`);
  drone.addEventListener("click", () => toggleDrone(lineKey, tonic));
  head.append(drone);
  line.append(head);
  const notes = element("div", "notes");
  notes.style.setProperty("--count", String(ratios.length));
  ratios.forEach((ratio) => {
    const absolute = multiplyRatios(TONIQUES[tonic], ratio);
    const { pitch, cents, plain } = hejiPitch(absolute);
    const button = element("button", "note");
    button.type = "button";
    button.dataset.noteKey = `${lineKey}:${ratio}`;
    button.dataset.tonic = tonic;
    button.dataset.ratio = ratio;
    button.setAttribute("aria-pressed", "false");
    const isNew = referenceSet && !referenceSet.has(ratio);
    button.classList.toggle("is-new", Boolean(isNew));
    button.setAttribute("aria-label", `${plain} ${cents}, ${ratio} sur ${tonic}${isNew ? ", note absente de la référence" : ""}`);
    button.append(colorizedRatio(ratio), pitch, element("span", "cents", cents));
    button.addEventListener("click", () => toggleNote(button.dataset.noteKey, noteFrequency(button)));
    notes.append(button);
  });
  line.append(notes);
  return line;
}

function parseTime(text) {
  const [minutes, seconds] = String(text).split(":").map(Number);
  return minutes * 60 + seconds;
}

function renderPlayers() {
  const container = $("#players");
  data.ecoute.lecteurs.forEach((player, index) => {
    const card = element("article", "player");
    card.append(element("h3", "", player.titre));
    const audio = element("audio");
    audio.controls = true;
    audio.preload = "metadata";
    audio.src = player.fichier;
    audio.addEventListener("error", () => { card.classList.add("is-missing"); });
    audio.addEventListener("play", () => {
      document.querySelectorAll("audio").forEach((other) => { if (other !== audio) other.pause(); });
    });
    const missing = element("p", "missing", "Enregistrement à venir.");
    const markers = element("div", "markers");
    data.ecoute.reperes.forEach((marker) => {
      const button = element("button", "marker");
      button.type = "button";
      button.append(element("strong", "", marker.nom), element("span", "", ` mes. ${marker.mesure} · ${marker.temps}`));
      button.setAttribute("aria-label", `${player.titre} : ${marker.nom}, mesure ${marker.mesure}, ${marker.temps}`);
      button.addEventListener("click", () => {
        audio.currentTime = parseTime(marker.temps);
        audio.play().catch(() => {});
      });
      markers.append(button);
    });
    card.dataset.player = String(index);
    card.append(audio, missing, markers);
    container.append(card);
  });
}

function renderReference() {
  const { nom, rapports, toniques } = data.reference;
  const block = element("article", "card reference-card");
  block.append(element("h3", "", nom));
  toniques.forEach((tonic) => block.append(pitchLine(`ref:${tonic}`, tonic, rapports, null)));
  $("#reference").append(block);
}

function renderTetrachords() {
  const referenceSet = new Set(data.reference.rapports);
  const container = $("#tetrachords");
  let section = null;
  data.tetracordes.forEach((tetrachord, index) => {
    if (tetrachord.section && tetrachord.section !== section) {
      container.append(element("h3", "cards-section", tetrachord.section));
    }
    section = tetrachord.section ?? null;
    const card = element("article", "card");
    const head = element("div", "card-head");
    head.append(element("h4", "", tetrachord.nom));
    const ratios = element("p", "card-ratios");
    tetrachord.rapports.forEach((ratio) => {
      const item = colorizedRatio(ratio);
      if (!referenceSet.has(ratio)) item.classList.add("is-new");
      ratios.append(item);
    });
    head.append(ratios);
    card.append(head);
    tetrachord.toniques.forEach((tonic) => card.append(pitchLine(`t${index}:${tonic}`, tonic, tetrachord.rapports, referenceSet)));
    container.append(card);
  });
}

function renderSoundBar() {
  const select = $("#timbre");
  const groups = new Map();
  REPETITION_TIMBRES.forEach((timbre) => {
    const key = timbre.id === data.sons.defaut ? "" : timbre.group;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(timbre);
  });
  groups.forEach((timbres, group) => {
    const parent = group ? element("optgroup") : select;
    if (group) { parent.label = group; select.append(parent); }
    timbres.forEach((timbre) => {
      const option = element("option", "", timbre.label);
      option.value = timbre.id;
      parent.append(option);
    });
  });
  engine.timbre = REPETITION_TIMBRES.find((t) => t.id === data.sons.defaut) ?? REPETITION_TIMBRES[0];
  select.value = engine.timbre.id;
  select.addEventListener("change", () => {
    engine.timbre = REPETITION_TIMBRES.find((t) => t.id === select.value);
    select.blur();
    applyReverb();
    restartSounding();
  });
  const registers = $("#registers");
  data.sons.registres.forEach((register, index) => {
    const button = element("button", "", register.nom);
    button.type = "button";
    button.dataset.register = String(index);
    button.setAttribute("aria-pressed", String(index === 0));
    button.addEventListener("click", () => {
      engine.register = register;
      registers.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      restartSounding();
    });
    registers.append(button);
  });
  engine.register = data.sons.registres[0];
  document.querySelectorAll("[data-drone-fifth]").forEach((button) => button.addEventListener("click", () => {
    engine.fifth = button.dataset.droneFifth === "true";
    document.querySelectorAll("[data-drone-fifth]").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    if (engine.drone) { const { key, tonic } = engine.drone; stopDrone(); toggleDrone(key, tonic); }
  }));
  $("#drone-volume").addEventListener("input", applyVolumes);
  $("#notes-volume").addEventListener("input", applyVolumes);
  $("#stop-all").addEventListener("click", stopAll);
}

async function start() {
  data = window.REPETITION_DATA ?? await (await fetch("donnees.json")).json();
  document.title = `${data.titre} — ${data.sousTitre}`;
  $("#page-kicker").textContent = data.sousTitre;
  $("#page-title").textContent = data.titre;
  $("#help").textContent = data.aide;
  renderSoundBar();
  renderPlayers();
  renderReference();
  renderTetrachords();
  refreshButtons();
  document.body.dataset.ready = "true";
}

start();
