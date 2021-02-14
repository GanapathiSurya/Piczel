import {useState, useEffect} from 'react';
import { useAuth } from '../contexts/AuthContext';
import {projectStorage, projectfirestore, timestamp } from '../firebase';

const useStorage = (file,title) => {
   const [progress, setProgress] = useState(0);
   const [error, setError] = useState(null);
   const [url, setUrl] = useState(null);
   const {currentUser} = useAuth();
   //alert(title);
   useEffect(() => {
       const createdAt = timestamp();
       const uploaddate= new Date();
       const storageRef= projectStorage.ref(currentUser.uid+"/"+String(uploaddate));
       const collectionRef =projectfirestore.collection(currentUser.uid);
       storageRef.put(file).on('state_changed',(snap) => {
           let percentage= (snap.bytesTransferred / snap.totalBytes) * 100;
           setProgress(percentage); 
       }, (err) => {
           setError(err);
       },async () => {
           const type= file.type;
           const url = await storageRef.getDownloadURL();
           const uploadeddate = String(uploaddate)
           collectionRef.add({url, createdAt, uploadeddate,type,title});
           setUrl(url);
       })
   },[file,currentUser.uid,title]);
   return {progress, url, error}
}
export default useStorage;