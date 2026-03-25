pipeline {
    agent any

    environment {
        // REPLACE THIS WITH YOUR DOCKER HUB USERNAME
        DOCKER_HUB_CREDS_ID = 'docker-hub-credentials'
        DOCKER_HUB_USERNAME = 'yourdockerhubusername'
        IMAGE_REPO_NAME     = 'connectado-outlook-ui'
        STACK_NAME          = 'connectado_stack'
    }

    stages {
        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Set Image Tag') {
            steps {
                script {
                    // Generate tag: branchname-buildnum (e.g., prod-45)
                    env.IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                    env.FULL_IMAGE_NAME = "${DOCKER_HUB_USERNAME}/${IMAGE_REPO_NAME}:${env.IMAGE_TAG}"
                    echo "Starting Build for Image: ${FULL_IMAGE_NAME}"
                }
            }
        }

        stage('Build Image') {
            steps {
                sh "docker build -t ${env.FULL_IMAGE_NAME} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS_ID}", usernameVariable: 'HUB_USER', passwordVariable: 'HUB_PASS')]) {
                    sh """
                    echo \$HUB_PASS | docker login -u \$HUB_USER --password-stdin
                    docker push ${env.FULL_IMAGE_NAME}
                    """
                }
            }
        }

        stage('Deploy to Docker Swarm') {
            steps {
                // Deploys the newly generated tag dynamically without hardcoding docker-compose.prod.yml
                sh """
                export IMAGE_NAME=${env.FULL_IMAGE_NAME}
                docker stack deploy -c docker-compose.prod.yml ${STACK_NAME}
                """
            }
        }

        stage('Cleanup Old Tags from Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS_ID}", usernameVariable: 'HUB_USER', passwordVariable: 'HUB_PASS')]) {
                    sh """
                    # Authenticate with Docker Hub v2 API to get a Bearer Token for deletion
                    TOKEN=\$(curl -s -H "Content-Type: application/json" -X POST -d '{"username": "'"\$HUB_USER"'", "password": "'"\$HUB_PASS"'"}' https://hub.docker.com/v2/users/login/ | grep -o '"token":"[^"]*' | cut -d'"' -f4)

                    if [ -n "\$TOKEN" ] && [ "\$TOKEN" != "null" ]; then
                        echo "Successfully authenticated to Docker Hub API."
                        
                        # Retrieve all tags starting with the branch name (e.g., "prod-")
                        # (Note: Using grep and string manipulation to avoid requiring 'jq' to be installed)
                        TAGS=\$(curl -s -H "Authorization: JWT \$TOKEN" "https://hub.docker.com/v2/repositories/\$HUB_USER/${IMAGE_REPO_NAME}/tags/?page_size=100" | grep -o '"name":"[^"]*' | cut -d'"' -f4 | grep "^${env.BRANCH_NAME}-")
                        
                        # Sort the tags by build number (descending) and get everything from the 3rd tag onwards (skipping the newest 2)
                        OLD_TAGS=\$(echo "\$TAGS" | awk -F'-' '{print \$NF, \$0}' | sort -nr | awk '{print \$2}' | tail -n +3)
                        
                        for TAG in \$OLD_TAGS; do
                            echo "Deleting old tag from Docker Hub: \$TAG"
                            curl -s -X DELETE -H "Authorization: JWT \$TOKEN" "https://hub.docker.com/v2/repositories/\$HUB_USER/${IMAGE_REPO_NAME}/tags/\$TAG/"
                        done
                    else
                        echo "Warning: Failed to authenticate to Docker Hub API to clean up tags."
                    fi
                    """
                }
            }
        }
    }
    
    post {
        always {
            // Logout locally and prune local leftover images to keep Jenkins clean
            sh "docker logout"
            sh "docker image prune -a -f --filter 'until=24h' || true"
        }
        success {
            echo "Successfully built, pushed to Hub, and deployed connectado-outlook-ui!"
        }
        failure {
            echo "Deployment failed. Check the logs."
        }
    }
}
