import { FormEvent, KeyboardEvent, useState } from "react";
import { IoMdRemoveCircle } from "react-icons/io";
import { v4 as uuid } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SkillsForm = () => {
  const [skills, setSkills] = useState<string[]>(["React", "Node", "TypeScript"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const handleAddSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.currentTarget.value) {
        const skill = e.currentTarget.value.trim();
        setSkills((prev) => [...prev, skill]);
        e.currentTarget.value = "";
      }
    }
  };

  const handleRemoveSkill = (skill: string) => setSkills((prev) => prev.filter((s) => s !== skill));
  return (
    <div className="bg-gray-200 p-4 rounded-lg flex gap-4 shadow-lg">
      <div className="flex-grow">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="skills" className="font-semibold text-sm ps-3">
                Skills
              </label>
              <Input
                id="skills"
                type="text"
                placeholder="e.g. React, Node, TypeScript, etc"
                onKeyDown={handleAddSkill}
                disabled={isSubmitting}
              />
            </div>
            <div className="ps-3">
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div key={uuid()} className="bg-blue-500 text-white px-2 py-1 rounded-full flex gap-1 items-center">
                      <span>{skill}</span>
                      <IoMdRemoveCircle className="cursor-pointer" onClick={() => handleRemoveSkill(skill)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
