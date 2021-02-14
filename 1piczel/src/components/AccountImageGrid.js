import React, { useState } from 'react';
import useFirestore from '../components/useFirestore';
import {motion} from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'; 
const AccountImageGrid = ({accountCollectioId}) => {
    const [zoomimg, setZoomimg] = useState("");
    const collection = accountCollectionId; 
    const {docs} = useFirestore(collection);
    
/*function display(element) {
    setZoomimg(element.src);
    document.getElementById("modal01").style.display = "block";
  }
  function nodisplay() {
    document.getElementById("modal01").style.display = "none";
  }*/
    return (
        <>
        <div className="row">
         { docs && docs.map(doc => (    
                
             <motion.div className="col-lg-3 col-xs-6 col-md-3 col-sm-4 img-wrap" key={doc.id} 
             layout whileHover={{opacity:1}} onClick={() => 
             {
              document.getElementById("modal01").style.display = "block"
             }}>
             <motion.img src={doc.url} onClick={() => setZoomimg(doc.url)} className="images" alt="uploaded pic"
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{delay:1}}
              
             >

             </motion.img>
             </motion.div>
             
    ))}
        </div>
        <div id="modal01" class="w3-modal w3-black" >
    <span class="w3-button w3-black w3-xlarge w3-display-topright" onClick={() => 
             {
              document.getElementById("modal01").style.display = "none"
             }}>×</span>
    <div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
      <img class="w3-image" src={zoomimg}></img>
    </div>
    </div>
        </>
    )
}
export default AccountImageGrid;