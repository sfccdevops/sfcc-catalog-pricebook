Project Support
===

If you or your company enjoy using this project, please consider supporting my work and joining my discord. 💖

[![Become a GitHub Sponsor](https://img.shields.io/badge/Sponsor-171515.svg?logo=github&logoColor=white&style=for-the-badge "Become a GitHub Sponsor")](https://github.com/sponsors/manifestinteractive)
[![Become a Patreon Sponsor](https://img.shields.io/badge/Sponsor-FF424D.svg?logo=patreon&logoColor=white&style=for-the-badge "Become a Patreon Sponsor")](https://patreon.com/peter_schmalfeldt)
[![Donate via PayPal](https://img.shields.io/badge/Donate-169BD7.svg?logo=paypal&logoColor=white&style=for-the-badge "Donate via PayPal")](https://www.paypal.me/manifestinteractive)
[![Join Discord Community](https://img.shields.io/badge/Community-5865F2.svg?logo=discord&logoColor=white&style=for-the-badge "Join Discord Community")](https://discord.gg/gCNzANdFBx)

------

![Logo](https://sfccdevops.s3.amazonaws.com/logo-128.png "Logo")

SFCC Catalog Pricebook
===

Create Salesforce Commerce Cloud Pricebook XML from Catalog XML

Installation
---

You can install this package via NPM:

```bash
npm install -g @sfccdevops/sfcc-catalog-pricebook
```

Usage
---

The most common usage will look like this:

```bash
sfcc-catalog-pricebook -i /path/to/catalog.xml
```

**FLAGS:**

Name        | Param           | Alias      | Required | Default Value | Definition
------------|-----------------|------------|----------|---------------|---------------------
Input       | `--input`       | `-i`       | Yes      |               | Path to SFCC Catalog XML File
Output      | `--output`      | `-o`       | No       | pricebook.xml | Path to save XML file ( Defaults to Current Directory )
Name        | `--name`        | `-n`       | No       |               | Display Name of Pricebook ( Defaults to Title Cased Catalog Name )
ID          | `--id`          |            | No       |               | ID of Pricebook ( Defaults to Catalog Name )
Description | `--description` | `-d`       | No       |               | Description of Pricebook
Currency    | `--currency`    | `-c`       | No       | USD           | Currency of Pricebook
Min Amount  | `--min-amount`  | `-m`       | No       | 4.99          | Minimum amount generated for a product in the pricebook
Max Amount  | `--max-amount`  | `-x`       | No       | 589.99        | Maximum amount generated for a product in the pricebook

**EXAMPLES:**

```bash
sfcc-catalog-pricebook -i /path/to/catalog.xml

sfcc-catalog-pricebook -i /path/to/catalog.xml --id custom-name

sfcc-catalog-pricebook -i /path/to/catalog.xml -m 1.99 -x 10.99 -c USD
sfcc-catalog-pricebook --input /path/to/catalog.xml --min-amount 1.99 --max-amount 10.99 --currency USD

sfcc-catalog-pricebook -i /path/to/catalog.xml -d 'My Description of Pricebook'
sfcc-catalog-pricebook --input /path/to/catalog.xml --description 'My Description of Pricebook'

sfcc-catalog-pricebook -i /path/to/catalog.xml -n "My Pricebook Display Name"
sfcc-catalog-pricebook --input /path/to/catalog.xml --name "My Pricebook Display Name"

sfcc-catalog-pricebook -i /path/to/catalog.xml -o /path/to/pricebook.xml
sfcc-catalog-pricebook --input /path/to/catalog.xml --output /path/to/pricebook.xml

sfcc-catalog-pricebook -i /path/to/catalog.xml -n "My Pricebook Display Name" -o /path/to/pricebook.xml
sfcc-catalog-pricebook --input /path/to/catalog.xml --name "My Pricebook Display Name" --output /path/to/pricebook.xml
```

Troubleshooting
---

Need help on how to run this tool?  Just run the command without options to see example usage & instruction.

```bash
sfcc-catalog-pricebook
```

About the Author
---

> [Peter Schmalfeldt](https://peterschmalfeldt.com/) is a Certified Senior Salesforce Commerce Cloud Developer with over 20 years of experience building eCommerce websites, providing everything you need to design, develop & deploy eCommerce applications for Web, Mobile & Desktop platforms.

Disclaimer
---

> The trademarks and product names of Salesforce®, including the mark Salesforce®, are the property of Salesforce.com. SFCC DevOps is not affiliated with Salesforce.com, nor does Salesforce.com sponsor or endorse the SFCC DevOps products or website. The use of the Salesforce® trademark on this project does not indicate an endorsement, recommendation, or business relationship between Salesforce.com and SFCC DevOps.
