# CMPUT-404-Project  
CMPUT 404 Fall 2016 Team Project  
Based on Abram Hindle's CMPUT404-project-Project: 
https://github.com/abramhindle/CMPUT404-project-socialdistribution  
 https://github.com/abramhindle/CMPUT404-project-socialdistribution/blob/master/project.org  
Contributors:  
-Wentai Du  
-Jinglong Zhao  
-Ziying Li  
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
# Supper user
python manage.py createsuperuser

# Deployed Server

Frontend: https://socialdistribution-t02.herokuapp.com

Backend:https://ourbackend.herokuapp.com


# API

Docs:https://ourbackend.herokuapp.com/docs/

# REFERENCE
https://mui.com/zh/getting-started/usage/
//The layout is inspired by https://weibo.com/
https://www.sioe.cn/yingyong/yanse-rgb-16/
https://stackoverflow.com/questions/60969224/how-to-override-muipaper-root-style-in-material-table
https://www.w3.org/Style/Examples/007/color-bullets.zh_CN.html
https://www.tutorialguruji.com/javascript/materialui-how-to-overwrite-styles-of-nested-mui-component/
