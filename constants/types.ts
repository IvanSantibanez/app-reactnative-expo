// Define la estructura de datos para la Localización (GPS)
export interface LocationData {
  latitude: number;
  longitude: number;
}

// Define la estructura de la Tarea (Task) con todos los requerimientos
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  userId: string;

  //  Requerimiento: Ruta local a la foto guardada
  photoUri: string;

  //  Requerimiento: Localización donde se creó la tarea
  location: LocationData;

  // sirve para ordenar y gestionar
  createdAt: number;
}
