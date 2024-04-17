import { Account, Avatars, Client, Databases, ID,Query,Storage, } from 'react-native-appwrite';



export const config = {

    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.Aora.aora',
    projectId: '661ce96d783fce756aa5',
    databaseId: '661ceaf084830e5beeea',
    userCollectionId: '661ceb0ea959397b987f',
    videosCollectionId: '661ceb375efb33160c84',
    storageId: '661cecd4b4b75e69b7d2'
}





// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId) 
    .setPlatform(config.platform) 
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)
const storage = new Storage(client);

// Register user
export async function createUser(email, password, username) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(username);
  
      await SignIn(email, password);
  
      const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Sign In
  export async function SignIn(email, password) {
    try {
      const session = await account.createEmailSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Get Current User
export async function getCurrentUser() {
    try {
      const currentAccount = await account.get();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error('error hai',error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
     config.databaseId,
      config.videosCollectionId,
      [Query.equal("users", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}



export async function uploadFile(file, type) {
  if (!file) return;

  const asset={
    name: file.fileName,
    type: file.mimeType,
    size: file.filesize,
    uri: file.uri,
  };

  console.log('FILE', file);

  try {
  

    const uploadedFile = await storage.createFile(
      
      config.storageId,
      ID.unique(),
      asset
    );

    console.log('UPLOADED', uploadedFile);


    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}


// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}


// Create Video Post
export async function createVideoPost(form) {
  try {
    // Upload the thumbnail and video files
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    // Create a new document in the videos collection
    const newPost = await databases.createDocument(
      config.databaseId,
      config.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumnail: thumbnailUrl, 
        video: videoUrl,
        prompt: form.prompt,
        users: form.userId,
      }
    );

    // Return the newly created post
    return newPost;
  } catch (error) {
    // Handle any errors during the post creation process
    console.error("Error creating video post:", error);
    throw new Error("Error creating video post");
  }
}

