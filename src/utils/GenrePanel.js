import React, {useContext} from 'react';
import { List, ListItemButton,ListItemText} from "@mui/material";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const GenrePanel = observer(() => {
    const {serial} = useContext(Context)
    const [selectedIndex, setSelectedIndex] = React.useState();

    const handleListItemClick = (event, index, genre) => {
        serial.setSelectedGenre(genre);
        setSelectedIndex(index);
      };

    return (
        <List component="nav" aria-label="main mailbox folders">
            {serial.genres.map((genre) =>
                <ListItemButton
                key={genre.genre_id}
                selected={selectedIndex === genre.genre_id}
                onClick={(event) => handleListItemClick(event, genre.genre_id, genre)}
              >
                <ListItemText key={genre.genre_id} secondary={genre.genre_name} />
              </ListItemButton>
            )}
        </List>
    );
});

export default GenrePanel;