export const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/+$/,
    "",
  );

export const siteName = "MentorLagbe";

export const defaultDescription =
  "MentorLagbe connects students with qualified tutors. Explore tuition opportunities, find the right tutor, and build your learning journey.";
