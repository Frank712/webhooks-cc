import { GithubIssuePayload, GithubStartPayload } from "../../interfaces";

export class GithubService {
  constructor() {}

  onStart(payload: GithubStartPayload): string {
    const { sender, action, repository } = payload;
    return `User ${sender.login} ${action} start on ${repository.full_name}`;
  }

  onIssue(payload: GithubIssuePayload): string {
    const { sender, action, repository } = payload;
    switch (action) {
      case "opened":
        return `Issue opened by ${sender.login} in ${repository.full_name}`;
      case "closed":
        return `Issue closed by ${sender.login} in ${repository.full_name}`;
      case "reopened":
        return `Issue reopened by ${sender.login} in ${repository.full_name}`;
      default:
        return `Issue action unknown: ${action}`;
    }
  }
}
