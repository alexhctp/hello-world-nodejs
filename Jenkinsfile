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
                sshagent(['ssh-producao-oci']) {
                    sh """
                        # 1. Preparar a pasta no destino (limpar arquivos antigos para evitar conflito de permissão)
                        ssh -o StrictHostKeyChecking=no ubuntu@${IP_PRODUCAO} 'sudo rm -rf /home/ubuntu/app && mkdir -p /home/ubuntu/app'

                        # 2. Copiar apenas o necessário (ignorando a pasta .git e node_modules local)
                        # Usamos tar para empacotar e desempacotar via SSH, é mais rápido e preserva permissões
                        tar --exclude='.git' --exclude='.npm-cache' -czf - . | ssh -o StrictHostKeyChecking=no ubuntu@${IP_PRODUCAO} 'tar -xzf - -C /home/ubuntu/app'
                
                        # 3. Executar o build e run na Instância B
                        ssh -o StrictHostKeyChecking=no ubuntu@${IP_PRODUCAO} '
                            cd /home/ubuntu/app
                            sudo docker build -t minha-app-node .
                            sudo docker rm -f app-container || true
                            sudo docker run -d --name app-container -p 80:3000 minha-app-node
                        '
                    """
                }
            }
        }
    }
}
