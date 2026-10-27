import React, { useState } from "react";

export default function JobDescriptionInput({ onSave }) {
  const [jobDescription, setJobDescription] = useState("");
  const [savedDescription, setSavedDescription] = useState("");

  const handleSave = () => {
    const trimmedText = jobDescription.trim();

    if (!trimmedText) {
      return;
    }

    setSavedDescription(trimmedText);

    if (onSave) {
      onSave(trimmedText);
    }
  };

  return (
    <div className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label
        htmlFor="job-description"
        className="mb-3 block text-lg font-semibold text-gray-800"
      >
        Job Description
      </label>

      <textarea
        id="job-description"
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
        placeholder="Paste the job description here..."
        className="h-64 w-full resize-none rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-sm text-gray-500">
          {savedDescription ? "Saved successfully" : "Draft not saved yet"}
        </span>

        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}
