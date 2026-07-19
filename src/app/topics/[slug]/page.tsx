import { SUB_CATEGORIES } from "@/lib/topics-data";
import TopicPageClient from "@/components/TopicPageClient";

export async function generateStaticParams() {
  return Object.values(SUB_CATEGORIES)
    .flat()
    .flatMap(section =>
      section.topics.map(topic => ({
        slug: topic.slug,
      }))
    );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <TopicPageClient slug={slug} />;
}