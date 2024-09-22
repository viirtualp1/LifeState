export enum ScoreType {
  NOT_AT_ALL = 0,
  A_LITTLE_BIT = 1,
  MODERATELY = 2,
  STRONGLY = 3,
  VERY_STRONGLY = 4,
}

export interface StateEntity {
  name: string
  score: ScoreType | null
}

export interface TestData {
  title: string
  states: StateEntity[]
}
