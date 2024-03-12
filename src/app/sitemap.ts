import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aurally.xyz",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://app.aurally.xyz/explore",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://app.aurally.xyz/collection",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://app.aurally.xyz/create",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...["album", "sound"].map(
      (item) =>
        ({
          url: `https://app.aurally.xyz/create/${item}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        } as const)
    ),
  ];
}
