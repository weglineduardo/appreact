import { IGlpilogin } from "../../interfaces/gLpi/login";
import { iUsuario } from "../../interfaces/usuario";

//#region Login
export const persistUsuarioState = (usuario: {}) => {
  window.localStorage.setItem("usuario", JSON.stringify({ ...usuario }));
};
export const clearUsuario = () => {
  window.localStorage.removeItem("usuario");
};

export const managenUsuarioState = (usuario: {}) => {
  persistUsuarioState(usuario);
};

//#endregion
