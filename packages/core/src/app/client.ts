import { createClient } from 'urql';

const authToken = (window as any).storeFrontToken! as string;

/**
 * Creates a client for the store front GraphQL API.
 * Either import directly, or utilise via useQuery which is available due to
 * the GraphQLProvider in CheckoutApp.tsx
 * @example
 * import client from './path/to/client';
 * const data = await client.query(query);
 * @example
 * import { useQuery } from 'urql';
 * const [result] = useQuery({ query });
 * const { data, fetching, error } = result;
 */
const client = createClient({
    url: '/graphql',
    fetchOptions: () => {
        return {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };
    },
});

export default client;
