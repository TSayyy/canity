import { useState } from "react";
import { HiXMark } from "react-icons/hi2";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type KeyWordsFromProps = {
  keywords: string[];
  onDeletion: (keyword: string) => void;
  onAddition: (keyword: string) => void;
  inputClassName?: string;
};

export function KeyWordsForm({ keywords, onDeletion, onAddition, inputClassName = "" }: KeyWordsFromProps) {
  const [keyword, setKeyword] = useState("");
  const handleSubmit = () => {
    if (keyword.trim() === "" || keywords.includes(keyword)) return;
    onAddition(keyword);
    setKeyword("");
  };
  return (
    <div className="grid gap-2">
      <Input
        type="text"
        placeholder="Add your Keywords"
        className={cn(
          "rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white",
          inputClassName
        )}
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="flex flex-wrap gap-1">
        {keywords.map((keyword, index) => (
          <KeyWord key={index} keyword={keyword} onDeletion={onDeletion} />
        ))}
      </div>
    </div>
  );
}

type KeyWordProps = {
  keyword: string;
  onDeletion: (keyword: string) => void;
};

function KeyWord({ keyword, onDeletion }: KeyWordProps) {
  return (
    <div className="bg-royal-blue text-sm text-white flex justify-center items-end gap-1 py-1 px-2 rounded-lg w-fit ">
      <span>{keyword}</span>
      <button className="flex justify-center items-center" onClick={() => onDeletion(keyword)}>
        <HiXMark size={17} />
      </button>
    </div>
  );
}
