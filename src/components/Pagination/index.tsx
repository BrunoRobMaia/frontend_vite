import type { ButtonHTMLAttributes } from "react";
import { useEffect } from "react";
import {
  BiChevronsLeft,
  BiChevronsRight,
  BiSolidLeftArrow,
  BiSolidRightArrow,
} from "react-icons/bi";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  prev: () => void;
  next: () => void;
  first: () => void;
  last: () => void;
  limitChange: (value: number) => void;
  filedColor?: boolean;
}

function Pagination({
  totalItems,
  currentPage,
  itemsPerPage,
  prev,
  next,
  first,
  last,
  limitChange,
  filedColor,
  ...rest
}: Props) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    limitChange(itemsPerPage);
  }, [itemsPerPage, limitChange]);

  return (
    <main {...rest} className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-3 text-sm">
        <div>
          <p>
            Página {currentPage} de {totalPages === 0 ? 1 : totalPages}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={first}
            disabled={currentPage <= 1}
            className={`h-[32px] w-[45px] flex justify-center items-center ${
              filedColor
                ? "bg-white border-[#462ebd] border text-[#462ebd]"
                : "bg-[#462ebd] text-white"
            } rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <BiChevronsLeft size={18} />
          </button>
          <button
            onClick={prev}
            disabled={currentPage <= 1}
            className={`h-[32px] w-[45px] flex justify-center items-center ${
              filedColor
                ? "bg-white border-[#462ebd] border text-[#462ebd]"
                : "bg-[#462ebd] text-white"
            } rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <BiSolidLeftArrow size={12} />
          </button>
          <button
            onClick={next}
            disabled={currentPage >= totalPages}
            className={`h-[32px] w-[45px] flex justify-center items-center ${
              filedColor
                ? "bg-white border-[#462ebd] border text-[#462ebd]"
                : "bg-[#462ebd] text-white"
            } rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <BiSolidRightArrow size={12} />
          </button>
          <button
            onClick={last}
            disabled={currentPage >= totalPages}
            className={`h-[32px] w-[45px] flex justify-center items-center ${
              filedColor
                ? "bg-white border-[#462ebd] border text-[#462ebd]"
                : "bg-[#462ebd] text-white"
            } rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <BiChevronsRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Pagination;
