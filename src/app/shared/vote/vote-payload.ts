import { VoteType } from "./vote-type";

export class VotePayload {
    voteType: VoteType | undefined;
    postId: number | undefined;
}