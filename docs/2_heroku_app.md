# Heroku Web App Deployment

[Heroku](https://www.heroku.com/) was utilized to deploy the web app.

### Input to Heroku App
This output file, **`model.pkl`** is the input to the Heroku app.
Upgrades to the model can be input to the web app simply by replacing the model.pkl file in 'models' with a newer version exported from the models' jupyter notebook.

### Web app
A web app to host and dispoaly the skin classifier deep learningmodel was built using flask as the server and react as the front end framework. 
minor changes  needed to be made to the paths in 'app.py' to successfully deploy to Heroku - these are indicated with commented out code in app.py.

### The app was deployed to Heroku in a Docker container and how to go about this depends on whether you have Docker installed in your local machine. 

### With docker installed
```
    docker build -t app .
    docker run -it app -p 5000:5000
```

### Without Docker installed
manually create a Dockerfile. A Dockerfile instructs Docker how to build the app:
```python
    FROM python:3.6-slim-stretch

    RUN apt update && \
        apt install -y python3-dev gcc

    # sets working directory
    WORKDIR app 

    ADD requirements.txt .
    RUN pip install -r requirements.txt
    ADD models models
    ADD src src

    # Run it once to trigger resnet download
    RUN python src/app.py prepare

    # Start the server
    CMD ["python", "src/app.py", "serve"]
```

## Heroku Setup 
If you don't have a Heroku account, create one here: [www.heroku.com](https://www.heroku.com/).  Each line can be copied and submitted.  
``` 
    wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh
    heroku login
```

## Heroku deployment with docker installed
```
    heroku container:login
    APP_NAME="Skin-lesion-web-classifier"
    heroku create $APP_NAME

    heroku container:push web --app ${APP_NAME}

    heroku container:release web --app ${APP_NAME}
    heroku open --app $APP_NAME
    heroku logs --tail --app ${APP_NAME}
```
## Heroku deployment without Docker installed (https://devcenter.heroku.com/articles/build-docker-images-heroku-yml)
First create a heroku.yml file and place in app's root directory. This insructs heroku to build the app in a Docker container using the instructions in the dockerfile.
```
    build:
    docker:
        web: Dockerfile
```
This is a very simple heroku yml but adequate for our porposes. Further instructions on creating heroku.yml files is found here (https://devcenter.heroku.com/articles/build-docker-images-heroku-yml).
Make sure you have added and committed all files to github. Then, 
```
    APP_NAME="Skin-lesion-web-classifier"
    heroku create $APP_NAME

    git push heroku master
```

Login to Heroku web platform and it should open with the new app being built. Click 'open app' when its finished building to view the app under https:$App_Name.heroku.com

## Mobile app
As yet I have not created amobile app, but the web app is fully responsive and can be viewed and used from any device. 
 

