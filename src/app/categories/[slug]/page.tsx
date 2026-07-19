import { CATEGORIES } from "@/lib/topics-data";
import CategoryPageClient from "@/components/CategoryPageClient";

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.id,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <CategoryPageClient slug={slug} />;
}