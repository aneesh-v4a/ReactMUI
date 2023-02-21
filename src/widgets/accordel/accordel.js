import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './accordel.css';

export default function Accordel(props){

    const subCalls = (path) => {
        navigate(path);
      }

    const [isClicked, setIsClicked] = useState(true);

    const navigate = useNavigate();
    
    const handleTitleAction = (e, callback) => {
        e.preventDefault();
        setIsClicked(!isClicked);
        if (callback) {
            callback();
        }
    }

    const handleSubAction = (e, menu) => {
        e.preventDefault();
        subCalls(menu.path);
    }

    const subItems = []
    for (const [i, item] of props.sub.entries()) {
        subItems.push(
            <div key={i} className="sub-item" onClick={(e) => handleSubAction(e, item)}>{item.title}</div>
        )
    }
    const item = <div className="main-item">
        <h6 className={!isClicked? 'main-label-closed' : 'main-label-expanded'} onClick={(e) => handleTitleAction(e, props.mainCallback)}>{props.title}</h6>
        { isClicked ? subItems:null }
    </div>

    return item
}