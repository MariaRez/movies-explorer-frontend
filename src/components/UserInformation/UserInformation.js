import React from "react";
 import "./UserInformation.css";

 function UserInformation({ image, title }) {
   return (
     <div className="user-information">
       <img className="user-information__image" src={image} alt={title} />
       <h4 className="user-information__title">{title}</h4>
     </div>
   );
 }

 export default UserInformation;