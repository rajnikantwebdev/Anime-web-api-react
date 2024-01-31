import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../utils/ThemeContext";

export function SimplePagination({ page, setPage, hasNextPage }) {
  const { theme } = useTheme();
  const next = () => {
    if (!hasNextPage) return;

    setPage(page + 1);
  };

  const prev = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        className={`${theme === "dark" && "text-white border-white"}`}
        disabled={page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography
        color={`${theme === "dark" ? "white" : "black"}`}
        className="font-normal"
      >
        Page{" "}
        <strong
          className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          {page}
        </strong>{" "}
        of{" "}
        <strong
          className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          ...
        </strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        className={`${theme === "dark" && "text-white border-white"}`}
        disabled={!hasNextPage}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
