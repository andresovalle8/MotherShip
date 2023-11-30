const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// Rutas para las imágenes y música por defecto
const image1Path = '../src/imagen1.png';
const image2Path = '../src/imagen2.png';
const image3Path = '../src/imagen3.png';
const DEFAULT_VOICE_SONG = '../music/default_voice.mp3';
const DEFAULT_MUSIC_SONG = '../music/explorador.mp3';

// Rutas para la vista previa
const previewImage1Path = '../src/imagen1.png';
const previewImage2Path = '../src/imagen2.png';
const previewImage3Path = '../src/imagen3.png';
const DEFAULT_PREVIEW_PATH = '../music/preview.mp4';

// Rutas para los arquetipos y música por defecto
const arquetiposSong = {
  Inocente: ['../music/inocente.mp3'],
  Comun: ['../music/comun.mp3'],
  Cuidadora: ['../music/cuidadora.mp3'],
  Creativa: ['../music/creativa.mp3'],
  Rebelde: ['../music/rebelde.mp3'],
  Gobernante: ['../music/gobernante.mp3'],
  Bufona: ['../music/bufon.mp3'],
  Maga: ['../music/maga.mp3'],
  Sabia: ['../music/sabio.mp3'],
  Amante: ['../music/amante.mp3'],
  Exploradora: ['../music/explorador.mp3'],
  Heroina: ['../music/heroe.mp3']
};

// Función que selecciona una canción aleatoria para cada arquetipo del array
function selectSong(arquetipo) {
  try {
    const song = arquetiposSong[arquetipo];
    const indiceAleatorio = Math.floor(Math.random() * song.length);
    return song[indiceAleatorio];
  } catch (error) {
    console.error(error.message);
    return null; // Devuelve null en caso de error
  }
}

// Función para crear el video
function createVideo(req, res) {
  const outputPath = '../music/video.mp4';
  const voicePath = req.body.toggleVoice ? '../music/voice_note.mp3' : DEFAULT_VOICE_SONG;
  const musicPath = req.body.toggleMusic ? selectSong(req.body.arquetipo) || DEFAULT_MUSIC_SONG : null;

  // Determinar la duración del video basado en las prioridades dadas
  let videoDuration;
  if (voicePath) {
    videoDuration = ffmpeg.ffprobeSync(voicePath).format.duration / 3; // Divide por 3 para tres imágenes
  } else if (musicPath) {
    videoDuration = ffmpeg.ffprobeSync(musicPath).format.duration / 3;
  } else {
    // Duración por defecto si no hay nota de voz ni música seleccionada
    videoDuration = 30;
  }

  const voiceVolume = req.body.volumeVoice || 0.8;
  const musicVolume = req.body.volumeMusic || 0.3;

  const command = ffmpeg();

  command.input(image1Path).input(image2Path).input(image3Path);

  // Añadir la nota de voz como una pista de audio si está seleccionada
  if (voicePath) {
    command.input(voicePath).audioFilter(`volume=${voiceVolume}`, { track: 1 });
  }

  // Añadir la música como otra pista de audio si está seleccionada
  if (musicPath) {
    command.input(musicPath).audioFilter(`volume=${musicVolume}`, { track: 2 });
  }

  // Configurar el formato del video para redes sociales (720p)
  command.videoCodec('libx264').size('1280x720');

  // Configurar la duración del video
  command.duration(videoDuration);

  // Configurar la salida del video
  command.output(outputPath);

  command.on('start', (commandLine) => {
    console.log(`Ejecutando: ${commandLine}`);
    res.send('Creando vista previa...');
  });

  command.on('end', () => {
    console.log('¡Video creado con éxito!');
    res.send('¡Video creado con éxito!');
  });

  command.on('error', (err) => {
    console.error('Error al crear el video:', err);
    res.status(500).send('Error al crear el video.');
  });

  // Ejecutar la operación de fusión
  command.run();
}

// Función para actualizar la vista previa
function createPreview(controls) {
  const outputPath = DEFAULT_PREVIEW_PATH; // Cambia a la ubicación deseada
  const voicePath = controls.toggleVoice ? '../music/voice_note.mp3' : DEFAULT_VOICE_SONG;
  const musicPath = controls.toggleMusic ? selectSong(controls.arquetipo) || DEFAULT_MUSIC_SONG : null;

  // Determinar la duración del video basado en las prioridades dadas
  let videoDuration;
  if (voicePath) {
    videoDuration = ffmpeg.ffprobeSync(voicePath).format.duration / 3; // Divide por 3 para tres imágenes
  } else if (musicPath) {
    videoDuration = ffmpeg.ffprobeSync(musicPath).format.duration / 3;
  } else {
    // Duración por defecto si no hay nota de voz ni música seleccionada
    videoDuration = 30;
  }

  const voiceVolume = controls.volumeVoice || 0.8;
  const musicVolume = controls.volumeMusic || 0.3;

  const command = ffmpeg();

  command.input(previewImage1Path).input(previewImage2Path).input(previewImage3Path);

  // Añadir la nota de voz como una pista de audio si está seleccionada
  if (voicePath) {
    command.input(voicePath).audioFilter(`volume=${voiceVolume}`, { track: 1 });
  }

  // Añadir la música como otra pista de audio si está seleccionada
  if (musicPath) {
    command.input(musicPath).audioFilter(`volume=${musicVolume}`, { track: 2 });
  }

  // Configurar el formato del video para redes sociales (720p)
  command.videoCodec('libx264').size('1280x720');

  // Configurar la duración del video
  command.duration(videoDuration);

  // Configurar la salida del video
  command.output(outputPath);

  command.on('start', (commandLine) => {
    console.log(`Ejecutando: ${commandLine}`);
  });

  command.on('end', () => {
    console.log('Vista previa actualizada con éxito!');
  });

  command.on('error', (err) => {
    console.error('Error al actualizar la vista previa:', err);
  });

  // Ejecutar la operación de fusión
  command.run();
}

module.exports = {
  createVideo,
  createPreview,
};
