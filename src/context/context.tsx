import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { IUniversity } from "../interfaces/University";

interface ContextType {
  favourites: IUniversity[];
  setFavourites: Dispatch<SetStateAction<IUniversity[]>>;
}

export const Context = createContext<ContextType>({
  favourites: [],
  setFavourites: () => {},
});
