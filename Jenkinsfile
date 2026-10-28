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
                dir('client') {
                    echo "Testing the client"
                    sh 'npm ci'
                    sh 'npm test'
                }
                dir('server') {
                    echo "Testing the server"
                    sh 'npm ci'
                    sh 'npm test'
                }
            }
        }

        stage('Build images') {
            steps {
                sh 'docker compose build'
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
                    sh 'docker push $dockerhubuser/taskflowfrontend:latest'
                    sh 'docker push $dockerhubuser/taskflowbackend:latest'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose pull'
                sh 'docker compose up -d'
            }
        }
    }
}