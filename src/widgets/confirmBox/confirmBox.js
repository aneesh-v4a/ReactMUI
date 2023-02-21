import './confirmBox.css';
export function ConfirmBox(props) {
    
    return (
        <div className='confirm-bg' onClick={e => props.backDropCancel?props.confirmHandler(false):null}>
            <div className="confirm-container">
                <div className="confirm-bar"></div>
                <div className="confirm-message">
                    <p>{props.message}</p>
                </div>
                <div className="confirm-actions">
                    <button autoFocus={true} onClick={(e)=>{e.stopPropagation();props.confirmHandler(false)}}>Cancel</button>
                    <button onClick={(e)=>{e.stopPropagation();props.confirmHandler(true)}}>Ok</button>
                </div>
            </div>
        </div>
    )
}