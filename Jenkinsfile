pipeline {
    // Executa no agente local do Jenkins.
    agent any

    environment {
        APP_HOST = 'localhost'
        APP_PORT = '8081'
        IMAGE_NAME = 'minha-app-node-local'
        CONTAINER_NAME = 'app-container-local'
    }

    stages {
        stage('CI: Build & Test') {
            steps {
                script {
                    docker.image('node:18-slim').inside {
                        sh 'export npm_config_cache=$(pwd)/.npm-cache && npm install && npm test'
                    }
                }
            }
        }

        stage('Docker: Build Local') {
            steps {
                sh 'docker build -t ${IMAGE_NAME} .'
            }
        }

        stage('Docker: Run Localhost') {
            steps {
                sh """
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p 127.0.0.1:${APP_PORT}:3000 ${IMAGE_NAME}
                """
            }
        }
    }
}
