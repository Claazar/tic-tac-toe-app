# English

## Tic Tac Toe – An 8-Day Project

### 💻 Project Overview
I am a first-year application development apprentice at ZLI and had 8 days to complete a self-chosen project. I decided to create a Tic-Tac-Toe app using React.

### 🚀 Motivation
I am often asked by family and friends: "What exactly are you doing in your apprenticeship?" Since I don't always have my laptop with me, and many of my previous projects were not very interesting for younger family members, I wanted to create something that runs directly on my Android phone. That way, I can show it anytime, and it's interactive and fun for everyone. At the same time, I'm very interested in React, as I plan to develop more useful or entertaining apps for my phone in the future.

### 🗒️ How to Run This Project
If you want to try the project yourself, follow these steps:
1. Clone this repository or download the files.
2. Make sure Node.js is installed on your computer.
3. Open a terminal and navigate to the project folder.
4. Run `npm install` to install all dependencies.
5. Start the app with `npm start` and open it in your browser.

Alternatively, you can view the app directly in the browser without downloading it via this [link](https://claazar.github.io/tic-tac-toe-app/).

### 🌟 Final Result & Reflection
**What went well?**
- Successfully implemented basic game logic
- Gained first experience with React
- Created a simple, functional UI

**Challenges & Learnings**
- CSS styling was tricky at first
- Faced serious issues with deployment which led to abandoning React Native
- Planning time frames was difficult

---

# Deutsch

## Tic Tac Toe – Ein 8-Tage-Projekt

### 💻 Projektübersicht
Ich bin Lernender in der Applikationsentwicklung im Basislehrjahr am ZLI und hatte 8 Tage Zeit, um ein eigenes Projekt umzusetzen. Ich habe mich entschieden, eine Tic-Tac-Toe-App mit React zu entwickeln.

### 🚀 Motivation
Oft werde ich von Familie und Freunden gefragt: "Was machst du eigentlich genau in deiner Lehre?" Da ich nicht immer meinen Laptop dabei habe und viele meiner bisherigen Projekte für die jüngeren Familienmitglieder eher uninteressant sind, wollte ich etwas entwickeln, das direkt auf meinem Android-Handy läuft. So kann ich es jederzeit zeigen und es ist für alle interaktiv und spannend. Gleichzeitig interessiert mich React sehr, da ich in Zukunft weitere nützliche oder unterhaltsame Apps für mein Handy programmieren möchte.

### 🗒️ Installation & Ausführen
Falls du das Projekt selbst ausprobieren möchtest, folge diesen Schritten:
1. Klone dieses Repository oder lade die Dateien herunter.
2. Stelle sicher, dass Node.js auf deinem Computer installiert ist.
3. Öffne ein Terminal und navigiere zum Projektordner.
4. Führe den Befehl `npm install` aus, um alle Abhängigkeiten zu installieren.
5. Starte die App mit dem Befehl `npm start` und öffne sie in deinem Browser.

Alternativ kannst du die App direkt über diesen [Link](https://claazar.github.io/tic-tac-toe-app/) im Browser anschauen, ohne es herunterzuladen.

### 🌟 Endresultat & Reflexion
**Was lief gut?**
- Grundlegende Spiellogik erfolgreich implementiert
- Erste Erfahrung mit React gesammelt
- Schlichtes, funktionales UI erstellt

**Herausforderungen & Learnings**
- Styling in CSS war anfangs ungewohnt
- Ernsthafte Probleme beim Deployment führten zum Verzicht auf React Native
- Zeitplanung war eine Herausforderung

---

### Versions

**v1.0**  
- Full release of basic Tic-Tac-Toe game that can be played against a friend locally.
  Erste Version mit basis Tic-Tac-Toe Spiel welches gegen einen Freund Lokal gespielt werden kann.
- Reset button to reset the game and play it again.
  Reset Knopf um das Spiel nochmals zu spielen.
- Simple logic to prevent putting marks against the rules.
  Einfache Logik um zu verhindern, dass man gegen die Regeln markierungen setzt.
- Win detection.
  Gewinnerkennung.

**v2.0**  
- Added a bot that can play against you, making random moves.
  Roboter hinzugefügt welcher mit zufälligen Zügen spielt.
- Added a modal that asks if you would like to play against a human or a bot.
  Ein Fenster hinzugefügt welches fragt ob man gegen einen Mensch oder Roboter spielen möchte.
- Added detection for draw games.
  Erkennung für ein unentschieden eingefügt.

**v2.1**  
- Added a button to change game mode, so you don’t have to reload the page if you want to switch.
  Knopf hinzugefüt welches erlaubt ohne die Seite neu laden zu müssen, den Spielmodus zu wechseln.
- Improved button placement in the "choose game mode" modal.
  Knopfplatzierung in der Spielmodusauswahl verbessert.

**v2.2**  
- Added a counter for X and O for each win.
  Gewinnzähler für X und O.
- Added sounds for filling out the fields, winning, losing, and ties.
  Geräusche hinzugefügt für das ausfüllen eines Feldes, gewinnen, verlieren oder unentschieden.

**v3.0**  
- Significantly improved the bot.
  Roboter wurde Stark verbessert.
- New difficulty selection screen:
  Neuen Schwierigkeitsgrad-screen:
  - Easy -> Random
    Zufällig
  - Medium -> Random unless there's a possibility to win in one move  
    Zufällig ausser es gibt eine möglichkeit das Spiel in einem Zug zu gewinnen
  - Hard -> Simulates all possible moves and chooses the one with the best outcome (HAS YET TO BE DEFEATED).
    Simuliert alle möglichen Züge und wählt den aus, welcher das beste Ergebniss liefert (WURDE BISHER NOCH NIE GESCHLAGEN)

**v3.0.1pre**
- Bug fix attempt regarding the replay of sounds.
  Bug fix versuch wegen des abspielen von Geräuschen.
- Commented and cleaned up code.
  Code kommentiert und aufgeräumt.

**v3.0.1**  
- Removed sounds (for now) to fix an issue regarding the system not being able to find the files.
  Geräusche wurden vorerst entfernt aufgrunde eines Fehlers mit dem finden der Dateien.

**v3.0.2pre**  
- Attempt at fixing an issue regarding browsers in dark mode.
  Versuch ein Problem zu beheben welches das Spielen in einem Browser im Nachtmodus behindert.

**v3.0.2**  
- Fixed an issue when browsers were in dark mode, now forcing the background color to white.
  Problem behoben welches dazu führte das ein Browser im Nachtmodus einen schwarzen Hintergrund hatte. Hintergrundfarbe wird nun zu Weiss gezwungen.

**v3.0.4**  
- Completed this ReadMe.
  Dieses ReadMe vervollständigt.
