import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { login } from "../../store/auth.slice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, onFormChange] = useForm({
    username: "",
    nickname: "",
    password: "",
  });

  const [error, setError] = useState(null);

  function onSubmit(event) {
    event.preventDefault();
    const { username, nickname, password } = form;

    if (!username || !nickname || !password) {
      setError("All Fields are required");
      return;
    }

    dispatch(login(form))
      .then(unwrapResult)
      .then((user) => {
        user && history.replace("/app");
      });
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="m-auto space-y-5">
        <h1 className="text-2xl font-semibold text-center">Enter your data</h1>
        <form className="space-y-3" autoComplete="off" onSubmit={onSubmit}>
          <div>
            <legend className="font-bold ml-1 text-indigo-500">
              Username:
            </legend>
            <input
              className="rounded-lg"
              type="text"
              value={form?.username}
              placeholder="Enter your username"
              name="username"
              onChange={onFormChange}
            />
          </div>
          <div>
            <legend className="font-bold ml-1 text-indigo-500">
              Nickname:
            </legend>
            <input
              className="rounded-lg"
              type="text"
              value={form?.nickname}
              placeholder="Enter your nickname"
              name="nickname"
              onChange={onFormChange}
            />
          </div>
          <div>
            <legend className="font-bold ml-1 text-indigo-500">
              Password:
            </legend>
            <input
              className="rounded-lg"
              type="password"
              value={form?.password}
              placeholder="Enter your password"
              name="password"
              onChange={onFormChange}
            />
          </div>
          {error && <p>{error}</p>}
          <button
            className="rounded-lg bg-green-400 w-full p-2"
            type="submit"
            children={"Sign in"}
          />
        </form>
      </div>
    </div>
  );
}
