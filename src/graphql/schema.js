import {buildSchema} from 'graphql'

const schema = buildSchema(`
    type Post {
        id:ID


    }
    
`)


export default schema;