# Beckn Protocol Governance

## Current Status

This document is currently a working draft. A larger, global governance model is currently under development and will be released soon.

## Latest Version

Version 0.1.0-draft

## Release History

| Version       |    Released on     |
|---------------|--------------------|
|  0.1.0-draft  |    June, 2021      |

## Purpose of the Document

The purpose of this document is to outline and standardise the following :

-   Accepting contributions to the specification from the community via proposals
-   Outline the proposal review process
-   Evolution of a proposal to a protocol standard

# Abbreviations

|Abbreviation|Meaning|
|-|-|
|CSF|Commentable Specification File|
|BAP|Beckn Application Platform |
|BG|Beckn Gateway |
|BPP|Beckn Provider Platform |
|WG|Working Group |

# Introduction

Beckn is an open protocol that when implemented, enables any business to be discovered and engaged by any consumer application. The implementation of the protocol allow the creation of a fully decentralized open commerce network that has no central platform to concentrate or aggregate transactions. This decentralized approach to e-commerce ensures that the computation is performed at the edges rather than on a central platform. 

This open commerce network acts as a public digital infrastructure that uses existing standards for security, encryption, routing and trust. 

Beckn protocol is maintained via an open community-driven governance model. The community is comprised of multiple businesses and organizations that actively contribute to the specification to fuel their digital acceleration. This collaboration across domains, technologies and expertises will bring in new ideas which need to be part of the protocol. Hence there is a need for a standardised process for making relevant changes to the specification as well and for a retrospective understanding of the specification. This governance model is created using some of the best practices of globally recognized governance models. 

## The Beckn Credo

the beckn community is an open community. So, no registrations. No memberships. No partnerships. Just a minimal footprint of an open and equally accessible Beckn Protocol that anyone can use. Multiple businesses and organizations have started using beckn protocol to fuel their digital acceleration. The credo of being an open protocol creates a level-playing field for any market player, small or large.

### Motivation
At beckn, the goal is simple: to make the internet small-business friendly. Be a force multiplier with minimal footprint. Amplify potential

### Guiding Lights
Open Specs, Equal access. Retain agency of small businesses. Non-Rivalrous, Non-exclusive networks

### Community Driven
Increase value for all participants.  Be a Network Weaver in your own way. Be a contributor of specs and best practices

Beckn Protocol is an open commerce protocol with an abstract core, which is enabling market players to reimagine building seamless digital experiences and networks. This is very similar to how HTTP, while being a simple and open protocol has fueled seamless interaction between multiple systems and led to an explosive growth in internet adoption. 

The core team within Beckn is a lean not-for-profit organization that plays the role of creating this protocol, sharing it as a public good and bringing awareness to this protocol. Beckn is structured so as to simplify and enable community members to self-organize and co-create their own digital playgrounds and networks. The community has been driving growth for themselves as well as for the digital commerce ecosystem. Being on Beckn allows your business to be more easily discoverable to your stakeholders.

### Open Community Contributions

Beckn has been accepting community contributions to the specification since May 2020.


# Beckn Protocol Governance Model

To allow open contributions from the community, an inclusive governance model is required to ensure smooth evolution of specification using some basic design principles

- Interoperability
- Optimal ignorance
- Privacy and Security
- Scalability
- Reusability
- Non repudiability and Trust
- Unification over standardization

## Inclusiveness in Governance Approach

Since the core specification is essentially abstracted, the implementors of the specification must derive instances of the core specification for various domains, regions and scope. Moreover, beckn protocol specification is built using a layerwise approach each having its own evolution path. Hence, there is a need for a strong and inclusive governance model that adheres to the basic design principles while simltaneoulsy being inclusive in its approach to evolution as opposed to a foundation controlled evolution.  

## Areas

There are many independently governable specification elements in beckn. These elements are called areas. Each area will have multiple working groups under it.
The following are the areas currently identified :
-  **API**
   Core API and schema definitions
-   **Taxonomy**
   Domain specific repositories for organization of taxonomies and taxonomy element definitions
-   **Certification**
   Certification and compliance rules and specifications
-   **Architecture**
   High level architecture definition and definitions of the various components in the network
-   **Network Security**
   Network security protocols and best practices
-   **Policy**
   Governance structures, licences and copyrights
