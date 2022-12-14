export interface RootContainerId {
  displayDescription: string;
  deploymentDate: string;
  displayName: string;
  name: string;
  description: string;
  deployedBy: string;
  id: string;
  activationState: string;
  version: string;
  configurationState: string;
  last_update_date: string;
  actorinitiatorid: string;
}

export interface iListTackHumanUserId {
  displayDescription: string;
  executedBy: string;
  rootContainerId: RootContainerId;
  assigned_date: string;
  displayName: string;
  executedBySubstitute: string;
  dueDate: string;
  description: string;
  type: string;
  priority: string;
  actorId: string;
  processId: string;
  caseId: string;
  name: string;
  reached_state_date: string;
  rootCaseId: string;
  id: string;
  state: string;
  parentCaseId: string;
  last_update_date: string;
  assigned_id: string;
}
