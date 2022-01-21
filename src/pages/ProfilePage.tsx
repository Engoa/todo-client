import React, { FC, useEffect } from "react";
import ProfileData from "../components/ProfileData/ProfileData";
import { useTitle } from "../hooks/useTitle";

const ProfilePage: FC = (): JSX.Element => {
  useTitle("Do It - Profile");

  return (
    <div className="profile">
      <ProfileData />
    </div>
  );
};

export default ProfilePage;
