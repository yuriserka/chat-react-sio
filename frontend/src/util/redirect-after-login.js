import { getAvailableRooms } from "../store/chat.slice";

export function redirectUserAfterLogin(user, replace, dispatch) {
  if (user) {
    replace("/app");
    dispatch(getAvailableRooms(user.token));
  } else {
    replace("/");
  }
}
