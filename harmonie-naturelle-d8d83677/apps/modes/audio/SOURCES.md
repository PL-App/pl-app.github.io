# Échantillons sonores de Modes

Ce dossier est copié tel quel vers `public/apps/modes/audio/` par `pnpm rebuild:artifacts`.

| Dossier | Contenu | Source et licence |
|---|---|---|
| `piano/` | Piano à queue Yamaha C5, nuance moyenne (couche 8), une note tous les trois demi-tons, MIDI 33 à 96 | Salamander Grand Piano V3, Alexander Holm, CC BY 3.0 |
| `feutre/` | Même piano joué doucement (couche 4), base du « Piano lo-fi » | Salamander Grand Piano V3, Alexander Holm, CC BY 3.0 |
| `violoncelles/` | Pupitre de violoncelles, son tenu avec vibrato, 13 notes | Versilian Studios, VSCO 2 Community Edition, CC0 |
| `altos/` | Pupitre d’altos, son tenu avec vibrato, 13 notes | Versilian Studios, VSCO 2 Community Edition, CC0 |
| `orgue-8/`, `orgue-4/` | Orgue Renaissance, jeux de 8' et de 4' séparés, une note par ton (27 chacun), mono, boucle de tenue | VCSL (Versilian Community Sample Library), Simon Dalzell / Ivy Audio, CC0 |
| `cor/` | Cor tenu (« sus »), nuance moyenne, boucle de tenue; hauteur aplanie dans le temps (lot v88, 9 novembre 2026) | Versilian Studios, VSCO 2 Community Edition, CC0 |
| `clarinette/`, `flute/` | Vents tenus (clarinette « susLong », flûte sans vibrato « susNV »), nuance moyenne, boucle de tenue | Versilian Studios, VSCO 2 Community Edition, CC0 (banc d'essai, 6 novembre 2026) |
| `harpe/` | Harpe de concert, mezzo-forte, 23 notes, résonance libre | Versilian Studios, VSCO 2 Community Edition, CC0 |
| `clavecin/` | Clavecin français, jeu normal, 28 notes, résonance libre | VCSL, Versilian Studios, CC0 |
| `piano-fm/` | Piano FM du synthétiseur Yamaha TX81Z, nuance moyenne, 19 notes | VCSL (Electrophones/TX81Z), Versilian Studios, CC0 |

Les fichiers de cordes portent comme nom leur hauteur MIDI × 100, mesurée sur l’enregistrement.
`catalogue.json` donne pour chaque fichier sa hauteur réelle mesurée (`hz`) et, pour les cordes,
la boucle de tenue (`loopStart`, `loopEnd`, en secondes). Le moteur règle la vitesse de lecture
sur cette hauteur mesurée : chaque note sonne exactement au rapport demandé.

Le piano enregistré est accordé « étiré », comme tout piano de concert : de −11 cents dans le grave
à +24 cents dans l’aigu par rapport au tempérament théorique. Sa hauteur est mesurée comme la
médiane des trois premiers partiels ramenés à la fondamentale, sur les deux premières secondes.

- https://archive.org/details/SalamanderGrandPianoV3 (Salamander Grand Piano V3, version MP3 de https://github.com/darosh/samples-piano-mp3)
- https://github.com/sgossner/VSCO-2-CE
- https://github.com/sgossner/VCSL (`Aerophones/Edge-blown Aerophones/Renaissance Organ/8'` et `4'`; hauteur mesurée par somme harmonique puis médiane des trois premiers partiels, 20 octobre 2026. Les noms de fichiers VCSL sont une octave sous le son réel du 8' et deux octaves sous celui du 4' : la hauteur mesurée fait foi.)

Banc d'essai (6 novembre 2026) : fichiers convertis en mono 44,1 kHz MP3 112 kbit/s, rognés (7 s pour les vents, 5 à 5,5 s
pour les cordes pincées et le piano FM), hauteur mesurée par recherche harmonique autour de la note nommée (les noms de
fichiers de la clarinette, de la flûte, du cor et du clavecin sont une octave sous le son réel), puis médiane des trois premiers
partiels. `gain` égalise le corps des notes dans chaque banque. Script : `scripts/prepare-audio-bench.py`.

