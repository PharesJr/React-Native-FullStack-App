import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.phairu.aora-testapp",
  projectId: "673b29f9003dc9141061",
  databaseId: "673b2c25000311cbec01",
  userCollectionId: "673b2c4f0001679b5882",
  videoCollectionId: "673b2c8000178552b338",
  storageId: "673b2eac0020ac4edf4e",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client); //instance of an account (appwrite auth)
const avatars = new Avatars(client);
const databases = new Databases(client); //instance of a database (appwrite database)

// Function to create a user
export const createUser = async (
  email: string,
  password: string,
  username: string
): Promise<any> => {
  // Register User
  try {
    const newAccount = await account.create(
      ID.unique(), // Unique ID
      email, // User email
      password, // User password
      username // User username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);

    // Use error.message if available, otherwise return the entire error object
    throw new Error((error as any).message || "Failed to create user");
  }
};

// Function to Sign In a User
export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.error("Error signing in user:", error);

    // Use error.message if available, otherwise return the entire error object
    throw new Error((error as any).message || "Failed to sign-in user");
  }
};

//Function to get the current User
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

//Function to fetch all Posts

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    console.error("Error getting Posts:", error);

    // Use error.message if available, otherwise return the entire error object
    throw new Error((error as any).message || "Failed to get posts");
  }
};
