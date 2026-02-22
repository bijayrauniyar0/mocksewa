export type UserRank = {
  user_id: number;
  name: string;
  total_score: number;
  rank: number;
  previous_rank: number;
  avatar: string;
};

export type ScoresProps = {
  mockTestId: number;
  isLoading?: boolean;
};

export type TestTakenByUserList = {
  id: number;
  label: string;
  value: string;
};

export type ScoreRowProps = UserRank;
