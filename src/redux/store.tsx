import { iUsuario } from "../interfaces/usuario";
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { iCase } from "../interfaces/case";
import { iComment } from "../interfaces/comment";
import { userSlice } from "./states/usuarioActivo.state";

export interface AppStore {
  usuarioActivo: iUsuario;
  //caseActivo: iUsuario;
  //coment: iComment;
}

export default configureStore<AppStore>({
  reducer: {
    usuarioActivo: userSlice.reducer,
    //caseActivo: caseSlice.reducer,
  },
});
