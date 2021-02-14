import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useStorage from './useStorage';
const ProgressBar = ({file,setFile,title}) => {
const {url, progress} = useStorage(file,title);
useEffect(() => {
    if (url) {
  setFile(null);
    }
},[url, setFile])
return (
        <motion.div className="progress-bar"
        initial={{width:0}}
        animate={{width:progress +'%'}}
        >
            
        </motion.div>
    )
}
export default ProgressBar;
