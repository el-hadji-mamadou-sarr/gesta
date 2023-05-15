import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import {CardComponent} from "../card/CardComponent";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";

export const  GridComponent =()=> {

    const [lists, setLists] = useState([
        { id: 1, title: 'To Do', cards: [] },
        { id: 2, title: 'In Progress', cards: [] },
        { id: 3, title: 'Done', cards: [] },
    ]);

    const handleAddCard = (listId, cardTitle) => {
        const newLists = lists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    cards: [...list.cards, { id: Date.now(), title: cardTitle }],
                };
            }
            return list;
        });
        setLists(newLists);
    };

    return (
        <div>
            <Grid container spacing={3}>
                {lists.map(list => (
                    <Grid key={list.id} item xs={12} sm={4}>
                        <Paper>
                            <Typography variant="h6" gutterBottom>
                                {list.title}
                            </Typography>
                            {list.cards.map(card => (
                                <Card key={card.id} title={card.title} />
                            ))}
                            <AddCardForm listId={list.id} onAddCard={handleAddCard} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

const Card = ({ title }) => {
    return (
        <Paper>
            <Typography variant="body1">{title}</Typography>
        </Paper>
    );
};

const AddCardForm = ({ listId, onAddCard }) => {
    const [cardTitle, setCardTitle] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onAddCard(listId, cardTitle);
        setCardTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={cardTitle}
                onChange={e => setCardTitle(e.target.value)}
            />
            <button type="submit">Add Card</button>
        </form>
    );
}