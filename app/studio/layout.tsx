export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body > header,
            body > footer {
              display: none !important;
            }

            body > main {
              min-height: 100vh !important;
            }
          `,
        }}
      />
      {children}
    </>
  )
}
