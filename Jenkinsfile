pipeline{
    stages{
        stage('Cloning the code from the github'){
            steps{
                git url:"https://github.com/mryashpalanpure/taskflow.git" , branch:"main"
            }
        }
        stage('Building the code'){
            steps{
                    sh 'docker compose up -d --build .'
                }
            }
        }
    }