import Head from "next/head"

export default function GitlabSelfManagedSlackIntegrations() {
  return (
    <>
      <Head>
        <title>GitLab Self-Managed Slack Integrations</title>
        <meta
          name="description"
          content="Learn how to set up Slack integrations for GitLab self-managed instances"
        />
      </Head>
      <h1>GitLab Self-Managed Slack Integrations</h1>
      <p>
        This is a tutorial on how to set up Slack integrations for GitLab self-managed instances.
      </p>
    </>
  )
}

export async function getServerSideProps({ res }) {
  res.setHeader("Location", "/blog/p/gitlab-cicd-pipeline-slack-notifications")
  res.statusCode = 301
  res.end()

  return {
    props: {},
  }
}
