import { useEffect } from "react";
import "./toast.css";
export function Toast(props) {
    
  const containerClass = `toast-container ${props.type}`;

  useEffect(() => {
    if (props.ttl > "0") {
      setTimeout(props.disableHandler, props.ttl);
    }
  });

  const toastTemplate =
    props.ttl && props.ttl > 0 ? (
      <div className={containerClass} onClick={props.disableHandler}>
        <div className="toast-msg">
          <p>{props.message}</p>
        </div>
      </div>
    ) : null;

  return <div>{toastTemplate}</div>;
}
