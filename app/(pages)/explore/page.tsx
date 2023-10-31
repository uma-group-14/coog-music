import Header from "@/components/Header";
import SearchContent from "@/components/SearchContent";
import UserSearchInput from "@/components/UserSearchInput";
import { getUserByName } from "@/db";

interface SearchProps {
    searchParams: {
        name: string;
    }
}
const ExplorePage = async ({ searchParams }: SearchProps) => {

    //fix this!!! - NOT WORKING
    const users = await getUserByName(searchParams.name);

    console.log(users);


    return (
        <>
            <div className="p-5 bg-neutral-900/80 flex min-h-screen flex-col items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-500 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <div className="pb-10">
                    <Header title="Explore" description="Find your favorite artists and fellow listeners here"></Header>

                </div>
                <div className="z-50 w-full">
                    <div className="mb-5">
                        <UserSearchInput />

                    </div>




                </div>

            </div>
        </>


    )


}

export default ExplorePage;