'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Send } from 'lucide-react';

export default function InterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [answer, setAnswer] = useState('');

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording logic
  };

  const handleSubmit = () => {
    // Here you would implement the answer submission logic
    console.log('Submitted answer:', answer);
    setAnswer('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-3xl mx-auto pt-16">
        <Card className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-muted-foreground mb-2">Question 1 of 5</h2>
            <h1 className="text-2xl font-bold">
              Can you explain how you would handle a challenging situation with a difficult team member?
            </h1>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant={isRecording ? "destructive" : "secondary"}
                onClick={toggleRecording}
                className="flex items-center gap-2"
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-4 w-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" />
                    Start Recording
                  </>
                )}
              </Button>
              {isRecording && (
                <div className="flex items-center gap-2">
                  <span className="animate-pulse text-destructive">●</span>
                  <span className="text-sm text-muted-foreground">Recording...</span>
                </div>
              )}
            </div>

            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[200px] resize-none"
            />

            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                className="flex items-center gap-2"
                disabled={!answer.trim()}
              >
                Submit Answer
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}