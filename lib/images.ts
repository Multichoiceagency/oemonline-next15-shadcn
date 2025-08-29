const PIXABAY_KEY = process.env.PIXABAY_KEY!;
const PEXELS_KEY = process.env.PEXELS_KEY!;

export async function getFallbackImage(query: string): Promise<string> {
  try {
    console.log("Fetching fallback image for:", query);

    const res = await fetch(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3`);
    const data = await res.json();
    if (data?.hits?.length > 0) return data.hits[0].webformatURL;

    const res2 = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3`, {
      headers: { Authorization: PEXELS_KEY },
    });
    const data2 = await res2.json();
    if (data2?.photos?.length > 0) return data2.photos[0].src.medium;

    return "https://via.placeholder.com/400x300?text=No+Image";
  } catch (err) {
    console.error("Fallback image error:", err);
    return "https://via.placeholder.com/400x300?text=No+Image";
  }
}
