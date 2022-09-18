import { gql } from '@apollo/client';

export const REPOSITORIES = gql`
    query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
            totalCount
            edges {
                node {
                    id
                    fullName
                    ownerAvatarUrl
                    description
                    language
                    stargazersCount
                    reviewCount
                    ratingAverage
                    forksCount
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
`;

export const ME = gql`
    query me {
        me {
            username
            id
        }
    }
`;

export const MY_REVIEWS = gql`
    query myReviews {
        me {
            reviews {
                edges {
                    node {
                        id
                        rating
                        createdAt
                        text
                        user {
                            username
                        }
                        repository {
                            id
                            fullName
                        }
                    }
                }
            }
        }
    }
`;

export const REPOSITORY = gql`
    query repository($repositoryId: ID!, $first: Int, $after: String) {
        repository(id: $repositoryId) {
            id
            fullName
            ownerAvatarUrl
            description
            language
            stargazersCount
            reviewCount
            ratingAverage
            forksCount
            url
            reviews(first: $first, after: $after) {
                edges {
                    node {
                        id
                        rating
                        createdAt
                        text
                        user {
                            username
                        }
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
            }
        }
    }
`;