-   **Missions**
   Specific implementation related working groups

### Area Director

Each area will have an area director which will be responsible for the functioning and creation of the WGs under it and appointing the working group chair for the same. The area director will be a volunteer from the community who will adhere to the design principles while reviewing any proposal submitted by a contributor. 

## Working Group

A working group is a collection of people who collaborate on solving a specific category of problems in the beckn ecosystem. 

### Working Group Member

Anyone can send a request to be added to the group mail id of a working group to attend meetings and weigh in with opinions about any decision or CSF through mails.

### Working Group Chair

Each working group will have a working group chair. The group chair will be responsible for declaring a rough consensus on any decision the group has to make. Having full consensus is preferred but not required. During a decision process if the group chair decides that the issues brought forward have been discussed enough and the group has made an informed decision, the chair can declare that there is rough consensus to go ahead with the decision.
For assets (github repository, document collections, group email id etc) coming under each working group, the group chair will have access to modify it.

# Contribution Process

All contributions to the specification begin with the creation of a Commentable Specification File. To tackle these problems the beckn protocol has been unbundled into small editable components. These components will be documented into a list of Commentable Specification Files called CSFs.

## Creating a CSF

A Commentable Specification File called CSFs should be used by the community to make changes to the specification. Contributors should propose their changes in this form which would be commented on by the community and revised and republished as various draft versions till it moves onto the next step of the process.

### Structure

Each CSF consists of the following :
- CSF ID (Not required for proposed standard)
- Title
- Area
- Publication date (Not required for proposed standard)
- Review dates (Not required for proposed standard)
- Working Groups
- Submission Date 
- Contributors
- Status : (Proposed Standard/Protocol Draft/Protocol - Standard - Required/Recommended/Not recommended)
- Table of contents
- Abstract
- Content
- Version History
- CSFs referring to this document
- CSFs referred by this document
- External References
- Acknowledgements
- Copyright Notices
- License

Title should not have special characters, maximum 80 characters and spaces replaced with hyphens in CSF names.

### Expectations

Every CSF should be clear and concise on the problem it is trying to solve in the specification or the feature being proposed to be implemented. Each CSF should contain a supported use case where the proposed changes would be used. This is to give an overview of the real world implications of the changes being proposed.

### Types of CSF

Core CSFs which define 
- Structure of CSFs
- Organization of CSFs
- Folder structure of protocol specification repository

Architecture CSFs which describe
- Network Layer Architecture
- Infrastructure Layer Architecture
- Certification Layer Architecture

Specification CSFs which describe
- APIs
- Schemas
- Taxonomies

Implementation CSFs which describe:
- Reference implementation catalog
- Product Feature requests
- Issue Catalog
- Issue File

Policy CSFs which describe:
- Spec Governance structure
- Licenses
- Copyrights

### Format of the proposal

The format of the proposal will be in markdown text. Markdown format would ensure that the CSF documents will stand the test of time and will be readable while there is always the possibility that other formats may change over time. Markdown text would be a good middle ground where it provides enough functionalities to make the document more readable while still not being locked into a proprietary format which might change or become obsolete in the future.

## Submitting a CSF

A CSF is submitted by mailing comments@beckn.org as below : 
Subject : CSF Proposal : < Title of the CSF >
Body : CSF in markdown format

The relevant working groups to the proposal should be added in the CSF.

# Decision Making Process

## Proposed Standard

Initially when a CSF is mailed it will be a Proposed Standard.
The CSF admin will go over the working groups specified in the CSF by the proposer. The CSF admin may edit the working groups if they feel so. 
The CSF admin has the authority to reject a proposal if they feel so. The CSF admin will base their decision on the following criterias :
- The proposal is in the standard format as specified
- The structure of the proposal is as specified
- The proposal has clearly and concisely defined the problem it is trying to solve
- Context and nature of the problem is well defined
- Indication as to where the spec fails
- Who is affected by the problem
- Attributes/Aspects of the problem
- When the problem happens
- Why the problem happens
- Where the problem happens
- How it affects the affected party
- The proposal is accompanied by a supporting use case

In the case of rejection, the CSF admin will reply to the email giving a short explanation on why the proposed standard was rejected. In the case where the CSF admin deems the proposed standard can be discussed by the working groups it will become a protocol draft. 

