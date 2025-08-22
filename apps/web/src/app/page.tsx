import { PostList } from "@/components/PostList";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="blog-hero rounded-2xl p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-medium font-work-sans mb-4">
          Welcome to Modern Blog
        </h2>
        <p className="text-lg font-light font-crimson opacity-90 max-w-2xl mx-auto">
          Discover insightful stories, thoughtful perspectives, and engaging
          content crafted by our community of writers and thinkers.
        </p>
      </section>

      {/* Latest Posts Section */}
      <section>
        <div className="mb-8">
          <h3 className="text-2xl font-medium font-work-sans text-gray-900 mb-2">
            Latest Stories
          </h3>
          <p className="text-gray-600 font-crimson">
            Fresh perspectives and engaging narratives from our writers
          </p>
        </div>
        <PostList />
      </section>
    </div>
  );
}
