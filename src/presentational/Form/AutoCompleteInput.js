import React from "react";

import { Grid, Paper, List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import PrimaryInput from './PrimaryInput';


const autoCompleteInput = (props) => {

  const { getInputProps, suggestions, getSuggestionItemProps, loading  } = props

  return (

    <Grid container
          justify='center'>

      {/* Input */}
      <Grid item xs={10}>
        <PrimaryInput icon={<Search />} 
                      title="Procure o Local"
                      emmiter={getInputProps} />
      </Grid>

      {/* Suggestions List */}
      { suggestions.length !== 0 &&
        <Grid item xs={10}>
          <Paper> 
            {loading && <CircularProgress color="secondary" />}

            <List>
              {suggestions.map(suggestion => (
                <ListItem button
                          {...getSuggestionItemProps(suggestion)}>
                  <ListItemText primary={suggestion.description} />
                </ListItem>                        
              ))}                  
            </List>
          </Paper>
        </Grid>
      }

    </Grid>
  )
};

export default autoCompleteInput;
