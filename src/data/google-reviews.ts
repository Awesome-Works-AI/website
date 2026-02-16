export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  profilePhotoUrl?: string;
  time: number;
}

export interface GooglePlaceInfo {
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

const GOOGLE_REVIEW_URL = "https://g.page/r/CbNJODQ_z5PgEAE/review";

export function getGoogleReviewUrl(): string {
  return GOOGLE_REVIEW_URL;
}

/**
 * Fetches reviews from Google Places API (New) at build time.
 * Requires GOOGLE_API_KEY and GOOGLE_PLACE_ID environment variables.
 *
 * In production (GitHub Pages): set these as GitHub Secrets
 *   → Repo Settings → Secrets and variables → Actions
 *
 * Locally: create a .env file (it's in .gitignore, safe to use)
 *
 * The API key is NEVER exposed to the browser — reviews are
 * baked into static HTML at build time.
 *
 * Requires "Places API (New)" enabled in Google Cloud Console.
 */
export async function fetchGoogleReviews(): Promise<GooglePlaceInfo | null> {
  const apiKey = import.meta.env.GOOGLE_API_KEY;
  const placeId = import.meta.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn(
      "[google-reviews] Missing GOOGLE_API_KEY or GOOGLE_PLACE_ID env variables. " +
        "Reviews section will show fallback content.\n" +
        "Set these in your .env file to enable live Google reviews."
    );
    return null;
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "rating,userRatingCount,reviews",
      },
    });

    const data = await response.json();

    if (data.error) {
      console.error(
        "[google-reviews] API error:",
        data.error.status,
        data.error.message
      );
      return null;
    }

    return {
      rating: data.rating ?? 0,
      totalReviews: data.userRatingCount ?? 0,
      reviews: (data.reviews ?? []).map((r: any) => ({
        authorName: r.authorAttribution?.displayName ?? "Anonymous",
        rating: r.rating,
        text: r.text?.text ?? "",
        relativeTimeDescription: r.relativePublishTimeDescription ?? "",
        profilePhotoUrl: r.authorAttribution?.photoUri ?? undefined,
        time: r.publishTime
          ? Math.floor(new Date(r.publishTime).getTime() / 1000)
          : 0,
      })),
    };
  } catch (error) {
    console.error("[google-reviews] Failed to fetch reviews:", error);
    return null;
  }
}
