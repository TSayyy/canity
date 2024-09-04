type TSkillsBox = {
  skills: string[];
};

export const SkillsBox = ({ skills }: TSkillsBox) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-xl">Skills:</h3>
      <ul className="flex items-center flex-wrap gap-y-2.5 gap-x-3">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <li key={index} className="px-3 py-1.5 border-2 border-royal-blue rounded-lg text-royal-blue select-none">
              {skill}
            </li>
          ))
        ) : (
          <li className="px-3 py-1.5 border-2 border-royal-blue rounded-lg text-royal-blue select-none">
            No skills added yet
          </li>
        )}
      </ul>
    </div>
  );
};
