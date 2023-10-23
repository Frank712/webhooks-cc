import { Request, Response } from "express";
import { GithubService } from "../services/github.service";

export class GithubController {
  constructor(private readonly githubService = new GithubService()) {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "unknow";
    const signature = req.header("x-hub-signature-256") ?? "unknow";
    const payload: any = req.body;
    let message: string;

    switch (githubEvent) {
      case "star":
        message = this.githubService.onStart(payload);
        break;
      case "issues":
        message = this.githubService.onIssue(payload);
        break;
      default:
        message = `Unknown event ${githubEvent}`;
    }
    console.log(message);
    res.status(202).send("accepted!");
  };
}
