// Blog page disabled — restore from page.backup.tsx and uncomment nav links to re-enable.
import { redirect } from 'next/navigation';

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
