import { fetchUsers } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import UserCard from "../cards/UserCard"
import { fetchGroups } from "@/lib/actions/group.actions"
import GroupCard from "../cards/GroupCard"

const RightSideBar = async () => {
    const user = await currentUser()
    if(!user) return null

    const similarMinds = await fetchUsers({
        userId: user.id,
        pageSize: 4
    })

    const suggestedGroups = await fetchGroups( { pageSize: 4 } )


    return (
        <>
            <section className="custom-scrollbar rightsidebar">
                <div className="flex flex-1 flex-col justify-start">
                    <h3 className="text-light-1 text-[20px] leading-[140%] font-medium">
                        Suggestions
                    </h3>
                </div>
                <div className="flex flex-col flex-1 justify-start">
                    <h3 className="text-light-1 text-[20px] leading-[140%] font-medium">
                        Groups
                    </h3>
                    <div className="mt-7 flex w-[350px] flex-col gap-10">
                        {
                            suggestedGroups.groups.length > 0 ? (
                                <>
                                    { suggestedGroups.groups.map( ( group ) => 
                                        <GroupCard
                                            key = { group.id }
                                            id = { group.id }
                                            name = { group.name }
                                            username = { group.username }
                                            imgUrl = { group.image }
                                            members={ group.members }
                                        />
                                    ) }
                                </>
                            ) : (
                                <>
                                    <p className="text-light-3 text-[16px] leading-[140%] font-normal">
                                        No Groups yet
                                    </p>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className="flex flex-col flex-1 justify-start">
                    <h3 className="text-light-1 text-[20px] leading-[140%] font-medium">
                        Users
                    </h3>
                    <div className="mt-7 flex w-[350px] flex-col gap-10">
                        {
                            similarMinds.users.length > 0 ? (
                                <>
                                    { similarMinds.users.map( ( person ) => 
                                        <UserCard
                                            key = { person.id }
                                            id = { person.id }
                                            name = { person.name }
                                            username = { person.username }
                                            imgUrl = { person.image }
                                        />
                                    ) }
                                </>
                            ) : (
                                <>
                                    <p className="text-light-3 text-[16px] leading-[140%] font-normal">
                                        No users yet
                                    </p>
                                </>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default RightSideBar
