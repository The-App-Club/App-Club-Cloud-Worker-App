import 'isomorphic-fetch';
// https://qiita.com/thim/items/c808e089d7b227ff6e2f
import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";

// https://www.apollographql.com/docs/react/get-started/#2-initialize-apolloclient
const client = new ApolloClient({
  uri: "https://apollo-something-an.a.run.app/graphql",
  cache: new InMemoryCache(),
});

(async () => {
  const {data} = await client.query({
    query: gql`
      query a {
        countries {
          code
          name
        }
      }
    `,
  });
  console.log(data);
})();
