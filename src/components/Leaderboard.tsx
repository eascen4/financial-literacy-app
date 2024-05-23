import Image from "next/image";

interface User {
  id: string;
  image: string | null;
  name: string | null;
  points: number;
}

interface LeaderboardProps {
    data: User[];
}

const Leaderboard = ({ data }:  LeaderboardProps ) => {
  return (
    <div className="bg-indigo-900/60 text-white rounded-lg shadow-lg p-6 mx-auto my-10 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>
      <div className="space-y-4">
        {data.map((user, index) => (
          <div
            key={user.id}
            className="bg-indigo-800/40 p-4 rounded-lg flex items-center justify-between space-x-4 shadow-md"
          >
            <div className="flex items-center space-x-4">
              <Image
                className="w-16 h-16 rounded-full border-4 border-yellow-500"
                width={64}
                height={64}
                src={user.image || "/default_pfp.svg"}
                alt={`${user.name}'s profile`}
              />
              <div>
                <h2 className="text-xl font-bold">
                  {user.name || "Default User"}
                </h2>
                <p className="text-gray-400">Points: {user.points}</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-yellow-500">
              #{index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Leaderboard;
