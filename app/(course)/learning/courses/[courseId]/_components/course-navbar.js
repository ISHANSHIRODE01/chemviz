import { Chapter, Course, UserProgress, Profile } from "@prisma/client"

import { NavbarRoutes } from "components/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";
import { SafeProfile } from "types";

export const CourseNavbar = ({
  course,
  progressCount,
  currentProfile
}) => {

  return (

      <div className="p-4 border-b h-full flex items-center  shadow-sm">
        <CourseMobileSidebar
          course={course}
          progressCount={progressCount}
        />
        <NavbarRoutes currentProfile={currentProfile} />      
      </div>

  )
}