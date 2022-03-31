import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'du4084a4',
  dataset: 'production',
  apiVersion: '2022-03-31',
  token:
    'skbEGDUgFkKRVLuQEG82TjUWefKdO8seNeefHUe67GCRtBl6QsPTnUJhw0AEfh29O8CBotdIp0lrMyGjAvKSWa6CsunOrVNa2ptHyHM9LebHY86Ce7GigXEeZu7MdcffisXl0CmaoKTkUXoGnAuZ8oP2MbyEL8dSRhNTkIfq3eWLn7g3Bink',
  useCdn: false,
})
