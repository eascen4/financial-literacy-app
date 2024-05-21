import { User } from "next-auth";
import Image from "next/image";
import SignOutButton from "./SignOutButton";

const ProfileCard = ({ user }: { user: User }) => {
  const { id, name, email, image, isAdmin, points } = user;
  return (
    <div className="bg-indigo-800/40 text-white rounded-lg shadow-lg p-4 sm:p-6 max-w-xs sm:max-w-sm mx-auto my-10">
      <div className="flex flex-col items-center space-y-4">
        
        <Image
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-500"
          width={128}
          height={128}
          src={image || "/default_pfp.svg"}
          alt={`${name}'s profile`}
        />
        <h2 className="mt-2 sm:mt-4 text-xl sm:text-2xl font-bold">{name || "Default User"}</h2>
        <p className="text-gray-400 text-sm sm:text-base">@{email}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span
            className={`px-3 sm:px-4 py-1 rounded-full ${
                isAdmin ? "bg-yellow-500" : "bg-green-500"
              } text-black text-sm sm:text-base`}
          >
            {isAdmin ? "Admin" : "User"}
          </span>
          <span className="bg-blue-500 text-black px-3 sm:px-4 py-1 rounded-full text-sm sm:text-base">
            Points: {points}
          </span>
        </div>
        <p className="mt-2 text-gray-400 text-sm sm:text-base">ID: {id}</p>
        <SignOutButton />
      </div>
    </div>
  );
};
export default ProfileCard;
