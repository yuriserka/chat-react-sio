import { User } from "../models/user";
import { AppDispatch } from "../store";
import { getAvailableRooms } from "../store/chat.slice";

export function redirectUserAfterLogin(
  user: User | null,
  replace: Function,
  dispatch: AppDispatch
) {
  if (user) {
    replace("/app");
    dispatch(getAvailableRooms(user.token));
  } else {
    replace("/");
  }
}
