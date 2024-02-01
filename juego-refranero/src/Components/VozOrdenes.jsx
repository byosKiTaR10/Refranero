import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useCallback } from 'react';

const VozOrdenes = () => {
  // eslint-disable-next-line
  const [refranes, setRefranes] = useState([
    { inicio: 'Más vale...', respuesta: 'tarde que nunca' },
    { inicio: 'Arrieritos somos...', respuesta: 'y en el camino nos encontraremos' },
    { inicio: 'Más sabe el diablo...', respuesta: 'por viejo que por diablo' },
    { inicio: 'A quien madruga...', respuesta: 'Dios le ayuda' },
    { inicio: 'No vendas la piel...', respuesta: 'del oso antes de cazarlo' },
    { inicio: 'Caminante...', respuesta: 'no hay camino se hace camino al andar' },
    { inicio: 'Las palabras son como las abejas...', respuesta: 'su aguijón es el veneno de la verdad' },
    { inicio: 'No hay viento favorable...', respuesta: 'para el barco que no sabe a dónde va' },
    { inicio: 'Sin pausa...', respuesta: 'pero sin prisa' },
    { inicio: 'Todos los caminos...', respuesta: 'llevan a Roma' },
    { inicio: 'A mal tiempo...', respuesta: 'buena cara' },
    // Agrega más refranes según sea necesario
  ]);
  const [refranIndicesUsados, setRefranIndicesUsados] = useState([]);
  let randomIndex;
  randomIndex = Math.floor(Math.random() * refranes.length)
  const [refranActualIndex, setRefranActualIndex] = useState(randomIndex);
  const [contador, setContador] = useState(0);
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [aciertos, setAciertos] = useState(0);
  const [intentos, setIntentos] = useState(0);
  const resetGame = useCallback(() => {
    setIntentos(0);
    setAciertos(0);
    setContador(0);
    setRefranIndicesUsados([]);
    setRespuestaUsuario('');
  }, []);

  const commands = [
    {
      command: 'Siguiente',
      callback: () => nextRefran(),
    },
    {
      command: 'borrar',
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (contador === 10) {
      // Muestra el resultado final después de 10 intentos
      alert(`Juego terminado. Aciertos: ${aciertos}/10`);
      resetGame();
    }
  }, [intentos, aciertos, contador, resetGame]);

  const checkAnswer = (answer) => {
    const refranActual = refranes[refranActualIndex];
    if (answer.toLowerCase() === refranActual.respuesta.toLowerCase()) {
      setAciertos(aciertos + 1);
      nextRefran();
      alert('Respuesta correcta')
    } else {
      alert('Respuesta incorrecta')
    }
    setIntentos(intentos + 1);
    if (intentos === 2) {
      setIntentos(0)
      nextRefran()
    }
  };

  const nextRefran = () => {
    // Genera un índice aleatorio que no se haya usado antes
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * refranes.length);
    } while (refranIndicesUsados.includes(randomIndex));

    // Agrega el índice al conjunto de índices usados
    setRefranIndicesUsados([...refranIndicesUsados, randomIndex]);

    // Actualiza el índice actual
    setRefranActualIndex(randomIndex);
    setContador(contador + 1)
    setRespuestaUsuario('');
    resetTranscript();
  };


  if (!browserSupportsSpeechRecognition) {
    return <div>No es compatible con la transcripción de voz en el navegador actual.</div>;
  }
  const buttonStyle = {
    margin: '5px',
    padding: '10px',
    fontSize: '1em',
    cursor: 'pointer',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', backgroundColor: 'darkslategray', color: 'white', padding: '20px' }}>
      <h2>Bienvenido al juego de refranes</h2>
  
      {/* Botones para iniciar y detener la escucha */}
      <button onClick={SpeechRecognition.startListening} style={buttonStyle}>
        Start Listening
      </button>
      <button onClick={SpeechRecognition.stopListening} style={buttonStyle}>
        Stop Listening
      </button>
  
      {/* Leyenda de ayuda */}
      <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
        Debes completar el refrán.<br />
        Al decir "Siguiente" pasas directamente al siguiente refrán.<br />
        Tienes un máximo de 3 intentos por refrán.<br />
        Si quieres volver a responder, simplemente haz clic en "Start Listening" de nuevo.
      </p>
  
      {/* Contador de refranes */}
      <p style={{ marginTop: '10px' }}>Refranes: {contador + 1}/10</p>
  
      {/* Mostrar el refrán actual */}
      <p style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '10px' }}>
        Refrán: {refranes[refranActualIndex].inicio}
      </p>
  
      {/* Mostrar la respuesta del usuario */}
      <p style={{ marginTop: '10px' }}>Tu respuesta: {respuestaUsuario}</p>
  
      {/* Mostrar el texto transcritp */}
      <p style={{ marginTop: '10px' }}>{transcript}</p>
  
      {/* Botón para verificar respuesta */}
      <button onClick={() => checkAnswer(transcript)} style={buttonStyle}>
        Verificar respuesta
      </button>
    </div>
  );
};

export default VozOrdenes;
