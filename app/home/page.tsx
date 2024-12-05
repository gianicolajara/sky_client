"use client";

import CreatePostFloat from "@/components/home/Modals/CreatePostFloat";
import PostsHome from "@/components/home/Posts";
import Profile from "@/components/home/Profile";
import SearchHome from "@/components/home/Search";
import AuthContextProvider from "@/contexts/Auth";

const Home = () => {
  return (
    <AuthContextProvider>
      <section className="w-full h-screen">
        <div className="h-full max-w-[1200px] mx-auto px-2 py-4">
          <div className="w-full h-full grid grid-cols-1 grid-rows-[auto,_1fr] lg:grid-cols-[300px,_2fr,_1fr] lg:grid-rows-1 lg:gap-x-4 gap-y-4 lg:gap-y-0">
            <Profile />
            <PostsHome />
            <div className="hidden lg:block">
              <SearchHome />
            </div>
            <CreatePostFloat />
          </div>
        </div>
      </section>
    </AuthContextProvider>
  );
};

export default Home;
