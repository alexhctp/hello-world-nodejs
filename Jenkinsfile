pipeline {
    agent any

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

        stage('CD: Deploy em Produção') {
            steps {
                // O plugin sshagent usa a credencial que criamos no Passo 1
                sshagent(['ssh-producao-oci']) {
                    sh """
                        # 1. Copia o código para o servidor de produção
                        scp -o StrictHostKeyChecking=no -r . ubuntu@${IP_PRODUCAO}:/home/ubuntu/app
                        
                        # 2. Comando remoto para Build e Run na Instância B
                        ssh -o StrictHostKeyChecking=no ubuntu@${IP_PRODUCAO} '
                            cd /home/ubuntu/app
                            docker build -t minha-app-node .
                            docker stop app-container || true
                            docker rm app-container || true
                            docker run -d --name app-container -p 80:3000 minha-app-node
                        '
                    """
                }
            }
        }
    }
}
