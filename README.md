# https://github.com/WentaiDu/socialdistribution 


Contributors:  
-Wentai Du  
-Jinglong Zhao  
-Haoyuan Li  
-Siyuan Wu  
  
External Source Code:     

# Clone and set up the environment  
Use the terminal in the class VM to navigate to the folder where you want to clone this repository, and then run the following command to clone the repository and navigate to the directory:    
git clone https://github.com/WentaiDu/CMPUT-404-Project.git TEAM02  
cd TEAM02  
# Set up the environment    
virtualenv venv --python=python3  
source venv/bin/activate  
pip install -r requirements.txt # install requirements  

# Running
backend:  
Make migrations: python manage.py makemigrations  
Migrate database: python manage.py migrate  
Start the server: python manage.py runserver  
To run tests: python manage.py test  
Use ctrl+left mouse button to click on the URL displayed in the terminal to enter the backend  
frontend:  
cd frontend  
npm install  
npm start  
# Super user  
python manage.py createsuperuser  

# Deployed Server

Due to heroku policy update, the deployments are no longer available.

Frontend: https://socialdistribution-t02.herokuapp.com

Backend:https://ourbackend.herokuapp.com


# Instructions for use:  
we provide a superuser  
Account number: 1  
Password: 1  
First, we need to enter  
https://socialdistribution-t02.herokuapp.com  
Then we can log in directly with the superuser, or choose to register a new user.  
If we choose to register a user, after filling in the corresponding information, we return to the login interface.  
At this time we log in to the superuser.  
After logging in, we can click the third button in the upper right corner to complete the registration of new users by using super permissions.  
Click the first button in the upper right corner to log out.  
At this time, our newly registered users can already use it.  
After successfully logging in, we came to the home page.  
All public posts are displayed on the homepage.  
Clicking on the avatar will bring us to the author's personal information interface  
Clicking on the content of the post will take us to the specific information interface of the post  
At the same time, we can also like, comment, and share these posts  
Of course, we can also like the comments  
Click the second button in the upper right corner to view the list of friends  
Click the fourth button in the upper right corner to add a new post  
Click the four buttons directly above to jump to the homepage, user list, sharing list, and personal homepage respectively  
In the user list, we can choose to follow or send a friend request  
In the sharing list, we can view the posts shared with ourselves  
In the personal homepage, we can modify our own information, and we can also view our own posts, inbox, and stream  

# API

Docs:https://ourbackend.herokuapp.com/docs/

# AJAX Design  
We use Axios extensively. We used Axios for all requests so all of our requests are based on AJAX. Axios is a promise-based asynchronous communication framework that can be used in browsers and node.js; its main function is to achieve AJAX asynchronous communication. We use Axios to call the API provided by the backend to get data.   
The advantage of using axios:  
You can send XMLHttpRequests in the browser  
You can send http requests in node.js  
Intercept request and response  
Convert request data and response data  
Automatically convert JSON data  
Client support to protect security from XSRF attacks  
And the performance has been greatly improved  

# Demo Video
https://drive.google.com/drive/folders/1Ev4enl7woErs53rEP07mmTV5p6JkH-h6?usp=sharing

# REFERENCE
https://mui.com/zh/getting-started/usage/  
//The layout is inspired by https://weibo.com/  
https://www.sioe.cn/yingyong/yanse-rgb-16/  
https://stackoverflow.com/questions/60969224/how-to-override-muipaper-root-style-in-material-table  
https://www.w3.org/Style/Examples/007/color-bullets.zh_CN.html  
https://www.tutorialguruji.com/javascript/materialui-how-to-overwrite-styles-of-nested-mui-component/  

Based on Abram Hindle's CMPUT404-project-Project: 
https://github.com/abramhindle/CMPUT404-project-socialdistribution  
 https://github.com/abramhindle/CMPUT404-project-socialdistribution/blob/master/project.org  
