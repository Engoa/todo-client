import React, { FC } from "react";
import "./UserErrors.scss";

interface IUserErrors {
  userErrors: Array<string>;
}
const UserErrors: FC<IUserErrors> = ({ userErrors }): JSX.Element => {
  return (
    <>
      {userErrors.length ? (
        <ul className="user__errors">
          {userErrors.map((err: string, index: number) => (
            <li key={index} className="user__error">
              {err}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default UserErrors;
