import { v4 as uuid } from "uuid";

const CHAT_EXAMPLES = [
  {
    id: uuid(),
    title: "Explain airplane turbulence",
    message:
      "Can you explain airplane turbulence to someone who has never flown before? Make it conversational and concise.",
    description: "to someone who has never flown before",
  },
  {
    id: uuid(),
    title: "Brainstorm content ideas",
    message: "Brainstorm 5 episode ideas for my new podcast on urban design.",
    description: "for my new podcast on urban design",
  },
  {
    id: uuid(),
    title: "Review my portfolio",
    message: "I am a UX designer. Can you review my portfolio and give me some feedback?",
    description: "and give me some feedback",
  },
  {
    id: uuid(),
    title: "Discuss my startup idea",
    message: "I have an idea for a startup. Can we discuss it and see if it's viable?",
    description: "and see if it's viable",
  },
  {
    id: uuid(),
    title: "Discuss project timeline and milestones",
    message:
      "Hi team, let's discuss the project timeline and milestones for the upcoming quarter. We need to ensure we're on track to meet our deadlines.",
    description: "for the upcoming quarter",
  },
  {
    id: uuid(),
    title: "Feedback on latest website design mockups",
    message:
      "Hey folks, could you please provide feedback on the latest website design mockups? We're aiming for a modern and user-friendly interface.",
    description: "for a modern and user-friendly interface",
  },
  {
    id: uuid(),
    title: "Schedule team meeting for next week",
    message:
      "Team, let's schedule a meeting for next week to discuss recent updates and upcoming tasks. Please share your availability.",
    description: "to discuss recent updates and upcoming tasks",
  },
  {
    id: uuid(),
    title: "Request for assistance with debugging",
    message: "Hello team, I'm encountering some issues with debugging the new feature. Can someone lend a hand?",
    description: "with debugging the new feature",
  },
  {
    id: uuid(),
    title: "Coordinate marketing campaign launch",
    message:
      "Hi marketing team, let's coordinate the launch of our new campaign. We need to ensure all channels are aligned and ready to go live.",
    description: "for our new campaign launch",
  },
  {
    id: uuid(),
    title: "Discuss budget allocation for Q2",
    message:
      "Hey finance team, it's time to discuss budget allocation for the second quarter. Let's review our priorities and allocate resources accordingly.",
    description: "for the second quarter",
  },
  {
    id: uuid(),
    title: "Plan team-building activities",
    message:
      "Hi everyone, let's plan some team-building activities to boost morale and foster a positive work environment. Any suggestions?",
    description: "to boost morale and foster teamwork",
  },
  {
    id: uuid(),
    title: "Review performance metrics for last month",
    message:
      "Team, it's time to review our performance metrics for last month. Let's identify areas for improvement and celebrate our successes.",
    description: "for last month",
  },
  {
    id: uuid(),
    title: "Request for additional resources",
    message:
      "Hello manager, I need additional resources to complete the project on time. Can we discuss possible solutions?",
    description: "to complete the project on time",
  },
  {
    id: uuid(),
    title: "Coordinate cross-departmental collaboration",
    message:
      "Hi team, we need to coordinate a cross-departmental collaboration to ensure seamless integration of our projects. Let's schedule a meeting to discuss the details.",
    description: "to ensure seamless integration of our projects",
  },
  {
    id: uuid(),
    title: "Share industry insights and trends",
    message:
      "Hey everyone, I came across some interesting industry insights and trends that could impact our strategy. Let's discuss their implications.",
    description: "that could impact our strategy",
  },
  {
    id: uuid(),
    title: "Provide updates on client feedback",
    message:
      "Team, I've gathered some feedback from our clients. Let's review it together and brainstorm potential solutions to address their concerns.",
    description: "to address their concerns",
  },
  {
    id: uuid(),
    title: "Discuss upcoming product roadmap",
    message:
      "Hello product team, it's time to discuss the upcoming product roadmap. Let's prioritize our features and align them with our business goals.",
    description: "to align them with our business goals",
  },
  {
    id: uuid(),
    title: "Plan for upcoming team offsite",
    message:
      "Hi all, let's start planning for our upcoming team offsite. We can use this opportunity to strategize, bond, and recharge. Any location preferences?",
    description: "to strategize, bond, and recharge",
  },
  {
    id: uuid(),
    title: "Request for assistance with technical issue",
    message:
      "Hi team, I'm encountering a technical issue with the server configuration. Can someone with expertise in this area please assist me?",
    description: "with the server configuration",
  },
  {
    id: uuid(),
    title: "Brainstorm ideas for improving customer support",
    message:
      "Hey team, let's brainstorm ideas for improving our customer support process. We need to enhance customer satisfaction and resolve issues more efficiently.",
    description: "to enhance customer satisfaction",
  },
  {
    id: uuid(),
    title: "Schedule training session for new software",
    message:
      "Hi everyone, we're introducing new software next week. Let's schedule a training session to familiarize ourselves with its features and functionalities.",
    description: "to familiarize ourselves with its features",
  },
  {
    id: uuid(),
    title: "Share best practices for remote work",
    message:
      "Team, let's share our best practices for remote work to ensure productivity and collaboration while working from home. What strategies have worked well for you?",
    description: "to ensure productivity and collaboration",
  },
  {
    id: uuid(),
    title: "Plan team outing for team building",
    message:
      "Hello team, let's plan a team outing for some fun and team building. Any suggestions for activities or venues?",
    description: "for some fun and team building",
  },
];

export const getFourRandomExamples = () => {
  const indices: number[] = [];
  const len = CHAT_EXAMPLES.length;

  while (indices.length < 4) {
    const randomIndex = Math.floor(Math.random() * len);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }

  return indices.map((index) => CHAT_EXAMPLES[index]);
};
