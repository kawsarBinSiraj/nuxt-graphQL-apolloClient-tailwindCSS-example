const queryForGettingPeo = gql`
    query getPeo {
        people {
            name
            image {
                url
            }
        }
    }
`;

export { queryForGettingPeo };
