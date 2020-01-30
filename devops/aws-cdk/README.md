# AWS CDK for SiteMinder IaaS

This CDK will setup the following infrastruture:
* IAM user for Serverless 

The rest will be done by serverless cli, so not much here  

### Walkthrough 
The stack is defined in [lib/aws-cdk-stack.ts](https://github.com/mitni455/siteminder/blob/master/devops/aws-cdk/lib/aws-cdk-stack.ts)

This will perform 3 tasks:
1. Create a User in IAM 
```typescript
  /**
   * Create IAM User 
   */
  const user = new iam.User(this, userName, {
      userName,

  });
```

2. Gives the user Admin rights 
```typescript
    /**
     * Add Admin policy to user 
     */
    // user.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('policy/AdministratorAccess'));
    user.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'));
    //arn:aws:iam::aws:policy/AdministratorAccess
```

3. Creates an access key on the fly for this user so serveless can use the access key from cli 
```typescript
  /**
   * Create an Access Key
   */
  const accessKey = new iam.CfnAccessKey(this, accessKeyName, {
      userName: user.userName,
  });
```

To deploy the stack we:
1. Build `yarn run build`
2. Deploy `cdk deploy`

To tear down and remove
1. Destroy `cdk destroy`




## Useful commands

The `cdk.json` file tells the CDK Toolkit how to execute your app.

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
