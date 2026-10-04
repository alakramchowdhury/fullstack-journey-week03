/* =====================================================================
   DAY 20 · js/tracks-data.js · The tabs' content, and nothing else
   ---------------------------------------------------------------------
   A module that only exports data. To add a tab, add an object here.
   ===================================================================== */

export const tracks = [
  {
    id: 'frontend',
    title: 'Frontend',
    months: 'Months 1–2',
    summary: 'Build interfaces people enjoy using, from the first HTML tag to React components.',
    topics: ['Semantic HTML and CSS', 'JavaScript and the DOM', 'TypeScript', 'React and Next.js'],
  },
  {
    id: 'backend',
    title: 'Backend',
    months: 'Month 3',
    summary: 'Write the server side: APIs that check their input, talk to a database and handle errors.',
    topics: ['Node.js and Express', 'REST API design', 'Validation with Zod', 'Error handling'],
  },
  {
    id: 'database',
    title: 'Databases',
    months: 'Months 3–4',
    summary: 'Store data safely and query it fast with PostgreSQL and Prisma.',
    topics: ['Tables and relations', 'SQL joins', 'Indexes', 'Transactions'],
  },
  {
    id: 'deploy',
    title: 'Deploy',
    months: 'Months 4–5',
    summary: 'Ship real software with containers, pipelines and monitoring.',
    topics: ['Git workflows', 'Docker', 'CI/CD pipelines', 'Monitoring'],
  },
];
