pipeline {
    agent any

    environment {
        // Defines the tag name for the Docker image and the Swarm stack
        IMAGE_NAME = "connectado-outlook-ui:prod"
        STACK_NAME = "connectado_stack"
    }

    stages {
        stage('Checkout Source') {
            steps {
                // Check out code from configured Git repository
                checkout scm
            }
        }

        stage('Build Production Image') {
            steps {
                // Builds the customized Docker container from Dockerfile
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Deploy to Docker Swarm') {
            steps {
                // Updates the prod swarm with the newly built image using docker-compose.prod.yml
                sh "docker stack deploy -c docker-compose.prod.yml ${STACK_NAME}"
            }
        }
    }
    
    post {
        success {
            echo "Successfully deployed the connectado-outlook-ui to Production Docker Swarm!"
        }
        failure {
            echo "Deployment to Production failed. Please check the logs."
        }
    }
}
