import React from 'react';
import s1 from '../Assets/s1.png';
import s2 from '../Assets/s2.png';
import s3 from '../Assets/s3.png';
import s4 from '../Assets/s4.png';
import "./CSS/AboutUs.css"
const Service = () => {
     return(
   < section className="departament_section layout_padding">
   <div className="departament_container">
     <div className="container ">
       <div className="heading_container heading_center">
         <h3>
           Our Services
         </h3>
         <p>
         We provide the special tips and advice’s of heath care treatment.
         </p>
       </div>
       <div className="row">
         <div className="col-md-3">
           <div className="box ">
             <div className="img-box">
               <img src={s1}/>
             </div>
             <div className="detail-box">
               <h5>
                 Cardiology
               </h5>
             </div>
           </div>
         </div>
         <div className="col-md-3">
           <div className="box ">
             <div className="img-box">
               <img src={s2}/>
             </div>
             <div className="detail-box">
               <h5>
                 Diagnosis
               </h5>
             </div>
           </div>
         </div>
         <div className="col-md-3">
           <div className="box ">
             <div className="img-box">
               <img src={s3} />
             </div>
             <div className="detail-box">
               <h5>
                 Surgery
               </h5>
             </div>
           </div>
         </div>
         <div className="col-md-3">
           <div className="box ">
             <div className="img-box">
               <img src={s4}/>
             </div>
             <div className="detail-box">
               <h5>
                 First Aid
               </h5>
             </div>
           </div>
         </div>
       </div>
       <div class="btn-box">
         <a href="">
           View All
         </a>
       </div>
     </div>
   </div>
 </section>

 )
};
export default Service;