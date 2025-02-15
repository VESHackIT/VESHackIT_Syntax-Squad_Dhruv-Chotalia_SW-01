export const handleMistake = async (req, res) => {
  async (req, res) => {
    try {
      const { userId, gameType, letter, word } = req.body;

      if (!userId || !gameType || !letter || !word) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const mistake = await prisma.mistake.create({
        data: { userId, gameType, letter, word },
      });

      res.status(201).json(mistake);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
