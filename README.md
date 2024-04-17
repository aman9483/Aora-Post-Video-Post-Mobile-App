Aora Video App
Aora Video App is a React Native application for creating, sharing, and discovering videos. It leverages the Appwrite backend for user authentication, video storage, and database management.

Features
User authentication and session management powered by Appwrite.
Upload, store, and manage videos using the Appwrite Storage API.
Explore trending and latest videos.
Search for videos by title.
User-friendly interface for creating and sharing videos.
Technologies Used
React Native
Appwrite (Backend as a Service)
Expo (for development and deployment)
ImagePicker (for selecting images and videos from device)
Installation
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js installed on your local machine.
Expo CLI installed globally: npm install -g expo-cli.
An Appwrite server set up with the necessary collections and permissions.
Installation Steps
Clone the repository:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd aora-video-app
Install dependencies:

bash
Copy code
npm install
Start the Expo development server:

bash
Copy code
npm start
Follow the instructions in the Expo development server to launch the app on an emulator or a physical device.

Configuration
Before running the app, you need to configure the following settings:

Appwrite Configuration: Update the config object in lib/appwrite.js with your Appwrite endpoint, project ID, database IDs, and collection IDs.
Usage
Launch the app on an Android or iOS emulator, or on a physical device using the Expo Go app.
Sign up or log in to access the app features.
Upload videos, explore trending and latest videos, and interact with other users' content.
Demo Videos
Authentication Demo
Video Upload Demo
Search Feature Demo
Temporary Login Credentials
To test the app features without signing up, you can use the following temporary login credentials:

Username: demo@example.com
Password: demo1234
Contributing
Contributions are welcome! If you'd like to contribute to this project, feel free to fork the repository and submit a pull request.

License
This project is licensed under the MIT License.
