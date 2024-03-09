export interface User {
  first_name: string;
  last_name: string;
}

export interface GroupType {
  avatar_color?: string;
  members_count: number;
  friends?: User[];
  closed: boolean;
  name: string;
  id: number;
}

export interface GetGroupsResponse {
  data?: GroupType[];
  result: 1 | 0;
}
