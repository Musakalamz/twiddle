import GroupCard from "@/components/cards/GroupCard";
import UserCard from "@/components/cards/UserCard";
import Pagination from "@/components/shared/Pagination";
import SearchBar from "@/components/shared/SearchBar";
import { fetchGroups } from "@/lib/actions/group.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async ({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }) => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const sp = await searchParams;
    const result = await fetchUsers({
        userId: user.id,
        searchString: sp.q,
        pageNumber: sp?.page ? +sp.page : 1,
        pageSize: 25,
      });
    
      const groupsResult = await fetchGroups({
        searchString: sp.q,
        pageNumber: sp?.page ? +sp.page : 1,
        pageSize: 25
    })

    return (
        <>
        <section>
      <h1 className='head-text mb-10'>Search</h1>

      <SearchBar routeType='search' />

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          <p className='text-light-1'>No User Results</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
              />
            ))}
          </>
        )}
      </div>

      <div className='mt-14 flex flex-col gap-9'>
        {groupsResult.groups.length === 0 ? (
          <p className='text-light-1'>No Group Results</p>
        ) : (
          <>
            {groupsResult.groups.map((group) => (
              <GroupCard
              key= {group.id}
              id={group.id}
              name={group.name}
              username={group.username}
              imgUrl={group.image}
              members={group.members}
          />
            ))}
          </>
        )}
      </div>

      <Pagination
        path='search'
        pageNumber={sp?.page ? +sp.page : 1}
        isNext={result.isNext}
      />
    </section>
        </>
    )

  }

export default Page
