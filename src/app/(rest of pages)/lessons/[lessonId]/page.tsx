import ChallengeCard from "@/components/ChallengeCard";
import { cachedLessonById } from "@/lib/server/caches";

const LessonPage = async ({ params }: { params: { lessonId: string } }) => {
  const data = await cachedLessonById(params.lessonId);

  if (!data) return <div>Not Found</div>;

  const { title, description, challenges } = data;

  return (
    <section className="py-10 px-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-slate-50 mb-6">Lorem ipsum dolor sit amet consectetur adipiscing elit id, erat consequat gravida ultrices mauris porttitor mi taciti, ornare nunc sed nostra convallis facilisi suspendisse. Senectus himenaeos porttitor tempus netus convallis rutrum primis massa mauris per, magna molestie sodales condimentum porta nec ultrices ante pulvinar, venenatis nullam curae cras commodo donec volutpat maecenas sapien. Libero non himenaeos maecenas accumsan ut justo arcu nam, interdum tincidunt ultrices dictumst platea placerat conubia lobortis integer, volutpat potenti posuere urna in tempor ligula.

Rhoncus cubilia inceptos scelerisque platea montes tincidunt cursus risus, molestie dictum ac urna vulputate aenean. Eget libero purus erat ultricies aenean vivamus magnis commodo pellentesque, faucibus fames laoreet varius quam lectus integer et justo malesuada, donec molestie diam tempus massa sapien ultrices euismod. Venenatis vulputate ultricies semper interdum tristique suspendisse rhoncus nunc auctor, metus pellentesque massa ornare sem aliquam conubia hac, vitae primis pretium mi phasellus platea himenaeos maecenas.</h2>
      <p className="text-lg text-slate-300 mb-6">Lorem ipsum dolor sit amet consectetur adipiscing elit id, erat consequat gravida ultrices mauris porttitor mi taciti, ornare nunc sed nostra convallis facilisi suspendisse. Senectus himenaeos porttitor tempus netus convallis rutrum primis massa mauris per, magna molestie sodales condimentum porta nec ultrices ante pulvinar, venenatis nullam curae cras commodo donec volutpat maecenas sapien. Libero non himenaeos maecenas accumsan ut justo arcu nam, interdum tincidunt ultrices dictumst platea placerat conubia lobortis integer, volutpat potenti posuere urna in tempor ligula.

Rhoncus cubilia inceptos scelerisque platea montes tincidunt cursus risus, molestie dictum ac urna vulputate aenean. Eget libero purus erat ultricies aenean vivamus magnis commodo pellentesque, faucibus fames laoreet varius quam lectus integer et justo malesuada, donec molestie diam tempus massa sapien ultrices euismod. Venenatis vulputate ultricies semper interdum tristique suspendisse rhoncus nunc auctor, metus pellentesque massa ornare sem aliquam conubia hac, vitae primis pretium mi phasellus platea himenaeos maecenas.</p>
      <div className="gap-6 w-full max-w-3xl grid grid-cols-1 lg:grid-cols-2 lg:max-w-full 2xl:grid-cols-3">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </section>
  );
};
export default LessonPage;
