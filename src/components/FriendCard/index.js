import React from "react";
import "./style.css";

function FriendCard(props) {
  return (
    <div className="card">
      
        <img id={"image-" + props.id} alt={props.name} src={props.image} onClick={props.onClick} />
      
    </div>
  );
}

export default FriendCard;
