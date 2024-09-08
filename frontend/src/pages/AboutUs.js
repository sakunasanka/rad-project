 import React from 'react';
 import bg from '../Images/bg.png'; // Make sure this path is correct.

 const AboutUs = () => {
   return (
     <div className="about-section">
       <div className="about-container">
         <h1>About Us</h1>
         <div className="about-content">
           <div className="about-image">
             <img src={bg} alt="About Horizon Academy" />
           </div>
           <div className="about-text">
             <p>
               Welcome to Horizon Academy, a place where academic excellence
               meets innovative learning. We are dedicated to nurturing the
               minds of our students and equipping them with the skills and
               knowledge they need to succeed in an ever-changing world. At
               Horizon Academy, we believe in a holistic approach to education,
               fostering intellectual curiosity, creativity, and critical
               thinking. Our dedicated team of educators is committed to
               providing a supportive and challenging environment that
               encourages students to reach their full potential.
             </p>
             <p>
               With state-of-the-art facilities and a rich array of
               extracurricular activities, Horizon Academy offers a
               comprehensive educational experience that prepares students for
               future success. Join us on a journey of discovery and growth at
               Horizon Academy, where the future begins.
             </p>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default AboutUs;
