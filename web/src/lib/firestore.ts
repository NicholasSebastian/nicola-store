import { Firestore } from '@google-cloud/firestore';
import credentials from '../../firebase-credentials.json';

export default new Firestore({
  projectId: 'lanica-the-label-website',
  credentials
});