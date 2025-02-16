
export const SPELLING_GAME_PROMPTS = {
  GENERATE_SENTENCE: (difficulty: string) => 
    `Generate a JSON object for a Spelling Safari game with the following properties:
    - "sentence": A natural, engaging sentence appropriate for a level between 1 and 100, with proper spacing and punctuation, that includes exactly 2 common misspellings.
    - "errors": An array of exactly two strings representing the misspelled words in the sentence.
    The difficulty level is "${difficulty}". Output ONLY the raw JSON object without any markdown formatting.`,

  ANALYZE_MISTAKES: (mistakes: string[]) => 
    `Based on the following sanitized spelling mistakes: ${JSON.stringify(mistakes)}.
    For each word in the list, determine whether it is a true misspelling or a false positive.
    - If the word is a true misspelling, output an object with:
        "corrected_spelling": (the correct spelling),
        "explanation": (a brief explanation of why the word is misspelled),
        "error_pattern": (a description of the error pattern, e.g., "incorrect vowel combination", "omission", etc.),
        "suggestion": (advice on how to identify such errors in the future).
    - If the word is spelled correctly (i.e., a false positive), output an object with:
        "corrected_spelling": "",
        "explanation": "The word is spelled correctly but was incorrectly identified as an error.",
        "error_pattern": "false positive",
        "suggestion": "Review the context and rely on visual cues to avoid misidentification."
    Output a JSON object with a key "suggestions" mapping each provided word to its suggestion object.
    Output ONLY the raw JSON object without any markdown formatting.`
};
