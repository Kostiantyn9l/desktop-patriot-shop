import { useContext } from "react";
import { Context } from "../../app/main";

export const useStore = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("Context is not provided");
    }
    return context;
}