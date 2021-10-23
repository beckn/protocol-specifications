# Specification Governance
## Draft 02

# Authors

1. Ravi Prakash : ravi@becknfoundation.org

# Latest Version

Draft 02

# Previous Versions

Draft 01 | Deprecated

# Scope

This document intends to establish processes and guidelines which build a transparent, open mechanism for deciding how to manage contributions to the beckn protocol specification. The Core Working Group will initially follow these processes when merging changes from external contributors or from the CWG itself. This guideline document will be adjusted as practicality dictates.

This document is intended for the following audience.

1. Anyone who wants to understand how contributions are reviewed and merged by the Core Working Group


# Prerequisites

1. Readers must have a working knowledge of git
2. Readers should also know how open-source repositories are managed on Github.
3. Readers must have knowledge and understanding of beckn protocol specification

# Context

Beckn protocol exists as a set of public repositories on Github at https://github.com/beckn. These repositories contain specification documents, reference implementations, tools and utilities. Like all version controlled open-source repositories, there are processes that must be adopted to manage changes to the files present in these repositories. The most common way a change is proposed to the specification is via an Issue linked to that repository which ultimately gets converted to a Pull Request linked to that Issue. These pull requests must then be reviewed by the maintainers of the repository and subsequently merged with the main / master branch of that repository. 


# Abstract 

The evolution of beckn protocol specification is always use-case driven. The Core Working Group can specify support for hypothetical use cases as they see fit, but the specifications should be backed by realistic scenarios. Management of contributions towards an open-source specification like beckn protocol are governed by well defined policies and processes. These processes will evolve just like the specification does, based on use cases. Given beckn is designed to be a global protocol, maintainers and committers must be aware any change committed to the specification has a global impact on implementation. Therefore, the governance model of beckn protocol specification is based on strict and unambiguous design principles described in this document.  Anyone reviewing pull requests must apply these principles on each suggested change and decide if a change is deemed worthy of inclusion into the specification. The methodologies, guidelines and processes of conducting working group meetings to review contributions made to the specification is described in this document.


# Terminology

1. **Git:** A decentralized version control software
2. **Github:** An online platform for managing shared repositories via git
3. **Pull Request:** A request to merge a change to an existing version of the repository
4. **Core Working Group:** Current maintainer and governing authority of the specification


# Expected Outcomes after reading this document

After reading this document, the reader should be able to

1. Understand how to review and merge changes to the specification

# Introduction

Beckn protocol is maintained via an open community-driven governance model. The community comprises multiple businesses and organizations that actively contribute to the specification to fuel their digital acceleration. This collaboration across domains, technologies and expertises will bring in new ideas which need to be part of the protocol. Hence there is a need for a standardised process for making relevant changes to the specification as well and for a retrospective understanding of the specification. The governance model for beckn protocol has been created using some of the best practices of globally recognized governance models.

Evolution of beckn protocol specification is guided by the **Core Working Group**. This working group contains members that bring their API expertise, industry knowledge, incorporate feedback from the community, and expand the group of committers as and when appropriate. All development activity on the future specification will be performed as features on a draft branch and merged into this branch. Upon release of the future specification, this branch will be merged to master.

The Core Working Group holds weekly web conferences to review open pull requests and discuss open issues related to the evolving specification. Participation in weekly calls and scheduled working sessions is open to the community. 


# The Beckn Credo

the beckn community is an open community. So, no registrations. No memberships. No partnerships. Just a minimal footprint of an open and equally accessible Beckn Protocol that anyone can use. Multiple businesses and organizations have started using beckn protocol to fuel their digital acceleration. The credo of being an open protocol creates a level-playing field for any market player, small or large.


## Motivation

To make the internet small-business friendly. be a force multiplier with minimal footprint.

## Guiding Lights

Open specs, equal access. retain agency of small businesses. non-rivalrous, non-exclusive networks

## Community Driven

increase value for all participants. be a network weaver in your own way. be a contributor of specs and best practices

Beckn Protocol is an open commerce protocol with an abstract core, which is enabling market players to reimagine building seamless digital experiences and networks. This is very similar to how HTTP, while being a simple and open protocol has fueled seamless interaction between multiple systems and led to an explosive growth in internet adoption.

