import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useFirestore from '../components/useFirestore';
import {motion} from 'framer-motion';
import Title from './title'
import UploadForm from './uploadForm';
export default function AccountPage(props) {
    const accountid = props.match.params.id;
    const {currentUser} = useAuth();
    const [zoomimg, setZoomimg] = useState("");
    const collection = accountid; 
    const {docs} = useFirestore(collection);
    const [color, setColor] = useState("");
    const colors=["yellow","blue","green","orange"];
    function setcolor() {
      let randomnum= Math.floor(Math.random()*4);
      setColor(colors[randomnum]);
    }
        return (
        <div>
            <Title></Title>
            <br></br>
            <br></br>
            <div className="content-part">
            {currentUser && currentUser.uid === accountid && <UploadForm/>}
            </div>
            <div className="row">
         { docs && docs.map(doc => (    
               <> 
               {doc.type === "image/jpeg" || doc.type === "image/png" ?
             <motion.div className="col-lg-3 col-xs-6 col-md-3 col-sm-4 img-wrap" key={doc.id} 
             layout whileHover={{opacity:1}} onClick={() => 
             {
              document.getElementById("modal01").style.display = "block";
              setcolor();
              
             }}>
             <motion.img src={doc.url} onClick={() => setZoomimg(doc.url)} className="images" alt="uploaded pic"
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{delay:1}}
              
             >

             </motion.img>
             <div className="title-name">
          <h4>{doc.title}</h4> 
           </div>
             </motion.div> :
             <motion.div className="col-lg-3 col-xs-6 col-md-3 col-sm-4 img-wrap" key={doc.id} 
             layout whileHover={{opacity:1}}>
               <motion.video controls  className="images" alt="uploaded pic"
             initial={{opacity:0}}
             animate={{opacity:1}}
             transition={{delay:1}}>
                  <motion.source type="video/mp4" src={doc.url}></motion.source>
               </motion.video>
               <div className="title-name">
          <h4>{doc.title}</h4> 
           </div>
             </motion.div>
                }
             </>
    ))}
        </div>
        <div id="modal01" class="w3-modal" style={{backgroundColor:color}}>
               <span class="w3-button w3-black w3-xlarge w3-display-topright" onClick={() => 
             {
              document.getElementById("modal01").style.display = "none"
             }}>×</span>
          <div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
            <img class="w3-image" src={zoomimg}></img>
            
      
          </div>
        </div>
       
        </div>
    )
}
