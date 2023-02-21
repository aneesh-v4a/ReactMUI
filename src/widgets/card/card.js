import { useEffect, useRef } from "react";
// import { getProfile } from "../../services/ContactService";
import "./card.css";
export default function Card(props) {
  const handleClick = (e) => {
    if (props.onClick) {
      props.onClick(props.id);
    }
  };

  useEffect(() => {
    if (typeof props.imageService === 'function') {
      props.imageService(props._id).then((resp) => {
      imgRef.current.style.backgroundImage = `url(${resp.data.file})`;
    });
    }
  });

  const imgRef = useRef(null);

  return (
    <div className={`card-${props.size}`} onClick={handleClick}>
      <div className="img-hold" ref={imgRef}></div>
      <h4>{props.name}</h4>
      <h6>{props.phone}</h6>
      <h6>{props.email}</h6>
    </div>
  );
}
