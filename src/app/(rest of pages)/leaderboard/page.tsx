import Leaderboard from "@/components/Leaderboard"
import { cachedLeaderboard } from "@/lib/server/caches"

const LeaderboardPage = async () => {
    const data  = await cachedLeaderboard()

  return (
    <section className="h-full w-full">
        <Leaderboard data={data} />
    </section>
  )
}
export default LeaderboardPage