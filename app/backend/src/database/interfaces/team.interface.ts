import { Optional } from 'sequelize';

export type ITeam = {
  id: number,
  teamName: string,
};

export type IteamInput = Optional<ITeam, 'id'>;
