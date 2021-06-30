export default function Analytics() {
  return (
    <div>
      <div className="px-4 bg-white">
        <iframe
          title="Plausible Analytics Dashboard"
          plausible-embed
          src="https://plausible.io/share/nwb.one?auth=1X7LmBpb9mfu6CoaLlS9J&embed=true&theme=system&background=%23FFFFFF"
          scrolling="no"
          frameBorder="0"
          loading="lazy"
          style={{
            width: 1,
            minWidth: '100%',
            height: 1600,
          }}
        ></iframe>
      </div>
      <div
        style={{
          fontSize: 14,
          paddingBottom: 14,
        }}
      >
        Stats powered by{' '}
        <a
          target="_blank"
          style={{
            color: '#4F46E5',
            textDecoration: 'underline',
          }}
          href="https://plausible.io"
          rel="noreferrer"
        >
          Plausible Analytics
        </a>
      </div>
      <script async src="https://plausible.io/js/embed.host.js"></script>
    </div>
  )
}
