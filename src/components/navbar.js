import Accordel from "../widgets/accordel/accordel";

export default function NavBar(props){
    const navList = [];
    for (const [i,label] of props.labels.entries()) {
        navList.push(<div key={i}><Accordel {...label}></Accordel></div>)
    }
    return navList
}