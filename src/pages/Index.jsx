import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, HStack, Box } from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";

const poissonProbability = (lambda, k) => {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
};

const factorial = (n) => {
  return n ? n * factorial(n - 1) : 1;
};

const calculateOdds = (homeGoals, awayGoals) => {
  const maxGoals = 10; // We will consider up to 10 goals for simplicity
  let homeWinProbability = 0;
  let drawProbability = 0;
  let awayWinProbability = 0;

  for (let i = 0; i <= maxGoals; i++) {
    for (let j = 0; j <= maxGoals; j++) {
      const homeProb = poissonProbability(homeGoals, i);
      const awayProb = poissonProbability(awayGoals, j);

      if (i > j) {
        homeWinProbability += homeProb * awayProb;
      } else if (i === j) {
        drawProbability += homeProb * awayProb;
      } else {
        awayWinProbability += homeProb * awayProb;
      }
    }
  }

  return {
    homeWin: (1 / homeWinProbability).toFixed(2),
    draw: (1 / drawProbability).toFixed(2),
    awayWin: (1 / awayWinProbability).toFixed(2),
  };
};

const Index = () => {
  const [homeGoals, setHomeGoals] = useState("");
  const [awayGoals, setAwayGoals] = useState("");
  const [odds, setOdds] = useState(null);

  const handleCalculate = () => {
    const home = parseFloat(homeGoals);
    const away = parseFloat(awayGoals);

    if (!isNaN(home) && !isNaN(away)) {
      const calculatedOdds = calculateOdds(home, away);
      setOdds(calculatedOdds);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Poisson Model Odds Calculator</Text>
        <HStack spacing={4}>
          <Input placeholder="Expected Home Goals" value={homeGoals} onChange={(e) => setHomeGoals(e.target.value)} />
          <Input placeholder="Expected Away Goals" value={awayGoals} onChange={(e) => setAwayGoals(e.target.value)} />
        </HStack>
        <Button leftIcon={<FaCalculator />} colorScheme="teal" onClick={handleCalculate}>
          Calculate Odds
        </Button>
        {odds && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
            <Text>Home Win Odds: {odds.homeWin}</Text>
            <Text>Draw Odds: {odds.draw}</Text>
            <Text>Away Win Odds: {odds.awayWin}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
