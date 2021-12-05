import * as React from "react";
import { useOrderContext } from "../../context/order";
import { useSnackbar } from "notistack";
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

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose(null);
    };

    // Validates toppings before submit. To see API error messages, comment out below lines leaving only `onClose(order)`
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (order.toppings.length > 0) {
            onClose(order);
        } else {
            enqueueSnackbar("Must choose at least one topping", { variant: "error" });
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
                                <List sx={{ columnCount: [1, 2, 3] }}>
                                    {toppings.map((topping) => {
                                        const checked = order.toppings.indexOf(topping) !== -1;
                                        return (
                                            <ListItem disablePadding key={topping} sx={{ breakInside: "avoid" }}>
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

export function CustomizeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [state, dispatch] = useOrderContext();
    const { enqueueSnackbar } = useSnackbar();

    const { editing } = state;

    const handleClose = (order: OrderState | null) => {
        if (order) {
            // @ts-ignore -- will always call handleClose with editing not null
            dispatch({ type: "create", payload: { quantity: 1, ...editing, ...order }, toast: "create" });
            enqueueSnackbar("Added an item to Basket", { variant: "success" });
        } else {
            dispatch({ type: "edit", payload: null });
        }
        onClose();
    };

    return <CustomizeDialog key={editing ? editing.id : "none"} open={open} onClose={handleClose} />;
}
