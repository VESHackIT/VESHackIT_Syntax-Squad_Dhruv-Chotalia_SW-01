export const handleMistake = async (req, res) => {
  try {
    const { userId, gameType, mistake, word } = req.body;

    if (
      !userId ||
      !gameType ||
      !mistake ||
      !mistake.incorrect ||
      !mistake.correct ||
      !word
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMistake = await prisma.mistake.create({
      data: {
        userId,
        gameType,
        incorrectLetter: mistake.incorrect,
        correctLetter: mistake.correct,
        word,
      },
    });

    res.status(201).json(newMistake);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
