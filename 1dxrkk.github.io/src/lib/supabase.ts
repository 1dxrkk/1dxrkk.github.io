// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import type { Post, Reply } from "../types/forums";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnon);

// load posts with their replies
export async function fetchPostsWithReplies(): Promise<Post[]> {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (!posts) return [];

  const full: Post[] = [];

  for (const post of posts) {
    const { data: replies } = await supabase
      .from("replies")
      .select("*")
      .eq("post_id", post.id)
      .order("created_at");

    full.push({ ...post, replies: replies || [] });
  }

  return full;
}

// create a new post
export async function createNewPost(title: string, body: string) {
  return supabase
    .from("posts")
    .insert({ title, body })
    .select()
    .single();
}

// update post fields (like, dislike, favorite)
export async function updatePostFields(id: string, fields: Partial<Post>) {
  return supabase.from("posts").update(fields).eq("id", id);
}

// create a new reply
export async function createNewReply(postId: string, text: string) {
  return supabase.from("replies").insert({
    post_id: postId,
    text,
  });
}

// fetch a random post
export async function fetchRandomPost() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*");

  if (!posts || posts.length === 0) return null;

  const random = posts[Math.floor(Math.random() * posts.length)];
  return random;
}
