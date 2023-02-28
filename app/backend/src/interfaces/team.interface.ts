export type ITeam = {
  id: number,
  teamName: string,
};

export interface ITeamsServices {
  findAll(): Promise<ITeam[]>
  findById(id: number): Promise<ITeam | null>
}
