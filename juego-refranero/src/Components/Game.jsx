import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Game = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [phrases, setPhrases] = useState([
    { original: 'Más vale tarde que nunca', completed: '' },
    { original: 'A buen entendedor, pocas palabras bastan', completed: '' },
    // Agrega más refranes según sea necesario
  ]);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleListen = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert('Tu navegador no soporta reconocimiento de voz. Prueba con otro navegador.');
      return;
    }

    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const handleNextPhrase = () => {
    // Verifica si la frase coincide con la original
    if (transcript.toLowerCase().includes(phrases[currentPhrase].original.toLowerCase())) {
      setPhrases((prevPhrases) => {
        const updatedPhrases = [...prevPhrases];
        updatedPhrases[currentPhrase].completed = phrases[currentPhrase].original;
        return updatedPhrases;
      });
    }

    // Reinicia el transcript y pasa a la siguiente frase
    resetTranscript();
    setCurrentPhrase((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Completa los refranes</h1>
      {currentPhrase < phrases.length ? (
        <div>
          <p>Frase a completar: {phrases[currentPhrase].original}</p>
          <p>Completado: {phrases[currentPhrase].completed}</p>
          <button onClick={handleListen}>Escuchar</button>
          <button onClick={handleNextPhrase}>Siguiente Frase</button>
        </div>
      ) : (
        <p>Juego completado. ¡Bien hecho!</p>
      )}
    </div>
  );
};

export default Game;
