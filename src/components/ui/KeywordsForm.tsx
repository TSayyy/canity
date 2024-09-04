import React, { useState } from "react";
import { HiXMark } from "react-icons/hi2";

type KeyWordsFromProps = {
  keywords: string[];
  onDeletion: (keyword: string) => void;
  onAddition: (keyword: string) => void;
};

export function KeyWordsForm({ keywords, onDeletion, onAddition }: KeyWordsFromProps) {
  const [keyword, setKeyword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim() === "" || keywords.includes(keyword)) return;
    onAddition(keyword);
    setKeyword("");
  };
  return (
    <div className="grid gap-2">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add your Keywords"
          className="border-2 text-sm outline-royal-blue max-w-[350px] border-gray-300 rounded-lg w-full px-2.5 py-1.5"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
      </form>
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
