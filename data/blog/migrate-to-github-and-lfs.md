---
title: Git migration to Github and LFS
tags: [tech, migration, productivity, git, hacks]
date: 2020-07-22
draft: false
summary:
images: ['/static/images/github-teams.png']
canonicalUrl: https://vinayakg.dev/migrate-to-github-and-lfs
---

Last week my team wanted to migrate from a big git provider to github and I thought I will record the setup here to enable any thriving startup to adopt and leverage the same for their teams.

### Background

[Git](https://en.wikipedia.org/wiki/Git) is so ubiquitous that it has become synonymous with [source code version control systems](https://en.wikipedia.org/wiki/Comparison_of_version-control_software) that developers of today seldom remember that other options exist (I'm one of the black-sheep! ). I had used Subversion and Visual Source Safe (VSS) but I was looking for [Distributed Version Control Systems](https://www.atlassian.com/blog/software-teams/mercurial-vs-git-why-mercurial). I am yet to try [Mercurial](https://www.mercurial-scm.org/) and got very [good feedback about](https://www.joelonsoftware.com/2013/03/11/town-car-version-control/).

When it comes to choosing a provider, many DevOps(system administrators) would suggest hosting and managing source code version control (git) servers on their own. They also claim that by doing this, you get to optimise the costs and have unlimited repositories (lots of unorganized code).
Unless you are a big corporate (you need to protect your IP) or a company that needs to guard its trade secret against every possible entity and also control the cost of managing them (yes, uptime and no data loss and security - it can get expensive)- I would not recommend this practice.

Also, every employee in a company needs to remember their core mission, the 'raison d'être'. If your core mission is not to manage VCS servers and maintain uptime, hire someone proficient in that.

Also, Github now allows private unlimited repositories for teams of any size [free](https://github.com/pricing) USD 0/month with 2000 hours of Github Actions. So the cost-effectiveness/saving (not known till you lose data with self-hosted) is not an argument anymore. You don't get branch protection since it's available only for the paid version USD 4/month.

Github is the default choice for many. Personally, for me, it was the tooling, ubiquity, community and ecosystem and the many new initiatives like storing the code in [Arctic](https://archive.github.com) which demonstrated how deeply they care about their core business.

### Migration

Coming to migration, Github offers a very simple UI led workflow to move from any other git provider. You can visit this [url](https://github.com/new/import) and follow the steps and voila! You are done. You need a read-only user from the provider you want to move from and may follow this for all the projects you want to move over. Depending on the number of repositories and size of the repositories (including files/no of commits, file size etc.) - the complete setup process would consume very less of your time.

For command-line engineers, you may try the below steps

- Get a list of repositories from your current provider - most big providers have a REST endpoint, then for each repository
  - - Clone locally
    - Create an empty repository with the same name on github.com (create the folder and do hub create and push repository)
    - Go to the root location of this repository
    - Now add remote origin of the new provider
    - Push the repository branch wise

Here is a small [script](https://gist.github.com/vinayakg/45160e15c8d70e410ec1b42787481ee1) (untested, so please make sure before using it) for bitbucket.

I tried the same and this is what I observed:

The migration ran fine for most of the repositories except for a few of them, where it started throwing errors as seen below.

### Issues & Learnings

For one of the repositories, I got the below error.

```bash
Enumerating objects: 61082, done.
Counting objects: 100% (61082/61082), done.
Delta compression using up to 8 threads
Compressing objects: 100% (24307/24307), done.
Writing objects:  12% (7863/61082), 30.45 MiB | 88.00 KiB/s
Writing objects:  12% (7863/61082), 34.26 MiB | 78.00 KiB/s

Writing objects:  13% (8421/61082), 78.02 MiB | 56.00 KiB/s
Writing objects: 100% (61082/61082), 259.67 MiB | 194.00 KiB/s, done.
Total 61082 (delta 38055), reused 58740 (delta 35901), pack-reused 0
remote: Resolving deltas: 100% (38055/38055), done.
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
remote: error: Trace: 73b6e8252aa0d89378555a8c60e58609
remote: error: See http://git.io/iEPt8g for more information.
`remote: error: **File application/logs/log-2018-08-18.log is 227.92 MB;** this exceeds GitHub's file size limit of 100.00 MB`
To gh:TEAM/private-html.git
 ! [remote rejected]     master -> master (pre-receive hook declined)
error: failed to push some refs to 'gh:TEAM/private-html.git'
```

As you can see, there was an error and the repository did not get pushed. When I tried to locate the file, the path was not found. I was surprised as to why the git behaved this way. Before I tried to search the internet for help, it dawned on me that git is a version control system and you can rollback/checkout to any version you like using the commit-id. Then I understood that these files were from previous commits and I was on the latest commit, so I wouldn't be able to see them.

Also, this file made it to the previous version control system since such limits did not exist in that provider.
Note - Providers have different limits on file sizes when it comes to considering files under git lfs. I verified this by cloning the repository from an old provider and I did not see any git-lfs status. Also, there wasn't any additional information about this on the settings page of the provider.

This would happen for any github repository under free plan, since Github only allows files smaller than 100MB, aka meet [git-lfs](https://docs.github.com/en/github/managing-large-files/about-git-large-file-storage). So my next reaction was to upgrade to a paid plan.

Essentially, git-lfs enables you to reduce your git clone and git fetch/pull size by using pointers to the remote git lfs server. Essentially you only download the large file when you `git checkout` that large file, till then it's just a pointer. This is needed since, git stores the entire history of all the commits inside .git folder like a graph. So any changes to larger files are copied in your .git which increases your downloads and disk size. In a nutshell, git-lfs lets you download them lazily. More details [here](https://www.atlassian.com/git/tutorials/git-lfs).

I wanted to run an experiment and see I can delete these unnecessary files permanently before I upgrade.

Here are the easy steps to delete the files from history

```bash
git clone REPO_LOCATION # Clone the repository, use git clone -b REPO_LOCATION
git remote rm origin # Remove the origin
git filter-branch --index-filter 'git rm --cached --ignore-unmatch application/logs/log-2018-08-18.log' HEAD # delete the file and rewrite the history
git reflog expire --expire=now --all && git gc --prune=now --aggressive # Remove garbage and lingering files
git remote add origin REMOTE_LOCATION# Add the github origin here
git push origin master
```

This has to be done for all the branches that you need, individually else your other branches will have the same error as seen above.

### SETUP

Since this was a fresh instance of the repositories on a new provider, I had the chance to set up 2-factor authentication by default for all users.

Security always comes first!
When you set up 2-factor authentication, you need the Personal Access Tokens or use ssh config, for the same github login password wouldn't authenticate.

If you're keen on using the Personal access token, you may generate one from the link [here](https://github.com/settings/tokens). It is similar to App Passwords on most services supporting 2FA.

If you decide to go by SSH for git access, you may refer to one of my previous [article](https://vinayakg.dev/staying-sane-using-multiple-git-accounts).

#### Access & Roles

I believe every developer in the org should have read access to all the repositories. And then, they can read and request for write access once they are ready with a PR.

Write access is granted to developers who need to commit changes to certain repositories, else it's read.

On a very high level, in any organization, one can divide various teams as represented in the picture. Once you have done that, it becomes easy to manage access across projects.

![github-teams.png](../static/images/github-teams.png)

It's important to keep in mind that, while granting an access/invite for a new user, you just need to select the groups you'd want the developer to be included in. This process will help you streamline the access procedure and maintain visibility on write access.

I personally prefer using a separate user (under build-automation) for CI/CD purposes. This makes it visible and can be rolled back/changed and tracked easily.

### TOOLS

I have been using these tools for quite some time now and I have my list of tools that help me remain productive every day. Sharing some of them with you below!

#### Trailer

[This tool](https://github.com/ptsochantaris/trailer) helps me look at all the pull requests status at one glance from the MAC status bar. It also lets me filter the repository/individual names and works like a charm. No more hopping between multiple repositories as it supports multiple accounts and multiple providers too.

![Trailer_git.png](../static/images/Trailer_git.png)

#### VS Code Pull Request Github

[This tool](https://github.com/microsoft/vscode-pull-request-github) Helps me to review PR's like a ninja using VS Code. I have also configured keyboard shortcuts to use up and down arrows within the editor to move between diffs and for switching between side by side and inline diffs. I find reviewing code on github.com very limiting since reviewing on the web can never be a first-class experience and I'm someone who likes to download the code and then review it.

The topic of code review and PR review and process is interesting! It deserves a blog of its own - and I'm definitely writing one about it shortly!

### Closing thoughts

- Understand your business domain and focus on what is core to your business
- Pick the right tool for the right job, use what makes everyone comfortable
- Maintain the right access pattern for your team - that has visibility and freedom
- Don't settle with a workflow/tool till you feel there could be something better

### Next Steps

- Leverage github actions to configure static analysis/linters on Pull Request/commit
- Use github actions to find [secrets](https://github.com/marketplace/actions/gitleaks) before they get discovered online and abused on PR/commit
- Leverage [Phabricator](https://www.phacility.com/phabricator/) to streamline code reviews and also use the workboards

### References

https://medium.com/collaborne-engineering/how-to-migrate-a-private-repository-from-bitbucket-to-github-6cddedd5d73

https://chrisshort.net/permanently-remove-any-record-of-a-file-from-git/

https://stackoverflow.com/questions/49018053/how-large-does-a-large-file-have-to-be-to-benefit-from-git-lfs

https://www.atlassian.com/git/tutorials/git-lfs

https://github.com/sdras/awesome-actions
