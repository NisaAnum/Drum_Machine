import React, { useState, useEffect } from 'react';

const smoothPianoKit = [
  { id: 'Chord-1', keyTrigger: 'Q', src: '/audios/Chord_1.mp3' },
  { id: 'Chord-2', keyTrigger: 'W', src: '/audios/Chord_2.mp3' },
  { id: 'Chord-3', keyTrigger: 'E', src: '/audios/Chord_3.mp3' },
  { id: 'Shaker', keyTrigger: 'A', src: '/audios/Shaker.mp3' },
  { id: 'Open-HH', keyTrigger: 'S', src: '/audios/Open_HH.mp3' },
  { id: 'Closed-HH', keyTrigger: 'D', src: '/audios/Closed_HH.mp3' },
  { id: 'Punchy-Kick', keyTrigger: 'Z', src: '/audios/Punchy_Kick.mp3' },
  { id: 'Side-Stick', keyTrigger: 'X', src: '/audios/Side_Stick.mp3' },
  { id: 'Snare', keyTrigger: 'C', src: '/audios/Snare.mp3' },
];

const heaterKit = [
  { id: 'Heater-1', keyTrigger: 'Q', src: '/audios/Heater-1.mp3' },
  { id: 'Heater-2', keyTrigger: 'W', src: '/audios/Heater-2.mp3' },
  { id: 'Heater-3', keyTrigger: 'E', src: '/audios/Heater-3.mp3' },
  { id: 'Heater-4_1', keyTrigger: 'A', src: '/audios/Heater-4_1.mp3' },
  { id: 'Open-HH', keyTrigger: 'S', src: '/audios/Open_HH.mp3' },
  { id: 'Closed-HH', keyTrigger: 'D', src: '/audios/Closed_HH.mp3' },
  { id: 'RP4_KICK_1', keyTrigger: 'Z', src: '/audios/RP4_KICK_1.mp3' },
  { id: 'Kick_n_Hat', keyTrigger: 'X', src: '/audios/Kick_n_Hat.mp3' },
  { id: 'Dsc_Oh', keyTrigger: 'C', src: '/audios/Dsc_Oh.mp3' },
];

function Drumpad() {
  const [activeButton, setActiveButton] = useState(null);
  const [displayText, setDisplayText] = useState('Ready');
  const [currentBank, setCurrentBank] = useState(heaterKit);
  const [volume, setVolume] = useState(50); // Default volume
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Set volume for all audio elements
    const audios = document.querySelectorAll('audio');
    audios.forEach((audio) => {
      audio.volume = volume / 100;
    });
  }, [volume]);

  useEffect(() => {
    if (activeButton) {
      const timer = setTimeout(() => {
        setActiveButton(null);
      }, 500); // Reset active button after 500ms

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [activeButton]);

  const handleClick = (id) => {
    setActiveButton(id);
    setDisplayText(`Playing: ${id}`);
    const audio = document.getElementById(`audio-${id}`);
    if (audio) {
      audio.currentTime = 0; // Reset audio to start if clicked again before finished
      audio.play();
    }
  };

  const selectHeaterKit = () => {
    setCurrentBank(heaterKit);
    setActiveButton(null); // Reset active button when switching banks
    setDisplayText('Heater Kit'); // Update display text to reflect the current bank
  };

  const selectSmoothPianoKit = () => {
    setCurrentBank(smoothPianoKit);
    setActiveButton(null); // Reset active button when switching banks
    setDisplayText('Smooth Piano Kit'); // Update display text to reflect the current bank
  };

  const buttonClass = (id) =>
    `drum-pad ${activeButton === id ? 'bg-orange-500 p-5 shadow-black' : 'bg-gray-400'} mt-2 shadow-black transition-colors p-5 shadow-md duration-300 ease-in-out`;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="drumpad-container border-4 border-orange-500 p-4 flex flex-col md:flex-row">
        <div className="pad-bank grid grid-cols-3 gap-4 p-8 bg-white rounded shadow-lg sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {currentBank.map((pad) => (
            <button
              key={pad.id}
              className={buttonClass(pad.id)}
              id={pad.id}
              disabled={isDisabled}
              onClick={() => handleClick(pad.id)}
            >
              <audio className="clip" id={`audio-${pad.id}`} src={pad.src}></audio>
              {pad.keyTrigger}
            </button>
          ))}
        </div>

        <div className="controls-container flex flex-col items-center md:ml-8 mt-8 md:mt-0">
        

          <div className="flex items-center mb-4">
            <label className="switch border-2 border-orange-500 p-2">
              <input
              className=''
                type="checkbox"
                checked={isDisabled}
                onChange={() => setIsDisabled((prev) => !prev)}
              />
              <span className="ml-2 text-xl bg-transparent text-black border-orange-300">POWER</span>
            </label>
          </div>
          <div className="text-lg font-bold text-gray-800 bg-gray-400 p-5 mb-4">{displayText}</div>
          <div className="mb-4 w-64">
            <input
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="slider bg-orange-500 appearance-none rounded w-full h-3 transition-opacity duration-300 ease-in-out"
            />
          </div>

          <div className="w-64 bg-white rounded-lg p-3 shadow-lg">
            <div className="flex justify-between">
              <div
                className={`bank-item cursor-pointer text-center w-1/2 ${currentBank === heaterKit ? 'bg-orange-300' : ''}`}
                onClick={selectHeaterKit}
              >
                Heater Kit
              </div>
              <div
                className={`bank-item cursor-pointer text-center w-1/2 ${currentBank === smoothPianoKit ? 'bg-orange-300' : ''}`}
                onClick={selectSmoothPianoKit}
              >
                Smooth Piano Kit
              </div>
            </div>
            <div className="h-2  rounded-full mt-2 relative">
              <div
                className={`w-1/2 h-full rounded-full bg-orange-500 absolute top-0 transition-transform duration-300 ease-in-out ${
                  currentBank === heaterKit ? 'left-0' : 'left-1/2'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drumpad;