## Open Community Contributions

Beckn protocol has been accepting community contributions to the specification since May 2020.

# Design Principles

To allow open contributions from the community, the governance model is required to apply some basic design principles while reviewing or proposing changes to the specification. They are:

## Interoperability via Abstraction:
Any feature included in the specification must be abstracted as such to allow it to be consumed across a global range of use cases. That means no feature should be linked to a specific domain, region or use case. 

## Optimal ignorance:
Before including any feature in the specification, reviewers should ask the following questions: a) _Do we need it?_ And, b) _Do we need it now? If the answer to both these questions is “Yes” then this criteria will have been met.

## Privacy and Security
Any feature being included in the specification must be tested for any security or privacy vulnerabilities. Free text fields, loosely-typed fields and any fields that may be used to capture Personally Identifiable Information should not be accepted.

## Scalability

Any feature being included in the specification must be tested for scalability. String fields with unlimited size; arrays with unlimited size etc, must be discouraged. Any feature that is included must work at scale.

## Reusability
Any new feature must be checked if it can reuse components from existing schema before inclusion into the specification.

## Unification over Standardization
Not all features across the globe can be standardized. Standard values vary with domain, region and adoption. In case multiple standards are being adopted for a single feature, it is recommended that both the standards are included in the feature instead of proposing a new standard. For example, if a Location schema is defined using gps and address, then the feature should include both gps and address instead of choosing one over the other. Standardization should occur as a natural consequence of market adoption rather than a forced adoption. 

There will be exceptions to the above principles. The objective of the Core Working Group is to address such exceptions and define the most logical way forward to include such exceptions. 

# Need for Governance

Since the core specification is essentially abstracted, the implementers of the specification must use instances of the core specification for various domains, regions and scope. Moreover, beckn protocol specification is built by applying policies on the core specification. Hence, there is a need for a strong and inclusive governance model that adheres to the basic design principles while simultaneously being inclusive in its approach to evolution as opposed to a foundation controlled evolution.


# Areas That Require Specification Governance

There are many independently governable specification elements in beckn. These elements are called areas. Each area will have multiple working groups under it. The following are the areas currently identified :


* **API** : Core API and schema definitions
* **Taxonomy** : Domain-specific repositories for organization of taxonomies and taxonomy element definitions
* **Certification** : Certification and compliance rules and specifications
* **Architecture** : High level architecture definition and definitions of the various components in the network
* **Network Security** : Network security protocols and best practices
* **Policy** : Governance structures, licences and copyrights
* **Missions** : Specific implementation related working groups


# Area Director

Each area will have an area director which will be responsible for the functioning and creation of the WGs under it and appointing the working group chair for the same. The area director will be a volunteer from the community who will adhere to the design principles while reviewing any proposal submitted by a contributor.

# Working Groups

A working group is a collection of people who collaborate on, and are responsible for managing evolution of the specification under a specific area. 

## Working Group Structure

Each working group has the following structure

1. Working Group Administrators
2. Working Group Committers
3. Working Group Members

### Working Group Administrators

Each working group will have a working group (WG) administrator (Admin). The Admin will be responsible for declaring a rough consensus on any decision the group has to make. Having full consensus is preferred but not required. During a decision process if the admin decides that the issues brought forward have been discussed enough and the group has made an informed decision, the chair can declare that there is rough consensus to go ahead with the decision. For assets (github repository, document collections, group email id etc) coming under each working group, the admin will have access to modify it.


### Working Group Committers

Each working group will have at least one committer. The purpose of the committer is to review PRs against WG guidelines and design principles and post comments on Github regarding the status of the PR. 

### Working Group Members

Anyone can send a request to be added to the working group to attend meetings and weigh in with opinions about any decision or through mails. To become part of a working group, you must send an email to the working group admin. Working group members can participate in discussions on Issues and Pull Requests, and respond to comments in the discussion forums. However, the approval of a working group member will not carry any weightage in merging PRs to the specification.

# Managing Specification Evolution

