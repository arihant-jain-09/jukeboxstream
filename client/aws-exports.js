/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "ap-south-1",
    "aws_cloud_logic_custom": [
        {
            "name": "streams",
            "endpoint": "https://d01yp3zqae.execute-api.ap-south-1.amazonaws.com/dev",
            "region": "ap-south-1"
        },
        {
            "name": "song",
            "endpoint": "https://up65sdnxjb.execute-api.ap-south-1.amazonaws.com/dev",
            "region": "ap-south-1"
        },
        {
            "name": "likes",
            "endpoint": "https://drivl95k41.execute-api.ap-south-1.amazonaws.com/dev",
            "region": "ap-south-1"
        }
    ],
    "aws_cognito_region": "ap-south-1",
    "aws_user_pools_id": "ap-south-1_tL5jAlcyK",
    "aws_user_pools_web_client_id": "7k2uhu9skigd8njd9dh4pqcs3r",
    "oauth": {
        "domain": "jukebox.auth.ap-south-1.amazoncognito.com"
    },
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": [
            "REQUIRES_LOWERCASE",
            "REQUIRES_UPPERCASE",
            "REQUIRES_NUMBERS",
            "REQUIRES_SYMBOLS"
        ]
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    "aws_dynamodb_all_tables_region": "ap-south-1",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "dominantColors",
            "region": "ap-south-1"
        },
        {
            "tableName": "streams",
            "region": "ap-south-1"
        }
    ],
    "aws_user_files_s3_bucket": "jukeboxstream",
    "aws_user_files_s3_bucket_region": "ap-south-1"
};


export default awsmobile;
