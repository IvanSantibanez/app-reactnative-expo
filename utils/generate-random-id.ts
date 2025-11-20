import uuid from 'react-native-uuid';

export default function generateRandomId(){
  return uuid.v4();
}