The specification will evolve over time. Changes may be made when any of the following criteria are met:

1. **Clarity**. The current "way" something is done doesn't make sense, is complicated, or not clear.
2. **Consistency**. A portion of the specification is not consistent with the rest, or with the industry standard terminology.
3. **Necessary functionality**. We are missing functionality because of a certain design of the specification.
4. **Forward-looking** **Designs**. As usage of APIs evolves to new protocols, formats, and patterns, we should always consider what the next important functionality should be.
5. **Impact**. A change will provide an impact on a large number of use cases. We should not be forced to accommodate every use case. Maintainers should strive to make the common and important use cases both well supported and common in the definition of the OAI Spec. We cannot be edge-case driven.


# Specification Review Guidelines

While reviewing each change in the specification committers should always consider the following:

1. **Migration Impact : **Is this a construct that has a smooth implementation path from the latest specification? If so, how complicated is it to migrate implementations to the proposed change? Secondly, how large of a cohort is affected due to this change
2. **Tooling**: Contributors should strive to support code generation, software interfaces, spec generation techniques, as well as other utilities. Some features may be impossible to support in different frameworks/languages. These should be documented and considered during the change approval process.
3. **Visualization**: Can the specification change be graphically visualized somehow in a UI or other interface 

Spec changes should be approved by a majority of the committers. Approval can be given by commenting on the issue itself, for example, "Approved by @cwgadmin" however at least one formal GitHub-based flow approval must be given. After the voting criteria is met, the working group admin can merge or assign a member to merge the PR. No change should be approved until there is documentation for it, supplied in an accompanying PR.

# Feature Evolution

All new features have a life cycle starting from a proposal to a required standard. All new features to the specification must start with a status as “proposed”. Upon review, the CWG will decide to move forward with a discussion on the change and then move it to a “draft” status. If the feature is considered to become part of the specification, it will be moved to the “recommended” status. And if the feature is widely accepted and adopted by the ecosystem, then it will be moved to a “required” status after which it will become part of the core specification.


All proposals to the specification are submitted as namespaced properties as mentioned in CONTRIBUTIONS.md. The working group has the responsibility of reviewing these proposals and classify them accordingly as draft, recommended, required or not-recommended features. Once classified, the WGs must rename the namespace with the appropriate feature stage component after review.  


## Proposal

All proposals will have the following namespace


```
"./@alice-dev.direction.proposed"
```



## Draft Features

All draft features will have the following namespace structure


```
"./@proposer.feature.draft"
```



## Recommended Standard

All recommended standards will have the following namespace structure


```
"./@proposer.feature.recommended"
```



## Required Standard

All recommended standards will have the following namespace structure on the draft branch. All namespaces from required standards have to be replaced with the feature names before merging them to master. 


```
"./@proposer.feature.required"
```



### Not Recommended


```
"./@proposer.direction.not-recommended"
```

# Working Group Weekly Meetings

To review change requests to the specification, Working Groups should review and discuss their inclusion in weekly meetings. The meeting consists of four major agenda items.

1. **Bugs:** This involves discussing all Issues that have been raised as bugs. These will have the highest priority in terms of consideration and will have to be acknowledged and resolved within one week of submission. 
2. **Proposed Enhancements:** This involves listing all the new features that have been proposed in the form of Pull Requests to the draft branches. As there are four types of branches, there is an order of priority with which proposals to each branch should be reviewed. The order of priority is recommended as follows
    1. Minor Version Draft Branch
    2. Patch Version Draft Branch
    3. Major Version Draft Branch

As the master branch cannot accept any proposals, any proposal to the master branch must be explicitly rejected by the committers. 

3. **Draft features:** This agenda involves all the proposals that have been accepted and have been classified as draft features in the previous working group meeting. In this agenda, the working group will decide whether to classify it as a **Recommended** or a **Not Recommended** standard. 
4. **Recommended Standard:** This agenda involves all the draft features that have been accepted as a **Recommended Standard**. The outcome of this agenda is to classify whether a Recommended Standard can be classified as a **Required Standard**.
5. **Final Decision and Commit Approvals**: This is the final agenda of the meeting and contains a list of commits that have to be merged to the various branches. 

