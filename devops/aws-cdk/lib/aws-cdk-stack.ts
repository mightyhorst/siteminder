import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');
import fs = require('fs');

const SERVERLESS_USERNAME = 'serverlessUser';
const SERVERLESS_ACCESSKEY = 'serverlessAccessKey';

/**
 * Create Stack 
 *
 * @export
 * @class AwsCdkStack
 * @extends {cdk.Stack}
 */
export class AwsCdkStack extends cdk.Stack {

    /**
     * Creates an instance of AwsCdkStack and stands up the stack.
     * @param {cdk.Construct} scope
     * @param {string} id
     * @param {cdk.StackProps} [props]
     * @memberof AwsCdkStack
     */
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        /**
         * @summary Run the stack here 
         **/ 
        this.createAdminUser(SERVERLESS_USERNAME, SERVERLESS_ACCESSKEY);
    }


    /**
     * Create IAM Admin User 
     *
     * @param {string} userName
     * @memberof AwsCdkStack
     */
    createAdminUser(userName: string, accessKeyName: string){

        /**
         * Create IAM User 
         */
        const user = new iam.User(this, userName, {
            userName,
            
        });

        /**
         * Add Admin policy to user 
         */
        // user.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('policy/AdministratorAccess'));
        user.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'));
        //arn:aws:iam::aws:policy/AdministratorAccess

        /**
         * Create an Access Key
         */
        const accessKey = new iam.CfnAccessKey(this, accessKeyName, {
            userName: user.userName,
        });

        /**
         * Set CloudFormation Output 
         */
        new cdk.CfnOutput(this, 'accessKeyId', { value: accessKey.ref });
        new cdk.CfnOutput(this, 'secretAccessKey', { value: accessKey.attrSecretAccessKey });

        /**
         * Write Access Key file 
         */
        const json = {
            accessKey: accessKey.ref.toString(),
            secretAccessKey: accessKey.attrSecretAccessKey.toString()
        };
        fs.writeFileSync('./serverless-access-key.updated.txt', JSON.stringify(json, null, 4), 'utf8');

    }
}
