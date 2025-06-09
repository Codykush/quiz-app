import { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, Button, Radio, RadioGroup, Progress } from '@chakra-ui/react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowScore(false);
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.100" py={10}>
        <VStack spacing={8} maxW="600px" mx="auto" bg="white" p={8} borderRadius="lg" boxShadow="lg">
          {!showScore ? (
            <>
              <Progress value={(currentQuestion / questions.length) * 100} w="100%" />
              <Heading size="lg">Question {currentQuestion + 1} of {questions.length}</Heading>
              <Text fontSize="xl" fontWeight="bold">{questions[currentQuestion].question}</Text>
              
              <RadioGroup onChange={(value) => handleAnswerClick(parseInt(value))} value={selectedAnswer?.toString()}>
                <VStack spacing={4} align="stretch">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Radio key={index} value={index.toString()}>
                      {option}
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>

              <Button
                colorScheme="blue"
                onClick={handleNextQuestion}
                isDisabled={selectedAnswer === null}
              >
                {currentQuestion + 1 === questions.length ? 'Finish' : 'Next'}
              </Button>
            </>
          ) : (
            <VStack spacing={6}>
              <Heading>Quiz Completed!</Heading>
              <Text fontSize="xl">
                Your score: {score} out of {questions.length}
              </Text>
              <Button colorScheme="green" onClick={handleRestart}>
                Restart Quiz
              </Button>
            </VStack>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App; 