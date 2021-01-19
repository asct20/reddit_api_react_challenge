# React challenge - Reddit API

This application fetches the top 20 posts from `/r/ProgrammerHumor` and displays them according to the rules of the challenge.

## How to use

1. From the project's folder, run `npm install` then `npm start`.
2. Open a browser and go to `http://localhost:3000`.
3. Initially, you will need to log in to Reddit and give read access to the application. The website will prompt you to do so; follow the instructions.
4. Once logged in, you will be redirected to the application and will be able to view the top posts.
5. You can hit the `Refresh` button on the page to fetch updated data.

The Reddit authentication token is saved to a cookie so you will be able to close and come back to the application without having to log in again. Although it should be noted that the Reddit authentication lasts for one hour, so after that delay you will be prompted to re-authenticate.
