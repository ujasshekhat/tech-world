"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getUserProgress() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { bookmarks: [], completedTopics: [], notes: {}, quizScores: {} };

  const userId = session.user.id;

  const progress = await prisma.topicProgress.findMany({ where: { userId } });
  const notesData = await prisma.note.findMany({ where: { userId } });
  const quizzesData = await prisma.quizScore.findMany({ where: { userId } });

  return {
    bookmarks: progress.filter(p => p.isBookmarked).map(p => p.topicSlug),
    completedTopics: progress.filter(p => p.isCompleted).map(p => p.topicSlug),
    notes: notesData.reduce((acc, note) => ({ ...acc, [note.topicSlug]: note.content }), {} as Record<string, string>),
    quizScores: quizzesData.reduce((acc, q) => ({
      ...acc,
      [q.topicSlug]: { score: q.score, total: q.total, date: q.date.toISOString().split("T")[0] }
    }), {} as Record<string, { score: number, total: number, date: string }>)
  };
}

export async function toggleBookmarkAction(topicSlug: string, isBookmarked: boolean) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.topicProgress.upsert({
    where: { userId_topicSlug: { userId: session.user.id, topicSlug } },
    update: { isBookmarked },
    create: { userId: session.user.id, topicSlug, isBookmarked },
  });
}

export async function toggleCompletedAction(topicSlug: string, isCompleted: boolean) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.topicProgress.upsert({
    where: { userId_topicSlug: { userId: session.user.id, topicSlug } },
    update: { isCompleted },
    create: { userId: session.user.id, topicSlug, isCompleted },
  });
}

export async function saveNoteAction(topicSlug: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.note.upsert({
    where: { userId_topicSlug: { userId: session.user.id, topicSlug } },
    update: { content },
    create: { userId: session.user.id, topicSlug, content },
  });
}

export async function submitQuizScoreAction(topicSlug: string, score: number, total: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.quizScore.create({
    data: { userId: session.user.id, topicSlug, score, total },
  });
}
