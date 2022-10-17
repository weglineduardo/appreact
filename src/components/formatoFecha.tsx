import Moment from "moment";
export const formatearFecha = (start: string) => {
  return Moment(start).format("yyyy-MM-d hh:mm:ss");
};
