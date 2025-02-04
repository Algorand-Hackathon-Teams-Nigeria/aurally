import React from "react";
import { Card, Image } from "@heroui/react";


const artists = [
  {
    id: 1,
    name: "",
    image: "/images/Artist-4.svg",
    songTitle: "",
  },
  {
    id: 2,
    name: "M.I. Abaga",
    image: "/images/Artist-3.svg",
    songTitle: "Action Film",
  },
  {
    id: 3,
    name: "Sal Ly",
    image: "/images/Artist-2.svg",
    songTitle: "Swerve",
  },
  {
    id: 4,
    name: "Jesse Jagz",
    image: "/images/Artist-1.svg",
    songTitle: "Odysseus",
  },
];

// 🔹 Duplicate slides for a seamless infinite effect
const duplicatedArtists = [...artists, ...artists];

export default function InfiniteCarousel() {
  return (
    <div className="w-full overflow-hidden relative">
      <div className="flex gap-4 animate-scroll">
        {duplicatedArtists.map((artist, index) => (
          <div key={index} className="w-full min-w-[250px]">
            <Card isFooterBlurred className="border-none w-full" radius="lg">
              <Image
                alt={artist.name}
                className="object-cover w-[250px] h-[200px]" // Make the image smaller
                src={artist.image}
                width={250} // Use same width and height to make it proportional
                height={200}
              />
              {/* Song Title and Artist Name */}
              <div className="mt-2">
                {/* Song Title with larger font size and white color */}
                <p className="font-space-grotesk text-white text-lg font-bold">
                  {artist.songTitle}
                </p>
                {/* Artist Name with grey color, smaller font size, and space between words */}
                <div className="text-gray-400 font-medium">
                  {artist.name.split(" ").map((word, i) => (
                    <span
                      key={i}
                      className="font-space-grotesk text-sm text-left inline-block mr-2"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          white-space: nowrap;
          animation: scroll 25s linear infinite; /* Adjust speed */
        }
        
        /* Importing the Space Grotesk font */
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');

        .font-space-grotesk {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>
    </div>
  );
}
