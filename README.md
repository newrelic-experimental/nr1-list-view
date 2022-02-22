[![New Relic Experimental header](https://github.com/newrelic/opensource-website/raw/main/src/images/categories/Experimental.png)](https://opensource.newrelic.com/oss-category/#new-relic-experimental)

[![CI](https://github.com/newrelic-experimental/nr1-list-view/workflows/CI/badge.svg)](https://github.com/newrelic-experimental/nr1-list-view/actions?query=workflow%3ACI) [![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/newrelic-experimental/nr1-list-view?include_prereleases&sort=semver)](https://github.com/newrelic-experimental/nr1-list-view/releases) [![Known Vulnerabilities](https://snyk.io/test/github/newrelic-experimental/nr1-list-view/badge.svg)](https://snyk.io/test/github/newrelic-experimental/nr1-list-view)

# List View

List View is a [custom visualization](https://developer.newrelic.com/explore-docs/custom-viz/) that displays NRQL-queried data in a list. It accepts a NRQL query and a [template](./template.md) for how the data should be displayed, and turns this into a list.

## Features

- Coerce values to number, date and boolean types
- Format numbers and dates
- Convert between digital size types (bytes, kilobytes, ...)
- Search bar to quickly find matching text within the list

Read the [Template String documentation](./template.md) for details.

![list view screenshot](screenshots/screenshot-1.png)

## Getting started

1. Ensure that you have [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [NPM](https://www.npmjs.com/get-npm) installed. If you're unsure whether you have one or both of them installed, run the following command. (If you have them installed these commands will return a version number, if not, the commands won't be recognized.)

   ```bash
   git --version
   npm -v
   ```

2. Install the [New Relic One CLI](https://one.newrelic.com/developer-center) by going to [this link](https://one.newrelic.com/developer-center) and following the instructions (5 minutes or less) to install and set up your New Relic development environment.

3. Run the following command to clone this repository and run the code locally against your New Relic data:

   ```bash
   nr1 nerdpack:clone -r https://github.com/newrelic-experimental/nr1-list-view.git
   cd nr1-list-view
   nr1 nerdpack:serve --mode=prod
   ```

Visit [https://one.newrelic.com/?nerdpacks=local](https://one.newrelic.com/?nerdpacks=local), navigate to the Nerdpack, and :sparkles:

## Deploying this Nerdpack

Open a command prompt in the Nerdpack's directory, and run the following commands.

```bash
# To create a new uuid for the nerdpack so that you can deploy it to your account:
# nr1 nerdpack:uuid -g [--profile=your_profile_name]

# To see a list of APIkeys / profiles available in your development environment:
# nr1 profiles:list

nr1 nerdpack:publish [--profile=your_profile_name]
nr1 nerdpack:deploy [-c [DEV|BETA|STABLE]] [--profile=your_profile_name]
nr1 nerdpack:subscribe [-c [DEV|BETA|STABLE]] [--profile=your_profile_name]
```

## Support

New Relic hosts and moderates an online forum where customers can interact with New Relic employees as well as other customers to get help and share best practices. Like all official New Relic open source projects, there's a related Community topic in the New Relic Explorers Hub. You can find this project's topic/threads here:

https://discuss.newrelic.com/c/build-on-new-relic/nerdpacks

## Contributing
We encourage your contributions to improve List View! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project.
If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company,  please drop us an email at opensource@newrelic.com.

## Security

As noted in our [security policy](../../security/policy), New Relic is committed to the privacy and security of our customers and their data. We believe that providing coordinated disclosure by security researchers and engaging with the security community are important means to achieve our security goals.

If you believe you have found a security vulnerability in this project or any of New Relic's products or websites, we welcome and greatly appreciate you reporting it to New Relic through [HackerOne](https://hackerone.com/newrelic).

## License
List View is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.

List View also uses source code from third-party libraries. You can find full details on which libraries are used and the terms under which they are licensed in the [third-party notices](THIRD_PARTY_NOTICES.md) document.
