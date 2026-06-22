import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(
  "mongodb://homerent:o4y2iQQqG8lbS3fe@ac-e4xdnak-shard-00-00.6gc1gdz.mongodb.net:27017,ac-e4xdnak-shard-00-01.6gc1gdz.mongodb.net:27017,ac-e4xdnak-shard-00-02.6gc1gdz.mongodb.net:27017/?ssl=true&replicaSet=atlas-mlqfzw-shard-0&authSource=admin&appName=Cluster0"
);

const db = client.db("HouseRent");

export const auth = betterAuth({
  
    baseURL: process.env.BETTER_AUTH_URL, 
    
  database: mongodbAdapter(db),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "tenant",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
    },
  },
});