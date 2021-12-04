import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/system";
import { Checkbox, DialogActions, DialogContent, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";

const toppings = Array.from({ length: 9 }).map((_, i) => `Pizza Topping #${i + 1}`);
const sizes = Array.from({ length: 3 }).map((_, i) => `Pizza Size #${i + 1}`);

export interface CustomizeDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

function CustomizeDialog(props: CustomizeDialogProps) {
    // const { onClose, selectedValue, open } = props;
    const { open } = props;

    const handleClose = () => {
        // TODO
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth="lg">
            <DialogContent>
                <Box>
                    <FormControl>
                        <FormGroup>
                            <List sx={{ columnCount: [2, 2, 3] }}>
                                {toppings.map((topping) => (
                                    <ListItem disablePadding key={topping}>
                                        <FormControlLabel control={<Checkbox checked={false} onChange={handleChange} name={topping} />} label={topping} />
                                    </ListItem>
                                ))}
                            </List>
                        </FormGroup>
                    </FormControl>
                </Box>

                <Box>
                    <FormControl>
                        <RadioGroup aria-label="size" defaultValue={sizes[0]} name="size">
                            {sizes.map((size) => (
                                <FormControlLabel control={<Radio />} label={size} key={size} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            </DialogContent>

            <DialogActions>
                <Box display="flex" flexGrow="1" justifyContent="space-evenly">
                    <Button variant="contained" onClick={handleClose} fullWidth sx={{ m: 2 }}>
                        Add to Basket
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose} fullWidth sx={{ m: 2 }}>
                        Cancel
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export function CustomizeModal() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(toppings[1]);

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
        // TODO
    };

    return (
        <div>
            <CustomizeDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </div>
    );
}
