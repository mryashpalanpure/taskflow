pipeline {
    agent any
    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Add .env file to the jenkins') {
            steps {
                withCredentials([
                    file(credentialsId: 'backend ki .env', variable: 'SERVER_ENV'),
                    file(credentialsId: 'frontend ki .env', variable: 'CLIENT_ENV')
                ]) {
                    sh '''
                    rm -f server/.env client/.env
                    cp "$SERVER_ENV" server/.env
                    cp "$CLIENT_ENV" client/.env
                    chmod 644 server/.env client/.env
                    '''
                }
            }
        }

        stage('Testing') {
            steps {
                dir('server') {
                    echo "This is a testing stage"
                    sh 'npm install'
                    sh 'npm test'
                    echo "Your Code is successfully tested now push it to the production"
                }
            }
        }

        stage('Building the code') {
            steps {
                sh 'docker compose up -d --build'
            }
        }

        stage('Pushed the image to the docker hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'HubCredential',
                    usernameVariable: 'dockerhubuser',
                    passwordVariable: 'dockerhubpass'
                )]) {
                    sh 'echo "$dockerhubpass" | docker login -u "$dockerhubuser" --password-stdin'
                    sh 'docker push $dockerhubuser/taskfrontend:latest'
                    sh 'docker push $dockerhubuser/taskbackend:latest'
                }
            }
        }
    }
}