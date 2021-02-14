import React, { useState } from 'react';
import useFirestore from '../components/useFirestore';
import {motion} from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { projectfirestore, projectStorage } from '../firebase';
//import { useHistory } from 'react-router-dom';
const ImageGrid = () => {
    const {currentUser} = useAuth();
    const [zoomimg, setZoomimg] = useState("");
    const [uploadeddate,setuploadeddate] = useState("");
    const [docid, setdocid] = useState("");
    const [color, setColor] = useState("");
    const colors=["yellow","blue","green","orange"];
    function setcolor() {
      let randomnum= Math.floor(Math.random()*4);
      setColor(colors[randomnum]);
    }
    let collection="images";
    if(currentUser!=null)
    {
        collection = currentUser.uid; 
    }
    let {docs} = useFirestore(collection);
    console.log(docs);
    async function deletefile(thisone,thisid)
    {
      let combined=collection+"/"+thisone;
      try 
      {
      await projectfirestore.collection(collection).doc(thisid).delete().then(async function() {
        //alert(combined);
      await projectStorage.ref().child(combined).delete();
    });
      }
      catch(error)
      {
        alert(error);
      }
      window.location.reload();
    }
    return (
        <>
        <div className="row img-wrap-parent">
         { 
         docs && docs.map(doc => (  
           <>  
           <>
           {doc.type === "image/jpeg" || doc.type === "image/png" ?
           <motion.div className="col-lg-3 col-xs-6 col-md-4 col-sm-6 img-wrap" key={doc.id} 
           layout whileHover={{opacity:1}} onClick={() => 
           {
            document.getElementById("modal01").style.display = "block";
            setcolor();
           }} >
           <motion.img src={doc.url} onClick={() => {
                setZoomimg(doc.url);
                setuploadeddate(doc.uploadeddate);
                setdocid(doc.id);
              }
           } className="images" alt="uploaded pic"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1}}
            
           >

           </motion.img>
           <div className="title-name">
          <h4>{doc.title}</h4> 
           </div>
           </motion.div> :
           <motion.div className="col-lg-3 col-xs-6 col-md-4 col-sm-6 img-wrap" key={doc.id} 
           layout whileHover={{opacity:1}} onClick={() => 
           {
            document.getElementById("modal02").style.display = "block";
            setcolor();
           }} >
             <motion.video controls onClick={() => {
                setuploadeddate(doc.uploadeddate);
                setdocid(doc.id);
              }
           } className="images" alt="uploaded pic"
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
             <>
             {document.getElementsByClassName("img-wrap-parent").innerHTML = ""}
             </>
               </>   
    ))}
        </div>
        <div id="modal01" class="w3-modal" style={{backgroundColor:color}}>
    <span class="w3-button w3-black w3-xlarge w3-display-topright" onClick={() => 
             {
              document.getElementById("modal01").style.display = "none"
             }}>×</span>
    <div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
      <img class="w3-image" src={zoomimg} alt=""></img>
      <br></br><br></br><center><button className="w3-button w3-border-0 w3-white" onClick={() => deletefile(uploadeddate,docid)}>Delete current image</button></center>
    </div>
    
    </div>
    <div id="modal02" class="w3-modal" style={{backgroundColor:color}}>
    <span class="w3-button w3-black w3-xlarge w3-display-topright" onClick={() => 
             {
              document.getElementById("modal02").style.display = "none"
             }}>×</span>
    <div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
      
      <br></br><br></br><center><button className="w3-button w3-border-0 w3-white" onClick={() => deletefile(uploadeddate,docid)}>Delete current video</button></center>
    </div>
    
    </div>
        </>
    )
}
export default ImageGrid;