import React, {useContext} from 'react';
import { List, ListItemButton,ListItemText} from "@mui/material";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const CountryPanel = observer(() => {
    const {serial} = useContext(Context)
    const [selectedIndex, setSelectedIndex] = React.useState();

    const handleListItemClick = (event, index, country) => {
        serial.setSelectedCountry(country);
        setSelectedIndex(index);
      };

    return (
        <List component="nav" aria-label="main mailbox folders">
            {serial.countries.map((country) => 
                <ListItemButton
                key={country.country_id}
                selected={selectedIndex === country.country_id}
                onClick={(event) => handleListItemClick(event, country.country_id, country)}
              >
                <ListItemText key={country.country_id} secondary={country.country_name} />
              </ListItemButton>
            )}
        </List>
    );
});

export default CountryPanel;