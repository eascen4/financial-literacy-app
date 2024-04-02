import React from "react";

export default function LeaderboardPage() {
  const data = [
    { username: "user1", time: 123 },
    { username: "user2", time: 456 },
    { username: "user3", time: 789 },
    { username: "user4", time: 321 },
    { username: "user5", time: 654 },
    { username: "user6", time: 987 },
    { username: "user7", time: 159 },
    { username: "user8", time: 753 },
    { username: "user9", time: 852 },
    { username: "user10", time: 147 },
    { username: "user11", time: 369 },
    { username: "user12", time: 258 },
    { username: "user13", time: 741 },
    { username: "user14", time: 963 },
    { username: "user15", time: 654 },
  ];
  return (
    <>
      <section className="p-2 text-2xl">
        <h1>Leaderboard</h1>
      </section>
      <section className="flex flex-col justify-center p-2 ">
        <h2 className="text-xl">Top 15</h2>
        <div className=" space-y-1">
          <div className="flex justify-between p-2 rounded underline bg-slate-300">
            <div>Name</div>
            <div>Time (ms)</div>
          </div>
          {data
            .sort((a, b) => {
              return a.time - b.time;
            })
            .map((user, index) => (
              <div
                key={index}
                className="flex justify-between p-2 rounded bg-slate-300"
              >
                <div>{user.username}</div>
                <div>{user.time}</div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
