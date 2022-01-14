import React, { FC } from "react";
import ProfileData from "../components/ProfileData/ProfileData";

const ProfilePage: FC = (): JSX.Element => {
  return (
    <div className="profile">
      <ProfileData />
    </div>
  );
};

export default ProfilePage;
