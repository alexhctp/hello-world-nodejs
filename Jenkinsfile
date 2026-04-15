pipeline {
    agent {
        label 'oci-agent01' // or 'node-name'
    }

    environment {
        // IP Público da sua Instância B
        IP_PRODUCAO = '136.248.106.160' 
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
    }
}
