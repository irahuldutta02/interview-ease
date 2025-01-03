"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SKILL_SUGGESTIONS } from "@/lib/skills";
import { Command } from "cmdk";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SkillsSelection() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const filteredSuggestions = SKILL_SUGGESTIONS.filter(
    (skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedSkills.includes(skill)
  );

  const handleSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSubmit = () => {
    if (selectedSkills.length > 0) {
      router.push("/interview");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredSuggestions.length > 0) {
      handleSelect(filteredSuggestions[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto pt-16">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Select Your Skills</h1>
          <div className="space-y-4">
            <div className="relative">
              <Command className="relative">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type to search skills..."
                  className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {inputValue && (
                  <div className="absolute w-full mt-1 bg-background border rounded-md shadow-lg z-10 max-h-[300px] overflow-y-auto">
                    {filteredSuggestions.map((skill) => (
                      <div
                        key={skill}
                        className="px-4 py-2 hover:bg-secondary cursor-pointer"
                        onClick={() => handleSelect(skill)}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
              </Command>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={selectedSkills.length === 0}
            >
              Continue to Interview
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
