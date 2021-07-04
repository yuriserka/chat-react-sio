import { User } from "@models/user";
import { getAvailableRooms } from "@store/chat.slice";
import { AppDispatch } from "@store/index";

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
