export interface User {
  first_name: string,
  last_name: string
}

export interface Group {
  avatar_color?: string,
  members_count: number,
  closed: boolean,
  friends?: User[]
  name: string,
  id: number,
}

export interface GetGroupsResponse {
    result: 1 | 0,
    data?: Group[]
  }
