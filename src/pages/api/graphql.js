import {ApolloServer} from "apollo-server-micro";
import {PrismaClient} from "@prisma/client";
import {gql} from "@apollo/client";

const prisma = new PrismaClient();

const typeDefs = gql`
    type User {
        id: Int
        name: String
        email: String
    }
    
    type Post {
        id: Int
        title: String
        content: String
        published: Boolean
        author: User
    }
    
    type Query {
        users: [User]
        posts: [Post]
    }
    
    type Mutation {
        createPost(title: String!, content: String!, authorId: Int!): Post
        createUser(name: String!, email: String!, password: String!): User
    }
`;

const resolvers = {
    Query: {
        users: () => prisma.user.findMany(),
        posts: () => prisma.post.findMany({include: {author: true}}),
    },
    Mutation: {
        createPost: (_, {title, content, authorId}) => {
            return prisma.post.create({
                data: {
                    title,
                    content,
                    author: {connect: {id: authorId}}
                }
            });
        },
        createUser: (_, {name, email, password}) => {
            return prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            });
        }
    }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
    await startServer;
    await apolloServer.createHandler({path: "/api/graphql"})(req, res);
}

export const config = {
    api: {
        bodyParser: false
    }
}