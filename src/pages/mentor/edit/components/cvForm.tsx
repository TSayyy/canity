import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";

export const CVFrom = () => {
  const [cv, setCV] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCVChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCV(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center shadow-lg">
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="cv" className="flex flex-col items-center gap-2 cursor-pointer">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 mb-2 fill-gray-600 inline-block"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-base font-semibold text-gray-600">upload your CV</h4>
              {cv && <p className="text-xs text-gray-500">{cv.length > 50 ? cv.slice(0, 50) + "..." : cv}</p>}
              <p className="text-xs text-gray-500">allowed file types: .pdf, .doc, .docx</p>
            </div>
            <input
              type="file"
              name="cv"
              id="cv"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleCVChange}
              disabled={loading}
            />
          </label>
        </div>
        <div className="bg-green-200">
          <Button type="submit" disabled={!cv || loading} className="w-full select-none">
            {loading ? "Loading..." : "Upload CV"}
          </Button>
        </div>
      </form>
    </div>
  );
};
