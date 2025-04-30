import Banner from "@/components/Banner";
import NewsSection from "@/components/NewsSection";
import AnnouncementSection from "@/components/AnnouncementsSection";
import ManagerSection from "@/components/ManagerSection";
import EventsSection from "@/components/EventsSection";
import HonorsSection from "@/components/HonorsSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { fetchPosts } from "@/lib/api";

export const metadata = {
  title: "سیمان داراب",
  description: "پورتال اطلاع رسانی سیمان داراب",
};

export const revalidate = 3600; // Revalidate data every hour
enum Sections {
  OCCASIONS = "مناسبت ها",
  ANNOUNCEMENTS = "اطلاعیه ها",
  NEWS = "اخبار ها",
  ACHIEVEMENTS = "افتخارات",
}
export default async function Home() {
  // Fetch posts for each section
  const [newsData, announcementsData, achievementsData, occasionsData] =
    await Promise.all([
      fetchPosts(Sections.NEWS, 1, 4),
      fetchPosts(Sections.ANNOUNCEMENTS, 1, 7),
      fetchPosts(Sections.ACHIEVEMENTS, 1, 5),
      fetchPosts(Sections.OCCASIONS, 1, 5),
    ]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Navbar />

      {/* Page content */}
      <main className="grow">
        {/* Banner Slider */}
        <Banner />

        {/* News Section */}
        <NewsSection posts={newsData.data} />

        {/* Notifications Section */}
        <AnnouncementSection posts={announcementsData.data} />

        {/* Manager Section */}
        <ManagerSection />

        {/* Events Section (using for announcements) */}
        <EventsSection posts={occasionsData.data} />

        {/* Honors Section */}
        <HonorsSection posts={achievementsData.data} />
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}
