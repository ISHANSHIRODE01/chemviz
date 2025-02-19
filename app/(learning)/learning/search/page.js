import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "lib/db";
import { SearchInput } from "components/search-input";
import { getCourses } from "actions/get-courses";
import { CoursesList } from "components/courses-list";
import { Categories } from "./_components/categories";

const SearchPage = async ({ searchParams }) => {
  // Destructure searchParams and await its resolution
  const { userId } = await auth();

  if (!userId) {
    return redirect("/learning");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // Ensure searchParams is awaited before using it in getCourses
  const courses = await getCourses({
    userId,
    ...searchParams,  // Now it's safe to spread searchParams
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