The duration of the working group meetings can be set by the Working Group Administrator. In case all proposals are not reviewed within the meeting, the WG Admin can propose a second meeting during the week to complete the discussion, 


# Change Tracking and Management

**GitHub** is the medium of record for all spec designs, use cases, and so on.

All the specification documents are present on the official beckn protocol Github account [here](https://github.com/beckn).


## Sources of Truth

1. The **protocol-specifications** repository is the source of truth for the core transaction API specification. 
2. The **registry** repository is the source of truth for implementing the registry infrastructure
3. The **specification-files** repository is the source of truth for all human readable specification files


## Branch Structure

At any given time, there should be _at most_ 4 working branches. The branches would exist if implementation has started on them. For example, assume a current version of **0.9.2** in the protocol-specifications repository. 

1. **master** - Current stable version. No PRs should be accepted directly to modify the specification. PRs against supporting files can be accepted.
2. **core-0.9.3-draft** - The next PATCH version of the specification. This should include non-breaking changes such as typo fixes, document fixes, wording clarifications.
3. **core-0.10.0-draft** - The next MINOR version of the specification. This would include backward compatible changes to the specification like attributes to existing schema. 
4. **core-1.0.0-draft** - The next MAJOR version of the specification. 

The master branch shall remain the current, released beckn protocol specification. The will describe and link the working branch(es) on the default README.md on main.

Examples of how something is described _currently_ vs. the proposed solution should accompany any change proposal.

Use labels for the workflow of specification changes. Examples of labels are _proposed_, _draft-*_, _recommended_, _required_-, _not-recommended_, _review_ (candidate for upcoming WG meeting), _rejected_, and _needs-approval_. These labels must be assigned by WG members. Style is lowercase with dashes in place of spaces.

An issue will be opened for each feature change. Embedded in the issue, or ideally linked in a file via pull-request (PR), a document about use cases should be supplied with the change.

A PR will be used to describe the _proposed_ solution and linked to the original issue.

Not all committers will contribute to every single proposed change. There may be many open proposals at once, and multiple efforts may happen in parallel.

When the work branch is ready and approved, the branch will be merged to main.


## Reviewing Pull Requests

Any Pull Request must have an associated Issue. If an Issue is not present, the reviewer must post a comment on the PR comment section asking the contributor to Raise an Issue and link the PR to it. If an Issue is not raised within 24 hours, the PR should be considered as rejected and must be closed by the reviewer with the comment _“Closing this due to unlinked Issue”_


## Managing Conflicts

If a Pull Request causes a merge conflict, the reviewer should respond with a comment “Merge conflicts present, kindly resolve and re-submit PR”. If the merge conflict is not resolved within 24 hours, the PR should be considered as rejected and must be closed by the reviewer with the comment “_Closing this due to unresolved merge conflicts_”


# Release Process

A release requires a vote on the release notes by CWG members within the voting period. Major or minor release voting periods will be announced by the CWG admin in the Slack channel and noted on the calendar at least 6 days in advance. During this time, CWG members who have not yet voted must note their approval on the GitHub pull request for the release notes. Patch releases must happen at the first CWG meeting of a calendar month. The CWG admin is responsible for coordinating the actual merge to main with marketing support, if any.

* Patch-level releases require majority approval by WG members. (Max voting period 3 days)
* Minor: requires approval by 66% of WG members. (Max voting period 7 days)
* Major: requires approval by 66% of WG members. (Max voting period 14 days)

The above policies apply to the Core Working Group. However, a WG Admin may override the majority and voting period depending on the area and size of the group.


# Transparency

The process should be as transparent as possible. Sometimes there will be discussions that use customer names, sensitive use cases, and so on. These must be anonymized, discussed in a private repository, or conducted offline. General discussions should happen on the GitHub issues for this project.


# Participation

While governance of the specification is the role of the CWG, the evolution of the specification happens through the participation of members of the developer community at large. Any person willing to contribute to the effort is welcome, and contributions may include filing or participating in issues, creating pull requests, or helping others with such activities.
