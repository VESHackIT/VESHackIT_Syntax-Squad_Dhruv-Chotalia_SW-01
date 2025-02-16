import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Star,
  Trophy,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  Brain,
} from "lucide-react";

function SpellingSafari() {
  // Expected backend sentence structure:
  // { sentence: string, errors: [string], difficulty: string }
  const [sentenceData, setSentenceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Track user interactions: which word indices were clicked and the feedback ("correct" or "incorrect")
  const [clickedIndices, setClickedIndices] = useState([]);
  const [feedback, setFeedback] = useState({});
  // Score: counts correct selections and incorrect ones (from false positives or missed errors)
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  // Separate lists for missed errors and false positive selections
  const [missed, setMissed] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);

  // Overall user stats (for long-term progression; currently stored locally)
  const [stats, setStats] = useState({ accuracy: 0, currentLevel: 50 });

  // Timing state for response speed
  const [startTime, setStartTime] = useState(null);
  const [responseTimes, setResponseTimes] = useState([]);

  // States for submission and analysis features
  const [submitted, setSubmitted] = useState(false);
  // analysisFeedback can be either an object with suggestions or an encouraging message object
  const [analysisFeedback, setAnalysisFeedback] = useState("");
  // Controls whether the analysis panel is visible
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // Helper function: clean text by removing punctuation, extra spaces, and lowercasing
  const cleanText = (text) => {
    return text
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  };

  // Fetch a new sentence from the backend
  const fetchSentence = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/generate-sentence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accuracy: stats.accuracy,
          currentLevel: stats.currentLevel,
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch sentence");
      const data = await response.json();
      setSentenceData(data);
      // Reset all interactive states for the new sentence
      setClickedIndices([]);
      setFeedback({});
      setScore({ correct: 0, incorrect: 0 });
      setResponseTimes([]);
      setStartTime(Date.now());
      setSubmitted(false);
      setAnalysisFeedback("");
      setAnalyzing(false);
      setShowAnalysis(false);
      setMissed([]);
      setIncorrectWords([]);
    } catch (err) {
      console.error("Error fetching sentence:", err);
      setError("Error fetching sentence. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the first sentence when the component mounts
  useEffect(() => {
    fetchSentence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle clicking on a word (only allowed before submission)
  const handleWordClick = (word, index) => {
    if (!sentenceData || submitted || clickedIndices.includes(index)) return;
    const currentTime = Date.now();
    const timeTaken = (currentTime - startTime) / 1000;
    setResponseTimes((prev) => [...prev, timeTaken]);
    setClickedIndices((prev) => [...prev, index]);

    const cleanedWord = cleanText(word);
    // Compare clicked word against backend errors (which are returned as strings)
    const isError = sentenceData.errors.some(
      (errorStr) => cleanText(errorStr) === cleanedWord,
    );

    if (isError) {
      setFeedback((prev) => ({ ...prev, [index]: "correct" }));
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setFeedback((prev) => ({ ...prev, [index]: "incorrect" }));
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));

      // Report false positive mistake immediately
      const mistakeData = {
        userId: "12345", // Replace with actual user ID if available
        gameType: "Spelling Safari",
        mistake: {
          incorrect: word,
          correct: "No error", // Indicates that this word should not have been clicked
        },
        sentence: sentenceData.sentence,
      };

      fetch("http://localhost:3000/api/mistake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mistakeData),
      })
        .then((res) => res.json())
        .then((data) => console.log("False positive mistake recorded:", data))
        .catch((err) =>
          console.error("Error reporting false positive mistake:", err),
        );
    }
  };

  // Compute sentence accuracy based solely on clicks
  const computeSentenceAccuracy = () => {
    const totalClicks = score.correct + score.incorrect;
    return totalClicks > 0
      ? ((score.correct / totalClicks) * 100).toFixed(2)
      : "0";
  };

  // Handle submission:
  // - Lock in answers, count missed errors (words that should have been clicked but weren't),
  //   and track false positives (incorrect selections).
  // - Trigger a performance animation.
  const handleSubmit = () => {
    let newMissed = [];
    let newIncorrectWords = [];
    if (sentenceData) {
      const words = sentenceData.sentence.split(" ");
      // Missed errors: error words that were not clicked.
      sentenceData.errors.forEach((errorStr) => {
        const cleanedError = cleanText(errorStr);
        const indices = words
          .map((w, idx) => (cleanText(w) === cleanedError ? idx : null))
          .filter((idx) => idx !== null);
        if (!indices.some((idx) => clickedIndices.includes(idx))) {
          newMissed.push(errorStr);
        }
      });
      // False positives: clicked words that are not errors.
      clickedIndices.forEach((idx) => {
        const word = words[idx];
        const cleanedWord = cleanText(word);
        if (
          !sentenceData.errors.some(
            (errorStr) => cleanText(errorStr) === cleanedWord,
          )
        ) {
          newIncorrectWords.push(word);
        }
      });
    }
    setMissed(newMissed);
    setIncorrectWords(newIncorrectWords);
    // Update incorrect count to be the sum of false positives and missed errors.
    const totalIncorrect = newIncorrectWords.length + newMissed.length;
    setScore({ correct: score.correct, incorrect: totalIncorrect });
    setSubmitted(true);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 3000);

    // Report each missed error to the backend
    newMissed.forEach((errorWord) => {
      const mistakeData = {
        userId: "12345", // Replace with actual user ID if available
        gameType: "Spelling Safari",
        mistake: {
          incorrect: "No selection", // Indicates that the user did not click the error word
          correct: errorWord,
        },
        sentence: sentenceData.sentence,
      };

      fetch("http://localhost:3000/api/mistake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mistakeData),
      })
        .then((res) => res.json())
        .then((data) => console.log("Missed mistake recorded:", data))
        .catch((err) => console.error("Error reporting missed mistake:", err));
    });
  };

  // Regenerate: fetch a new sentence without evaluating the current one.
  const handleRegenerate = () => {
    fetchSentence();
  };

  // Next: update progress and fetch the next sentence.
  const handleNext = () => {
    const sentenceAccuracy = parseFloat(computeSentenceAccuracy());
    let newLevel = stats.currentLevel;

    if (sentenceAccuracy >= 80) {
      newLevel = Math.min(100, stats.currentLevel + 5);
    } else if (sentenceAccuracy < 50) {
      newLevel = Math.max(1, stats.currentLevel - 5);
    }

    // Update local stats and fetch a new sentence
    setStats({ currentLevel: newLevel, accuracy: sentenceAccuracy });
    fetchSentence();
  };

  // Handle Analyze:
  // - If analysis feedback already exists, toggle the analysis panel.
  // - If no mistakes exist (score.incorrect <= 0), display an encouraging message.
  // - Otherwise, send an analysis request with the list of mistakes.
  // The list of mistakes now comes from both missed errors and false positives.
  const handleAnalyze = async () => {
    // Toggle analysis if feedback is already available.
    if (
      analysisFeedback &&
      (analysisFeedback.message || Object.keys(analysisFeedback).length > 0)
    ) {
      setShowAnalysis(!showAnalysis);
      return;
    }
    // If no mistakes exist, display a random encouraging message.
    if (score.incorrect <= 0) {
      const encouragements = [
        "Great job! No mistakes!",
        "Fantastic! You're perfect!",
        "Kudos! No errors found!",
        "Excellent work, all correct!",
        "Bravo! You made no mistakes!",
        "Superb performance!",
        "Impressive! No errors detected!",
        "You're a spelling champ!",
        "Outstanding! No errors!",
        "Keep it up! Perfect round!",
      ];
      const randomMessage =
        encouragements[Math.floor(Math.random() * encouragements.length)];
      setAnalysisFeedback({ message: randomMessage });
      setShowAnalysis(true);
      return;
    }
    setAnalyzing(true);
    let mistakes = [];
    if (sentenceData) {
      const words = sentenceData.sentence.split(" ");
      // Gather missed errors
      sentenceData.errors.forEach((errorStr) => {
        const cleanedError = cleanText(errorStr);
        const indices = words
          .map((w, idx) => (cleanText(w) === cleanedError ? idx : null))
          .filter((idx) => idx !== null);
        if (!indices.some((idx) => clickedIndices.includes(idx))) {
          mistakes.push(errorStr);
        }
      });
      // Gather false positives: clicked words that are not errors.
      clickedIndices.forEach((idx) => {
        const word = words[idx];
        const cleanedWord = cleanText(word);
        if (
          !sentenceData.errors.some(
            (errorStr) => cleanText(errorStr) === cleanedWord,
          )
        ) {
          mistakes.push(word);
        }
      });
    }

    try {
      const response = await fetch("http://localhost:3000/analyze-mistakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mistakes }),
      });
      if (!response.ok) throw new Error("Analysis request failed");
      const data = await response.json();
      // data.suggestions is expected to be an object mapping each word to its suggestion.
      setAnalysisFeedback(data.suggestions);
      setShowAnalysis(true);
    } catch (err) {
      console.error(err);
      setAnalysisFeedback({ message: "Analysis failed. Please try again." });
      setShowAnalysis(true);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100 flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
      </div>

      {/* Game Title */}
      <div className="relative mb-8 text-center">
        <h1 className="mt-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600 mb-2">
          Spelling Safari
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <p className="text-lg text-green-800">Level: {stats.currentLevel}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-12 h-12 text-green-600 animate-spin" />
          <p className="text-lg text-green-800">Loading your adventure...</p>
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle />
          <p className="text-lg">{error}</p>
        </div>
      ) : sentenceData ? (
        <>
          {/* Main Game Card */}
          <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-2xl w-full transform hover:scale-102 transition-all duration-300 border-2 border-green-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-green-600 font-medium">
                Find the spelling mistakes!
              </span>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              {sentenceData.sentence.split(" ").map((word, index) => (
                <span
                  key={index}
                  onClick={() => handleWordClick(word, index)}
                  className={`cursor-pointer mr-2 inline-block transition-all duration-300 px-2 py-1 rounded-lg ${
                    feedback[index] === "correct"
                      ? "bg-green-200 text-green-800 transform scale-110"
                      : feedback[index] === "incorrect"
                        ? "bg-red-200 text-red-800 transform scale-110"
                        : "hover:bg-yellow-100"
                  } ${!submitted && "hover:scale-110"}`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Game Stats Card */}
          <div className="mt-6 bg-white/90 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-md">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600">Correct</p>
                <p className="text-2xl font-bold text-green-800">
                  {score.correct}
                </p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-600">Incorrect</p>
                <p className="text-2xl font-bold text-red-800">
                  {score.incorrect}
                </p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-600">Missed</p>
                <p className="text-2xl font-bold text-yellow-800">
                  {missed.length}
                </p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600">Accuracy</p>
                <p className="text-2xl font-bold text-blue-800">
                  {computeSentenceAccuracy()}%
                </p>
              </div>
            </div>
          </div>

          {/* Panel for Incorrect Selections */}
          {submitted && incorrectWords.length > 0 && (
            <div className="mt-4 bg-orange-50 p-4 rounded-lg shadow w-full max-w-md">
              <h3 className="text-orange-700 font-bold mb-2">
                Incorrect Selections
              </h3>
              <ul className="list-disc list-inside">
                {incorrectWords.map((word, idx) => (
                  <li key={idx} className="text-orange-600">
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {!submitted ? (
              <>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-xl font-semibold group"
                >
                  <span>Submit</span>
                  <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                </button>
                <button
                  onClick={handleRegenerate}
                  className="flex items-center gap-2 bg-gray-200 text-gray-700 px-8 py-3 rounded-full shadow-lg hover:bg-gray-300 transition-all duration-300 text-xl font-semibold"
                >
                  <RefreshCw className="w-6 h-6" />
                  <span>New Sentence</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-xl font-semibold group"
                >
                  <span>Next Adventure</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                <button
                  onClick={handleAnalyze}
                  className="flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 text-xl font-semibold"
                  disabled={analyzing}
                >
                  <Brain className="w-6 h-6" />
                  <span>{analyzing ? "Thinking..." : "Analyze"}</span>
                </button>
              </>
            )}
          </div>

          {/* Analysis Panel */}
          {submitted && showAnalysis && analysisFeedback && (
            <div className="mt-6 bg-white/90 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 hover:scale-102">
              <h2 className="text-2xl font-bold mb-4 text-green-800 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                Learning Time!
              </h2>
              <div className="space-y-4">
                {analysisFeedback.message ? (
                  <p className="text-lg text-green-700 font-medium">
                    {analysisFeedback.message}
                  </p>
                ) : (
                  Object.entries(analysisFeedback)
                    .filter(
                      ([word, suggestion]) =>
                        suggestion.error_pattern !== "false positive",
                    )
                    .map(([mistake, suggestion], i) => (
                      <div
                        key={i}
                        className="p-4 bg-green-50 rounded-lg border-b pb-2"
                      >
                        <p className="text-lg font-medium text-red-600">
                          Missed: {mistake}
                        </p>
                        <p className="text-lg">
                          <strong>Correct:</strong>{" "}
                          {suggestion.corrected_spelling}
                        </p>
                        <p className="text-lg">
                          <strong>Explanation:</strong> {suggestion.explanation}
                        </p>
                        <p className="text-lg">
                          <strong>Error Pattern:</strong>{" "}
                          {suggestion.error_pattern}
                        </p>
                        <p className="text-lg">
                          <strong>Suggestion:</strong> {suggestion.suggestion}
                        </p>
                      </div>
                    ))
                )}
                {Object.entries(analysisFeedback).filter(
                  ([word, suggestion]) =>
                    suggestion.error_pattern === "false positive",
                ).length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="text-xl font-bold text-blue-600 mb-2">
                      False Positives
                    </h3>
                    {Object.entries(analysisFeedback)
                      .filter(
                        ([word, suggestion]) =>
                          suggestion.error_pattern === "false positive",
                      )
                      .map(([word, suggestion], i) => (
                        <div
                          key={i}
                          className="p-4 bg-blue-50 rounded-lg border-b pb-2"
                        >
                          <p className="text-lg font-medium text-blue-800">
                            Word: {word}
                          </p>
                          <p className="text-lg">
                            <strong>Feedback:</strong> {suggestion.explanation}
                          </p>
                          <p className="text-lg">
                            <strong>Suggestion:</strong> {suggestion.suggestion}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
                {Object.entries(analysisFeedback).length === 0 && (
                  <p className="text-lg text-green-700 font-medium">
                    No actionable suggestions. Excellent work!
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

export default SpellingSafari;
