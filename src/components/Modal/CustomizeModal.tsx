import * as React from "react";
import { useOrderContext } from "../../context/order";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/system";
import { Checkbox, DialogActions, DialogContent, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";

const toppings = Array.from({ length: 9 }).map((_, i) => `Pizza Topping #${i + 1}`);
const sizes = Array.from({ length: 3 }).map((_, i) => `Pizza Size #${i + 1}`);

interface CustomizeDialogProps {
    open: boolean;
    onClose: (order: OrderState | null) => void;
}

interface OrderState {
    toppings: string[];
    size: string;
}

function CustomizeDialog({ open, onClose }: CustomizeDialogProps) {
    const [order, setOrder] = React.useState<OrderState>({
        toppings: [],
        size: "Pizza Size #1",
    });

    const handleClose = () => {
        // validation before calling onClose
        onClose(null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // validation before calling onClose
        event.preventDefault();
        if (order.toppings.length > 0) {
            onClose(order);
        } else {
            console.log(`error`, "error");
        }
    };

    const updateToppings = (event: React.ChangeEvent<HTMLInputElement>) => {
        const topping = event.target.name;
        const selected = order.toppings.indexOf(topping) !== -1;
        let newToppings = [...order.toppings];
        if (selected) {
            newToppings = newToppings.filter((_) => _ !== topping);
        } else {
            newToppings = Array.from(new Set([topping, ...newToppings]));
        }
        setOrder((prev) => ({ ...prev, toppings: newToppings }));
    };

    const updateSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrder((prev) => ({ ...prev, size: event.target.value }));
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth="lg" role="dialog">
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <Box>
                        <FormControl>
                            <FormGroup>
                                <List sx={{ columnCount: [2, 2, 3] }}>
                                    {toppings.map((topping) => {
                                        const checked = order.toppings.indexOf(topping) !== -1;
                                        return (
                                            <ListItem disablePadding key={topping}>
                                                <FormControlLabel control={<Checkbox checked={checked} onChange={updateToppings} name={topping} />} label={topping} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </FormGroup>
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl>
                            <RadioGroup aria-label="size" defaultValue={sizes[0]} name="size" value={order.size} onChange={updateSize}>
                                {sizes.map((size) => (
                                    <FormControlLabel control={<Radio />} value={size} label={size} key={size} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Box display="flex" flexGrow="1" justifyContent="space-evenly">
                        <Button variant="contained" type="submit" fullWidth sx={{ m: 2 }}>
                            Add to Basket
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleClose} fullWidth sx={{ m: 2 }}>
                            Cancel
                        </Button>
                    </Box>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

export function CustomizeModal() {
    const [state, dispatch] = useOrderContext();

    const { editing } = state;

    // id is set in reducer, name is set in editing, quantity, set in this function, size and topping from order
    const handleClose = (order: OrderState | null) => {
        if (order) {
            // @ts-ignore -- will always call handleClose with editing not null
            dispatch({ type: "create", payload: { quantity: 1, ...editing, ...order } });
        } else {
            dispatch({ type: "edit", payload: null });
        }
    };

    return (
        <div>
            <CustomizeDialog open={!!editing} onClose={handleClose} />
        </div>
    );
}
