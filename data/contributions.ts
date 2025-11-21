export type ContributionItem = {
  label: string;
  url?: string; // optional PR/issue link
};

export type ContributionProject = {
  title: string;
  repoLink: string;
  contributions: ContributionItem[];
};

export const contributions: ContributionProject[] = [
    {
    title: "ConversationKit",
    repoLink: "https://github.com/peterfriese/ConversationKit/pull/19",
    contributions: [
      {
        label: "Hide the plus button if no attachment actions are registered (#11)",
      },
    ],
  },

 

  // Add more projects here...
];
