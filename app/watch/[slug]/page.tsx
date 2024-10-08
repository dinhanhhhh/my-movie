"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Hls from "hls.js";
import { useParams } from "next/navigation";
import clsx from "clsx";

interface Episode {
  link_m3u8: string;
}

interface Movie {
  name: string;
  time: string;
  content: string;
}

interface FilmData {
  movie: Movie;
  episodes: {
    server_data: Episode[];
  }[];
}

interface Resolution {
  label: string;
  value: number;
}

function Watch() {
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [film, setFilm] = useState<string>("");
  const [activeFilm, setActiveFilm] = useState<Episode[]>([]);
  const [content, setContent] = useState({ name: "", time: "", desc: "" });
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const canSeekRef = useRef(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [selectedResolution, setSelectedResolution] = useState<number | null>(
    null
  );
  const hlsRef = useRef<Hls | null>(null);

  // Fetch movie data
  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const res = await fetch(`https://phimapi.com/phim/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const watch: FilmData = await res.json();

        if (watch && watch.movie && watch.episodes.length > 0) {
          const firstEpisode = watch.episodes[0].server_data;

          setContent({
            name: watch.movie.name,
            time: watch.movie.time,
            desc: watch.movie.content,
          });
          setTotalEpisodes(firstEpisode.length);
          setFilm(firstEpisode[0]?.link_m3u8);
          setActiveFilm(firstEpisode);
          document.title = watch.movie.name;
        } else {
          throw new Error("No episodes available");
        }
      } catch (error) {
        console.error("Error fetching film data:", error);
        alert("Có lỗi xảy ra khi tải phim. Vui lòng thử lại sau.");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchMovieData();
  }, [slug]);

  // Initialize HLS and handle resolutions
  useEffect(() => {
    if (videoRef.current && film) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(film);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
        });

        hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
          const availableLevels = hls.levels.map((level, index) => ({
            label: level.height ? `${level.height}p` : "Auto",
            value: index,
          }));
          console.log("Available Levels:", availableLevels); // Debug log
          setResolutions(availableLevels);
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS error:", data);
          alert("Có lỗi xảy ra với video. Vui lòng thử lại.");
        });

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = film;
      }
    }
  }, [film]);

  // Handle resolution change
  const handleResolutionChange = useCallback((value: number) => {
    if (hlsRef.current) {
      if (value === -1) {
        // Tự động chọn
        hlsRef.current.currentLevel = -1;
      } else {
        hlsRef.current.currentLevel = value;
      }
      setSelectedResolution(value);
      console.log(`Resolution changed to: ${value}`); // Debug log
    }
  }, []);

  // Handle key events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!canSeekRef.current) return;
      const videoElement = videoRef.current;
      if (!videoElement) return;

      e.preventDefault();
      canSeekRef.current = false;
      setTimeout(() => {
        canSeekRef.current = true;
      }, 300);

      // Toggle play/pause with space key
      if (e.key === " ") {
        if (videoElement.paused) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
        setIsVideoPlaying(!isVideoPlaying);
      }

      // Toggle fullscreen with 'f' key
      if (e.key === "f" || e.key === "F") {
        if (!isFullscreen) {
          if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
          }
          setIsFullscreen(true);
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          setIsFullscreen(false);
        }
      } else if (e.key === "ArrowRight") {
        videoElement.currentTime = Math.min(
          videoElement.duration,
          videoElement.currentTime + 10
        );
      } else if (e.key === "ArrowLeft") {
        videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, isVideoPlaying]);

  // Handle episode selection
  const handleSelectEpisode = (index: number) => {
    setLoading(true);
    setActiveEpisode(index);
    setFilm(activeFilm[index].link_m3u8);
    setSelectedResolution(null); // Reset resolution when changing episode
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Handle video click to toggle play/pause
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Handle skip forward
  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 10
      );
    }
  };

  // Handle skip backward
  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10
      );
    }
  };

  // Handle favorite toggle
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    alert(
      `Tập phim ${isFavorite ? "đã bỏ yêu thích" : "đã thêm vào yêu thích"}`
    );
  };

  return (
    <div className="container mx-auto p-6 watch">
      <div className="film__title mb-4 text-center">
        <h1 className="film__name text-3xl font-bold">
          {`${content.name} ~ Tập ${activeEpisode + 1}`}
        </h1>
        <p className="text-gray-600">{content.desc}</p>
        <p className="text-gray-500">Thời gian: {content.time}</p>
      </div>

      <div className="flex flex-col lg:flex-row mb-4">
        <div className="flex-1 mb-4 lg:mb-0">
          <video
            id="my-hls-video"
            controls
            className="w-full h-96 rounded-lg shadow-lg"
            style={{ objectFit: "cover" }}
            ref={videoRef}
            onClick={handleVideoClick}
          />
        </div>
      </div>

      {/* Thêm nút đánh dấu yêu thích */}
      <div className="flex justify-center mb-4">
        <button
          className={clsx(
            "px-4 py-2 rounded-md",
            isFavorite ? "bg-red-500" : "bg-blue-500"
          )}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
        </button>
      </div>

      {/* Add Skip Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleSkipBackward}
        >
          Tua Lùi 10s
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={handleSkipForward}
        >
          Tua Tiến 10s
        </button>
      </div>

      {/* Chọn phân giải */}
      {resolutions.length > 1 && (
        <div className="flex justify-center mb-4">
          <label htmlFor="resolution-select" className="mr-2 text-gray-700">
            Chọn phân giải:
          </label>
          <select
            id="resolution-select"
            className="px-4 py-2 border rounded-md"
            value={selectedResolution ?? "auto"}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "auto") {
                handleResolutionChange(-1); // -1 để bật tự động
              } else {
                handleResolutionChange(parseInt(value, 10));
              }
            }}
          >
            <option value="auto">Tự động</option>
            {resolutions.map((res, index) => (
              <option key={index} value={res.value}>
                {res.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="w-full mb-4">
        <div className="list__chap shadow-md rounded p-4">
          <div className="list__chap--info mb-2">
            <p className="list__chap--title font-bold text-lg">Chọn tập</p>
            <p className="list__chap--desc text-gray-500">
              Tập từ 1 đến <span className="chap__desc">{totalEpisodes}</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalEpisodes }).map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "film__list--chap flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out w-12 h-12 text-center text-lg font-semibold",
                  activeEpisode === i
                    ? "bg-green-500 text-white"
                    : "bg-gray-800 text-white hover:bg-green-600"
                )}
                onClick={() => handleSelectEpisode(i)}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-indicator fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="spinner border-4 border-t-4 border-gray-700 rounded-full animate-spin w-12 h-12" />
        </div>
      )}
    </div>
  );
}

export default Watch;