## Protocol Drafts

Once the CSF admin accepts the proposed standard and assigns it a CSF ID it will be a protocol draft. It will have the naming convention as below :
	``` CSF< CSF ID >-<title>-draft-<draft_version_no> ```
Eg: CSF242-security-algorithm-changes-draft-0 will be the initial draft of CSF with CSF ID 242 with the title Security algorithm changes
The CSF admin will then mail the protocol draft to the mailing lists of the relevant working groups keeping the proposer in cc as below.
```
Subject : CSF-<CSF_ID>-<title> 
Body : CSF in markdown format
```

At this stage the proposal will be archived as draft 0. Archival process will be explained in detail in the archival and exploration of the specification section. 

### Working Group Review process

The specific working groups may use any communication channel decided upon by them (like mailing lists or slack channels) for reviewing and discussing the proposal.
Any communication back to the proposer should be through the initial mail chain initiated by the CSF admin. The proposer may make changes to the initial draft and revert with newer versions of the draft as per the discussions in the same mail chain.
At this stage, if required, the proposer may create a branch in their forks of the specification repository in github with the branch name as 
	``` CSF-<CSF ID> ```
PRs can be created with the following name :
	``` CSF<CSF ID>-<title>-draft-<draft_version_no> PR-<PR_no> ```
PR_no can be sequentially increased starting from 0 in case multiple PRs are raised based on a protocol draft. PRs made to the specification that does not adhere to this naming convention will be auto closed. Raising a PR must be intimated to the working groups by the  proposer in the protocol draft mail chain that the CSF admin initiated.

Any working group may exit the conversation if the WG feels that the proposal is not relevant to that specific group.
 
The following criterias are considered by the working group while making a decision on the classification of the protocol drafts :

Every change adheres to or does not fundamentally violate the design principles mentioned earlier
- Interoperability
- Optimal ignorance
- Scalability
- Reusability
- Non repudiability
- Location awareness
- Time awareness
- Capacity awareness 
- Unification over standardization
	
Scope of the change

Time required to implement the change

Effort required for migration

Impact of migration

Benefits of the change vs impact of migration

Downsides of not implementing the changes

### Final Classification of the Protocol Draft

Protocol drafts are classified into the following by the working groups based on review and discussion by the community :

#### Required

A network must implement the required protocols. These are changes that are essential and the downsides of not having them outweigh all the other criterias.

#### Recommended

A network may implement the recommended protocols. These are good to have, but due to other factors (like migration, overall benefits of the changes) a network may or may not implement these.

#### Not Recommended

After deliberation and discussion the community can discard the changes in which case the protocol draft will not be made a protocol standard. If all the tagged WGs exit the conversation or if all the WG deem the protocol draft as not recommended then it will be classified as Not Recommended overall.

The WG chair is responsible for making sure the discussions happen in a timely manner and rough consensus is reached.

## Protocol Standard

Once the protocol has been reviewed and discussed and a rough consensus has been reached the protocol draft will be published as a protocol standard with its final classification, unless it is not recommended. In which case it will be archived.
Once the protocol standard has been published the same changes should be made in the github repo as well. 

## Github Issues

One of the existing channels where discussions about the specifications are happening are the github repository of the specification. Users may raise issues to address any particular issue in the repository. 
To make any changes to the specification based on this issue users will need to create a proposal in CSF format and follow the process outlined above. 
The issue may be closed by linking the relevant CSF and the PR associated with the CSF once it becomes a protocol standard.
Any pull requests raised without relevant CSF ID will be automatically closed.

# Archival and exploration of specification

The Github repository of the protocol will be the single source of truth. 

There will be a separate github repository for storing the CSFs. The folder structure of the github repository will be as below
- Drafts
- Protocol Standards
- Not Recommended

Each CSF will have a separate folder which will contain the following :
- The main CSF file
- Mail communications for the same for reference.

All CSFs will soon be published in the beckn developer docs website as well.

## Specification Backup

On every change to the spec repository as well the CSF repository, a backup will be taken and stored independently in beckn servers so that the specifications and CSF archives are available independently from Github while still being accessible from Github. This process will be automated so that anytime a change happens in the API specifications repository or the CSF repository they will be backed up.