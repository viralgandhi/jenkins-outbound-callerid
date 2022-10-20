pipeline {
    agent any

    stages {
        stage("Serverless") {
            stages {
                stage("Build") {
                    steps {
                        echo "Building..."
                        dir("outbound-callerid-fns") {
                            echo pwd()
                            nodejs("Node-16.18.0") {
                                sh "twilio plugins:install @twilio-labs/plugin-serverless"
                                // sh "npm install"
                            }
                        }
                    }
                }
                stage("Test") {
                    steps {
                        echo "Testing..."
                        dir("outbound-callerid-fns") {
                            echo pwd()
                        }
                    }
                }
                stage("Deploy") {
                    steps {
                        echo "Deploying..."
                        dir("outbound-callerid-fns") {
                            echo pwd()
                            nodejs("Node-16.18.0") {
                                sh "twilio serverless:deploy --username=${TWILIO_ACCOUNT_SID} --password=${TWILIO_AUTH_TOKEN}  --override-existing-project --production"
                                // sh "npm run deploy" 
                            }
                        }
                    }
                }
            }
        }
        stage("Setup") {
            steps {
                echo "Configuring Envronment Post Serverless Deployment"
                script {
                    def matcher = manager.getLogMatcher(".*domain.*")
                    def domain
                    if(matcher.matches()) {
                        env.ONE_CLICK_DEPLOY_BASE_URL = matcher.group(0).replaceAll("\\s+", " ").split(" ")[1]
                    }
                }
                dir("outbound-callerid-fns") {
                    script {
                        if(fileExists(".twiliodeployinfo")) {
                            def twilioDeployInfo = readJSON(file:".twiliodeployinfo");
                            env.ONE_CLICK_DEPLOY_FNS_SERVICE_SID = twilioDeployInfo[TWILIO_ACCOUNT_SID].serviceSid
                        }
                    }
                }
            }
        }
        stage("Flex") {
            stages {
                stage("Build") {
                    steps {
                        sh "printenv | sort"
                        echo "Building..."
                        dir("plugin-outbound-callerid") {
                            echo pwd()
                            nodejs("Node-16.18.0") {
                                sh "twilio plugins:install @twilio-labs/plugin-flex"
                                sh "npm install"
                                //sh "twilio flex:plugins:upgrade-plugin --install"
                                sh "twilio flex:plugins:build"
                            }
                        }
                    }
                }
                stage("Test") {
                    steps {
                        echo "Testing..."
                        dir("plugin-outbound-callerid") {
                            echo pwd()
                        }
                    }
                }
                stage("Deploy") {
                    steps {
                        echo "Deploying..."
                        dir("plugin-outbound-callerid") {
                            echo pwd()
                            nodejs("Node-16.18.0") {
                                sh "twilio flex:plugins:deploy --major --changelog 'One-Click-Deploy' --description 'Sample OOTB Twilio Flex Plugin'"
                                script {
                                    if(fileExists("package.json")) {
                                        packageJSON = readJSON(file:"package.json");
                                    }
                                 }
                                sh "twilio flex:plugins:release --plugin ${packageJSON.name}@${packageJSON.version} --name 'plugin-outbound-callerid' --description 'Releasing outbound Caller Id plugin'"
                            }
                        }
                    }
                }
                stage("Post Deploy") {
                    steps {
                        echo "Post Deployment"
                    }
                }
            }
        }
    }
}