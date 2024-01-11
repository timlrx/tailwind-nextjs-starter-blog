const Projects = () => {
  const projects = [
    {
      name: '🚀 React Hooks + Next.js + Egg.js + MySql + GraphQL + Ant Design 全栈博客',
      type: 'github',
      description: [
        `React
        Next
        TypeScript
        Webpack
        Egg.js
        TSLint`,
      ],
    },
    {
      name: '🎉 Personal Website',
      type: 'Frontend Development',
      description: ['Built personal website using React and TypeScript, enhanced with TailwindCSS'],
    },
    {
      name: '🌎 舆情获取及分析系统：Public opinion acquisition and analysis system.',
      type: 'Graduation Project',
      description: [
        '使用 uniapp 和 Serverless 的全栈舆情分析软件，包含自然语言分析、自动爬虫、一键登录、赞评等模块。',
        '构建为 web 、小程序、移动端应用。',
      ],
    },
  ]

  return (
    <>
      <div>
        {projects.map((project) => (
          <div key={project.name}>
            <h4>
              <div className="font-extrabold">{project.name}</div>
              <div className="text-gray-500">{project.type}</div>
            </h4>
            <ul>
              {project.description.map((description) => (
                <li key={description} className="text-sm">
                  {description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default Projects
