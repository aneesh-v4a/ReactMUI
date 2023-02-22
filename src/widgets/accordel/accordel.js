import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './accordel.css';

export default function Accordel(props){

    const subCalls = (path) => {
        navigate(path);
      }

    const navigate = useNavigate();

    const handleSubAction = (e, menu) => {
        e.preventDefault();
        subCalls(menu.path);
    }

    const subItems = []
    for (const [i, item] of props.sub.entries()) {
        subItems.push(
            <Typography key={i} onClick={(e) => handleSubAction(e, item)}>
            {item.title}
            </Typography>
        )
    }

    const item = 
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore/>}>
                <Typography>{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            { subItems }
            </AccordionDetails>
        </Accordion>
        

    return item
}