import DeleteModal from "@/components/DeleteModal";
import Header from "@/components/Header";
import MainSearchPage from "@/components/MainSearchPage";
import SearchContent from "@/components/SearchContent";
import SearchInput from "@/components/SearchInput";
import UpdateModal from "@/components/UpdateModal";
import { getTracksByTitle } from "@/db";

interface SearchProps {
    searchParams: {
        title: string;
    }
}
const SearchPage = async ({ searchParams }: SearchProps) => {

    const tracks = await getTracksByTitle(searchParams.title);
    const update = 0;

    // flex min-h-screen flex-col items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-500 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]
    return (
        <MainSearchPage tracks={tracks} />


    )


}

export default SearchPage;