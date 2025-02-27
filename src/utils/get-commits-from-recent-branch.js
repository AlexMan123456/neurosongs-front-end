function getCommitsFromRecentBranch(commits){
    let branchFound = false;
    const commitsFromBranch = []
    for(const {commit} of commits){
        if(!branchFound && commit.message.includes("Merge pull request #")){
            branchFound = true;
        } else if(branchFound && !commit.message.includes("Merge pull request #")){
            commitsFromBranch.push(commit);
        } else if(branchFound && commit.message.includes("Merge pull request #")){
            break;
        }
    }
    return commitsFromBranch;
}

export default getCommitsFromRecentBranch