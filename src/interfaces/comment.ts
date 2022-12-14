export interface iComment {
  processInstanceId: string;
  tenantId: string;
  postDate: string;
  id: string;
  userId: UserId;
  content: string;
}

export interface UserId {
  firstname?: string;
  icon: string;
  creation_date?: string;
  userName: string;
  title?: string;
  created_by_user_id?: string;
  enabled?: string;
  lastname?: string;
  last_connection?: string;
  password?: string;
  manager_id?: string;
  id?: string;
  job_title?: string;
  last_update_date?: string;
}
