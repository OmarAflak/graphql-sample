var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        hello(name: String!): String
        random(count: Int): [Float!]
    }
`);

var root = {
    hello: ({name}) => {
        return 'Hello '+name+'!';
    },
    random: ({count}) => {
        var array = [];
        for(var i=0 ; i<(count || 1) ; i++){
            array.push(Math.random());
        }
        return array;
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to http://localhost:4000/graphql'));
