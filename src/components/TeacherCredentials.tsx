const credentials = [
  'Over 25 years teaching',
  'Level 2 Iyengar Yoga',
  'STOTT Pilates',
  'Specialist training',
]

export default function TeacherCredentials() {
  return (
    <aside className="teacher-credentials" aria-label="Annie's qualifications and experience">
      <p>Experience &amp; training</p>
      <ul>
        {credentials.map((credential) => <li key={credential}>{credential}</li>)}
      </ul>
    </aside>
  )
}
