pipeline{
    agent any
    stages{
        stage('Cloning the code from the github'){
            steps{
                git url:"https://github.com/mryashpalanpure/taskflow.git" , branch:"main"
            }
        }

        stage('Add .env file to the jenkins'){
            steps{
                withCredentials([
                    file(credentialsId: 'backend ki .env' , variable: 'SERVER_ENV'),
                    file(credentialsId: 'frontend ki .env' , variable: 'CLIENT_ENV')
                ])
                {
                    sh '''
                    cp "$SERVER_ENV" server/.env
                    cp "$CLIENT_ENV" client/.env
                    '''
                }
            }
        }

        stage('Building the code'){
            steps{
                    sh 'docker compose up -d --build'
                }
            }
        }
    }