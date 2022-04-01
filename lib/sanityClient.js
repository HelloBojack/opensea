import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'ja1mx8gv',
  dataset: 'production',
  apiVersion: '1',
  token:
    'skc7U5BUvXpxgRdr7E8s41RZVN8FHhJoWTipyNgOxskovsDHQhXzdl9rbI8O83a71G6XfUBwmC1HPOB4cn0AzOR8RVEdgvn1BdJSaRrFVPeotY6dF7NdC2rcrDoZVEeABN8XRV7Vzm6cqgXqVvjvuewPGPHnQty4b4QfEK6tAttRijWZyHG5',
  useCdn: false,
})
